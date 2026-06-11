# v1938-v1952 deployment evidence intake gate split roadmap

## Scope

Split the oversized deployment evidence intake gate into a stable loader/renderer entrypoint plus dedicated type, evidence, and policy modules while preserving the public service import path.

## Necessity proof

- Blocker resolved: `deploymentEvidenceIntakeGate.ts` had grown to roughly 951 lines and mixed public profile shapes, Java v60 evidence, mini-kv v69 evidence, endpoint catalogs, readiness checks, intake steps, forbidden operations, blocker messages, warnings, recommendations, loading, summary projection, digesting, and Markdown rendering.
- Later consumer: deployment evidence verification, release-window readiness packet, and status routes all depend on this entrypoint, so the split must preserve public exports while shrinking the implementation surface.
- Existing reports/routes cannot be reused because this is a module ownership and maintainability problem, not a missing runtime report or a new governance echo.
- Stop condition: the entrypoint owns only composition, summary projection, digesting, and rendering; future changes go to `Types`, `Evidence`, or `Policy` instead of growing the entrypoint again.

## Cross-project parallel plan

- Java: recommended parallel. Node consumes frozen Java v60 production deployment runbook contract evidence only.
- mini-kv: recommended parallel. Node consumes frozen mini-kv v69 release artifact digest package evidence only.
- Service startup: none. Verification uses in-process service/route tests, TypeScript typecheck, build, and remote CI smoke.
- Ownership: Node owns v1938-v1952. Java and mini-kv do not need to wait on this refactor.

## Version map

| Version | Focus |
| --- | --- |
| v1938 | Set the deployment evidence intake gate split boundary and preserve the public service entrypoint. |
| v1939 | Extract intake gate state, source, message, step, forbidden operation, sibling evidence, and profile types. |
| v1940 | Extract the Java v60 production deployment runbook contract evidence. |
| v1941 | Extract the mini-kv v69 release artifact digest package evidence. |
| v1942 | Move intake endpoint ownership beside the frozen evidence catalog. |
| v1943 | Extract dry-run intake step construction into policy. |
| v1944 | Extract forbidden operation construction into policy. |
| v1945 | Extract readiness checks into policy. |
| v1946 | Extract blocker message collection into policy. |
| v1947 | Extract warnings and recommendations into policy. |
| v1948 | Keep loader, summary projection, digesting, and Markdown rendering in the stable entrypoint. |
| v1949 | Run focused deployment evidence intake gate route/profile tests. |
| v1950 | Run downstream deployment evidence verification and release-window readiness packet tests. |
| v1951 | Run TypeScript typecheck and build. |
| v1952 | Write archives, cleanup build output, commit, tag, push, and confirm CI. |

## Verification plan

- Focused adjacent tests: `deploymentEvidenceIntakeGate.test.ts`, `deploymentEvidenceVerification.test.ts`, and `releaseWindowReadinessPacket.test.ts`.
- TypeScript project typecheck.
- Build after archive docs are written.
- Cleanup generated build output.
- Commit and tag `v1938` through `v1952`, push, then inspect GitHub Actions.
