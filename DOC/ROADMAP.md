# Arbiter - Development Roadmap

A TDD-first roadmap for building Arbiter through deliberate practice.

**Project State:** Starting fresh (new repository)
**Timeline:** 10-14 weeks (solo developer, learning included)
**Methodology:** Kata first, then Test-Implement-Refactor in main project

---

## Prerequisites

Before starting Phase 1:

- [ ] Complete [SETUP.md](./SETUP.md) entirely
- [ ] GitHub repo created with CI workflow active
- [ ] Local environment verified (`wails dev` works)
- [ ] Test infrastructure works (`go test ./...` and `npm test` pass)

---

## Daily Workflow Template

```
Morning (15 min):
├── Review current phase
└── Pick ONE task

Work Session (2-4 hours):
├── 1. Write failing test FIRST
├── 2. Verify it fails for the right reason
├── 3. Implement minimum code to pass
├── 4. Run all tests
├── 5. Refactor while green
└── 6. Commit with descriptive message

End of Session (10 min):
├── Run full test suite
├── Update task checkboxes
└── Note blockers or questions
```

---

## Core Principles

### TDD Rhythm

Every implementation follows this cycle:

1. **Write test** → Define expected behavior
2. **Watch it fail** → Confirm test is valid
3. **Implement** → Minimum code to pass
4. **Refactor** → Clean up while green
5. **Commit** → Small, focused commits

### Why This Phase Sequence?

1. **Testing first** - Foundation prevents compounding tech debt
2. **Docker deep dive** - Core dependency; streaming patterns reused everywhere
3. **Wails bridge** - Must understand IPC before frontend work
4. **Frontend** - Builds on stable, tested backend
5. **Advanced features** - Requires all previous knowledge
6. **Polish** - Touches everything; needs holistic understanding

---

## Phase 1: Go Fundamentals + Testing Foundation

**Duration:** 2 weeks

### Learning Objectives

- Interface-based design for testability
- Table-driven test patterns
- Dependency injection in Go
- Error wrapping with context

### Kata: ConfigBox

**Goal:** Build a tiny config manager to practice testing patterns.

**Repo:** `kata-configbox/` (separate from Arbiter)

**Scope:**
```go
type ConfigStore interface {
    Get(key string) (string, error)
    Set(key, value string) error
    Load(path string) error
    Save(path string) error
}
```

**TDD Milestones:**

1. [ ] Write test for `Get`/`Set` with in-memory store
2. [ ] Watch tests fail (no implementation yet)
3. [ ] Implement in-memory store to pass tests
4. [ ] Refactor while green

5. [ ] Write test for interface extraction
6. [ ] Extract interface, verify tests still pass
7. [ ] Write test for file-based implementation
8. [ ] Implement file store using temp files
9. [ ] Refactor while green

10. [ ] Write table-driven tests for edge cases (empty key, missing file, etc.)
11. [ ] Implement edge case handling
12. [ ] Refactor while green

**Exit Criteria:**
- [ ] Tests pass, coverage >80%
- [ ] Can explain why interfaces make testing easier
- [ ] Can write table-driven tests from scratch

### Main Project: Arbiter Config System

**Prerequisite:** ConfigBox kata complete

**TDD Tasks:**

1. [ ] Write test for loading valid TOML config
2. [ ] Watch it fail
3. [ ] Implement `internal/config/config.go` to pass
4. [ ] Refactor while green

5. [ ] Write test for invalid TOML syntax
6. [ ] Watch it fail
7. [ ] Implement error handling
8. [ ] Refactor while green

9. [ ] Write test for missing config file with defaults
10. [ ] Watch it fail
11. [ ] Implement default values
12. [ ] Refactor while green

13. [ ] Write test for environment variable expansion
14. [ ] Watch it fail
15. [ ] Implement env var expansion
16. [ ] Refactor while green

**Integration:**
- [ ] Wire config to `app.go`
- [ ] Generate Wails bindings
- [ ] Verify config loads on app startup

**Refactoring Notes:**
- After Phase 3: Revisit error messages for user-friendliness
- After Phase 6: Add validation for plugin configs

### Phase 1 Checkpoint

- [ ] Can I explain why interfaces make testing easier?
- [ ] Can I write a table-driven test from scratch?
- [ ] Do my error messages include enough context?

---

