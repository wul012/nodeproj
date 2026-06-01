# Node v494 post Java / mini-kv route catalog cleanup consumer readiness evidence archive verification roadmap

## Goal

Node v494 verifies the v493 archived consumer readiness evidence report files without re-running sibling evidence collection.

## Cross-Project State

Java and mini-kv remain recommended parallel. v494 only reads Node archive files under `e/493/evidence`; it does not require Java or mini-kv to stop, start, or produce fresh files.

## Necessity Proof

- Blocker resolved: v493 created archive files, but route exposure should not happen until the archive is verified.
- Later consumer: v495 will expose this verifier as a route and update catalog counts.
- Existing verifier reuse is not enough: the v489 verifier checks the checklist archive, not this consumer-readiness archive.
- Growth stop condition: after v495 route exposure, this v491-v495 chain is complete.

## Implementation Plan

- Add archive verifier service and Markdown renderer.
- Read v493 JSON, Markdown, and archive summary.
- Compare summary digests to actual file SHA-256 values.
- Verify active/source versions, ready=true, 21/21 checks, Java v224 and mini-kv v209/v210 boundaries.
- Add focused unit test.

## Validation Plan

- Run focused archive verifier test.
- Run typecheck.
- Do not add a route in this version.
