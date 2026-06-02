# Node v513 post Java / mini-kv route catalog cleanup fresh baseline batch closeout report roadmap

## Goal

Node v513 exposes the v512 fresh baseline batch closeout as a JSON/Markdown audit route.

## Cross-Project State

Java and mini-kv are recommended parallel. v513 reads Node closeout/archive files only.

## Necessity Proof

- Blocker resolved: v512 closeout was internal only.
- Later consumer: v514 can archive the closeout report route output.
- Existing routes are not enough: v497 exposes an older consumer readiness batch closeout.
- Growth stop condition: archive this route once, then verify the archive once.

## Validation Plan

- Run the v512 batch closeout focused test.
- Run the cleanup route group test for JSON and Markdown exposure.
- Run route catalog summary/integrity/group tests after the 214/50 count update.
- Run typecheck and build before commit.
- Delete generated `dist` before commit.
