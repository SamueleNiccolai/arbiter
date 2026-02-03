# Arbiter - Specification Document

## Overview

**Arbiter** is a cross-platform desktop application to manage local development environments with Docker.

**Goals:**
- Cross-platform (Windows + Linux, macOS nice-to-have)
- GUI-first experience
- Simple, intuitive UX
- Plugin architecture for custom integrations
- Open source core on GitHub

---

## Technology Stack

### Recommended: Wails + Go + React/TypeScript

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Desktop Runtime | **Wails v2** | Lightweight, uses system webview, cross-platform, mature |
| Backend | **Go** | Simple, fast compilation, excellent Docker SDK, easy to learn |
| Frontend | **React + TypeScript** | Productive, huge ecosystem, easy to find examples |
| UI Components | **shadcn/ui + Tailwind** | Modern, customizable, no heavy dependencies |
| State Management | **Zustand** | Simple, lightweight |
| Docker Integration | **docker/docker/client** | Official Docker SDK for Go |
| S3 Client | **aws-sdk-go-v2** | Environment image storage |

### Why Go

- Faster compilation cycles during development
- Simpler language with less cognitive overhead
- Official Docker SDK (same codebase as Docker CLI)
- Excellent standard library for system operations
- Easy cross-compilation to all platforms

---

## Core Features (MVP)

### 1. Environment Management
- List environments
- Create new environment (from scratch or clone existing)
- Delete environment
- Archive/restore environment
- Switch active environment

### 2. Docker Container Management
- Start/stop environment services
- View container logs (real-time streaming)
- Shell into container
- View resource usage (CPU/memory)

### 3. Database Operations
- Start/stop database container
- Create/restore snapshots
- Open SQL shell (launch external tool or embedded)
- Support PostgreSQL (Oracle as plugin)

### 4. Registry (Environment Images)
- Push environment to registry
- Pull environment from registry
- List available images
- Progress indicators for transfers

### 5. Configuration
- Visual config editor
- Environment variables management
- Service configuration

---

## Registry Strategy

### Docker Container Images

**Default:** GitHub Container Registry (ghcr.io)
- Free for public images
- Integrates with GitHub Actions for CI/CD
- Good for open source project

**Self-hosted alternative:** Docker Registry or Harbor
```bash
# Simple self-hosted registry
docker run -d -p 5000:5000 --name registry registry:2

# Harbor (enterprise features, vulnerability scanning)
# See: https://goharbor.io/docs/latest/install-config/
```

### Environment Images (tar.gz snapshots)

**Default:** S3-compatible storage
- Use AWS S3 or self-hosted MinIO
- Presigned URLs for secure downloads
- Progress tracking via multipart upload/download
- Go package: `aws-sdk-go-v2/service/s3`

**Self-hosted MinIO:**
```bash
docker run -d -p 9000:9000 -p 9001:9001 \
  -e MINIO_ROOT_USER=admin \
  -e MINIO_ROOT_PASSWORD=password \
  minio/minio server /data --console-address ":9001"
```

**Config example (TOML):**
```toml
[registry.docker]
url = "ghcr.io"
# For self-hosted: url = "localhost:5000"

[registry.environments]
type = "s3"
endpoint = "https://s3.amazonaws.com"  # or MinIO URL
bucket = "arbiter-envs"
access_key = "..."
secret_key = "..."
# For MinIO: endpoint = "http://localhost:9000"
```

---

## Plugin Architecture

The core app handles generic Docker/environment management. Specific integrations (custom services, databases, etc.) are plugins.

### Plugin Capabilities
- Register custom service types
- Add menu items / UI panels
- Hook into lifecycle events (pre-start, post-stop, etc.)
- Custom configuration schemas

### Plugin Implementation Options

**Option A: Go Plugins** (native but limited)
- Uses Go's `plugin` package
- Linux/macOS only, same Go version required
- Simple interface definition

**Option B: Configuration + Scripts** (simpler)
- Plugins as directories with manifest.toml
- Define docker-compose snippets, scripts, UI config
- Core app interprets and executes

**Option C: HashiCorp go-plugin** (production-grade)
- Plugins as separate executables
- gRPC communication
- Cross-platform, version independent
- Used by Terraform, Vault, etc.

**Recommendation for MVP:** Start with Option B (config-based), evolve to Option C later.

---

## UI/UX Design Principles

1. **Dashboard-first** - Show environment status at a glance
2. **Minimal clicks** - Common actions (start/stop) always visible
3. **Progressive disclosure** - Advanced options hidden until needed
4. **Real-time feedback** - Live logs, progress bars, status updates
5. **Keyboard shortcuts** - Power users can work fast

