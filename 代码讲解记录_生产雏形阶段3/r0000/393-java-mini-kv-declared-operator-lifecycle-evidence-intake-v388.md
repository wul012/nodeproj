# 393 Java / mini-kv declared operator lifecycle evidence intake v388

## Version progress

Node v388 consumes the declared lifecycle evidence produced after v387:

- Source Node archive: `e/387/evidence/java-mini-kv-operator-service-lifecycle-evidence-intake-archive-verification-v387-http.json`
- Java v161 declared lifecycle evidence: `fixtures/historical/sibling-workspaces/javaproj/advanced-order-platform/e/161/evidence/java-shard-readiness-declared-operator-lifecycle-v161.json`
- mini-kv v152 declared lifecycle evidence: `fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v152.json`
- mini-kv v151 frozen template evidence: `fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v151.json`

The version is ready for Node v389 archive verification, but `readyForRuntimeLiveReadGate` remains `false`.

## Key files

- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntake.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntakeEvidence.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntakeRenderer.ts`
- `src/services/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntakeTypes.ts`
- `test/managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvDeclaredOperatorLifecycleEvidenceIntake.test.ts`
- `docs/plans3/v388-post-java-mini-kv-declared-operator-lifecycle-evidence-intake-roadmap.md`

## Flow

1. The route reads Node v387 archive verification from `e/387`.
2. It resolves Java v161, mini-kv v152, and mini-kv v151 through historical fixture fallback.
3. It verifies Java v161 declares owner, startup command, port, GET-only smoke, cleanup, and fail-closed behavior.
4. It verifies mini-kv v152 declares matching lifecycle evidence while keeping runtime approval false.
5. It verifies mini-kv v151 remains the frozen operator-template baseline.
6. It returns an intake profile that is ready for v389 archive verification and still blocks runtime live read.

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

Focused v388 test passed: 3/3.
Typecheck passed.
The archive and final smoke checks are recorded under `e/388`.

## Project maturity

v388 moves the chain beyond template-only evidence: both Java and mini-kv now declare lifecycle ownership. The next required distinction is runtime approval, which is still intentionally separate.
