# Node v1208 signed approval artifact draft instruction preflight explanation

Node v1208 adds the zero value import embargo instruction slot for the controlled read-only shard preview signed approval chain.

## What changed

- Instruction slot: SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_ZERO_VALUE_IMPORT_EMBARGO_SLOT
- Instruction guard: SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_ZERO_VALUE_IMPORT_EMBARGO_SLOT_GUARD
- Category: execution lock
- Source binding: zero value import embargo authoring requirement and blocker from Node v1186 authoring readiness.
- Purpose: prepares an execution-lock instruction slot proving operator value imports remain zero.
- Safety: still no signed draft text, no detached signature payload, no approval grant, no operator value import, no runtime payload, no service startup, and no sibling mutation.

## Verification focus

- The slot must be ready only when the source authoring requirement and blocker are ready and read-only.
- The guard must reject missing instruction slots and block instruction materialization, draft artifact creation, signed draft text, signature payloads, approval grants, runtime payloads, writes, and sibling mutation.
- The instruction preflight remains a preparatory surface for later manual draft text, not a draft artifact and not a real approval capture.
