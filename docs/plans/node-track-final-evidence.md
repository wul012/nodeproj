# Node production-excellence track final evidence

## Decision state

- Candidate version: `v2190`.
- Node milestones N0-N5: complete; N1 and N5 external reviews passed.
- E1-E10 implementation and local broad verification: complete.
- Remaining closeout action: none — v2190 committed, tagged, pushed; run green.
- External track-closeout decision: **PASS — Node Stage-1 track CLOSED (Claude,
  2026-07-11)**. Independently reproduced, not trusted: lint 0 errors / 261 warnings
  (≤263 N0 ceiling); security scan 6/6 signals digest-accepted, 0 env secrets,
  ready:true; archive census 7,017 files within budget; renderer census
  242/3/0 and source-size census 0-oversized re-run at N1/N5 reviews; v2190 tag
  exists locally and on the remote; v2190 run green.
- Integration capstone C1-C4: **LOCAL CANDIDATE PASS — external program-end review pending**.
  v2192 records a real Java jar read, fresh mini-kv CLI output, one real
  registry-listed aiproj receipt, three-layer no-write proof, no-promotion
  proof, and graceful process cleanup. All three upstream commits are pinned.
- Honest maturity label: **single-project validation + cross-project contract alignment**.

This document is the one-place acceptance input required by the final program.
It does not claim the cross-project program is complete and does not grant
production execution authority.

## E1-E10 gate table

| Gate | Implementation | Mechanical check | Evidence/result |
| --- | --- | --- | --- |
| E1 build and CI | Node 22 workflow with dependency install, typecheck, gates, coverage, build, safe smoke, and exact server cleanup | `.github/workflows/node-evidence.yml`; `npm run build` | local build/smoke green; v2189 run 29131852707 green; v2190 run required after push |
| E2 static analysis | ESLint flat config and a non-growing warning ceiling | `npm run lint` | 0 errors; maximum 261 warnings, below N0's 263 |
| E3 coverage | V8 all-source coverage with shrink-only floors | `npm run test:coverage` | v2190 closeout: 550 files / 1,674 tests at 95.92/87.59/98.64/95.88; v2192 re-verification: 557 files / 1,696 tests at 95.56/87.29/98.45/95.53; floors remain 94/86/97/94 |
| E4 security and configuration | repository secret/config scanner, fail-closed production template, threat model, exact synthetic-fixture waivers | `npm run security:scan`; `test/securityConfigScan.test.ts` | 18/18 safe-config checks; every accepted signal pinned by digest and count |
| E5 observability | UUID request IDs, response correlation header/body, structured audit timing, `/health`, and upstream metrics | `test/app.test.ts`, `test/auditLog.test.ts`, `test/upstreamMetrics.test.ts`; CI smoke | health and metrics remain read-only with probes/actions false |
| E6 error handling and lifecycle | typed upstream errors, HTTP abort timeout, TCP socket timeout, SIGINT/SIGTERM graceful Fastify close | focused client/app tests; `src/server.ts`; full suite | explicit timeout and shutdown paths are part of the tested runtime |
| E7 documentation honesty | README, START_HERE, boundaries, security, and final evidence share the same maturity statement | `test/productionExcellenceDocs.test.ts`; `test/nodeTrackFinalEvidence.test.ts` | local C1-C4 candidate is recorded while production execution and maturity promotion remain blocked pending review |
| E8 release discipline | git tags are canonical, package version policy remains explicit, changelog is mandatory | `CHANGELOG.md`; `test/productionExcellenceDocs.test.ts` | v2190 tag/push is the final local closeout action |
| E9 code health | renderer builder census, AST composition-only waiver validation, governance-growth ratchet, and 800-line source ceiling | `npm run renderer:census`; `npm run source:size:census`; focused ratchet tests | 245 total / 242 standardized / 3 waived / 0 non-waived; 1,234 source files / 0 oversized |
| E10 archive retention | versioned-root index, machine-readable limits, filesystem census, negative tests, CI gate | `npm run archive:retention:census`; `test/archiveRetentionCensus.test.ts` | final 7,017 files / 65,537,435 bytes; no violations or waivers |

## Complete waiver inventory

No waiver outside this section is accepted by the Node closeout.

### Renderer composition-only waivers: 3

The canonical manifest is
`docs/plans/renderer-consolidation-waivers.json`; the census parses each file's
TypeScript AST and rejects formatting ownership or a stale child-call list.

1. `controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyApprovalProfileSectionRenderer.ts`
2. `controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyProfileSectionRenderer.ts`
3. `controlledReadOnlyShardPreviewSignedApprovalArtifactDraftTextPackageProfileSectionRenderer.ts`

Each file only concatenates already-standardized child section arrays. Moving
it into the generic builder would add indirection without absorbing any
Markdown token, heading, row, spacing, or fallback rule.

