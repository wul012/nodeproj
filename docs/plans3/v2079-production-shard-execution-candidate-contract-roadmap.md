# Node v2079 roadmap: production shard execution candidate contract

## Goal

Create a disabled-by-default production shard execution candidate contract that names phases, invariants, forbidden surfaces, and the exact conditions that prevent production execution.

## Necessity Proof

- Blocker resolved: the project had evidence ledgers but no compact candidate contract explaining what a future production shard execution window would be allowed to consider.
- Later consumer: Node v2080 derives failure, abort, and rollback semantics from this contract.
- Reuse decision: consume v2078 handoff readiness and common production shard execution profile builders; do not fork the older Java/mini-kv runtime execution chain.
- Growth stop condition: do not add another candidate contract unless Java or mini-kv changes the runtime surface.

## Cross-Project Parallel Plan

Java and mini-kv are recommended parallel. Node v2079 does not request fresh evidence; it defines the Node-side candidate envelope they can later map receipts into.

## Engineering Requirements

- List candidate phases in one contract rather than scattering them across many small reports.
- Keep writes, migrations, credential value reads, raw endpoint parsing, managed audit production connections, and active shard routing outside the candidate contract.
- Preserve production blockers for signed approval, managed audit store binding, and rollback-owner confirmation.

## Verification

Run focused production shard execution tests and typecheck. Archive JSON/Markdown evidence under `e/2079/`.
