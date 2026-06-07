# Node v1159 signed approval artifact draft review package preflight explanation

Node v1159 adds the write route embargo package slot for the controlled read-only shard preview signed approval chain.

## What changed

- Package slot: SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_REVIEW_PACKAGE_PREFLIGHT_WRITE_ROUTE_EMBARGO_SLOT
- Package guard: ARTIFACT_DRAFT_REVIEW_PACKAGE_PREFLIGHT_WRITE_ROUTE_EMBARGO_GUARD
- Purpose: keeps write routing disabled until a real approval grant exists.
- Source: Node v1136 artifact draft readiness lanes and controls.
- Safety: still no signed draft text, no detached signature payload, no approval grant, no operator value import, no runtime payload, no service startup, and no sibling mutation.

## Verification focus

- The slot must be ready only when the source readiness lane and control are ready and read-only.
- The guard must reject missing package slots and block package materialization, signed draft text, signature payload, approval grants, runtime payloads, writes, and sibling mutation.
- The package remains a preflight surface for later human draft authoring, not a draft artifact itself.
