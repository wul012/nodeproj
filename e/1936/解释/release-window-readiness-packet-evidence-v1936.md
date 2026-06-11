# Node v1936 - release window readiness packet evidence split

## Focus

Move frozen sibling evidence and endpoint constants into a dedicated evidence module.

## What changed

`releaseWindowReadinessPacketEvidence.ts` now owns the Java v61 rollback approval fixture reference, the mini-kv v70 restore drill reference, and the release-window packet endpoint catalog.

## Why this matters

Static evidence is now reviewable without scanning loader, renderer, and readiness logic. Future evidence refreshes can touch the evidence module directly instead of expanding the service entrypoint.

## Parallelism

No fresh Java or mini-kv work is required. Node still consumes frozen evidence only.
