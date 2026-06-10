# v1657-v1686 production live probe read-only window capture archive verification module split roadmap

## Scope

This batch splits the production live probe real-read smoke read-only window capture archive verification module into smaller type, builder, and Markdown renderer modules while preserving the stable entrypoint used by release evidence review and HTTP routes.

## Necessity proof

- Blocker resolved: productionLiveProbeRealReadSmokeReadOnlyWindowCaptureArchiveVerification.ts mixed profile contracts, endpoint constants, archive digest recomputation, verification digest generation, check assembly, verification-state resolution, blocker/warning/recommendation messages, summary counts, loader orchestration, and Markdown rendering in one file.
- Later consumer: capture release evidence review depends on the verification loader and profile type, so the public entrypoint must remain stable while internal responsibilities become smaller.
- Existing reports/routes cannot be reused because the verification route already exists; the issue is implementation ownership and line-budget pressure after the capture archive split.
- Stop condition: after extracting verification types, builder helpers, and Markdown renderer, do not add another verification governance chain unless a new read-only runtime evidence contract adds new data.

## Cross-project parallel plan

- Java: recommended parallel. Node does not require fresh Java evidence for this module split and does not block Java work.
- mini-kv: recommended parallel. Node does not require fresh mini-kv evidence for this module split and does not block mini-kv work.
- Service startup: no sibling service startup is required. Node-only HTTP smoke may start a temporary server and must stop it before closeout.
- Ownership: Node owns v1657-v1686. Java and mini-kv do not need to approve or generate files first.

## Version map

| Version | Focus |
| --- | --- |
| v1657 | Extract the capture archive verification profile and message contracts. |
| v1658 | Preserve stable entrypoint type re-exports for release review consumers. |
| v1659 | Extract the capture archive verification build-parts boundary. |
| v1660 | Move expected capture archive digest recomputation into the builder. |
| v1661 | Move verification digest generation into the builder. |
| v1662 | Reuse capture archive Java v50 and mini-kv v59 reference constants instead of duplicating tag strings. |
| v1663 | Move capture archive verification evidence endpoint constants into the builder module. |
| v1664 | Move capture archive verification check assembly into the builder. |
| v1665 | Keep ready-for-read-only-capture-archive-verification evaluation inside the builder. |
| v1666 | Move verification-state resolution into the builder. |
| v1667 | Keep archive digest match validation inside the builder. |
| v1668 | Keep archive profile version and archive readiness checks inside the builder. |
| v1669 | Keep upstream Java and mini-kv reference readiness checks inside the builder. |
| v1670 | Keep skipped or mixed capture non-pass policy checks inside the builder. |
| v1671 | Keep upstream-actions and automatic-start safety checks inside the builder. |
| v1672 | Move production blocker collection into the builder. |
| v1673 | Move warning generation into the builder. |
| v1674 | Move recommendation generation into the builder. |
| v1675 | Move verification summary count assembly into the builder. |
| v1676 | Extract capture archive verification Markdown rendering into a dedicated renderer module. |
| v1677 | Keep stable Markdown renderer re-export from the verification entrypoint. |
| v1678 | Reduce the original capture archive verification loader to orchestration only. |
| v1679 | Add a direct renderer re-export regression test. |
| v1680 | Keep skipped capture archive verification behavior covered after the split. |
| v1681 | Keep blocked capture archive verification behavior covered after the split. |
| v1682 | Keep JSON and Markdown route coverage after the split. |
| v1683 | Validate the release evidence review consumer after the split. |
| v1684 | Run typecheck, focused tests, adjacent chain tests, and build. |
| v1685 | Run HTTP smoke, segmented full tests, and cleanup generated validation outputs. |
| v1686 | Close with commits, tags, push, and GitHub Actions verification. |

## Verification plan

- 
pm run typecheck
- focused capture archive verification tests
- adjacent capture archive and release evidence review tests
- 
pm run build
- HTTP smoke for capture archive verification JSON/Markdown
- segmented full Vitest run
- GitHub Actions after push
