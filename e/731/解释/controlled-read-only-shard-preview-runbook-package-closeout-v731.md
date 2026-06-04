# v731 Controlled read-only shard preview runbook package closeout

v731 closes the operator runbook package.

The package consumes the v711 stage ledger and records twenty ordered sections from Node v712-v731. It verifies source stage readiness, section count, version order, stage mapping, read-only safety, no writes, no automatic service start, cleanup instructions, Node/Java/mini-kv target coverage, and production execution still blocked.

Growth control:

- blocker resolved: v711 had a stage ledger but no operator-consumable runbook package;
- later consumer: the next live read-only window can use this package as the direct manual checklist;
- reuse decision: the package consumes the stage ledger and does not create a new route or service start path;
- stop condition: the package reports `startsServices=false` and remains planning-only.

Verification:

- `npm.cmd run typecheck`
- focused runbook/stage-ledger/catalog/barrel tests: 4 files, 23 tests passed.
- adjacent controlled-preview tests: 14 files, 50 tests passed.
- `npm.cmd run build`

No screenshot was needed because v731 adds service artifacts and Markdown rendering without a new page.
