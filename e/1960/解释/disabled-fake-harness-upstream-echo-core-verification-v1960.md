# Node v1960 - disabled fake harness upstream echo core verification

## Focus

Move echo verification assembly into core.

## What changed

`createEchoVerification` now lives in `managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerificationCore.ts`.

## Maintenance note

Core owns derived verification records, while policy owns gates.
