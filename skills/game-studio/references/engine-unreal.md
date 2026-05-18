# Unreal Engine Workflow

Use for Unreal projects or requests mentioning `.uproject`, Blueprints, C++, UMG, maps, actors, components, replication, or Unreal Engine.

## Detection

- `.uproject` file identifies the project and engine association.
- `Content/`, `Config/`, `Source/` are standard project directories.
- Blueprints are binary assets and usually cannot be safely edited directly as text.

## Editing Rules

- Prefer C++ classes, config, data tables, or documented editor steps when Blueprint binary editing is required.
- Preserve module names and build files.
- Avoid touching generated/intermediate directories.
- For gameplay, use Actor/Component patterns that match the project.
- For multiplayer, state authority/replication assumptions explicitly.

## Common Tasks

- Gameplay feature: add C++ ActorComponent or Actor class and describe Blueprint hookup.
- UI: add C++/UMG-facing logic and clear editor binding steps.
- Level: provide map setup instructions unless assets are text-editable.
- Data: use DataTables/PrimaryDataAssets where present.

## Validation

If Unreal is installed:
- Use project build scripts or Unreal Automation Tool when available.
- Compile target modules.

If Unreal is not installed:
- Validate C++ syntax as much as possible.
- Check `.Build.cs` and include/module consistency.
- Provide exact editor steps for Blueprint/map changes.
