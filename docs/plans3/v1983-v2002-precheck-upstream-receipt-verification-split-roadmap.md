# v1983-v2002 precheck upstream receipt verification split roadmap

## Scope

Node-only maintenance batch. This batch splits `managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification.ts` from a 914-line mixed service into a small entrypoint plus focused type, constant, reference, policy, core, and renderer modules.

## Necessity proof

- Blocker resolved: the v247 verification service mixed historical evidence reads, JSON parsing helpers, safety policy, digest/profile assembly, and Markdown rendering in one large file.
- Later consumer: `managedAuditSandboxCodeHealthPass` and `managedAuditManualSandboxConnectionRehearsalGuard` continue to consume the same loader and route shape, but now their source safety scan covers the split module family.
- Existing report reuse: this does not add another governance echo chain. It keeps the same v247 report and only improves maintainability plus stale inventory accuracy.
- Stop condition: no new readiness layer is introduced; after the module family is below service-size limits and downstream scans pass, the chain stops.

## Cross-project planning

Java and mini-kv are recommended parallel. Node consumes frozen Java v99 and mini-kv v108 evidence through existing local/historical fixture resolution. This batch does not require fresh upstream versions, live service startup, new ports, or cross-project writes.

## Version map

- v1983: record the split boundary and keep the public loader/render exports stable.
- v1984: move profile, receipt, evidence, snippet, message, and check types into a dedicated types module.
- v1985: move fixed evidence paths, endpoint paths, and Node v245 precheck shape constants into a constants module.
- v1986: move the Node v245 source adapter into the references module.
- v1987: move the Java v99 receipt reference builder into the references module.
- v1988: move the mini-kv v108 non-participation reference builder into the references module.
- v1989: keep evidence-file, snippet, JSON, and field helper functions private to references.
- v1990: move check construction into a policy module.
- v1991: move blockers, warnings, and recommendations into the policy module.
- v1992: move digest, receiptVerification, summary, endpoints, and nextActions assembly into a core module.
- v1993: move Markdown rendering into a renderer module.
- v1994: leave the entrypoint as orchestration only and preserve import compatibility for routes/tests.
- v1995: update code-health scanning from a single source file to the whole v247 module family.
- v1996: remove the now-split v247 service from the live large-file inventory.
- v1997: verify the direct v247 service tests including forced historical fixture fallback.
- v1998: verify downstream v248 code-health behavior after inventory and scan updates.
- v1999: verify downstream rehearsal guard behavior still reaches ready state.
- v2000: run strict TypeScript typecheck and production build.
- v2001: stage, commit, tag, push, and watch CI.
- v2002: close out with cleanup and no local long-running processes.

## Local verification

- `npm exec vitest run test/managedAuditManualSandboxConnectionPrecheckUpstreamReceiptVerification.test.ts test/managedAuditManualSandboxConnectionRehearsalGuard.test.ts test/managedAuditSandboxCodeHealthPass.test.ts -- --testTimeout=180000`
- `npm run typecheck`
- `npm run build`
