# Node v516 post Java / mini-kv route catalog cleanup fresh baseline batch closeout archive verification route roadmap

## Goal

Node v516 exposes the v515 fresh baseline batch closeout archive verifier through the cleanup route group.

## Cross-Project State

Java and mini-kv are recommended parallel. v516 reads only Node archive files and does not need fresh upstream evidence.

## Necessity Proof

- Blocker resolved: v515 verifier was internal only.
- Later consumer: v517 can begin stabilization closeout with a route-backed verifier.
- Existing routes are not enough: v500 exposes an older consumer readiness batch verifier.
- Growth stop condition: v516 completes the v512-v516 closeout/archive/verifier route pair.

## Validation Plan

- Run the v515 archive verifier focused test.
- Run the cleanup route group test for JSON and Markdown exposure.
- Run route catalog summary/integrity/group tests after the 215/51 count update.
- Run typecheck and build before commit.
- Delete generated `dist` before commit.
