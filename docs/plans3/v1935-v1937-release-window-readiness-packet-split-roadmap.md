# v1935-v1937 release window readiness packet split roadmap

## Scope

Split the oversized release window readiness packet service into a stable loader/renderer entrypoint plus dedicated type, evidence, and policy modules.

## Necessity proof

- Blocker resolved: `releaseWindowReadinessPacket.ts` had grown to roughly 958 lines and mixed profile types, frozen Java/mini-kv evidence, readiness checks, release-window steps, forbidden operations, messages, loading, summary projection, digesting, and Markdown rendering.
- Later consumer: production release dry-run envelope and status routes consume the packet entrypoint, so the public import path must stay stable while internal ownership becomes easier to review.
- Existing reports/routes cannot be reused because this is a module-boundary and maintainability problem, not a missing production report or new governance chain.
- Stop condition: the public service file is a loader/renderer barrel-sized module; future packet work should extend `Types`, `Evidence`, or `Policy` rather than re-growing the entrypoint.

## Cross-project parallel plan

- Java: recommended parallel. Node consumes frozen Java v61 rollback approval fixture evidence only.
- mini-kv: recommended parallel. Node consumes frozen mini-kv v70 restore drill evidence only.
- Service startup: none. Verification uses in-process service tests and TypeScript checks.
- Ownership: Node owns v1935-v1937. Sibling projects are not blocked by this refactor.

## Version map

| Version | Focus |
| --- | --- |
| v1935 | Extract release-window packet profile, step, message, forbidden-operation, Java fixture, and mini-kv evidence types into `releaseWindowReadinessPacketTypes.ts`. |
| v1936 | Extract frozen Java v61 and mini-kv v70 evidence plus packet endpoints into `releaseWindowReadinessPacketEvidence.ts`. |
| v1937 | Extract readiness checks, release-window steps, forbidden operations, blockers, warnings, and recommendations into `releaseWindowReadinessPacketPolicy.ts`, then verify the stable entrypoint. |

## Verification plan

- Focused route/profile tests: `releaseWindowReadinessPacket.test.ts` and `productionReleaseDryRunEnvelope.test.ts`.
- TypeScript project typecheck.
- Build after archive docs are written.
- Cleanup, commit, tag `v1935` through `v1937`, push, and inspect CI status.
