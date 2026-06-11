# Node v2084 roadmap: production shard execution route catalog forward compatibility

## Goal

Repair the route catalog growth rule before adding the external-evidence batch: historical archives stay exact, while live route catalog checks use lower-bound compatibility when new audit routes are added.

## Necessity Proof

- Blocker resolved: old closeouts used `groupCount === 50`, which breaks as soon as the production shard execution route group exists.
- Later consumer: v2085-v2088 add more JSON/Markdown routes and must not invalidate historical Java/mini-kv route-catalog closeouts.
- Reuse decision: keep the existing audit catalog summary and shared production shard execution profile builder instead of adding a separate catalog format.
- Growth stop condition: stop after this repair unless a future route group changes domain ownership or catalog integrity.

## Cross-Project Parallel Plan

Java and mini-kv are recommended parallel. Node v2084 consumes no fresh sibling evidence and is not a pre-approval blocker for either project.

## Engineering Requirements

- Convert live route catalog stability checks from exact group count equality to forward-compatible lower bounds.
- Keep archived evidence snapshots historical and exact.
- Expose the v2084 route as JSON/Markdown through the existing audit route catalog.
- Store evidence under `e/2084/evidence` and explanation under `e/2084/解释`; create `e/2084/图片` only if a real screenshot is generated.

## Verification

Run production shard execution focused tests, route catalog summary/integrity tests, the previously failing Java/mini-kv closeout focused tests, typecheck, build, and one HTTP smoke.
