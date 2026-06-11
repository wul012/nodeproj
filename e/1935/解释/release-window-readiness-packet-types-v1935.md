# Node v1935 - release window readiness packet types split

## Focus

Move release-window readiness packet type ownership out of the runtime loader.

## What changed

`ReleaseWindowReadinessPacketProfile`, packet state, actors, messages, steps, forbidden operations, and sibling evidence reference shapes now live in `releaseWindowReadinessPacketTypes.ts`.

## Why this matters

The packet entrypoint can keep exporting the public profile type while internal modules share a single type source. This prevents future evidence or policy changes from adding more structural type declarations to the loader.

## Parallelism

Java and mini-kv can continue independently because this version only reshapes Node type ownership around frozen Java v61 and mini-kv v70 evidence.
