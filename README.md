# ADLER Wohndesign — Website

Statische Website für ADLER Wohndesign (Raumausstatter & Innenarchitektur, Berlin-Charlottenburg).
Design: Franzi (Figma). Umsetzung: Astro, gehostet auf Cloudflare.

## Stack
- **Astro** (statische Seiten, schnell, top SEO)
- **Vanilla CSS + Design-Tokens** (`src/styles/global.css`) — Tokens 1:1 aus Figma
- **Hosting:** Cloudflare (Workers / Static Assets)
- **Sprache:** Deutsch

## Struktur
```
src/
  styles/global.css     Design-Tokens (Farben, Typo, Spacing) + Basis
  components/            Wiederverwendbare Komponenten (Header, Footer, …)
  pages/                 Eine Datei = eine Seite/URL
public/images/           Bilder & Assets
```

## Lokal starten
```
npm install
npm run dev      # http://localhost:4321
npm run build    # Produktions-Build nach dist/
```

## Status (Stand 06/2026)
- ✅ Kompletter **V4-Seitensatz** gebaut (19 Seiten + dynamische Detailrouten: 302 Farben, 26 Projekte, 25 Blog), gegen Figma geprüft, auf Branch `V4` (PR #1)
- ✅ Design-Tokens & Komponentenbibliothek aus V4; Schriften **self-hosted** (`@fontsource`)
- ✅ **Sanity-CMS**: Blog läuft live aus Sanity (Phase 1, statisch + Build-Zeit-GROQ); Vorschau-Deploy auf Cloudflare
- ⏳ Offen: CI/Tests, Backend/Kontaktformular (Cloudflare), Landingpage-Feinschliff, Projekte/Farben → Sanity (Phase 2/3), Produktions-Launch
- 📄 Verbindlicher Entscheidungs-/Roadmap-Stand: **`docs/STRATEGIE-ENTSCHEIDUNGEN.md`**

## Launch-Checkliste (vor Go-Live!)
- [x] **Schriften selbst hosten** (erledigt — `@fontsource`, kein Google-CDN)
- [ ] Datenschutzerklärung + Impressum korrekt
- [ ] Cookie-/Consent-Handling (falls Tracking/Karten/Embeds)
- [ ] Kontaktformular: echte End-to-End-Zustellung getestet (kein Spam-Nirvana)
- [ ] SEO: Meta-Tags, sitemap.xml, robots.txt, LocalBusiness-Structured-Data
- [ ] Lighthouse + axe (Performance + Barrierefreiheit) grün
- [ ] Cross-Device geprüft (echtes iPhone/Android)
