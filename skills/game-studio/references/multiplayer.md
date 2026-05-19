# Multiplayer

Use for local multiplayer, online rooms, co-op, PvP, replication, prediction, rollback, and anti-cheat.

## Choose The Model

- Local multiplayer: same device, easiest for party games.
- Turn-based async: simple server state and low latency pressure.
- Real-time co-op: server-authoritative state for shared enemies/objectives.
- PvP action: prediction, reconciliation, lag compensation, and anti-cheat are central.
- Deterministic rollback: good for fighting games and deterministic simulations, expensive to design.

## Core Systems

- Lobby/room creation, join, leave, reconnect.
- Player identity, session token, ready state.
- State authority: client-authoritative only for trusted prototypes; server-authoritative for competitive games.
- Network serialization, interpolation, prediction, reconciliation.
- Match end, rewards, disconnect handling.

## Engine Choices

- Web/H5: WebSocket for simple real-time, WebRTC for peer-to-peer only when NAT complexity is acceptable.
- Unity: Netcode for GameObjects, Mirror, Fish-Networking, Photon, or custom transport based on team needs.
- Godot: high-level multiplayer API for small projects; custom server for competitive games.
- Unreal: built-in replication is strong for action games but requires careful bandwidth and authority design.

## Anti-Cheat Basics

- Never trust client currency, inventory, score, or match result in competitive contexts.
- Validate movement speed, fire rate, cooldowns, damage, and rewards server-side.
- Log suspicious events before banning.
- Design replay/debug tools early for PvP.
