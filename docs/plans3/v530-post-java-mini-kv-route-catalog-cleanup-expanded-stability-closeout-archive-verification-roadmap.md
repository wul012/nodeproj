# Node v530 post Java / mini-kv route catalog cleanup expanded stability closeout archive verification roadmap

## Goal

Node v530 verifies the v529 archived JSON, Markdown, and archive summary for the expanded stability closeout route.

## Cross-Project State

Java and mini-kv are recommended parallel. v530 reads only local archive files and does not need fresh sibling evidence.

## Necessity Proof

- Blocker resolved: v529 produced archive files, but the files needed a typed verifier before public route exposure.
- Later consumer: v531 can expose this verifier route.
- Existing verifiers are not enough: v525 verifies the prior twenty-version closeout archive, not the expanded stability closeout archive.
- Growth stop condition: v530 verifies the v529 archive once; v531 only exposes this verifier.

## Validation Plan

- Run the focused v530 archive verification test.
- Run typecheck and build before commit.
- Confirm the verifier reports ready=true and all checks passed.
