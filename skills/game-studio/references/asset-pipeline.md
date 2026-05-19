# Asset Pipeline

Use for sprites, atlases, UI skins, audio, fonts, models, materials, animation, naming, imports, and compression.

## Folder Pattern

- `Art/Source`: layered source files, Blender files, raw audio sessions.
- `Art/Export`: game-ready PNG/WebP, atlases, GLB/FBX, WAV/OGG.
- `Audio/SFX`, `Audio/Music`, `Audio/UI`.
- `Fonts`: licensed font files and fallback notes.
- `UI`: icons, panels, cursors, button states, nine-slice assets.

## Naming

- Use stable lowercase names: `enemy_slime_walk_01.png`, `ui_button_primary_hover.png`.
- Include resolution or variant when it matters: `hero_portrait_512.webp`.
- Avoid spaces and ambiguous names like `final2.png`.

## 2D Assets

- Prefer atlases for many sprites; include padding to avoid texture bleeding.
- Keep pivot/origin conventions documented.
- Export idle/walk/attack/hit/death states consistently.
- Mobile: limit large transparent PNGs; use WebP/ASTC/ETC2 where supported.

## 3D Assets

- Prefer GLB for web, FBX/GLTF for engine workflows depending on project convention.
- Freeze transforms, apply scale, name meshes/materials, and keep collision meshes explicit.
- Maintain LODs for mobile or high-density scenes.

## Audio

- Use WAV for source/master SFX, OGG/AAC/MP3 for runtime depending on platform.
- Normalize loudness by category; keep UI SFX short.
- Provide mute, volume groups, and audio unlock for H5/iOS.

## Engine Notes

- Godot: check import presets, texture filters, compression, and audio loop flags.
- Unity: use import presets, addressables when project scale justifies it, and platform texture overrides.
- Unreal: use material instances, texture groups, LODs, and platform device profiles.
