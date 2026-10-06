# Tokens

Every variable is declared on `:root` in `tokens/*.css` and loaded by `styles.css`. Use them as `var(--ej-name)`. Dark values apply under `[data-theme="dark"]` (and automatically for dark hosts via `theme-auto.css`).

## Grounds and text

### Ground
| Token | Light | Dark |
| --- | --- | --- |
| `--ej-desk` | #d6dde5 | #06090d |
| `--ej-bg` | #eef2f6 | #0d1319 |
| `--ej-surface` | #ffffff | #131b24 |
| `--ej-surface-2` | #f5f7fa | #182230 |
| `--ej-line` | #c8d3de | #26333f |
| `--ej-line-strong` | #94a6b8 | #44566a |

### Text
| Token | Light | Dark |
| --- | --- | --- |
| `--ej-fg` | #0f1720 | #e7edf3 |
| `--ej-fg-muted` | #4f6076 | #a9b6c4 |
| `--ej-fg-faint` | #627186 | #7a8aa0 |

`--ej-fg` for titles and body. `--ej-fg-muted` for subtitles, table body and secondary copy. `--ej-fg-faint` for mono labels, bylines, axes — 11px uppercase, never body text.

## Gold — attention and liveness

### Gold ramp
| Token | Light | Dark |
| --- | --- | --- |
| `--ej-gold-100` | #fbf3d7 | #2a2410 |
| `--ej-gold-200` | #f5e5a8 | #4a3d12 |
| `--ej-gold-300` | #ecc84a | #ffd45e |
| `--ej-gold-400` | #c9a227 | #e2b93b |
| `--ej-gold-500` | #a7841c | #f0c75e |
| `--ej-gold-600` | #7a5c0e | #f0c75e |
| `--ej-gold-700` | #574108 | #f7dd8a |

