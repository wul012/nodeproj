# Node v1211 signed approval artifact draft instruction preflight explanation

Node v1211 adds the instruction preflight closeout slot for the controlled read-only shard preview signed approval chain.

## What changed

- Instruction slot: SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_CLOSEOUT_SLOT
- Instruction guard: SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_CLOSEOUT_SLOT_GUARD
- Category: archive closeout
- Source binding: authoring readiness closeout requirement and blocker from Node v1186 authoring readiness.
- Purpose: closes the instruction preflight and requires any real draft text to be created by a separate manual draft text package.
- Safety: still no signed draft text, no detached signature payload, no approval grant, no operator value import, no runtime payload, no service startup, and no sibling mutation.

## Verification focus

- The slot must be ready only when the source authoring requirement and blocker are ready and read-only.
- The guard must reject missing instruction slots and block instruction materialization, draft artifact creation, signed draft text, signature payloads, approval grants, runtime payloads, writes, and sibling mutation.
- The instruction preflight remains a preparatory surface for later manual draft text, not a draft artifact and not a real approval capture.
