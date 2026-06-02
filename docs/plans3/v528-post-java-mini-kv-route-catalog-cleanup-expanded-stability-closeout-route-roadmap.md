# Node v528 post Java / mini-kv route catalog cleanup expanded stability closeout route roadmap

## Goal

Node v528 exposes the v527 expanded stability closeout as a JSON/Markdown route in the cleanup handoff route group.

## Cross-Project State

Java and mini-kv are recommended parallel. v528 consumes only local Node closeout state and does not need fresh sibling evidence.

## Necessity Proof

- Blocker resolved: v527 produced a closeout profile, but v529 needs a stable HTTP JSON/Markdown source to archive.
- Later consumer: v529 can archive this route output.
- Existing routes are not enough: v526 exposes the previous archive verifier, not the expanded stability closeout itself.
- Growth stop condition: v528 adds one route only; v529-v531 will archive and verify that route.

## Validation Plan

- Run the cleanup handoff route focused test.
- Run route catalog summary, integrity, group, and registration quality pass tests.
- Run typecheck and build before commit.
