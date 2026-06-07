# Node v1087 signed approval capture artifact draft preflight artifact draft request id

This archive records Node v1087 in the controlled read-only shard preview operator evidence value supply signed approval capture artifact draft preflight chain.

## Scope

- Adds or verifies the artifact draft request id part of the signed approval capture artifact draft preflight surface.
- Binds draft field `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_REQUEST_ID` to source artifact fragment `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_REQUEST_ID` and required artifact fragment `captureArtifactPreflightRequestId`.
- Binds draft guard `ARTIFACT_DRAFT_PREFLIGHT_REQUEST_ID_GUARD` to blocker `ARTIFACT_DRAFT_PREFLIGHT_REQUEST_ID_MISSING` so a future manual draft cannot silently skip this requirement.
- Consumes the v1086 signed approval capture artifact preflight only through read-only local profile assembly.
- Does not create a signed approval draft, capture a signature, emit an approval grant, submit operator values, import evidence, create runtime payloads, start Java, start mini-kv, or mutate sibling state.

## Verification Intent

The v1087-v1111 chain is intentionally heavier than a thin archive-only run: it adds typed draft fields, declarative guards, fail-closed gates, Markdown rendering, profile route visibility, tests, and catalog ownership boundaries.

## Draft Contract

- Field kind: `identity-draft-field`.
- Field mode: `manual-entry-placeholder`.
- Purpose: stable id for the future manual signed approval draft.
- Required for artifact draft preflight: true.
- Draft artifact created: false.
- Draft signature payload present: false.
- Approval grant emitted: false.
- Runtime payload, writes, and sibling mutation remain blocked.

## Cross-Project Boundary

Java and mini-kv can continue in parallel. Node v1087 does not require fresh sibling evidence and is not a pre-approval blocker for their next work.

## Closeout

The next allowed Node step is manual signed approval draft readiness. Value import and live execution remain blocked.
