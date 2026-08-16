# AI Voice Assistant — Frontend

Landing page for an intelligent **AI voice agent** platform. The agent answers and handles
phone calls, talks naturally with users, understands **English, Hindi and Hinglish**, and acts
on requests using agent workflows, memory and tools.

This repository contains the **landing page** only. It is built as a modern SaaS + AI product
website — dark-first, minimal and premium — and is fully independent from the authenticated
application and backend.

---

## Tech Stack

| Layer       | Choice                                  |
| ----------- | --------------------------------------- |
| Framework   | React 19                                |
| Build tool  | Vite 8                                  |
| Language    | TypeScript                              |
| Styling     | Tailwind CSS v4 (CSS-first config)      |
| Routing     | React Router 7                          |
| Animation   | Framer Motion                           |
| Icons       | Lucide React                            |
| HTTP client | Axios (reserved for backend integration)|

---

## Getting Started

Prerequisites: **Node.js 20+** and **npm**.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open http://localhost:5173
```

### Scripts

```bash
npm run dev       # Start Vite dev server
npm run build     # Type-check (tsc) + production build to dist/
npm run preview   # Preview the production build
npm run lint      # Type-check without emitting
```

### Environment Variables

Copy `.env.example` to `.env` and set the values:

```env
# Base URL of the FastAPI backend (auth + users API).
VITE_API_BASE_URL=http://localhost:8000
```

| Variable            | Description                                  |
| ------------------- | -------------------------------------------- |
| `VITE_API_BASE_URL` | Backend origin, e.g. `http://localhost:8000` |

The backend must be running and its CORS settings must include the frontend origin
(`http://localhost:5173` in dev). See the backend `.env` for `CORS_ORIGINS`.

---

## Project Structure

```text
src/
├── assets/                  # Images, logos, icons (future use)
├── components/
│   ├── common/              # Button, Container, Section, SectionHeading, Badge, PageLoader
│   ├── auth/                # AuthLayout, FormField, OTPInput, ErrorSummary, ProtectedRoute
│   ├── navbar/              # Navbar (desktop + mobile, scroll behavior)
│   ├── hero/                # HeroSection, VoiceVisualizer
│   ├── trust/               # Trust / social proof strip
│   ├── problem/             # Problem section
│   ├── solution/            # Solution + agent flow diagram
│   ├── how-it-works/        # 4-step process
│   ├── features/            # Core feature cards
│   ├── demo/                # Interactive voice demo (mock)
│   ├── use-cases/           # Use-case cards
│   ├── capabilities/        # AI capabilities diagram
│   ├── personalization/     # Personality / tone controls
│   ├── memory/              # Memory example
│   ├── security/            # Security section
│   ├── faq/                 # FAQ accordion
│   ├── final-cta/           # Final call-to-action
│   └── footer/              # Footer
├── pages/
│   ├── LandingPage.tsx      # Landing page composition
│   ├── LoginPage.tsx        # Email + password login
│   ├── RegisterPage.tsx     # Account creation
│   ├── VerifyEmailPage.tsx  # Email OTP verification
│   ├── ForgotPasswordPage.tsx
│   ├── ResetPasswordPage.tsx
│   └── DashboardPage.tsx    # Protected placeholder dashboard
├── layouts/
│   └── PublicLayout.tsx     # Navbar + Outlet + Footer
├── routes/
│   └── AppRoutes.tsx        # Route table
├── context/
│   └── AuthContext.tsx      # Auth session provider + useAuth
├── hooks/
│   └── useScrollAnimation.ts
├── services/
│   ├── api.ts               # Axios instance (base URL + bearer token)
│   ├── auth.ts              # Signup / login / OTP / reset calls
│   └── userApi.ts           # /api/users/me calls
├── lib/
│   ├── motion.ts            # Shared Framer Motion variants
│   ├── session.ts           # Token + user storage
│   ├── apiError.ts          # FastAPI error parsing
│   ├── password.ts          # Password strength analysis
│   ├── utils.ts             # cn(), scrollToId()
│   └── voice.ts             # VoiceState type + labels
├── styles/
│   └── globals.css          # Design tokens + custom utilities
├── App.tsx
└── main.tsx
```

