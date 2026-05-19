# Mobile Publishing Reference

Use for App Store, Google Play, TestFlight, Android APK/AAB, WebView wrappers, and mobile release planning.

## Release Paths

- H5/PWA: fastest public distribution, easiest updates, limited native APIs.
- WebView wrapper: app-store package around web content; add meaningful native value to reduce review risk.
- Unity native: standard route for commercial mobile games with ads, IAP, analytics, and platform SDKs.
- Godot native: good for small native 2D/3D mobile games.
- Unreal native: good for existing Unreal projects with mobile optimization investment.

## App Store Notes

- Avoid a pure website-in-a-wrapper experience when targeting App Store review.
- Include meaningful app functionality: offline content, native integration, account/save, notifications where appropriate, Game Center, IAP, or polished native shell.
- Prepare privacy labels, age rating, screenshots, app description, support URL, and review notes.
- Test with TestFlight before public release.

## Google Play Notes

- Prefer Android App Bundle (`.aab`) for release.
- Prepare signing, package name, target SDK, privacy policy, data safety form, screenshots, and store listing.
- Test internal, closed, or open tracks before production.

## Monetization Checklist

- Ads: choose network, placements, cooldowns, consent flow, and no-ad purchase if relevant.
- IAP: define products, restore purchases, receipt validation, and fail states.
- Premium: make demo/full version boundaries clear.
- Cosmetics/battle pass: document economy and fairness rules.

## Compliance And Safety

- Include privacy policy if collecting analytics, identifiers, accounts, or crash data.
- Consider child-directed rules when art, gameplay, or audience suggests minors.
- Avoid dark patterns in ads, purchases, and reward loops.
- For user-generated content, define moderation and reporting flows.

## Mobile Release QA

- Cold launch, resume, suspend, orientation change.
- Offline behavior and poor network behavior.
- Audio after mute switch, background/resume, Bluetooth/headphones.
- Save/load, cloud sync if present, update migration.
- Device performance and battery/thermal behavior.
- Store build signing and version code/version number.
