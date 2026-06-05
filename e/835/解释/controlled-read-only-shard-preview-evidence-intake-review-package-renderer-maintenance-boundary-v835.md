# v835 Controlled read-only shard preview evidence intake review package renderer maintenance boundary

v835 adds `INTAKE_REVIEW_RENDERER_MAINTENANCE_BOUNDARY` and performs the maintenance split.

The top-level controlled shard preview renderer no longer owns all live-window Markdown sections. Those sections move into `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowProfileSectionsRenderer.ts`, so new live-window sections can grow without turning the main renderer into a giant file.

Cross-project status: Java and mini-kv can continue in parallel.

Verification: covered by route Markdown smoke tests and final batch validation.
