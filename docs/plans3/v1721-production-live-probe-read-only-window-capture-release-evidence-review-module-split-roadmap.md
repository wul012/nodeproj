# v1687-v1721 production live probe read-only window capture release evidence review module split roadmap

## Scope

This batch splits the production live probe real-read smoke read-only window capture release evidence review module into smaller type, builder, and Markdown renderer modules while preserving the stable entrypoint used by status live probe routes.

## Necessity proof

- Blocker resolved: productionLiveProbeRealReadSmokeReadOnlyWindowCaptureReleaseEvidenceReview.ts mixed profile contracts, Java/mini-kv field-guide references, endpoint constants, release semantics, check assembly, review-state resolution, digest generation, blocker/warning/recommendation messages, summary counts, loader orchestration, and Markdown rendering in one file.
- Later consumer: status live probe routes depend on the release review loader and renderer, so the public entrypoint must remain stable while internals become easier to maintain.
- Existing reports/routes cannot be reused because the release review route already exists; the issue is implementation ownership and preventing the read-only capture chain from accumulating another oversized file.
- Stop condition: after extracting release review types, builder helpers, and Markdown renderer, do not add another shallow evidence-only chain; the next feature direction should be a deeper vertical production-hardening slice.

## Cross-project parallel plan

- Java: recommended parallel. Node does not require fresh Java evidence for this module split and does not block Java work.
- mini-kv: recommended parallel. Node does not require fresh mini-kv evidence for this module split and does not block mini-kv work.
- Service startup: no sibling service startup is required. Node-only HTTP smoke may start a temporary server and must stop it before closeout.
- Ownership: Node owns v1687-v1721. Java and mini-kv do not need to approve or generate files first.

## Version map

| Version | Focus |
| --- | --- |
| v1687 | Extract the release evidence review profile, field-guide, and message contracts. |
| v1688 | Preserve stable entrypoint type re-exports for route consumers. |
| v1689 | Extract the release evidence review build-parts boundary. |
| v1690 | Move Java v51 field guide reference constants into the builder module. |
| v1691 | Move mini-kv v60 field guide reference constants into the builder module. |
| v1692 | Move release evidence review endpoint constants into the builder module. |
| v1693 | Keep release semantics selection inside the builder. |
| v1694 | Move release review digest generation into the builder. |
| v1695 | Move release evidence review check assembly into the builder. |
| v1696 | Keep ready-for-read-only-capture-release-evidence-review evaluation inside the builder. |
| v1697 | Move review-state resolution into the builder. |
| v1698 | Move field guide readiness validation into the builder. |
| v1699 | Keep non-pass-only field guide policy checks inside the builder. |
| v1700 | Keep skipped or mixed capture non-pass policy checks inside the builder. |
| v1701 | Keep upstream-actions and automatic-start safety checks inside the builder. |
| v1702 | Keep no-execution-authorization review check inside the builder. |
| v1703 | Move production blocker collection into the builder. |
| v1704 | Move warning generation into the builder. |
| v1705 | Move recommendation generation into the builder. |
| v1706 | Move release review summary count assembly into the builder. |
| v1707 | Extract release evidence review Markdown rendering into a dedicated renderer module. |
| v1708 | Keep stable Markdown renderer re-export from the release review entrypoint. |
| v1709 | Reduce the original release review loader to orchestration only. |
| v1710 | Add a direct renderer re-export regression test. |
| v1711 | Keep Java v51 and mini-kv v60 field guide behavior coverage after the split. |
| v1712 | Keep blocked release evidence review behavior covered after the split. |
| v1713 | Keep JSON and Markdown route coverage after the split. |
| v1714 | Validate the archive verification upstream consumer after the split. |
| v1715 | Validate status live probe route wiring after the split. |
| v1716 | Run typecheck and focused release evidence review tests. |
| v1717 | Run adjacent archive verification and release review tests plus build. |
| v1718 | Run HTTP smoke for release evidence review JSON and Markdown. |
| v1719 | Run segmented full Vitest verification. |
| v1720 | Clean generated validation outputs and prepare commits. |
| v1721 | Close with commits, tags, push, and GitHub Actions verification. |

## Verification plan

- 
pm run typecheck
- focused release evidence review tests
- adjacent archive verification and release review tests
- 
pm run build
- HTTP smoke for release evidence review JSON/Markdown
- segmented full Vitest run
- GitHub Actions after push
