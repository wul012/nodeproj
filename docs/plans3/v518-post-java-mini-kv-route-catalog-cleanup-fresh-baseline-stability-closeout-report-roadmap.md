# Node v518 post Java / mini-kv route catalog cleanup fresh baseline stability closeout report roadmap

## Goal

Node v518 exposes the v517 stability closeout as a JSON/Markdown audit route.

## Cross-Project State

Java and mini-kv are recommended parallel. v518 does not need fresh sibling evidence.

## Necessity Proof

- Blocker resolved: v517 closeout was internal only.
- Later consumer: v519 can archive this stability route output.
- Existing routes are not enough: v513 exposes the earlier batch closeout, not the post-v516 stability closeout.
- Growth stop condition: archive this route once and verify it once before the final segment.

## Validation Plan

- Run the v517 stability closeout focused test.
- Run the cleanup route group test for JSON and Markdown exposure.
- Run route catalog summary/integrity/group tests after the 216/52 count update.
- Run typecheck and build before commit.
- Delete generated `dist` before commit.
