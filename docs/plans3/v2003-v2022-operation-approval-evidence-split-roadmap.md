# v2003-v2022 operation approval evidence split roadmap

## Scope

Node-only maintenance batch. This batch splits `operationApprovalEvidence.ts` from a 904-line mixed approval-evidence service into a small public compatibility entrypoint plus focused service, report, verification, renderer, reader, type, and constants modules.

## Necessity proof

- Blocker resolved: operation approval evidence mixed upstream probe collection, report creation, digesting, verification, Markdown rendering, Java detail readers, mini-kv detail readers, and low-level stable JSON helpers in one large file.
- Later consumer: operation approval routes, execution gate archive routes, handoff bundle, and execution gate preview keep importing the public `operationApprovalEvidence.js` module while implementation details move behind it.
- Existing report reuse: this batch adds no new approval gate, echo chain, readiness report, or route. It only splits the existing evidence service and preserves existing report shapes.
- Stop condition: the public entrypoint is under 20 lines, every split file is under 220 lines, focused/downstream approval tests pass, typecheck/build pass, and CI passes.

## Cross-project planning

Java and mini-kv are recommended parallel. This batch does not require fresh Java or mini-kv versions, live sibling service startup, new ports, or upstream writes. Existing tests use local mocks for probe behavior; production behavior remains controlled by existing `UPSTREAM_PROBES_ENABLED` and `UPSTREAM_ACTIONS_ENABLED` configuration.

## Version map

- v2003: record public entrypoint compatibility for approval evidence routes and downstream bundles.
- v2004: move evidence state, digest, upstream evidence, report, and verification contracts into a types module.
- v2005: move digest covered-field constants into a constants module.
- v2006: move upstream probe collection into `operationApprovalEvidenceService.ts`.
- v2007: move report assembly, summary creation, default upstream evidence, state resolution, next actions, and evidence digesting into a report module.
- v2008: move digest verification and cross-summary consistency checks into a verification module.
- v2009: move Markdown renderers into a renderer module.
- v2010: move Java approval-status detail readers into the shared readers module.
- v2011: move Java execution-contract detail readers into the shared readers module.
- v2012: move mini-kv EXPLAINJSON detail readers into the shared readers module.
- v2013: move mini-kv CHECKJSON detail readers and validators into the shared readers/verification boundary.
- v2014: move failed-event id inference and mini-kv command inference into the readers module.
- v2015: keep stable JSON and primitive record helpers shared only where digest/verification requires them.
- v2016: keep route imports unchanged through the compatibility entrypoint.
- v2017: verify direct operation approval evidence route tests.
- v2018: verify downstream execution gate archive route tests.
- v2019: verify request/decision approval route tests used by the evidence chain.
- v2020: run strict TypeScript typecheck and production build.
- v2021: stage, commit, tag, push, and watch CI.
- v2022: close out with cleanup and no local long-running processes.

## Local verification

- `npm exec vitest run test/operationApprovalEvidence.test.ts test/operationApprovalExecutionGateArchive.test.ts test/operationApprovalRequest.test.ts test/operationApprovalDecision.test.ts -- --testTimeout=180000`
- `npm run typecheck`
- `npm run build`
