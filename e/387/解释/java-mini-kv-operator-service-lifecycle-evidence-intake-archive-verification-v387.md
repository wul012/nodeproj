# Node v387 explanation: Java / mini-kv operator service lifecycle evidence intake archive verification

## Conclusion

Node v387 completed archive verification for the Node v386 operator service lifecycle evidence intake.

This version verifies the archive only. It does not start Java, start mini-kv, run runtime probes, connect managed audit, or enable active shard routing. The replay confirms that mini-kv v151 remains template-only and `readyForRuntimeLiveReadGate` remains `false`.

## Evidence sources

- Node v386 JSON: `e/386/evidence/java-mini-kv-operator-service-lifecycle-evidence-intake-v386-http.json`
- Node v386 Markdown: `e/386/evidence/java-mini-kv-operator-service-lifecycle-evidence-intake-v386-http.md`
- Node v386 summary: `e/386/evidence/java-mini-kv-operator-service-lifecycle-evidence-intake-v386-summary.json`
- Node v386 screenshot / explanation / code walkthrough / plan indexes
- Replay inputs: Java v160, mini-kv v151, and mini-kv v150 frozen historical fixtures

## Verification result

```text
HTTP JSON: 200
HTTP Markdown: 200
readyForOperatorServiceLifecycleEvidenceIntakeArchiveVerification: true
readyForNodeV388DeclaredOperatorEvidenceOrRuntimeGate: true
readyForRuntimeLiveReadGate: false
checks: 37/37
replay: ready
replay checks: 45/45
productionBlockers: 0
warningCount: 2
recommendationCount: 1
declaredMiniKvOperatorEvidenceCount: 0
```

## Boundary result

- `archiveVerificationOnly=true`
- `rerunsLiveRead=false`
- `startsJavaService=false`
- `startsMiniKvService=false`
- `stopsJavaService=false`
- `stopsMiniKvService=false`
- `executionAllowed=false`
- `activeShardPrototypeEnabled=false`
- `readyForRuntimeLiveReadGate=false`

## Browser check

The static archive page was opened through local HTTP:

```text
http://127.0.0.1:8387/java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verification-v387.html
```

Generated files:

- `e/387/evidence/java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verification-v387-browser-snapshot.md`
- `e/387/图片/java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verification-v387.png`

## Next step

Node should pause before runtime unless mini-kv replaces the v151 template with declared operator-owned service lifecycle evidence. Java and mini-kv can continue in parallel; this v387 archive verification is not a runtime approval.
