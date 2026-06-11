# v1968-v1982 blocked execution rehearsal split roadmap

## Scope

Split the oversized managed audit manual sandbox connection blocked execution rehearsal service into a stable loader entrypoint plus type, constants, references, core, policy, and renderer modules.

## Necessity proof

- Blocker resolved: `managedAuditManualSandboxConnectionBlockedExecutionRehearsal.ts` had grown to roughly 932 lines and mixed profile types, evidence paths, accepted mini-kv receipt variants, historical evidence readers, Java v90 and mini-kv v99 reference builders, simulated attempt construction, rehearsal digest assembly, checks, messages, summary counts, and Markdown rendering.
- Later consumer: `managedAuditManualSandboxConnectionPreconditionIntake.ts` consumes the public loader and profile type, so this split must keep the service import path stable.
- Existing reports/routes cannot be reused because this is a module ownership problem, not a missing governance report or a new runtime path.
- Stop condition: the public entrypoint owns only source loading and profile composition; future changes go to Types, Constants, References, Core, Policy, or Renderer.

## Cross-project parallel plan

- Java: recommended parallel. Node consumes frozen Java v90 context-normalization evidence only.
- mini-kv: recommended parallel. Node consumes frozen mini-kv v99 WAL regression evidence only.
- Service startup: none. Verification uses in-process service/route tests, downstream precondition intake tests, typecheck, build, and remote CI smoke.
- Ownership: Node owns v1968-v1982. Java and mini-kv do not need fresh work for this refactor.

## Version map

| Version | Focus |
| --- | --- |
| v1968 | Preserve the blocked execution rehearsal public entrypoint and split boundary. |
| v1969 | Extract profile, reference, evidence, attempt, check, message, and receipt types. |
| v1970 | Extract path, endpoint, digest, and accepted mini-kv reference constants. |
| v1971 | Extract historical evidence file and snippet collection. |
| v1972 | Extract Java v90 context-normalization reference projection. |
| v1973 | Extract mini-kv v99 WAL regression reference projection and JSON helpers. |
| v1974 | Extract Markdown rendering and render helpers. |
| v1975 | Extract blocked execution rehearsal digest assembly into core. |
| v1976 | Extract summary aggregation into core. |
| v1977 | Extract simulated blocked attempts and readiness checks into policy. |
| v1978 | Extract blocker, warning, and recommendation messages into policy. |
| v1979 | Verify focused blocked execution rehearsal behavior and route output. |
| v1980 | Verify downstream precondition intake consumption. |
| v1981 | Run TypeScript typecheck and build. |
| v1982 | Write archives, cleanup build output, commit, tag, push, and confirm CI. |

## Verification plan

- Focused tests: `managedAuditManualSandboxConnectionBlockedExecutionRehearsal.test.ts`.
- Downstream tests: `managedAuditManualSandboxConnectionPreconditionIntake.test.ts`.
- TypeScript project typecheck.
- Build after archives are written.
- Cleanup generated build output, commit, tag `v1968` through `v1982`, push, and inspect GitHub Actions.
