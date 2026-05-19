#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
function arg(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}

const name = arg("name", "codex-game");
const engine = arg("engine", "canvas").toLowerCase();
const template = arg("template", "arcade").toLowerCase();
const root = path.resolve(process.cwd(), name);

if (!["canvas", "phaser", "three"].includes(engine)) {
  console.error("engine must be one of: canvas, phaser, three");
  process.exit(1);
}
const templateNames = ["arcade", "tower-defense", "platformer", "mobile-portrait", "roguelike", "top-down-shooter", "puzzle", "idle"];
if (!templateNames.includes(template)) {
  console.error(`template must be one of: ${templateNames.join(", ")}`);
  process.exit(1);
}
if (fs.existsSync(root)) {
  console.error(`Target already exists: ${root}`);
  process.exit(1);
}

fs.mkdirSync(path.join(root, "src"), { recursive: true });

const pkg = {
  scripts: { dev: "vite --host 127.0.0.1", build: "vite build", preview: "vite preview --host 127.0.0.1" },
  dependencies: engine === "phaser" ? { "@vitejs/plugin-react": "latest", vite: "latest", typescript: "latest", phaser: "latest" }
    : engine === "three" ? { "@vitejs/plugin-react": "latest", vite: "latest", typescript: "latest", three: "latest" }
    : { "@vitejs/plugin-react": "latest", vite: "latest", typescript: "latest" },
  devDependencies: {}
};

fs.writeFileSync(path.join(root, "package.json"), JSON.stringify(pkg, null, 2));
fs.writeFileSync(path.join(root, "index.html"), `<div id="app"></div><script type="module" src="/src/main.js"></script>\n`);
fs.writeFileSync(path.join(root, "src", "styles.css"), `html,body,#app{margin:0;width:100%;height:100%;overflow:hidden;background:#10131f;color:#f7f4e8;font-family:Inter,system-ui,Segoe UI,sans-serif}button{font:inherit}canvas{display:block}\n`);

const canvasMain = `import "./styles.css";

const app = document.querySelector("#app");
app.innerHTML = \`<canvas id="game"></canvas><div class="hud"><b>Star Dash</b><span id="score">0</span><button id="restart">Restart</button></div>\`;
const style = document.createElement("style");
style.textContent = \`.hud{position:fixed;left:16px;right:16px;top:12px;display:flex;gap:14px;align-items:center;justify-content:space-between}.hud button{border:0;border-radius:6px;padding:8px 12px;background:#f7c948;color:#151515;font-weight:700}\`;
document.head.appendChild(style);

const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const keys = new Set();
let state;

function reset(){
  state = { score:0, over:false, player:{x:120,y:200,r:16,vx:0,vy:0}, stars:[], hazards:[], t:0 };
  for(let i=0;i<8;i++) spawnStar();
}
function resize(){ canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio; ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0); }
function spawnStar(){ state.stars.push({x:80+Math.random()*(innerWidth-160), y:80+Math.random()*(innerHeight-160), r:8}); }
function spawnHazard(){ state.hazards.push({x:innerWidth+30, y:70+Math.random()*(innerHeight-140), r:14, vx:2+Math.random()*2}); }
function hit(a,b){ return Math.hypot(a.x-b.x,a.y-b.y) < a.r+b.r; }
function update(){
  if(state.over) return;
  state.t++;
  const p = state.player;
  p.vx += (keys.has("ArrowRight")||keys.has("d") ? .55 : 0) - (keys.has("ArrowLeft")||keys.has("a") ? .55 : 0);
  p.vy += (keys.has("ArrowDown")||keys.has("s") ? .55 : 0) - (keys.has("ArrowUp")||keys.has("w") ? .55 : 0);
  p.vx *= .86; p.vy *= .86; p.x += p.vx; p.y += p.vy;
  p.x = Math.max(p.r, Math.min(innerWidth-p.r, p.x)); p.y = Math.max(58, Math.min(innerHeight-p.r, p.y));
  if(state.t % 70 === 0) spawnHazard();
  state.hazards.forEach(h => h.x -= h.vx);
  state.hazards = state.hazards.filter(h => h.x > -40);
  state.stars = state.stars.filter(s => { if(hit(p,s)){ state.score += 10; document.querySelector("#score").textContent = state.score; spawnStar(); return false; } return true; });
  if(state.hazards.some(h => hit(p,h))) state.over = true;
}
function draw(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  const grd = ctx.createLinearGradient(0,0,innerWidth,innerHeight); grd.addColorStop(0,"#151c33"); grd.addColorStop(1,"#203b3b"); ctx.fillStyle=grd; ctx.fillRect(0,0,innerWidth,innerHeight);
  ctx.fillStyle="#f7c948"; state.stars.forEach(s=>{ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();});
  ctx.fillStyle="#ff5c7a"; state.hazards.forEach(h=>{ctx.beginPath();ctx.arc(h.x,h.y,h.r,0,Math.PI*2);ctx.fill();});
  ctx.fillStyle="#7ee7ff"; const p=state.player; ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
  if(state.over){ ctx.fillStyle="rgba(0,0,0,.55)";ctx.fillRect(0,0,innerWidth,innerHeight);ctx.fillStyle="#fff";ctx.textAlign="center";ctx.font="700 42px system-ui";ctx.fillText("Game Over",innerWidth/2,innerHeight/2);ctx.font="18px system-ui";ctx.fillText("Press Restart",innerWidth/2,innerHeight/2+36); }
}
function loop(){ update(); draw(); requestAnimationFrame(loop); }
addEventListener("resize", resize); addEventListener("keydown",e=>keys.add(e.key)); addEventListener("keyup",e=>keys.delete(e.key)); document.querySelector("#restart").onclick=reset;
resize(); reset(); loop();
`;

