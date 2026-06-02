# Node v546 post Java / mini-kv route catalog cleanup latest sibling live smoke archive verification roadmap

## Goal

Node v546 adds a typed archive verifier for the v545 live smoke evidence.

## Cross-Project State

Java and mini-kv do not need to start for this version. Node reads the already archived v545 files and verifies that the previous smoke started local sibling services, read only approved targets, and cleaned up all owned processes.

Java and mini-kv remain recommended parallel. Node v546 is not a fresh upstream evidence blocker.

## Necessity Proof

- Blocker resolved: v545 produced real live-smoke evidence, but later route exposure should not consume raw files without a typed verifier.
- Later consumer: Node v547 can expose this verifier as a JSON/Markdown route.
- Existing report cannot be reused: v542 verifies the latest sibling evidence archive, not the v545 live smoke records, local no-proxy requirement, or cleanup proof.
- Growth stop condition: v546 verifies the archive only; route exposure is the next and only follow-up unless v545 evidence changes.

## Scope

- Add a service that reads the four v545 evidence files.
- Add a support module for archive file references, BOM-tolerant JSON reads, and record helpers.
- Add a Markdown renderer.
- Add a focused test proving 24/24 checks pass.
- Do not start Java, mini-kv, or Node HTTP servers.

## Validation Plan

- Focused v546 test.
- TypeScript typecheck.
- Build before commit.
- Remove `dist` before commit.
