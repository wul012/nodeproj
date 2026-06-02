# Node v517 post Java / mini-kv route catalog cleanup fresh baseline stability closeout roadmap

## Goal

Node v517 closes the v512-v516 stability segment and records the live route catalog state after the batch closeout verifier route.

## Cross-Project State

Java and mini-kv are recommended parallel. v517 does not need fresh sibling evidence.

## Necessity Proof

- Blocker resolved: v516 exposed the archive verifier route, but the live route catalog state after that exposure was not closed.
- Later consumer: v518 can expose this stability closeout route.
- Existing closeouts are not enough: v512 records the pre-v513 closeout snapshot, not the live v516 catalog state.
- Growth stop condition: this closes the v512-v516 segment so the final versions can summarize the whole run.

## Validation Plan

- Run the focused v517 stability closeout test.
- Run typecheck and build before commit.
- Confirm live catalog 215/51/17 and archived closeout snapshot 213/49/15 are both preserved.
