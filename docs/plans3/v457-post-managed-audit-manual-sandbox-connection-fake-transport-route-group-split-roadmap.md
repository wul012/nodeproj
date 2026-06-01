# v457 managed audit manual sandbox connection fake transport route group split roadmap

## Pre-Plan Cross-Project Check

Before writing this plan, Node inspected Java and mini-kv read-only.

- Java: `D:\javaproj` is clean at `5975173b`, tag `v186-order-platform-shard-readiness-historical-endpoint-snapshot-compatibility`. Java v186 added historical endpoint snapshot compatibility tests over v179 and v184. Java can continue in parallel with read-only endpoint registry / historical snapshot quality work.
- mini-kv: `D:\C\mini-kv` is clean at `33d90e9`, tag `第一百七十五版Node路由拆分窗口扩展至v449`. mini-kv v175 extends the read-only Node route split compatibility window through Node v449. mini-kv can continue in parallel by extending that window through Node v450-v457.
- Node dependency decision: v457 is a Node route-table refactor only. It does not need fresh Java or mini-kv evidence and is not a pre-approval blocker for either project.

## Scope

Node v457 extracts the managed audit manual sandbox connection fake-transport dry-run packet, archive verification, and upstream echo verification audit JSON/Markdown route registrations from `src/routes/auditJsonMarkdownRoutes.ts` into `src/routes/auditManagedAuditManualSandboxConnectionFakeTransportRoutes.ts`.

The extracted group contains the existing fake-transport packet chain for the manual sandbox connection flow.

This is a maintainability refactor only. It does not add a new evidence gate, does not change any API path, and does not start Java or mini-kv.

## Process Rule Correction

v457 also updates `AGENTS.md` so future Node successor plans must inspect Java and mini-kv progress before writing the plan and must record concrete cross-project continuation guidance.

## Necessity Proof

- Blocker resolved: after v456, the central route table still directly owned the final fake-transport manual sandbox connection route registrations.
- Later consumer: the route table can finish the managed-audit/manual-sandbox split campaign with only foundational store/readiness routes still direct.
- Reuse check: existing `auditJsonMarkdownRoute(...)` and `AuditJsonMarkdownRouteRegistration` remain the shared registration API; no new registrar abstraction is introduced.
- Growth stop: v457 stops at route registration extraction, the process-rule correction, and focused route regression coverage. It does not introduce another approval, readiness, runtime, or receipt chain.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel.

- Java next direction: continue read-only endpoint registry / historical snapshot quality work after Java v186 if that project keeps advancing.
- mini-kv next direction: extend `nodeRouteSplitCompatibilityWindow` from Node v449 through Node v450-v457, preserving no service startup, no active router, no write routing, no LOAD / RESTORE / COMPACT, and no runtime execution.
- Node v457 is not an upstream pre-approval blocker.

## Validation Result

- Focused managed audit manual sandbox connection fake-transport route-group regression test passed: 1 file / 1 test.
- Adjacent fake-transport tests passed: 4 files / 11 tests.
- Typecheck passed.
- Build passed.
- Full Vitest passed: 390 files / 1216 tests.
- Browser screenshot is not required because v457 does not add or change a renderable UI page.
