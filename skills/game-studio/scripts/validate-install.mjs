#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const skillDir = path.resolve(process.argv[2] || process.cwd());
const required = [
  "SKILL.md",
  "agents/openai.yaml",
  "references/engine-selection.md",
  "references/engine-cli.md",
  "references/game-design-checklist.md",
  "references/ai-studio-roster.md",
  "references/production-pipeline.md",
  "references/mobile-game.md",
  "references/project-templates.md",
  "references/publishing-web.md",
  "references/publishing-mobile.md",
  "references/publishing-steam.md",
  "references/engine-godot.md",
  "references/engine-unity.md",
  "references/engine-unreal.md",
  "references/asset-pipeline.md",
  "references/multiplayer.md",
  "references/save-systems.md",
  "references/monetization.md",
  "references/accessibility.md",
  "references/localization.md",
  "references/balancing.md",
  "references/playtesting.md",
  "references/ci-cd.md",
  "references/solo-dev.md",
  "references/game-jam.md",
  "references/studio-team.md",
  "references/education.md",
  "scripts/audit-game-project.mjs",
  "scripts/create-browser-game.mjs",
  "scripts/create-production-plan.mjs",
  "scripts/create-project-template.mjs",
  "scripts/detect-engines.mjs",
  "scripts/engine-cli.mjs"
];

const missing = required.filter((file) => !fs.existsSync(path.join(skillDir, file)));
const skillMd = path.join(skillDir, "SKILL.md");
let frontmatterOk = false;
if (fs.existsSync(skillMd)) {
  const text = fs.readFileSync(skillMd, "utf8");
  frontmatterOk = /^---\nname:\s*game-studio\n(description:[\s\S]*?)\n---/m.test(text);
}

if (missing.length || !frontmatterOk) {
  console.error(`Game Studio skill validation failed: ${skillDir}`);
  if (!frontmatterOk) console.error("- SKILL.md frontmatter is missing or invalid.");
  for (const file of missing) console.error(`- Missing ${file}`);
  process.exit(1);
}

console.log(`Game Studio skill looks installed correctly: ${skillDir}`);
