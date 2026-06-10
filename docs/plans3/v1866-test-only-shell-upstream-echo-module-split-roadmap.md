# v1847-v1866 test-only shell upstream echo module split roadmap

## Scope

This batch splits the oversized test-only credential resolver shell upstream echo verification service into a stable barrel, constants, reference builders, checks/messages, and core loader modules while preserving the public import path and renderer export.

## Necessity proof

- Blocker resolved: managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification.ts had grown past 1000 lines and mixed constants, sibling evidence parsing, Node/Java/mini-kv reference builders, check construction, blockers, warnings, recommendations, digesting, and the public loader.
- Later consumer: the audit route table, fake-shell archive verification, and TestOnlyShell upstream echo tests import through the stable service entrypoint, so the import path must stay compatible.
- Existing reports/routes cannot be reused because this is an internal ownership and maintainability boundary, not a new runtime gate or missing evidence route.
- Stop condition: after constants, references, checks/messages, and core loader have clear homes, future TestOnlyShell echo changes should land in the matching module and keep the public service file as a thin barrel.

## Cross-project parallel plan

- Java: recommended parallel. Java is already ahead at v1547 and Node does not require fresh Java evidence for this split; Node consumes historical Java v107/v109 evidence only.
- mini-kv: recommended parallel. mini-kv is already ahead at v1385 and Node does not require fresh mini-kv evidence for this split; Node consumes historical mini-kv v116 evidence only.
- Service startup: no Java or mini-kv service startup is required. Node tests use in-process app injection and historical fallback fixtures.
- Ownership: Node owns v1847-v1866. Sibling projects can continue independently.

## Version map

| Version | Focus |
| --- | --- |
| v1847 | Set the test-only shell upstream echo split boundary. |
| v1848 | Extract stable constants, routes, evidence paths, and shape field catalogs. |
| v1849 | Extract the source Node v264 reference builder. |
| v1850 | Extract the Java v107 echo marker reference builder. |
| v1851 | Extract the mini-kv v116 non-participation receipt builder. |
| v1852 | Extract the Java v109 optimization-context reference builder. |
| v1853 | Extract shared reference helpers for null filtering and array equality. |
| v1854 | Extract check construction into a dedicated checks module. |
| v1855 | Extract production blocker collection into the checks module. |
| v1856 | Extract warnings and recommendations into the checks module. |
| v1857 | Move the profile loader into a core module. |
| v1858 | Keep the legacy service file as a stable compatibility barrel. |
| v1859 | Add split-export identity regression coverage. |
| v1860 | Run focused TestOnlyShell upstream echo behavior and route coverage. |
| v1861 | Run typecheck across the split modules. |
| v1862 | Review Java parallel status without consuming new Java evidence. |
| v1863 | Review mini-kv parallel status without consuming new mini-kv evidence. |
| v1864 | Run related credential-resolver upstream echo verification tests. |
| v1865 | Run build and full regression before closeout. |
| v1866 | Clean validation outputs, commit, tag, push, and confirm CI. |

## Verification plan

- npm run typecheck
- focused TestOnlyShell upstream echo verification test
- related credential resolver upstream echo verification tests
- npm run build
- full npm test with bounded workers
- GitHub Actions after push
