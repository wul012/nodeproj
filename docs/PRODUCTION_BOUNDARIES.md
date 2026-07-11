# Production Boundaries

This document is the current production boundary record for `orderops-node`.
The project is production-leaning as an evidence and control-plane prototype, but
it is not authorized for production execution.

## Current Classification

- Runtime classification: read-only evidence/control-plane rehearsal.
- Maturity label: single-project validation + verified read-only cross-project integration (env-gated, single machine, no execution authority).
- Node track status: N0-N5 complete; v2190 E1-E10 external closeout PASS.
- Integration capstone: C1-C4 external program-end review PASS after an
  independent live rerun of the v2192 Java, mini-kv, and aiproj inputs.
- Program status: Node, mini-kv, and aiproj Stage-1 tracks are closed; Java
  Stage-1 remains open, so Stage 2 and whole-program closeout remain blocked.
- Production execution: not authorized.
- Upstream service startup: not authorized by default.
- Java / mini-kv write authority: not delegated through Node.
- aiproj process execution and promotion authority: not delegated through Node.
- Managed audit authority: not production-ready.
- Canonical version identifier: git tags such as `v2117`; `package.json`
  remains `0.1.0` until a packaging/release workflow is created.

## Local Production-Excellence Gates

These gates protect the Node repository itself. They do not grant runtime
execution authority. The corrected v2192 capstone adds one env-gated, local,
four-project read-only interoperability proof without changing production
authority.

| Gate | Mechanical check | Closeout floor or result |
| --- | --- | --- |
| Static analysis | `npm run lint` | 0 errors; at most 261 warnings |
| Coverage | `npm run test:coverage` | statements 94%, branches 86%, functions 97%, lines 94% |
| Security/config | `npm run security:scan` | no unwaived credential signal; 18 safe-config checks |
| Archive retention | `npm run archive:retention:census` | aggregate, count, version, walkthrough, and bounded-root budgets |
| Renderer consolidation | `npm run renderer:census` | 242 standardized, 3 AST-validated composition-only waivers, 0 non-waived |
| Source size | `npm run source:size:census` | no `src/` file over 800 lines; no waivers |

The security scan's accepted matches are synthetic redaction fixtures pinned
by path, type, digest, and count in `docs/security-scan-waivers.json`; they are
not production secrets. Archive ownership and limits are documented in
`docs/archive-retention-index.md`.

## Capstone Regression Surface

The live C1-C4 capstone is a required, explicit regression window rather than a
default-CI job. Its single canonical command is:

```powershell
INTEGRATION_LIVE=1 npm run readiness:cross
```

Run it when the Java track reaches final closeout and before accepting a change
to `src/integration/**`, the `readiness:cross` command, the aggregate report
schema, an upstream probe contract, or the selected aiproj artifact schema. The
run must use explicit `JAVA_CAPSTONE_JAR`, `JAVA_CAPSTONE_COMMIT`,
`MINIKV_CLI_PATH`, `MINIKV_CAPSTONE_COMMIT`, `AIPROJ_ROOT`, and
`AIPROJ_CAPSTONE_COMMIT` inputs.

A green regression requires schema v2, C1-C4 pass, all three upstream commits
pinned, `read_only=true`, `execution_allowed=false`, every owned process stopped,
and the Java port released. The accepted v2192 baseline is archived under
`d/2192/evidence/cross-project-readiness/`. Default CI intentionally does not
run this command because it has neither authority nor stable local paths for
sibling runtimes; documentation tests enforce both the command's registration
and that default-CI exclusion.

## Default-Off Runtime Gates

| Boundary | Current state | Evidence |
| --- | --- | --- |
| Upstream probes | Default false | `src/config.ts` reads `UPSTREAM_PROBES_ENABLED` with default `false`. |
| Upstream actions | Default false | `src/config.ts` reads `UPSTREAM_ACTIONS_ENABLED` with default `false`. |
| Access guard enforcement | Default false | `src/config.ts` reads `ACCESS_GUARD_ENFORCEMENT_ENABLED` with default `false`. |
| Auth token secret | Empty by default | `src/config.ts` reads `ORDEROPS_AUTH_TOKEN_SECRET` with default `""`. |
| Audit store | Memory by default | `src/config.ts` reads `AUDIT_STORE_KIND` with default `"memory"`. |
| Audit store URL | Empty by default | `src/config.ts` reads `AUDIT_STORE_URL` with default `""`. |

