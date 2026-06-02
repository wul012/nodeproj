# Node v550 explanation: extended closeout route-count stabilization

v550 fixes the CI failure observed after v547 exposed one more cleanup audit route.

The failing assertion was in `test/javaMiniKvRouteCatalogCleanupExtendedRunFinalCloseout.test.ts`. The production closeout service already reads the current managed route-quality profile and only requires the active route registration count to remain at or above the v537 baseline. The test, however, still pinned the current route registration count to `225`. After v547, the current route table legitimately moved to `226`, so CI failed even though the service behavior was healthy.

## Change

- Removed the brittle exact `routeRegistrationCount: 225` assertion from the v537 extended closeout test.
- Added an explicit baseline check that the current route registration count is greater than or equal to the historical route catalog count recorded by the closeout.
- Kept the existing checks for readiness, route group count, catalog integrity, route-table/catalog alignment, completed version list, and rendered Markdown signal.

## Cross-project plan

Java and mini-kv are recommended parallel for this version. Node does not need fresh sibling evidence and does not require Java or mini-kv service startup. This version only stabilizes Node CI around a route-count growth expectation.

## Validation

- `npm.cmd test -- test\javaMiniKvRouteCatalogCleanupExtendedRunFinalCloseout.test.ts test\managedAuditRouteRegistrationTableQualityPass.test.ts test\auditJsonMarkdownRouteGroups.test.ts`

Next step: v551 should expose the v549 archive verifier through the cleanup route group, then update the current route catalog counts to the new total.
