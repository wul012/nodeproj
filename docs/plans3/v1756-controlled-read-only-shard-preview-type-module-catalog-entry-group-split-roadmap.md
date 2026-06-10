# v1722-v1756 controlled read-only shard preview type module catalog entry group split roadmap

## Scope

This batch splits the controlled read-only shard preview type module catalog data into small entry-group modules while preserving the stable catalog API and Markdown renderer behavior.

## Necessity proof

- Blocker resolved: managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.ts had grown beyond 2300 lines and mixed catalog contracts, stable entrypoint constants, 220 entry records, list/create/validate behavior, and archive-facing documentation semantics in one file.
- Later consumer: controlled shard preview routes, review artifact barrel tests, and archive explainers consume the catalog as a deterministic ownership map; they need the public API to stay stable while data ownership becomes maintainable.
- Existing reports/routes cannot be reused because the catalog is the ownership report; the issue is its internal size and growth boundary, not missing route coverage.
- Stop condition: after splitting the catalog into six entry-group modules plus types/constants/aggregate registry, future additions must land in the matching group or create a new group only when a new builder, renderer, route, or test lifecycle owns the boundary.

## Cross-project parallel plan

- Java: recommended parallel. Node does not require fresh Java evidence for this catalog split and does not block Java work.
- mini-kv: recommended parallel. Node does not require fresh mini-kv evidence for this catalog split and does not block mini-kv work.
- Service startup: no sibling service startup is required. This batch is Node-only and should not start Java or mini-kv.
- Ownership: Node owns v1722-v1756. Java and mini-kv can continue their own tracks from the existing contracts.

## Version map

| Version | Focus |
| --- | --- |
| v1722 | Extract type module catalog interfaces into a dedicated types module. |
| v1723 | Extract the public stable profile entrypoint constant. |
| v1724 | Move foundation and live read-only window entries into a focused group module. |
| v1725 | Move operator evidence supply entries into their own group module. |
| v1726 | Move signed approval capture draft entries into their own group module. |
| v1727 | Split text package preflight entries away from the long catalog chain. |
| v1728 | Split text package evidence entries into a second focused group module. |
| v1729 | Move candidate document and profile section entries into their own group module. |
| v1730 | Add the aggregate entry group registry for deterministic flattening. |
| v1731 | Keep the public type module catalog entrypoint as the stable API. |
| v1732 | Preserve defensive copy behavior for listed catalog entries. |
| v1733 | Preserve computed module counts and stable re-export counts. |
| v1734 | Preserve catalog validation checks after the entry split. |
| v1735 | Add regression coverage for contiguous split entry groups. |
| v1736 | Lock the entry group id order to the intended maintenance boundaries. |
| v1737 | Keep Markdown renderer output stable over the new aggregate entrypoint. |
| v1738 | Keep controlled read-only shard preview route tests passing through the split. |
| v1739 | Keep review artifact barrel tests passing through the split. |
| v1740 | Run typecheck and focused catalog tests for the new entry groups. |
| v1741 | Run adjacent catalog, route, and review artifact tests. |
| v1742 | Run build after the catalog entry split. |
| v1743 | Run segmented Vitest verification without one-version-per-CI churn. |
| v1744 | Confirm no fresh Java evidence is required for this Node-only split. |
| v1745 | Confirm no fresh mini-kv evidence is required for this Node-only split. |
| v1746 | Record the no-service-startup constraint for this maintainability batch. |
| v1747 | Document the six catalog entry groups as the new ownership boundary. |
| v1748 | Document the stop condition for future catalog growth. |
| v1749 | Keep the type catalog module below the giant-file threshold. |
| v1750 | Keep each new entry group within focused maintenance size. |
| v1751 | Archive the v1722-v1756 explanation files. |
| v1752 | Archive code walkthrough records for the batch. |
| v1753 | Clean generated validation outputs before commit. |
| v1754 | Commit the catalog entry group split. |
| v1755 | Tag and push v1722 through v1756. |
| v1756 | Close with GitHub Actions verification. |

## Verification plan

- npm run typecheck
- focused type module catalog test
- adjacent route and review artifact barrel tests
- npm run build
- segmented Vitest verification
- GitHub Actions after push
