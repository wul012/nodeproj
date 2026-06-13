# Production Excellence — mini-kv Playbook

Executes the standard in `docs/plans/production-excellence-program.md` for
`D:\C\mini-kv`. mini-kv sessions: your AGENTS.md requires reading Node's
docs/plans before each version — this playbook is the active quality plan; it
changes no contracts and never blocks your feature versions. All mini-kv
AGENTS.md rules stay in force (CLion bundled CMake/CTest, mingw/bin on PATH for
runtime DLLs, one theme per version, walkthrough ≥3000 字).

**Session bootstrap (parallel-safe):** work in `D:\C\mini-kv` only. Kickoff
prompt for a fresh session:
`Read D:\nodeproj\orderops-node\docs\plans\production-excellence-minikv-playbook.md and execute the next unfinished milestone.`
This playbook file is read-only for you (your AGENTS.md ownership rule —
never edit Node/Java — stays in force): record progress in YOUR repo at
`docs/production-excellence-progress.md` (copy the Progress table below into it
on first run, plus a Deviations section). The planner syncs the central tables
at review checkpoints.

Verified starting facts (2026-06-12): CI exists (`.github/workflows/ci.yml`,
3-OS matrix, ctest --timeout 120). Warning flags good (MSVC `/W4 /permissive-`,
Unix `-Wall -Wextra -Wpedantic`); no sanitizers, no coverage, no
clang-format/tidy configs. Zero external dependencies (stdlib only) — that is a
feature; keep it. No logging framework, only std::cerr. 333 CTest targets,
fixture/JSON-evidence based. Largest files:
src/shard_readiness_boundary_field_names.cpp (61K), src/shard_readiness.cpp
(50K), src/command.cpp (50K), plus 30+ runtime_*_receipts.cpp at 30–43K.
Archive `e/` = 1.1GB / 5,153 files (~11MB/version), no retention policy.
Header guards: all `#pragma once` except include/.../metrics_file.hpp.
START_HERE.md still says "Current focus: v106"; version.hpp.in carries a stale
`c/102/` archive hint; CMake project version 0.102.0 vs git tag v1607; README
is 597KB doubling as the changelog (1,068 version entries). AGENTS.md does NOT
prohibit splitting command.cpp / shard_readiness.cpp — proceed when this
playbook says so.

## Milestone K0 — quick wins (1 version)

1. Fix START_HERE.md "current focus" staleness (point at the real current
   state; describe the version scheme: CMake 0.102.0 vs tags v1607).
2. Fix the stale `c/102/` hint: drive it from a CMake variable
   (`set(MINIKV_CURRENT_ARCHIVE_VERSION ...)` configured into version.hpp.in)
   so version bumps stop requiring manual header edits.
3. Convert include/.../metrics_file.hpp to `#pragma once` (the only outlier).
4. Add `.clang-format` (LLVM base, ColumnLimit matching current style) + a CI
   dry-run check on **changed files only** (git diff filter) — no repo-wide
   reformat (program hard rule 4).

## Milestone K1 — sanitizers (1–2 versions)

1. Add a CMake option `MINIKV_SANITIZE` that appends
   `-fsanitize=address,undefined -fno-omit-frame-pointer` (GCC/Clang).
2. New CI job: ubuntu-latest, Debug + MINIKV_SANITIZE=ON, full ctest run.
   Start `continue-on-error: true`; fix every finding; then make it required.
3. Record each fixed finding in the version walkthrough (these are the
   highest-value bugs this program will surface).
4. Optional later: a TSan job exercising tcp_server tests.

Gate: required green sanitizer job.

## Milestone K2 — coverage (1 version)

1. CMake option `MINIKV_COVERAGE` adding `--coverage` flags; CI job on Linux
   running ctest then gcovr (or lcov) producing a summary + HTML artifact.
2. Floor at measured baseline−2 points for core modules (store, command, wal,
   snapshot, resp); receipts/evidence modules may have a separate lower floor.
3. Record the baseline in the progress table.

## Milestone K3 — logging & observability (1 version)

Keep the zero-dependency policy: implement a minimal in-house leveled logger
(`include/minikv/log.hpp` + src/log.cpp): levels error/warn/info/debug,
timestamps, thread id, `--log-level` flag for minikv_server and minikv_cli,
default warn. Replace bare std::cerr call sites in tcp_server.cpp, wal.cpp,
snapshot.cpp, command.cpp boundaries. Do NOT touch evidence JSON output —
logs go to stderr, evidence stays on stdout, exactly as today.

Gate: a test asserting log-level filtering works; evidence-fixture tests prove
stdout output unchanged.

## Milestone K4 — file splits (2–3 versions; AFTER K1+K2)

Sanitizers and coverage first — they are the safety net for this refactor.

1. **command.cpp (50K)** → `command_dispatch.cpp` (verb table/switch) +
   per-family executor files (string/expiry/persistence/introspection
   families). Public contract: every command's output byte-identical, proven by
   the existing fixture tests (never edit expectations).
2. **shard_readiness.cpp (50K)** → core data structures / JSON formatter /
   boundary validators, same byte-identical rule.
3. **shard_readiness_boundary_field_names.cpp (61K)**: convert the hand-written
   registry to a compact table (static array of entries) if and only if output
   is provably identical; otherwise waiver it in the program's E9 gate with a
   sentence of justification.
