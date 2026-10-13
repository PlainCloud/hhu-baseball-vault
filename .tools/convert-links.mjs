#!/usr/bin/env node
/**
 * convert-links.mjs — 把 Obsidian 风格的笔记转换成 GitHub 可正常渲染的形式。
 *
 * 解决的问题：
 *   1. Obsidian 的 wiki 链接 `[[路径|显示名]]` 在 GitHub 上只会显示成普通文字，点不动。
 *      本脚本把它转成相对路径的 Markdown 链接，并把路径做百分号编码（GitHub 能识别，
 *      Obsidian 也能识别）。
 *   2. GitHub 出于安全会剥离 `<iframe>`，YouTube 嵌入视频会变成一串源码文本。
 *      本脚本把它换成「缩略图 + 链接」的形式：点缩略图即在 YouTube 打开。
 *   3. `youtube.com/embed/...` 直接访问会报错，正文里的观看链接改为 `watch?v=...`。
 *
 * 用法（在仓库根目录执行）：
 *   node .tools/convert-links.mjs            # 转换
 *   node .tools/convert-links.mjs --dry-run  # 只统计，不写文件
 *
 * 幂等性：脚本只处理 `[[...]]` 与 `<iframe>`，已转换过的仓库再跑不会重复改动。
 * 如需从原始 Obsidian 版本重新生成：用 git 恢复上一次提交后再执行本脚本即可。
 */

import fs from 'node:fs';
import path from 'node:path';

const root = process.argv.includes('--root')
  ? process.argv[process.argv.indexOf('--root') + 1]
  : process.cwd();
const dryRun = process.argv.includes('--dry-run');

// ---- collect markdown files ----
const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === '.git') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.md')) files.push(p);
  }
})(root);

const relOf = p => path.relative(root, p).replace(/\\/g, '/');
const stripExt = r => r.replace(/\.md$/, '');

const byPath = new Map();   // "a/b/name" -> "a/b/name.md"
const byBase = new Map();   // "name" -> ["a/b/name.md", ...]
for (const f of files) {
  const rel = relOf(f);
  byPath.set(stripExt(rel), rel);
  const base = path.basename(f, '.md');
  if (!byBase.has(base)) byBase.set(base, []);
  byBase.get(base).push(rel);
}

// GitHub/浏览器式的路径编码。括号必须编码：Markdown 会把 ")" 当作链接结束符，
// 文件名里的 "(" ")" 若不编码会截断链接。
const encodePath = p => p.split('/').map(seg =>
  encodeURIComponent(seg).replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/'/g, '%27')
).join('/');

/** 把 wiki 链接目标解析为仓库内真实文件路径（不含扩展名） */
function resolveTarget(raw, fromRel) {
  let t = raw.trim().replace(/\\/g, '/');
  if (t.startsWith('/')) t = t.slice(1);
  t = stripExt(t);

  const fromDir = path.posix.dirname(fromRel);
  const candidates = [
    path.posix.normalize(path.posix.join(fromDir, t)), // 相对当前文件
    t,                                                 // 相对仓库根
  ];
  for (const c of candidates) if (byPath.has(c)) return c;

  const hits = byBase.get(path.posix.basename(t)) || [];
  return hits.length === 1 ? stripExt(hits[0]) : null;
}

const WIKI = /\[\[([^\[\]|#\\]+?)(?:\\?\|([^\[\]]*?))?\]\]/g;
const IFRAME = /<iframe[^>]*\bsrc="([^"]+)"[^>]*>\s*<\/iframe>/gi;
const WATCH = /\[在 YouTube 观看\]\((https:\/\/www\.youtube\.com\/embed\/[^)]+)\)/g;
const youTubeId = s => (s.match(/(?:embed\/|watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{6,})/) || [])[1];

const summary = { files: 0, wiki: 0, iframe: 0, watch: 0, unresolved: [] };

for (const file of files) {
  const fromRel = relOf(file);
  const before = fs.readFileSync(file, 'utf8');
  let text = before;

  text = text.replace(WIKI, (m, target, label) => {
    const resolved = resolveTarget(target, fromRel);
    if (!resolved) {
      summary.unresolved.push({ file: fromRel, target: target.trim() });
      return m;
    }
    summary.wiki++;
    const display = label !== undefined && label !== '' ? label : target.trim().split('/').pop();
    const rel = path.posix.relative(path.posix.dirname(fromRel), resolved + '.md') || path.posix.basename(resolved) + '.md';
    return `[${display}](${encodePath(rel)})`;
  });

  text = text.replace(IFRAME, (m, src) => {
    const id = youTubeId(src);
    if (!id) return m;
    summary.iframe++;
    const q = src.includes('?') ? src.slice(src.indexOf('?')) : '';
    return `[![点击观看视频演示](https://img.youtube.com/vi/${id}/hqdefault.jpg)](https://www.youtube.com/watch?v=${id}${q})`;
  });

  text = text.replace(WATCH, (m, url) => {
    const id = youTubeId(url);
    if (!id) return m;
    summary.watch++;
    const q = url.includes('?') ? url.slice(url.indexOf('?')) : '';
    return `[在 YouTube 观看](https://www.youtube.com/watch?v=${id}${q})`;
  });

  if (text !== before) {
    summary.files++;
    if (!dryRun) fs.writeFileSync(file, text, 'utf8');
  }
}

console.log(`${dryRun ? '[dry-run] ' : ''}扫描 markdown 文件：${files.length}`);
console.log(`修改文件：${summary.files}`);
console.log(`wiki 链接转换：${summary.wiki}`);
console.log(`iframe 视频转换：${summary.iframe}`);
console.log(`观看链接规范化：${summary.watch}`);
console.log(`无法解析的 wiki 链接：${summary.unresolved.length}`);
for (const u of summary.unresolved) console.log(`   ${u.file} -> ${JSON.stringify(u.target)}`);
if (!dryRun && summary.unresolved.length) process.exitCode = 1;
