# Node v504 post Java / mini-kv route catalog cleanup readiness handoff evidence archive verification roadmap

## Goal

Node v504 verifies the v503 readiness handoff evidence report archive.

## Cross-Project State

Java and mini-kv are recommended parallel. v504 reads local Node archive files only.

## Necessity Proof

- Blocker resolved: v503 archive files need verifier coverage before route exposure.
- Later consumer: v505 will expose this verifier route and close the fifteen-version run.
- Existing verifiers are not enough: v499 verifies batch closeout, not readiness handoff evidence.
- Growth stop condition: v505 route exposure completes the requested v491-v505 run.

## Validation Plan

- Run focused archive verifier test.
- Run typecheck.
- Do not add route in v504.
