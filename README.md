# Codex Game Studio Skill

<p align="center">
  <a href="#english"><strong>English</strong></a>
  &nbsp;|&nbsp;
  <a href="#中文"><strong>中文</strong></a>
</p>

---

## English

Codex Game Studio is a Codex skill for building, modifying, debugging, and polishing games across browser games, Godot, Unity, and Unreal Engine.

It includes a 40+ role virtual AI game studio roster, so creators can ask Codex to plan, prototype, review, and polish a project as if a small production team were helping.

### What It Supports

- Browser games: Canvas, Phaser, Three.js
- Godot projects and prototypes
- Unity gameplay, tools, and production planning
- Unreal Engine gameplay, C++/Blueprint guidance, and project structure
- Game design documents, production plans, QA checklists, and vertical slice planning
- A 46-role AI studio roster covering design, engineering, art, audio, production, QA, narrative, UX, monetization, and community

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

### Included Resources

- `skills/game-studio/SKILL.md`: core workflow and trigger instructions
- `skills/game-studio/references/engine-selection.md`: engine selection guidance
- `skills/game-studio/references/ai-studio-roster.md`: 46 virtual AI studio roles
- `skills/game-studio/references/production-pipeline.md`: milestone and vertical slice process
- `skills/game-studio/references/engine-godot.md`: Godot workflow
- `skills/game-studio/references/engine-unity.md`: Unity workflow
- `skills/game-studio/references/engine-unreal.md`: Unreal workflow
- `skills/game-studio/scripts/create-browser-game.mjs`: playable browser starter scaffold
- `skills/game-studio/scripts/create-production-plan.mjs`: production planning pack generator

### Notes

This skill does not bundle Godot, Unity, Unreal Engine, Phaser, Three.js, or commercial assets. It guides Codex to use whatever engine and dependencies are already available in the user's project or environment.

### License

MIT

---

## 中文

Codex Game Studio 是一个面向游戏创作的 Codex Skill，用来帮助创作者完成游戏项目的构思、原型制作、代码实现、调试、测试和打磨。它可以覆盖浏览器游戏、Godot、Unity 和 Unreal Engine 等常见开发方向。

这个 Skill 内置了 40 多个虚拟 AI 游戏工作室角色。你可以让 Codex 像一个小型游戏团队一样协助你推进项目，包括玩法设计、程序开发、美术规划、音频方向、关卡设计、制作管理、QA 测试、叙事设计、UX 体验和商业化建议等。

### 支持内容

- 浏览器游戏：Canvas、Phaser、Three.js
- Godot 项目与原型开发
- Unity 玩法系统、工具脚本和项目规划
- Unreal Engine 玩法逻辑、C++/Blueprint 说明和项目结构建议
- 游戏设计文档、制作计划、QA 检查清单和垂直切片规划
- 46 个虚拟 AI 工作室角色，覆盖设计、工程、美术、音频、制作、测试、叙事、UX、商业化和社区运营

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
- `skills/game-studio/references/ai-studio-roster.md`：46 个虚拟 AI 工作室角色
- `skills/game-studio/references/production-pipeline.md`：里程碑和垂直切片流程
- `skills/game-studio/references/engine-godot.md`：Godot 工作流
- `skills/game-studio/references/engine-unity.md`：Unity 工作流
- `skills/game-studio/references/engine-unreal.md`：Unreal Engine 工作流
- `skills/game-studio/scripts/create-browser-game.mjs`：可玩的浏览器游戏脚手架
- `skills/game-studio/scripts/create-production-plan.mjs`：制作计划文档生成脚本

### 说明

这个 Skill 不自带 Godot、Unity、Unreal Engine、Phaser、Three.js 或商业素材。它会引导 Codex 使用你当前项目或环境里已经具备的引擎、依赖和资源。

### 许可证

MIT
