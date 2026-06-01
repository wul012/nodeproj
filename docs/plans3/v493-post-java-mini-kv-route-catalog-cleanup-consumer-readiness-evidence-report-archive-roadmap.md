# Node v493 post Java / mini-kv route catalog cleanup consumer readiness evidence report archive roadmap

## Goal

Node v493 archives the v492 consumer readiness evidence report route output into `e/493/evidence`.

Archived files:

- JSON response from `/api/v1/audit/java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence`.
- Markdown response from the same route with `?format=markdown`.
- Archive summary with status codes, readiness, counts, file sizes, and SHA-256 digests.

## Cross-Project State

Java and mini-kv are recommended parallel. v493 does not require fresh upstream work and does not consume Java's dirty current files or mini-kv rolling current as historical baselines.

## Necessity Proof

- Blocker resolved: v492 created a live route, but archive verification needs immutable route outputs.
- Later consumers: v494 will verify these archive files without re-running sibling evidence collection.
- Existing archives are not enough: v488 archived the checklist report, not the consumer-readiness report.
- Growth stop condition: archive generation ends here; v494 verifies the archive, and v495 exposes that verifier.

## Validation Plan

- Generate archive through Fastify inject.
- Verify JSON and Markdown status codes are 200.
- Verify ready=true and 21/21 checks in the archive summary.
- Remove the temporary archive helper script after generation.
