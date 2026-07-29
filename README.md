# SignalX

**Contributor intelligence for GTM teams**

SignalX helps you find, score, and reach the people who actually build — GitHub contributors, emails, and outbound signals — with a calm enterprise UI.

This repo hosts the **SignalX web app** (React). The product UI evolved from the VaultSignal shell; GitRadar remains the crawler / signal-extension surface.

## What’s in this branch (`onboarding`)

Tinder-style onboarding deck:

1. **Connect Google** — blue brand card + login-style Google CTA  
2. **Connect GitHub** — purple `#8036CB` card + GitHub CTA  
3. **Done** — 😊❤️ “You’re in” → Contributors

Motion: `motion/react` springs for swipe + card entrance.  
Brand system: [`docs/SIGNALX_BRAND_DESIGN_SYSTEM.md`](docs/SIGNALX_BRAND_DESIGN_SYSTEM.md)

## Run locally

```bash
git clone https://github.com/chaitanyagatreddi/vaultsignal.git
cd vaultsignal
git checkout onboarding   # this work
npm install
npm run dev
# Open http://127.0.0.1:5173/#/
```

> Tip: use `#/` in the URL (not `#%2F`) so HashRouter matches the home route.

## App routes

| Route | Screen |
|-------|--------|
| `/#/` | Onboarding deck |
| `/#/scan` | GitRadar scan + Contributors table |
| `/#/events` | Event log |
| `/#/reports` | Reports |

## Tech stack

- React 19, TypeScript, Vite 7, Tailwind CSS 4  
- Motion (`motion/react`)  
- Radix UI, Vaul drawer, AG Grid  
- React Router v7 (HashRouter)

## Project structure (UI)

```
src/
  App.tsx
  pages/
    MainLayout.tsx
    Threats.tsx                 # Contributors
    EventLog.tsx
    Reports.tsx
    components/
      OnboardingDeck.tsx        # Google → GitHub → done
  docs/
    SIGNALX_BRAND_DESIGN_SYSTEM.md
```

## Brand

Shell fluency matches the Contributors / Threats dashboard: navy sidebar, `#FAFAFA` canvas, soft pills.  
Onboarding tokens: blue `#2563EB` → purple `#8036CB`.

## Env

Do not commit secrets. Copy keys locally into `.env` if you need enrichment APIs (Tomba / Apollo / etc.). `.env` is gitignored.

## License

MIT — see [LICENSE](LICENSE).

---

*SignalX — signal the people who matter.*