const phaserMain = `import "./styles.css";
import Phaser from "phaser";

class GameScene extends Phaser.Scene {
  constructor(){ super("game"); }
  create(){
    this.score = 0;
    this.add.rectangle(400,300,800,600,0x172033);
    this.player = this.add.circle(120,300,16,0x7ee7ff);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);
    this.stars = this.physics.add.group();
    this.hazards = this.physics.add.group();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.scoreText = this.add.text(16,16,"Score 0",{fontSize:"22px",color:"#f7f4e8"});
    this.add.text(16,44,"Collect gold, dodge red",{fontSize:"14px",color:"#cfd7ff"});
    for(let i=0;i<8;i++) this.spawnStar();
    this.time.addEvent({delay:900,loop:true,callback:()=>this.spawnHazard()});
    this.physics.add.overlap(this.player,this.stars,(_,s)=>{s.destroy();this.score+=10;this.scoreText.setText("Score "+this.score);this.spawnStar();});
    this.physics.add.overlap(this.player,this.hazards,()=>this.scene.restart());
  }
  spawnStar(){ const s=this.add.circle(80+Math.random()*640,80+Math.random()*440,8,0xf7c948); this.physics.add.existing(s); this.stars.add(s); }
  spawnHazard(){ const h=this.add.circle(830,60+Math.random()*480,14,0xff5c7a); this.physics.add.existing(h); h.body.setVelocityX(-150-Math.random()*120); this.hazards.add(h); }
  update(){
    const b=this.player.body; b.setVelocity(0);
    if(this.cursors.left.isDown) b.setVelocityX(-230); else if(this.cursors.right.isDown) b.setVelocityX(230);
    if(this.cursors.up.isDown) b.setVelocityY(-230); else if(this.cursors.down.isDown) b.setVelocityY(230);
    this.hazards.children.iterate(h=>{ if(h && h.x < -30) h.destroy(); });
  }
}
new Phaser.Game({ type:Phaser.AUTO, parent:"app", width:800, height:600, backgroundColor:"#10131f", physics:{default:"arcade"}, scale:{mode:Phaser.Scale.FIT, autoCenter:Phaser.Scale.CENTER_BOTH}, scene:GameScene });
`;

