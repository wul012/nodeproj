# Node v1079 signed approval capture artifact preflight redaction policy fragment

This archive records Node v1079 in the controlled read-only shard preview operator evidence value supply signed approval capture artifact preflight chain.

## Scope

- Adds or verifies the redaction policy fragment part of the signed approval capture artifact preflight surface.
- Binds artifact fragment `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_REDACTION_POLICY` to source capture input `SIGNED_APPROVAL_CAPTURE_PREFLIGHT_REDACTION_POLICY` and required capture input `redactionPolicy`.
- Binds artifact seal `ARTIFACT_PREFLIGHT_REDACTION_POLICY_SEAL` to blocker `ARTIFACT_PREFLIGHT_REDACTION_POLICY_MISSING` so a future artifact draft cannot silently skip this requirement.
- Consumes the v1061 signed approval capture preflight only through read-only local profile assembly.
- Does not capture a signed approval, emit an approval grant, submit operator values, import evidence, create runtime payloads, start Java, start mini-kv, or mutate sibling state.

## Verification Intent

The v1062-v1086 chain is intentionally heavier than a thin archive-only run: it adds typed artifact fragments, declarative seals, fail-closed gates, Markdown rendering, profile route visibility, tests, and catalog ownership boundaries.

## Artifact Contract

- Fragment kind: `policy-fragment`.
- Value mode: `policy-code`.
- Purpose: redaction policy fragment.
- Required for artifact preflight: true.
- Artifact materialized: false.
- Raw signature material present: false.
- Approval grant emitted: false.
- Runtime payload, writes, and sibling mutation remain blocked.

## Cross-Project Boundary

Java and mini-kv can continue in parallel. Node v1079 does not require fresh sibling evidence and is not a pre-approval blocker for their next work.

## Closeout

The next allowed Node step is signed approval artifact draft preflight. Value import and live execution remain blocked.
