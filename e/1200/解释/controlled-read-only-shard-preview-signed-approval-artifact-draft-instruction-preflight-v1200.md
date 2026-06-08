# Node v1200 signed approval artifact draft instruction preflight explanation

Node v1200 adds the source evidence file instruction slot for the controlled read-only shard preview signed approval chain.

## What changed

- Instruction slot: SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_SOURCE_FILE_SLOT
- Instruction guard: SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_SOURCE_FILE_SLOT_GUARD
- Category: source evidence
- Source binding: source file authoring requirement and blocker from Node v1186 authoring readiness.
- Purpose: prepares a metadata instruction slot for citing source evidence file id.
- Safety: still no signed draft text, no detached signature payload, no approval grant, no operator value import, no runtime payload, no service startup, and no sibling mutation.

## Verification focus

- The slot must be ready only when the source authoring requirement and blocker are ready and read-only.
- The guard must reject missing instruction slots and block instruction materialization, draft artifact creation, signed draft text, signature payloads, approval grants, runtime payloads, writes, and sibling mutation.
- The instruction preflight remains a preparatory surface for later manual draft text, not a draft artifact and not a real approval capture.
