# Node v520 post Java / mini-kv route catalog cleanup fresh baseline stability closeout archive verification roadmap

## Goal

Node v520 verifies the v519 stability closeout archive.

## Cross-Project State

Java and mini-kv are recommended parallel. v520 reads only Node archive files under `e/519/evidence`.

## Necessity Proof

- Blocker resolved: v519 provided archive files but no verifier.
- Later consumer: v521 can expose this verifier route.
- Existing verifiers are not enough: v515 verifies the batch closeout archive, not the stability closeout archive.
- Growth stop condition: v521 route exposure completes the stability segment.

## Validation Plan

- Run the focused v520 archive verification test.
- Run typecheck and build before commit.
- Confirm no Java or mini-kv service is started.
