# Codex Game Studio Skill

<p align="center">
  <a href="#english"><strong>English</strong></a>
  &nbsp;|&nbsp;
  <a href="#中文"><strong>中文</strong></a>
</p>

---

## English

Codex Game Studio is a Codex skill for building, modifying, debugging, publishing, and polishing games across browser games, mobile H5/PWA games, Godot, Unity, and Unreal Engine.

It includes a 40+ role virtual AI game studio roster, so creators can ask Codex to plan, prototype, review, and polish a project as if a small production team were helping.

### What It Supports

- Browser games: Canvas, Phaser, Three.js
- Mobile H5/PWA games for iOS Safari and Android Chrome
- Godot projects and prototypes
- Unity gameplay, tools, Android/iOS workflows, and production planning
- Unreal Engine gameplay, C++/Blueprint guidance, mobile constraints, and project structure
- Engine CLI integration for detecting Godot, Unity, and Unreal installations and planning/running headless or batch validation commands
- Game design documents, production plans, QA checklists, and vertical slice planning
- Publishing plans for web, mobile stores, and Steam
- Genre templates for tower defense, platformers, shooters, roguelikes, card games, puzzles, idle/management games, farming/life sims, racing, and narrative games
- Asset pipeline guidance for sprites, atlases, audio, fonts, UI skins, 3D models, materials, animation, and compression
- Multiplayer, save systems, localization, accessibility, monetization, balancing, playtesting, and CI/CD workflows
- Solo developer, game jam, studio team, and education-oriented production workflows
- Static project audits for structure, assets, source files, tests, build scripts, mobile readiness, and CI
- A 46-role AI studio roster covering design, engineering, art, audio, production, QA, narrative, UX, monetization, and community

### Quick Start

1. Install the skill.
2. Restart Codex or open a new conversation.
3. Try one of these prompts:

```text
Use game-studio to build a mobile H5 tower defense game that works on iOS Safari.
Use game-studio to create a Unity Android/iOS vertical slice plan for a cozy RPG.
Use game-studio as a 40-person AI studio and plan a Steam-ready roguelike demo.
```

### Install

Copy the skill folder into your Codex skills directory:

```powershell
mkdir $env:USERPROFILE\.codex\skills -Force
Copy-Item -Recurse .\skills\game-studio $env:USERPROFILE\.codex\skills\
```

On macOS/Linux:

```bash
mkdir -p ~/.codex/skills
cp -R skills/game-studio ~/.codex/skills/
```

Restart Codex or start a new conversation so the skill metadata is reloaded.

### Example Prompts

```text
Use game-studio to build a 2D tower defense browser game.
Use game-studio to create a Godot 4 top-down roguelike prototype.
Use game-studio to review this Unity project and propose a vertical slice plan.
Use game-studio to add an Unreal Engine C++ health component and describe Blueprint hookup.
Use game-studio as a 40-person AI studio and make a production plan for a cozy farming RPG.
```

### Completed Example

- **Spider Solitaire**: a mobile-friendly H5/PWA Spider Solitaire game completed with Codex Game Studio Skill. The project includes touch drag controls, a 10-column mobile layout, full-screen start and settings screens, 1-suit / 2-suit / 4-suit difficulty modes, animated dealing and completed-run collection, a tutorial carousel, save/continue support, bilingual UI, music, sound effects, and static web deployment.
- Live demo: https://spider-solitaire-isclin.pages.dev/
- Repository: https://github.com/isclin123/spider-solitaire-by-codex-gamestudio-skill

Example request:

```text
Use game-studio to build a mobile-friendly Spider Solitaire game, then polish the UI, touch controls, animations, sound, tutorial, settings, deployment, and GitHub release.
```

中文案例：

```text
用 game-studio 开发一个手机能玩的蜘蛛纸牌游戏，并继续打磨 UI、触控拖拽、动画、音效、教程、设置、静态部署和 GitHub 发布。
```
### Included Resources

