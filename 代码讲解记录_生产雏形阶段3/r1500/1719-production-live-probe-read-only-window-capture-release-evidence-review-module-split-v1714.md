# Code walkthrough - Node v1714

## Focus

Validate the archive verification upstream consumer after the split.

## Code reading notes

- productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReview.ts remains the stable loader and export surface for status live probe routes.
- productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewTypes.ts owns the release review profile, field-guide reference contracts, and message contracts.
- productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewBuilder.ts owns Java v51 and mini-kv v60 field guide constants, endpoint constants, release semantics, digest creation, checks, review state, blocker/warning/recommendation messages, and summary assembly.
- productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReviewMarkdownRenderer.ts owns deterministic Markdown rendering for the JSON/Markdown route pair.
- test/productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReview.test.ts keeps the stable entrypoint renderer re-export locked to the dedicated renderer module.

## Maintenance rule

Keep new release evidence review rules behind the builder boundary. Do not put new field-guide checks, release semantics, digest inputs, or Markdown sections back into the loader.
