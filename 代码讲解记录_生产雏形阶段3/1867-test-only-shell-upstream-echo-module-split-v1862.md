# Code walkthrough - Node v1862

## Focus

Review Java parallel status without consuming new Java evidence.

## Code reading notes

- managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification.ts is now a compatibility barrel for the loader and renderer exports.
- managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationConstants.ts owns route paths, sibling evidence paths, and request/response/failure/guard catalogs.
- managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationReferences.ts owns Node v264, Java v107, mini-kv v116, and Java v109 reference builders.
- managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationChecks.ts owns check construction, blockers, warnings, and recommendations.
- managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationCore.ts owns the public loader and digest/profile assembly.
- test/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification.test.ts now includes a split-export identity check in addition to behavior and route coverage.

## Maintenance rule

Keep new TestOnlyShell echo evidence parsing in References, readiness logic in Checks, and public orchestration in Core. The stable service entrypoint should stay thin.
