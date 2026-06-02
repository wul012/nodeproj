# Node v529 post Java / mini-kv route catalog cleanup expanded stability closeout route archive roadmap

## Goal

Node v529 archives the v528 expanded stability closeout JSON/Markdown route output under `e/529/evidence`.

## Cross-Project State

Java and mini-kv are recommended parallel. v529 uses only local Fastify inject against the Node route and does not need fresh sibling evidence.

## Necessity Proof

- Blocker resolved: v528 exposed the closeout route, but v530 needs immutable files and digests to verify.
- Later consumer: v530 can read the v529 archive summary and compare file hashes.
- Existing archives are not enough: v524 archives the prior twenty-version closeout route, not the expanded stability closeout.
- Growth stop condition: v529 writes exactly JSON, Markdown, and one summary file; v530 verifies those files.

## Validation Plan

- Generate JSON and Markdown with Fastify inject.
- Record HTTP status, ready flag, check counts, route snapshot, boundaries, sizes, and SHA-256 digests.
- Parse the summary and confirm JSON 200, Markdown 200, ready=true, and 9/9 checks.
