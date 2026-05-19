# Save Systems

Use for local saves, accounts, cloud sync, migrations, offline conflicts, and anti-cheat storage.

## Save Design

- Define what is saved: settings, progress, inventory, economy, unlocks, world state, analytics consent.
- Version every save file.
- Separate user settings from gameplay progress.
- Keep autosave moments clear and resilient.

## Storage Choices

- H5: `localStorage` for tiny settings, IndexedDB for larger structured saves.
- Unity: JSON/binary files under persistent data path; cloud saves through platform SDKs when needed.
- Godot: `user://` paths with JSON/Resource formats.
- Unreal: `SaveGame` objects for local saves; platform cloud integration for sync.

## Migrations

- Add `schemaVersion`.
- Migrate forward step by step; avoid destructive rewrites without backup.
- Test loading old saves before release.

## Cloud Conflicts

- Track `lastModified`, device id, playtime, and schema version.
- Ask the user when conflict risk is high.
- For idle games, server timestamps may be needed to prevent clock exploits.

## Anti-Cheat

- Do not rely on client-side obfuscation alone for competitive or monetized economies.
- Validate purchases and important currency server-side.
- Keep recovery tools for corrupted saves.
