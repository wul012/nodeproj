# Changelog

All notable Node project changes are tracked by git tags.

## Version Policy

- `package.json` remains `0.1.0` for now.
- Git tags such as `v2117` are the canonical project milestone identifiers.
- Every completed Node version must add a short changelog entry before commit.
- If a future packaging/release workflow starts publishing npm artifacts, this
  file must be updated with the new package-version policy before changing
  `package.json`.

## v2149 - 2026-06-17

- Renderer consolidation batch 31: migrated five signed approval capture /
  artifact draft controlled-read-only shard preview live-read-only-window
  renderers to the shared verification report builder: signed approval capture
  preflight, artifact preflight, artifact draft preflight, artifact draft
  readiness, and artifact draft review package preflight. Reused existing
  compact blocked-reason and trailing blank helpers; no new routes, services,
  schemas, or execution/approval behavior. Pre/post render hashes and lengths
  were identical for all five affected outputs. Builder-backed renderer count is
  now 142/245; remaining unmigrated renderers: 103 (h3 33, for 9, map 50,
  flatMap 44).

## v2148 - 2026-06-17

- Renderer consolidation batch 30: migrated five more controlled-read-only
  shard preview live-read-only-window renderers to the shared verification
  report builder: operator evidence fresh sibling intake, value supply envelope,
  approval packet draft, approval packet review, and signed approval template.
  Added shared helpers for h3 evidence-file detail lines and legacy trailing
  blank trimming so compact section spacing remains byte-identical. Pre/post
  render hashes and lengths were identical for all five affected outputs.
  Builder-backed renderer count is now 137/245; remaining unmigrated renderers:
  108 (h3 38, for 9, map 55, flatMap 49).

## v2147 - 2026-06-17

- Renderer consolidation batch 29: migrated five adjacent controlled-read-only
  shard preview live-read-only-window evidence intake renderers to the shared
  verification report builder: evidence intake ledger, evidence intake review
  package, manual evidence entry worksheet, operator evidence import preflight,
  and operator evidence value draft. Added
  `renderVerificationBlockedReasonLines` and reused it in the four compact
  v2146 renderers plus the five v2147 renderers, removing repeated local
  blocked-reason helpers while preserving bytes. Pre/post render hashes and
  lengths were identical for all nine affected outputs. Builder-backed renderer
  count is now 132/245; remaining unmigrated renderers: 113 (h3 43, for 9,
  map 60, flatMap 54).

## v2146 - 2026-06-17

- Renderer consolidation batch 28: extended `verificationReportBuilder` with
  optional compact section spacing (`bodyLeadingBlankLine=false`) and optional
  no-trailing-newline output while preserving the existing default canonical
  shape. Migrated five controlled-read-only-shard-preview h3/flatMap renderers
  to the builder: type module catalog, live read-only window stage ledger,
  runbook, command worksheet, and evidence packet. Pre/post render hashes and
  lengths were identical for all five outputs. Builder-backed renderer count is
  now 127/245; remaining unmigrated renderers: 118 (h3 48, for 9, map 65,
  flatMap 59). Also added the user-facing project explainability note under
  `project-explainability-notes/`.

## v2145 - 2026-06-16

- Documentation gate closeout repair: expanded the v2140-v2144 renderer
  consolidation walkthroughs to satisfy the enforced 3000-Chinese-character
  floor with real maintenance notes, corrected prior evidence summaries that
  still had `lint/build` marked pending, and added v2145 archive evidence.
  Recovered the code walkthrough documentation quality gate to 53/53 compliant
  enforced walkthroughs, 0 short walkthroughs, 0 blockers. No runtime code,
  routes, services, renderer migrations, tests, evidence schemas, or sibling
  project state changed.

## v2144 - 2026-06-14

- Renderer consolidation batch 27: migrated the minimal shard readiness live-read
  gate renderer (the last pure-standard-with-tests renderer) to the shared
  verification report builder. First migration to use the builder's `lines`
  section — its two live-read sections keep a file-local renderLiveRead helper
  (string[]) passed as `lines`. Async loader, driven by the existing 3-case test
  (ready path with fake clients, fail-closed when probes disabled, JSON+Markdown
  route injection against mock HTTP/TCP servers). Byte-identical confirmed by a
  before/after render diff (only the runtime timestamp line varied). No new
  helpers, routes, services, or tests. After this batch the pure-standard subset
  is genuinely empty (0 with tests, 0 testless); the remaining 108 unmigrated
  renderers all carry for-loops, h3 sub-sections, or map/flatMap.

