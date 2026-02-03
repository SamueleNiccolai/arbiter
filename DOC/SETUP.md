# Arbiter - Setup Guide

Set up a fresh Arbiter project from scratch with TDD infrastructure and CI/CD.

**Time to complete:** Follow sequentially, verify each section before moving on.

---

## 1. Prerequisites

Verify you have the following installed before proceeding:

- [ ] **Go 1.22+** - `go version`
- [ ] **Node.js 20+** - `node --version`
- [ ] **Docker** - `docker --version`
- [ ] **Git** - `git --version`
- [ ] **GitHub CLI** - `gh --version`
- [ ] **GCC/build-essential** - `gcc --version` (required for CGO/Wails)

### Install Missing Prerequisites

**Ubuntu/WSL2:**
```bash
# Build tools (GCC, make) - required for Wails CGO
sudo apt update
sudo apt install -y build-essential pkg-config

# GitHub CLI
sudo apt install -y gh
```

**macOS:**
```bash
xcode-select --install
brew install gh
```

**Windows:**
- Install [MSYS2](https://www.msys2.org/) for GCC
- Install [GitHub CLI](https://cli.github.com/)

---

## 2. Install Wails CLI

```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

Verify installation:
```bash
wails version
# Expected: v2.x.x
```

Run the Wails doctor to check system requirements:
```bash
wails doctor
```

Fix any issues reported before continuing.

For example, I was missing the following packages:

sudo apt install libgtk-3-dev
sudo apt install libwebkit2gtk-4.1-dev


---

## 3. Initialize New Project

### 3.1 Create Wails Project

```bash
# Navigate to your projects directory
cd ~/projects  # or wherever you keep projects

# Create new Wails project with React + TypeScript
wails init -n arbiter -t react-ts

# If an old version of go is present do the following:

  # Remove old Go installation 
  sudo rm -rf /usr/local/go

  # Download Go 1.23.5 (latest 1.23.x)
  wget https://go.dev/dl/go1.23.5.linux-amd64.tar.gz

  # Extract to /usr/local
  sudo tar -C /usr/local -xzf go1.23.5.linux-amd64.tar.gz

  # Clean up
  rm go1.23.5.linux-amd64.tar.gz

  # Verify installation
  go version


# Enter project directory
cd arbiter
```

### 3.2 Initialize Git Repository

```bash
git init
```

### 3.3 Create .gitignore

Create `.gitignore` with the following content:

```gitignore
# Go
*.exe
*.exe~
*.dll
*.so
*.dylib
*.test
*.out
go.work
go.work.sum

# Wails build output
build/bin/

# Frontend
frontend/node_modules/
frontend/dist/
frontend/wailsjs/

# IDE
.idea/
.vscode/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Environment
.env
.env.local
*.local

# Test coverage
coverage.out
coverage.html
frontend/coverage/

# Logs
*.log
```

### 3.4 Initial Commit

```bash
git add .
git commit -m "feat: initialize Wails project with React + TypeScript"
```

---

## 4. Verify Local Installation

Run the development server to verify everything works:

```bash
wails dev
```

**Expected result:** A window opens with the Wails logo.

Press `Ctrl+C` to stop the dev server.

---

## 5. Set Up Test Infrastructure

### 5.1 Go Testing Tools

```bash
# Testify for assertions and mocks
go get github.com/stretchr/testify

# Testcontainers for Docker integration tests
go get github.com/testcontainers/testcontainers-go

# Update go.sum
go mod tidy
```

Create a sample test file to verify the setup at `internal/config/config_test.go`:

```go
package config

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPlaceholder(t *testing.T) {
	// This test exists to verify the test infrastructure works.
	// Replace with real tests as you implement features.
	assert.True(t, true, "test infrastructure is working")
}
```

Create the directory and file:
```bash
mkdir -p internal/config
```

Run Go tests:
```bash
go test ./...
# Expected: PASS
```

### 5.2 Frontend Testing Tools

```bash
cd frontend

# Vitest for testing
npm install -D vitest @vitest/ui

# Testing Library for React component tests
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event

# jsdom for browser environment simulation
npm install -D jsdom
```

Add test scripts to `frontend/package.json`:
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage"
  }
}
```

Create Vitest config at `frontend/vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
```

Create test setup at `frontend/src/test/setup.ts`:

```typescript
import '@testing-library/jest-dom'
```

Create a sample test at `frontend/src/App.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest'

describe('Test Infrastructure', () => {
  it('verifies test setup works', () => {
    expect(true).toBe(true)
  })
})
```

Create the directory and run tests:
```bash
mkdir -p src/test
npm test
# Expected: PASS
```

Return to project root:
```bash
cd ..
```

### 5.3 Commit Test Infrastructure

```bash
git add .
git commit -m "feat: add test infrastructure (testify, vitest, testing-library)"
```

---

## 6. GitHub Setup

### 6.1 Authenticate with GitHub CLI

```bash
gh auth login
```

Follow the prompts to authenticate.

### 6.2 Create GitHub Repository

```bash
gh repo create arbiter --private --source=. --remote=origin --push
```

Options:
- `--private`: Create a private repository (change to `--public` if preferred)
- `--source=.`: Use current directory as source
- `--remote=origin`: Set remote name to "origin"
- `--push`: Push current branch after creating

### 6.3 Add GitHub Actions CI Workflow

Create the workflow directory:
```bash
mkdir -p .github/workflows
```

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-go:
    name: Lint Go
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-go@v5
        with:
          go-version: '1.22'

      - name: golangci-lint
        uses: golangci/golangci-lint-action@v4
        with:
          version: latest

  test-go:
    name: Test Go
    runs-on: ubuntu-latest
    needs: lint-go
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-go@v5
        with:
          go-version: '1.22'
          cache: true

      - name: Run tests with coverage
        run: go test -race -coverprofile=coverage.out ./...

      - name: Display coverage
        run: go tool cover -func=coverage.out

      - name: Check coverage threshold
        run: |
          COVERAGE=$(go tool cover -func=coverage.out | grep total | awk '{print $3}' | sed 's/%//')
          echo "Total coverage: $COVERAGE%"
          # Uncomment when you have meaningful tests:
          # if (( $(echo "$COVERAGE < 70" | bc -l) )); then
          #   echo "Coverage below 70% threshold"
          #   exit 1
          # fi

  lint-frontend:
    name: Lint Frontend
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Install dependencies
        run: cd frontend && npm ci

      - name: Run linter
        run: cd frontend && npm run lint

  test-frontend:
    name: Test Frontend
    runs-on: ubuntu-latest
    needs: lint-frontend
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Install dependencies
        run: cd frontend && npm ci

      - name: Run tests with coverage
        run: cd frontend && npm test -- --coverage
```

### 6.4 Commit and Push CI Workflow

```bash
git add .
git commit -m "ci: add GitHub Actions workflow for Go and frontend"
git push
```

### 6.5 Verify CI

Open your repository on GitHub and check the Actions tab. The workflow should be running (or completed).

```bash
gh run list --limit 1
```

---

## 7. Pre-commit Hook Setup (Optional)

Set up a pre-commit hook to run tests before each commit:

Create `.git/hooks/pre-commit`:

```bash
#!/bin/sh

echo "Running Go tests..."
go test ./... || exit 1

echo "Running frontend tests..."
cd frontend && npm test || exit 1

echo "All tests passed!"
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

---

## 8. Add Core Go Dependencies

```bash
# Docker SDK
go get github.com/docker/docker/client
go get github.com/docker/docker/api/types

# S3/MinIO storage
go get github.com/aws/aws-sdk-go-v2
go get github.com/aws/aws-sdk-go-v2/config
go get github.com/aws/aws-sdk-go-v2/service/s3

# TOML configuration
go get github.com/pelletier/go-toml/v2

# PTY for terminal (Unix)
go get github.com/creack/pty

# Update dependencies
go mod tidy
```

---

## 9. Add Core Frontend Dependencies

```bash
cd frontend

# State management
npm install zustand

# Terminal emulator
npm install @xterm/xterm @xterm/addon-fit

# UI components (shadcn/ui dependencies)
npm install tailwindcss-animate class-variance-authority clsx tailwind-merge lucide-react
npm install @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-dropdown-menu

cd ..
```

---

## 10. Final Commit

```bash
git add .
git commit -m "feat: add core dependencies (Docker SDK, S3, Zustand, xterm)"
git push
```

---

## Verification Checklist

Before proceeding to development, verify:

- [ ] `wails dev` launches the application window
- [ ] `go test ./...` passes
- [ ] `cd frontend && npm test` passes
- [ ] GitHub repository exists and is accessible
- [ ] GitHub Actions CI workflow runs successfully
- [ ] All dependencies are installed (`go mod tidy` and `npm ci` complete without errors)

---

## Next Steps

Your project is ready for TDD development.

**Begin with:** [ROADMAP.md](./ROADMAP.md) Phase 1

The roadmap will guide you through:
1. Learning concepts via kata projects
2. Writing tests first
3. Implementing features to pass tests
4. Refactoring while tests stay green

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `wails dev` | Start development server |
| `wails build` | Build production binary |
| `go test ./...` | Run Go tests |
| `cd frontend && npm test` | Run frontend tests |
| `go test -cover ./...` | Run tests with coverage |
| `golangci-lint run` | Run Go linter |

---

## Troubleshooting

### `cgo: C compiler "gcc" not found`

Install build tools:
```bash
# Ubuntu/WSL2
sudo apt install -y build-essential

# macOS
xcode-select --install
```

### `wails dev` fails with WebView error

On Linux, install WebKit:
```bash
sudo apt install -y libgtk-3-dev libwebkit2gtk-4.0-dev
```

### Docker not accessible

Ensure Docker is running:
```bash
docker ps
```

For WSL2, enable Docker Desktop's WSL Integration in Settings → Resources → WSL Integration.

### `gh auth login` fails

Ensure you have a GitHub account and try:
```bash
gh auth login --web
```
