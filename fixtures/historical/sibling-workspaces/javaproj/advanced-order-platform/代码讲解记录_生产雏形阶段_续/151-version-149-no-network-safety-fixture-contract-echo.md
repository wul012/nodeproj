# Java v149 no-network safety fixture contract echo

## Scope

Java v149 consumes the Node v323 no-network safety fixture contract intake from:

```text
D:\nodeproj\orderops-node\d\323\evidence\no-network-safety-fixture-contract-intake-v323.json
```

The Java side adds a read-only echo receipt for the managed audit sandbox endpoint credential resolver lane. It does not execute SQL, deployment, rollback, HTTP, TCP, provider startup, shell commands, ledger mutation, or credential resolution.

## Contract Echo

The v149 receipt mirrors the Node v323 contract profile:

```text
managed-audit-manual-sandbox-connection-credential-resolver-no-network-safety-fixture-contract-intake.v1
```

It records the required fixture fields, prohibited secret/network/runtime fields, denied transport classes, denial evidence, cleanup marker, timeout budget, audit digest, and no-go boundaries. The receipt is connected into the rehearsal response, verification hints, warning digest, and schema field catalog so Node v324 can verify it as part of the normal response surface.

## Split Shape

The new echo is kept out of `OpsEvidenceService.java` as a small file family:

```text
ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractCatalog.java: 302 lines
ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoRecords.java: 283 lines
ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoSupport.java: 556 lines
ReleaseApprovalSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractSections.java: 131 lines
ReleaseApprovalManagedAuditSandboxEndpointCredentialResolverNoNetworkSafetyFixtureContractEchoReceiptBuilder.java: 59 lines
OpsEvidenceService.java: 1428 lines
```

The support file is still under 600 lines and owns the digest/boundary assembly. The catalog and sections files hold the constant contract data, so the main service only gains version and Node profile wiring.

## Tests

Added:

```text
OpsEvidenceServiceNoNetworkSafetyFixtureContractEchoTests.java
```

Updated the schema v49 expectations and the verification hint/warning digest catalog coverage.

## Verification

```powershell
mvn -q -DskipTests compile
mvn -q -DskipTests test-compile
mvn -q "-Dtest=OpsEvidenceServiceNoNetworkSafetyFixtureContractEchoTests,OpsEvidenceServiceEndpointHandleAllowlistApprovalContractEchoTests,ReleaseApprovalVerificationHintContributionCatalogTests,ReleaseApprovalVerificationWarningDigestLineCatalogTests,OpsEvidenceServiceReleaseApprovalRehearsalVerificationHintOverviewTests" test
mvn -q test
```

Result: passed.
