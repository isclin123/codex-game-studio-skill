#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";

const args = process.argv.slice(2);
function arg(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}
const execute = args.includes("--execute");
const project = path.resolve(arg("project", process.cwd()));
let engine = arg("engine", "auto").toLowerCase();
const action = arg("action", "check").toLowerCase();
const enginePath = arg("engine-path", null);

function exists(file) {
  try { return fs.existsSync(file); } catch { return false; }
}

function commandExists(command) {
  const checker = process.platform === "win32" ? "where" : "which";
  try {
    const out = execFileSync(checker, [command], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], timeout: 5000 }).trim();
    return out ? out.split(/\r?\n/)[0] : null;
  } catch {
    return null;
  }
}

function detectProject(root) {
  if (exists(path.join(root, "project.godot"))) return "godot";
  if (exists(path.join(root, "Assets")) && exists(path.join(root, "ProjectSettings", "ProjectVersion.txt"))) return "unity";
  const files = exists(root) ? fs.readdirSync(root) : [];
  if (files.some((file) => file.endsWith(".uproject"))) return "unreal";
  return "unknown";
}

function findUnrealProject(root) {
  const files = exists(root) ? fs.readdirSync(root) : [];
  const hit = files.find((file) => file.endsWith(".uproject"));
  return hit ? path.join(root, hit) : null;
}

function quote(value) {
  return /\s/.test(value) ? `"${value}"` : value;
}

function firstCommand(candidates) {
  if (enginePath) return path.resolve(enginePath);
  for (const cmd of candidates) {
    const found = commandExists(cmd);
    if (found) return found;
  }
  return null;
}

function unityVersion(root) {
  const versionFile = path.join(root, "ProjectSettings", "ProjectVersion.txt");
  if (!exists(versionFile)) return null;
  const text = fs.readFileSync(versionFile, "utf8");
  const match = text.match(/m_EditorVersion:\s*(.+)/);
  return match ? match[1].trim() : null;
}

if (engine === "auto") engine = detectProject(project);

let command = null;
let note = "";
if (engine === "godot") {
  const godot = firstCommand(["godot", "godot4", "godot3"]);
  if (!godot) note = "Godot command was not found on PATH. Run detect-engines.mjs to search common install locations, or pass --engine-path.";
  else if (action === "run") command = [godot, "--path", project];
  else command = [godot, "--headless", "--path", project, "--quit"];
} else if (engine === "unity") {
  const unity = firstCommand(process.platform === "win32" ? ["Unity.exe"] : ["Unity"]);
  const log = path.join(project, "Logs", `unity-${action}.log`);
  const results = path.join(project, "Logs", "unity-test-results.xml");
  if (!unity) note = "Unity editor command was not found on PATH. Run detect-engines.mjs or pass --engine-path after locating Unity.";
  else if (action === "test") command = [unity, "-batchmode", "-nographics", "-projectPath", project, "-runTests", "-testPlatform", "EditMode", "-testResults", results, "-logFile", log];
  else command = [unity, "-batchmode", "-nographics", "-quit", "-projectPath", project, "-logFile", log];
} else if (engine === "unreal") {
  const uproject = findUnrealProject(project);
  const unreal = firstCommand(process.platform === "win32" ? ["UnrealEditor-Cmd.exe", "UnrealEditor.exe"] : ["UnrealEditor-Cmd", "UnrealEditor"]);
  if (!uproject) note = "No .uproject file found in project root.";
  else if (!unreal) note = "Unreal editor command was not found on PATH. Run detect-engines.mjs to search common install locations, or pass --engine-path.";
  else command = [unreal, uproject, "-run=ResavePackages", "-ProjectOnly", "-Unattended"];
} else {
  note = "Could not detect project type. Expected project.godot, Unity Assets/ProjectSettings, or a .uproject file.";
}

const report = {
  project,
  detectedProject: detectProject(project),
  engine,
  action,
  enginePath: enginePath ? path.resolve(enginePath) : null,
  unityVersion: engine === "unity" ? unityVersion(project) : null,
  execute,
  command,
  commandLine: command ? command.map(quote).join(" ") : null,
  note
};

console.log(JSON.stringify(report, null, 2));

if (execute && command) {
  const [cmd, ...cmdArgs] = command;
  const result = spawnSync(cmd, cmdArgs, { stdio: "inherit", shell: false });
  process.exit(result.status ?? 1);
}
