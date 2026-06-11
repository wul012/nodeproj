# Node v2080 roadmap: production shard execution failure matrix

## Goal

Derive a failure, abort, and rollback matrix from the v2079 candidate contract so every candidate phase has a safe stop path before production execution can be discussed.

## Necessity Proof

- Blocker resolved: a candidate contract without failure semantics can look executable even when cleanup or owner responsibility is unclear.
- Later consumer: Node v2081 turns this matrix into the operator window worksheet stop conditions.
- Reuse decision: use the v2079 contract as the only scope source and keep the shared profile builder for checks, blockers, and Markdown.
- Growth stop condition: add a failure class only when a new candidate phase or upstream runtime behavior appears.

## Cross-Project Parallel Plan

Java and mini-kv are recommended parallel. They only need to review owner rows later; Node v2080 does not block their independent runtime evidence cleanup.

## Engineering Requirements

- Cover Node, operator, Java, mini-kv, and cross-project cleanup failure ownership.
- Require archive evidence for every failure row.
- Ensure rollback text never implies write or migration authorization.
- Preserve disabled production execution and read-only boundaries.

## Verification

Run focused production shard execution tests and typecheck. Archive JSON/Markdown evidence under `e/2080/`.
