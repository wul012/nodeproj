# 413. Node v408 Java / mini-kv runtime execution pass evidence archive verification

## Files

- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceArchiveVerification.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceArchiveVerificationTypes.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceArchiveVerificationRenderer.ts`
- `test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceArchiveVerification.test.ts`
- `src/routes/auditJsonMarkdownRoutes.ts`

## Flow

`loadManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionPassEvidenceArchiveVerification(...)` reads v407 archive artifacts from `e/407` and verifies:

- the v407 HTTP profile is the expected pass-evidence profile;
- v407 recorded `2/2` attempted and passed targets;
- v407 recorded `21/21` checks and `0` blockers;
- the summary matches the HTTP archive counts;
- cleanup proof passed and no checked port remained in `LISTEN`;
- browser snapshot, screenshot, explanation, and code walkthrough exist;
- v407 verification totals were recorded.

## Boundary

v408 is archive verification only. It never calls Java or mini-kv and never starts or stops services. Any future closeout should consume this verification result instead of rerunning smoke.
