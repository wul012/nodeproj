# Node v541 post Java / mini-kv route catalog cleanup latest sibling evidence report archive roadmap

## Goal

Node v541 archives the v540 latest sibling evidence report route output.

## Cross-Project State

Java and mini-kv can be started by Node in later live-smoke versions, but v541 only archives local Node route output. No upstream service startup is required.

## Necessity Proof

- Blocker resolved: v540 made the latest sibling evidence report public, but the JSON and Markdown route output was not yet preserved with digests.
- Later consumer: v542 can verify the archive files and digest summary.
- Existing archive cannot be reused: v509 archived the older Java v239 / mini-kv v220 report, not the latest Java v274 / mini-kv v247 report.
- Growth stop condition: write JSON, Markdown, and summary only. Do not add verifier logic or live smoke behavior in this version.

## Validation Plan

- Generate JSON and Markdown through local Fastify inject.
- Persist both outputs under `e/541/evidence/`.
- Persist an archive summary with status codes, readiness, route catalog counts, boundaries, and SHA-256 digests.
- Remove the temporary generation script.
- Run focused route/catalog tests, typecheck, and build.
- Remove generated `dist` before commit.