These defaults mean a local or CI run can verify reports and smoke endpoints
without granting production authority. Any run that changes these values must be
treated as a separate, reviewed integration window.

## Evidence Gates That Still Block Execution

| Gate | What it proves | Execution boundary |
| --- | --- | --- |
| Release evidence readiness gate | Scenario fixture evidence can be archived. | `executionAllowed: false` in `src/services/upstreamContractFixtureScenarioReleaseEvidenceReadinessGate.ts`. |
| CI evidence command profile | CI commands are read-only and safe by default. | `executionAllowed: false` in `src/services/ciEvidenceCommandProfile.ts`. |
| Workflow evidence verification | The checked-in workflow avoids deployment/secrets/upstream actions. | `executionAllowed: false` in `src/services/workflowEvidenceVerification.ts`. |
| Deployment safety profile | Deployment-like checks remain blocked until a future reviewed workflow exists. | `executionAllowed: false` in `src/services/deploymentSafetyProfile.ts`. |
| Rollback evidence runbook | Rollback evidence is documented without authorizing rollback execution. | `executionAllowed: false` in `src/services/rollbackEvidenceRunbook.ts`. |
| Audit store runtime profile | Audit store runtime is a rehearsal surface, not production audit storage. | `readyForProductionAudit: false` and `executionAllowed: false` in `src/services/auditStoreRuntimeProfile.ts`. |
| Production readiness summary index | Aggregates the gates above. | `readyForProductionOperations: false` and `executionAllowed: false` in `src/services/productionReadinessSummaryIndex.ts`. |

## Not Production Yet

The following are intentionally not production-ready:

- Real Java or mini-kv actions through Node.
- Any endpoint that requires `UPSTREAM_ACTIONS_ENABLED=true`.
- Automatic startup of Java or mini-kv outside the explicitly env-gated local capstone.
- Any aiproj process execution, training, network request, artifact rewrite, or
  promotion action through the capstone.
- Real managed-audit adapter connection.
- Secret provider runtime and credential value loading.
- Raw managed-audit endpoint URL parsing or rendering.
- Production audit writes, schema migrations, restore/compact execution, and
  rollback execution.
- GitHub workflow access to production secrets.
- Deployment, Docker push, kubectl, scp, or artifact upload to production
  infrastructure.
- Treating frozen sibling fixtures as live upstream state.
- Treating the authorized read-only integration label as production readiness,
  or entering Stage 2 before Java's final track review PASS.

## Requirements Before Real Production Execution

Before any real production execution is allowed, a later plan must add and verify
all of the following:

1. A reviewed production identity and role model, including trusted token
   issuer/audience/JWKS handling.
2. A production secret boundary that never exposes raw credential values in
   Node reports, logs, fixtures, or Markdown.
3. A real managed-audit adapter implementation with an explicit disabled-by-
   default switch, operator approval artifact, rollback rule, and audit ledger
   handoff.
4. A production audit store configuration, retention owner, recovery owner, and
   replay/restore policy.
5. A live-read or execution workflow that records owner, window, target, digest,
   rollback path, and cleanup evidence before any action.
6. Java and mini-kv owner approval for any real startup, probe, or write
   interaction.
7. CI evidence proving no deployment/secrets/upstream-action command runs unless
   the workflow is explicitly the approved execution workflow.

## Stop Conditions

Stop and open a new reviewed plan if any change:

- sets `UPSTREAM_ACTIONS_ENABLED=true`;
- makes an evidence gate report `executionAllowed=true`;
- reads or writes a credential value instead of a handle;
- parses or renders a raw managed-audit endpoint URL;
- starts Java or mini-kv automatically;
- changes frozen files under `fixtures/historical/sibling-workspaces/`;
- renames load-bearing archive folders consumed by Node evidence services;
- introduces production secret, deployment, rollback, schema migration, or
  restore execution paths.

## Cross-Project Parallel Status

Java and mini-kv can continue in parallel with Node documentation, lint,
coverage, fixture-manifest, and boundary-document work. Node becomes a blocker
only when a later plan requires fresh Java or mini-kv evidence, or when a live
integration window is explicitly approved with startup/port/owner/cleanup
requirements.
