---
name: roll
description: Roll real dice for D&D and tabletop games, e.g. 1d20+5, 2d20kh1, 4d6dl1, advantage or disadvantage, damage, ability scores. Use whenever the user says roll, roll for initiative, roll damage, roll stats, or gives dice notation. Never invent a dice result.
argument-hint: "<dice> [adv|dis] [xN] [label], e.g. 1d20+8 adv initiative · 3d10 moonbeam · 4d6dl1 x6"
---

# /roll: real dice

Requested: **$ARGUMENTS**

**Never make up a number.** Every roll comes from the script, which uses cryptographic
randomness. A roll is a fact about the world, so the model doesn't author it.

```
node "${CLAUDE_PLUGIN_ROOT}/scripts/roll.js" $ARGUMENTS
```

Print the script's output as it comes: total in bold, every die shown, dropped dice struck
through, and natural 20s and 1s marked. **No commentary unless the user asks.**

## Notation

| Write | Means |
|---|---|
| `1d20+5` · `d20+5` | one d20 plus 5 |
| `d20 adv` / `d20 dis` | advantage or disadvantage (2d20, keep high or low) |
| `2d20kh1` · `2d20kl1` | the same, spelled out |
| `4d6dl1 x6` | ability scores: drop the lowest, six times |
| `8d6` · `3d8+4` · `1d8+2d6+4` | damage, mixed dice |
| `d%` | percentile |
| words after the dice | a label: `3d10 moonbeam` |

## When the user says it in words

Turn it into notation, then roll. "Roll initiative" → their initiative bonus if it's known,
otherwise ask once. "Moonbeam at 3rd level" → `3d10 moonbeam`. **Say the notation you used** on
the line above the result, so they can check it.
