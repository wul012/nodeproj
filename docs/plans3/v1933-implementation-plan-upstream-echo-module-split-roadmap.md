# v1904-v1933 implementation plan upstream echo module split roadmap

## Scope

Split managedAuditManualSandboxConnectionCredentialResolverImplementationPlanUpstreamEchoVerification into a stable barrel, constants, references, checks/messages, and core/profile assembly modules while preserving the public import path and renderer export.

## Necessity proof

- Blocker resolved: the implementation-plan upstream echo service had grown to roughly 980 lines and mixed route strings, evidence paths, Node v283 fallback snapshots, Java v121 references, mini-kv v126 receipt parsing, readiness checks, messages, summary calculation, digesting, and public loader orchestration.
- Later consumer: the test-only fake harness precheck and audit route tests consume this stable entrypoint, so compatibility must be preserved.
- Existing reports/routes cannot be reused because this is an internal module-ownership problem, not a missing route or new governance chain.
- Stop condition: public barrel, constants, references, checks/messages, and core/profile assembly each have one home; future versions should extend those modules instead of growing the barrel.

## Cross-project parallel plan

- Java: recommended parallel. Java is currently at v1604 and Node consumes frozen Java v121 evidence only. No fresh Java work is required.
- mini-kv: recommended parallel. mini-kv is currently at v1442 and Node consumes frozen mini-kv v126 evidence only. No fresh mini-kv work is required.
- Service startup: no Java or mini-kv startup is required. Node tests use in-process route injection and historical fallback fixtures.
- Ownership: Node owns v1904-v1933. Sibling projects can continue independently.

## Version map

| Version | Focus |
| --- | --- |
| v1904 | Set the implementation-plan upstream echo split boundary and stable barrel. |
| v1905 | Extract route paths, evidence paths, and comparison catalogs into constants. |
| v1906 | Move the Node v283 implementation-plan draft reference builder into References. |
| v1907 | Move the Java v121 implementation-plan echo reference builder into References. |
| v1908 | Move the mini-kv v126 non-participation reference builder into References. |
| v1909 | Keep the mini-kv v126 Node v283 snapshot reader isolated with the evidence builders. |
| v1910 | Move Java and mini-kv expected snippet builders beside their reference builders. |
| v1911 | Move ordered comparisons, object id extraction, booleans, and digest helpers out of the loader. |
| v1912 | Move echo verification assembly into Core. |
| v1913 | Extract readiness checks into Checks. |
| v1914 | Keep side-effect boundary checks grouped and reviewable. |
| v1915 | Extract production blocker messages into Checks. |
| v1916 | Extract warnings and recommendations into Checks. |
| v1917 | Move summary assembly into Core. |
| v1918 | Keep the loader orchestration thin and readable. |
| v1919 | Add split-export identity coverage for the stable entrypoint. |
| v1920 | Run focused implementation-plan upstream echo verification. |
| v1921 | Run forced historical fallback verification. |
| v1922 | Run adjacent implementation-plan and fake-harness regression coverage. |
| v1923 | Run typecheck after the split. |
| v1924 | Run build after the split. |
| v1925 | Run full Vitest regression with bounded workers. |
| v1926 | Review line counts and diff hygiene. |
| v1927 | Write the cross-project roadmap for v1904-v1933. |
| v1928 | Write per-version explanation archive entries. |
| v1929 | Write per-version code walkthrough entries. |
| v1930 | Clean build and temporary outputs before commit. |
| v1931 | Inspect git status and stage the intended files. |
| v1932 | Commit the batch and tag v1904-v1933. |
| v1933 | Push the batch and confirm CI. |

## Verification plan

- typecheck
- focused implementation-plan upstream echo verification test
- forced historical fallback verification
- adjacent implementation-plan and fake-harness regression tests
- build
- full Vitest with maxWorkers=6
- cleanup, commit, tag, push, and CI
