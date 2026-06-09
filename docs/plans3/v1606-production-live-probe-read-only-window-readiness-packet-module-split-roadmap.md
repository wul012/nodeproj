# v1582-v1606 production live probe read-only window readiness packet module split roadmap

## Scope

This batch splits the production live probe real-read smoke read-only window readiness packet into smaller, stable modules without changing route behavior or enabling runtime execution.

## Necessity proof

- Blocker resolved: `productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket.ts` mixed exported profile types, packet construction, safety checks, message collection, digest generation, and Markdown rendering in one 526-line file.
- Later consumer: live capture and capture archive work can consume a stable readiness packet entrypoint while builder and renderer responsibilities remain independently reviewable.
- Existing reports/routes cannot be reused because the route already owns this readiness packet; the problem is maintainability of its implementation, not missing evidence.
- Stop condition: after extracting types, builder helpers, and Markdown renderer, do not add another readiness packet chain unless a new runtime capture contract requires new data.

## Cross-project parallel plan

- Java: recommended parallel. Node does not need fresh Java evidence for this refactor and does not block Java from continuing its own read-only self-description or live-read preparation.
- mini-kv: recommended parallel. Node does not need fresh mini-kv evidence for this refactor and does not block mini-kv from continuing its own read-only session work.
- Service startup: none required for the code split itself. Route smoke may use Node only during final verification and must be stopped afterward.
- Ownership: Node owns this batch. Java and mini-kv do not need to approve or generate files before Node can finish v1582-v1606.

## Version map

| Version | Focus |
| --- | --- |
| v1582 | Extract readiness packet profile and nested evidence/message types into a dedicated type module. |
| v1583 | Keep the historical readiness packet entrypoint as the stable import surface through type re-exports. |
| v1584 | Extract the packet build-parts boundary so the loader no longer owns check/message orchestration. |
| v1585 | Move evidence-chain construction into the builder module. |
| v1586 | Move operator window requirement construction into the builder module. |
| v1587 | Move manual review step construction into the builder module. |
| v1588 | Move readiness checks into the builder module and keep check counts stable. |
| v1589 | Isolate packet-state determination after all non-state checks are evaluated. |
| v1590 | Move blocker collection and safety message generation into the builder module. |
| v1591 | Move warning and recommendation generation into the builder module. |
| v1592 | Keep readiness packet digest generation in the builder with the same digest input shape. |
| v1593 | Move summary count assembly into the builder result. |
| v1594 | Promote evidence endpoint constants into the builder module and copy them into the profile. |
| v1595 | Extract Markdown rendering into a dedicated renderer module. |
| v1596 | Keep evidence-chain Markdown formatting private to the renderer module. |
| v1597 | Keep operator-requirement Markdown formatting private to the renderer module. |
| v1598 | Keep review-step Markdown formatting private to the renderer module. |
| v1599 | Preserve route Markdown behavior by re-exporting the renderer from the stable entrypoint. |
| v1600 | Use type-only imports to prevent runtime cycles between loader, types, builder, and renderer. |
| v1601 | Reduce the original readiness packet entrypoint to orchestration only. |
| v1602 | Add a direct re-export regression test for the split renderer. |
| v1603 | Keep existing loader and route focused tests as the behavioral guard. |
| v1604 | Run typecheck and focused readiness packet tests after the split. |
| v1605 | Confirm this batch requires no fresh sibling evidence and starts no sibling services. |
| v1606 | Close the batch with build, full tests, HTTP smoke, archive, tags, push, and CI. |

## Verification plan

- `npm run typecheck`
- focused readiness packet tests
- adjacent read-only window/live probe tests when changed imports could affect them
- `npm run build`
- split full Vitest into manageable chunks
- HTTP smoke for the readiness packet Markdown route when the build is available
- GitHub Actions after push
