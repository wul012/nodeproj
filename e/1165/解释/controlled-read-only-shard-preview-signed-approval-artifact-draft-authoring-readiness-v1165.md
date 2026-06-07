# Node v1165 signed approval artifact draft authoring readiness explanation

Node v1165 adds the approval review digest authoring requirement for the controlled read-only shard preview signed approval chain.

## What changed

- Authoring requirement: SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_AUTHORING_READINESS_REVIEW_DIGEST
- Authoring blocker: SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_AUTHORING_READINESS_REVIEW_DIGEST_BLOCKER
- Category: digest binding
- Source binding: approval review digest package slot and guard from Node v1161 review package preflight.
- Purpose: pins the approval packet review digest as a source reference for future manual authoring.
- Safety: still no signed draft text, no detached signature payload, no approval grant, no operator value import, no runtime payload, no service startup, and no sibling mutation.

## Verification focus

- The requirement must be ready only when the source review package slot and guard are ready and read-only.
- The blocker must reject missing authoring requirements and block instruction materialization, draft artifact creation, signed draft text, signature payloads, approval grants, runtime payloads, writes, and sibling mutation.
- The authoring readiness package remains a preparatory surface for later human draft work, not a signed approval artifact and not a real approval capture.
