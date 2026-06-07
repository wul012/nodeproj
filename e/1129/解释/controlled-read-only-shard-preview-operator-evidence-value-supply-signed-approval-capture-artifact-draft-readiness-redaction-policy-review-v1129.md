# Node v1129 controlled read-only shard preview signed approval artifact draft readiness: redaction policy review lane

Node v1129 owns the redaction policy review slice of the v1112-v1136 signed approval artifact draft readiness package. This is not a small archive-only marker: it adds a route-visible readiness lane, a matching readiness control, source draft preflight bindings, blocker semantics, gate coverage, renderer output, profile output, and focused test expectations.

## Functional Change

- Lane code: `SIGNED_APPROVAL_CAPTURE_ARTIFACT_DRAFT_READINESS_REDACTION_POLICY_REVIEW`.
- Lane kind: policy.
- Source v1111 draft preflight field: `redactionPolicy`.
- Control blocker: `REJECT_DRAFT_READINESS_REDACTION_POLICY_UNREVIEWED`.
- The lane is ready only when the source draft field is ready, the paired source guard is ready, the source field remains preflight-only, unsigned draft and auto capture are still blocked, and the required source field name matches.
- The matching control blocks auto materialization, signed approval capture, runtime payload creation, write routing, and sibling mutation.

## Safety Boundary

- Does not create a signed approval draft artifact.
- Does not capture detached signature material or raw secrets.
- Does not emit approval grants or mark signed approval present.
- Does not submit, accept, import, or normalize operator values.
- Does not start Java, start mini-kv, connect managed audit, enable write routes, or mutate sibling state.

## Maintenance Shape

- Public shape lives in the artifact draft readiness types module.
- Declarative lane text lives in the lane catalog; control blocker text lives in the control catalog.
- Builder code maps v1111 fields and guards into readiness records without embedding release text.
- Validator owns the gate matrix and blocked reason codes.
- Renderer owns markdown details for archive/profile review.

## Cross-Project Position

- Java and mini-kv are recommended parallel for this slice.
- Node does not require fresh sibling evidence for this slice.
- Node is not a pre-approval blocker for Java or mini-kv here.

## Verification Evidence

- Focused readiness test covers ready and blocked source states.
- Route markdown test checks the aggregate v1136 readiness section.
- Barrel test checks stable create/render exports.
- Type module catalog test checks the seven new module boundaries and keeps profile entry last.
- Forced historical fixture fallback remains covered through the readiness focused test.

## Stop Condition

Stop after producing readiness evidence. A future package that actually materializes a manual signed approval draft must be separate, must explicitly preserve the no-secret/no-grant/no-runtime-payload policy until user-supplied evidence exists, and must name exact cleanup requirements before execution.
