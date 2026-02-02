Themes Structure (Required)

Each theme must provide:
- pages/ (all routes implemented in the base theme)
- layouts/ (all layouts implemented in the base theme)
- components/ (optional, theme-specific UI pieces)
- index.ts (theme config: name, layouts, head, vuetify)
- vuetify.ts (theme colors)

Validation

Run:
  npm run validate:themes

This checks that every theme contains the same pages/layouts as "classic".
