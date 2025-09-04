# MailTrace Frontend

A fast, modern, responsive Next.js + Tailwind UI to visualize email receiving chains and detect sender ESP.

## Tech
- Next.js (App Router, TS)
- Tailwind CSS
- SWR + fetch API

## Product UI

- AppShell layout with Header, Sidebar, and Footer
- Dashboard with hero, copy-to-clipboard test address and subject
- Results with timeline/table tabs, ESP badge, metadata, refresh
- Settings with backend URL and dark mode, stored in cookies
- Toast notifications, skeletons, empty states, badges, buttons, cards

## Quick start

1) Install deps

```bash
npm install
```

2) Run dev server

```bash
npm run dev
```

3) Configure backend proxy (optional)

Create `.env.local` and set:

```
NEXT_PUBLIC_API_BASE=https://your-backend.example.com
```

The API route `/api/email/latest` proxies to `${NEXT_PUBLIC_API_BASE}/email/latest`.

Expected backend shapes:

- GET `/email/config` -> `{ emailAddress: string, subject: string }`
- GET `/email/latest` -> `{ receivingChain: Array<{ name: string, ip?: string, timestamp?: string, details?: string }>, esp: string, subject: string, from: string, to: string, receivedAt: string }`

## Build

```bash
npm run build
npm start
```

## Deploy

- Vercel: import this folder; env `NEXT_PUBLIC_API_BASE`
- Netlify: use Next adapter; set same env

Alternatively, set the Backend Base URL at runtime via the Settings page. The value is stored in a cookie (`apiBase`).

## Notes

- Dashboard shows placeholder email and subject until backend provides real values.
- Results page polls on demand (Refresh button) using SWR mutate.