- `skills/game-studio/SKILL.md`: core workflow and trigger instructions
- `skills/game-studio/references/engine-selection.md`: engine selection guidance
- `skills/game-studio/references/engine-cli.md`: Godot, Unity, and Unreal command-line integration guidance
- `skills/game-studio/references/ai-studio-roster.md`: 46 virtual AI studio roles
- `skills/game-studio/references/production-pipeline.md`: milestone and vertical slice process
- `skills/game-studio/references/mobile-game.md`: H5, PWA, iOS/Android, WebView, and engine mobile guidance
- `skills/game-studio/references/project-templates.md`: reusable genre templates
- `skills/game-studio/references/publishing-web.md`: web/H5/PWA deployment guidance
- `skills/game-studio/references/publishing-mobile.md`: App Store, Google Play, WebView, and mobile release guidance
- `skills/game-studio/references/publishing-steam.md`: Steam release planning guidance
- `skills/game-studio/references/asset-pipeline.md`: asset naming, import, compression, and runtime guidance
- `skills/game-studio/references/multiplayer.md`: local/online multiplayer architecture guidance
- `skills/game-studio/references/save-systems.md`: local saves, cloud sync, migrations, and anti-cheat storage
- `skills/game-studio/references/monetization.md`: ads, IAP, DLC, cosmetics, premium, and ethical economy design
- `skills/game-studio/references/accessibility.md`: readable UI, remapping, subtitles, colorblind support, and assists
- `skills/game-studio/references/localization.md`: multilingual UI, string tables, CJK/RTL, font, and QA guidance
- `skills/game-studio/references/balancing.md`: combat, economy, progression, and tuning guidance
- `skills/game-studio/references/playtesting.md`: playtest plans, questions, observation, and metrics
- `skills/game-studio/references/ci-cd.md`: automated build/test/release guidance
- `skills/game-studio/references/solo-dev.md`, `game-jam.md`, `studio-team.md`, `education.md`: workflow guides for different creators
- `skills/game-studio/references/engine-godot.md`: Godot workflow
- `skills/game-studio/references/engine-unity.md`: Unity workflow
- `skills/game-studio/references/engine-unreal.md`: Unreal workflow
- `skills/game-studio/scripts/create-browser-game.mjs`: playable browser starter scaffold
- `skills/game-studio/scripts/create-production-plan.mjs`: production planning pack generator
- `skills/game-studio/scripts/create-project-template.mjs`: genre/platform template generator
- `skills/game-studio/scripts/validate-install.mjs`: installation structure checker
- `skills/game-studio/scripts/detect-engines.mjs`: local Godot, Unity, and Unreal detector
- `skills/game-studio/scripts/engine-cli.mjs`: project detector and engine CLI command planner/executor
- `skills/game-studio/scripts/audit-game-project.mjs`: static project readiness audit

### Useful Scripts

```bash
node skills/game-studio/scripts/validate-install.mjs skills/game-studio
node skills/game-studio/scripts/create-browser-game.mjs --name my-game --engine canvas
node skills/game-studio/scripts/create-project-template.mjs --name my-game --genre tower-defense --platform mobile-h5
node skills/game-studio/scripts/create-production-plan.mjs --name my-game --engine unity --genre rpg
node skills/game-studio/scripts/detect-engines.mjs
node skills/game-studio/scripts/engine-cli.mjs --project . --action check
node skills/game-studio/scripts/engine-cli.mjs --project . --engine unity --engine-path "C:\Program Files\Unity\Hub\Editor\...\Editor\Unity.exe" --action test
node skills/game-studio/scripts/audit-game-project.mjs --project .
node skills/game-studio/scripts/create-browser-game.mjs --name my-game --engine canvas --template mobile-portrait
```

### Notes

This skill does not bundle Godot, Unity, Unreal Engine, Phaser, Three.js, or commercial assets. It guides Codex to use whatever engine and dependencies are already available in the user's project or environment.

The engine integration is CLI-based. It can detect local engine installs, identify project types, plan validation commands, and optionally run headless/batch/automation commands. It does not directly click inside Godot, Unity, or Unreal editor UI.

### License

MIT

---

## 中文

