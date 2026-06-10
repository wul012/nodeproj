# v1757-v1791 ops promotion archive release deployment renderer split roadmap

## Scope

This batch turns the oversized ops promotion release/deployment Markdown renderer file into four vertical renderer modules plus a stable barrel, while preserving all existing route and service import paths.

## Necessity proof

- Blocker resolved: opsPromotionArchiveReleaseDeploymentRenderers.ts exceeded 1100 lines and mixed release evidence, release archive, deployment approval/change, deployment execution/receipt, audit trail rendering, and all item helper functions in one file.
- Later consumer: ops promotion archive routes and archive bundle services rely on these Markdown renderers for JSON/Markdown route pairs; they need stable imports while renderer ownership becomes smaller and testable.
- Existing reports/routes cannot be reused because this is not a missing report problem; it is a renderer ownership and maintainability problem inside an already-covered route family.
- Stop condition: after release/archive, approval/change, execution/receipt, and audit trail renderers are separated, keep new promotion renderer logic inside its matching vertical module and keep the old file as a stable barrel only.

## Cross-project parallel plan

- Java: recommended parallel. Node does not require fresh Java evidence for this renderer split and does not block Java work.
- mini-kv: recommended parallel. Node does not require fresh mini-kv evidence for this renderer split and does not block mini-kv work.
- Service startup: no sibling service startup is required. Node route tests use in-process app injection; no Java or mini-kv process is needed.
- Ownership: Node owns v1757-v1791. Java and mini-kv can continue independently.

## Version map

| Version | Focus |
| --- | --- |
| v1757 | Define the renderer split boundary for promotion release, deployment, and audit Markdown. |
| v1758 | Extract the promotion release evidence Markdown renderer into the release/archive module. |
| v1759 | Extract the promotion release evidence verification renderer into the release/archive module. |
| v1760 | Extract the promotion release archive renderer into the release/archive module. |
| v1761 | Extract the promotion release archive verification renderer into the release/archive module. |
| v1762 | Move release evidence and release archive item helpers behind the release/archive renderer boundary. |
| v1763 | Extract the deployment approval renderer into the approval/change module. |
| v1764 | Extract the deployment approval verification renderer into the approval/change module. |
| v1765 | Extract the deployment change record renderer into the approval/change module. |
| v1766 | Extract the deployment change record verification renderer into the approval/change module. |
| v1767 | Move approval and change item helpers behind the approval/change renderer boundary. |
| v1768 | Extract the deployment execution record renderer into the execution/receipt module. |
| v1769 | Extract the deployment execution record verification renderer into the execution/receipt module. |
| v1770 | Extract the deployment execution receipt renderer into the execution/receipt module. |
| v1771 | Extract the deployment execution receipt verification renderer into the execution/receipt module. |
| v1772 | Move execution and receipt item helpers behind the execution/receipt renderer boundary. |
| v1773 | Extract the promotion release audit trail renderer into its own audit trail module. |
| v1774 | Reduce the old release/deployment renderer file to a stable barrel. |
| v1775 | Preserve downstream ops promotion aggregate renderer imports. |
| v1776 | Add a stable re-export identity regression test for all split renderer functions. |
| v1777 | Run focused renderer re-export tests. |
| v1778 | Run release archive JSON/Markdown route tests after the split. |
| v1779 | Run approval and change JSON/Markdown route tests after the split. |
| v1780 | Run execution and receipt JSON/Markdown route tests after the split. |
| v1781 | Run audit trail JSON/Markdown route tests after the split. |
| v1782 | Run archive bundle and boundary tests after the split. |
| v1783 | Run typecheck across the renderer split. |
| v1784 | Run build after the renderer split. |
| v1785 | Run segmented Vitest verification without per-version CI churn. |
| v1786 | Record that Java does not need fresh evidence for this Node renderer split. |
| v1787 | Record that mini-kv does not need fresh evidence for this Node renderer split. |
| v1788 | Record the no sibling service startup constraint for this maintainability batch. |
| v1789 | Archive v1757-v1791 explanations and code walkthroughs. |
| v1790 | Clean generated validation outputs, commit, tag, and push. |
| v1791 | Close with GitHub Actions verification. |

## Verification plan

- npm run typecheck
- focused renderer re-export test
- related ops promotion release/deployment/audit route tests
- npm run build
- segmented Vitest verification
- GitHub Actions after push
