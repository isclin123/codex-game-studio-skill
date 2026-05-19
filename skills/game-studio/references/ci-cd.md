# CI/CD

Use for GitHub Actions, automated web builds, engine tests, artifacts, release candidates, and build automation.

## Web Games

- Run install, lint/test if present, production build, and upload `dist/` artifact.
- For static hosting, deploy only from protected branches or tagged releases.
- Check asset path base when deploying to GitHub Pages.

## Godot

- Use headless validation when Godot is available.
- Export requires templates and configured export presets.
- Cache engine downloads only when license and CI time make sense.

## Unity

- Use batchmode for compile checks and tests.
- Pin Unity version from `ProjectSettings/ProjectVersion.txt`.
- Store license/secrets outside the repo.
- Upload logs and test results as artifacts.

## Unreal

- CI is heavy; prefer targeted build/test jobs.
- Use AutomationTool/UnrealBuildTool where engine is installed.
- Cache carefully; Unreal artifacts can be huge.

## Release Safety

- Build from clean checkout.
- Version builds.
- Archive logs, test results, and build artifacts.
- Separate nightly, release candidate, and production workflows.
