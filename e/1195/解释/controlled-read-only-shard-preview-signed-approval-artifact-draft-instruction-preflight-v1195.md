# Node v1195 signed approval artifact draft instruction preflight explanation

Node v1195 adds the signature algorithm instruction slot for the controlled read-only shard preview signed approval chain.

## What changed

- Instruction slot: SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_SIGNATURE_ALGORITHM_SLOT
- Instruction guard: SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_INSTRUCTION_PREFLIGHT_SIGNATURE_ALGORITHM_SLOT_GUARD
- Category: signature envelope
- Source binding: signature algorithm authoring requirement and blocker from Node v1186 authoring readiness.
- Purpose: prepares a policy instruction slot for signature algorithm text without accepting signature payloads.
- Safety: still no signed draft text, no detached signature payload, no approval grant, no operator value import, no runtime payload, no service startup, and no sibling mutation.

## Verification focus

- The slot must be ready only when the source authoring requirement and blocker are ready and read-only.
- The guard must reject missing instruction slots and block instruction materialization, draft artifact creation, signed draft text, signature payloads, approval grants, runtime payloads, writes, and sibling mutation.
- The instruction preflight remains a preparatory surface for later manual draft text, not a draft artifact and not a real approval capture.
