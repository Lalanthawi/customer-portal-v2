# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.4.6 customer portal application using App Router, TypeScript, React 19, and Tailwind CSS v4.

## Essential Commands

```bash
# Development
npm run dev        # Start development server with Turbopack (http://localhost:3000)

# Production
npm run build      # Create production build
npm run start      # Start production server

# Code Quality
npm run lint       # Run ESLint checks
```

## Architecture & Structure

### Technology Stack
- **Next.js 15.4.6** with App Router (not Pages Router)
- **React 19.1.0** - Latest concurrent features
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** - New architecture with PostCSS
- **Turbopack** enabled for development

### Directory Structure
```
app/              # App Router - all pages and layouts
├── layout.tsx    # Root layout with font configuration
├── page.tsx      # Home page
└── globals.css   # Global styles and Tailwind imports

public/           # Static assets
```

### Key Configuration Files
- `next.config.ts` - Next.js configuration (TypeScript format)
- `tsconfig.json` - TypeScript with path alias `@/*` pointing to root
- `eslint.config.mjs` - ESLint 9 flat config with Next.js rules
- `postcss.config.mjs` - Tailwind CSS v4 PostCSS plugin

## Development Guidelines

### Routing
- Use App Router conventions: `app/[route]/page.tsx` for pages
- Layouts: `app/[route]/layout.tsx` for nested layouts
- Loading states: `app/[route]/loading.tsx`
- Error boundaries: `app/[route]/error.tsx`

### Styling
- Use Tailwind utility classes for styling
- CSS variables defined in `globals.css` for theming
- Geist font family is preloaded in root layout

### TypeScript
- Strict mode is enabled
- Use `@/*` import alias for absolute imports from root
- Target ES2017 with modern module resolution

### Component Patterns
- Server Components by default in App Router
- Add `'use client'` directive only when needed for interactivity
- Async components are supported for data fetching

## Current State
- Freshly initialized from Create Next App
- No authentication, API routes, or database integration yet
- Ready for customer portal feature development