Aliases: `--ej-gold` (400, fills), `--ej-gold-bright` (300, hover and glow), `--ej-gold-text` (600, gold as text), `--ej-gold-tint` (100, receipt ground), `--ej-gold-edge` (500, pressed), `--ej-on-gold` (#1a1300, text on gold).

## Steel — data and structure

### Steel ramp
| Token | Light | Dark |
| --- | --- | --- |
| `--ej-steel-100` | #e1ebf5 | #15283a |
| `--ej-steel-200` | #c3d6ea | #1f3a52 |
| `--ej-steel-300` | #6f9fd0 | #8fb8e8 |
| `--ej-steel-400` | #3f6b96 | #6f9fd0 |
| `--ej-steel-500` | #2b5276 | #9dc0e6 |
| `--ej-steel-600` | #1d3a55 | #bcd6f2 |

Aliases: `--ej-steel` (400, bars and node brackets), `--ej-steel-text` (500, readouts, table heads, links), `--ej-steel-tint` (100, readout strip, table head), `--ej-steel-bright` (300).

## Status

### Status
| Token | Light | Dark |
| --- | --- | --- |
| `--ej-ok` | #2e7d4f | #5fcf8a |
| `--ej-ok-tint` | #e3f3ea | #10281a |
| `--ej-alert` | #b3261e | #ff7b72 |
| `--ej-alert-tint` | #fbe6e4 | #3a1512 |

Only for tags and status rows. Gold already means "live / attention"; use ok and alert sparingly.

## Texture and light

### Texture
| Token | Light | Dark |
| --- | --- | --- |
| `--ej-grid` | rgba(63,107,150,.09) | rgba(111,159,208,.12) |
| `--ej-scan` | rgba(15,23,32,.045) | rgba(255,255,255,.035) |
| `--ej-glow` | rgba(236,200,74,.55) | rgba(255,212,94,.6) |

`--ej-grid` draws the faint 24px grid behind a framed shell. `--ej-scan` is the 1px-on-3px scan-line texture on the readout strip. `--ej-glow` is the gold halo behind live values, the focus ring and the highlighted bar.

## Elevation

### Shadows and bevels
| Token | Light | Dark |
| --- | --- | --- |
| `--ej-shadow-raise` | 0 1px 2px rgba(15,23,32,.08), 0 12px 28px -14px rgba(43,82,118,.5) | 0 1px 2px rgba(0,0,0,.45), 0 12px 28px -14px rgba(0,0,0,.8) |
| `--ej-shadow-inset` | inset 0 2px 5px rgba(15,23,32,.14) | inset 0 2px 6px rgba(0,0,0,.55) |
| `--ej-shadow-frame` | 0 32px 70px -26px rgba(15,23,32,.6), 0 2px 6px rgba(15,23,32,.12) | 0 32px 70px -26px rgba(0,0,0,.95), 0 0 0 1px rgba(255,255,255,.03) |
| `--ej-shadow-header` | inset 0 1px 0 rgba(255,255,255,.8), 0 8px 18px -10px rgba(15,23,32,.4) | inset 0 1px 0 rgba(255,255,255,.06), 0 8px 18px -10px rgba(0,0,0,.7) |
| `--ej-shadow-footer` | 0 -8px 18px -12px rgba(15,23,32,.35) | 0 -8px 18px -12px rgba(0,0,0,.6) |
| `--ej-bevel` | inset 0 1px 0 rgba(255,255,255,.8) | inset 0 1px 0 rgba(255,255,255,.06) |
| `--ej-bevel-gold` | inset 0 1px 0 rgba(255,255,255,.38), inset 0 -2px 0 rgba(0,0,0,.2) | inset 0 1px 0 rgba(255,255,255,.3), inset 0 -2px 0 rgba(0,0,0,.28) |

Raised: panels, tables, receipts, nodes, secondary buttons (`--ej-shadow-raise` + `--ej-bevel`). Recessed: readout strip, inputs, chart well, code, switch track (`--ej-shadow-inset`). Gold fills carry `--ej-bevel-gold` (a highlight on top, a shade on the bottom). The frame shadow is for a framed preview on a desk only.

## Type
| Token | Value |
| --- | --- |
| `--ej-font-display` | "Barlow Condensed", "Arial Narrow", sans-serif — titles, nameplate, figures, node titles (600 / 700) |
| `--ej-font-body` | "Source Sans 3", system-ui, sans-serif — everything you read (400 / 600 / 700) |
| `--ej-font-mono` | "Share Tech Mono", ui-monospace, monospace — readouts, labels, keys, stamps |
| `--ej-text-title` | 2.333rem (35px) |
| `--ej-text-h2` | 1.6rem (24px) — section heads, figures |
| `--ej-text-h3` | 1.2rem (18px) — nameplate |
| `--ej-text-lead` | 1.133rem (17px) — subtitle |
| `--ej-text-body` | 1rem (15px) |
| `--ej-text-sm` | 0.933rem (14px) — tables, nodes |
| `--ej-text-btn` | 0.867rem (13px) |
| `--ej-text-stamp` | 0.8rem (12px) |
| `--ej-text-label` | 0.733rem (11px) — the floor |
| `--ej-leading-title` / `-lead` / `-body` / `-table` | 1.02 / 1.45 / 1.6 / 1.4 |
| `--ej-tracking-title` / `-wordmark` / `-label` / `-readout` / `-mono` / `-btn` | -0.005em / 0.1em / 0.12em / 0.1em / 0.08em / 0.08em |

The root is 15px. `<html data-size="-1">` sets 14px, `data-size="1"` sets 16px — the A−/A+ control. Everything in rem follows; chrome paddings in px stay put.

## Geometry
| Token | Value |
| --- | --- |
| `--ej-space-1` … `--ej-space-8` | 4 · 8 · 12 · 16 · 20 · 24 · 32px (1/2/3/4/5/6/8) |
| `--ej-artifact-width` | 500px |
| `--ej-pad-x` / `--ej-pad-chrome` | 20px content gutter / 16px chrome gutter |
| `--ej-radius` | 0 — nothing is rounded |
| `--ej-chamfer-sm` / `--ej-chamfer` / `--ej-chamfer-lg` | 5px (tags, controls, switch) / 8px (primary button) / 10px (nameplate) |
| `--ej-bracket` / `--ej-bracket-weight` | 12px / 2px — panel corner brackets |
| `--ej-slide-w` × `--ej-slide-h` / `--ej-slide-pad-x` / `--ej-slide-pad-y` | 1920 × 1080px / 96px / 56px |
| `--ej-blink` / `--ej-pulse` / `--ej-fast` | 2s / 3s / 0.15s |
