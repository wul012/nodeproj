# Code walkthrough - Node v1672

## Focus

Move production blocker collection into the builder.

## Code reading notes

- productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification.ts remains the stable loader and export surface for routes and release evidence review.
- productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationTypes.ts owns the verification profile and message contracts so consumers can type against verification output without importing builder internals.
- productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationBuilder.ts owns endpoint constants, expected archive digest recomputation, verification digest creation, checks, verification state, blocker/warning/recommendation messages, and summary assembly.
- The verification builder reuses capture archive Java v50 and mini-kv v59 constants, preventing duplicate tag literals from drifting.
- productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerificationMarkdownRenderer.ts owns deterministic Markdown rendering for the JSON/Markdown route pair.
- test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification.test.ts keeps the stable entrypoint renderer re-export locked to the dedicated renderer module.

## Maintenance rule

Keep new verification rules behind the builder boundary. Do not put new digest inputs, readiness checks, upstream reference comparisons, or Markdown sections back into the loader.
