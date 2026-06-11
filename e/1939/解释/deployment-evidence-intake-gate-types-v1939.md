# Node v1939 - deployment evidence intake gate types

## Focus

Move intake gate type ownership out of the loader.

## What changed

`deploymentEvidenceIntakeGateTypes.ts` now owns intake states, sources, messages, steps, forbidden operations, Java evidence shapes, mini-kv evidence shapes, and the public profile interface.

## Why this matters

The runtime entrypoint can re-export the profile type while all internal modules share one structural source of truth.
