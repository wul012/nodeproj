# Node v2081 roadmap: production shard execution operator window worksheet

## Goal

Transform the v2080 failure matrix into an ordered operator worksheet that records which evidence must be locked, reviewed, archived, and cleaned up before any later execution rehearsal can proceed.

## Necessity Proof

- Blocker resolved: operators need an ordered checklist that prevents a readiness report from being mistaken for an execution window.
- Later consumer: Node v2082 verifies the candidate archive span using this worksheet as a source.
- Reuse decision: keep the worksheet in the production shard execution profile family; do not add another bespoke runbook format.
- Growth stop condition: add steps only when a new source digest or cleanup artifact is introduced.

## Cross-Project Parallel Plan

Java and mini-kv are recommended parallel. v2081 says their owners keep lifecycle responsibility, but it does not require fresh Java or mini-kv changes.

## Engineering Requirements

- Put digest lock first and cleanup proof last.
- Keep signed approval visible as missing production authorization.
- Preserve Java/mini-kv owner lifecycle responsibility.
- Ensure no worksheet step authorizes writes, migrations, or Node-owned sibling runtime start/stop.

## Verification

Run focused production shard execution tests and typecheck. Archive JSON/Markdown evidence under `e/2081/`.