## Phase 2: Docker SDK Deep Dive

**Duration:** 2-3 weeks

### Learning Objectives

- Docker SDK streaming APIs
- Context cancellation patterns
- Goroutine lifecycle management
- Channel-based communication

### Kata: DockerSpy

**Goal:** Build a CLI that streams Docker events and container stats.

**Repo:** `kata-dockerspy/`

**Scope:**
```go
type DockerWatcher interface {
    StreamEvents(ctx context.Context) (<-chan Event, <-chan error)
    StreamLogs(ctx context.Context, containerID string) (<-chan LogLine, <-chan error)
    GetStats(ctx context.Context, containerID string) (*Stats, error)
}
```

**TDD Milestones:**

1. [ ] Write test for listing containers (with mock client)
2. [ ] Watch it fail
3. [ ] Implement container listing
4. [ ] Refactor while green

5. [ ] Write test for streaming events with cancellation
6. [ ] Watch it fail
7. [ ] Implement event streaming with context
8. [ ] Refactor while green

9. [ ] Write test for log streaming with follow mode
10. [ ] Watch it fail
11. [ ] Implement log streaming
12. [ ] Refactor while green

13. [ ] Write test for reconnection on socket errors
14. [ ] Watch it fail
15. [ ] Implement reconnection logic
16. [ ] Refactor while green

**Exit Criteria:**
- [ ] Event streaming with graceful shutdown works
- [ ] Log streaming with context cancellation works
- [ ] Unit tests with mocked Docker client pass
- [ ] Can explain channel patterns used

### Main Project: Arbiter Docker Integration

**Prerequisite:** DockerSpy kata complete

**TDD Tasks:**

1. [ ] Write test for `DockerClient` interface definition
2. [ ] Define interface in `internal/docker/client.go`
3. [ ] Refactor while green

4. [ ] Write test for `ListContainers()` with mock
5. [ ] Watch it fail
6. [ ] Implement container listing
7. [ ] Refactor while green

8. [ ] Write test for `StartContainer()` (normal case)
9. [ ] Watch it fail
10. [ ] Implement start container
11. [ ] Refactor while green

12. [ ] Write test for `StartContainer()` when already running (idempotency)
13. [ ] Watch it fail
14. [ ] Implement idempotent start
15. [ ] Refactor while green

16. [ ] Write test for `StopContainer()`
17. [ ] Watch it fail
18. [ ] Implement stop container
19. [ ] Refactor while green

20. [ ] Write test for `StreamLogs()` with context cancellation
21. [ ] Watch it fail
22. [ ] Implement log streaming
23. [ ] Refactor while green

24. [ ] Write integration test with testcontainers-go
25. [ ] Run against real Docker
26. [ ] Fix any integration issues
27. [ ] Refactor while green

**Integration:**
- [ ] Wire Docker service to `app.go`
- [ ] Generate Wails bindings
- [ ] Verify containers list in frontend (raw JSON OK)

**Refactoring Notes:**
- After Phase 3: Add Wails event emission to streams
- After Phase 5: Add health check integration

### Phase 2 Checkpoint

- [ ] Can I explain context cancellation?
- [ ] Can I mock the Docker client for unit tests?
- [ ] Do my goroutines clean up properly?

---

## Phase 3: Wails Bridge & Events

**Duration:** 2 weeks

### Learning Objectives

- Wails binding mechanism
- Event system (Go → Frontend)
- Error propagation across IPC boundary
- Async operation patterns

### Kata: WailsTodo

**Goal:** Build a minimal Wails app with bidirectional events.

**Repo:** `kata-wailstodo/`

**Scope:**
- Add/remove todos (bound methods)
- Background task simulation with progress events
- Error scenarios and recovery

**TDD Milestones:**

1. [ ] Write test for bound method `AddTodo()`
2. [ ] Watch it fail
3. [ ] Implement bound method
4. [ ] Refactor while green

5. [ ] Write test for event emission from goroutine
6. [ ] Watch it fail
7. [ ] Implement progress events
8. [ ] Refactor while green

