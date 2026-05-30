# Node v396 code walkthrough: Java / mini-kv runtime execution artifact upstream progress intake

## Version progress

Node v396 consumes Java v162 and mini-kv v153 after the v395 archive verification. It records that both upstream projects followed the intended direction, then separates "candidate/preflight evidence" from "accepted runtime execution packet".

The result stays closed: there is no runtime execution packet, no approved runtime window, no Java or mini-kv process start, and no active shard routing.

## Key files

- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntakeTypes.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntakeRenderer.ts`
- `test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake.test.ts`
- `docs/plans3/v396-post-java-mini-kv-runtime-execution-artifact-upstream-progress-intake-roadmap.md`

## Core flow

1. `createSourceNodeV395(...)` replays the v395 archive verification and requires it to remain ready for v396 while runtime stays closed.
2. `createJavaV162RuntimeArtifactCandidate(...)` reads the Java v162 evidence through the historical evidence resolver. It accepts Java owner, port, GET smoke, cleanup references, and process rules as Java-side candidate signals only.
3. `createMiniKvV153RuntimeArtifactPreflight(...)` reads the frozen mini-kv v153 snapshot and requires `runtimeExecutionArtifactsComplete=false`, `presentRuntimeExecutionArtifactCount=0`, and `missingRuntimeExecutionArtifactCount=6`.
4. `createRuntimePacketRequirements(...)` creates six explicit rows: operator approval, ports, smoke, cleanup proof, service owner, and process cleanup rules. Every row remains `packetSatisfied=false`.
5. `createUpstreamProgressClarification(...)` hashes the v396 clarification record and marks the next step as Node v397, not runtime execution.
6. `createChecks(...)` aggregates 35 checks covering v395 readiness, Java candidate evidence, mini-kv blocked preflight evidence, six-row requirement stability, and closed runtime boundaries.

## Boundary

- `readyForRuntimeExecutionPacket=false`
- `readyForRuntimeLiveReadGate=false`
- `runtimeExecutionArtifactsComplete=false`
- `presentRuntimeExecutionArtifactCount=0`
- `missingRuntimeExecutionArtifactCount=6`
- `runtimeExecutionPacketPresent=false`
- `runtimeExecutionPacketExecutable=false`
- `executionAttempted=false`
- `startsJavaService=false`
- `startsMiniKvService=false`
- `executionAllowed=false`
- `activeShardPrototypeEnabled=false`

## Verification

Focused test:

```text
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake.test.ts --testTimeout=180000
1 file, 3 tests passed
```

Adjacent tests:

```text
npx vitest run test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightArchiveVerification.test.ts test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake.test.ts --testTimeout=180000
2 files, 6 tests passed
```

Full test:

```text
npx vitest run --testTimeout=180000 --maxWorkers=4
329 files, 1134 tests passed
```

Typecheck and build also passed. HTTP smoke returned JSON 200, Markdown 200, `readyForJavaMiniKvRuntimeExecutionArtifactUpstreamProgressIntake=true`, `readyForRuntimeExecutionPacket=false`, `runtimeExecutionArtifactsComplete=false`, Java / mini-kv evidence ready, and 35/35 checks. Browser snapshot and screenshot were generated from the local static archive page.

## Next step

Node v397 should check a complete six-item runtime execution packet if one has been supplied. If the packet is still partial, Node should keep runtime closed and report the exact missing rows.
