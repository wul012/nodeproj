# v2043-v2057 disabled candidate upstream echo split roadmap

## Scope

Node-only refactor and maintenance batch. This batch splits `managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification.ts` from an 874-line mixed implementation into a compatibility entrypoint plus focused constants, references, policy, core, existing types, and existing renderer modules.

## Necessity proof

- Blocker resolved: the disabled candidate upstream echo verification mixed route constants, sibling evidence paths, Node v273 adaptation, Java v113 snippet matching, mini-kv v120 receipt parsing, cross-source checks, blocker policy, recommendations, digest construction, and profile assembly in one file.
- Later consumer: `managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification` imports the same public loader and depends on the v274 profile shape staying stable.
- Existing report reuse: this does not add a new gate, route, echo, readiness report, approval layer, or runtime execution path. It only splits the existing disabled-candidate upstream echo verification implementation.
- Stop condition: the public entrypoint keeps loader/renderer/type exports, the largest split module is below 400 lines, direct and downstream tests pass, typecheck/build pass, CI passes, and local cleanup leaves no build output or test processes.

## Cross-project planning

Java and mini-kv are recommended parallel. Node consumes existing Java v113 and mini-kv v120 evidence through current file and historical evidence resolution. This batch does not require fresh sibling versions, live Java/mini-kv service startup, new ports, or cross-project writes.

## Version map

- v2043: preserve the public disabled candidate upstream echo verification entrypoint and route contract.
- v2044: move profile, route, sibling evidence, and boundary-code constants into a dedicated constants module.
- v2045: isolate Node v273 source adaptation in references so downstream checks do not know source profile internals.
- v2046: isolate Java v113 evidence-file and snippet verification in references.
- v2047: isolate mini-kv v120 receipt parsing and non-participation evidence in references.
- v2048: keep historical evidence helpers private to the references module.
- v2049: move cross-source alignment checks into a policy module.
- v2050: move production blocker construction into the policy module.
- v2051: move warning and recommendation construction into the policy module.
- v2052: keep verification digest construction in the core assembly module.
- v2053: keep final profile and summary assembly in the core module.
- v2054: reduce the original file to compatibility exports for loader, renderer, and profile types.
- v2055: verify direct disabled-candidate upstream echo behavior after the split.
- v2056: verify approval-required boundary downstream consumption after the split.
- v2057: close the batch with typecheck, build, CI, tags, and cleanup.

## Local verification

- `npm run typecheck`
- `npm exec vitest run test/managedAuditManualSandboxConnectionCredentialResolverDisabledCandidateUpstreamEchoVerification.test.ts test/managedAuditManualSandboxConnectionCredentialResolverApprovalRequiredBoundaryUpstreamEchoVerification.test.ts -- --testTimeout=180000`
- `npm run build`
