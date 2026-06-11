# Node v515 code walkthrough: fresh baseline batch closeout archive verification

## Why This Version Exists

v514 archived the v513 closeout route output. v515 adds a verifier that proves those archive files are present, hash-matched, and semantically aligned with the v512 closeout.

## Service

`javaMiniKvRouteCatalogCleanupFreshBaselineBatchCloseoutArchiveVerification.ts` reads the archived JSON, Markdown, and summary files from `e/514/evidence`.

It recalculates SHA-256 digests, extracts source report fields, and verifies ready=true, 14/14 checks, closed versions v507-v511, and route snapshot 213/49/15.

## Renderer

The renderer prints source report, summary, checks, archive file references, and next actions.

## Next Version

v516 should expose this verifier route and update route catalog counts.
