# 489 Java / mini-kv current route catalog cleanup evidence archive verification v484

## Version Progress

Node v484 verifies the v483 archive files for the current evidence report.

## Key Files

- `src/services/javaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerification.ts`
- `src/services/javaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerificationRenderer.ts`
- `test/javaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerification.test.ts`
- `docs/plans3/v484-post-java-mini-kv-current-route-catalog-cleanup-evidence-archive-verification-roadmap.md`

## Core Flow

The verifier reads the archived JSON, Markdown, and summary files under `e/483/evidence`. It checks digest parity, source versions, ready state, 18/18 checks, Java v214 and mini-kv v200 evidence markers, and runtime boundary flags.

## Validation

- Focused archive verification test.
- Typecheck.
- Build.

## Maturity

v484 creates the verification profile that v485 can expose through the existing cleanup route group.
