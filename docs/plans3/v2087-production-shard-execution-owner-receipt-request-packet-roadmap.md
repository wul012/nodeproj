# Node v2087 roadmap: production shard execution owner receipt request packet

## Goal

Turn the remaining Java, mini-kv, and cross-project owner gaps into precise receipt requests without claiming the receipts already exist.

## Necessity Proof

- Blocker resolved: previous stages named owner receipts as blockers, but did not give Java and mini-kv exact receipt slots to implement.
- Later consumer: Java and mini-kv can produce targeted owner receipts for abort, rollback, lifecycle ownership, and cleanup/no-start proof.
- Reuse decision: represent the request packet as a production shard execution profile instead of creating another sibling-specific report family.
- Growth stop condition: do not add more receipt request packets unless Java or mini-kv rejects one of these exact slots.

## Cross-Project Parallel Plan

Java and mini-kv are recommended parallel. They can continue by implementing the v2087 receipt slots; Node does not need to wait during this version.

## Engineering Requirements

- Name Java, mini-kv, and cross-project cleanup reconciliation receipt requests.
- Make it explicit that no signed sibling receipt is present yet.
- Preserve the closed runtime and production authority boundary.
- Store evidence under `e/2087/evidence` and explanation under `e/2087/解释`; screenshots remain per-version if generated.

## Verification

Run production shard execution focused tests and check the Markdown route contains the request-only warning.
