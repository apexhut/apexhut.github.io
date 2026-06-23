# APEX HUT — Project Structure

```
pickupWebsite/
├── index.html              # Main page (About Us, Contact, Find Us)
├── CNAME                   # Custom domain for GitHub Pages
├── .nojekyll               # Disables Jekyll processing on GitHub Pages
├── structure.md            # This file — project layout reference
│
├── css/
│   └── styles.css          # Layout, colours, and responsive styles
│
├── js/
│   ├── config.js           # Site settings (address, contact, hours, map)
│   ├── i18n.js             # English / Traditional Chinese translations
│   └── main.js             # Map, contact links, hours, navigation
│
└── images/
    └── company_logo.jpg    # APEX HUT company logo
```

## File overview

| Path | Purpose |
|------|---------|
| `index.html` | Single-page site with hero, About Us, Contact, and Find Us sections |
| `CNAME` | Tells GitHub Pages which custom domain to use (e.g. `www.apexhut.hk`) |
| `.nojekyll` | Ensures static assets are served as-is on GitHub Pages |
| `css/styles.css` | Brand styling (blue/red palette from logo), mobile layout |
| `js/config.js` | **Edit here** for address, contact, hours, map coordinates, and map provider |
| `js/i18n.js` | EN / 繁 language strings and language switcher logic |
| `js/main.js` | OpenStreetMap map (Leaflet), contact cards, hours list, and mobile menu |
| `images/company_logo.jpg` | Logo used in header, hero, and footer |

## What to edit most often

1. **`js/config.js`** — business details (address, contact, hours, map pin)
2. **`CNAME`** — your custom domain (must match `customDomain` in `config.js`)
3. **`js/i18n.js`** — page copy if you want to change wording in English or Chinese

## GitHub Pages

Deploy from the repository root (`/`). No build step required — open `index.html` locally or push to GitHub and enable Pages on the `main` branch.
