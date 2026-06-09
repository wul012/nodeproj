# v1607-v1631 production live probe read-only window live capture module split roadmap

## Scope

This batch splits the production live probe real-read smoke read-only window live capture module into smaller type, builder, and Markdown renderer modules while preserving the stable entrypoint used by capture archive and routes.

## Necessity proof

- Blocker resolved: `productionLiveProbeRealReadSmokeReadOnlyWindowLiveCapture.ts` mixed profile types, live capture construction, captured-record conversion, checks, state resolution, blocker/warning/recommendation messages, digest generation, endpoint constants, and Markdown rendering in one file.
- Later consumer: capture archive and capture archive verification depend on the live capture profile type and loader, so the stable entrypoint must remain intact while internals become easier to maintain.
- Existing reports/routes cannot be reused because the live capture route already exists; the issue is implementation ownership and line-budget pressure.
- Stop condition: after extracting live capture types, builder helpers, and Markdown renderer, do not add another live capture governance chain unless a new read-only runtime evidence contract requires new data.

## Cross-project parallel plan

- Java: recommended parallel. Node does not require fresh Java evidence for this module split and does not block Java work.
- mini-kv: recommended parallel. Node does not require fresh mini-kv evidence for this module split and does not block mini-kv work.
- Service startup: none required for the split. Node-only HTTP smoke may start a temporary server and must stop it before closeout.
- Ownership: Node owns v1607-v1631. Java and mini-kv do not need to approve or generate files first.

## Version map

| Version | Focus |
| --- | --- |
| v1607 | Extract the live capture profile and captured-record type contracts. |
| v1608 | Preserve stable entrypoint type re-exports for capture archive consumers. |
| v1609 | Extract the live capture build-parts boundary. |
| v1610 | Move captured-record conversion into the builder module. |
| v1611 | Move readiness packet and smoke harness check assembly into the builder module. |
| v1612 | Keep ready-for-live-capture state evaluation inside the builder. |
| v1613 | Keep production-pass-candidate evaluation gated by open probe windows. |
| v1614 | Move capture-state resolution into the builder. |
| v1615 | Move production blocker collection into the builder. |
| v1616 | Move warning generation into the builder. |
| v1617 | Move recommendation generation into the builder. |
| v1618 | Keep digest generation over the same stable live capture input shape. |
| v1619 | Move record-count summary assembly into the builder. |
| v1620 | Promote live capture evidence endpoint constants into the builder module. |
| v1621 | Extract live capture Markdown rendering into a dedicated renderer module. |
| v1622 | Keep captured-record Markdown formatting private to the renderer. |
| v1623 | Preserve route Markdown compatibility through stable entrypoint re-export. |
| v1624 | Use type-only imports for split profile and record contracts. |
| v1625 | Reduce the original live capture entrypoint to orchestration only. |
| v1626 | Add a direct renderer re-export regression test. |
| v1627 | Keep existing live capture focused tests as behavioral coverage. |
| v1628 | Run typecheck and focused live capture tests after the split. |
| v1629 | Run adjacent read-only window chain tests. |
| v1630 | Confirm no fresh sibling evidence and no sibling services are required. |
| v1631 | Close with build, HTTP smoke, segmented full tests, archive, tags, push, and CI. |

## Verification plan

- `npm run typecheck`
- focused live capture tests
- adjacent read-only window tests for readiness packet and capture archive consumers
- `npm run build`
- HTTP smoke for live capture JSON/Markdown
- segmented full Vitest run
- GitHub Actions after push
