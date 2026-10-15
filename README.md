# Karl (wittikay) Wilson

Live portfolio: https://wittikay.github.io/landingPage/

Karl's IT experience, FactoryMemory project, and music, with compact layouts, muted blue light/dark themes, the personal k-arrow mark, and Wittikay's artist logo.

## Website

This is a static site with no build step, external fonts, embeds, or tracking. GitHub Pages publishes from the root of `main`. `.nojekyll` serves the files directly. Relative asset URLs support both `/landingPage/` and a local root.

- `index.html` and `styles.css`: content, responsive layouts, and styling.
- `portfolio.mjs`: audience filters and project stories.
- `app.mjs` and `navigation.mjs`: site controls and dialog navigation.
- `theme.js`: device/saved theme selection and the light/dark switch.
- `saturn.mjs` and `motion.mjs`: fixed-axis Saturn rotation, independently moving rings, and Play/Pause. Reduced-motion preferences start it paused.
- `favicon.svg`: personal k-arrow mark.
- `wittikay-logo.png`: supplied artist emblem, used in the music section.

FactoryMemory is presented at the level of purpose and workflow. Its source code and technical implementation are not part of this repository.

The previous portfolio remains recoverable in Git history. Existing legacy demos and their assets have been retained.

## Local preview

From the repository root, run `python3 -m http.server 4173`, then open http://localhost:4173/.
