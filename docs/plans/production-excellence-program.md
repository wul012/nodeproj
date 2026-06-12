# Production Excellence Program (Node + Java + mini-kv)

Status: active. Owner of execution: Codex sessions in each repo.
Planner / final reviewer: Claude Code (D:\nodeproj sessions).
Grounding: read-only production-readiness audits of all three repos, adversarially
spot-checked, 2026-06-12.

The goal, in the user's words: all three projects must "be excellent and fine —
meet the standard of producing." This program defines that standard once, then
each project executes its own playbook against it:

- Node: `docs/plans/production-excellence-node-playbook.md`
- Java: `docs/plans/production-excellence-java-playbook.md`
- mini-kv: `docs/plans/production-excellence-minikv-playbook.md`

## The Excellence Standard (gates E1–E10)

A project "meets the standard of producing" when every gate below is green and
mechanically enforced (a CI job or a committed test fails when the gate regresses).

| Gate | Standard | Measured by |
| ---- | -------- | ----------- |
| E1 Build & CI | Every push builds and tests headless in CI; Docker-dependent tests isolated in an optional job | CI workflow file + green run |
| E2 Static analysis | Linter/formatter/analyzer runs in CI with zero new violations (baseline files allowed for legacy) | CI step + baseline file |
| E3 Coverage | Line coverage measured in CI with a floor at the observed baseline, ratcheted up, never down | coverage config + CI threshold |
| E4 Security & config | No committed secrets; safe-by-default config; production profile with debug features off; threat model written | scan + profile file + SECURITY/BOUNDARIES doc |
| E5 Observability | Structured leveled logging with request/operation correlation; health endpoint; basic latency/error metrics where a server exists | code + endpoint check |
| E6 Error handling | Graceful shutdown; explicit client timeouts; documented failure behavior | code + tests |
| E7 Docs honesty | README/START_HERE claims verified against reality; a PRODUCTION_BOUNDARIES doc states explicitly what is and is NOT production | doc review with file evidence |
| E8 Release discipline | Version identifiers coherent (manifest vs git tags); CHANGELOG maintained; tagged releases | files + tags |
| E9 Code health | No source file > ~800 lines (or a written waiver); duplication families collapsed into template/builders; file-count ratchet test committed | ratchet tests + size check |
| E10 Archive retention | Archive growth budgeted and indexed; load-bearing paths frozen and documented; no unbounded growth | retention index + CI size warning |

## Where each project stands today (audited 2026-06-12)

| Gate | Node (orderops-node) | Java (advanced-order-platform) | mini-kv |
| ---- | -------------------- | ------------------------------ | ------- |
| E1 CI | ✅ node-evidence.yml (typecheck/test/build/smoke) | ❌ **no CI at all**, no Maven wrapper | ✅ 3-OS matrix |
| E2 Static analysis | ❌ no ESLint/Prettier, no lint script | ❌ no checkstyle/spotbugs | ⚠️ good warning flags; no clang-format/tidy |
| E3 Coverage | ❌ none | ❌ none (no JaCoCo) | ❌ none |
| E4 Security/config | ✅ safe defaults verified; ⚠️ boundaries doc missing | ⚠️ H2 console on by default; docker-compose hardcodes creds; no prod profile | ✅ no secrets; ⚠️ no threat-model doc |
| E5 Observability | ⚠️ request IDs + health yes; no metrics endpoint | ⚠️ no actuator/correlation IDs | ❌ std::cerr only; no leveled logger |
| E6 Error handling | ✅ graceful shutdown, client timeouts (no retries) | ⚠️ no graceful-shutdown config; scheduler hooks missing | ✅ RAII/atomic snapshot; ⚠️ TCP timeout untested |
| E7 Docs honesty | ⚠️ good but boundaries scattered | ⚠️ boundaries scattered across 30+ classes | ⚠️ START_HERE stale (says v106); README is a 597KB changelog |
| E8 Release | ⚠️ package.json 0.1.0 vs tag v2114; no CHANGELOG | ⚠️ pom 0.1.0-SNAPSHOT vs tag v1788; no CHANGELOG | ⚠️ CMake 0.102.0 vs tag v1607; changelog buried in README |
| E9 Code health | ⚠️ v2114 consolidation active (batch 1 done); 5 files >800 lines | ❌ ops pkg = 1,352/1,474 classes; no ratchet | ⚠️ command.cpp & shard_readiness.cpp ~50KB each |
| E10 Retention | ⚠️ 57.5MB archives, no policy | ⚠️ 286 version snapshots, no policy | ❌ `e/` = **1.1GB**, ~11MB/version, no policy |

