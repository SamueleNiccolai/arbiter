# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Arbiter is a Wails v2 desktop application (Go backend + React/TypeScript frontend) for managing local development environments with Docker. The project follows a TDD-first methodology.

## Commands

### Development
```bash
wails dev                          # Run app with hot reload (Go + Vite dev server)
wails build                        # Build production binary
```

### Testing
```bash
go test ./...                      # Run all Go tests
go test ./internal/config/...      # Run a single Go package's tests
go test -run TestName ./...        # Run a specific Go test by name
cd frontend && npx vitest run      # Run all frontend tests
cd frontend && npx vitest run src/test/App.test.tsx  # Run a single test file
cd frontend && npx vitest --ui     # Visual test dashboard
```

### Frontend
```bash
cd frontend && npm run dev         # Vite dev server only
cd frontend && npm run build       # Production build
cd frontend && npm run lint        # ESLint
```

## Architecture

### Wails IPC Bridge
Go struct methods on `App` (in `app.go`) are automatically exposed to the frontend. Wails generates TypeScript bindings in `frontend/wailsjs/go/main/` — these are auto-generated and should not be edited. Frontend calls backend methods as async functions:

```
Frontend (React) → wailsjs/go/main/App.js → Go App struct methods
```

### Key Directories
- `internal/` — Go internal packages (business logic goes here)
- `frontend/src/` — React components and UI
- `frontend/wailsjs/` — Auto-generated Wails bindings (do not edit)
- `build/` — Platform-specific build assets (icons, manifests, installers)
- `DOC/` — Project spec, roadmap, setup guide, resources

### Configuration
- `wails.json` — Wails project config (build commands, window settings)
- `frontend/vitest.config.ts` — Test runner config (jsdom environment, globals enabled, `@` path alias to `./src`)
- `frontend/tsconfig.json` — TypeScript strict mode, ESNext target, `@` path alias

## Conventions

- Commit message prefix format: `[CATEGORY]` (e.g., `[FIX]`, `[TEST]`, `[DOC]`, `[DEV]`)
- Go tests use `testify` for assertions
- Frontend tests use Vitest + Testing Library + jsdom
- Vitest globals are enabled — no need to import `describe`, `it`, `expect`
- Development roadmap and phased plan are in `DOC/ROADMAP.md`
