# Mobile Game Reference

Use this reference for iOS, Android, H5, PWA, WebView, Unity mobile, Godot mobile, and Unreal mobile requests.

## Target Choices

- Mobile H5: best for lightweight casual games, share links, fast iteration, WeChat/browser-style distribution, and playable ads.
- PWA: best when the user wants "Add to Home Screen", offline caching, and app-like launch behavior without app-store review.
- WebView wrapper: best when the team wants native app packaging while keeping most gameplay in web code.
- Unity mobile: best for production Android/iOS games, ad networks, in-app purchases, controller support, and cross-platform pipelines.
- Godot mobile: best for open-source mobile prototypes, small 2D games, and lightweight native exports.
- Unreal mobile: best for high-fidelity 3D or existing Unreal projects that must target mobile with strict optimization.

## Touch-First Design

- Prefer tap, drag, swipe, long-press, and hold controls over keyboard-first input.
- Provide large touch targets: usually 44 CSS px or larger for H5 UI.
- Keep critical controls away from iOS safe areas, home indicator areas, and notches.
- Provide portrait/landscape behavior intentionally; do not rely on accidental responsive layout.
- For virtual joysticks, include dead zones, max radius, release snap-back, and multi-touch support.
- For action buttons, support press-and-hold where repeated actions matter.

## H5 And iOS Safari Notes

- Audio should unlock from a user gesture. Do not assume music or SFX can autoplay.
- Use `pointerdown`/`pointermove`/`pointerup` where practical; fall back to touch/mouse only when required.
- Avoid relying on fullscreen, orientation lock, vibration, background execution, or file APIs as mandatory gameplay features.
- Test on actual iOS Safari when possible. Desktop browser emulation is not enough for audio, viewport, and touch edge cases.
- Use CSS safe area variables for full-screen layouts: `env(safe-area-inset-top)`, `env(safe-area-inset-bottom)`, etc.
- Avoid tiny text and hover-only interactions.

## PWA Checklist

- Add a `manifest.webmanifest` with name, icons, orientation preference, display mode, and theme color.
- Add a service worker only when offline behavior is intentional and cache invalidation is handled.
- Provide loading and update states so users are not stuck on old cached builds.
- Include 192x192 and 512x512 icons at minimum.
- Verify install behavior on iOS Safari and Android Chrome separately.

## Mobile Performance Budget

- Target 60 FPS for simple 2D games; accept 30 FPS only when complexity justifies it.
- Keep draw calls, particle counts, dynamic lights, post-processing, and physics bodies under control.
- Compress images and atlases; prefer WebP/AVIF for web when compatibility is acceptable.
- Use object pooling for bullets, enemies, particles, and damage numbers.
- Avoid layout thrash in H5 HUDs; keep frequent animation inside canvas/WebGL.
- Profile on mid-range devices, not only desktop.

## Unity Mobile Notes

- Detect Unity version from `ProjectSettings/ProjectVersion.txt`.
- Prefer the Input System for modern touch/gamepad workflows unless the project already uses legacy input.
- Use addressables or sensible asset loading for larger games.
- Check Android/iOS player settings, orientation, bundle identifiers, signing placeholders, and build scenes.
- Consider URP for mobile rendering unless the existing project dictates another pipeline.

## Godot Mobile Notes

- Prefer Godot 4.x unless the repo is clearly Godot 3.x.
- Use `InputEventScreenTouch`, `InputEventScreenDrag`, or action mappings.
- Check export presets, orientation, stretch mode, texture import, and mobile renderer settings.
- Keep node counts and physics processing modest for mobile.

## Unreal Mobile Notes

- Confirm the target renderer and mobile feature level before recommending visual features.
- Prefer mobile-friendly materials, baked/static lighting where appropriate, and limited post-processing.
- Use device profiles and scalability settings.
- Provide Blueprint hookup steps when editor work is required and cannot be automated.

## QA Matrix

- iPhone Safari current iOS
- iPad Safari if tablet matters
- Android Chrome
- Desktop Chrome/Edge for baseline
- WebView build if wrapping
- Low/mid/high device classes for performance-sensitive games
