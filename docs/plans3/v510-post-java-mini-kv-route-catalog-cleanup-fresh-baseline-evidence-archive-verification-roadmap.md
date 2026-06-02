# Node v510 post Java / mini-kv route catalog cleanup fresh baseline evidence archive verification roadmap

## Goal

Node v510 verifies the v509 fresh baseline report archive.

## Cross-Project State

Java and mini-kv are recommended parallel. v510 reads only Node archive files under `e/509/evidence`.

## Necessity Proof

- Blocker resolved: v509 provided archive files but no verifier.
- Later consumer: v511 can expose this verifier as a JSON/Markdown route.
- Existing verifiers are not enough: v504 verifies the older readiness handoff archive, not the fresh Java v232-v239 / mini-kv v213-v220 baseline.
- Growth stop condition: v511 route exposure completes this archive-verifier pair, then v512 should batch-close the v507-v511 chain.

## Validation Plan

- Run the focused v510 archive verification test.
- Run typecheck before commit.
- Confirm the verifier reads archive files only and leaves sibling services stopped.
