# v596 Promotion handoff verification item compare helper

## Purpose

v596 is version 15 of the 16-version maintenance/refactor run.

After v595 centralized missing digest fallback construction, the handoff verification builders still repeated the same base comparison pattern for artifact child items:

- expected item exists;
- `valid` matches;
- `source` matches;
- digest value matches.

## Change

Extended `src/services/opsPromotionArchiveHandoffVerificationDigests.ts` with:

- `compareHandoffVerificationItem(...)`.

The helper compares the shared item fields while preserving artifact-specific name/source literal types through generics.

The package, certificate, receipt, closure, and completion builder modules now use the helper for their base item comparison. Each module still keeps its artifact-specific output field:

- `packageDigest`;
- `certificateDigest`;
- `receiptDigest`;
- `closureDigest`;
- `completionDigest`.

## Maintenance impact

This removes repeated comparison mechanics without hiding the artifact-specific verification output shape. Completion still applies its own `ready` and `detail` comparisons after the shared base comparison.

## Growth control

This version adds no route, governance artifact, approval rule, or sibling evidence requirement.

It resolves a maintenance blocker: repeated comparison logic across five handoff artifact modules.

Java and mini-kv remain recommended parallel work. v596 is Node-only production maintenance and requires no fresh sibling evidence.

## Verification

- `npm.cmd run typecheck`
- promotion group: 18 real `test/opsPromotion*.test.ts` files via `rg --files`
- `npm.cmd run build`

Result:

- Typecheck passed, including literal name/source type preservation.
- Promotion group passed: 18 files, 45 tests.
- Build passed.

CI note:

- v596 is part of the next batched maintenance push. GitHub `Node Evidence` will run after the batch is accumulated.
