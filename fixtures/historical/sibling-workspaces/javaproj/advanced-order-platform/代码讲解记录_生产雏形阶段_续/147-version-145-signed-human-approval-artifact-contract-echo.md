# 147-version-145-signed-human-approval-artifact-contract-echo

## Goal

Java v145 follows the active Node plan from `D:\nodeproj\orderops-node\docs\plans2\v313-post-prerequisite-catalog-cleanup-roadmap.md`.
It consumes the Node v314 signed human approval artifact contract intake and adds a read-only Java echo receipt for Node v315 verification.

This version does not implement an approval ledger, persist a signed artifact, validate a signed artifact, claim signing authority, read credential values, parse raw endpoint URLs, instantiate provider/client objects, send external requests, run SQL/schema migration, deploy, roll back, or auto-start upstream work.

## Split Result

- `ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoRecords.java`
  - Holds the v145 receipt records: source Node v312 context, signed artifact contract, required/prohibited fields, rejection reasons, no-go boundaries, upstream requests, checks, proof, boundary, and summary.
- `ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractCatalog.java`
  - Centralizes Node v314 contract constants: 11 required fields, 8 prohibited fields, 5 rejection reasons, 8 no-go boundaries, warning/recommendation codes, proof claims, and Node v315 verification actions.
- `ReleaseApprovalSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoSupport.java`
  - Builds the v145 receipt from the v144 post-echo decision gate receipt and proves all side-effect gates remain blocked.
- `ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverSignedHumanApprovalArtifactContractEchoReceiptBuilder.java`
  - Keeps the builder shape aligned with the response chain, verification hint, contribution catalog, and warning digest.

## Main Chain Changes

- `OpsEvidenceService`
  - Adds the v145 receipt version and schema v46.
  - Adds Node v314 profile, route, markdown route, and ready state constants.
  - Moves the top-level rehearsal response schema to `java-release-approval-rehearsal-response-schema.v46`.
- `ReleaseApprovalRehearsalManagedAuditReceiptChainBuilder`
  - Generates the v145 receipt after the v144 human approval post-echo decision gate receipt.
- `ReleaseApprovalRehearsalResponse` / `ReleaseApprovalRehearsalResponseBuilder`
  - Exposes the v145 receipt in the response and passes it into verification hint construction.
- `ReleaseApprovalVerificationHint*` / `ReleaseApprovalVerificationWarningDigest*`
  - Adds the v145 schema field, warning input, proof claims, Node verification actions, and boundary lines.

## Contract Evidence

- Node source: `Node v314`
- Source chain: `Node v312 + Node v313 catalog`
- Next Node verification: `Node v315`
- Parallel mini-kv echo: `mini-kv v138`
- Node profile: `managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-intake.v1`
- Node route: `/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-intake`
- Markdown route: `/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-contract-intake?format=markdown`
- Node state: `signed-human-approval-artifact-contract-intake-ready`
- Contract digest: `72498e59c086eadd4d44e80789120de195af1a0b70dd49346b837e2bc8ed4666`
- Echo mode: `java-v145-signed-human-approval-artifact-contract-echo-only`
- Required field count: `11`
- Prohibited field count: `8`
- Rejection reason count: `5`
- No-go boundary count: `8`
- Java v145 schema: `java-release-approval-rehearsal-response-schema.v46`

## Tests

- Added `OpsEvidenceServiceSignedHumanApprovalArtifactContractEchoTests`
  - Verifies Node v314 profile/route/state, contract digest, required/prohibited fields, rejection reasons, and no-go boundaries.
  - Verifies source Node v312/v313 evidence and v144 source receipt alignment.
  - Verifies Java v145 and mini-kv v138 are requested in parallel before Node v315.
  - Verifies runtime, credential, raw endpoint, signed artifact storage/validation/authority, external request, ledger, SQL/schema migration, deployment, rollback, and auto-start boundaries remain false.
- Updated verification hint contribution and warning digest line catalog tests for the new v145 contribution.
- Updated integration schema assertions so live and verification endpoints expect schema v46.

## Line Counts

- `OpsEvidenceService.java`: `1344` lines
- New split files:
  - records: `270` lines
  - catalog: `274` lines
  - support: `580` lines
  - builder: `58` lines
- New focused test: `198` lines

The v145 code stays split by responsibility. The support file is below the earlier 600-line warning zone, and the larger constant surface is held in a catalog instead of being repeated in the builder.

## Verification

```powershell
mvn -q "-Dtest=OpsEvidenceServiceSignedHumanApprovalArtifactContractEchoTests,ReleaseApprovalVerificationHintContributionCatalogTests,ReleaseApprovalVerificationWarningDigestLineCatalogTests,OpsEvidenceServiceReleaseApprovalRehearsalVerificationHintOverviewTests" test
mvn -q test
```

Result: passed. The log still includes Mockito dynamic-agent and Testcontainers Docker detection warnings, but they did not fail this run. Docker Desktop was not needed.
