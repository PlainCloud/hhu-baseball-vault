# ⚾ HHU Baseball Vault

> 为 HHU 棒垒球社而作

欢迎队员们前来围观！本仓库集合了 [Dugout Edge](https://www.dugoutedge.com/drills/softball) 中的271项训练动作，并附带一个 SKILL.md，供大家在 agent 中使用来生成一周训练计划。

## 📚 内容索引

| 板块 | 内容 | 位置 |
| --- | --- | --- |
| 🥎 **垒球训练库** | 271 个训练项目，12 个类别，全中文翻译 | [总览索引](drills/softball/%F0%9F%8F%A0%20%E5%9E%92%E7%90%83%E8%AE%AD%E7%BB%83%E5%BA%93%E6%80%BB%E8%A7%88.md) |

## 🥎 垒球训练库

收录 [Dugout Edge](https://www.dugoutedge.com/drills/softball) 训练库的 **271 个垒球训练项目**，全部文字内容已完整翻译为简体中文，**项目英文原名保留**。

**入口**：[🏠 垒球训练库总览](drills/softball/%F0%9F%8F%A0%20%E5%9E%92%E7%90%83%E8%AE%AD%E7%BB%83%E5%BA%93%E6%80%BB%E8%A7%88.md) — 含全部 271 个项目的分类清单与统计。

### 目录结构

```
drills/
└── softball/
    ├── 🏠 垒球训练库总览.md          # 总索引（全部 271 个项目清单）
    ├── Hitting 击球.md               # 类别索引（51 个）
    ├── Infield 内野防守.md            # 类别索引（54 个）
    ├── ...（共 12 个类别索引）
    ├── Hitting 击球/                  # 类别文件夹（51 篇笔记）
    ├── Infield 内野防守/               # 类别文件夹（54 篇笔记）
    ├── Outfield 外野防守/
    ├── Pitching 投球/
    ├── Catching 捕手接球/
    ├── Throwing 传球/
    ├── Baserunning 跑垒/
    ├── Team Defense 团队防守/
    ├── Warmup 热身/
    ├── Strength & Conditioning 体能与力量/
    ├── Mental Skills 心理训练/
    └── Fun & Games 趣味游戏/
```

### 类别分布

| 类别 | 项目数 | 类别 | 项目数 |
| --- | ---: | --- | ---: |
| 🧤 Infield 内野防守 | 54 | 🏃 Baserunning 跑垒 | 11 |
| 🏏 Hitting 击球 | 51 | 🎉 Fun & Games 趣味游戏 | 10 |
| 💪 Strength & Conditioning 体能与力量 | 26 | 👥 Team Defense 团队防守 | 9 |
| 🎯 Throwing 传球 | 23 | 🧠 Mental Skills 心理训练 | 6 |
| 🌿 Outfield 外野防守 | 21 | 🥎 Pitching 投球 | 21 |
| 🔥 Warmup 热身 | 21 | 🛡️ Catching 捕手接球 | 18 |

合计 **271 个项目**，难度分布：初级 138 · 中级 101 · 高级 32。

### 单篇笔记结构

每篇笔记文件名格式为 `英文原名（中文译名）.md`，包含：

- **YAML 属性**：中英文名、类别、难度、时长、人数、适用年龄、器材、场地、技术点 —— 可直接用于 Dataview 查询或练习计划编排
- **标签**：`棒垒球/<类别>`、`棒垒球/技术点/<技术点>`、`难度/<等级>`
- **正文**：项目信息 → 项目简介 → 训练步骤 → 教练要点 → 视频演示 → 导航

## 🔗 链接与视频（GitHub / Obsidian 双兼容）

本仓库的链接按 **GitHub 与 Obsidian 都能正常跳转**的形式编写：

- **导航链接**用相对路径的 Markdown 链接，路径做百分号编码。GitHub 能识别，Obsidian 也能识别
  （文件名含空格、括号、中文、emoji 都不受影响）。形如：

  ```text
  [Infield 内野防守](../Infield%20%E5%86%85%E9%87%8E%E9%98%B2%E5%AE%88.md)
  ```

- **视频**用「缩略图 + 链接」：点缩略图即在新标签页打开 YouTube（GitHub 会剥离 `<iframe>`，
  所以不能直接嵌入播放器；缩略图在 Obsidian 里同样可以点击）。形如：

  ```text
  [![点击观看视频演示](https://img.youtube.com/vi/视频ID/hqdefault.jpg)](https://www.youtube.com/watch?v=视频ID)
  ```

- 正文不出现 `双中括号` 形式的 wiki 链接，因为在 GitHub 上它只会显示成普通文字、无法点击。

### 重新生成 / 维护

`.tools/convert-links.mjs` 负责把 Obsidian 风格的笔记转换成上述形式（幂等，可重复执行）：

```bash
node .tools/convert-links.mjs            # 转换
node .tools/convert-links.mjs --dry-run  # 只统计不写入
```

图标/视频链接若批量改动，改完重新跑一次即可。

## 🧰 使用方式

1. **作为 Obsidian 仓库**：直接用 Obsidian 打开本仓库根目录，或把 `drills/` 目录复制进你已有的 Vault。
2. **按难度 / 技术点筛选**：使用标签面板，例如 `难度/初级`、`棒垒球/技术点/footwork`。
3. **查找项目**：从 [🏠 垒球训练库总览](drills/softball/%F0%9F%8F%A0%20%E5%9E%92%E7%90%83%E8%AE%AD%E7%BB%83%E5%BA%93%E6%80%BB%E8%A7%88.md) 进入，按类别浏览。

## 📄 说明

- 内容译自 [Dugout Edge](https://www.dugoutedge.com/drills/softball)，仅供学习与训练参考，版权归原作者所有。
- 视频托管在 YouTube，观看需要能访问 YouTube。
