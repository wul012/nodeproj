# Node v1088 signed approval capture artifact draft preflight source artifact preflight digest binding

This archive records Node v1088 in the controlled read-only shard preview operator evidence value supply signed approval capture artifact draft preflight chain.

## Scope

- Adds or verifies the source artifact preflight digest binding part of the signed approval capture artifact draft preflight surface.
- Binds draft field `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_PREFLIGHT_ARTIFACT_PREFLIGHT_DIGEST` to source artifact fragment `SIGNED_APPROVAL_CAPTURE_ARTIFACT_PREFLIGHT_CAPTURE_PREFLIGHT_DIGEST` and required artifact fragment `sourceSignedApprovalCapturePreflightDigest`.
- Binds draft guard `ARTIFACT_DRAFT_PREFLIGHT_ARTIFACT_PREFLIGHT_DIGEST_GUARD` to blocker `ARTIFACT_DRAFT_PREFLIGHT_ARTIFACT_PREFLIGHT_DIGEST_MISSING` so a future manual draft cannot silently skip this requirement.
- Consumes the v1086 signed approval capture artifact preflight only through read-only local profile assembly.
- Does not create a signed approval draft, capture a signature, emit an approval grant, submit operator values, import evidence, create runtime payloads, start Java, start mini-kv, or mutate sibling state.

## Verification Intent

The v1087-v1111 chain is intentionally heavier than a thin archive-only run: it adds typed draft fields, declarative guards, fail-closed gates, Markdown rendering, profile route visibility, tests, and catalog ownership boundaries.

## Draft Contract

- Field kind: `digest-binding-draft-field`.
- Field mode: `digest-reference`.
- Purpose: digest binding to the v1086 artifact preflight.
- Required for artifact draft preflight: true.
- Draft artifact created: false.
- Draft signature payload present: false.
- Approval grant emitted: false.
- Runtime payload, writes, and sibling mutation remain blocked.

## Cross-Project Boundary

Java and mini-kv can continue in parallel. Node v1088 does not require fresh sibling evidence and is not a pre-approval blocker for their next work.

## Closeout

The next allowed Node step is manual signed approval draft readiness. Value import and live execution remain blocked.
