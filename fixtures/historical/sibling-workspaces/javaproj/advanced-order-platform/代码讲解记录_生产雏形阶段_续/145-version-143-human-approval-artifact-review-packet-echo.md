# 145-version-143-human-approval-artifact-review-packet-echo

## Goal

Java v143 follows the active Node plan from `D:\nodeproj\orderops-node\docs\plans2\v307-post-approval-prerequisite-artifact-upstream-echo-roadmap.md`.
It consumes the Node v308 human approval artifact review packet contract and adds a read-only Java echo receipt for Node v309 verification.

This version does not implement runtime shell behavior, read credential values, parse raw endpoint URLs, instantiate provider/client objects, send HTTP/TCP requests, write approval ledger data, run SQL/schema migration, or auto-start Node/mini-kv.

## Split Result

- `ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoRecords.java`
  - Holds the v143 receipt records: packet shape, required/prohibited fields, rejection reasons, missing-field checks, no-go boundaries, checks, and side-effect boundary.
- `ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketCatalog.java`
  - Centralizes 9 required fields, 9 prohibited fields, 13 rejection reasons, 9 missing-field checks, 12 no-go boundaries, upstream echo requests, proof claims, and Node verification actions.
- `ReleaseApprovalSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoSupport.java`
  - Builds the v143 receipt from the v142 approval prerequisite artifact intake echo receipt.
- `ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverHumanApprovalArtifactReviewPacketEchoReceiptBuilder.java`
  - Keeps the builder shape aligned with the neighboring echo builders used by the response chain, verification hint, and warning digest.

## Main Chain Changes

- `OpsEvidenceService`
  - Adds the v143 receipt version.
  - Adds Node v308 profile, route, markdown route, and ready state constants.
  - Moves the top-level rehearsal response schema to `java-release-approval-rehearsal-response-schema.v44`.
- `ReleaseApprovalRehearsalManagedAuditReceiptChainBuilder`
  - Generates the v143 receipt after the v142 artifact intake receipt.
- `ReleaseApprovalRehearsalResponse` / `ReleaseApprovalRehearsalResponseBuilder`
  - Exposes the v143 receipt in the response and passes it into verification hint construction.
- `ReleaseApprovalVerificationHint*` / `ReleaseApprovalVerificationWarningDigest*`
  - Adds the v143 schema field, warning input, proof claims, Node verification actions, and boundary lines.

## Contract Evidence

- Node source: `Node v308`
- Source verification: `Node v307`
- Next Node verification: `Node v309`
- Node profile: `managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-packet.v1`
- Node route: `/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-packet`
- Markdown route: `/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-human-approval-artifact-review-packet?format=markdown`
- Node state: `human-approval-artifact-review-packet-ready`
- Echo mode: `java-v143-human-approval-artifact-review-packet-echo-only`
- Required field count: `9`
- Prohibited field count: `9`
- Rejection reason count: `13`
- Missing-field check count: `9`
- No-go boundary count: `12`
- Java v143 schema: `java-release-approval-rehearsal-response-schema.v44`

## Tests

- Added `OpsEvidenceServiceHumanApprovalArtifactReviewPacketEchoTests`
  - Verifies Node v308 profile/route/state and Node v309 next verification.
  - Verifies the source Node v307 contract and the v143 review packet contract.
  - Verifies required/prohibited/rejection/missing/no-go lists and upstream echo requests.
  - Verifies runtime, credential, raw endpoint, provider/client, external request, write, migration, mini-kv, and auto-start boundaries remain false.
- Updated existing integration and overview tests so the top-level `verificationHint.responseSchemaVersion` expects v44.
- Kept the v143 focused test assertion that the source v142 receipt schema is v43.

## Line Counts

- `OpsEvidenceService.java`: `953` lines
- New split files:
  - records: `219` lines
  - catalog: `257` lines
  - support: `605` lines
  - builder: `48` lines
- New focused test: `304` lines

`support` is close to the next quality-optimization boundary. This version keeps v143 complete first; a later quality pass should template the shared source profile, check ids, boundary codes, required artifacts, and blocked side-effect fields across neighboring echo supports.

## Verification

```powershell
mvn -q test
```

Result: passed. The log still includes Mockito dynamic-agent and Testcontainers Docker detection warnings, but they did not fail this run.
