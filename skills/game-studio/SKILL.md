---
name: game-studio
description: Build, modify, debug, publish, audit, and polish games and interactive prototypes across browser games, mobile H5/PWA games, Godot, Unity, and Unreal Engine. Use when Codex is asked to create a game, game jam prototype, arcade game, puzzle game, 2D/3D game, mobile game, iOS/Android game, H5 game, Phaser/Three.js/canvas game, Godot project, Unity project, Unreal project, multiplayer game, save system, game economy, monetization, localization, accessibility, asset pipeline, gameplay mechanic, level, HUD, sprites, assets, QA pass, playtest plan, CI/CD, publishing plan, project audit, or to coordinate a 40+ role virtual AI game-studio team.
---

# Game Studio

Use this skill to behave like a small game studio: design the loop, choose the right engine, implement a playable build, run or validate it locally when possible, and verify the game feels real rather than merely rendering a static page.

## Default Workflow

1. **Clarify only if necessary.** If the user gives a genre or mechanic, make reasonable choices and build. Ask only when the answer changes the whole project.
2. **Choose the engine conservatively.**
   - Use existing repo stack when present.
   - Use Phaser for 2D arcade/platformer/top-down games when adding a dependency is acceptable.
   - Use Three.js for 3D games or spatial scenes.
   - Use Godot for lightweight 2D/3D games, open-source workflows, small teams, fast iteration, and scene/node driven projects.
   - Use Unity for mobile, WebGL, XR, asset-store-heavy workflows, C# gameplay, and cross-platform production.
   - Use Unreal for high-fidelity 3D, Blueprint-heavy prototypes, cinematic tools, multiplayer foundations, and large-world/AAA-style workflows.
   - Use mobile H5/PWA for lightweight iOS/Android browser games, shareable prototypes, and touch-first casual games.
   - Use plain canvas for tiny prototypes or zero-dependency requests.
   - Do not hand-roll complex physics, pathfinding, tilemaps, or animation systems when a proven local library is already in use.
3. **Assemble the virtual studio.** Select 3-8 relevant roles from `references/ai-studio-roster.md` for ordinary tasks; use the full roster only for large planning, reviews, or production breakdowns.
4. **Define the playable core before art.** Write down the player verb, objective, fail/win condition, scoring/progression, controls, and one-minute fun loop.
5. **Implement a complete vertical slice.** Include start/restart, HUD, clear controls, feedback, win/loss, at least one level or wave, and sensible difficulty.
6. **Add assets.** Games must use visual assets: generated bitmap assets, sprite sheets, tile shapes, particles, materials, meshes, UI skins, or real images as appropriate. Avoid a blank "UI demo" pretending to be a game.
7. **Run or validate the game.** Start the dev server, Godot editor/headless run, Unity tests, or Unreal automation when available. Use `scripts/detect-engines.mjs` and `scripts/engine-cli.mjs` for engine CLI discovery and command planning. If an engine is not installed, make code/project changes and provide exact run steps.
8. **QA.** Use Browser for web games. For Godot/Unity/Unreal, run available tests/build validation and inspect project files; if a graphical editor cannot run, state that clearly.
9. **Iterate once after QA.** Fix visible blank canvases, clipped HUD, unreadable text, broken controls, asset load failures, or stuck game states before final.

## Implementation Standards

- Make the first screen the actual playable game, not a landing page.
- Keep HUD compact and legible. Avoid large marketing hero sections and decorative cards.
- Use keyboard controls on desktop and touch/buttons on mobile when reasonable.
- For mobile targets, design touch-first controls, safe-area-aware HUD, portrait/landscape behavior, audio unlock flow, and performance budgets.
- Use stable dimensions for boards, tile grids, score panels, and buttons so dynamic text does not shift layout.
- Use `requestAnimationFrame` or the framework game loop; avoid timers that drift for core motion.
- Separate game state from rendering enough that restart and testing are simple.
- Include pause/restart where it fits the genre.
- Prefer deterministic helpers for collision, spawning, scoring, and level data.
- Preserve engine-native project structure: Godot scenes/scripts/resources, Unity Assets/Packages/ProjectSettings, Unreal Content/Config/Source.
- Avoid rewriting entire engine projects when a localized scene, component, Blueprint/C++ class, GDScript, C# script, or asset config change is enough.
- Add comments only for non-obvious game logic.

## QA Checklist

Before final response, verify the relevant items:

- Canvas or game area is nonblank.
- Player can start, move/interact, score/progress, lose/win, and restart.
- Assets load without 404s.
- HUD text is readable and does not overlap controls.
- Game is playable at desktop and narrow viewport sizes.
- No console errors that break gameplay.
- For Godot, Unity, and Unreal, final answers include the engine version if detected and the exact scene/map/build command to open or run.
- The final answer includes the local URL, file path, scene, or project path and notes any tests that could not run.

## Scripts

Use `scripts/create-browser-game.mjs` to scaffold a small Vite project when starting from an empty folder:

