# v1472 code walkthrough

v1472 confirms the extracted renderer is type-only against `ControlledReadOnlyShardPreviewProfile`. It does not import builders, clients, config, or runtime service code.

That boundary keeps renderer tests fast and deterministic.
