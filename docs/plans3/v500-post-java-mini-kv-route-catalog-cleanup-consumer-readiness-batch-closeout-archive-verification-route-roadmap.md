# Node v500 post Java / mini-kv route catalog cleanup consumer readiness batch closeout archive verification route roadmap

## Goal

Node v500 exposes the v499 batch closeout archive verifier through the existing cleanup route group.

## Cross-Project State

Java and mini-kv are recommended parallel. v500 is a Node route exposure step only.

## Necessity Proof

- Blocker resolved: v499 verifier was service/test only; operators need JSON/Markdown route output.
- Later consumer: v501 can start the final fifteen-version closeout segment.
- Existing routes are not enough: v495 exposes evidence archive verification, not batch closeout archive verification.
- Growth stop condition: v500 completes the v496-v500 chain.

## Implementation Plan

- Register the v499 archive verifier route.
- Update route catalog counts to 209 total routes and 45 Java/mini-kv routes.
- Extend focused route tests.

## Validation Plan

- Run focused route/catalog tests.
- Run typecheck and build.
- Clean `dist` before commit.