Codex Game Studio 是一个面向游戏创作的 Codex Skill，用来帮助创作者完成游戏项目的构思、原型制作、代码实现、调试、测试、发布和打磨。它可以覆盖浏览器游戏、H5/PWA 手机小游戏、Godot、Unity 和 Unreal Engine 等常见开发方向。

这个 Skill 内置了 40 多个虚拟 AI 游戏工作室角色。你可以让 Codex 像一个小型游戏团队一样协助你推进项目，包括玩法设计、程序开发、美术规划、音频方向、关卡设计、制作管理、QA 测试、叙事设计、UX 体验和商业化建议等。

### 支持内容

- 浏览器游戏：Canvas、Phaser、Three.js
- H5/PWA 手机小游戏：iOS Safari、Android Chrome、移动端 WebView 方向
- Godot 项目与原型开发
- Unity 玩法系统、工具脚本、Android/iOS 工作流和项目规划
- Unreal Engine 玩法逻辑、C++/Blueprint 说明、移动端限制和项目结构建议
- Godot、Unity、Unreal 的命令行集成：检测本机安装、识别项目类型、规划或执行 headless/batch/automation 检查命令
- 游戏设计文档、制作计划、QA 检查清单和垂直切片规划
- Web、移动应用商店和 Steam 发布计划
- 塔防、平台跳跃、射击、肉鸽、卡牌、解谜、放置经营、农场生活模拟、赛车和叙事冒险等项目模板
- 精灵图、图集、音频、字体、UI 皮肤、3D 模型、材质、动画和压缩等资产管线指南
- 多人联网、存档系统、本地化、可访问性、商业化、数值平衡、用户测试和 CI/CD 工作流
- 独立开发、Game Jam、团队制作和教学项目工作流
- 项目静态审计：结构、资产、源码、测试、构建脚本、移动端准备度和 CI
- 46 个虚拟 AI 工作室角色，覆盖设计、工程、美术、音频、制作、测试、叙事、UX、商业化和社区运营

### 快速开始

1. 安装这个 Skill。
2. 重启 Codex，或者打开一个新对话。
3. 试试下面的提示词：

```text
Use game-studio to build a mobile H5 tower defense game that works on iOS Safari.
Use game-studio to create a Unity Android/iOS vertical slice plan for a cozy RPG.
Use game-studio as a 40-person AI studio and plan a Steam-ready roguelike demo.
```

### 安装方法

把 Skill 文件夹复制到你的 Codex skills 目录：

```powershell
mkdir $env:USERPROFILE\.codex\skills -Force
Copy-Item -Recurse .\skills\game-studio $env:USERPROFILE\.codex\skills\
```

macOS/Linux：

```bash
mkdir -p ~/.codex/skills
cp -R skills/game-studio ~/.codex/skills/
```

复制完成后，重启 Codex，或者打开一个新的对话，让 Codex 重新加载 Skill 信息。

### 示例提示词

```text
Use game-studio to build a 2D tower defense browser game.
Use game-studio to create a Godot 4 top-down roguelike prototype.
Use game-studio to review this Unity project and propose a vertical slice plan.
Use game-studio to add an Unreal Engine C++ health component and describe Blueprint hookup.
Use game-studio as a 40-person AI studio and make a production plan for a cozy farming RPG.
```

你也可以直接用中文说：

```text
用 game-studio 做一个 2D 塔防浏览器小游戏。
用 game-studio 做一个 Godot 4 俯视角 roguelike 原型。
用 game-studio 检查我的 Unity 项目，并给我一份垂直切片制作计划。
用 game-studio 帮我设计 Unreal Engine 的生命值组件，并说明蓝图怎么接。
让 game-studio 以 40 人 AI 游戏工作室的方式，给我做一份休闲农场 RPG 的制作计划。
```

### 包含资源

