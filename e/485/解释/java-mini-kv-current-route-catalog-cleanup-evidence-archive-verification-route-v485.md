# v485 Java / mini-kv current route catalog cleanup evidence archive verification route

Node v485 exposes the v484 archive verifier through the existing cleanup route group.

## Result

The new verifier route returns JSON and Markdown 200, ready true, and 16/16 verifier checks. The global audit JSON/Markdown route count is now 203, with 39 Java/mini-kv domain routes.

## Validation

- `npm test -- test/auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.test.ts test/javaMiniKvRouteCatalogCleanupCurrentEvidenceArchiveVerification.test.ts test/auditJsonMarkdownRouteGroups.test.ts test/managedAuditRouteRegistrationTableQualityPass.test.ts`
- `npm run typecheck`
- `npm run build`
- Fastify inject smoke: JSON 200, Markdown 200, ready true, 16/16 checks.

## Boundaries

This route reads local Node archive files only. It does not consume Java v218-like or mini-kv v202-like dirty work, does not start sibling services, and does not open runtime execution.
