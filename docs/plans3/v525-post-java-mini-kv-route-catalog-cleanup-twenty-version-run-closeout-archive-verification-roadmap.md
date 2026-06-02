# Node v525 post Java / mini-kv route catalog cleanup twenty-version run closeout archive verification roadmap

## Goal

Node v525 verifies the v524 archived JSON, Markdown, and archive summary for the twenty-version run closeout route.

## Cross-Project State

Java and mini-kv are recommended parallel. v525 reads only local archive files and does not need fresh sibling evidence.

## Necessity Proof

- Blocker resolved: v524 produced archive files, but the files needed a typed verifier before public route exposure.
- Later consumer: v526 can expose this verifier route.
- Existing verifiers are not enough: v520 verifies the stability archive, not the expanded v523-v537 closeout route archive.
- Growth stop condition: v525 verifies the v524 archive once; v526 only exposes this verifier.

## Validation Plan

- Run the focused v525 archive verification test.
- Run typecheck and build before commit.
- Confirm the verifier reports ready=true and all checks passed.
