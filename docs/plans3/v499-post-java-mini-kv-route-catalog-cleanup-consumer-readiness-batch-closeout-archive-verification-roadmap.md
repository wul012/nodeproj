# Node v499 post Java / mini-kv route catalog cleanup consumer readiness batch closeout archive verification roadmap

## Goal

Node v499 verifies the v498 batch closeout archive files.

## Cross-Project State

Java and mini-kv remain recommended parallel. v499 reads only local Node archive files and does not require fresh sibling outputs.

## Necessity Proof

- Blocker resolved: v498 archive files need independent verification before route exposure.
- Later consumer: v500 will expose this verifier route.
- Existing verifier reuse is not enough: v494 verifies the evidence report archive, not the batch closeout archive.
- Growth stop condition: v500 route exposure completes the v496-v500 chain.

## Validation Plan

- Run focused archive verifier test.
- Run typecheck.
- Do not add a route in v499.