const threeMain = `import "./styles.css";
import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x10131f);
const camera = new THREE.PerspectiveCamera(65, innerWidth/innerHeight, 0.1, 100);
camera.position.set(0, 5, 8);
const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize(innerWidth, innerHeight);
document.querySelector("#app").appendChild(renderer.domElement);
scene.add(new THREE.HemisphereLight(0xffffff,0x203040,2.4));
const player = new THREE.Mesh(new THREE.SphereGeometry(.35,24,16), new THREE.MeshStandardMaterial({color:0x7ee7ff}));
scene.add(player);
const floor = new THREE.Mesh(new THREE.BoxGeometry(9,.1,12), new THREE.MeshStandardMaterial({color:0x26364f}));
floor.position.y=-.45; scene.add(floor);
const keys = new Set(); let score=0;
const hud=document.createElement("div"); hud.style.cssText="position:fixed;top:14px;left:16px;color:#fff;font:700 20px system-ui"; hud.textContent="Orbs 0"; document.body.appendChild(hud);
const orbs=[]; const hazards=[];
function orb(){ const m=new THREE.Mesh(new THREE.SphereGeometry(.18,16,12), new THREE.MeshStandardMaterial({color:0xf7c948, emissive:0x332200})); m.position.set((Math.random()-.5)*7,0,(Math.random()-.5)*9); scene.add(m); orbs.push(m); }
function hazard(){ const m=new THREE.Mesh(new THREE.BoxGeometry(.45,.45,.45), new THREE.MeshStandardMaterial({color:0xff5c7a})); m.position.set(4.5,0,(Math.random()-.5)*9); scene.add(m); hazards.push(m); }
for(let i=0;i<8;i++) orb(); setInterval(hazard,900);
function animate(){
  requestAnimationFrame(animate);
  const speed=.08; if(keys.has("ArrowLeft")||keys.has("a")) player.position.x-=speed; if(keys.has("ArrowRight")||keys.has("d")) player.position.x+=speed; if(keys.has("ArrowUp")||keys.has("w")) player.position.z-=speed; if(keys.has("ArrowDown")||keys.has("s")) player.position.z+=speed;
  player.position.x=THREE.MathUtils.clamp(player.position.x,-4,4); player.position.z=THREE.MathUtils.clamp(player.position.z,-5,5);
  hazards.forEach(h=>{h.position.x-=.055; h.rotation.x+=.04; h.rotation.y+=.03;});
  for(let i=orbs.length-1;i>=0;i--) if(player.position.distanceTo(orbs[i].position)<.55){ scene.remove(orbs[i]); orbs.splice(i,1); score++; hud.textContent="Orbs "+score; orb(); }
  if(hazards.some(h=>player.position.distanceTo(h.position)<.55)){ player.material.color.set(0xffffff); hud.textContent="Hit! Refresh or keep dodging"; }
  camera.lookAt(player.position); renderer.render(scene,camera);
}
addEventListener("resize",()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
addEventListener("keydown",e=>keys.add(e.key)); addEventListener("keyup",e=>keys.delete(e.key)); animate();
`;

fs.writeFileSync(path.join(root, "src", "main.js"), engine === "phaser" ? phaserMain : engine === "three" ? threeMain : canvasMain);
const templateNotes = {
  arcade: ["Collectible score loop", "Hazards", "Restart", "Desktop controls"],
  "tower-defense": ["Map path", "Build pads", "Tower targeting", "Wave economy", "Upgrade/sell UI"],
  platformer: ["Movement controller", "Jump feel", "Hazards", "Checkpoints", "Goal"],
  "mobile-portrait": ["Portrait-first HUD", "Large touch targets", "Audio unlock", "Safe-area padding"],
  roguelike: ["Room loop", "Upgrade pool", "Run state", "Enemy scaling", "Reward screen"],
  "top-down-shooter": ["Twin-stick controls", "Enemy AI", "Projectiles", "Pickups", "Wave manager"],
  puzzle: ["Board model", "Rule validator", "Undo/restart", "Level data", "Progression"],
  idle: ["Resource model", "Upgrade tree", "Offline progress", "Save/load", "Number formatting"]
};
fs.writeFileSync(path.join(root, "GAME_TEMPLATE.md"), `# ${name} Template

Engine: ${engine}
Template: ${template}

## Starter Focus

${templateNotes[template].map((item) => `- ${item}`).join("\n")}

## Next Build Steps

- Replace the generic starter loop with the template-specific core loop.
- Keep start/restart, HUD, feedback, win/loss, and mobile controls where relevant.
- Run \`npm install\`, \`npm run dev\`, and verify desktop plus narrow viewport behavior.
`);
console.log(`Created ${engine} ${template} game starter at ${root}`);
console.log("Next: npm install && npm run dev");
