# v1822-v1846 controlled read-only shard preview type barrel split roadmap

## Scope

This batch splits the oversized controlled read-only shard preview type aggregator into a stable barrel, a profile-only type module, an aggregate downstream type-export module, and named profile boundaries for reads, preview graph, and evidence endpoints while preserving the public import path.

## Necessity proof

- Blocker resolved: managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts had grown into an 821-line mixed type barrel containing profile structure plus dozens of downstream re-export groups.
- Later consumer: controlled read-only shard preview renderers, route coverage artifacts, handoff artifacts, and tests import from the stable type entrypoint, so the public path must remain compatible.
- Existing reports/routes cannot be reused because this is a maintainability boundary problem, not a missing governance report or runtime evidence problem.
- Stop condition: once the legacy file is reduced to a stable barrel and new profile/re-export responsibilities have clear homes, future preview type additions should land in the owning narrow module rather than in the barrel.

## Cross-project parallel plan

- Java: recommended parallel. Current Java workspace has untracked release-acceptance archive files owned outside this Node batch; Node does not require fresh Java evidence for this type split.
- mini-kv: recommended parallel. Current mini-kv workspace has active v1331-v1360 work and dirty files owned outside this Node batch; Node does not require fresh mini-kv evidence for this type split.
- Service startup: no sibling service startup is required. This is TypeScript type-surface maintenance plus in-process tests.
- Ownership: Node owns v1822-v1846. Java and mini-kv can continue independently.

## Version map

| Version | Focus |
| --- | --- |
| v1822 | Set the controlled read-only shard preview type-barrel split boundary. |
| v1823 | Move aggregate downstream type re-exports into a dedicated module. |
| v1824 | Move ControlledReadOnlyShardPreviewProfile into a profile-only module. |
| v1825 | Keep the legacy type entrypoint as a stable compatibility barrel. |
| v1826 | Add type-level regression coverage for the stable barrel. |
| v1827 | Extract reads as a named profile boundary. |
| v1828 | Extract the preview graph as a named profile boundary. |
| v1829 | Extract evidence endpoints as a named profile boundary. |
| v1830 | Expose the new narrow profile boundaries through the stable barrel. |
| v1831 | Run focused type-barrel split coverage. |
| v1832 | Run typecheck across profile imports and aggregate re-exports. |
| v1833 | Review Java parallel status without consuming new Java evidence. |
| v1834 | Review mini-kv parallel status without consuming new mini-kv evidence. |
| v1835 | Verify the split avoids growing another giant type aggregator. |
| v1836 | Run controlled read-only shard preview route and renderer related tests. |
| v1837 | Run build after the profile-boundary split. |
| v1838 | Run segmented Vitest coverage after the split. |
| v1839 | Archive the split explanation artifacts. |
| v1840 | Archive the code walkthrough artifacts. |
| v1841 | Clean generated validation outputs. |
| v1842 | Inspect diff size, line counts, and ownership boundaries. |
| v1843 | Commit the type-barrel and profile-boundary split batch. |
| v1844 | Tag v1822-v1846. |
| v1845 | Push master and tags, then poll CI. |
| v1846 | Close the batch with a clean workspace and CI result. |

## Verification plan

- npm run typecheck
- focused controlled read-only shard preview type barrel split test
- controlled read-only shard preview related tests
- npm run build
- segmented Vitest verification
- GitHub Actions after push