- `skills/game-studio/SKILL.md`：核心工作流和触发说明
- `skills/game-studio/references/engine-selection.md`：引擎选择指南
- `skills/game-studio/references/engine-cli.md`：Godot、Unity、Unreal 命令行集成指南
- `skills/game-studio/references/ai-studio-roster.md`：46 个虚拟 AI 工作室角色
- `skills/game-studio/references/production-pipeline.md`：里程碑和垂直切片流程
- `skills/game-studio/references/mobile-game.md`：H5、PWA、iOS/Android、WebView 和引擎移动端指南
- `skills/game-studio/references/project-templates.md`：常见游戏类型模板
- `skills/game-studio/references/publishing-web.md`：Web/H5/PWA 发布指南
- `skills/game-studio/references/publishing-mobile.md`：App Store、Google Play、WebView 和移动端发布指南
- `skills/game-studio/references/publishing-steam.md`：Steam 发布规划指南
- `skills/game-studio/references/asset-pipeline.md`：资产命名、导入、压缩和运行时指南
- `skills/game-studio/references/multiplayer.md`：本地/在线多人游戏架构指南
- `skills/game-studio/references/save-systems.md`：本地存档、云同步、迁移和防作弊存储
- `skills/game-studio/references/monetization.md`：广告、内购、DLC、皮肤、买断制和经济设计
- `skills/game-studio/references/accessibility.md`：可读 UI、按键重映射、字幕、色盲支持和辅助功能
- `skills/game-studio/references/localization.md`：多语言 UI、字符串表、CJK/RTL、字体和 QA 指南
- `skills/game-studio/references/balancing.md`：战斗、经济、成长和数值调优指南
- `skills/game-studio/references/playtesting.md`：用户测试计划、问题、观察记录和指标
- `skills/game-studio/references/ci-cd.md`：自动构建、测试和发布指南
- `skills/game-studio/references/solo-dev.md`、`game-jam.md`、`studio-team.md`、`education.md`：面向不同创作者的工作流指南
- `skills/game-studio/references/engine-godot.md`：Godot 工作流
- `skills/game-studio/references/engine-unity.md`：Unity 工作流
- `skills/game-studio/references/engine-unreal.md`：Unreal Engine 工作流
- `skills/game-studio/scripts/create-browser-game.mjs`：可玩的浏览器游戏脚手架
- `skills/game-studio/scripts/create-production-plan.mjs`：制作计划文档生成脚本
- `skills/game-studio/scripts/create-project-template.mjs`：按游戏类型和平台生成模板包
- `skills/game-studio/scripts/validate-install.mjs`：安装结构校验脚本
- `skills/game-studio/scripts/detect-engines.mjs`：检测本机 Godot、Unity、Unreal 安装
- `skills/game-studio/scripts/engine-cli.mjs`：识别项目并规划/执行引擎 CLI 命令
- `skills/game-studio/scripts/audit-game-project.mjs`：项目静态准备度审计脚本

### 常用脚本

```bash
node skills/game-studio/scripts/validate-install.mjs skills/game-studio
node skills/game-studio/scripts/create-browser-game.mjs --name my-game --engine canvas
node skills/game-studio/scripts/create-project-template.mjs --name my-game --genre tower-defense --platform mobile-h5
node skills/game-studio/scripts/create-production-plan.mjs --name my-game --engine unity --genre rpg
node skills/game-studio/scripts/detect-engines.mjs
node skills/game-studio/scripts/engine-cli.mjs --project . --action check
node skills/game-studio/scripts/engine-cli.mjs --project . --engine unity --engine-path "C:\Program Files\Unity\Hub\Editor\...\Editor\Unity.exe" --action test
node skills/game-studio/scripts/audit-game-project.mjs --project .
node skills/game-studio/scripts/create-browser-game.mjs --name my-game --engine canvas --template mobile-portrait
```

### 说明

这个 Skill 不自带 Godot、Unity、Unreal Engine、Phaser、Three.js 或商业素材。它会引导 Codex 使用你当前项目或环境里已经具备的引擎、依赖和资源。

引擎集成是基于命令行的：它可以检测本机引擎安装、识别项目类型、规划验证命令，并在你需要时运行 headless/batch/automation 命令。它不会直接在 Godot、Unity 或 Unreal 编辑器界面里替你点按钮。

### 许可证

MIT
