# Node v641 code walkthrough: controlled read-only shard preview plan-backed next actions

## Goal

v641 makes top-level `nextActions` consume the source matrix consumption plan.

## Implementation

`createNextActions(...)` now lives in the support module.

Ready profiles include:

- a next action containing the plan steps;
- the existing independent-service boundary.

Blocked profiles include:

- plan blocked reasons;
- the no-start/no-write/no-routing boundary.

## Behavior

The `nextActions` field remains a string array, but its content is now grounded in the same plan used by readiness and recommendations.

## Cross-project status

Java and mini-kv can continue in parallel. v641 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused preview test passed: 1 file, 2 tests.
- Build passed.
