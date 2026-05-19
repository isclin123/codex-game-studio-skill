# Localization

Use for multilingual UI, string tables, CJK fonts, RTL languages, text expansion, and localization QA.

## String Architecture

- Keep player-facing text out of code when possible.
- Use stable string ids: `menu.start`, `tower.cannon.name`.
- Support variables and pluralization intentionally.
- Avoid concatenating translated fragments.

## Layout

- Expect 30-50 percent expansion in many languages.
- CJK needs font coverage and different line-breaking behavior.
- RTL languages require layout mirroring and bidirectional text checks.
- Avoid text baked into images unless source files and localized exports exist.

## Fonts

- Check licenses.
- Use fallback stacks for H5 and font assets for engines.
- Test Chinese, Japanese, Korean, accents, punctuation, and emoji if used.

## QA

- Pseudo-localize early.
- Check clipping in buttons, cards, HUD, subtitles, and tooltips.
- Verify save data and analytics are language-independent.
