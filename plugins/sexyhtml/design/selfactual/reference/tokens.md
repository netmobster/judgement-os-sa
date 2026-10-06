# Tokens

All variables are defined on `:root` in `tokens/*.css` and loaded by `styles.css`. Use them as `var(--name)`.

## Grounds and text
| Token | Value | Use |
| --- | --- | --- |
| `--color-bg` | #fafaf7 | Light ground (paper). Page background. |
| `--color-surface` | #f1f0ec | Panels, quotes, open (unproven) ledger rows. |
| `--color-text` | #16181d | Headings on light. |
| `--color-white` | #ffffff | Cards, ledger rows, inputs, dialogs. |
| `--color-divider` | 14% of #16181d | Hairline borders. |
| `--color-ink` | #101418 | Ink ground. Cover, turn, close. |
| `--color-ink-surface` | #1c222b | Cards and panels on ink. |
| `--color-ink-line` | #1c222b | Hairlines on ink. |
| `--color-ink-text` | #f7f8fa | Headings on ink. |
| `--color-ink-muted` | #c2c8d2 | Body on ink. Never pure white. |
| `--color-ink-dim` | #8b919c | Secondary text on ink. |
| `--color-ink-faint` | #6d737d | Folio, dates, numbers on ink. |
| `--color-ink-accent` | #38bdf8 | Accent on ink (sky). |
| `--color-ink-accent-2` | #67e8f9 | Accent-2 on ink (cyan). |

## Accents
| Token | Value |
| --- | --- |
| `--color-accent` | #2563eb (= accent-600) |
| `--color-accent-2` | #06b6d4 (= accent-2-600) |
| `--color-accent-100…900` | #eef4ff · #dbe8ff · #bfd5fd · #7ea8f8 · #3b82f6 · #2563eb · #1d4ed8 · #1e3a8a · #172554 |
| `--color-accent-2-100…900` | #ecfeff · #cffafe · #a5f3fc · #67e8f9 · #22d3ee · #06b6d4 · #0e7490 · #155e75 · #083344 |
| `--color-neutral-100…900` | #f7f7f4 · #efeee9 · #e5e4de · #c9c8c2 · #9a9994 · #74736e · #4b4b47 · #2a2a28 · #16181d |

100–300 are tints, 600 is the base, 700–900 are text on tints. Accent text on light is `--color-accent-700` (#1d4ed8). Body copy on light is `--color-neutral-700`; labels and kickers are `--color-neutral-600`; folio and meta are `--color-neutral-500`.

## Console (the product window — real screens only)
| Token | Value |
| --- | --- |
| `--color-console-bg` | #18242a |
| `--color-console-panel` | #1f2e35 |
| `--color-console-line` | #26363d |
| `--color-console-line-soft` | #1e2c32 |
| `--color-console-text` | #e4edf0 |
| `--color-console-body` | #b4c6cd |
| `--color-console-muted` | #8199a3 |
| `--color-console-accent` | #79b8d1 |
| `--color-console-edge` | #3d6b7c |
| `--color-console-alert` | #e8635a |

## Evidence
| Token | Light | On ink |
| --- | --- | --- |
| `--color-evidence-shipped` | accent-2-700 #0e7490 | ink-accent-2 #67e8f9 |
| `--color-evidence-measured` | accent-700 #1d4ed8 | ink-muted #c2c8d2 |
| `--color-evidence-building` | neutral-600 #74736e | ink-dim #8b919c |
| `--color-evidence-hypothesis` | accent-700 #1d4ed8 | ink-accent #38bdf8 |
| `--color-evidence-open` | accent-700 #1d4ed8 | — |

`.on-ink` and `.slide-ink` rebind the light tokens to the ink values automatically; write `var(--color-evidence-shipped)` once and it is right on both grounds.

## Type
| Token | Value |
| --- | --- |
| `--font-heading` | "Caprasimo", system-ui, sans-serif (weight `--font-heading-weight` 400) |
| `--font-body` | "Figtree", system-ui, sans-serif (400 / 600 / 700) |
| `--font-mono` | "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace |
| `--text-ui-h1` … `--text-ui-h4` | 44 · 33 · 25 · 20px |
| `--text-ui-body` / `-sm` / `-xs` / `-label` | 15 · 14 · 13 · 11px |
| `--leading-heading` / `--leading-body` | 1.06 / 1.55 |
| `--tracking-heading` / `-label` / `-kicker` | -0.02em / 0.08em / 0.14em |

Slide scale (literal px at 1920×1080, 24px floor):
| Token | Value |
| --- | --- |
| `--text-display` | 132px (line-height 0.98, -0.03em) |
| `--text-slide-title` / `--text-slide-title-sm` | 76 / 62px (line-height 1.04, -0.02em) |
| `--text-card-title` | 44px |
| `--text-lead` | 30px (line-height 1.45) |
| `--text-body` / `--text-body-sm` | 27 / 25px |
| `--text-kicker` | 26px (0.18em, uppercase) |
| `--text-tag` | 24px (0.14em, uppercase) |
| `--text-min` | 24px |

## Space, radius, elevation
| Token | Value |
| --- | --- |
| `--space-1` … `--space-8` | 4 · 8 · 12 · 16 · 24 · 32px (`--space-1/2/3/4/6/8`) |
| `--radius-xs` | 3px — chips, tags, console insight |
| `--radius-sm` | 6px — buttons, inputs, console, segmented |
| `--radius-md` | 16px — cards, rows, dialog |
| `--radius-lg` | 28px — panels, quotes |
| `--shadow-sm` | 0 1px 2px, 12% ink — cards, rows |
| `--shadow-md` | 0 3px 10px, 14% ink |
| `--shadow-lg` | 0 12px 32px, 18% ink — dialog |
| `--shadow-window` | 0 30px 80px, 28% ink — the console only |
| `--focus-ring` | 2px solid accent, offset 2px |

## Slide geometry
| Token | Value |
| --- | --- |
| `--slide-w` × `--slide-h` | 1920px × 1080px |
| `--slide-pad-y` / `--slide-pad-x` | 92px / 116px |
| `--slide-gap` | 70px |

## Semantic aliases
`--surface-page` (bg), `--surface-card` (white), `--surface-panel` (surface), `--text-body-color` (neutral-700), `--text-heading-color` (text), `--text-muted-color` (neutral-600), `--text-highlight` (accent-700), `--border-default` (divider).
