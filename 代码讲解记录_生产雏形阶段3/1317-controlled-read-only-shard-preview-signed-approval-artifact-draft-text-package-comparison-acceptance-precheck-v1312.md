# 1317. Node v1312 signed approval artifact draft text package comparison acceptance precheck walkthrough

Node v1312 introduces the source comparison preflight readiness checkpoint in `ComparisonAcceptancePrecheckCheckCatalog.ts`.

The checkpoint consumes Node v1311 comparison preflight output through `ComparisonAcceptancePrecheckBuilder.ts`. It verifies that all comparison lanes and acceptance controls are ready and read-only before any later acceptance evidence can be evaluated.

`ComparisonAcceptancePrecheckGuardCatalog.ts` derives the matching guard from the checkpoint template. The guard blocks missing acceptance evidence and keeps draft text package submission, comparison, acceptance, signed draft text, approval grants, runtime payloads, writes, and sibling mutation blocked.

This split keeps the template, guard derivation, builder mapping, validation, artifact digest, and renderer separate. The design prevents another giant file while preserving the existing profile/barrel pattern.
