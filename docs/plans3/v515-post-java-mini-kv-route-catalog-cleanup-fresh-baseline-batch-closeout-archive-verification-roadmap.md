# Node v515 post Java / mini-kv route catalog cleanup fresh baseline batch closeout archive verification roadmap

## Goal

Node v515 verifies the v514 fresh baseline batch closeout archive.

## Cross-Project State

Java and mini-kv are recommended parallel. v515 reads only Node archive files under `e/514/evidence`.

## Necessity Proof

- Blocker resolved: v514 provided archive files but no verifier.
- Later consumer: v516 can expose this verifier as a route.
- Existing verifiers are not enough: v499 verifies an older consumer readiness batch closeout archive.
- Growth stop condition: expose this verifier once, then start a stabilization closeout rather than creating another archive verifier for the same files.

## Validation Plan

- Run the focused v515 archive verification test.
- Run typecheck and build before commit.
- Confirm no Java or mini-kv service is started.
