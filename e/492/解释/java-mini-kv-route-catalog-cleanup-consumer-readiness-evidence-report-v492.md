# Node v492 Java / mini-kv route catalog cleanup consumer readiness evidence report

v492 turns the v491 local evidence intake into a JSON/Markdown audit route. It keeps the same read-only boundary: the route only summarizes frozen evidence already copied into Node historical fixtures.

## Route

`/api/v1/audit/java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence`

The JSON form exposes the typed profile. The Markdown form is for archive snapshots and human review.

## What Changed

- Added `javaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceReport.ts`.
- Added `javaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceReportRenderer.ts`.
- Registered the new route in the existing cleanup route group.
- Updated route catalog expectations to 206 total JSON/Markdown routes and 42 Java/mini-kv routes.

## Boundary

The report does not start sibling services, does not mutate Java or mini-kv state, and does not treat mini-kv rolling v210 as a historical baseline. v210 remains an audit note until a versioned fixture exists.

## Result

The new route returns ready=true, 15/15 files present, and 21/21 checks passed. The cleanup route group now has 8 routes.
