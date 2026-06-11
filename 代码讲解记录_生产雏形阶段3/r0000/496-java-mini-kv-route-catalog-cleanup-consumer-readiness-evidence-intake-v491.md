# Node v491 code walkthrough: Java / mini-kv route catalog cleanup consumer readiness evidence intake

## Version Progress

v491 is the first version in the new fifteen-version run. It follows v490, which exposed the verification-checklist archive verifier route and left the audit route catalog at 205 JSON/Markdown routes.

The new work is intentionally an intake-only step. It does not register a new HTTP route yet. That separation matters because the sibling evidence boundary changed: Java has a dirty current worktree, while mini-kv is clean at v210 but does not have a versioned v210 fixture. v491 therefore freezes only the clean, consumable evidence window.

## Why This Version Exists

The previous Node evidence chain covered Java v215-v217 checklist evidence and mini-kv v201 continuity. Since then, Java produced a larger consumer-readiness chain through v224, and mini-kv produced post-closeout continuity fixtures through v209 plus a v210 audit note.

Node needs to understand that evidence before adding report routes. The main risk is accidental authority creep: if Node reads Java's current dirty files or mini-kv's rolling fixture as if they were frozen baselines, later archive verification would look stable while actually depending on mutable state. v491 closes that risk by copying the allowed evidence into `fixtures/historical/sibling-workspaces/...` and by testing forced fallback.

## Evidence Inputs

The service reads six Java inputs:

- `e/220/evidence/java-shard-readiness-v1-contract-consumer-evidence-digest-v220.json`
- `src/main/resources/static/contracts/java-shard-readiness-v1-contract-consumer-evidence-digest-v220.fixture.json`
- `e/221/evidence/java-shard-readiness-v220-consumer-evidence-digest-snapshot-freeze-v221.json`
- `e/222/evidence/java-shard-readiness-v220-consumer-evidence-digest-historical-compatibility-v222.json`
- `e/223/evidence/java-shard-readiness-v1-contract-consumer-evidence-digest-integrity-v223.json`
- `e/224/evidence/java-shard-readiness-v1-contract-consumer-readiness-completion-v224.json`

It reads eight mini-kv versioned fixtures:

- `fixtures/release/shard-readiness-v202.json`
- `fixtures/release/shard-readiness-v203.json`
- `fixtures/release/shard-readiness-v204.json`
- `fixtures/release/shard-readiness-v205.json`
- `fixtures/release/shard-readiness-v206.json`
- `fixtures/release/shard-readiness-v207.json`
- `fixtures/release/shard-readiness-v208.json`
- `fixtures/release/shard-readiness-v209.json`

It also reads the mini-kv v210 explanation note. That note is not treated as a versioned fixture. It is used to prove that v210 observed the rolling fixture, pointed fallback back to v209, and preserved the read-only boundary.

## Code Flow

`loadJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidence()` is the entry point. It first constructs `HistoricalEvidenceFile` records for every required Java and mini-kv input. These records include the original external path, the resolved path, presence, size, and digest.

The resolver can prefer a local historical fixture when it exists. When `ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK=true`, it must resolve to `fixtures/historical/sibling-workspaces/...`. This is how the test proves Node is no longer dependent on the sibling working trees.

The service then parses the Java files into small typed shapes:

- `JavaConsumerEvidenceDigest` checks the v220 endpoint, fixture endpoint, digest evidence count, digest check count, validation count, and runtime boundary.
- `JavaConsumerEvidenceDigestFixture` checks the static fixture shape, checklist counts, blocked operations, GET-only posture, and startup prohibition.
- `JavaConsumerReadinessGuard` is reused for v221-v224 guard-like receipts. It keeps those versions compact without creating a separate parser for each nearly identical file.

The mini-kv parsing is similarly focused. `createMiniKvPostCloseoutRelease()` extracts only the fields Node needs: release version, previous version, source frozen version, stage sequence, fixture count, boundary catalog counts, and no-runtime flags. This avoids coupling Node to the full mini-kv fixture shape.

Finally, `createChecks()` turns the typed evidence into 21 explicit booleans. The checks prove file presence, Java digest readiness, Java fixture boundary, v221-v224 guard readiness, mini-kv sequential release continuity, stable digests, v210 note handling, and no runtime authority.

## Runtime And Boundary Decisions

The most important design decision is what v491 does not do. It does not create a new approval chain, does not introduce a service client, and does not perform live reads. This is a local evidence-intake profile only.

The second design decision is to reject v210 rolling data as historical baseline. mini-kv v210 is visible and useful, but without `shard-readiness-v210.json` it cannot be consumed the same way v202-v209 are consumed. The code records v210 as `miniKvLatestAuditNote` and keeps `miniKvLatestVersionedRelease` at `v209`.

## Validation

The focused test has two paths:

- normal resolution, which can read local files or historical fixtures through the resolver;
- forced fallback resolution, which requires every consumed file to resolve under `fixtures/historical/sibling-workspaces`.

That second path is the important GitHub-runner and dirty-worktree guard. It proves v491 is reproducible from Node's frozen fixtures alone.

## What v492 Can Safely Do

v492 can wrap this intake in a JSON/Markdown report route. It should update the Java/mini-kv cleanup route group from 7 to 8 routes, update total route count from 205 to 206, and keep Java/mini-kv parallel guidance unchanged.