4. The 30+ `runtime_*_receipts.cpp` (30–43K each) form a template family like
   Node's renderers. Add a `docs/receipts-consolidation-note.md` with a
   necessity proof and a shared-formatter design BEFORE attempting it; this is
   optional stretch scope, not required for the program.

Planner review checkpoint after this milestone — request it.

## Milestone K5 — archive retention (1 version)

The `e/` archive is 1.1GB and grows ~11MB per version; unbudgeted growth is the
biggest long-term operability risk in this repo.

1. **Retention index**: `docs/archive-retention-index.md` — every archive root
   (`a/`–`f/`), version ranges, sizes, and the explicit FROZEN marker (Node
   holds 439 hardcoded path references; nothing may move — program hard rule 1).
2. **Budget + measurement**: `scripts/archive_inventory.py` (stdlib only)
   printing per-root and latest-version sizes; CI step that warns (not fails)
   when the newest version's archive exceeds a budget (suggest 8MB) or when a
   root crosses its documented ceiling.
3. **Forward policy** (new versions only, never retroactive): screenshots
   compressed, raw outputs truncated to the asserted portions, no binaries.
   Write the policy into AGENTS.md's version-closeout section.

## Milestone K6 — docs & release discipline (1 version)

1. **Split the changelog out of README.md** (597KB is unreadable): move the
   per-version history to `docs/CHANGELOG.md`, leave README with overview,
   build/run instructions, architecture, and the latest ~10 versions.
   **Before moving anything**: grep tests/ and src/ for code that reads
   README.md (fixture tests parse many things in this repo); if anything
   load-bearing parses it, record a deviation and keep README intact, adding
   docs/CHANGELOG.md as the forward-only location instead.
2. **docs/SECURITY.md**: threat model — single-process, local-only, no
   auth/TLS/replication by design; WAL atomicity (FNV checksums, fail-forward
   recovery), snapshot atomic replace (MoveFileExW / rename); boundary markers
   (read_only, execution_allowed, mutates_store, touches_wal) and what they
   mean to an auditor.
3. **docs/TESTING.md**: explain the fixture/evidence testing strategy, the
   333-target layout, what is intentionally NOT tested (multi-process,
   network-partition), and the cross-project contract-alignment rules.
4. **Version coherence**: document the dual scheme (CMake 0.x.y vs tags vNNNN)
   in CHANGELOG header, or align them — pick one policy.
5. Add TCP timeout/limit tests: server-side idle/command timeout enforcement
   and no-socket-leak assertion under ~100 sequential connections.

## Deviations

(record here when reality contradicts an instruction)

## Progress

| Milestone | Version(s) | State | Evidence |
| --------- | ---------- | ----- | -------- |
| K0 | v1609 | completed | per local ledger: START_HERE refresh, CMake archive hint, pragma once, .clang-format + changed-file CI check |
| K1 | v1610–v1611 | completed | MINIKV_SANITIZE + required Ubuntu sanitizer job (continue-on-error removed in v1611); Windows MinGW fast-fail deviation accepted |
| K2 | v1612–v1614 | **completed — planner reviewed 2026-06-12** | baseline 90% (2292/2082 lines, confirmed in CI log); `--fail-under-line 88` = baseline−2; required `ubuntu coverage` job + `mini-kv-core-coverage` artifact green in run 27408621850; core filter = store/command(+catalog/contracts/formatters)/wal/snapshot/resp; deviations accepted (Windows gcno path limit fast-fail; gcovr negative-hits parse workaround). Advisories for later: re-test dropping `--gcov-ignore-parse-errors` after K4 splits command.cpp; bump actions/checkout & upload-artifact off deprecated Node 20 runtime (GitHub forces Node 24 from 2026-06-16) in the next version. |
| K3 | v1615–v1616 | **completed — planner reviewed 2026-06-12** | v1615 closed the K2 actions advisory (checkout@v6.0.3, upload-artifact@v7.0.1). v1616: `include/minikv/log.hpp` + `src/log.cpp` (error/warn/info/debug, UTC timestamp, thread id, default warn, stdlib-only, thread-safe gmtime); `--log-level` in both cli and server mains; zero bare `std::cerr` left in tcp_server/wal/snapshot/command (remaining only in entry-point arg handling); filtering test `log_tests.cpp` registered in CTest (334→337); evidence channels unchanged (deviation accepted). First v1616 push failed the K0 clang-format gate — fixed and re-landed; tag points at the green commit (run 27414908524 all jobs ✓). |
| K4 | v1617–v1619 | **completed — planner reviewed 2026-06-12 PASS** | command.cpp 50KB→37.7KB/732-line coherent core (metrics/WAL-gate/evidence machinery); extracted `command_dispatch` router + string/expiry/persistence/introspection ops + parse helpers + WAL gate. shard_readiness.cpp 50KB→0.2KB shim + `core_digest`/`json`/`boundary_validators` TUs (matches spec decomposition). Zero fixture/expectation edits — only legitimate change was the CI-contract test following the coverage filter to the new TUs (floor stays 88). 61K field-names registry waived per the playbook's escape hatch with written justification (cite under E9 at program end). All three pushes green through sanitizer+coverage+3-OS+format (runs 27417634127 / 27420149433 / 27422338620); walkthroughs 987–989; archives f/1617–f/1619. Advisory for K5 or next version: the command-side split is now done — re-test dropping `--gcov-ignore-parse-errors negative_hits.warn_once_per_file` per the K2 advisory and the v1617 deviation's own promise. |
| K5 | — | not started | |
| K6 | — | not started | |
