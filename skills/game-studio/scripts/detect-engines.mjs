#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";

const isWin = process.platform === "win32";
const home = os.homedir();

function exists(file) {
  try { return fs.existsSync(file); } catch { return false; }
}

function runVersion(command, args = ["--version"]) {
  try {
    return execFileSync(command, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], timeout: 8000 }).trim().split(/\r?\n/)[0];
  } catch {
    return null;
  }
}

function commandExists(command) {
  const checker = isWin ? "where" : "which";
  try {
    const out = execFileSync(checker, [command], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], timeout: 5000 }).trim();
    return out ? out.split(/\r?\n/)[0] : null;
  } catch {
    return null;
  }
}

function findFiles(root, matcher, maxDepth = 4, depth = 0, found = []) {
  if (!exists(root) || depth > maxDepth || found.length > 20) return found;
  let entries = [];
  try { entries = fs.readdirSync(root, { withFileTypes: true }); } catch { return found; }
  for (const entry of entries) {
    const full = path.join(root, entry.name);
    if (entry.isFile() && matcher(full)) found.push(full);
    else if (entry.isDirectory() && !["node_modules", "$Recycle.Bin", "System Volume Information"].includes(entry.name)) {
      findFiles(full, matcher, maxDepth, depth + 1, found);
    }
    if (found.length > 20) break;
  }
  return found;
}

function detectGodot() {
  const commands = ["godot", "godot4", "godot3"];
  const candidates = [];
  for (const cmd of commands) {
    const found = commandExists(cmd);
    if (found) candidates.push(found);
  }
  if (isWin) {
    const roots = [path.join(home, "Downloads"), path.join(home, "Desktop"), "C:\\Program Files", "C:\\Program Files (x86)"];
    for (const root of roots) {
      candidates.push(...findFiles(root, (file) => /godot.*\.exe$/i.test(path.basename(file)), 3));
    }
  }
  return [...new Set(candidates)].map((file) => ({ path: file, version: runVersion(file) }));
}

function detectUnity() {
  const candidates = [];
  const commands = isWin ? ["Unity.exe"] : ["Unity"];
  for (const cmd of commands) {
    const found = commandExists(cmd);
    if (found) candidates.push(found);
  }
  if (isWin) {
    candidates.push(...findFiles("C:\\Program Files\\Unity\\Hub\\Editor", (file) => /\\Editor\\Unity\.exe$/i.test(file), 4));
    candidates.push(...findFiles("C:\\Program Files", (file) => /\\Editor\\Unity\.exe$/i.test(file), 4));
  } else if (process.platform === "darwin") {
    candidates.push(...findFiles("/Applications", (file) => /Unity\.app\/Contents\/MacOS\/Unity$/.test(file), 5));
  }
  return [...new Set(candidates)].map((file) => ({ path: file, version: runVersion(file, ["-version"]) }));
}

function detectUnreal() {
  const candidates = [];
  const commands = isWin ? ["UnrealEditor-Cmd.exe", "UnrealEditor.exe"] : ["UnrealEditor-Cmd", "UnrealEditor"];
  for (const cmd of commands) {
    const found = commandExists(cmd);
    if (found) candidates.push(found);
  }
  if (isWin) {
    candidates.push(...findFiles("C:\\Program Files\\Epic Games", (file) => /\\Engine\\Binaries\\Win64\\UnrealEditor(-Cmd)?\.exe$/i.test(file), 5));
    candidates.push(...findFiles("C:\\Program Files", (file) => /\\Engine\\Binaries\\Win64\\UnrealEditor(-Cmd)?\.exe$/i.test(file), 5));
  }
  return [...new Set(candidates)].map((file) => ({ path: file, version: runVersion(file, ["-version"]) }));
}

const result = {
  platform: process.platform,
  godot: detectGodot(),
  unity: detectUnity(),
  unreal: detectUnreal()
};

console.log(JSON.stringify(result, null, 2));
