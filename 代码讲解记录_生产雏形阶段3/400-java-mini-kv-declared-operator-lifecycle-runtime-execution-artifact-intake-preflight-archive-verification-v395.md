# Node v395 code walkthrough: Java / mini-kv declared operator lifecycle runtime execution artifact intake preflight archive verification

## Version progress

Node v395 verifies and archives the Node v394 runtime execution artifact intake preflight. It reads the v394 JSON, Markdown, summary, browser snapshot, HTML, screenshot, explanation, code walkthrough, source plan, plan index, and archive index, then replays the v394 loader once more.

The result stays closed: the artifact set is still 0/6, no runtime execution packet is created, and no Java or mini-kv process is started.

## Key files

- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightArchiveVerificationTypes.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightArchiveVerification.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightArchiveVerificationRenderer.ts`
- `test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightArchiveVerification.test.ts`
- `docs/plans3/v395-post-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verification-roadmap.md`

## Core flow

1. `createArchiveReferences(...)` fixes the v394 archive file list and requires 11 source archive files to exist.
2. `createSourceNodeV394(...)` extracts the blocked preflight state, artifact intake digest, source digests, 0/6 artifact counts, and missing reason codes from v394 JSON.
3. `replayFromFrozenEvidence(...)` calls the v394 preflight loader again and confirms the replay still has `readyForRuntimeExecutionPacket=false` and 0/6 artifacts.
4. `createArchiveVerification(...)` builds the v395 archive verification digest and records that it does not rerun live read, start upstream services, or write upstream state.
5. `createChecks(...)` aggregates 37 checks covering v394 archive presence, summary consistency, Markdown route output, browser materials, explanation, walkthrough, indexes, replay, and closed runtime boundaries.

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
npm test -- managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightArchiveVerification.test.ts
1 file, 3 tests passed
```

Adjacent tests:

```text
npm test -- managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflight.test.ts managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleRuntimeExecutionArtifactIntakePreflightArchiveVerification.test.ts
2 files, 6 tests passed
```

Full test:

```text
npm test
328 files, 1131 tests passed
```

Typecheck and build also passed. HTTP smoke returned JSON 200, Markdown 200, `ready=true`, `runtimeExecutionArtifactsComplete=false`, and 37/37 checks. Browser snapshot and screenshot were generated from the local static archive page.

## Next step

Node v396 should only retry runtime execution artifact intake if all six concrete artifacts are supplied together.
