# v1879-v1903 sandbox endpoint credential resolver upstream echo module split roadmap

## Scope

Split managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverUpstreamEchoVerification into a thin barrel plus constants, references, checks, and core modules while keeping the public import path and renderer export stable.

## Necessity proof

- Blocker resolved: the upstream echo verification service had grown into a single large file that mixed route strings, evidence paths, reference builders, readiness checks, blocker messaging, digest assembly, and public loader orchestration.
- Later consumer: the disabled-precheck upstream echo chain and the audit route table import through the stable service entrypoint, so compatibility must remain intact.
- Existing reports/routes cannot be reused because this is an internal maintainability split, not a new runtime route or evidence chain.
- Stop condition: once the public barrel is thin and each concern has a dedicated home, later Node versions should extend those modules instead of growing the barrel again.

## Cross-project parallel plan

- Java: recommended parallel. The current Java repo is already ahead at v1579, and Node consumes frozen Java v105 evidence only. No fresh Java build is required for this batch.
- mini-kv: recommended parallel. The current mini-kv repo is already ahead at v1417, and Node consumes frozen mini-kv v114 evidence only. No fresh mini-kv build is required for this batch.
- Service startup: none. Node tests use in-process app injection plus historical fallback fixtures.
- Ownership: Node owns v1879-v1903. Sibling projects can continue independently.

## Version map

| Version | Focus |
| --- | --- |
| v1879 | Set the split boundary and keep the legacy service entrypoint as a stable barrel. |
| v1880 | Extract route paths, evidence paths, and comparison catalogs into constants. |
| v1881 | Move the Node v260 source reference builder into a dedicated references module. |
| v1882 | Move the Java v105 reference builder into the dedicated references module. |
| v1883 | Move the mini-kv v114 non-participation reference builder into the dedicated references module. |
| v1884 | Keep ordered comparisons and historical evidence helpers isolated from the loader path. |
| v1885 | Extract the readiness checks into their own module. |
| v1886 | Extract blocker, warning, and recommendation builders from the orchestration path. |
| v1887 | Move digest and profile assembly into a thin core loader. |
| v1888 | Add split-export identity coverage to preserve the public contract. |
| v1889 | Verify the focused upstream echo test and forced fallback path. |
| v1890 | Verify the adjacent disabled-precheck regression slice stays aligned. |
| v1891 | Run typecheck and confirm the refactor still compiles cleanly. |
| v1892 | Run the build and confirm the generated output still matches the source. |
| v1893 | Run the full Vitest suite with bounded workers. |
| v1894 | Check diff hygiene and line-count sanity after the split. |
| v1895 | Prepare the archive and documentation scaffolding for the batch. |
| v1896 | Write the batch roadmap with cross-project parallel guidance. |
| v1897 | Write per-version explanation entries for the batch. |
| v1898 | Write the code walkthrough records for the batch. |
| v1899 | Clean temporary build and test outputs before commit. |
| v1900 | Review git status and stage the intended source and archive files. |
| v1901 | Record the batch commit for the split and verification work. |
| v1902 | Create the version tags for the batch closeout. |
| v1903 | Push the batch and confirm CI after the tags land. |

## Verification completed so far

- typecheck
- focused upstream echo verification test
- forced historical fallback run
- adjacent disabled-precheck regression slice
- build
- full Vitest suite with maxWorkers=6

## Remaining closeout

- clean dist and any other intermediate outputs
- commit the source split and archive files
- tag v1879 through v1903
- push and confirm CI
