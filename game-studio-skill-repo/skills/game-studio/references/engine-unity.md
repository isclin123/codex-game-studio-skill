# Unity Workflow

Use for Unity projects or requests mentioning C#, MonoBehaviour, prefabs, scenes, ScriptableObjects, packages, `Assets/`, `ProjectSettings/`, or Unity WebGL/mobile.

## Detection

- `ProjectSettings/ProjectVersion.txt` gives the Unity version.
- `Assets/`, `Packages/manifest.json`, and `.unity` scene files indicate a Unity project.

## Editing Rules

- Preserve `.meta` files and GUID references.
- Do not rename or move assets casually; Unity references depend on GUIDs.
- Prefer small C# components over giant managers.
- Use ScriptableObjects for tunable data when the repo already uses them.
- Avoid editing serialized YAML scene/prefab files unless necessary and understood.

## Common Tasks

- Gameplay: add or modify MonoBehaviour scripts under `Assets/Scripts` or existing convention.
- UI: use Canvas/TextMeshPro conventions already present.
- Input: prefer the project's input system, old Input Manager or new Input System.
- Mobile/WebGL: consider touch controls, memory, load time, and resolution.

## Validation

If Unity is installed:
- Use existing test runner/build scripts when present.
- Check compile errors.

If Unity is not installed:
- Run available C# analyzers/tests if configured.
- Inspect for namespace/class/file-name consistency.
- Provide exact Unity version and scene to open.
