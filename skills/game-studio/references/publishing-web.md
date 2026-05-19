# Web Publishing Reference

Use for browser games, H5 games, PWA deployments, playable demos, and web release planning.

## Common Targets

- GitHub Pages: simple static hosting for demos and portfolio projects.
- Netlify/Vercel/Cloudflare Pages: production-friendly static hosting with previews.
- itch.io: excellent for game jams, web builds, and indie distribution.
- Personal site: best when the creator wants branding, analytics, press kit, or community funnels.
- WeChat/mini-game ecosystems: usually require platform-specific SDK and review; treat ordinary H5 as a separate path.

## Build Checklist

- Run a production build, not only a dev server.
- Verify asset paths with the deployed base path.
- Confirm canvas/WebGL renders after refresh and direct URL entry.
- Confirm mobile viewport, safe areas, touch controls, and audio unlock.
- Check loading state, error state, and retry behavior.
- Keep source maps private if code exposure is a concern.

## H5 Release Package

- `index.html`
- bundled JS/CSS
- compressed assets
- icons and social preview image
- `manifest.webmanifest` for PWA targets
- service worker only when offline support is intentional
- short README with controls and deployment steps

## Analytics And Live Ops

- Add analytics only with user consent and privacy expectations in mind.
- Track start, fail, win, restart, level complete, session length, and device class.
- Keep remote config optional; a broken config service should not prevent gameplay.

## Final Answer Requirements

When finishing a web publishing task, include:

- build command
- local preview command
- output directory
- deployment target
- known limitations
- mobile test status
