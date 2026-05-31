# Node v407 Java / mini-kv runtime execution approved local-loopback read-only smoke

## What Changed

Node v407 adds a narrow approved local-loopback read-only smoke route after v406 live-read gate. The route only reads:

- Java `GET http://127.0.0.1:8080/actuator/health`
- mini-kv TCP inline `HEALTH` on `127.0.0.1:6424`

It does not start or stop Java / mini-kv, does not write Java / mini-kv state, does not connect managed audit, does not read credentials, does not parse raw endpoint URLs, and does not enable active shard routing.

## Runtime Evidence

- Node v407 HTTP smoke: `/health` 200, JSON 200, Markdown 200.
- v407 route result: 21/21 checks passed, 0 blockers.
- Java health: passed-read, HTTP 200, `status=UP`.
- mini-kv health: passed-read, `HEALTH` returned `OK ...`.
- Passed targets: 2/2.

## Cleanup Proof

The run recorded and stopped only owned PIDs for this smoke window:

- Java Maven parent process.
- Java Spring Boot child process on port 8080.
- mini-kv server on port 6424.
- Node server on port 4407.
- static archive server on port 8407.

After cleanup, no checked port remained in `LISTEN` state. `TIME_WAIT` rows were retained in cleanup proof as normal TCP close-tail evidence.

## Verification

- Focused v407 Vitest: 1 file / 2 tests passed.
- Adjacent v406+v407 Vitest: 2 files / 4 tests passed.
- Typecheck: passed.
- Build: passed.
- Playwright MCP browser snapshot and screenshot generated.
- Full Vitest shards: 340 files / 1164 tests passed.
- Final typecheck: passed.
- Final build: passed.

## Next

Node v408 should verify v407 pass evidence and cleanup proof before any broader runtime checks are added.