## v2143 - 2026-06-14

- Renderer consolidation batch 26: migrated three standard-shape managed-audit
  sandbox-endpoint-handle / approval-required renderers (sandbox endpoint handle
  preflight review, sandbox endpoint handle upstream echo verification, and
  credential resolver approval-required implementation readiness upstream echo
  verification) to the shared verification report builder; one keeps a file-local
  omitEvidenceArrays helper passed as entries. Byte-identical confirmed by a
  before/after render diff (only the runtime timestamp line varied). No new
  helpers, routes, services, or tests.
- Correction to the v2142 note: the claim that the "pure-standard with tests"
  subset was empty rested on a flawed test-detection (it only matched test files
  importing the '...Renderer.ts' module; this repo's report tests import the
  barrel instead, so barrel-only-tested renderers were misclassified as testless).
  The shape buckets were correct; the with-tests split was not. These three (and
  the deferred async MinimalShardReadinessLiveReadGate) already had 262-367-line
  tests. Corrected census after this batch: of 109 unmigrated renderers, exactly
  one pure-standard-with-tests remains (the async live-read gate, due v2144) and
  zero are genuinely testless.

## v2142 - 2026-06-14

- Renderer consolidation batch 25: migrated the last three pure-standard-shape
  managed-audit sandbox-endpoint credential-resolver upstream-echo-verification
  renderers (upstream echo verification, disabled precheck upstream echo
  verification, and test-only shell upstream echo verification) to the shared
  verification report builder. Two carry inline-object entries sections,
  preserved verbatim. Byte-identical confirmed by a before/after render diff
  (only the runtime timestamp line varied); the existing tests assert via
  toContain. A shape census recorded in the evidence summary shows this empties
  the "pure-standard with tests" subset — the remaining 112 unmigrated renderers
  all carry for-loops, h3 sub-sections, or map/flatMap dynamic assembly. No new
  helpers, routes, or services.

## v2141 - 2026-06-14

- Renderer consolidation batch 24: migrated five more standard-shape managed-audit
  report renderers (precheck upstream receipt verification, Java/mini-kv declared
  operator lifecycle runtime live-read gate plan, Java/mini-kv runtime execution
  approval input template compatibility intake, test-only fake harness precheck,
  and fake transport adapter dry-run verification packet) to the shared
  verification report builder. Includes two dynamic titles and two inline-object
  entries sections. Byte-identical proven by existing tests; no new helpers,
  routes, or services.

## v2140 - 2026-06-14

- Renderer consolidation batch 23: migrated five pure-standard-shape
  managed-audit / fake-transport report renderers (minimal shard readiness
  regular gate, minimal read-only integration rerun decision, minimal read-only
  integration explicit read-window gate execution decision, fake transport
  packet upstream echo verification, and Java/mini-kv runtime execution
  canonical approval input precheck intake) to the shared verification report
  builder. Byte-identical output proven by the existing tests; no new helpers,
  routes, or services.

## v2139 - 2026-06-13

- Migrated deployment environment readiness, deployment safety, IdP verifier
  boundary, and idempotency vertical readiness review reports to the shared
  verification report builder while preserving prefixed evidence and nested h3
  artifact/state sections locally.

## v2138 - 2026-06-13

- Migrated access policy, CI evidence command, audit retention integrity, and
  auth enforcement rehearsal reports to the shared verification report builder
  while preserving source-less message rows and nested h3 sections locally.

## v2137 - 2026-06-13

- Migrated the audit store env config and runtime profile reports to the shared
  verification report builder while preserving source-less message rows and
  h3 store sections locally.

## v2136 - 2026-06-13

- Migrated the disabled adapter client precheck and disabled adapter client
  upstream echo verification reports to the shared verification report builder
  while keeping env-handle, failure-taxonomy, and upstream-echo rows local.

## v2135 - 2026-06-13

- Migrated the identity approval provenance dry-run packet and external adapter
  connection readiness review reports to the shared verification report builder
  while keeping external evidence/snippet rows local and leaving compact restore
  drill plan sections for a later builder-boundary decision.

## v2134 - 2026-06-13

- Migrated the managed-audit local adapter candidate and identity approval
  provenance packet verification reports to the shared verification report
  builder while preserving archive/snippet and source-packet projection details.

## v2133 - 2026-06-12

