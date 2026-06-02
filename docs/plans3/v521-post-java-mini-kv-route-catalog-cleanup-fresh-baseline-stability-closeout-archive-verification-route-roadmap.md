# Node v521 post Java / mini-kv route catalog cleanup fresh baseline stability closeout archive verification route roadmap

## Goal

Node v521 exposes the v520 stability archive verifier through the cleanup route group.

## Cross-Project State

Java and mini-kv are recommended parallel. v521 reads only Node archive files and does not need fresh upstream evidence.

## Necessity Proof

- Blocker resolved: v520 verifier was internal only.
- Later consumer: v522 can use this route as the final pre-closeout stability gate.
- Existing routes are not enough: v516 exposes the earlier batch closeout verifier, not the stability closeout verifier.
- Growth stop condition: v521 completes the v517-v521 stability segment.

## Validation Plan

- Run the v520 archive verifier focused test.
- Run the cleanup route group test for JSON and Markdown exposure.
- Run route catalog summary/integrity/group tests after the 217/53 count update.
- Run typecheck and build before commit.
- Delete generated `dist` before commit.
