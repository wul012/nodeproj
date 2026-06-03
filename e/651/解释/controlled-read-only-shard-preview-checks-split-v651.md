# v651 Controlled read-only shard preview checks split

## Purpose

v651 splits controlled read-only shard preview readiness checks, blockers, warnings, recommendations, and next actions into a dedicated module.

The previous support module was carrying both low-level observation helpers and higher-level readiness guidance. That made every new gate increase the same file's responsibilities.

## Change

Added:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewChecks.ts`.

Updated:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.ts`;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSupport.ts`.

Moved into the checks module:

- `createChecks`;
- `collectProductionBlockers`;
- `collectWarnings`;
- `collectRecommendations`;
- `createNextActions`.

## Growth control

This version does not add a new route, approval workflow, sibling evidence requirement, service startup path, or archive chain.

Necessity proof:

- blocker resolved: readiness/guidance changes were making the shared support module grow again;
- later consumer: upcoming shard-preview gates can be added in the checks module without mixing with transport parsing and matrix construction;
- reuse decision: existing behavior and test coverage are reused; this is a structural split, not a new artifact surface;
- stop condition: support now keeps observation/source-matrix/digest/summary helpers, while readiness policy lives in one focused module.

## Cross-project status

Java and mini-kv are recommended parallel work.

Node v651 consumes no fresh sibling evidence and starts no sibling services.

## Verification

Ran:

- `npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts test\auditMinimalShardReadinessRoutes.test.ts`
- `npm.cmd run typecheck`

Result:

- Focused tests passed: 3 files, 4 tests.
- Typecheck passed.

