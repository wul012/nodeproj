# 391 Java / mini-kv operator service lifecycle evidence intake v386

## Version progress

Node v386 consumes the next frozen sibling evidence set after v385:

- Node v385 archive verification: `e/385/evidence/java-mini-kv-live-read-gate-plan-intake-archive-verification-v385-http.json`
- Java v160 operator service lifecycle evidence: `fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/160/evidence/java-shard-readiness-operator-service-lifecycle-v160.json`
- mini-kv v151 operator service lifecycle template: `fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v151.json`
- mini-kv v150 frozen live-read gate plan: `fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v150.json`

The version is ready for Node v387 archive verification, but `readyForRuntimeLiveReadGate` remains `false`.

## Key files

- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntake.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntakeEvidence.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntakeRenderer.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntakeTypes.ts`
- `test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvOperatorServiceLifecycleEvidenceIntake.test.ts`
- `docs/plans3/v386-post-java-mini-kv-operator-service-lifecycle-evidence-intake-roadmap.md`

## Flow

1. The route reads Node v385 archive verification from `e/385`.
2. It resolves Java v160, mini-kv v151, and mini-kv v150 through historical fixture fallback.
3. It verifies Java v160 is operator-owned but still blocks Node start/stop and runtime probes.
4. It verifies mini-kv v151 is template-only, requires operator evidence, and declares no runtime owner/port/smoke/cleanup yet.
5. It verifies mini-kv v150 remains the frozen live-read gate plan baseline.
6. It returns an intake profile that is ready for v387 archive verification and still blocks runtime live read.

## Boundary result

```text
Starts Java: false
Starts mini-kv: false
Stops Java: false
Stops mini-kv: false
Runtime probe: false
Managed audit connection: false
Credential value read: false
Raw endpoint parsed: false
Active shard prototype: false
Runtime live-read gate: false
```

## Verification result

Focused v386 test passed: 3/3.
Typecheck passed.
The archive and final smoke checks are recorded under `e/386`.

## Project maturity

v386 makes the dependency state explicit: Java has an operator-owned lifecycle placeholder, but mini-kv still provides only a template. This prevents the next Node step from accidentally treating template evidence as runtime approval.