---

## Page Sections

In render order:

```
Navbar → Hero → Trust → Problem → Solution → How It Works → Features
→ Interactive Voice Demo → Use Cases → AI Capabilities → Personalization
→ Memory → Security → FAQ → Final CTA → Footer
```

### Interactive Voice Demo

The demo is a **mock** interaction — it does not connect to the backend. It cycles the
visualizer through `idle → listening → thinking → speaking` states while playing a scripted
agent conversation, including "action completed" chips that communicate the product is an
*agent*, not just a chatbot. The production voice pipeline (WebSocket/WebRTC → FastAPI →
speech recognition → LLM agent → TTS) is intentionally deferred.

---

## Design System

Dark-first AI SaaS direction.

| Token                | Value      |
| -------------------- | ---------- |
| Background           | `#050505`  |
| Surface (secondary)  | `#0D0D0D`  |
| Card                 | `#121212`  |
| Border               | `#242428`  |
| Primary text         | `#FFFFFF`  |
| Muted text           | `#A1A1AA`  |
| Accent               | `#8B5CF6`  |
| Interaction glow     | `#22D3EE`  |
| Font                 | Inter      |

All colors, shadows and animations are defined as tokens in `src/styles/globals.css` and
mapped into the Tailwind theme. The accent is **not** hardcoded in components — change it in
one place and the whole UI follows.

---

## Animation Strategy

- Hero, voice visualizer, feature cards, how-it-works flow and CTAs get priority motion.
- Page entry: `opacity 0 → 1`, `y 20 → 0`.
- Voice waveform: continuous, state-driven via CSS keyframes.
- `prefers-reduced-motion` is respected globally.

---

## Accessibility

- Semantic HTML with a single `h1` and correct heading hierarchy.
- Keyboard-navigable with visible focus states.
- ARIA labels on icon-only / interactive controls, `aria-expanded` on accordions and menu.
- Chat transcript uses `aria-live="polite"`.
- Form-like controls (personality sliders, language radios) have labels and roles.
- Decorative icons are `aria-hidden`.

---

## SEO

Title, meta description, Open Graph and Twitter cards, favicon, canonical URL, `robots.txt`
and `sitemap.xml` are configured in `index.html` and `public/`.

> Replace the `https://example.com` placeholders in `index.html` and `public/sitemap.xml`
> with the production domain before deploying.

---

## Routing

| Route    | Page                          | Status               |
| -------- | ----------------------------- | -------------------- |
| `/`      | Landing page                  | Implemented          |
| `/login` | Login (email + password)      | Implemented          |
| `/register` | Create account             | Implemented          |
| `/verify-email` | Email OTP verification   | Implemented          |
| `/forgot-password` | Request reset email     | Implemented          |
| `/reset-password` | Set new password         | Implemented          |
| `/dashboard` | User dashboard (protected) | Implemented (placeholder) |
| `/assistant`, `/calls`, `/conversations`, `/settings` | App | Future phase |

Auth is handled through the backend's Supabase-backed FastAPI endpoints — the frontend never
talks to Supabase directly.

---

## Backend Integration Strategy

The frontend only ever talks to your own backend API (FastAPI) — never directly to Twilio,
LLM, Whisper, TTS, vector DB or LangGraph from React.

Planned endpoints (to be finalized with the backend team):

```text
POST /api/auth/register
POST /api/auth/login
POST /api/demo/voice
POST /api/demo/conversation
```

Phases:

1. **Phase 1** — Static landing, mock demo
2. **Phase 2** — Authentication (register, OTP verification, login, forgot/reset password) ✅
3. **Phase 3** — Real voice demo
4. **Phase 4** — Full user dashboard

---

## Roadmap

- [x] Login / Register / Verify email / Forgot / Reset password pages
- [x] Protected dashboard (placeholder) with profile fetch
- [ ] Full user dashboard (assistant, calls, conversations, settings)
- [ ] Real voice demo via WebSocket / WebRTC
- [ ] Analytics / conversation history UI
- [ ] Component tests (Vitest + Testing Library)
- [ ] Lighthouse performance budget pass
- [ ] Production domain + SEO finalization

---

## License

Private project. All rights reserved.
