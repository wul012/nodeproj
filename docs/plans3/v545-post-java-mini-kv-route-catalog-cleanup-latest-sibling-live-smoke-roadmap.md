# Node v545 post Java / mini-kv route catalog cleanup latest sibling live smoke roadmap

## Goal

Node v545 executes the v544 local three-project read-only live smoke and archives the actual evidence.

## Cross-Project State

Java and mini-kv were started by Node under the current thread's cross-project local startup permission. Neither sibling project is changed by this version. The smoke uses only local loopback read targets, stops only the PIDs started by the v545 task, and verifies that ports `4190`, `8080`, and `6524` are clear after cleanup.

Java and mini-kv can continue in parallel after this version. Node is not a pre-approval blocker for their next work; Node v546 consumes the archived v545 evidence locally.

## Necessity Proof

- Blocker resolved: v544 had a typed startup contract, but no real Java/mini-kv/Node runtime proof existed for the latest sibling archive route.
- Later consumer: Node v546 should archive-verify the v545 smoke files before exposing any follow-up closeout route.
- Existing report cannot be reused: older runtime smoke records predate the current latest sibling evidence and do not prove Java v274 plus mini-kv v247 can be started and read with the v543/v544 Node route chain.
- Growth stop condition: after this live evidence is verified in v546, do not add another live-smoke layer unless a new upstream runtime contract or route target changes.

## Execution Contract

- Node build command: `npm.cmd run build`.
- Node runtime: `node dist/server.js` on `127.0.0.1:4190` with upstream probes enabled and upstream actions disabled.
- Java runtime: `mvn spring-boot:run -Dspring-boot.run.profiles=local` on `127.0.0.1:8080`.
- mini-kv runtime: `.\cmake-build-debug\minikv_server.exe 6524 127.0.0.1` with the CLion MinGW runtime path prepended.
- Local HTTP reads use `curl.exe --noproxy "*"` because default local curl can return a proxy `502` even when Java health is `UP`.
- Cleanup stops the v545-started mini-kv, Maven, Java runtime, and Node PIDs, removes `dist`, and records an empty after-listening socket set.

## Archived Evidence

- `e/545/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-v545-http.json`
- `e/545/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-v545-http.md`
- `e/545/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-v545-summary.json`
- `e/545/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-v545-cleanup-proof.json`

## Validation Plan

- Confirm 9/9 live read records passed.
- Confirm 14/14 checks passed.
- Confirm cleanup proof records no listeners on ports `4190`, `8080`, and `6524`.
- Run focused v542/v544 tests, typecheck, and build.
- Remove `dist` and temporary smoke scripts before commit.
