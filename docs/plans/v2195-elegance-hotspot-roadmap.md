# v2195 Elegance Hotspot Roadmap

Date: 2026-07-12
Track: E-N2 name hotspot remediation
Scope: internal TypeScript module and export names only; observable behavior is frozen.

## Family design note

- Abstractions: ArtifactIntakeArchiveProof and PacketStopArchiveProof.
- Data boundary: existing route paths, JSON properties, Markdown text, and evidence bytes stay unchanged.
- Behavior boundary: each loader verifies and replays an archive; each renderer only presents its profile.
- File boundary: each concept keeps one loader, one type module, and one renderer.
- Growth stop: no compatibility shim and no third implementation; E-N3 will assess a shared archive-proof engine separately.

## Step-0 evidence

- Starting version: v2194, commit 343583c32813d72ee8ec5ee4992cfa9d58c0f4ea.
- Node Evidence run 29178967561: success, including elegance ratchet, coverage, build, and smoke.
- Starting name-debt ceiling: 4,592 violations; services:verification ceiling: 100 files.
- Java is still working on v1860, so this bounded Node version remains safe to run in parallel.
- The package is private and has no package.json exports surface.

## Candidate selection

The longer 200-plus-character text-package modules were rejected because current source catalogs
emit their filenames as report data. The selected modules are the five longest safe filename
offenders from the census, plus the sixth file needed to close both three-file concepts:

| Rank | Existing role | Length | Pin audit |
|---:|---|---:|---|
| 1 | artifact intake proof renderer | 154 | internal imports only |
| 2 | artifact intake proof types | 151 | internal imports only |
| 3 | packet stop proof renderer | 147 | internal imports only |
| 4 | artifact intake proof loader | 146 | internal imports only |
| 5 | packet stop proof types | 144 | internal imports only |
| 6 | packet stop proof loader | 139 | same concept closure |

Repository search found no exact .ts filename literal for these six modules under src, no fixture,
plan, script, waiver-manifest, or package-export pin, and no composition-renderer waiver. Route
paths are independent string constants and must not change.

## Requirement-evidence matrix

| Requirement | Implementation | Mechanical evidence | State |
|---|---|---|---|
| Five worst safe names removed | Renamed both complete three-file concepts | Census 4,592 to 4,562 | passed |
| Every replacement name at most 40 chars | Short files and exports | Census ready; longest replacement is exactly 40 | passed |
| Output bytes unchanged | No wire/property/string changes | Fixed-time HEAD/current four-surface hashes plus parity test | passed |
| Baseline only shrinks | Refreshed after focused behavior checks | Name debt -30; verification family 100 to 98 | passed |
| No external contract changed | Kept routes, fixtures, archive files, and expectations untouched | Git diff audit and focused route tests | passed |

## Frozen response baseline

Forced historical fallback, complete access headers, a fixed
2026-07-12T00:00:00.000Z clock, one shared evidence root, and Fastify injection produced the
same values from v2194 HEAD and the v2195 worktree:

| Surface | Bytes | SHA-256 |
|---|---:|---|
| artifact intake JSON | 15,313 | 37aaf8e0ec5cc754a783259d270ba095f1d4dfe5b5763ed8b8a62c7787c10c69 |
| artifact intake Markdown | 13,438 | e504ef0613644677a99ff176b1ffe74bef3b19931c6679ddbf93c65c268e6d9f |
| packet stop JSON | 14,866 | 20e8330020dcc06f6da9be9a79619c594148575e27b6efb674e61f27df6afe18 |
| packet stop Markdown | 13,030 | 5fe69afb9d9a27ed623b379d33dc153f6de8b86a97581b0a174d2433147fb021 |

Raw requests were deliberately not accepted as parity evidence because generatedAt changes on
every call. A first detached-worktree comparison was also rejected because Git checkout line-ending
conversion changed archived Markdown bytes. The accepted comparison controls both variables, and
test/eleganceHotspotParity.test.ts keeps those old-HEAD bytes as a permanent regression surface.

## Expected debt movement

- Six filename violations removed.
- Twenty-four exported-identifier violations removed.
- Expected total: 4,592 to 4,562, with no replacement violations.
- Expected services:verification family: 100 to 98; renderer and types counts unchanged.

## Final local verification

- Focused: 6 files and 18 tests passed.
- Full Vitest: 559 files and 1,703 tests passed in 928.83 seconds with maxWorkers=6.
- Typecheck and build passed; lint remained at 0 errors and the pinned 261 warnings.
- Security passed 6/6 narrow waivers and 18/18 config checks across 8,190 text files.
- Renderer remained 242 standardized / 3 composition waivers / 0 non-waived.
- Source size remained 0 files over 800 lines; archive remained below 80 MiB.
- Local process HTTP smoke returned 200 for health and all four target surfaces; the owned process
  and port were closed immediately afterward.

## Fail conditions

- Any response byte/hash, route path, JSON key, Markdown copy, fixture, or existing expectation changes.
- Any replacement identifier or filename exceeds 40 characters.
- Any compatibility file preserves an obsolete long path.
- Baseline count or family ceiling grows, or the baseline is refreshed before the implementation passes.
