# Node v511 post Java / mini-kv route catalog cleanup fresh baseline evidence archive verification route roadmap

## Goal

Node v511 exposes the v510 fresh baseline archive verifier through the Java / mini-kv cleanup route group.

## Cross-Project State

Java and mini-kv are recommended parallel. v511 reads only Node archive files and does not need fresh upstream evidence.

## Necessity Proof

- Blocker resolved: v510 verifier was internal only.
- Later consumer: v512 can batch-close the v507-v511 fresh baseline chain using this route exposure.
- Existing routes are not enough: v505 exposes the older readiness handoff archive verifier.
- Growth stop condition: v511 completes the report/archive/verifier/route pair; do not add another verifier route for this same archive.

## Validation Plan

- Run the v510 archive verifier focused test.
- Run the cleanup route group test for JSON and Markdown exposure.
- Run route catalog summary/integrity/group tests after the 213/49 count update.
- Run typecheck and build before commit.
- Delete generated `dist` before commit.