- Migrated 7 managed-audit credential-resolver pre-implementation,
  production-readiness, implementation-plan, and runtime-shell decision-record
  renderers to the shared verification report builder while preserving local
  plan boundary rows and Java / mini-kv evidence snippets.

## v2132 - 2026-06-12

- Migrated 6 runtime-shell candidate, post-decision, and chain-stop
  governance renderers to the shared verification report builder while
  preserving local decision-record and evidence snippet rows.

## v2131 - 2026-06-12

- Migrated 6 fake-shell, fake-harness, execution-denied, final-prerequisite,
  and human-approval artifact review renderers to the shared verification
  report builder while preserving local evidence and message row grammars.

## v2130 - 2026-06-12

- Migrated 6 endpoint-handle and signed-human approval prerequisite-chain
  renderers to the shared verification report builder while preserving local
  evidence and snippet rows.

## v2129 - 2026-06-12

- Migrated 6 managed-audit credential resolver prerequisite-chain renderers to
  the shared verification report builder while preserving local contract and
  closure detail renderers.

## v2128 - 2026-06-12

- Migrated 6 adjacent Java / mini-kv route catalog cleanup report renderers to
  the shared verification report builder while keeping operational line shapes
  local.

## v2127 - 2026-06-12

- Migrated 6 Java / mini-kv route catalog cleanup evidence report renderers to
  the shared verification report builder and added a tested evidence-file line
  helper.

## v2126 - 2026-06-12

- Migrated the 2 archive verification renderer tail shapes to the shared
  verification report builder, completing the builder-backed archive
  verification renderer subset.

## v2125 - 2026-06-12

- Migrated 3 shard readiness archive verification renderers to the shared
  verification report builder while preserving live-read observation local
  lines.

## v2124 - 2026-06-12

- Migrated 5 minimal read-only integration archive verification renderers to the
  shared verification report builder while preserving target-result local lines.

## v2123 - 2026-06-12

- Migrated 5 sandbox handle review archive verification renderers to the shared
  verification report builder and added a reusable archive-reference line helper.

## v2122 - 2026-06-12

- Migrated 7 Java / mini-kv operator lifecycle and runtime gate archive
  verification renderers to the shared verification report builder.

## v2121 - 2026-06-12

- Migrated 7 disabled runtime shell design draft archive verification renderers
  to the shared verification report builder while retaining their local archive
  reference helper.

## v2120 - 2026-06-12

- Migrated 10 no-helper archive verification renderers across Java / mini-kv
  cleanup and managed-audit credential resolver reports to the shared
  verification report builder.

## v2119 - 2026-06-12

- Migrated 10 Java / mini-kv route catalog cleanup archive verification
  renderers to the shared verification report builder with byte-identical
  output proof.

## v2118 - 2026-06-12

- Added `/api/v1/metrics` with per-upstream request, error, timeout, and
  latency percentile snapshots backed by a bounded in-memory ring buffer.
- Instrumented `OrderPlatformClient` and `MiniKvClient` at their lowest I/O
  methods, added request-id correlation on error responses, and covered the
  endpoint in CI safe smoke.

## v2117 - 2026-06-12

- Added production boundary documentation, changelog/version policy, and frozen
  fixture manifest for production-excellence N3.
- Added a docs regression test so CI checks the N3 maintenance documents.

## v2116 - 2026-06-12

- Added Vitest V8 coverage gate, `npm run test:coverage`, committed thresholds,
  and CI coverage execution.
- Updated CI evidence services so the current coverage test command is accepted
  consistently across workflow, command-profile, hardening-packet, and rehearsal
  guard evidence.

## v2115 - 2026-06-12

- Added ESLint flat config, zero-error warning baseline, unified Vitest timeout
  policy, and CI lint execution for production-excellence N0.

## v2114 - 2026-06-12

- Added the verification report builder foundation and first renderer migration
  batch.

## v2113 - 2026-06-12

- Added explanation readability closeout evidence.

## v2108 - 2026-06-12

- Archived readability maintenance evidence for v2104-v2108.

## v2103 - 2026-06-12

- Expanded per-version Chinese walkthroughs for the 3000-character documentation
  rule.

## v2057 - 2026-06-12

- Split disabled candidate upstream echo verification.

## v2056 - 2026-06-12

- Split disabled candidate upstream echo verification.

## v2055 - 2026-06-12

- Split disabled candidate upstream echo verification.
