# Engine CLI Integration

Use this reference when a task needs to connect to Godot, Unity, or Unreal through command-line tools, editor batch mode, headless checks, tests, or builds.

## Operating Model

- Treat the CLI as the integration layer; the skill does not click editor UI or create Blueprint graph nodes inside the editor.
- Detect engines first with `scripts/detect-engines.mjs`.
- Detect the project type with `scripts/engine-cli.mjs --project <path> --action check`.
- If the editor is not on `PATH`, pass `--engine-path <path-to-editor>`.
- Default to printing commands. Execute only when the user clearly wants a command run or has approved it.
- Prefer non-destructive checks before builds.
- Record engine version, project path, command used, and result in the final answer.

## Godot

Project markers:

- `project.godot`
- `.tscn`, `.gd`, `.tres` files

Useful actions:

- `check`: run headless/editor validation where supported.
- `run`: launch the project or a scene when available.
- `export`: only when export presets and templates are configured.

Typical commands:

```bash
godot --version
godot --headless --path <project> --quit
godot --path <project>
node scripts/engine-cli.mjs --project <project> --engine godot --engine-path <godot-exe> --action check
```

Notes:

- Godot command names differ across systems: `godot`, `godot4`, `Godot_v4.*`, or an `.exe` under a user-installed folder.
- If export templates are missing, provide exact editor steps instead of pretending export succeeded.

## Unity

Project markers:

- `Assets/`
- `ProjectSettings/ProjectVersion.txt`
- `Packages/manifest.json`

Useful actions:

- `check`: open project in batchmode and quit to catch import/compile issues.
- `test`: run EditMode or PlayMode tests when test assemblies exist.
- `build`: use a project-provided build method when present; do not invent a release pipeline blindly.

Typical commands:

```bash
Unity.exe -batchmode -nographics -quit -projectPath <project> -logFile <log>
Unity.exe -batchmode -nographics -projectPath <project> -runTests -testPlatform EditMode -testResults <xml> -logFile <log>
Unity.exe -batchmode -nographics -projectPath <project> -executeMethod BuildScript.PerformBuild -logFile <log>
node scripts/engine-cli.mjs --project <project> --engine unity --engine-path <Unity.exe> --action test
```

Notes:

- Detect Unity version from `ProjectSettings/ProjectVersion.txt`.
- Prefer the matching editor version from Unity Hub when installed.
- Build commands should use a known project build method or a generated build script reviewed by the user.

## Unreal Engine

Project markers:

- `*.uproject`
- `Config/`
- `Content/`
- `Source/`

Useful actions:

- `check`: inspect project and produce editor/automation commands.
- `build`: use UnrealBuildTool or AutomationTool when engine path is known.
- `cook`: use BuildCookRun only when target platform and configuration are known.

Typical commands:

```bash
UnrealEditor-Cmd.exe <project.uproject> -run=ResavePackages -ProjectOnly -Unattended
RunUAT.bat BuildCookRun -project=<project.uproject> -noP4 -build -cook -stage -pak -clientconfig=Development -platform=Win64
node scripts/engine-cli.mjs --project <project> --engine unreal --engine-path <UnrealEditor-Cmd.exe> --action check
```

Notes:

- Blueprint graph creation still usually requires editor steps; provide exact hookup instructions when automation is not available.
- Mobile builds require SDK/NDK/Xcode setup outside the project.

## Final Answer Requirements

For engine CLI tasks, include:

- detected engine and version when available
- detected project path and project type
- command planned or executed
- logs/results location if generated
- what could not run and why
