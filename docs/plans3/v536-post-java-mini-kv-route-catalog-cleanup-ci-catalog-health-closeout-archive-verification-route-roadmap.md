# Node v536 post Java / mini-kv route catalog cleanup CI/catalog health closeout archive verification route roadmap

## Goal

Node v536 exposes the v535 CI/catalog health archive verifier as a JSON/Markdown route in the cleanup handoff route group.

## Cross-Project State

Java and mini-kv are recommended parallel. v536 reads only local archive verification state and does not need fresh sibling evidence.

## Necessity Proof

- Blocker resolved: v535 verified the archive, but the result was not yet publicly addressable through audit routes.
- Later consumer: v537 can use this route as the public final verified gate.
- Existing routes are not enough: v533 exposes the source closeout, not the archive verification.
- Growth stop condition: v536 adds one verifier route; v537 performs final closeout rather than extending this chain.

## Validation Plan

- Run the cleanup handoff route focused test.
- Run route catalog summary, integrity, group, and registration quality pass tests.
- Run typecheck and build before commit.
