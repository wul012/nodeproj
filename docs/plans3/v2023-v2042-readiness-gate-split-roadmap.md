# v2023-v2042 readiness gate split roadmap

## Scope

Node-only refactor and maintenance batch. This batch splits `managedAuditManualSandboxConnectionReadinessGate.ts` from an 886-line mixed readiness gate into a small compatibility entrypoint plus focused type, constant, reference, core, policy, and renderer modules.

## Necessity proof

- Blocker resolved: the readiness gate mixed profile types, sibling evidence paths, Node source adaptation, Java v92 evidence parsing, mini-kv v101 follow-up parsing, gate digest creation, check policy, Markdown rendering, and JSON helper functions in one file.
- Later consumer: `managedAuditManualSandboxConnectionOperatorWindowChecklist` still consumes the same public loader and profile contract, including `sourceNodeV237`, `gateDigest`, and readiness flags.
- Existing report reuse: this does not add a new gate, route, echo, readiness report, or approval layer. It only splits the existing v237 readiness gate implementation.
- Stop condition: the entrypoint is orchestration only, every split module is below 320 lines, focused/downstream tests pass, typecheck/build pass, and CI passes.

## Cross-project planning

Java and mini-kv are recommended parallel. Node consumes existing Java v92 and mini-kv v101 evidence through existing historical evidence resolution. This batch does not require fresh sibling versions, live service startup, new ports, or cross-project writes.

## Version map

- v2023: preserve the public readiness gate entrypoint and route contract.
- v2024: move profile, evidence, snippet, check, message, and JSON helper contracts into a types module.
- v2025: move Java v92, mini-kv v101, endpoint, accepted follow-up, and SHA constants into a constants module.
- v2026: move Node v236 source adaptation into the references module.
- v2027: move Java v92 echo receipt parsing into the references module.
- v2028: move mini-kv v101 no-start/no-write follow-up parsing into the references module.
- v2029: keep evidence file, snippet, JSON, and primitive field readers private to references.
- v2030: move readiness gate digest construction into the core module.
- v2031: move final profile assembly and summary counting into the core module.
- v2032: move check construction into the policy module.
- v2033: move blockers, warnings, recommendations, and blocker insertion helper into the policy module.
- v2034: move Markdown rendering and evidence/snippet render helpers into the renderer module.
- v2035: keep loader orchestration in the entrypoint only.
- v2036: verify direct readiness gate behavior and blocked upstream actions.
- v2037: verify downstream operator window checklist behavior.
- v2038: verify operator window evidence and precondition intake downstream behavior.
- v2039: run strict TypeScript typecheck.
- v2040: run production build.
- v2041: stage, commit, tag, push, and watch CI.
- v2042: close out with cleanup and no local long-running processes.

## Local verification

- `npm exec vitest run test/managedAuditManualSandboxConnectionReadinessGate.test.ts test/managedAuditManualSandboxConnectionOperatorWindowChecklist.test.ts test/managedAuditManualSandboxConnectionOperatorWindowEvidenceVerification.test.ts test/managedAuditManualSandboxConnectionPreconditionIntake.test.ts -- --testTimeout=180000`
- `npm run typecheck`
- `npm run build`
