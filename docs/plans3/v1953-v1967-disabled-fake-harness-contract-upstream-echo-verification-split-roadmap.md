# v1953-v1967 disabled fake harness contract upstream echo verification split roadmap

## Scope

Split the oversized disabled fake harness contract upstream echo verification service into a stable loader entrypoint plus constants, references, policy, and core modules.

## Necessity proof

- Blocker resolved: `managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification.ts` had grown to roughly 950 lines and mixed route constants, evidence paths, contract shape arrays, Node v288 projection, Java v122-v126 evidence scanning, mini-kv v127 receipt parsing, echo verification assembly, readiness checks, summary aggregation, blocker messages, warnings, and recommendations.
- Later consumer: the disabled fake harness execution-denied route preflight consumes the public loader, so the import path and profile shape must remain stable while internal ownership is reduced.
- Existing reports/routes cannot be reused because this is a service maintainability split, not a new governance report or runtime capability.
- Stop condition: the public entrypoint stays focused on loading and profile composition; future changes belong in `Constants`, `References`, `Policy`, or `Core`.

## Cross-project parallel plan

- Java: recommended parallel. Node consumes frozen Java v122-v126 evidence only.
- mini-kv: recommended parallel. Node consumes frozen mini-kv v127 non-participation receipt evidence only.
- Service startup: none. Verification uses in-process tests, forced historical fixture fallback, typecheck, build, and remote CI smoke.
- Ownership: Node owns v1953-v1967. Sibling projects do not need fresh work for this refactor.

## Version map

| Version | Focus |
| --- | --- |
| v1953 | Preserve the disabled fake harness contract upstream echo public entrypoint and split boundary. |
| v1954 | Extract route, plan, sibling evidence path, and contract shape constants. |
| v1955 | Extract Node v288 disabled fake harness contract source projection. |
| v1956 | Extract Java v122-v126 evidence reference construction. |
| v1957 | Extract mini-kv v127 non-participation receipt parsing. |
| v1958 | Extract Java and mini-kv expected snippet builders. |
| v1959 | Extract evidence parsing helpers into the references module. |
| v1960 | Extract echo verification assembly into core. |
| v1961 | Extract summary aggregation into core. |
| v1962 | Extract readiness checks into policy. |
| v1963 | Extract blocker message collection into policy. |
| v1964 | Extract warnings and recommendations into policy. |
| v1965 | Run focused upstream echo verification and execution-denied route preflight tests. |
| v1966 | Run TypeScript typecheck and build. |
| v1967 | Write archives, cleanup build output, commit, tag, push, and confirm CI. |

## Verification plan

- Focused tests: `managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessContractUpstreamEchoVerification.test.ts` and `managedAuditManualSandboxConnectionCredentialResolverDisabledFakeHarnessExecutionDeniedRoutePreflight.test.ts`.
- Forced historical fixture fallback is covered by the focused upstream echo verification test.
- TypeScript project typecheck.
- Build after archives are written.
- Cleanup generated build output, commit, tag `v1953` through `v1967`, push, and inspect GitHub Actions.