### Security scan waivers: 5 entries, 6 matches

`docs/security-scan-waivers.json` pins five path/type/digest entries covering
six occurrences. They are synthetic credential-bearing URL inputs and their
redacted expected output in three tests and one frozen historical walkthrough.
The scanner rejects an unknown match, changed digest, excess count, missing
match, or stale entry; the manifest cannot waive a generic path or signal type.

### Zero-waiver gates

- Source size: 0 waivers and an empty remediation baseline.
- Archive retention: 0 waivers; every configured budget is hard.
- Coverage: 0 exclusions beyond the committed `src/**/*.ts` scope.
- Lint: 0 errors; the warning ceiling is a ratchet, not a waiver manifest.

## End-state census

| Census | Reproduction | Closeout state |
| --- | --- | --- |
| Renderers | `npm run renderer:census -- --json` | 245 total, 242 standardized, 3 AST waivers, 0 non-waived |
| Source size | `node scripts/source-size-census.mjs --json` | 1,234 files, threshold 800, 0 oversized, 0 remediation entries |
| Governance growth | focused `governanceGrowthRatchet.test.ts` | services <=1,125; routes <=80 |
| Security/config | `node scripts/security-config-scan.mjs --json` | 18/18 config checks, 6/6 exact synthetic matches accepted, 0 unwaived |
| Archive retention | `node scripts/archive-retention-census.mjs --json` | 7,017 files / 65,537,435 bytes; largest version `d/341` at 785,057 bytes; no violation |

## CI and reproducible commands

- N5 baseline: [Node Evidence 29131852707](https://github.com/wul012/nodeproj/actions/runs/29131852707), green in 14m05s at tag `v2189`.
- v2190 executable-gate run: added after the candidate push.
- v2190 tagged run: must be green before requesting external closeout review;
  its immutable URL is reported in the closeout response because a commit
  cannot contain the URL of the workflow run that its own push creates.

```powershell
npm run typecheck
npm run lint
npm run security:scan
npm run archive:retention:census
npm run renderer:census
npm run source:size:census
npm run test:coverage -- --maxWorkers=2
npm run build
```

The full suite requirement is not replaced by focused tests. Focused negative
tests prove that new gates fail; the local coverage run executed all 550 test
files and 1,674 tests with at most two workers in 2,225.2 seconds, covering all
source files. Safe HTTP and browser smoke run only against a controlled Node
process with probes/actions false, and that exact process is stopped afterward.

The controlled local smoke used PID 27912 on port 4190. Root and health
returned 200/ok, metrics reported zero Java and mini-kv requests, and the
release-evidence gate remained `executionAllowed=false`. Playwright at
1440x1000 found 118 buttons, one script, both upstream cards disabled, and no
horizontal overflow. The only console error was the existing missing
`favicon.ico`; the browser closed, PID 27912 stopped, and port 4190 was free.

## Remaining boundary

Passing E1-E10 means the Node repository has a mechanically enforced local
quality baseline. v2191 first proved C1-C3, but external review correctly found
that its former C4 name represented report aggregation rather than a fourth
project. v2192 corrects that gap without widening execution authority. Node
booted a jar built from Java commit `a7237a85`, consumed current health/evidence,
proved the unauthenticated replay POST was rejected, and executed a real
mini-kv CLI at workspace commit `12b08563` for fresh SMOKEJSON/CHECKJSON.

C4 then read aiproj commit `5d6c288b` by filesystem only. It selected
`publication_receipt_v1` from the committed schema registry, validated 9
required fields, 8 expected values and 4 type rules, pinned the registry and
artifact SHA-256 values, and confirmed `downstream_governance_lookup_only`
with promotion disabled. The v2 report aggregates genuine C1-C4 through
`npm run readiness:cross`; the archived result is under
`d/2192/evidence/cross-project-readiness/`.

The final v2192 local gate used eight sequential coverage shards with at most
two workers, then merged all blobs under the unchanged floors. All 557 test
files and 1,696 tests passed; statements/branches/functions/lines were
95.56/87.29/98.45/95.53. Typecheck, build, lint at 0 errors / 261 warnings,
security 18/18, renderer census, source-size census, and archive retention also
passed. No coverage or lint ratchet was loosened.

That local result is a review candidate, not a self-awarded program PASS.
README and boundary documents therefore retain the existing maturity label;
every production write, deployment, credential, rollback, and Stage 2 path
remains unauthorized until the external program-end review passes.

Java remains recommended parallel for extraction batches. Node used an
isolated detached worktree at a fixed commit and did not alter Java source or
its active worktree. mini-kv/aiproj received no source changes; mini-kv
participated only through execution of an existing CLI binary, while aiproj
participated only through two existing JSON file reads. No sibling repository
received a tag, commit, fixture rewrite, or process-lifecycle change from Node.
