# Godot Workflow

Use for Godot projects or requests mentioning `.tscn`, `.gd`, `project.godot`, nodes, scenes, signals, GDScript, or Godot exports.

## Detection

- `project.godot` at repo root indicates a Godot project.
- `.tscn` scene files and `.gd` scripts are usually text-editable.
- Prefer Godot 4 APIs unless the project clearly uses Godot 3.

## Editing Rules

- Preserve scene node paths and signal connections.
- Keep gameplay scripts small and attach behavior to appropriate nodes.
- Use typed GDScript for new Godot 4 code when practical.
- Prefer exported variables for tuning.
- Avoid broad scene rewrites when adding a child node, script, or resource is enough.

## Common Tasks

- New mechanic: add script to player/enemy/controller node, expose tuning variables.
- New level: duplicate an existing `.tscn` pattern and adjust resources.
- UI: use Control nodes, anchors, themes, and input actions.
- Input: add or reference project input actions, avoid hard-coded keys when possible.

## Validation

If Godot is installed:
- Run editor/project checks with the repo's Godot version.
- Run headless scene tests if available.

If Godot is not installed:
- Validate text syntax by careful inspection.
- State exact scene to open and scripts changed.
- Provide manual QA steps.
