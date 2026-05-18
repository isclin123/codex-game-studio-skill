#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
function arg(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}

const name = arg("name", "game-project");
const engine = arg("engine", "browser");
const genre = arg("genre", "action");
const out = path.resolve(process.cwd(), `${name}-production-plan`);

if (fs.existsSync(out)) {
  console.error(`Target already exists: ${out}`);
  process.exit(1);
}
fs.mkdirSync(out, { recursive: true });

const roles = [
  "Creative Director",
  "Game Director",
  "Lead Game Designer",
  "Technical Director",
  "Gameplay Engineer",
  "UX Designer",
  "Art Director",
  "QA Lead",
  "Producer",
  "Performance Engineer",
  "Legal/IP Reviewer",
];

const md = `# ${name} Production Plan

Engine: ${engine}
Genre: ${genre}

## Selected AI Studio Team

${roles.map((role) => `- ${role}`).join("\n")}

## Game Pillars

1. Clear one-minute loop.
2. Immediate readable feedback.
3. Scope small enough for a vertical slice.
4. Engine-native implementation.

## Core Loop

Player acts -> game responds -> risk/reward changes -> player upgrades/adapts -> objective resolves.

## Vertical Slice

- One playable level or arena.
- HUD and controls.
- Win/loss/restart.
- Representative art/audio placeholders.
- QA checklist and known risks.

## Milestones

| Milestone | Goal | Done When |
| --- | --- | --- |
| Concept | Lock pillars and audience | Pitch, controls, risks written |
| Graybox | Prove playability | Playable ugly scene |
| Vertical Slice | Show final intent | One polished loop |
| Beta | Feature complete | Content and tuning pass |
| Release Candidate | Ship check | Build, QA, docs complete |

## Backlog

- Design: player verbs, enemies, levels, economy.
- Engineering: scene setup, gameplay systems, UI, save/settings.
- Art: style guide, asset list, placeholder pass, final pass.
- Audio: SFX list, music direction, mix.
- QA: smoke tests, device/platform matrix, playtest script.
`;

fs.writeFileSync(path.join(out, "GAME_PRODUCTION_PLAN.md"), md);
fs.writeFileSync(path.join(out, "PLAYTEST_SCRIPT.md"), `# Playtest Script

1. Can the player understand the goal in 10 seconds?
2. Can the player complete the first objective without instruction?
3. What confused them?
4. Where did they feel tension?
5. What would they try next?
`);
fs.writeFileSync(path.join(out, "QA_CHECKLIST.md"), `# QA Checklist

- Starts without errors.
- Player can control the game.
- Win/loss/restart works.
- HUD readable.
- No missing assets.
- Performance acceptable for target platform.
`);

console.log(`Created production plan at ${out}`);
