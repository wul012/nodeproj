# v692 Controlled read-only shard preview window owner binding

v692 adds the first live read-only window stage: explicit owner binding for Node, Java, and mini-kv processes.

The stage is represented inside the Node v711 stage ledger as `WINDOW_OWNER_BINDING`. It requires cleanup, stays read-only, starts no services, and does not mutate sibling state.

Cross-project status: Java and mini-kv can continue in parallel. They only need to mirror owner/port/cleanup expectations before a future live read-only window.

Verification: covered by `managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowStageLedger.test.ts`.
