# Node v1083 signed approval capture artifact preflight zero value import artifact lock

This archive records Node v1083 in the controlled read-only shard preview operator evidence value supply signed approval capture artifact preflight chain.

## Scope

- Adds or verifies the zero value import artifact lock part of the signed approval capture artifact preflight surface.
- Binds artifact fragment `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_ZERO_VALUE_IMPORT_LOCK` to source capture input `SIGNED_APPROVAL_CAPTURE_PREFLIGHT_ZERO_VALUE_SUBMISSION_LOCK` and required capture input `zeroValueSubmissionLock`.
- Binds artifact seal `ARTIFACT_PREFLIGHT_ZERO_VALUE_IMPORT_SEAL` to blocker `ARTIFACT_PREFLIGHT_ZERO_VALUE_IMPORT_LOCK_MISSING` so a future artifact draft cannot silently skip this requirement.
- Consumes the v1061 signed approval capture preflight only through read-only local profile assembly.
- Does not capture a signed approval, emit an approval grant, submit operator values, import evidence, create runtime payloads, start Java, start mini-kv, or mutate sibling state.

## Verification Intent

The v1062-v1086 chain is intentionally heavier than a thin archive-only run: it adds typed artifact fragments, declarative seals, fail-closed gates, Markdown rendering, profile route visibility, tests, and catalog ownership boundaries.

## Artifact Contract

- Fragment kind: `execution-lock-fragment`.
- Value mode: `boolean-lock`.
- Purpose: lock proving value submission and import stay zero.
- Required for artifact preflight: true.
- Artifact materialized: false.
- Raw signature material present: false.
- Approval grant emitted: false.
- Runtime payload, writes, and sibling mutation remain blocked.

## Cross-Project Boundary

Java and mini-kv can continue in parallel. Node v1083 does not require fresh sibling evidence and is not a pre-approval blocker for their next work.

## Closeout

The next allowed Node step is signed approval artifact draft preflight. Value import and live execution remain blocked.
