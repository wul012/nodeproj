# Node v2085 roadmap: production shard execution signed approval intake contract

## Goal

Define the signed production approval artifact shape without accepting or fabricating a real approval artifact.

## Necessity Proof

- Blocker resolved: production execution cannot move beyond candidate readiness until a future signed approval can be validated by a stable schema.
- Later consumer: real external approval intake can bind to the v2085 field list and scope rules.
- Reuse decision: keep production blockers in `productionApprovalControls()` and add only a schema-only stage payload.
- Growth stop condition: do not add another approval-intake contract unless the real approval provider changes required fields.

## Cross-Project Parallel Plan

Java and mini-kv are recommended parallel. Node v2085 does not require fresh sibling files and does not ask them to wait.

## Engineering Requirements

- Name required fields for approval id, window id, operator identity, scope, source digest, issue/expiry time, and signature digest.
- Make the route explicit that no real signed approval is present.
- Preserve `readyForProductionShardExecution=false` and `executionAllowed=false`.
- Store evidence under `e/2085/evidence` and explanation under `e/2085/解释`; screenshot evidence must use `e/2085/图片` only if produced.

## Verification

Run production shard execution focused tests and include v2085 in the final route smoke before commit.
