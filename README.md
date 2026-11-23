# Skillheed-Demo

**EduSphere: School, College & Sports Management System.** This is a UI demo with a premium login page and three workspace dashboards.

> UI only. Login is a dummy for demonstration, and no backend is connected.

## What's included

- **Login page**: a two-column SaaS layout. The left side has the brand, the heading, three feature cards and illustrations. The right side has the login card, with these parts:
  - Workspace Type dropdown (School / College / Sports Academy)
  - Organization ID / Email and Password fields, with a Show/Hide toggle
  - Remember me, Forgot password and Contact Support
  - Sign In button with a loading state, and a Google Sign-In button
  - Field validation, plus error, success and info messages
- **Three dashboards**: `/dashboard/school`, `/dashboard/college` and `/dashboard/sports`. Each has KPI cards, charts, a Command Center, a calendar, a records table and a grouped sidebar. Every sidebar item opens a module screen.
- **Responsive design**: works on desktop, tablet and mobile. On mobile the sidebar becomes a slide-in menu.

## Demo accounts

The password for all three accounts is `Demo@123`.

| Workspace | Email | Organization ID |
|---|---|---|
| School | admin@greenvalley.edu.in | GVS-1024 |
| College | admin@stxavierscollege.edu.in | SXC-2045 |
| Sports Academy | admin@championsacademy.in | CSA-3310 |

The **Try a demo workspace** buttons on the login card fill these details in for you.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000/login.

## Demo material (`demo/`)

- `EduSphere_Demo_Video.mp4`: a step-by-step walkthrough (silent, with English and Hindi captions)
- `EduSphere_Demo_English.pptx` and `EduSphere_Demo_Hindi.pptx`: presentation decks
- `scripts/`: Playwright and pptxgenjs scripts used to record the video and build the decks

## Tech stack

Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · shadcn/ui · Lucide icons · Recharts

## Folder structure

```
src/
├─ app/
│  ├─ login/page.tsx
│  └─ dashboard/[workspace]/page.tsx
├─ components/
│  ├─ auth/        login card, form, workspace select, brand panel, illustrations
│  ├─ dashboard/   sidebar, topbar, stat cards, charts, calendar, tables, module view
│  ├─ brand/       logo
│  └─ ui/          shadcn components
├─ config/workspaces.ts   menus and sample data for each workspace
└─ lib/            auth.ts (dummy login) · validation.ts · utils.ts
```
