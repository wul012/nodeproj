# v407 Java / mini-kv runtime execution approved local-loopback read-only smoke roadmap

## Scope

Node v407 consumes Node v406 live-read gate and captures approved local-loopback read-only pass evidence:

- Java `GET http://127.0.0.1:8080/actuator/health`.
- mini-kv TCP inline `HEALTH` on `127.0.0.1:6424`.

The route never starts or stops services itself. The smoke window is open only when `UPSTREAM_PROBES_ENABLED=true` and `UPSTREAM_ACTIONS_ENABLED=false`.

## Necessity Proof

- Blocker resolved: v406 accepted the gate but did not prove the two local services respond.
- Later consumer: Node v408 can verify pass evidence and cleanup proof before any broader runtime surface.
- Reuse check: existing generic smoke harness covers older production-live-read flows; v407 is a narrow, versioned wrapper for the current Java v167 / mini-kv v158 runtime execution packet.
- Growth stop: after v407 pass evidence and cleanup proof are archived, the next step is verification, not another gate, unless the smoke fails.

## Runtime Ownership

- Java startup is operator-owned for this run: Maven Spring Boot on port `8080`.
- mini-kv startup is operator-owned for this run: `minikv_server.exe 6424 127.0.0.1` with CLion MinGW runtime DLLs on `PATH`.
- Node route does not start or stop either service.
- Cleanup proof must record Java and mini-kv owned PIDs, stop only those processes, and verify ports `8080` and `6424` no longer listen.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel after v407. Node consumes their local runtime health only; Node is not a pre-approval blocker for unrelated upstream project work.

## Validation Plan

- Focused v407 tests.
- Adjacent v406+v407 tests.
- Typecheck and build.
- HTTP smoke on Node port `4407` with `UPSTREAM_PROBES_ENABLED=true`, `UPSTREAM_ACTIONS_ENABLED=false`, Java URL `http://127.0.0.1:8080`, mini-kv `127.0.0.1:6424`.
- Playwright MCP screenshot for archive HTML.
- Cleanup proof after stopping owned Java / mini-kv / Node / static processes.
- Full Vitest shards before commit.
