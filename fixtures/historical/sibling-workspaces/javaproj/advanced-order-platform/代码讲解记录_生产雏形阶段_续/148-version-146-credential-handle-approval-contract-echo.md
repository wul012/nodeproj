# 148-version-146-credential-handle-approval-contract-echo

## Goal

Java v146 follows the active Node plan from `D:\nodeproj\orderops-node\docs\plans2\v316-post-signed-artifact-prerequisite-closure-roadmap.md`.
It consumes the Node v317 credential-handle approval contract intake and adds a read-only Java echo receipt for Node v318 verification.

This version does not read credential values, parse raw endpoint URLs, instantiate secret provider or resolver clients, send external requests, write approval ledger entries, run SQL/schema migration, deploy, roll back, or auto-start upstream work.

## Split Result

- `ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoRecords.java`
  - Holds the v146 receipt records: source Node v316 context, credential-handle contract, required/prohibited fields, rejection reasons, no-go boundaries, upstream requests, checks, proof, side-effect boundary, and summary.
- `ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractCatalog.java`
  - Centralizes Node v317 contract constants: 10 required fields, 8 prohibited fields, 5 rejection reasons, 9 no-go boundaries, warning/recommendation codes, proof claims, and Node v318 verification actions.
- `ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractSections.java`
  - Extracts the source Node v316 and contract/transition/proof construction out of the support file so the echo support stays below the giant-file warning zone.
- `ReleaseApprovalSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoSupport.java`
  - Builds the v146 receipt from the v145 signed artifact contract echo receipt and proves all side-effect gates remain blocked.
- `ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverCredentialHandleApprovalContractEchoReceiptBuilder.java`
  - Keeps the builder shape aligned with the response chain, verification hint, contribution catalog, and warning digest.

## Main Chain Changes

- `OpsEvidenceService`
  - Adds the v146 receipt version and schema v47.
  - Adds Node v317 profile, route, markdown route, and ready state constants.
  - Moves the top-level rehearsal response schema to `java-release-approval-rehearsal-response-schema.v47`.
- `ReleaseApprovalRehearsalManagedAuditReceiptChainBuilder`
  - Generates the v146 receipt after the v145 signed human approval artifact receipt.
- `ReleaseApprovalRehearsalResponse` / `ReleaseApprovalRehearsalResponseBuilder`
  - Exposes the v146 receipt in the response and passes it into verification hint construction.
- `ReleaseApprovalVerificationHint*` / `ReleaseApprovalVerificationWarningDigest*`
  - Adds the v146 schema field, warning input, proof claims, Node verification actions, and boundary lines.

## Contract Evidence

- Node source: `Node v317`
- Source chain: `Node v316 + Node v313 catalog`
- Next Node verification: `Node v318`
- Parallel mini-kv echo: `mini-kv v139`
- Node profile: `managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-intake.v1`
- Node route: `/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-intake`
- Markdown route: `/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-intake?format=markdown`
- Node state: `credential-handle-approval-contract-intake-ready`
- Contract digest: `298ffb48a00aab4f4630b42fc7b48805185d50a5465938768bd78943e05ae817`
- Echo mode: `java-v146-credential-handle-approval-contract-echo-only`
- Required field count: `10`
- Prohibited field count: `8`
- Rejection reason count: `5`
- No-go boundary count: `9`
- Java v146 schema: `java-release-approval-rehearsal-response-schema.v47`

## Tests

- Added `OpsEvidenceServiceCredentialHandleApprovalContractEchoTests`
  - Verifies Node v317 profile/route/state, contract digest, required/prohibited fields, rejection reasons, and no-go boundaries.
  - Verifies source Node v316/v145 evidence and v146 source receipt alignment.
  - Verifies Java v146 and mini-kv v139 are requested in parallel before Node v318.
  - Verifies runtime, credential, raw endpoint, provider/client, external request, ledger, SQL/schema migration, deployment, rollback, and auto-start boundaries remain false.
- Updated verification hint contribution and warning digest line catalog tests for the new v146 contribution.
- Updated integration schema assertions so live and verification endpoints expect schema v47.

## Line Counts

- `OpsEvidenceService.java`: `1372` lines
- New split files:
  - records: `278` lines
  - catalog: `279` lines
  - sections: `123` lines
  - support: `523` lines
  - builder: `58` lines
- New focused test: `203` lines

The v146 code stays split by responsibility. The heavy construction logic moved into `sections`, and the support file is back under the earlier giant-file warning zone.

## Verification

```powershell
mvn -q "-Dtest=OpsEvidenceServiceCredentialHandleApprovalContractEchoTests,ReleaseApprovalVerificationHintContributionCatalogTests,ReleaseApprovalVerificationWarningDigestLineCatalogTests,OpsEvidenceServiceReleaseApprovalRehearsalVerificationHintOverviewTests" test
mvn -q test
```

Result: passed. The log still includes Mockito dynamic-agent and Testcontainers Docker detection warnings, but they did not fail this run. Docker Desktop was not needed.
