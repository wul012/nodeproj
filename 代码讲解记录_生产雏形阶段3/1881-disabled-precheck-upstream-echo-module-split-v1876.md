# Code walkthrough - Node v1876

## Focus

Keep the legacy service entrypoint as a stable barrel and add identity coverage.

## Code reading notes

- managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification.ts is now a compatibility barrel for loader and renderer exports.
- managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationConstants.ts owns route paths, evidence paths, and comparison catalogs.
- managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationReferences.ts owns Node v262, Java v106, and mini-kv v115 reference builders.
- managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationChecks.ts owns readiness checks, blockers, warnings, and recommendations.
- managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerificationCore.ts owns digest and profile assembly.
- test/managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification.test.ts keeps behavior/route coverage and now checks split-export identity.

## Maintenance rule

Keep disabled-precheck evidence parsing in References, readiness logic in Checks, and orchestration in Core. The stable service entrypoint should stay thin.
