# Code walkthrough - Node v1937

## Focus

Extract release-window packet policy helpers.

## Code reading notes

- `releaseWindowReadinessPacketPolicy.ts` owns readiness checks, dry-run step construction, forbidden operations, blockers, warnings, and recommendations.
- `releaseWindowReadinessPacket.ts` now focuses on loading source profiles, digesting the packet, projecting summaries, and rendering Markdown.
- The route and dry-run envelope tests still import the stable service entrypoint.

## Maintenance rule

Add new packet gates and operator-facing messages in the policy module; keep the entrypoint focused on composition and rendering.
