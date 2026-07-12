# v2197 Archive Evidence Engine Roadmap

Date: 2026-07-12
Track: E-N3 duplication hotspot remediation; fourth of at most five E-track versions.
Scope: internal archive-file plumbing and internal names only; routes, response bytes, business checks,
fixtures, and historical artifacts are frozen.

## Family design note

- Abstraction: `ArchiveEvidenceEngine` owns raw archive-file acquisition.
- Data boundary: each case supplies an archive root, basename, and four external references; the
  engine derives the fixed eleven-role inventory.
- Behavior boundary: the engine returns refs, raw text, parsed JSON, and file inventory only.
- Business mapping, replay checks, summaries, digests, and rendering stay in each case module.
- Raw bytes are authoritative; no line-ending normalization or historical fallback is introduced.
- Growth stop: exactly the three measured duplicate loaders migrate; later cases use the engine only
  when their byte semantics match and the three-times rule independently requires it.

## Step-0 reconciliation

- Node `v2196` commit `25bc10fd` is tagged, pushed, and green in run `29182204688`.
- Starting census is ready at 4,562 name violations: 987 filenames and 3,575 exports.
- There are 52 tracked structural families; `services:verification` is 98 and must not grow.
- Java v1862 implementation run `29182221021` is green. Its closeout run is still in progress, so
  Node may execute this version in parallel and must recheck the Java final-close boundary before v2198.

## Necessity proof

- Blocker: three archive-verification loaders independently construct the same eleven-file inventory,
  read raw bytes, calculate SHA-256/byte length, remove a JSON BOM, parse JSON, and walk nested values.
- Consumer: the artifact-intake proof, packet-stop proof, and declared-operator live-gate verification.
- Existing utilities cannot be reused: `historicalEvidenceReportUtils` normalizes line endings and
  resolves fallback locations, which changes these loaders' raw local-archive digest semantics.
- Stop condition: the engine has no route, profile, business-rule, replay, summary, or renderer API;
  after the three current consumers migrate, this chain ends.

## Change boundary

1. Add `src/evidence/archiveEvidenceEngine.ts` with names no longer than 40 characters; pure evidence
   acquisition stays outside the service-file growth budget.
2. Migrate the two short proof loaders to the engine while preserving their public short APIs.
3. Rename the third internal family to `liveGateArchiveVerification`,
   `liveGateArchiveRenderer`, and `liveGateArchiveVerificationTypes`; no compatibility wrappers.
4. Keep the third family in the existing `verification` structural family so the family census does
   not gain a third `proof` member.
5. Add direct engine tests for raw BOM/CRLF bytes, missing and invalid JSON, stable inventory order,
   raw digest/length, and value/list helpers.
6. Expand the old-version parity oracle from four to six complete response bodies and from two to
   three JSON profiles. Unknown evidence fingerprints continue to fail closed.

## Old-version response baselines

All rows use forced historical fallback, complete access headers, and the fixed clock
`2026-07-12T00:00:00.000Z`. The body order is artifact JSON/Markdown, packet JSON/Markdown, then
live-gate JSON/Markdown. Each baseline was independently reproduced from the pre-v2197 code.

| Evidence bytes | Fingerprint | Signals | Six body SHA-256 values |
|---|---|---:|---|
| current mixed tree | `d16df8bc...82417` | 154 | `37aaf8e0...10c69`, `e504ef06...e6d9f`, `20e83300...fe18`, `5fe69afb...fb021`, `30234cc5...61da`, `f405a563...3ecf8` |
| raw Git/LF | `998bfaf3...b1f6` | 154 | `3e89c7a8...b7358`, `4a52e9d7...608e1`, `d2bac07b...60897`, `1b83f126...41175`, `59aa90f1...3646`, `9aadc403...c53` |
| Windows CRLF | `d6b40584...b1f6` | 154 | `6a2893de...b756`, `e9a58b1d...ab21`, `a3d14081...cb30f`, `2b44c241...b268`, `ac1cb8dd...5d89`, `ab7425db...52da` |

## Requirement-evidence matrix

| Requirement | Implementation | Mechanical evidence | State |
|---|---|---|---|
| One raw-byte engine replaces three copies | Engine plus three data specs | 2 direct engine tests; duplicate-helper source search empty | passed |
| Business behavior remains local | No business callbacks or profile types in engine | API/type review and focused route tests | passed |
| Six response bodies remain byte-identical | Fixed-clock old-version baseline table | mixed/LF/CRLF parity tests | passed |
| Long internal family names are removed | Three short files and short exports | Elegance census | passed |
| Baseline only shrinks | Refreshed after behavior gates passed | 4,562 to 4,549 | passed |
| No structural family grows | Keep third family as verification | 52 tracked families; verification remains 98 | passed |
| Version is production-verifiable | Focused, full, build, smoke, CI | Local complete; remote CI pending | in progress |

## Fail conditions

- Any route string, JSON property, Markdown text, business check, replay result, fixture, or archive byte changes.
- The engine imports an application config, route, profile, renderer, or historical-fallback resolver.
- A new identifier or filename exceeds 40 characters, or a compatibility wrapper preserves an old path.
- Any six-body baseline is accepted without its exact 154-signal evidence fingerprint.
- The elegance baseline is refreshed before focused parity and engine tests pass.
- Java reaches final program close and Node starts another version before the required capstone rerun.

## Final local verification

- Direct engine and consumer focused run: 5 files, 13 tests passed; documentation quality: 3 files,
  11 tests passed; final walkthrough contains 3,219 Chinese characters.
- The first full run passed 559/560 files and 1,705/1,706 tests, then correctly failed the unchanged
  service-file ratchet at 1,126/1,125. Moving the pure engine from `src/services` to `src/evidence`
  restored the ownership boundary; the focused governance test passed 2/2 without changing its limit.
- Corrected final full Vitest passed 560 files and 1,706 tests in 915.57 seconds with six workers.
- Typecheck and build passed; lint remained 0 errors / 261 pinned warnings. Security scanned 8,200
  text files with 6/6 narrow waivers and 18/18 config checks.
- Renderer census stayed 242/245 standardized, 3 composition waivers, 0 non-waived. Source size
  stayed at zero files above 800 lines; archive retention was 7,053 files and 62.77 MiB / 80 MiB.
- Process smoke on port 31197 returned 200 for health and all six JSON/Markdown surfaces. PID 3632
  was stopped, the port closed, and both smoke logs were deleted.
