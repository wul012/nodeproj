# Node v642 code walkthrough: controlled read-only shard preview next actions Markdown

## Goal

v642 renders the plan-backed `nextActions` in Markdown.

## Renderer

`renderManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewMarkdown(...)` now appends:

- `## Next Actions`;
- every `profile.nextActions` entry as a bullet.

## Route Test

The route test now verifies that Markdown contains:

- the Next Actions section;
- the source matrix plan consume instruction;
- `observeSources=java|miniKv`.

## Behavior

JSON output is unchanged from v641. Markdown now exposes the same next-step guidance.

## Cross-project status

Java and mini-kv can continue in parallel. v642 consumes no fresh sibling evidence and starts no sibling services.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd test -- test\managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRoutes.test.ts
npm.cmd run build
```

Result:

- Typecheck passed.
- Focused route test passed: 1 file, 1 test.
- Build passed.
