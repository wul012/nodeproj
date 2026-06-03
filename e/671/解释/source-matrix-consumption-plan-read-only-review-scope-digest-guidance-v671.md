# v671 Source matrix consumption plan read-only review scope digest guidance

## Purpose

v671 surfaces read-only review scope digest coverage in compact guidance.

The route already renders the digest. Recommendations and next actions now also include scope label and covered operation counts.

## Change

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewGuidanceFormatters.ts`;
- focused profile and route tests.

`formatReadOnlyReviewScope(...)` now includes:

- `digestScope`;
- `coveredAllowed`;
- `coveredForbidden`.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, runtime behavior, or artifact chain.

Necessity proof:

- blocker resolved: scope digest was gated but not visible in compact guidance;
- later consumer: operator guidance can confirm digest scope and covered counts without scanning the full Markdown section;
- reuse decision: this formats the existing `scopeDigest`;
- stop condition: only the existing read-only review scope summary string changes.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v671 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run typecheck`

Result:

- Focused tests passed: 6 files, 13 tests.
- Typecheck passed.

