# Node v1008 controlled read-only shard preview operator evidence value supply approval packet review: runtime payload block review control

## What This Version Owns

v1008 owns the runtime payload block review control slice of the v987-v1011 approval packet review package. It adds review control VALUE_SUPPLY_APPROVAL_REVIEW_RUNTIME_PAYLOAD_BLOCK in the execution-lock group and maps it to source approval packet draft slot VALUE_SUPPLY_APPROVAL_PACKET_MINI_KV_ADAPTER_DISABLED.

## Source Draft Binding

- Source Node version: Node v986
- Source approval packet draft slot: VALUE_SUPPLY_APPROVAL_PACKET_MINI_KV_ADAPTER_DISABLED
- Review control code: VALUE_SUPPLY_APPROVAL_REVIEW_RUNTIME_PAYLOAD_BLOCK
- Review state contribution: readyForValueSupplyApprovalPacketReview can become true only when the source draft slot is ready, the required approval field is present, the required review record field is present, and the expected policy still matches.

## Safety Boundary

This version is review-only. readyForSignedApprovalCapture, readyForOperatorValueSupply, readyForOperatorValueSubmission, readyForEvidenceImport, readyForRuntimePayload, readyForLiveExecution, and readyForProductionExecution remain false. approvalCaptured, approvalGrantPresent, signedApprovalPresent, operatorIdentityPresent, and approvalTimestampPresent remain false. suppliedValueCount, acceptedValueCount, and importedValueCount remain 0. Writes, service starts, and sibling mutations remain disabled.

## Maintenance Notes

The review question, acceptance criterion, blocker code, source draft slot mapping, required approval field, required review record field, and expected policy live in the control catalog. The slot builder only projects those catalog entries onto the Node v986 draft. This keeps the review package maintainable and prevents the artifact builder from becoming a large template file.

## Verification Notes

Covered by the focused approval packet review test, blocked-source fail-closed test, forced historical fallback test through the source draft, controlled preview route Markdown test, type module catalog test, review artifact barrel test, typecheck, and build at batch closeout.
