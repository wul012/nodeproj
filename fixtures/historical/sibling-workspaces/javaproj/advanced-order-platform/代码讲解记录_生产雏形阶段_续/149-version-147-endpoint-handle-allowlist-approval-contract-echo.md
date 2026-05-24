# Java v147 endpoint handle allowlist approval contract echo

## Scope

This version consumes the Node v320 endpoint-handle allowlist approval contract intake and adds a read-only Java echo receipt for Node v321 verification.

The new receipt is split across small support files:

- `ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoRecords.java`: response records.
- `ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractCatalog.java`: required fields, prohibited fields, warnings, proof claims, and Node verification actions.
- `ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractSections.java`: source Node v319, contract, transition, and necessity proof sections.
- `ReleaseApprovalSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoSupport.java`: receipt assembly, digest inputs, warning digest lines, and no-write proof.
- `ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverEndpointHandleAllowlistApprovalContractEchoReceiptBuilder.java`: small builder facade used by the receipt chain and verification hint.

## Behavior

The v147 receipt proves Java echoed these Node v320 boundaries without turning the contract into runtime behavior:

- Required fields: `endpoint_handle`, approval correlation, operator/reviewer handles, policy version, approval status, issue/expiry timestamps, revocation marker, and audit digest.
- Prohibited fields: credential values, raw endpoint URLs, provider/client config, runtime bindings, external payloads, ledger mutations, and schema migration SQL.
- No-go boundaries: credential value reads, raw endpoint URL parsing, provider/client instantiation, external requests, ledger/schema writes, runtime shell implementation/invocation, and automatic upstream start.

## Wiring

`ReleaseApprovalRehearsalManagedAuditReceiptChainBuilder` now builds the v147 endpoint-handle allowlist contract echo after the v146 credential-handle approval contract echo.

`ReleaseApprovalRehearsalResponse`, `ReleaseApprovalVerificationHintBuilder`, `ReleaseApprovalVerificationHintContributionCatalog`, and `ReleaseApprovalVerificationWarningDigestLineCatalog` include the v147 receipt so the response schema advances to:

```text
java-release-approval-rehearsal-response-schema.v48
```

## Verification

```powershell
mvn -q -DskipTests compile
mvn -q -DskipTests test-compile
mvn -q "-Dtest=OpsEvidenceServiceEndpointHandleAllowlistApprovalContractEchoTests,OpsEvidenceServiceCredentialHandleApprovalContractEchoTests,ReleaseApprovalVerificationHintContributionCatalogTests,ReleaseApprovalVerificationWarningDigestLineCatalogTests,OpsEvidenceServiceReleaseApprovalRehearsalVerificationHintOverviewTests" test
mvn -q test
```

Result: passed. Full test output included Testcontainers Docker detection warnings, but the test run completed successfully without starting Docker Desktop.

## Line Count

```text
OpsEvidenceService.java: 1400
EndpointHandleAllowlistApprovalContractEchoSupport.java: 525
EndpointHandleAllowlistApprovalContractEchoRecords.java: 280
EndpointHandleAllowlistApprovalContractCatalog.java: 282
EndpointHandleAllowlistApprovalContractSections.java: 125
OpsEvidenceServiceEndpointHandleAllowlistApprovalContractEchoTests.java: 206
```
