# Node v835 code walkthrough: evidence intake review package renderer maintenance boundary

v835 adds the renderer maintenance boundary.

`managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewLiveReadOnlyWindowProfileSectionsRenderer.ts` now owns live-window Markdown sections. The top-level renderer delegates to it instead of growing another large inline block.

Verification: covered by route Markdown smoke tests.
