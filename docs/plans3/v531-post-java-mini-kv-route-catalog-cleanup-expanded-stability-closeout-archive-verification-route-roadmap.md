# Node v531 post Java / mini-kv route catalog cleanup expanded stability closeout archive verification route roadmap

## Goal

Node v531 exposes the v530 expanded stability archive verifier as a JSON/Markdown route in the cleanup handoff route group.

## Cross-Project State

Java and mini-kv are recommended parallel. v531 reads only local archive verification state and does not need fresh sibling evidence.

## Necessity Proof

- Blocker resolved: v530 verified the archive, but the result was not yet publicly addressable through audit routes.
- Later consumer: v532 can use this route as the public gate before CI/catalog health closeout.
- Existing routes are not enough: v528 exposes the source closeout, not the archive verification.
- Growth stop condition: v531 adds one verifier route; the next segment starts a new CI/catalog health closeout instead of extending this chain.

## Validation Plan

- Run the cleanup handoff route focused test.
- Run route catalog summary, integrity, group, and registration quality pass tests.
- Run typecheck and build before commit.
