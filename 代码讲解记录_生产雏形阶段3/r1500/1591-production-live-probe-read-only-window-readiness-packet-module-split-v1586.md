# Code walkthrough - Node v1586

## Focus

operator window requirements extraction.

## Code reading notes

- productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacket.ts now remains the stable loader and export surface.
- productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketTypes.ts owns profile and nested packet type contracts.
- productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketBuilder.ts owns build parts, checks, messages, digest, endpoint constants, and summary assembly.
- productionLiveProbeRealReadSmokeReadOnlyWindowReadinessPacketMarkdownRenderer.ts owns deterministic Markdown section rendering.

## Maintenance rule

Keep new readiness packet responsibilities behind these boundaries. Do not add inline checks or Markdown sections back into the loader unless the stable entrypoint itself must change.
