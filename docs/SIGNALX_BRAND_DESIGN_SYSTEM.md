# SignalX Brand Design System

**Status:** Canonical  
**Product:** SignalX (GitRadar = extension surface; VaultSignal UI = shell host)  
**Reference:** Threats / Contributors dashboard fluency  

This is the SignalX brand design system. Use it for every UI surface — web app, onboarding, extension chrome, marketing screens that share product DNA.

---

## 1. Brand principle

> Chrome is quiet. Data is loud. Motion earns attention.

Modern enterprise SaaS fluency — calm shell, sharp meaning color.  
**Not** Material 2. **Not** purple-glow AI generic. Closer to Linear / modern SOC tools.

VaultSignal Threats screen = the living reference for shell fluency.

---

## 2. Brand tokens

### Core palette

| Token | Hex | Role |
|-------|-----|------|
| `canvas` | `#FAFAFA` | App background |
| `surface` | `#FFFFFF` | Cards, header, panels |
| `border` | `#D9D9D9` | Soft borders |
| `navy-sidebar` | dark navy (existing shell) | Primary nav |
| `blue-primary` | `#2563EB` | Active UI, step 1 from |
| `blue-primary-deep` | `#1E40AF` | Step 1 to |
| `blue-primary-light` | `#93C5FD` | Step 1 secondary text |
| `purple-brand` | `#8036CB` | Step 2 from / brand accent |
| `purple-brand-deep` | `#5B21B6` | Step 2 to |
| `purple-badge-bg` | `#F3E8FF` | Tier / pending pills |
| `purple-badge-text` | `#6B21A8` | Tier / pending text |
| `link-green` | `#166434` | Handles, repos |
| `email` | `#000000` | Email values (bold) |
| `email-none` | `#01065E` | Empty email “none” |
| `github-ink` | `#24292F` | GitHub CTA |

### Semantic (data only)

| Token | Use |
|-------|-----|
| Severity Critical / High / Medium | Red / orange / yellow pills |
| Healthy / Blocked / System Secure | Green pills + live dot |
| In-progress | Blue pill |
| Resolved | Gray pill |

---

## 3. Shell (do not reinvent)

| Region | Spec |
|--------|------|
| Sidebar | Dark navy, thin-stroke icons, rounded blue active pill |
| Top bar | White; title left; soft centered search; time filter; bell; avatar + name + role |
| Canvas | `canvas` `#FAFAFA` |
| Status | “System Secure” green pill + live dot |
| Borders | `border` `#D9D9D9` |
| Radius | Soft / rounded on search, pills, filters, buttons |
| Type | Clean sans; bold titles; gray meta |
| Links | Blue or `link-green` for clickable IDs / handles / repos |

---

## 4. Onboarding — Tinder card stack

Primary brand moment for activation.

1. **Stack metaphor** (Tinder), not a lone 3D spin as the main idea.
2. **Card 1 — blue** (`blue-primary` → `blue-primary-deep`): Connect Email / Google · “TAP TO FLIP”.
3. Tap / swipe away → **Card 2 — purple** (`purple-brand` `#8036CB` → `purple-brand-deep`): Connect GitHub.
4. Complete → happy close **😊❤️** (no mascot; no Mario / Nintendo IP).
5. Motion: `motion` / motion.dev for swipe + entrance only.
6. Shell stays visible (sidebar + header).

---

## 5. Motion

- Library: `motion` (`motion/react`) — already in VaultSignal host.
- Use for: card swipe exit, stack entrance, soft celebration.
- Don’t: Material ripples, endless glow, motion on every table cell.

---

## 6. Do / Don’t

**Do**
- One job per region
- Soft geometry + whitespace
- Color only when it signals meaning
- Extend existing pages / `OnboardingDeck` before inventing new languages

**Don’t**
- Material ripples / dense elevation everywhere
- Abrupt empty onboarding endings
- Copyrighted mascots (Mario, etc.)
- Purple-on-white AI startup as the whole theme
- Cards that fight the shell

---

## 7. Code hosts

| Surface | Location |
|---------|----------|
| Brand UI host | `vaultsignal` (React + Vite + Tailwind + motion) |
| GitRadar / crawler | `signalx` (Python) |
| Chrome extension | `signalx-extension` |

---

## 8. File map

| File | Purpose |
|------|---------|
| `docs/SIGNALX_BRAND_DESIGN_SYSTEM.md` | **This file — canonical** |
| `docs/DESIGN_FLUENCY.md` | Short pointer → this system |
| `.cursor/rules/design-fluency.mdc` | Agent auto-rule |

When in doubt: match the Threats screen, then apply onboarding tokens above.
