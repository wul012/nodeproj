# Node v2208 Sandbox Endpoint Echo Hotspot Repair

Date: 2026-07-20
Owner: Codex
State: local acceptance complete; commit/tag/push/CI pending

## Objective and stop condition

Repair the strongest remaining maintainability hotspot without changing the public
loader/renderer path, profile field order, digest inputs, JSON/Markdown bytes,
fixtures, route registration, or safety decisions. The version stops only when the
779-line target, 202-line mini-kv builder, and all four named complexity entries
disappear from the shrink-only baseline with no replacement debt or runtime cycle.

## Step-0 reconciliation and parallel projects

- Node is clean at pushed commit `cd1cac35`, tag `v2207`. Node Evidence run
  `29712753670` passed checkout, typecheck, zero-warning lint, security/config,
  archive, elegance, family, maintainability, full test, build, safe smoke, and
  owned-server cleanup.
- Java is clean and pushed at `07505752`, tag
  `v1872-order-platform-immutable-dto-boundary`. Java is recommended parallel;
  v2208 consumes no fresh Java evidence and is not its pre-approval blocker.
- mini-kv remains pushed at `44301a2e`, tag `v1667`, with only
  `治理计划/readme-exhibition-brief.md` modified. mini-kv is recommended parallel;
  Node neither reads that edit nor writes its repo.
- Existing Java v104 and mini-kv v113 historical evidence is read-only input. No
  live capstone, sibling process, write permission, or execution authority is used.

## Necessity proof

- Blocker: `managedAuditManualSandboxConnectionSandboxEndpointHandleUpstreamEchoVerification.ts`
  is 779 lines and owns six exact debts: one near-limit file, one 202-line function,
  and complexity 147/60/39/28 in mini-kv parsing, checks, Java parsing, and Node
  source assessment.
- Consumers: CodeGraph identifies the audit route plus the v260 decision record,
  credential-resolver upstream echo, and disabled-precheck chains. They require the
  same public module and byte-stable profile.
- Existing abstractions are reused: the historical resolver, the existing evidence
  constants/parser, types, renderer, report counters, and maintainability ratchet.
  No new service, route, report chain, schema, fixture, or authority is introduced.
- Growth stops after the six named baseline keys are stale. Unrelated large files,
  historical long names, and downstream feature behavior are outside this version.

## Requirement-evidence matrix

| Requirement | Implementation | Mechanical evidence | State |
|---|---|---|---|
| Freeze output before refactor | fixed-time forced-fallback JSON/Markdown byte and SHA-256 oracle | red then green target test | passed; 26606/27561 bytes and both hashes stable |
| Separate source data | move Node v258, Java v104, and grouped mini-kv v113 parsing to `sandboxEndpointEchoSources.ts` | typecheck + local/fallback parity | passed; source module 513 lines |
| Separate assessment | move ordered checks and messages to `sandboxEndpointEchoChecks.ts` | key-order digest oracle + downstream tests | passed; checks module 229 lines |
| Remove real complexity | split mini-kv metadata, review, and side-effect fields; use declarative conjunctions | maintainability scan | passed at 87/119/233/2 |
| Preserve hard ceilings | add modules only under `src/evidence`; services/routes remain 1125/80 | governance growth ratchet | passed |
| Tighten only | baseline must first report exactly six stale entries, zero unknown/grown entries | census before/after baseline edit | passed after one 122-line unknown was removed |
| Close safely | focused consumers, typecheck, lint, static gates, complete suite, build, docs, commit/tag/push/CI | commands + archive | local acceptance passed; remote closeout pending |

## New-file design note

- `sandboxEndpointEchoSources`: data only; ordered Node/Java/mini-kv evidence acquisition and parsing.
- `sandboxEndpointEchoChecks`: behavior only; ordered alignment checks, blockers, warnings, and recommendations.
- The public service remains the facade for loading, digesting, summarizing, and assembling route-visible output.
- Runtime imports flow service -> evidence; evidence imports service contracts as types only.

## Execution sequence

1. Add a portable forced-fallback JSON/Markdown oracle to the existing target test.
   Prove placeholder values fail, then freeze the untouched v2207 output.
2. Extract source assembly. Split mini-kv fields into metadata, review, and
   side-effect groups while preserving insertion order and fail-closed defaults.
3. Extract checks/messages with the original check-key order. Keep the final ready
   field in its original slot and recompute it from every preceding check.
4. Run target local/fallback tests and the three CodeGraph-identified consumers.
   Any byte/hash drift is repaired in implementation; expectations stay frozen.
5. Run maintainability before baseline refresh. It must show exactly one file, one
   long-function, and four complexity stale keys with no unknown/grown debt.
6. Write the Chinese explanation and >=3000-character walkthrough before final
   verification. Then run gates, suite, build, HTTP smoke if applicable, commit,
   tag, push, and inspect Node Evidence.

## Executed evidence before final batch

- Oracle red failed exactly one new test while the four existing tests passed;
  all four placeholder byte/hash assertions reported the untouched output values.
  The original and extracted implementations both pass 1 file / 5 tests at JSON
  26,606 bytes and Markdown 27,561 bytes with unchanged SHA-256 values.
- The first split correctly failed maintainability with the six expected stale
  keys plus one unknown 122-line `createMiniKvV113Reference`. Extracting the
  snippet catalog removed the new debt. The second pre-baseline run reported only
  the exact six stale keys and zero unknown/grown entries.
- After deleting only those six baseline objects, maintainability is ready at
  `87 / 119 / 233 / 2`. Module sizes are `134 / 513 / 229`; no file or helper
  crosses a current health threshold.
- The target, v260 decision record, credential-resolver echo, disabled precheck,
  maintainability adversarial test, and governance ratchet pass 6 files / 27 tests.
  Typecheck, zero-warning lint, security/config 18/18, elegance, all 52 tracked
  families, source-size zero, and renderer 242+3/0 also pass.
- Final documents pass 11 files / 42 tests. The walkthrough is 100% compliant at
  3,122 Chinese characters, 17 H2 sections, a 264-character largest section, and
  no repetition, oversize, placeholder, or execution-claim signals.
- The final source tree builds. A tracked process on port 31208 returned 200 for
  health (91 bytes), target JSON (27,922), and Markdown (27,561), then stopped
  with zero listeners. Archive retention passes at 7,099 files / 64.00 MiB.
- All 16 test shards pass at 567 files / 1,731 tests. An independent
  `vitest list --json` discovery pass confirms the same 567 / 1,731 inventory.
  Commit/tag/push and v2208 Node Evidence remain.

## Fail conditions

- Any changed profile key order, digest, JSON/Markdown byte, route, fixture, safety
  boolean, evidence mode, or downstream result fails the version.
- Any new/grown maintainability entry, service/route file, runtime import cycle,
  loosened baseline, or helper above the current thresholds fails the version.
- Editing an oracle, business expectation, or historical fixture to accommodate
  extraction drift is forbidden; restore the implementation instead.
- A screenshot is intentionally omitted unless an HTML/UI/renderable surface changes.
