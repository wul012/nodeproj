# Node v2210 Historical Evidence Canonical Size Repair

Date: 2026-07-20
Owner: Codex
State: all local implementation and verification complete; commit/tag/push and
remote closeout remain

## Objective and stop condition

Make `HistoricalEvidenceFile.sizeBytes` describe the same normalized UTF-8 text
whose SHA-256 is already reported by `evidenceFile`, so LF, CRLF, mixed endings,
and a UTF-8 BOM produce one cross-platform metadata pair. The version stops only
when a direct adversarial test proves parity, the v2207-v2209 byte oracles pass on
canonical values, all affected consumers pass, and Node Evidence is green.

## Step-0 reconciliation and parallel projects

- Node is clean, committed, tagged, and pushed at `1c92b051`, tag `v2209`.
  Node Evidence run `29731349784` passed every gate through maintainability, then
  failed only the v2209 JSON/Markdown SHA assertions. Both byte-length assertions
  passed. Replacing two local raw sizes (`55853 -> 55243`, `1284 -> 1283`) with
  Git blob sizes reproduces the CI hashes exactly: JSON `f52e...5293`, Markdown
  `f250...0e6`. The v2209 tag is immutable and will not be rewritten.
- Java is pushed at `2bad2a5e`, tag
  `v1875-order-platform-dossier-renderer-engine`, with an independent v1876
  release-acceptance renderer-engine worktree in progress. Java is recommended parallel;
  Node does not read, build, test, or modify that worktree.
- mini-kv is pushed at `65c90f6f`, tag `v1673`, with independent v1674 product
  source-manifest work in progress. mini-kv is recommended parallel; Node does
  not read, build, test, or modify that worktree.
- v2210 changes only Node's interpretation of committed historical text metadata.
  It needs no fresh sibling version, live capstone, write permission, or execution authority.

## Necessity proof

- Blocker: `evidenceFile` normalizes CRLF/CR and strips UTF-8 BOM before hashing,
  but reports raw filesystem `stat.size`. The digest and size therefore describe
  different byte streams and make otherwise byte-stable reports checkout-dependent.
- Consumer: every historical evidence report using `evidenceFile` consumes this
  metadata; v2209 is the first byte oracle whose fixture set exposes both variants.
- Existing abstraction: the repair belongs in `historicalEvidenceReportUtils`,
  where normalization already occurs. No resolver, fixture, renderer, route, or
  per-report workaround is needed.
- Growth stops after one shared helper contract and direct LF/CRLF/BOM tests. No
  new report chain or platform-specific expected hash is added.

## Requirement-evidence matrix

| Requirement | Implementation | Mechanical evidence | State |
|---|---|---|---|
| Prove the defect | create LF, CRLF, mixed-ending, BOM, and missing temporary evidence inputs | direct utility test red on raw size mismatch | passed; 2 failed / 1 passed before implementation |
| Align metadata semantics | compute `sizeBytes` from normalized UTF-8 content used by digest | direct utility test green | passed; utility/resolver 2 files / 6 tests |
| Preserve evidence meaning | paths, existence, snippet matching, JSON parsing, and missing-file defaults unchanged | focused utility/resolver tests | passed |
| Repair byte surfaces | recompute only values changed by canonical metadata; never accept OS-specific alternatives | v2207-v2209 oracles + blob simulation | passed; canonical JSON/Markdown hashes reproduced |
| Preserve structure | maintainability/elegance/family/service/route ceilings unchanged | static gates | passed at 86/116/232/2 and 1125/80 |
| Close safely | affected consumers, typecheck, lint, full suite/list, build, docs, guarded smoke, commit/tag/push/CI | commands + archive | partial; all local gates pass, release/remote CI pending |

## New-test design note

`historicalEvidenceReportUtils.test.ts` is a contract test, not a new production
family. It creates isolated temporary files and compares semantic outputs:

1. LF and CRLF forms of the same text must have identical size and digest;
2. UTF-8 BOM plus mixed line endings must reduce to the same canonical bytes;
3. a missing file must retain `exists=false`, `sizeBytes=0`, and `digest=null`.

The test owns and deletes its temporary directory. It never edits committed fixtures.

## Execution sequence

1. Add the direct test against the untouched utility and record the exact red result.
2. Compute canonical UTF-8 bytes once inside `evidenceFile`; derive both size and
   digest from that buffer. Do not alter snippets, resolver mappings, or fixtures.
3. Run utility/resolver tests and v2207-v2209 byte oracles. Recompute expected
   hashes only after the direct semantic test is green and record why each changed.
4. Search every changed byte oracle and hard-coded historical size assertion;
   repair implementation or documented canonical expectations, never add OS branches.
5. Write Chinese explanation and a natural >=3000-character walkthrough before
   final verification, then run static gates, split complete suite/list, build,
   guarded HTTP smoke, commit, tag, push, and final Node Evidence.

## Executed evidence before final batch

- Git blob comparison found exactly two v2209 evidence files whose raw checkout
  sizes differ while normalized content is equal. Injecting blob sizes reproduces
  CI hashes `f52e...5293` / `f250...0e6`; canonical UTF-8 sizes produce the sole
  accepted hashes `fe18...fade` / `6f29...a1c8` at unchanged byte lengths.
- The untouched utility failed exactly two new semantic tests: CRLF reported 13
  instead of 11 bytes, and BOM/mixed endings reported 23 instead of 19; the
  missing-file case passed. Deriving size from normalized content makes all three green.
- Utility/resolver tests pass 2 files / 6 tests. Combined utility, resolver, and
  v2207-v2209 oracle coverage passes 5 / 21; v2207 and v2208 hashes are unchanged.
  All 13 tests that directly inspect size/archive/parity behavior pass 48 cases.
- CodeGraph depth 3 reports 223 affected symbols; 67 source files directly call
  `evidenceFile`. Typecheck, zero-warning lint, security/config, elegance, all 52
  tracked families, maintainability, renderer, source-size, and service/route gates pass.
- Final documents pass 14 files / 49 tests. The walkthrough scores 100 at 3,120
  Chinese characters, 21 scannable H2 sections, a 197-character largest section,
  and zero repetition, oversize, placeholder, or forbidden-execution signals.
- Complete suite passes all 8 bounded shards at 569 files / 1,737 tests. A
  separate `vitest list --json` discovery independently confirms 569 / 1,737.
  Build passes. Guarded forced-fallback HTTP smoke passes at health 200/93 bytes,
  JSON 200/40,003 bytes, and Markdown 200/39,564 bytes. The target report is
  ready with 26/26 checks while `executionAllowed` and `connectsManagedAudit`
  remain false; exact PID 20428 was stopped and port 31210 released. Commit,
  tag, push, and remote CI remain.
- Validation deviation: a diagnostic `vitest list --json <files>` invocation let
  the optional JSON output-path argument consume the first test path and overwrite
  `archiveRetentionCensus.test.ts`. The file was restored byte-for-byte from HEAD,
  `git diff --exit-code` proved no residual change, its focused 2 tests passed,
  and the complete final documentation group then passed 14 files / 49 tests.

## Fail conditions

- Accepting both Windows and Linux hashes, branching on `process.platform`, or
  replacing CI values without reproducing them from Git blobs fails the version.
- Editing any committed historical fixture, sibling file, renderer, route, safety
  decision, snippet expectation, or resolver mapping fails the version.
- Raw size and normalized digest describing different streams still fails even if
  the v2209 oracle is made green.
- Any new/grown maintainability, naming, family, renderer, service, route, or cycle
  debt fails the version.
