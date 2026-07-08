# Style Rules & Guidelines

- **Color Palette & Theme Customizations**:
  Always use the CSS custom properties defined in [global.css](file:///e:/v1/src/styles/global.css) for all UI styling. Do not introduce arbitrary colors or hardcoded hex/RGB values.
  - Backgrounds: Use `bg-[var(--card)]` or `bg-[var(--background)]`.
  - Borders: Use `border-border` (which uses `var(--border)`).
  - Text: Use `text-foreground` (for `var(--foreground)`) and `text-muted-foreground` (for `var(--muted-foreground)`).
  - Accents & Highlights: Use `var(--accent-color)` (e.g., `text-(--accent-color)`, `bg-(--accent-color)`, or `border-(--accent-color)`).
