# Codex Game Studio Skill

Codex Game Studio is a Codex skill for building, modifying, debugging, and polishing games across:

- Browser games: Canvas, Phaser, Three.js
- Godot
- Unity
- Unreal Engine

It also includes a 40+ role virtual AI game studio roster, so creators can ask Codex to plan or review a project as if a small production team were helping.

## Install

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

## Example Prompts

```text
Use game-studio to build a 2D tower defense browser game.
Use game-studio to create a Godot 4 top-down roguelike prototype.
Use game-studio to review this Unity project and propose a vertical slice plan.
Use game-studio to add an Unreal Engine C++ health component and describe Blueprint hookup.
Use game-studio as a 40-person AI studio and make a production plan for a cozy farming RPG.
```

## Included Resources

- `SKILL.md`: core workflow and trigger instructions
- `references/engine-selection.md`: engine selection guidance
- `references/ai-studio-roster.md`: 46 virtual AI studio roles
- `references/production-pipeline.md`: milestone and vertical slice process
- `references/engine-godot.md`: Godot workflow
- `references/engine-unity.md`: Unity workflow
- `references/engine-unreal.md`: Unreal workflow
- `scripts/create-browser-game.mjs`: playable browser starter scaffold
- `scripts/create-production-plan.mjs`: production planning pack generator

## Notes

This skill does not bundle Godot, Unity, Unreal Engine, Phaser, Three.js, or commercial assets. It guides Codex to use whatever engine and dependencies are already available in the user's project or environment.

## License

MIT
