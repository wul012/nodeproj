# Code walkthrough - Node v1779

## Focus

Run approval and change JSON/Markdown route tests after the split.

## Code reading notes

- opsPromotionArchiveReleaseDeploymentRenderers.ts is now a stable barrel preserving the old import path.
- opsPromotionReleaseArchiveMarkdownRenderers.ts owns release evidence and release archive Markdown plus their item helpers.
- opsPromotionDeploymentApprovalChangeMarkdownRenderers.ts owns approval and change Markdown plus their item helpers.
- opsPromotionDeploymentExecutionMarkdownRenderers.ts owns execution and receipt Markdown plus their item helpers.
- opsPromotionReleaseAuditTrailMarkdownRenderer.ts owns the audit trail Markdown renderer and audit item helper.
- test/opsPromotionArchiveReleaseDeploymentRenderers.test.ts locks the barrel re-export identity for all split functions.

## Maintenance rule

Do not put new promotion release/deployment Markdown bodies back into the barrel. Add renderer logic to the matching vertical renderer module and keep route imports stable.
