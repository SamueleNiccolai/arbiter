# Arbiter - Learning Resources

External learning materials organized by [ROADMAP.md](./ROADMAP.md) phase.

---

## How to Use This Document

1. **Before starting a phase:** Review the relevant resources section
2. **When stuck:** Check the troubleshooting guide
3. **For quick reference:** Use the cheat sheets
4. **For community help:** See community resources

---

## Foundational Resources

These resources apply across all phases.

### GitHub Actions & CI/CD

| Resource | Type | Notes |
|----------|------|-------|
| [GitHub Actions Documentation](https://docs.github.com/en/actions) | Docs | Official reference |
| [GitHub Actions Quickstart](https://docs.github.com/en/actions/quickstart) | Tutorial | 10-min intro |
| [Understanding GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions) | Concepts | Workflows, jobs, steps |
| [Workflow syntax reference](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions) | Reference | YAML syntax |
| [actions/setup-go](https://github.com/actions/setup-go) | Action | Go environment setup |
| [actions/setup-node](https://github.com/actions/setup-node) | Action | Node.js environment setup |
| [golangci-lint-action](https://github.com/golangci/golangci-lint-action) | Action | Go linting in CI |

**Best Practices:**
- Keep workflows fast (cache dependencies)
- Use matrix builds for multiple Go/Node versions
- Fail fast: run linting before tests
- Use branch protection rules requiring CI pass
- Store secrets securely (never hardcode)

### Git Best Practices

| Resource | Type | Notes |
|----------|------|-------|
| [Conventional Commits](https://www.conventionalcommits.org/) | Standard | Commit message format |
| [Git branching model](https://nvie.com/posts/a-successful-git-branching-model/) | Article | Feature branch workflow |
| [.gitignore templates](https://github.com/github/gitignore) | Templates | Go, Node, etc. |
| [Pro Git Book](https://git-scm.com/book/en/v2) | Book | Free, comprehensive |

### TDD Fundamentals

| Resource | Type | Notes |
|----------|------|-------|
| [Learn Go with Tests](https://quii.gitbook.io/learn-go-with-tests/) | Free Book | TDD approach, excellent |
| [Test-Driven Development by Example](https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530) | Book | Kent Beck's classic |
| [The Three Laws of TDD](https://www.youtube.com/watch?v=qkblc5WRn-U) | Video | Uncle Bob explains TDD |

---

## Phase 1: Go + Testing

### Go Language

| Resource | Type | Cost | Notes |
|----------|------|------|-------|
| [Learn Go with Tests](https://quii.gitbook.io/learn-go-with-tests/) | Book | Free | **Start here.** TDD approach, covers concurrency |
| [A Tour of Go](https://go.dev/tour/) | Tutorial | Free | Official interactive tutorial |
| [Effective Go](https://go.dev/doc/effective_go) | Guide | Free | Idiomatic Go patterns |
| [Go by Example](https://gobyexample.com/) | Examples | Free | Quick reference with runnable code |
| [Frontend Masters: Go for JS Developers](https://frontendmasters.com/courses/go-for-js-devs/) | Course | Subscription | Bridges JS→Go mental model |

### Go Testing

| Resource | Type | Notes |
|----------|------|-------|
| [Testing in Go](https://go.dev/doc/tutorial/add-a-test) | Tutorial | Official testing intro |
| [testify](https://github.com/stretchr/testify) | Library | Assertions, mocks, suites |
| [Table-Driven Tests](https://dave.cheney.net/2019/05/07/prefer-table-driven-tests) | Article | Best practice pattern |
| [Go Test Tips](https://blog.golang.org/subtests) | Article | Subtests and sub-benchmarks |

### Error Handling

| Resource | Type | Notes |
|----------|------|-------|
| [Error handling and Go](https://go.dev/blog/error-handling-and-go) | Article | Official guide |
| [Working with Errors in Go 1.13](https://go.dev/blog/go1.13-errors) | Article | Error wrapping with `%w` |
| [Don't just check errors, handle them gracefully](https://dave.cheney.net/2016/04/27/dont-just-check-errors-handle-them-gracefully) | Article | Error handling philosophy |

---

## Phase 2: Docker SDK

### Docker Fundamentals

| Resource | Type | Cost | Notes |
|----------|------|------|-------|
| [Docker Getting Started](https://docs.docker.com/get-started/) | Tutorial | Free | Official guide, covers Compose |
| [Docker Compose Documentation](https://docs.docker.com/compose/) | Docs | Free | Multi-container orchestration |
| [Play with Docker](https://labs.play-with-docker.com/) | Lab | Free | Browser-based Docker playground |

### Docker SDK for Go

| Resource | Type | Notes |
|----------|------|-------|
| [Docker SDK for Go](https://pkg.go.dev/github.com/docker/docker/client) | Docs | Official package docs |
| [Docker SDK Examples](https://docs.docker.com/engine/api/sdk/examples/) | Examples | Code samples |
| [Docker API Reference](https://docs.docker.com/engine/api/) | Reference | REST API (SDK wraps this) |

### Concurrency in Go

| Resource | Type | Notes |
|----------|------|-------|
| [Go Concurrency Patterns](https://go.dev/blog/pipelines) | Article | Pipelines and cancellation |
| [Context Package](https://go.dev/blog/context) | Article | Context for cancellation |
| [Learn Go with Tests: Concurrency](https://quii.gitbook.io/learn-go-with-tests/go-fundamentals/concurrency) | Tutorial | Goroutines with TDD |

### Integration Testing

| Resource | Type | Notes |
|----------|------|-------|
| [testcontainers-go](https://golang.testcontainers.org/) | Library | Docker-based integration tests |
| [testcontainers-go Quickstart](https://golang.testcontainers.org/quickstart/) | Tutorial | Getting started guide |

---

## Phase 3: Wails Bridge

### Wails Framework

| Resource | Type | Cost | Notes |
|----------|------|------|-------|
| [Wails v2 Documentation](https://wails.io/docs/introduction) | Docs | Free | **Primary reference** |
| [Wails Guides](https://wails.io/docs/guides/) | Guides | Free | Bindings, events, assets |
| [Wails Discord](https://discord.gg/JDdSxwjhGf) | Community | Free | Get help, ask questions |
| [Wails Examples](https://github.com/wailsapp/wails/tree/master/examples) | Examples | Free | Official example apps |

### Wails Bindings

| Resource | Type | Notes |
|----------|------|-------|
| [Binding Methods](https://wails.io/docs/howdoesitwork#method-binding) | Docs | How Go methods become JS functions |
| [Events](https://wails.io/docs/reference/runtime/events) | Docs | Go→JS event communication |
| [Calling Bound Methods](https://wails.io/docs/howdoesitwork#calling-bound-go-methods) | Docs | Frontend calling backend |

---

## Phase 4: Frontend

### TypeScript

| Resource | Type | Cost | Notes |
|----------|------|------|-------|
| [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) | Docs | Free | Official guide |
| [Frontend Masters: TypeScript 5+ Fundamentals](https://frontendmasters.com/courses/typescript-v4/) | Course | Subscription | Comprehensive course |
| [Total TypeScript](https://www.totaltypescript.com/) | Course | Free/Paid | Matt Pocock's tutorials |

### React

| Resource | Type | Cost | Notes |
|----------|------|------|-------|
| [React Documentation](https://react.dev/) | Docs | Free | Official docs (new site) |
| [Frontend Masters: Complete Intro to React v9](https://frontendmasters.com/courses/complete-react-v9/) | Course | Subscription | Modern hooks patterns |
| [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) | Docs | Free | Component testing |

### Zustand

| Resource | Type | Notes |
|----------|------|-------|
| [Zustand GitHub](https://github.com/pmndrs/zustand) | Library | README is excellent |
| [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction) | Docs | Official docs |

### UI Components

| Resource | Type | Notes |
|----------|------|-------|
| [shadcn/ui](https://ui.shadcn.com/) | Library | Copy-paste components |
| [Tailwind CSS](https://tailwindcss.com/docs) | Docs | Utility-first CSS |
| [Radix UI](https://www.radix-ui.com/) | Library | Accessible primitives (shadcn uses these) |

### Frontend Testing

| Resource | Type | Notes |
|----------|------|-------|
| [Vitest](https://vitest.dev/) | Library | Fast Vite-native test runner |
| [Testing Library](https://testing-library.com/) | Library | DOM testing utilities |
| [React Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet) | Reference | Quick reference |

---

## Phase 5: Advanced Features

### Terminal / PTY

| Resource | Type | Notes |
|----------|------|-------|
| [creack/pty](https://github.com/creack/pty) | Library | Go PTY handling |
| [xterm.js](https://xtermjs.org/) | Library | Terminal emulator |
| [xterm.js Documentation](https://xtermjs.org/docs/) | Docs | API reference |
| [What is a PTY?](https://en.wikipedia.org/wiki/Pseudoterminal) | Article | Background knowledge |

### S3 / Object Storage

| Resource | Type | Notes |
|----------|------|-------|
| [AWS SDK for Go v2](https://aws.github.io/aws-sdk-go-v2/docs/) | Docs | Official SDK docs |
| [S3 API Reference](https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html) | Reference | API operations |
| [MinIO Go Client](https://min.io/docs/minio/linux/developers/go/minio-go.html) | Docs | S3-compatible client |

---

## Phase 6: Polish & Plugins

### Plugin Architecture

| Resource | Type | Notes |
|----------|------|-------|
| [HashiCorp go-plugin](https://github.com/hashicorp/go-plugin) | Library | Production-grade plugin system |
| [go-plugin Tutorial](https://github.com/hashicorp/go-plugin/tree/master/examples) | Examples | Example plugins |
| [TOML Spec](https://toml.io/en/) | Spec | Configuration format |
| [go-toml](https://github.com/pelletier/go-toml) | Library | TOML parsing |

### Error UX

| Resource | Type | Notes |
|----------|------|-------|
| [Error Message Guidelines](https://www.nngroup.com/articles/error-message-guidelines/) | Article | UX best practices |
| [Sonner](https://sonner.emilkowal.ski/) | Library | Toast notifications |

### Keyboard Shortcuts

| Resource | Type | Notes |
|----------|------|-------|
| [useHotkeys](https://github.com/JohannesKlaworthy/react-hotkeys-hook) | Library | React keyboard shortcuts |
| [Keyboard Shortcuts UX](https://www.nngroup.com/articles/keyboard-shortcuts/) | Article | Design guidelines |

---

## Quick Reference Cheat Sheets

### Go Testing Commands

```bash
# Run all tests
go test ./...

# Run tests with coverage
go test -cover ./...

# Generate coverage report
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out

# Run specific test
go test -run TestFunctionName ./...

# Verbose output
go test -v ./...

# Race detector
go test -race ./...
```

### Frontend Testing Commands

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# UI mode
npm run test:ui
```

### Docker Commands

```bash
# List containers
docker ps -a

# View logs
docker logs -f <container>

# Execute command in container
docker exec -it <container> /bin/bash

# Start/stop
docker start/stop <container>

# Compose
docker compose up -d
docker compose down
docker compose logs -f
```

### Wails Commands

```bash
# Development mode
wails dev

# Build
wails build

# Generate bindings
wails generate module

# Check system
wails doctor
```

---

## Troubleshooting Guide

### Go Issues

**`package not found`**
```bash
go mod tidy
```

**`cgo: C compiler not found`**
```bash
# Ubuntu
sudo apt install build-essential
# macOS
xcode-select --install
```

**Test cache issues**
```bash
go clean -testcache
```

### Frontend Issues

**`Module not found`**
```bash
cd frontend && npm ci
```

**TypeScript errors after Go changes**
```bash
wails generate module
```

**Vite port conflict**
Check if another process is using port 34115.

### Docker Issues

**`Cannot connect to Docker daemon`**
```bash
# Check Docker is running
docker ps

# WSL2: Enable Docker Desktop integration
# Settings → Resources → WSL Integration
```

**`Permission denied`**
```bash
# Add user to docker group
sudo usermod -aG docker $USER
# Log out and back in
```

### Wails Issues

**`WebView2 not found` (Windows)**
- Install WebView2 Runtime from Microsoft

**`gtk errors` (Linux)**
```bash
sudo apt install libgtk-3-dev libwebkit2gtk-4.0-dev
```

---

## Community Resources

| Resource | Type | Notes |
|----------|------|-------|
| [Wails Discord](https://discord.gg/JDdSxwjhGf) | Chat | Active community |
| [Gophers Slack](https://gophers.slack.com/) | Chat | Go community |
| [r/golang](https://www.reddit.com/r/golang/) | Forum | Go subreddit |
| [Stack Overflow - Go](https://stackoverflow.com/questions/tagged/go) | Q&A | Technical questions |
| [Stack Overflow - Wails](https://stackoverflow.com/questions/tagged/wails) | Q&A | Wails-specific |

---

## Not Worth Paying For

Save your money on:
- Docker courses (free docs are excellent)
- Zustand courses (overkill for a simple library)
- Generic "desktop app" courses (Wails-specific docs are better)
- Most Go courses (Learn Go with Tests + official docs are sufficient)

---

For implementation timeline, see [ROADMAP.md](./ROADMAP.md).

For architecture specifications, see [SPEC.md](./SPEC.md).

For environment setup, see [SETUP.md](./SETUP.md).
