# Node v497 post Java / mini-kv route catalog cleanup consumer readiness batch closeout report roadmap

## Goal

Node v497 exposes the v496 batch closeout as a JSON/Markdown report route.

Route:

```text
/api/v1/audit/java-mini-kv-route-catalog-cleanup-consumer-readiness-batch-closeout
```

## Cross-Project State

Java and mini-kv are recommended parallel. This report route does not consume fresh sibling evidence and does not make Node a blocker for their next tagged work.

## Necessity Proof

- Blocker resolved: v496 closeout was service/test only; archive generation needs HTTP JSON/Markdown output.
- Later consumer: v498 will archive this route output.
- Existing routes are not enough: v495 exposed the archive verifier, not the batch closeout.
- Growth stop condition: v497 is one report route for the closeout; v498-v500 finish archive and verifier exposure.

## Implementation Plan

- Add batch closeout report route path and Markdown renderer.
- Register the route in the cleanup route group.
- Update catalog counts to 208 total routes and 44 Java/mini-kv routes.
- Extend focused route tests.

## Validation Plan

- Run batch closeout test, route group test, catalog summary test, route registration quality test.
- Run typecheck and build.
- Clean `dist` before commit.
