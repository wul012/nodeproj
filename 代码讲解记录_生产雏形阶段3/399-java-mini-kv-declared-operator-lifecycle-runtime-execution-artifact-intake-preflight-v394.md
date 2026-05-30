# Node v394 code walkthrough: Java / mini-kv declared operator lifecycle runtime execution artifact intake preflight

## Version progress

Node v394 adds a local artifact intake preflight after the v393 stop record archive verification. It proves that the route can distinguish a real runtime artifact set from the current absence of artifacts.

The result stays closed: no runtime execution packet is created, no live-read gate is opened, and no Java or mini-kv process is started.

## Key files

- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightTypes.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightRenderer.ts`
- `test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight.test.ts`
- `docs/plans3/v394-post-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-roadmap.md`

## Core flow

1. `createSourceArchiveReferences(...)` fixes the v393 archive file list and reads JSON, Markdown, summary, browser snapshot, HTML, screenshot, explanation, code walkthrough, plan index, and archive index.
2. `createSourceNodeV393(...)` extracts the v393 closed-gate state: v394 intake allowed, runtime gate closed, execution packet stopped, and 6 missing artifacts recorded.
3. `replayFromFrozenEvidence(...)` calls the v393 loader again and confirms the frozen replay still preserves the stopped execution packet state.
4. `createSiblingWorkspaceSnapshot(...)` records the latest local Java and mini-kv baselines: Java v161 and mini-kv v152. It also records that Java v162 and mini-kv v153 runtime artifact candidates are absent.
5. `createArtifactRequirements(...)` defines the six Node drop-zone artifacts under `e/394/input/`.
6. `createArtifactIntakePreflight(...)` creates the digest and records that runtime remains blocked because 0/6 artifacts are present.
7. `createChecks(...)` aggregates 43 checks across source archive, replay, local sibling scan, artifact requirement count, blocked runtime boundaries, and production safety flags.

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
npm test -- managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight.test.ts
1 file, 3 tests passed
```

Adjacent tests:

```text
npm test -- managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionPacketStopRecordArchiveVerification.test.ts managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight.test.ts
2 files, 6 tests passed
```

Full test:

```text
npm test
327 files, 1128 tests passed
```

Typecheck and build also passed. HTTP smoke returned JSON 200, Markdown 200, `ready=true`, `runtimeExecutionArtifactsComplete=false`, and 43/43 checks. Browser snapshot and screenshot were generated from the local static archive page.

## Next step

Node v395 should archive and verify the v394 blocked preflight. A future runtime execution packet should require all six concrete artifacts together, not a partial artifact set.
