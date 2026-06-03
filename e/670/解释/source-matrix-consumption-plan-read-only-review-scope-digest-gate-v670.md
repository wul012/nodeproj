# v670 Source matrix consumption plan read-only review scope digest gate

## Purpose

v670 makes the v669 read-only review scope digest enforceable.

The controlled read-only shard preview now blocks if the scope digest is malformed, has the wrong scope label, or has covered counts that drift from the actual operation arrays.

## Change

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.ts`;
- focused profile and checks tests.

The new readiness check is:

- `sourceMatrixConsumptionPlanReadOnlyReviewScopeDigestStable`.

The new blocker is:

- `SOURCE_MATRIX_CONSUMPTION_PLAN_REVIEW_SCOPE_DIGEST_UNSTABLE`.

## Growth control

This version does not add a route, approval workflow, sibling evidence requirement, service startup path, or artifact chain.

Necessity proof:

- blocker resolved: scope digest existed but was not part of readiness;
- later consumer: read-only review scope consumers can trust top-level checks to catch malformed or count-drifted digests;
- reuse decision: this consumes the existing scope digest;
- stop condition: validation is limited to hash shape, scope label, and covered counts.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v670 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewReviewArtifactsBarrel.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewConsumptionPlan.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run typecheck`

Result:

- Focused tests passed: 6 files, 13 tests.
- Typecheck passed.

