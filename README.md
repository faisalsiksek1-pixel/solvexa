# Solvexa

**Premium AI-powered mathematics learning platform for high school students in the UAE and Brazil.**

Solvexa combines a beautiful, modern interface with AI-powered step-by-step problem solving to help students master mathematics at the high school level.

## Features

- **AI Problem Solver** — Input any math problem and receive detailed, step-by-step solutions rendered with LaTeX
- **Curriculum-Aligned Topics** — Organized by UAE MOE and Brazilian BNCC curricula
- **Progress Tracking** — Visual analytics on streaks, accuracy, and topic mastery
- **Practice Problems** — Curated problem sets per topic with difficulty tiers
- **Bilingual Ready** — Architecture supports Arabic (RTL) and Portuguese localization

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Math Rendering:** KaTeX
- **UI Primitives:** Radix UI

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.local.example .env.local
# Fill in your API keys

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── (auth)/           # Authentication routes (login, signup)
│   └── (dashboard)/      # Protected app routes
├── components/
│   ├── ui/               # Primitive design system components
│   ├── layout/           # Navigation, sidebar, footer
│   ├── landing/          # Marketing page sections
│   ├── dashboard/        # Dashboard feature components
│   └── solve/            # Problem solver components
├── lib/                  # Constants, mock data, utilities
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── utils/                # Pure utility functions
```

## Roadmap

- [ ] Real AI integration via Anthropic Claude API
- [ ] NextAuth.js authentication
- [ ] Database persistence (Supabase)
- [ ] Arabic RTL layout mode
- [ ] Portuguese (BR) localization
- [ ] Mobile app (React Native)
- [ ] Parent/Teacher dashboard