```powershell
node C:\Users\isclin\.codex\skills\game-studio\scripts\create-browser-game.mjs --name my-game --engine canvas
node C:\Users\isclin\.codex\skills\game-studio\scripts\create-browser-game.mjs --name my-game --engine phaser
node C:\Users\isclin\.codex\skills\game-studio\scripts\create-browser-game.mjs --name my-game --engine three
node C:\Users\isclin\.codex\skills\game-studio\scripts\create-browser-game.mjs --name my-game --engine canvas --template mobile-portrait
```

Use `scripts/create-production-plan.mjs` to generate a studio-style planning pack for any engine:

```powershell
node C:\Users\isclin\.codex\skills\game-studio\scripts\create-production-plan.mjs --name my-game --engine unity --genre tower-defense
```

Use `scripts/create-project-template.mjs` to generate a genre/platform planning template:

```powershell
node C:\Users\isclin\.codex\skills\game-studio\scripts\create-project-template.mjs --name my-game --genre tower-defense --platform mobile-h5
```

Use `scripts/validate-install.mjs` to check that a copied skill has required files:

```powershell
node C:\Users\isclin\.codex\skills\game-studio\scripts\validate-install.mjs C:\Users\isclin\.codex\skills\game-studio
```

Use `scripts/detect-engines.mjs` to discover local engine CLI/editor paths:

```powershell
node C:\Users\isclin\.codex\skills\game-studio\scripts\detect-engines.mjs
```

Use `scripts/engine-cli.mjs` to identify a project and print the relevant Godot, Unity, or Unreal validation command. It only prints commands by default; add `--execute` when the user wants Codex to run the detected command:

```powershell
node C:\Users\isclin\.codex\skills\game-studio\scripts\engine-cli.mjs --project . --action check
node C:\Users\isclin\.codex\skills\game-studio\scripts\engine-cli.mjs --project . --engine unity --action test
node C:\Users\isclin\.codex\skills\game-studio\scripts\engine-cli.mjs --project . --engine unity --engine-path "C:\Program Files\Unity\Hub\Editor\...\Editor\Unity.exe" --action test
node C:\Users\isclin\.codex\skills\game-studio\scripts\engine-cli.mjs --project . --engine godot --action run --execute
```

Use `scripts/audit-game-project.mjs` for a fast static audit of project structure, build scripts, assets, tests, mobile config, and release readiness:

```powershell
node C:\Users\isclin\.codex\skills\game-studio\scripts\audit-game-project.mjs --project .
```

Scripts create starters or planning packs, not final games. After generation, inspect and adapt the generated files to the user's request.

## References

- Read `references/game-design-checklist.md` when the request is vague or needs design depth.
- Read `references/engine-selection.md` when choosing between browser, Godot, Unity, and Unreal.
- Read `references/engine-cli.md` when connecting to Godot, Unity, or Unreal through command-line tools, editor batch mode, headless validation, tests, or builds.
- Read `references/mobile-game.md` for H5/PWA, iOS Safari, Android Chrome, WebView, Unity mobile, Godot mobile, or Unreal mobile tasks.
- Read `references/project-templates.md` when the user asks for a genre template, starter plan, or common game type.
- Read `references/asset-pipeline.md` for sprites, atlases, audio, fonts, UI skins, 3D models, materials, animation, imports, or compression.
- Read `references/multiplayer.md` for local multiplayer, online multiplayer, WebSocket rooms, replication, rollback, prediction, or anti-cheat.
- Read `references/save-systems.md` for saves, accounts, cloud sync, migrations, offline conflicts, or anti-cheat storage.
- Read `references/monetization.md` for ads, IAP, premium, DLC, cosmetics, passes, subscriptions, or ethical economy design.
- Read `references/accessibility.md` for remapping, subtitles, colorblind modes, flash reduction, difficulty assists, or readable UI.
- Read `references/localization.md` for multilingual UI, string tables, CJK fonts, RTL, text expansion, or localization QA.
- Read `references/balancing.md` for numbers, curves, enemy stats, rewards, economy, level pacing, or CSV balance tables.
- Read `references/playtesting.md` for playtest plans, feedback forms, observation notes, retention metrics, or tuning loops.
- Read `references/ci-cd.md` for GitHub Actions, automated web builds, engine tests, artifacts, release candidates, or build automation.
- Read `references/solo-dev.md`, `references/game-jam.md`, `references/studio-team.md`, or `references/education.md` for workflow style guidance.
- Read `references/ai-studio-roster.md` when the user asks for a game studio, multiple AI coworkers, a production team, or role-based planning/review.
- Read `references/production-pipeline.md` for multi-step projects, vertical slices, milestones, asset pipelines, or release planning.
- Read `references/publishing-web.md`, `references/publishing-mobile.md`, or `references/publishing-steam.md` for release, store, deployment, packaging, or platform publishing tasks.
- Read `references/engine-godot.md`, `references/engine-unity.md`, or `references/engine-unreal.md` when working in those engines.
