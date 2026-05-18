# Engine Selection

Use this reference when the repo does not already dictate a framework.

## Plain Canvas

Best for:
- Small arcade prototypes
- Snake, Pong, Breakout, simple shooters, grid puzzles
- No dependency or single-file requests

Avoid when:
- You need complex animation timelines, tilemaps, physics, cameras, or asset pipelines.

## Phaser

Best for:
- 2D platformers, top-down games, arcade shooters, tilemaps, sprite animation
- Games with many entities, collisions, cameras, particles, or sound

Typical setup:
- Vite app
- `phaser` dependency
- One `GameScene` plus small modules for entities/levels if the game grows

## Three.js

Best for:
- 3D scenes, driving/flying, spatial puzzle games, first-person or orbit-camera toys
- Games where depth, lighting, camera, or meshes are central

QA requirements:
- Verify WebGL canvas is nonblank.
- Check camera framing at desktop and mobile widths.
- Add visible geometry and lighting immediately; do not ship a black scene.

## Godot

Best for:
- 2D games, compact 3D games, small teams, open-source workflows
- Scene/node driven gameplay, fast iteration, tools scripts, GDScript
- Projects where contributors may not have commercial engine licenses

Prefer:
- Godot 4.x unless the repo is clearly Godot 3.x.
- Existing `.tscn`, `.gd`, `.tres`, `project.godot` conventions.

See `engine-godot.md`.

## Unity

Best for:
- Mobile, WebGL, XR, asset-store workflows, cross-platform production
- C# gameplay architecture, ScriptableObjects, prefabs, addressables

Prefer:
- Existing Unity version from `ProjectSettings/ProjectVersion.txt`.
- Editing scripts, prefabs, scenes, and ScriptableObjects in-place.

See `engine-unity.md`.

## Unreal Engine

Best for:
- High-fidelity 3D, cinematic tools, Blueprint-heavy workflows
- Multiplayer foundations, large worlds, AAA-style rendering, C++ gameplay modules

Prefer:
- Existing `.uproject` engine association.
- Minimal C++/Blueprint-compatible changes with clear editor steps when GUI cannot run.

See `engine-unreal.md`.

## Existing Repos

Prefer the current repo's stack. If a project already uses React, Phaser, Three, Pixi, Godot, Unity, Unreal, or another engine, integrate with that instead of replacing it.
