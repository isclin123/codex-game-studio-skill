# Balancing

Use for numbers, progression curves, enemy stats, rewards, economy, level pacing, and tuning tables.

## Balance Tables

- Keep tunable numbers in data where possible: CSV, JSON, ScriptableObjects, Resources, DataTables.
- Include ids, display names, base values, growth values, rarity/tier, and notes.
- Separate prototype values from release values.

## Common Curves

- Linear: predictable upgrades and tutorial pacing.
- Exponential: power fantasy, idle growth, late-game scaling.
- Logistic/soft cap: prevents runaway scaling.
- Step curves: unlock tiers and content gates.

## Combat Metrics

- Time to kill, damage per second, enemy effective HP.
- Player survivability, healing rate, mistake tolerance.
- Cooldown uptime and burst windows.

## Economy Metrics

- Sources, sinks, hoarding, inflation.
- First-session rewards, upgrade costs, payback time.
- Drop rates and pity/guarantee rules when randomness affects progression.

## Tuning Loop

- Define target feel.
- Instrument key metrics.
- Change one cluster of variables at a time.
- Re-test early, mid, and late progression.
