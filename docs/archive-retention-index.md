# Archive retention index

## Purpose

This index defines the files that `orderops-node` treats as versioned archive
evidence and the mechanical limits that prevent that evidence from growing
without review. It complements `fixtures/MANIFEST.md`: the manifest protects
the meaning and paths of frozen sibling evidence, while this index protects
repository size and per-version maintainability.

The policy is additive and non-destructive. The v2190 closeout does not move,
rename, reformat, deduplicate, or delete any historical archive. A future
cleanup that would change a load-bearing path needs its own consumer-impact
plan and cannot be justified by this budget alone.

## Accounted roots

| Root family | Owner and purpose | Limit type |
| --- | --- | --- |
| `a/` through `f/` | immutable version-level evidence, explanations, and screenshots | aggregate, file count, and 1 MiB per numeric version directory |
| four `代码讲解记录*` roots | historical and current Chinese code walkthroughs | aggregate, file count, and 64 KiB per walkthrough file |
| `fixtures/` | frozen local and sibling-workspace evidence | 10 MiB root, 512 KiB per file |
| `docs/plans/` | active and historical production plans | 3 MiB root, 128 KiB per file |
| `docs/plans2/` | cross-project plan archive volume 2 | 1 MiB root, 128 KiB per file |
| `docs/plans3/` | cross-project plan archive volume 3 | 2 MiB root, 128 KiB per file |

Roots outside this table are not silently counted as archive evidence. Source,
dependencies, generated build output, coverage output, and `.git` have their
own lifecycle and are intentionally outside this census.

## Hard budgets

The machine-readable authority is `docs/archive-retention-budget.json`.

| Budget | Hard limit | Why it exists |
| --- | ---: | --- |
| Accounted aggregate | 80 MiB | forces a reviewed retention decision before archive growth dominates the repository |
| Accounted file count | 8,000 | bounds checkout and filesystem overhead, not only bytes |
| Numeric version directory | 1 MiB | prevents one version from hiding a large dump inside an otherwise healthy aggregate |
| Walkthrough file | 64 KiB | keeps a single explanation readable and reviewable |
| Bounded roots/files | root-specific | prevents fixture or plan concentration from bypassing the global limits |

All limits are failure thresholds, not cleanup targets and not permission to
fill every byte. Raising a limit requires a measured census, a named consumer,
an explanation of why existing content cannot be referenced, and external
review. Lowering a limit is allowed only when the live tree already passes.

## Reproduction

```powershell
npm run archive:retention:census
node scripts/archive-retention-census.mjs --json
```

The command walks only the configured roots, rejects missing or overlapping
roots and symlinks, and reports root summaries, the largest numeric version
directory, largest walkthrough, largest bounded file, and every violation. CI
runs it before the coverage suite. `test/archiveRetentionCensus.test.ts` proves
both the live-tree success path and a fixture that fails aggregate, count,
version, walkthrough, bounded-root, and bounded-file limits together.

## v2190 baseline

Before adding the v2190 explanation and screenshot, the census counted 7,012
files and 65,448,540 bytes (62.42 MiB). The largest numeric archive was
`d/341` at 785,057 bytes; the largest walkthrough was
`代码讲解记录_生产雏形阶段/README.md` at 29,447 bytes. The final post-artifact
census counted 7,017 files and 65,537,435 bytes with no violation. Its largest
version directory remained `d/341` at 785,057 bytes; the result is also
recorded in `docs/plans/node-track-final-evidence.md` and
`d/2190/evidence/node-track-closeout-v2190-summary.json`.

## Failure and retention decisions

When a budget fails, stop the version before commit. First confirm whether the
new artifact is final evidence or temporary output. Temporary screenshots,
logs, coverage HTML, builds, and conversion files are deleted. Final evidence
is not compressed, rewritten, or moved merely to make the test green; instead,
the owner must reference existing evidence, split the version honestly, or
open a reviewed retention change. Historical fixtures and archive paths remain
load-bearing even when a different representation would be smaller.