9. [ ] Write test for error handling (don't crash frontend)
10. [ ] Watch it fail
11. [ ] Implement graceful error handling
12. [ ] Refactor while green

**Exit Criteria:**
- [ ] Working todo app with Wails bindings
- [ ] Background operation with progress events
- [ ] Error handling that doesn't crash UI
- [ ] Can explain Wails event flow

### Main Project: Wire Docker to Frontend

**Prerequisite:** WailsTodo kata complete

**TDD Tasks:**

1. [ ] Write test for `App.ListContainers()` binding
2. [ ] Watch it fail
3. [ ] Wire Docker service to app.go
4. [ ] Refactor while green

5. [ ] Write test for progress event emission during `StartEnvironment()`
6. [ ] Watch it fail (mock Wails runtime)
7. [ ] Implement progress events
8. [ ] Refactor while green

9. [ ] Write test for error propagation to frontend
10. [ ] Watch it fail
11. [ ] Implement structured error responses
12. [ ] Refactor while green

13. [ ] Write test for log streaming events
14. [ ] Watch it fail
15. [ ] Implement log event emission
16. [ ] Refactor while green

**Integration:**
- [ ] Generate Wails bindings
- [ ] Verify frontend receives events
- [ ] Verify errors display meaningfully

**Refactoring Notes:**
- After Phase 4: Adjust event names based on frontend needs
- After Phase 5: Add streaming events for terminal

### Phase 3 Checkpoint

- [ ] Can I explain how Wails bindings work?
- [ ] Can I emit events from background goroutines safely?
- [ ] Do errors propagate to frontend meaningfully?

---

## Phase 4: Frontend Development

**Duration:** 2-3 weeks

### Learning Objectives

- Zustand state management patterns
- React component testing
- Wails event consumption
- shadcn/ui component usage

### Kata: ReactDash

**Goal:** Build a dashboard that consumes real-time events.

**Repo:** `kata-reactdash/`

**Scope:**
```typescript
interface DashboardStore {
    items: Item[];
    loading: boolean;
    error: string | null;
    addItem: (item: Item) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string) => void;
}
```

**TDD Milestones:**

1. [ ] Write test for Zustand store initial state
2. [ ] Watch it fail
3. [ ] Implement store
4. [ ] Refactor while green

5. [ ] Write test for store actions
6. [ ] Watch it fail
7. [ ] Implement actions
8. [ ] Refactor while green

9. [ ] Write test for component rendering with mock store
10. [ ] Watch it fail
11. [ ] Implement component
12. [ ] Refactor while green

13. [ ] Write test for event handling
14. [ ] Watch it fail
15. [ ] Implement event listeners
16. [ ] Refactor while green

**Exit Criteria:**
- [ ] Zustand store with typed actions
- [ ] Components that respond to events
- [ ] Loading and error state handling
- [ ] Component tests passing

### Main Project: Arbiter UI

**Prerequisite:** ReactDash kata complete

**TDD Tasks:**

1. [ ] Write test for `useEnvironmentStore` initial state
2. [ ] Watch it fail
3. [ ] Implement Zustand store
4. [ ] Refactor while green

5. [ ] Write test for store event handler `container:started`
6. [ ] Watch it fail
7. [ ] Implement event handling
8. [ ] Refactor while green

9. [ ] Write test for `ServiceCard` component (running state)
10. [ ] Watch it fail
11. [ ] Implement ServiceCard
12. [ ] Refactor while green

13. [ ] Write test for `ServiceCard` (stopped state)
14. [ ] Watch it fail
15. [ ] Implement state variations
16. [ ] Refactor while green

17. [ ] Write test for `Sidebar` component
18. [ ] Watch it fail
19. [ ] Implement Sidebar
20. [ ] Refactor while green

21. [ ] Write test for loading states
22. [ ] Watch it fail
23. [ ] Implement loading indicators
24. [ ] Refactor while green

**Integration:**
- [ ] Wire Wails events to stores
- [ ] Build main layout
- [ ] Verify end-to-end: click Start → container starts → UI updates

**Refactoring Notes:**
- After Phase 5: Add terminal component integration
- After Phase 6: Add plugin UI components

### Phase 4 Checkpoint

- [ ] Can I explain Zustand's update model?
- [ ] Can I test components in isolation?
- [ ] Do loading states prevent UI flicker?

---

## Phase 5: Advanced Features

**Duration:** 3 weeks

### Learning Objectives

- PTY handling and resize
- xterm.js integration
- S3 multipart uploads with progress
- Snapshot/restore patterns

### Kata: WebTerm

**Goal:** Build a standalone terminal in browser connected to local PTY.

**Repo:** `kata-webterm/`

**Scope:**
- Spawn PTY process
- Connect to xterm.js via WebSocket (or Wails events)
- Handle resize events
- Clean shutdown

**TDD Milestones:**

1. [ ] Write test for PTY spawn
2. [ ] Watch it fail
3. [ ] Implement PTY spawn with `creack/pty`
4. [ ] Refactor while green

5. [ ] Write test for PTY read/write
6. [ ] Watch it fail
7. [ ] Implement stdin/stdout piping
8. [ ] Refactor while green

9. [ ] Write test for terminal resize
10. [ ] Watch it fail
11. [ ] Implement resize handling
12. [ ] Refactor while green

13. [ ] Write test for graceful shutdown
14. [ ] Watch it fail
15. [ ] Implement cleanup on disconnect
16. [ ] Refactor while green

**Exit Criteria:**
- [ ] Working terminal in browser
- [ ] Resize handling works
- [ ] Clean shutdown on close
- [ ] Can explain PTY data flow

### Main Project: Terminal, Snapshots, Storage

**Prerequisite:** WebTerm kata complete

**TDD Tasks:**

**Terminal:**

1. [ ] Write test for `Terminal.Spawn()`
2. [ ] Watch it fail
3. [ ] Implement `internal/terminal/`
4. [ ] Refactor while green

5. [ ] Write test for `Terminal.Resize()`
6. [ ] Watch it fail
7. [ ] Implement resize
8. [ ] Refactor while green

9. [ ] Write test for `Terminal.Close()` cleanup
10. [ ] Watch it fail
11. [ ] Implement cleanup
12. [ ] Refactor while green

13. [ ] Write test for xterm.js component
14. [ ] Watch it fail
15. [ ] Build Terminal React component
16. [ ] Refactor while green

**S3 Storage:**

17. [ ] Write test for S3 client initialization
18. [ ] Watch it fail
19. [ ] Implement `internal/storage/s3.go`
20. [ ] Refactor while green

21. [ ] Write test for upload with progress callback
22. [ ] Watch it fail
23. [ ] Implement multipart upload
24. [ ] Refactor while green

25. [ ] Write test for download with progress
26. [ ] Watch it fail
27. [ ] Implement download
28. [ ] Refactor while green

**Snapshots:**

29. [ ] Write test for snapshot creation
30. [ ] Watch it fail
31. [ ] Implement `internal/env/snapshot.go`
32. [ ] Refactor while green

33. [ ] Write test for snapshot restore
34. [ ] Watch it fail
35. [ ] Implement restore
36. [ ] Refactor while green

37. [ ] Write integration test with testcontainers-go
38. [ ] Run against real Docker + MinIO
39. [ ] Fix any issues
40. [ ] Refactor while green

**Integration:**
- [ ] Wire terminal to `app.go`
- [ ] Wire storage to environment manager
- [ ] Build snapshot UI

**Refactoring Notes:**
- After Phase 6: Add plugin hooks for snapshots

### Phase 5 Checkpoint

- [ ] Can I explain PTY vs regular stdin/stdout?
- [ ] Can I handle multipart upload progress?
- [ ] Do snapshots restore cleanly?

---

## Phase 6: Polish & Plugins

**Duration:** 2 weeks

### Learning Objectives

- Plugin architecture patterns
- Error UX best practices
- Keyboard navigation
- Settings persistence

### Kata: PluginHost

**Goal:** Build a minimal plugin system that loads TOML manifests.

**Repo:** `kata-pluginhost/`

**Scope:**
```go
type Plugin interface {
    Name() string
    OnLoad() error
    OnUnload() error
}

type PluginManager interface {
    Discover(dir string) ([]PluginManifest, error)
    Load(manifest PluginManifest) (Plugin, error)
    Unload(name string) error
}
```

**TDD Milestones:**

1. [ ] Write test for plugin discovery (scan directory)
2. [ ] Watch it fail
3. [ ] Implement discovery
4. [ ] Refactor while green

5. [ ] Write test for manifest loading
6. [ ] Watch it fail
7. [ ] Implement manifest parsing
8. [ ] Refactor while green

9. [ ] Write test for lifecycle hooks (load/unload)
10. [ ] Watch it fail
11. [ ] Implement hooks
12. [ ] Refactor while green

13. [ ] Write test for invalid manifest handling
14. [ ] Watch it fail
15. [ ] Implement graceful error handling
16. [ ] Refactor while green

**Exit Criteria:**
- [ ] Plugin discovery works
- [ ] Lifecycle hooks execute correctly
- [ ] Invalid manifests handled gracefully
- [ ] Can explain plugin isolation

### Main Project: Plugins, Settings, Error Handling

**Prerequisite:** PluginHost kata complete

**TDD Tasks:**

**Plugins:**

1. [ ] Write test for plugin discovery
2. [ ] Watch it fail
3. [ ] Implement `internal/plugins/`
4. [ ] Refactor while green

5. [ ] Write test for plugin lifecycle hooks
6. [ ] Watch it fail
7. [ ] Implement hooks
8. [ ] Refactor while green

**Settings:**

9. [ ] Write test for settings persistence
10. [ ] Watch it fail
11. [ ] Implement settings save/load
12. [ ] Refactor while green

13. [ ] Write test for settings UI component
14. [ ] Watch it fail
15. [ ] Build settings UI
16. [ ] Refactor while green

**Error Handling:**

17. [ ] Write test for toast notifications
18. [ ] Watch it fail
19. [ ] Implement toast system
20. [ ] Refactor while green

21. [ ] Write test for React error boundary
22. [ ] Watch it fail
23. [ ] Implement error boundary
24. [ ] Refactor while green

**Keyboard Shortcuts:**

25. [ ] Write test for keyboard shortcut handler
26. [ ] Watch it fail
27. [ ] Implement shortcuts
28. [ ] Refactor while green

**Final Polish:**
- [ ] Audit all error messages for user-friendliness
- [ ] Audit all async operations for proper cancellation
- [ ] Run full test suite
- [ ] Manual testing of all features

### Phase 6 Checkpoint

- [ ] Can I explain the plugin lifecycle?
- [ ] Are error messages actionable for users?
- [ ] Do keyboard shortcuts feel intuitive?

---

## Phase Summary

| Phase | Duration | Kata | Core Skill |
|-------|----------|------|------------|
| 1. Go + Testing | 2 weeks | ConfigBox | Interface extraction, TDD |
| 2. Docker SDK | 2-3 weeks | DockerSpy | Streaming, cancellation |
| 3. Wails Bridge | 2 weeks | WailsTodo | Events, error propagation |
| 4. Frontend | 2-3 weeks | ReactDash | Zustand, component tests |
| 5. Advanced | 3 weeks | WebTerm | Terminal, S3, snapshots |
| 6. Polish | 2 weeks | PluginHost | Plugins, UX polish |

**Total: 10-14 weeks**

---

## Kata Organization

Each kata lives in a **separate directory** outside Arbiter:

```
~/learning/
├── kata-configbox/    # Phase 1
├── kata-dockerspy/    # Phase 2
├── kata-wailstodo/    # Phase 3
├── kata-reactdash/    # Phase 4
├── kata-webterm/      # Phase 5
└── kata-pluginhost/   # Phase 6
```

**Benefits:**
- Clean separation from main project
- Can delete after learning
- No temptation to over-engineer
- Fresh start each kata

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Test coverage (Go) | > 70% |
| Test coverage (Frontend) | > 60% |
| App startup time | < 2 seconds |
| Container list refresh | < 500ms |
| Memory usage (idle) | < 100MB |
| Binary size | < 15MB |

---

## Continuous Refactoring Schedule

After each phase, review and potentially refactor:

| After Phase | Review |
|-------------|--------|
| 1 | Nothing yet - foundation |
| 2 | Config error messages |
| 3 | Docker service integration |
| 4 | Event names, store structure |
| 5 | All async operations |
| 6 | Everything - final polish |

---

## Definition of Done (Per Feature)

- [ ] Tests written FIRST (red)
- [ ] Tests pass (green)
- [ ] Code refactored while green
- [ ] Edge cases covered
- [ ] Error handling complete
- [ ] Integrated with existing code
- [ ] CI passes
- [ ] Reflection: "What did I learn?"

---

## Resources

For learning materials and documentation links, see [RESOURCES.md](./RESOURCES.md).

For architecture and feature specifications, see [SPEC.md](./SPEC.md).
