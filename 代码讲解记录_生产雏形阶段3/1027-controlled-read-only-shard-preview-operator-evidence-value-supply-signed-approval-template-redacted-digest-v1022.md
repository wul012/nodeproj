# Code walkthrough 1027: Node v1022 redacted value digest field

## Files Touched

- src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateTypes.ts defines the field, clause, gate, and aggregate contracts.
- src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateFieldCatalog.ts owns field SIGNED_APPROVAL_TEMPLATE_REDACTED_DIGEST.
- src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateClauseCatalog.ts owns clause SIGNED_APPROVAL_TEMPLATE_REDACTED_DIGEST_REQUIRED.
- src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateBuilder.ts maps review control VALUE_SUPPLY_APPROVAL_REVIEW_REDACTED_DIGEST to the field and maps the field to its clause.
- src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateValidator.ts enforces readiness and non-execution gates.
- src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateArtifacts.ts assembles counts, blockers, gates, and digest.
- src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowOperatorEvidenceValueSupplySignedApprovalTemplateRenderer.ts renders the field and clause for archive review.

## Flow

The controlled preview profile builds the v1011 approval packet review package first. The signed approval template builder then locates source review control VALUE_SUPPLY_APPROVAL_REVIEW_REDACTED_DIGEST, verifies its manual-review and auto-approval locks, creates field SIGNED_APPROVAL_TEMPLATE_REDACTED_DIGEST, and attaches clause SIGNED_APPROVAL_TEMPLATE_REDACTED_DIGEST_REQUIRED. The validator marks the slice ready only when the field and clause both remain read-only and non-executing.

## Why It Is Safe

This slice does not capture signatures or values. It keeps signed approval capture, operator value supply, value submission, evidence import, runtime payload, live execution, production execution, writes, service starts, and sibling mutation disabled.

## Tests

The focused signed approval template test checks all twenty-five fields and clauses, including SIGNED_APPROVAL_TEMPLATE_REDACTED_DIGEST and SIGNED_APPROVAL_TEMPLATE_REDACTED_DIGEST_REQUIRED, the ready profile path, the blocked-source fail-closed path, renderer output, profile inclusion, and forced historical fallback through the source review package.