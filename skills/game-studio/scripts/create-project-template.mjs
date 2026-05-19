#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
function arg(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}

const name = arg("name", "game-project");
const genre = arg("genre", "tower-defense").toLowerCase();
const platform = arg("platform", "browser").toLowerCase();
const root = path.resolve(process.cwd(), `${name}-template`);

const templates = {
  "tower-defense": {
    loop: "Earn currency, place towers, survive waves, upgrade defenses, adapt to enemy types.",
    systems: ["Path and wave data", "Tower placement and targeting", "Projectile/effect resolution", "Economy and upgrades", "Lives, win/loss, restart"],
    slice: ["1 map", "3 tower types", "4 enemy types", "8 waves", "upgrade and sell flow"]
  },
  platformer: {
    loop: "Move, jump, avoid hazards, collect rewards, and reach the goal.",
    systems: ["Character controller", "Collision and hazards", "Camera", "Checkpoints", "Collectibles and goal"],
    slice: ["2 short levels", "coyote time", "jump buffering", "checkpoint", "hazard and collectible"]
  },
  "top-down-shooter": {
    loop: "Move, aim, shoot, dodge, collect upgrades, and survive waves or rooms.",
    systems: ["Movement and aiming", "Enemy AI", "Bullets and damage", "Pickups", "Room or wave manager"],
    slice: ["1 arena", "3 enemy types", "4 upgrades", "elite wave", "restart flow"]
  },
  roguelike: {
    loop: "Start a run, clear rooms, gain random upgrades, risk death, and unlock meta progress.",
    systems: ["Room generation or authored graph", "Upgrade pool", "Run state", "Enemy scaling", "Rewards and death"],
    slice: ["5 rooms", "10 upgrades", "3 enemies", "1 mini-boss", "run summary"]
  },
  "card-game": {
    loop: "Draw cards, spend resources, resolve effects, read enemy intent, and win encounters.",
    systems: ["Deck/hand/discard", "Effect resolver", "Enemy intent", "Status effects", "Reward draft"],
    slice: ["20 cards", "3 encounters", "1 elite", "basic relic/passive", "deck reward"]
  },
  puzzle: {
    loop: "Inspect the board, make a move, receive feedback, undo/restart, and solve the level.",
    systems: ["Board model", "Rule validator", "Input", "Undo/restart", "Level progression"],
    slice: ["12 levels", "1 core mechanic", "tutorial ramp", "undo", "level select"]
  },
  idle: {
    loop: "Generate resources, buy upgrades, unlock automation, and optimize growth.",
    systems: ["Resource model", "Upgrade tree", "Timers", "Offline progress", "Balance table"],
    slice: ["3 resources", "12 upgrades", "2 automation tiers", "prestige placeholder", "save/load"]
  }
};

const template = templates[genre] || templates["tower-defense"];
if (fs.existsSync(root)) {
  console.error(`Target already exists: ${root}`);
  process.exit(1);
}

fs.mkdirSync(root, { recursive: true });

const mobile = platform.includes("mobile") || platform.includes("ios") || platform.includes("android") || platform.includes("h5");
const gdd = `# ${name} Game Template

## Genre

${genre}

## Target Platform

${platform}

## Core Loop

${template.loop}

## First Vertical Slice

${template.slice.map((item) => `- ${item}`).join("\n")}

## Required Systems

${template.systems.map((item) => `- ${item}`).join("\n")}

## Controls

${mobile ? "- Touch-first controls\n- Safe-area-aware HUD\n- Audio unlock from first user gesture\n- Portrait/landscape decision documented" : "- Keyboard/mouse or controller controls\n- Remappable controls if the project grows\n- Pause/restart flow"}

## Definition Of Done

- Player can start, interact, progress, fail/win, and restart.
- HUD is readable at the target resolution.
- Assets load without broken paths.
- Performance is acceptable on the target device class.
- Build/run instructions are documented.
`;

const qa = `# QA Checklist

- Launches without console/runtime errors.
- First screen is playable, not a landing page.
- Controls work on target input device.
- Restart returns the game to a clean state.
- Win/loss states are reachable.
- HUD text does not overlap controls.
${mobile ? "- Tested on iOS Safari or target iOS wrapper.\n- Tested on Android Chrome or target Android wrapper.\n- Audio starts only after a user gesture.\n- Safe areas and orientation behavior are correct." : "- Tested at desktop and narrow viewport sizes."}
`;

const tasks = `# Production Tasks

## Design

- Lock player verb, objective, fail/win condition, scoring, and progression.
- Tune first 60 seconds for clarity and feedback.

## Engineering

${template.systems.map((item) => `- Implement ${item.toLowerCase()}.`).join("\n")}

## Art And Audio

- Define placeholder readability.
- List required sprites, UI states, SFX, and music loops.

## QA

- Run smoke test after each feature.
- Record device/browser/engine version used for validation.
`;

fs.writeFileSync(path.join(root, "GDD.md"), gdd);
fs.writeFileSync(path.join(root, "QA.md"), qa);
fs.writeFileSync(path.join(root, "TASKS.md"), tasks);

console.log(`Created ${genre} template for ${platform}: ${root}`);
