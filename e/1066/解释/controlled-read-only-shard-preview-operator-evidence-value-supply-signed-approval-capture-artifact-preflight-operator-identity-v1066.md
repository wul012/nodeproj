# Node v1066 signed approval capture artifact preflight operator identity artifact fragment

This archive records Node v1066 in the controlled read-only shard preview operator evidence value supply signed approval capture artifact preflight chain.

## Scope

- Adds or verifies the operator identity artifact fragment part of the signed approval capture artifact preflight surface.
- Binds artifact fragment `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_OPERATOR_IDENTITY` to source capture input `SIGNED_APPROVAL_CAPTURE_PREFLIGHT_OPERATOR_IDENTITY` and required capture input `operatorIdentity`.
- Binds artifact seal `ARTIFACT_PREFLIGHT_OPERATOR_IDENTITY_SEAL` to blocker `ARTIFACT_PREFLIGHT_OPERATOR_IDENTITY_MISSING` so a future artifact draft cannot silently skip this requirement.
- Consumes the v1061 signed approval capture preflight only through read-only local profile assembly.
- Does not capture a signed approval, emit an approval grant, submit operator values, import evidence, create runtime payloads, start Java, start mini-kv, or mutate sibling state.

## Verification Intent

The v1062-v1086 chain is intentionally heavier than a thin archive-only run: it adds typed artifact fragments, declarative seals, fail-closed gates, Markdown rendering, profile route visibility, tests, and catalog ownership boundaries.

## Artifact Contract

- Fragment kind: `identity-fragment`.
- Value mode: `operator-entry-placeholder`.
- Purpose: operator identity fragment required before artifact draft.
- Required for artifact preflight: true.
- Artifact materialized: false.
- Raw signature material present: false.
- Approval grant emitted: false.
- Runtime payload, writes, and sibling mutation remain blocked.

## Cross-Project Boundary

Java and mini-kv can continue in parallel. Node v1066 does not require fresh sibling evidence and is not a pre-approval blocker for their next work.

## Closeout

The next allowed Node step is signed approval artifact draft preflight. Value import and live execution remain blocked.