### Proposed Layout

```
┌─────────────────────────────────────────────────────────┐
│  [Logo] Arbiter               [Settings] [?]            │
├─────────────┬───────────────────────────────────────────┤
│             │                                           │
│ Environments│   Environment: my-dev-env                 │
│ ──────────  │   Status: ● Running                       │
│ > my-dev-env│                                           │
│   staging   │   Services:                               │
│   fresh-pg  │   ┌─────────┬──────────┬─────────┐       │
│             │   │ postgres │  backend │ traefik │       │
│             │   │ ● Running│ ● Running│ ○ Stopped│       │
│             │   │ [Stop]   │ [Stop]   │ [Start] │       │
│             │   └─────────┴──────────┴─────────┘       │
│ ──────────  │                                           │
│ Registry    │   [▶ Start All]  [⏹ Stop All]            │
│ ──────────  │                                           │
│ Settings    │   Logs  |  Config  |  Snapshots           │
│             │   ────────────────────────────────        │
│             │   2024-01-15 10:23:01 INFO Starting...   │
│             │   2024-01-15 10:23:02 INFO Connected     │
│             │                                           │
└─────────────┴───────────────────────────────────────────┘
```

---

## Project Structure

```
arbiter/
├── main.go              # Wails application entry point
├── app.go               # Application struct with bound methods
├── go.mod
├── go.sum
├── internal/
│   ├── docker/          # Docker client wrapper
│   │   ├── client.go
│   │   ├── containers.go
│   │   └── compose.go
│   ├── storage/         # S3 client for environment images
│   │   ├── s3.go
│   │   └── upload.go
│   ├── env/             # Environment management
│   │   ├── manager.go
│   │   └── snapshot.go
│   ├── config/          # TOML configuration
│   │   ├── config.go
│   │   └── schema.go
│   ├── plugins/         # Plugin loader
│   │   └── loader.go
│   └── terminal/        # PTY handling
│       └── pty.go
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── Terminal/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── stores/      # Zustand stores
│   │   └── App.tsx
│   ├── package.json
│   └── index.html
├── plugins/             # Example plugins
│   ├── example-backend/
│   │   └── manifest.toml
│   └── example-fullstack/
│       └── manifest.toml
├── build/               # Build assets
│   └── appicon.png
└── wails.json           # Wails configuration
```

---

## Non-Functional Requirements

| Metric | Target |
|--------|--------|
| Test coverage (Go) | > 70% |
| Test coverage (Frontend) | > 60% |
| Startup time | < 2s |
| Container list refresh | < 500ms |
| Memory usage (idle) | < 100MB |
| Binary size | < 15MB |

---

## Decisions Made

| Question | Decision |
|----------|----------|
| App name | **Arbiter** |
| Oracle support | Plugin only (keeps core lightweight) |
| Terminal | Embedded xterm.js (seamless UX) |
| Config format | **TOML** (clean syntax, good Go support) |
| Environment images | tar.gz format, stored in **S3-compatible** storage |
| Docker registry | **ghcr.io** (default), self-hosted option documented |

---

## Decisions Log

Record architectural decisions here (append-only).

| Date | Decision | Rationale |
|------|----------|-----------|
| | | |

---

## Key Go Packages

| Package | Purpose |
|---------|---------|
| `github.com/docker/docker/client` | Official Docker API client |
| `github.com/aws/aws-sdk-go-v2/service/s3` | S3-compatible storage |
| `github.com/pelletier/go-toml/v2` | TOML config parsing |
| `github.com/creack/pty` | PTY for embedded terminal |
| `github.com/wailsapp/wails/v2` | Desktop app framework |
| `github.com/stretchr/testify` | Testing assertions and mocks |
| `github.com/testcontainers/testcontainers-go` | Docker integration tests |

---

## Resources

- [Wails v2 Documentation](https://wails.io/docs/introduction)
- [Wails + React guide](https://wails.io/docs/guides/templates)
- [Docker SDK for Go](https://pkg.go.dev/github.com/docker/docker/client)
- [shadcn/ui](https://ui.shadcn.com/)
- [xterm.js](https://xtermjs.org/)
- [creack/pty](https://github.com/creack/pty)

---

For implementation timeline, see [ROADMAP.md](./ROADMAP.md).

For environment setup, see [SETUP.md](./SETUP.md).

For learning resources, see [RESOURCES.md](./RESOURCES.md).
