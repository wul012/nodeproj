# Node v527 post Java / mini-kv route catalog cleanup expanded stability closeout roadmap

## Goal

Node v527 closes the v522-v526 gate and prepares the v527-v531 expanded stability segment.

## Cross-Project State

Java and mini-kv are recommended parallel. v527 consumes the local v525 archive verifier and v526 route registration only.

## Necessity Proof

- Blocker resolved: v526 exposed the archive verifier route, but the expanded stability segment needed an explicit closeout marker.
- Later consumer: v528 can expose this closeout route.
- Existing closeouts are not enough: v522 closes the twenty-version run request, not the expanded stability segment.
- Growth stop condition: v527 limits this segment to route, archive, archive verifier, and verifier route through v531.

## Validation Plan

- Run the focused v527 closeout test.
- Run typecheck and build before commit.
- Confirm route catalog snapshot 219/55/21 and v525 archive verifier ready=true.
