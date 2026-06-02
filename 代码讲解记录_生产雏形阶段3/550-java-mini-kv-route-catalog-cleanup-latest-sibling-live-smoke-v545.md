# Node v545 code walkthrough: latest sibling live smoke

## Why This Version Exists

v544 made the live-smoke contract explicit but deliberately did not start services. v545 is the execution version: it proves that the current Node route chain can coexist with local Java and mini-kv runtimes, read the required evidence, and clean up after itself.

The version is evidence-focused. It does not add product code and does not change sibling repositories. Its main output is the archived smoke report under `e/545/evidence/`.

## Runtime Flow

The smoke performs a strict sequence:

1. Check that ports `4190`, `8080`, and `6524` are free.
2. Build Node with `npm.cmd run build`.
3. Start mini-kv on `127.0.0.1:6524`.
4. Start Java with the `local` Spring profile.
5. Start Node on `127.0.0.1:4190` with upstream probes enabled and upstream actions disabled.
6. Read 9 targets using only GET or mini-kv read commands.
7. Stop only the PIDs started by the smoke.
8. Remove `dist`.
9. Verify the three ports have no listeners.

This matters because the live smoke is useful only if it proves both success and cleanup. A passing read with a leaked Java or Node process would make the next run ambiguous.

## Java Handling

Java readiness is checked in two layers:

- the startup log must contain `Started OrderPlatformApplication`;
- `curl.exe --noproxy "*"` must read `/actuator/health` and see `status=UP`.

The no-proxy flag is not cosmetic. On this machine, default local curl can return `502` even though Java is healthy. v545 records that fact so future scripts do not confuse a proxy failure with a Java failure.

Java evidence is then read from `/api/v1/ops/evidence`. The smoke checks that the endpoint is read-only, `executionAllowed=false`, and `readyForReadOnlyLiveProbe=true`.

## mini-kv Handling

mini-kv is started from `D:\C\mini-kv\cmake-build-debug\minikv_server.exe` with the CLion MinGW runtime path prepended. Without that runtime path the binary can fail before it listens.

The smoke uses only read-style commands:

- `HEALTH`;
- `COMMANDSJSON`;
- `SHARDJSON`;
- `QUIT`.

The command catalog must include `SHARDJSON` as a read command, and `SHARDJSON` must expose the current read-only readiness signal.

## Node Handling

Node runs from built `dist/server.js` with:

- `UPSTREAM_PROBES_ENABLED=true`;
- `UPSTREAM_ACTIONS_ENABLED=false`;
- `ORDEROPS_AUTH_MODE=disabled`;
- `ACCESS_GUARD_ENFORCEMENT_ENABLED=false`;
- Java and mini-kv loopback endpoints pointed at the locally started services.

The Node reads prove that the v543 archive verifier route still returns ready JSON and Markdown while sibling services are running.

## Evidence Shape

`v545-http.json` records:

- started process metadata;
- the local smoke window;
- all 9 records with status, target, digest, preview, and assertion summary;
- 14 checks;
- event timeline;
- cleanup proof path.

`v545-http.md` is the human-readable companion. `v545-summary.json` is the compact status file for later archive verification. `v545-cleanup-proof.json` records started PIDs, before/after listening sockets, `dist` removal, and cleanup status.

## Boundary

v545 proves a local read-only runtime window. It does not approve production audit, production operations, write routing, Java writes, mini-kv writes, managed-audit access, credential value reads, or raw endpoint parsing.

The next maintainable step is v546 archive verification of these files. That keeps the chain from growing into another unverified echo and gives later route exposure a stable source.