## Cross-project hard rules (apply to every milestone)

1. **Frozen archive paths.** Never rename, move, or delete anything under
   `a/`–`f/`, `代码讲解记录*`, or `fixtures/` in ANY of the three repos.
   orderops-node hardcodes 439 absolute path references with digest assertions
   into the Java and mini-kv trees. Retention work may only add indexes and
   budgets, never relocate history.
2. **Non-contract parallelism.** Everything in this program is internal quality
   work: no evidence schema, route contract, or JSON field may change. Under the
   四项目理解统筹 rules this means all three projects may proceed in parallel,
   and none blocks another.
3. **Existing AGENTS.md conventions still bind**: per-version walkthroughs
   (中文 ≥3000 字), archive artifacts, cleanup gates, small-version rhythm,
   <3000 changed lines per commit (Node), one-theme-per-version (mini-kv).
4. **Mechanical-change exception**: repo-wide auto-format or auto-fix sweeps are
   forbidden in one commit. Format/lint adoption is "new and touched files
   only", or directory-by-directory batches, each within the line budget.
5. **No new governance chains** in any repo while its consolidation milestone is
   open. Ratchet tests enforce this in Node today; Java and mini-kv playbooks
   add their own.

## Sequencing

All three tracks run in parallel. Within each track, order is fixed:

- **Node**: N0 quick wins → N1 (v2114 consolidation, already running) → N2 coverage → N3 boundaries/release docs → N4 metrics → N5 code health.
- **Java**: J0 CI bootstrap (do this first — it is the single largest gap in the whole system) → J1 static analysis → J2 coverage → J3 config/security → J4 observability → J5 docs/release → J6 ops-package consolidation (long-running, mirrors Node v2114 recipe).
- **mini-kv**: K0 quick wins → K1 sanitizers → K2 coverage → K3 logging → K4 file splits → K5 archive retention → K6 docs/release.

## Parallel operating model

Three independent Codex sessions, one per repo, no coordination needed:

| Session cwd | Reads | Writes code in | Tracks progress in |
| ----------- | ----- | -------------- | ------------------ |
| D:\nodeproj\orderops-node | its playbook (this repo) | its own repo | playbook progress table |
| D:\javaproj\advanced-order-platform | Node `docs/plans2` pointer → Java playbook | its own repo | own repo `docs/production-excellence-progress.md` |
| D:\C\mini-kv | Node `docs/plans` → mini-kv playbook | its own repo | own repo `docs/production-excellence-progress.md` |

Safe to run all three at the same time because: the work is non-contract (rule 2),
each session edits only its own repo, and the only dangerous interaction —
touching another repo's archive paths — is banned by rule 1. Sibling sessions
treat everything under D:\nodeproj as read-only.

## Review protocol

- Each Codex session updates its progress file after every milestone and keeps
  CI green; the planner syncs the sibling progress into the central playbook
  tables at review checkpoints.
- Planner review checkpoints (ask the Claude session to review): after J0
  (Java CI exists), after each project's coverage milestone, after K4
  (mini-kv splits), and at program end. The reviewer verifies gates E1–E10
  with fresh evidence, not by trusting the progress tables.
- Any instruction in a playbook that turns out to contradict reality (wrong
  path, wrong tool behavior) must be recorded in the playbook's "deviations"
  section rather than silently worked around.
