# v2190 Node production-excellence track closeout roadmap

## Objective

Close the Node repository track against the shared E1-E10 standard without
starting the cross-project integration capstone. This version may tighten local
quality gates and repair end-state documentation, but it must not add product
routes, report chains, execution authority, sibling contracts, or live upstream
behavior.

## Step-0 reconciliation

- Baseline commit/tag: `325bbe9e` / `v2189`; local and remote refs aligned.
- Node Evidence run `29131852707`: success, including typecheck, lint, coverage,
  build, health, metrics, release-evidence smoke, and server cleanup.
- Claude N5-close review: `N5 CLOSED - PASS, no corrections` in
  `production-excellence-node-final-push.md`.
- Claude explicitly requires the existing `AGENTS.md`, Node brief, and Java
  brief review edits to be committed in this closeout version.
- Current external state wins over older tables: N0-N5 are complete; Phase 3 is
  unblocked; C1-C4 remain blocked until this closeout receives external PASS.

## Requirement-evidence matrix

| Gate | Current implementation | Mechanical evidence | Closeout action |
| --- | --- | --- | --- |
| E1 Build and CI | `node-evidence.yml` | green run `29131852707` | retain and cite final run |
| E2 Static analysis | ESLint in CI, 261 warnings | `npm run lint` | add `--max-warnings 261` ratchet |
| E3 Coverage | V8 coverage in CI, actual 95.92/87.59/98.64/95.88 | `npm run test:coverage` | raise floors from 93/85/96/93 to 94/86/97/94 |
| E4 Security and config | safe defaults and boundary tests | config tests and boundaries doc | add secret scan, threat model, fail-closed production template |
| E5 Observability | structured request IDs, health, metrics | tests plus CI smoke | cite current evidence |
| E6 Error handling | graceful shutdown and explicit upstream timeouts | server/client tests and source assertions | cite current evidence |
| E7 Docs honesty | boundaries current; `START_HERE` stale at v242 | docs tests | refresh README/START_HERE/boundaries and add closeout assertions |
| E8 Release discipline | git tags canonical; changelog maintained | docs test plus remote tag | add v2190 entry/tag evidence |
| E9 Code health | renderer and source-size ratchets green | 242/245 + 3 AST waivers; 1234 files, 0 oversized | enumerate only accepted waivers |
| E10 Archive retention | frozen fixture manifest only | no archive budget gate | add retention index, budget census, tests, and CI step |

## Necessity proof

### Security gate

- Blocker resolved: E4 requires a scan and written threat model; neither exists.
- Consumer: the external E1-E10 closeout reviewer and every later CI run.
- Why existing surfaces cannot be reused: config tests prove defaults but do not
  scan committed files for credential fingerprints or document trust boundaries.
- Stop condition: one bounded scanner, one threat-model document, one focused
  test, and one CI command; no security report chain or runtime feature follows.

### Archive-retention gate

- Blocker resolved: E10 requires a retention index and CI size warning; the
  fixture manifest freezes paths but does not bound archive growth.
- Consumer: the external closeout reviewer and future version closeouts.
- Why existing surfaces cannot be reused: source-size and governance ratchets
  scan `src/` ownership, not `a/`-`f/`, walkthroughs, plans, or fixtures.
- Stop condition: one machine-readable budget, one index, one census command,
  one test family, and one CI step. Historical archives are never moved,
  renamed, rewritten, or deleted.

## Fail conditions

- Any coverage threshold or lint budget is loosened.
- A security or retention test changes product behavior or scans sibling repos.
- README or boundaries claim real joint execution, production authorization, or
  capstone completion before C1-C4 run.
- Existing renderer/source-size waivers are hidden rather than enumerated.
- Full local verification or final Node Evidence is skipped.
- Phase 3 is called externally complete before Claude closeout review PASS.

## Cross-project parallel statement

Java and mini-kv are **recommended parallel**. v2190 changes only Node quality
gates, documentation, archive accounting, and local CI. It consumes no fresh
sibling evidence, starts no sibling service, opens no port owned by another
project, and does not make Node a pre-approval blocker. The integration capstone
remains a separate post-review series with its own startup/port/owner/cleanup
plan.
