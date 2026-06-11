# Node v2092 roadmap: production shard execution owner receipt dry-run reconciliation

## Goal

Reconcile Java, mini-kv, and cross-project receipt slots as an unsigned dry run.

## Necessity Proof

- Blocker resolved: owner receipt requests exist, but the dry-run batch needs a single reconciliation table.
- Later consumer: Java and mini-kv can sign the same rows later without Node inventing new slots.
- Reuse decision: keep reconciliation in the production shard execution profile chain rather than creating sibling-specific ledgers.
- Growth stop condition: do not add another receipt reconciliation unless a real owner signs or rejects one row.

## Cross-Project Parallel Plan

Java and mini-kv are recommended parallel. They can use these rows as receipt targets; Node v2092 does not wait for them.

## Engineering Requirements

- Include Java, mini-kv, and cross-project cleanup rows.
- Keep every row `signed=false`.
- Store machine evidence under `e/2092/evidence`.
- Store explanation under `f/2092/解释`; screenshot/image evidence belongs in `f/2092/图片` only if produced.

## Verification

Run focused route tests and verify the Markdown warning says the reconciliation is unsigned.
