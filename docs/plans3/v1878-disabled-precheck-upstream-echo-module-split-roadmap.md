# v1867-v1878 disabled precheck upstream echo module split roadmap

## Scope

This batch splits the oversized disabled credential resolver precheck upstream echo verification service into a stable barrel, constants, reference builders, checks/messages, and core loader modules while preserving the public import path and renderer export.

## Necessity proof

- Blocker resolved: managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverDisabledPrecheckUpstreamEchoVerification.ts had grown past 1000 lines and mixed routes, evidence paths, sibling evidence parsing, reference builders, check logic, blockers, warnings, recommendations, digesting, and the public loader.
- Later consumer: the audit route table, TestOnlyShell contract, and disabled-precheck upstream echo tests import through the stable service entrypoint, so compatibility must be preserved.
- Existing reports/routes cannot be reused because this is an internal module ownership problem, not a missing runtime route or new evidence chain.
- Stop condition: constants, references, checks/messages, and core loader have clear homes, and future disabled-precheck echo work should land in those modules instead of growing the service barrel.

## Cross-project parallel plan

- Java: recommended parallel. Java is already ahead at v1567 and Node consumes frozen Java v106 evidence only.
- mini-kv: recommended parallel. mini-kv is already ahead at v1405 and Node consumes frozen mini-kv v115 evidence only.
- Service startup: no Java or mini-kv startup is required. Node tests use in-process app injection and historical fallback fixtures.
- Ownership: Node owns v1867-v1878. Sibling projects can continue independently.

## Version map

| Version | Focus |
| --- | --- |
| v1867 | Set the disabled-precheck upstream echo split boundary. |
| v1868 | Extract constants, routes, evidence paths, and comparison catalogs. |
| v1869 | Extract Node v262 disabled-precheck reference builder. |
| v1870 | Extract Java v106 disabled-precheck echo reference builder. |
| v1871 | Extract mini-kv v115 non-participation reference builder. |
| v1872 | Extract shared reference helpers for null filtering and ordered comparisons. |
| v1873 | Extract disabled-precheck readiness checks. |
| v1874 | Extract blockers, warnings, and recommendations. |
| v1875 | Move profile assembly into a core loader module. |
| v1876 | Keep the legacy service entrypoint as a stable barrel and add identity coverage. |
| v1877 | Run focused and related credential-resolver verification coverage. |
| v1878 | Run build/full regression, clean outputs, commit, tag, push, and confirm CI. |

## Verification plan

- npm run typecheck
- focused disabled-precheck upstream echo verification test
- related credential resolver verification tests
- npm run build
- full npm test with bounded workers
- GitHub Actions after push
