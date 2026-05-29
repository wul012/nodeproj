# Node v388 explanation: Java / mini-kv declared operator lifecycle evidence intake

## Conclusion

Node v388 completed frozen evidence intake for Java v161 and mini-kv v152 declared operator lifecycle evidence.

This version is ready for Node v389 archive verification, but it is not a runtime live-read gate. Java and mini-kv now both declare lifecycle ownership evidence; runtime still requires a separate approval record, concrete loopback ports, GET-only smoke command, and cleanup proof.

## Evidence sources

- Node v387 archive verification: `e/387/evidence/java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verification-v387-http.json`
- Java v161 declared lifecycle evidence: `fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/161/evidence/java-shard-readiness-declared-operator-lifecycle-v161.json`
- mini-kv v152 declared lifecycle evidence: `fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v152.json`
- mini-kv v151 frozen operator template: `fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v151.json`

## Verification result

```text
HTTP JSON: 200
HTTP Markdown: 200
readyForDeclaredOperatorLifecycleEvidenceIntake: true
readyForNodeV389ArchiveVerification: true
readyForRuntimeLiveReadGate: false
declaredOperatorLifecycleEvidencePresent: true
runtimeGateRequiresSeparateApproval: true
checks: 45/45
productionBlockers: 0
warningCount: 1
recommendationCount: 1
declaredOperatorEvidenceSourceCount: 2
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
http://127.0.0.1:8388/java-mini-kv-declared-operator-lifecycle-evidence-intake-v388.html
```

Generated files:

- `e/388/evidence/java-mini-kv-declared-operator-lifecycle-evidence-intake-v388-browser-snapshot.md`
- `e/388/图片/java-mini-kv-declared-operator-lifecycle-evidence-intake-v388.png`

## Next step

Node v389 should archive and verify this v388 intake. Any real runtime live-read gate must stay separate from this evidence intake.
