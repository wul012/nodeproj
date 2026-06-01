# Node v491 post Java / mini-kv route catalog cleanup consumer readiness evidence intake roadmap

## Goal

Node v491 freezes the next clean sibling evidence window after v490:

- Java v220-v224 consumer evidence digest and readiness completion evidence.
- mini-kv v202-v209 versioned post-closeout continuity fixtures.
- mini-kv v210 audit note as latest observed status only, because v210 has no versioned fixture yet and its rolling `shard-readiness.json` must not become a historical baseline.

This version adds typed local intake and fallback verification only. It does not add a route, does not start Java, does not start mini-kv, and does not open runtime execution authority.

## Cross-Project State

- Java latest clean tag observed by Node: `v224-order-platform-shard-readiness-v1-contract-consumer-readiness-completion`.
- Java current worktree is not clean. Node must not consume Java current working tree files or v225-like uncommitted changes.
- mini-kv latest clean tag observed by Node: `第二百一十版路由目录清理后收口连续性发布目录审计`.
- mini-kv v202-v209 have versioned `fixtures/release/shard-readiness-v*.json` files. v210 is observed through `e/210/解释/说明.md` only until a versioned fixture exists.

## Parallel Guidance

Java and mini-kv are recommended parallel.

- Java can continue its next clean tag work in parallel; Node v491 is not a pre-approval blocker.
- mini-kv can continue v211+ work in parallel; Node v491 does not require service startup or fresh runtime evidence.
- Node will only consume future Java/mini-kv outputs after they are clean, tagged, and have versioned or explicitly frozen evidence files.

## Necessity Proof

- Blocker resolved: after v490, sibling projects advanced beyond the earlier checklist window, but Java current worktree is dirty and mini-kv v210 lacks a versioned fixture. Node needs a precise intake boundary before adding more report routes.
- Later consumers: v492 will expose this intake as a JSON/Markdown report; v493-v495 will archive and verify it.
- Existing route/report reuse is not enough: v486-v490 cover checklist evidence through Java v217 and mini-kv v201. They do not cover Java v220-v224 digest completion or mini-kv v202-v209 post-closeout continuity.
- Growth stop condition: the chain stops at v495 after route exposure; the next batch must either close v491-v495 or wait for fresh tagged sibling evidence.

## Implementation Plan

- Add `src/services/javaMiniKvRouteCatalogCleanupConsumerReadinessEvidence.ts`.
- Add focused tests for normal local resolution and forced historical fixture fallback.
- Copy the consumed sibling evidence into `fixtures/historical/sibling-workspaces/...`.
- Keep v210 as an audit note, not as a historical baseline.

## Validation Plan

- Run focused vitest for the new intake.
- Run typecheck before closeout.
- Do not run a full Vitest batch in this intake version; broader route/catalog checks belong to v492+ once a route is added.
