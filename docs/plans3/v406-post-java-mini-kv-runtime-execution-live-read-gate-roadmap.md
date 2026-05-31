# v406 Java / mini-kv runtime execution live-read gate roadmap

## Scope

Node v406 consumes Node v405 canonical approval input value validation and writes the execution-before-smoke live-read gate. It does not start Java, start mini-kv, connect managed audit, parse raw endpoint URLs, read credential values, write sibling state, or enable active shard routing.

## Necessity Proof

- Blocker resolved: v405 proved the three canonical approval input values are real and valid, but it did not translate them into a concrete live-read gate.
- Later consumer: Node v407 may use this gate to run an approved local-loopback read-only smoke.
- Reuse check: existing v405 value validation proves input shape and correlation; it does not capture service target ownership, concrete loopback GET targets, and cleanup proof requirements as the final gate.
- Growth stop: after v406, do not add another echo/gate unless v407 finds a concrete service startup, port, or cleanup mismatch during actual smoke preparation.

## Service Boundary

- Java owner: `java-platform-operator`.
- mini-kv owner: `mini-kv-service-owner`.
- Node owner: `node-control-plane-operator`.
- Java loopback: `127.0.0.1:8080`, GET `/actuator/health`.
- mini-kv loopback: `127.0.0.1:6424`, GET `/health`.
- Startup: operator-owned only; v406 does not start either service.
- Cleanup: if a later smoke starts services, record owned PID/port and stop only owned Java / mini-kv processes.
- Runtime actions: GET-only, read-only, no managed audit, no credential value, no raw endpoint URL parsing, no upstream mutation.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. Node v406 consumes already frozen/current approved inputs and is not a pre-approval blocker for their next local work. Node must wait only if v407 needs actual service startup commands that cannot be derived from the approved packet or project-local evidence.

## Validation Plan

- Focused v406 test.
- Adjacent v405 + v406 tests.
- Typecheck.
- Build.
- HTTP smoke with auth headers: health, JSON, Markdown, 33/33-style check summary expected from the route result.
- Browser screenshot of archived HTML using Playwright MCP when available; fallback to local headless Chrome only if MCP cannot reach the static archive.
- Full Vitest split if focused and adjacent checks pass.

## Next Step

If v406 is clean, commit/tag/push `v406`. Then proceed to Node v407 only if startup/cleanup ownership can be proven and the run remains GET-only local-loopback; otherwise stop with the concrete missing startup/cleanup evidence.
