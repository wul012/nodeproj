# Node v1182 signed approval artifact draft authoring readiness explanation

Node v1182 adds the approval grant embargo authoring requirement for the controlled read-only shard preview signed approval chain.

## What changed

- Authoring requirement: SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_AUTHORING_READINESS_APPROVAL_GRANT_EMBARGO
- Authoring blocker: SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_AUTHORING_READINESS_APPROVAL_GRANT_EMBARGO_BLOCKER
- Category: execution lock
- Source binding: approval grant embargo package slot and guard from Node v1161 review package preflight.
- Purpose: proves no approval grant exists and keeps authoring separate from approval capture.
- Safety: still no signed draft text, no detached signature payload, no approval grant, no operator value import, no runtime payload, no service startup, and no sibling mutation.

## Verification focus

- The requirement must be ready only when the source review package slot and guard are ready and read-only.
- The blocker must reject missing authoring requirements and block instruction materialization, draft artifact creation, signed draft text, signature payloads, approval grants, runtime payloads, writes, and sibling mutation.
- The authoring readiness package remains a preparatory surface for later human draft work, not a signed approval artifact and not a real approval capture.
