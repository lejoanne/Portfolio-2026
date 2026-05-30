# Portfolio 2026 — Joanne Le

An editorial, type-driven portfolio with an interactive scatter-on-scroll hero
and a horizontally-pinned project slide deck.

## Stack

Plain HTML + CSS + vanilla JS — no build step, no dependencies.
Fonts loaded from Google Fonts (Fraunces + Inter).

## Develop

Open `index.html` directly, or run a tiny local server:

```bash
python3 -m http.server 4321
# then visit http://localhost:4321
```

## Structure

```
index.html   # markup
style.css    # editorial typography + layout
script.js    # smooth-scroll lerp, hero scatter, pinned deck
```

## Customise

- Edit hero copy in `index.html` — words are split into `<span class="word">`
  so each animates independently.
- Add / remove project slides inside `<div class="deck__track">`. Counter and
  scroll distance auto-adjust to the slide count.
- Tweak the pink in `:root { --bg }` in `style.css`.

## Interactions

- **Hero scatter** — each word in the headline flies outward from the title's
  center as you scroll the first viewport.
- **Pinned horizontal deck** — vertical scroll inside `.deck` is translated
  into horizontal motion of the slide track. Counter updates per slide.
- **Color shift** — body color transitions when entering the deck and the
  outro slide.
- **Keyboard** — ← / → page between slides while inside the deck.
