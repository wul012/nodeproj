# Code walkthrough - Node v1639

## Focus

Keep ready-for-read-only-capture-archive evaluation inside the builder.

## Code reading notes

- productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive.ts remains the stable loader and export surface for routes and downstream verification.
- productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveTypes.ts owns profile, upstream-reference tag, and message contracts so consumers can type against the archive without importing builder internals.
- productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveBuilder.ts owns Java v50 / mini-kv v59 references, endpoint constants, checks, archive state, digest input, blocker/warning/recommendation messages, and summary assembly.
- productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveMarkdownRenderer.ts owns deterministic Markdown rendering for the JSON/Markdown route pair.
- test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive.test.ts keeps the stable entrypoint renderer re-export locked to the dedicated renderer module.

## Maintenance rule

Keep new capture archive rules behind the builder boundary. Do not put new checks, digest inputs, upstream reference constants, or Markdown sections back into the loader.
