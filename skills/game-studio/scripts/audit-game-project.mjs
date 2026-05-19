#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
function arg(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}

const project = path.resolve(arg("project", process.cwd()));

function exists(p) { try { return fs.existsSync(p); } catch { return false; } }
function list(dir) { try { return fs.readdirSync(dir); } catch { return []; } }
function readJson(file) { try { return JSON.parse(fs.readFileSync(file, "utf8")); } catch { return null; } }

function detectType(root) {
  if (exists(path.join(root, "project.godot"))) return "godot";
  if (exists(path.join(root, "Assets")) && exists(path.join(root, "ProjectSettings"))) return "unity";
  if (list(root).some((f) => f.endsWith(".uproject"))) return "unreal";
  if (exists(path.join(root, "skills")) || exists(path.join(root, "SKILL.md"))) return "codex-skill";
  if (exists(path.join(root, "package.json"))) return "web";
  return "unknown";
}

function walk(root, maxDepth = 3, depth = 0, found = []) {
  if (!exists(root) || depth > maxDepth || found.length > 5000) return found;
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (["node_modules", ".git", "Library", "Temp", "Binaries", "Intermediate", "Saved"].includes(entry.name)) continue;
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) walk(full, maxDepth, depth + 1, found);
    else found.push(full);
  }
  return found;
}

const files = walk(project);
const type = detectType(project);
const pkg = readJson(path.join(project, "package.json"));
const assetExt = /\.(png|jpg|jpeg|webp|avif|gif|svg|mp3|ogg|wav|glb|gltf|fbx|ttf|otf)$/i;
const testExt = /\.(test|spec)\.(js|ts|tsx|jsx)$/i;
const sourceExt = /\.(js|mjs|cjs|ts|tsx|jsx|py|cs|gd|cpp|h|hpp|blueprint)$/i;

const checks = [
  { id: "readme", ok: exists(path.join(project, "README.md")), note: "README.md present" },
  { id: "gitignore", ok: exists(path.join(project, ".gitignore")), note: ".gitignore present" },
  { id: "assets", ok: files.some((f) => assetExt.test(f)), note: "game asset files found" },
  { id: "source", ok: files.some((f) => sourceExt.test(f)), note: "source files found" },
  { id: "tests", ok: files.some((f) => testExt.test(f)) || exists(path.join(project, "Tests")) || exists(path.join(project, "test")), note: "test files/folders found" },
  { id: "web-build", ok: !!pkg?.scripts?.build || type !== "web", note: "web build script present when applicable" },
  { id: "web-dev", ok: !!pkg?.scripts?.dev || type !== "web", note: "web dev script present when applicable" },
  { id: "mobile", ok: exists(path.join(project, "manifest.webmanifest")) || exists(path.join(project, "capacitor.config.ts")) || exists(path.join(project, "ProjectSettings")) || type !== "web", note: "mobile/PWA indicators present when applicable" },
  { id: "ci", ok: exists(path.join(project, ".github", "workflows")), note: "GitHub Actions workflows present" }
];

const score = checks.filter((c) => c.ok).length;
const report = {
  project,
  type,
  fileCount: files.length,
  assetCount: files.filter((f) => assetExt.test(f)).length,
  sourceCount: files.filter((f) => sourceExt.test(f)).length,
  score: `${score}/${checks.length}`,
  checks,
  recommendations: checks.filter((c) => !c.ok).map((c) => {
    if (c.id === "tests") return "Add at least smoke tests, playtest checklist, or engine-native test folders.";
    if (c.id === "ci") return "Add CI for build/test artifacts when the project is shared or released.";
    if (c.id === "assets") return "Add real or placeholder game assets; avoid shipping a static UI demo.";
    if (c.id === "readme") return "Add README with controls, run steps, target platforms, and known limitations.";
    if (c.id === "gitignore") return "Add engine-appropriate .gitignore.";
    if (c.id === "mobile") return "Add manifest/PWA, Capacitor, or platform configuration for mobile targets.";
    return `Address ${c.id}.`;
  })
};

console.log(JSON.stringify(report, null, 2));
