# v2196 Cross-Checkout Parity Repair

Date: 2026-07-12
Track: E-N2 CI repair; this consumes the third of at most five E-track versions.
Scope: test oracle and closeout evidence only; product code and historical bytes are frozen.

## Design note

- Abstraction: EvidenceFingerprint selects an exact old-version response baseline.
- Data boundary: collect only digest/Digest and byteLength values from the two JSON profiles.
- Behavior boundary: response bodies remain fully hashed; the fingerprint only selects the input variant.
- Fail closed: an unregistered fingerprint throws before any response assertion can pass.
- Growth stop: three independently reproduced checkout modes are the complete table; no platform wildcard.

## Step-0 reconciliation

- v2195 commit/tag: f5093bd379dd2043706c2a676d3bbfa3970af7fb / v2195.
- Local: 559 files and 1,703 tests passed; fixed-clock old/new comparison passed on one evidence tree.
- GitHub run 29180385904: every pre-test gate passed; one test failed after 558 files and 1,702
  other tests passed. Build and smoke were skipped by that failure.
- Failure: all four body lengths stayed identical, but all four SHA-256 values differed.

## Root cause

The response intentionally embeds raw archive-file byte lengths and digests. Git tracks a mixture of
historical line endings, while checkout filters can materialize those blobs differently. The v2195
oracle pinned one current Windows worktree. It therefore confused two contracts:

1. A rename must preserve bytes when old and new code read the same evidence bytes.
2. Different evidence bytes are expected to produce different digest-bearing response bytes.

Changing production hashing, rewriting archives, adding broad line-ending normalization, or copying
the GitHub hashes into one unconditional expectation would violate one of those contracts.

## Reproduced evidence variants

Every row was generated with the same fixed clock and headers. v2194 and v2195 were executed against
the same evidence root for that row; all four response hashes matched pairwise.

| Evidence materialization | Fingerprint | Artifact JSON | Artifact Markdown | Packet JSON | Packet Markdown |
|---|---|---|---|---|---|
| current Windows mixed tree | a8ede468...ac44d | 37aaf8e0...10c69 | e504ef06...e6d9f | 20e83300...fe18 | 5fe69afb...fb021 |
| raw Git blob / Linux checkout | c5574c92...8e10 | 3e89c7a8...b7358 | 4a52e9d7...608e1 | d2bac07b...60897 | 1b83f126...41175 |
| Windows CRLF checkout | 98e84ad8...625d | 6a2893de...b756 | e9a58b1d...ab21 | a3d14081...cb30f | 2b44c241...cb268 |

Each fingerprint hashes 104 sorted path/value signals. Selection is by evidence content, not by
operating-system name, CI environment variables, or a permissive list of response hashes.

## Requirement-evidence matrix

| Requirement | Implementation | Mechanical evidence | State |
|---|---|---|---|
| Preserve full response parity | Hash every JSON/Markdown body | Exact four-body array per fingerprint | passed focused |
| Explain environment variance | Fingerprint digest and byte-length signals | Three isolated worktrees | passed |
| Unknown evidence fails | Throw on missing fingerprint key | Negative focused test | passed |
| No product behavior changes | Test/docs only | Git diff scope | passed |
| Restore version boundary | Full suite, build, smoke, green CI | Local passed; remote pending | in progress |

## Rejected alternatives

- Updating one unconditional hash set to the CI values: would break the verified Windows tree and
  hide the input distinction.
- Normalizing line endings inside production digest code: changes report bytes and archive semantics.
- Rewriting frozen archive files or fixtures: explicitly forbidden.
- Adding a repository-wide eol policy in this repair: changes checkout semantics for thousands of
  historical artifacts and is not necessary to prove rename parity.

## Fail conditions

- A response hash is accepted without a matching 104-signal evidence fingerprint.
- Any route, source service, fixture, archive artifact, or existing business expectation changes.
- A platform/CI wildcard bypasses the fingerprint table.
- v2196 is declared complete before coverage, build, smoke, and cleanup pass remotely.

## Final local verification

- Current mixed, raw Git/LF, and CRLF checkout focused runs each passed 1 file and 2 tests.
- The new walkthrough initially exposed three missing required headings; the unchanged readability
  gate failed, then passed 3 files and 5 tests after the document gained real goal/non-goal,
  service-flow, and one-sentence-summary sections.
- Final full Vitest passed 559 files and 1,704 tests in 690.00 seconds with maxWorkers=6.
- Typecheck, lint (0/261), build, elegance, security, renderer, source-size, archive, and local HTTP
  smoke passed. All owned worktrees, junctions, workers, process/port, and dist output were removed.
