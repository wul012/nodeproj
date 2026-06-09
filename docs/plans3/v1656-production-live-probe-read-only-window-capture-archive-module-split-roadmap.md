# v1632-v1656 production live probe read-only window capture archive module split roadmap

## Scope

This batch splits the production live probe real-read smoke read-only window capture archive module into smaller type, builder, and Markdown renderer modules while preserving the stable entrypoint used by capture archive verification, release evidence review, and HTTP routes.

## Necessity proof

- Blocker resolved: productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchive.ts mixed profile contracts, upstream version references, endpoint constants, check assembly, archive-state resolution, digest generation, blocker/warning/recommendation messages, summary counts, loader orchestration, and Markdown rendering in one file.
- Later consumer: capture archive verification and release evidence review depend on the archive loader and profile type, so the public entrypoint must remain stable while internal responsibilities become smaller.
- Existing reports/routes cannot be reused because the capture archive route already exists; the issue is maintainability pressure and making the archive layer easier to reason about before the next verification split.
- Stop condition: after extracting capture archive types, builder helpers, and Markdown renderer, do not add another capture archive governance chain unless a new read-only runtime evidence contract adds new data.

## Cross-project parallel plan

- Java: recommended parallel. Node does not require fresh Java evidence for this module split and does not block Java work.
- mini-kv: recommended parallel. Node does not require fresh mini-kv evidence for this module split and does not block mini-kv work.
- Service startup: no sibling service startup is required. Node-only HTTP smoke may start a temporary server and must stop it before closeout.
- Ownership: Node owns v1632-v1656. Java and mini-kv do not need to approve or generate files first.

## Version map

| Version | Focus |
| --- | --- |
| v1632 | Extract the capture archive profile and upstream-reference type contracts. |
| v1633 | Preserve stable entrypoint type re-exports for archive verification consumers. |
| v1634 | Move Java v50 and mini-kv v59 archive reference constants into the builder module. |
| v1635 | Move capture archive evidence endpoint constants into the builder module. |
| v1636 | Extract the capture archive build-parts boundary. |
| v1637 | Keep archived-as-production-pass evidence evaluation inside the builder. |
| v1638 | Move capture archive check assembly into the builder. |
| v1639 | Keep ready-for-read-only-capture-archive evaluation inside the builder. |
| v1640 | Move archive-state resolution into the builder. |
| v1641 | Preserve capture archive digest generation over the same stable input shape. |
| v1642 | Move production blocker collection into the builder. |
| v1643 | Move warning generation into the builder. |
| v1644 | Move recommendation generation into the builder. |
| v1645 | Move archive summary count assembly into the builder. |
| v1646 | Extract capture archive Markdown rendering into a dedicated renderer module. |
| v1647 | Keep stable Markdown renderer re-export from the capture archive entrypoint. |
| v1648 | Reduce the original capture archive loader to orchestration only. |
| v1649 | Add a direct renderer re-export regression test. |
| v1650 | Keep skipped capture archive behavior covered after the split. |
| v1651 | Keep blocked archive behavior covered after the split. |
| v1652 | Keep JSON and Markdown route coverage after the split. |
| v1653 | Validate adjacent archive verification and release review consumers. |
| v1654 | Run typecheck, focused tests, adjacent chain tests, build, and HTTP smoke. |
| v1655 | Run segmented full tests and cleanup generated validation outputs. |
| v1656 | Close with commits, tags, push, and GitHub Actions verification. |

## Verification plan

- 
pm run typecheck
- focused capture archive tests
- adjacent read-only window tests for readiness packet, live capture, archive verification, and release review consumers
- 
pm run build
- HTTP smoke for capture archive JSON/Markdown
- segmented full Vitest run
- GitHub Actions after push
