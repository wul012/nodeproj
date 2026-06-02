# Node v512 post Java / mini-kv route catalog cleanup fresh baseline batch closeout roadmap

## Goal

Node v512 batch-closes the v507-v511 fresh baseline evidence chain.

## Cross-Project State

Java and mini-kv are recommended parallel. v512 uses only Node-frozen evidence and Node archive/verifier files.

## Necessity Proof

- Blocker resolved: v507-v511 now have intake, report route, archive, verifier, and verifier route, but no batch closeout.
- Later consumer: v513 can expose this closeout as a route for archive work.
- Existing closeouts are not enough: v496 closes the older consumer readiness chain, not the fresh Java v232-v239 / mini-kv v213-v220 baseline.
- Growth stop condition: v512 closes this five-version chain so later versions can archive/verify the closeout instead of extending the same evidence ladder.

## Validation Plan

- Run the focused v512 batch closeout test.
- Run typecheck before commit.
- Confirm Java and mini-kv stay in recommended-parallel mode and Node does not wait for fresh sibling evidence.
