# Node v581 code walkthrough: controlled read-only Java/mini-kv shard preview

## Goal

v581 adds a current shard preview surface after the v566-v580 maturity closeout.

It is not a new archive chain and not active shard routing. It is a controlled read-only preview that consumes two existing safe surfaces:

- Java: `GET /api/v1/ops/shard-readiness`;
- mini-kv: `SHARDJSON`.

## Service

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.ts` owns the profile.

The service reads both upstreams only when `UPSTREAM_PROBES_ENABLED=true`. If probes are disabled, both observations are skipped and the profile stays blocked. This prevents Node from pretending it performed a live read when the read window was not opened.

The implementation is split to keep the new runtime-facing work maintainable:

- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.ts` orchestrates the profile;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewSupport.ts` owns assessment, blockers, digest, and summary helpers;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts` owns the exported profile shape;
- `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewRenderer.ts` owns Markdown rendering.

## Boundaries

The profile records the important negative permissions:

- `previewOnly=true`;
- `executionAllowed=false`;
- `startsJavaService=false`;
- `startsMiniKvService=false`;
- `stopsJavaService=false`;
- `stopsMiniKvService=false`;
- `activeShardRouterAllowed=false`;
- `writeRoutingAllowed=false`;
- `loadRestoreCompactAllowed=false`.

mini-kv also has boundary checks for write/admin/load/restore/compact diagnostics.

## Route

`auditMinimalShardReadinessRoutes.ts` registers one new JSON/Markdown route. It remains inside the minimal shard readiness group because the route is a continuation of read-only shard readiness, not a separate production runtime lane.

## Tests

The new focused test covers:

- fake-client success with Java and mini-kv read-only evidence;
- fail-closed behavior when probes are disabled;
- JSON and Markdown route exposure through mock local read-only services.

The route catalog count tests are updated because the audit route catalog grows from 228 to 229 routes.

## Smoke Archive

The final smoke starts local mock Java and mini-kv services, then starts Node on port `4190` with probes enabled and actions disabled.

The archived route output proves:

- Java read status is `passed-read`;
- mini-kv read status is `passed-read`;
- `previewOnly=true`;
- `executionAllowed=false`;
- Node does not start or stop Java/mini-kv;
- shard router activation and write routing remain disabled.
