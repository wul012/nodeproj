# Code walkthrough - Node v1626

## Focus

renderer re-export regression test.

## Code reading notes

- productionLiveProbeRealReadSmokeReadOnlyWindowLiveCapture.ts now remains the stable loader and export surface.
- productionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureTypes.ts owns profile, captured-record, and message contracts.
- productionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureBuilder.ts owns captured-record conversion, checks, state, digest, endpoint constants, messages, and summary assembly.
- productionLiveProbeRealReadSmokeReadOnlyWindowLiveCaptureMarkdownRenderer.ts owns deterministic Markdown section rendering.

## Maintenance rule

Keep new live capture responsibilities behind these boundaries. Do not add inline checks, captured-record conversion, or Markdown sections back into the loader.
