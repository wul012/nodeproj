# Node v386 explanation: Java / mini-kv operator service lifecycle evidence intake

## Conclusion

Node v386 completed frozen evidence intake for Java v160 and mini-kv v151.

This version is ready for Node v387 archive verification, but it is not a runtime live-read gate. Java v160 declares an operator-owned lifecycle placeholder; mini-kv v151 is still a template-only record and does not declare owner, port list, GET-only smoke target, or cleanup responsibility.

## Evidence sources

- Node v385 archive verification: `e/385/evidence/java-mini-kv-live-read-gate-plan-intake-archive-verification-v385-http.json`
- Java v160 operator lifecycle evidence: `fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/160/evidence/java-shard-readiness-operator-service-lifecycle-v160.json`
- mini-kv v151 operator lifecycle template: `fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v151.json`
- mini-kv v150 frozen live-read gate plan: `fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v150.json`

## Verification result

```text
HTTP JSON: 200
HTTP Markdown: 200
readyForOperatorServiceLifecycleEvidenceIntake: true
readyForNodeV387ArchiveVerification: true
readyForRuntimeLiveReadGate: false
checks: 45/45
productionBlockers: 0
warningCount: 2
recommendationCount: 1
declaredMiniKvOperatorEvidenceCount: 0
```

## Boundary result

- `evidenceIntakeOnly=true`
- `liveReadGateAllowed=false`
- `runtimeProbeAllowed=false`
- `startsJavaService=false`
- `startsMiniKvService=false`
- `stopsJavaService=false`
- `stopsMiniKvService=false`
- `executionAllowed=false`
- `activeShardPrototypeEnabled=false`

## Browser check

The static archive page was opened through local HTTP:

```text
http://127.0.0.1:8386/java-mini-kv-operator-service-lifecycle-evidence-intake-v386.html
```

Generated files:

- `e/386/evidence/java-mini-kv-operator-service-lifecycle-evidence-intake-v386-browser-snapshot.md`
- `e/386/图片/java-mini-kv-operator-service-lifecycle-evidence-intake-v386.png`

## Next step

Node v387 should archive and verify this v386 intake. Any real runtime live-read gate must wait for declared operator-owned service lifecycle evidence and a separate approved runtime plan.
