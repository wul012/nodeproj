# Node v545 explanation: latest sibling live smoke

v545 runs the real local three-project read-only smoke that v544 planned.

The smoke started:

- Node on `127.0.0.1:4190`;
- Java on `127.0.0.1:8080`;
- mini-kv on `127.0.0.1:6524`.

It then read 9 targets:

- Node health;
- Node latest sibling archive verifier JSON;
- Node latest sibling archive verifier Markdown;
- Java `/actuator/health`;
- Java `/api/v1/ops/evidence`;
- mini-kv `HEALTH`;
- mini-kv `COMMANDSJSON`;
- mini-kv `SHARDJSON`;
- mini-kv `QUIT`.

All 9 records passed, all 14 checks passed, and the final cleanup proof shows zero listening sockets on `4190`, `8080`, and `6524`. `dist` was removed after the smoke.

The important operational lesson is that local HTTP smoke must bypass proxy configuration. Java health returned `UP` with `curl.exe --noproxy "*"`, while default local curl could return a proxy `502`. v545 records that no-proxy requirement in the evidence so future live smoke versions do not misdiagnose a healthy Java service.

This version did not change Java or mini-kv files. It only started their local read-only services, captured Node evidence, and stopped the processes it started.

Archived evidence:

- `e/545/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-v545-http.json`
- `e/545/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-v545-http.md`
- `e/545/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-v545-summary.json`
- `e/545/evidence/java-mini-kv-route-catalog-cleanup-latest-sibling-live-smoke-v545-cleanup-proof.json`

Next step: Node v546 should add an archive verification service for these four files before any route or closeout layer consumes the live smoke.
