# v1581 controlled read-only shard preview operator evidence value supply profile section renderer split roadmap

## Scope

Node v1557-v1581 is a maintenance and refactor version range. It does not create another evidence import, value supply, material intake, execution, approval, or governance echo chain. Instead it extracts the Operator Evidence Value Supply profile section rendering out of the live read-only window profile sections renderer.

After v1556, the main renderer still owned four import/value-supply sections: Operator Evidence Import Preflight, Operator Evidence Value Draft, Operator Evidence Fresh Sibling Intake, and Operator Evidence Value Supply Envelope. This range delegates those sections through `controlledReadOnlyShardPreviewOperatorEvidenceValueSupplyProfileSectionRenderer.ts`, then keeps the aggregator thin by splitting actual field rendering into import/value-draft and sibling/envelope profile section renderers.

## Necessity proof

- Blocker resolved: the main profile sections renderer still mixed route orchestration with import and value supply field rendering.
- Later consumer: future value supply or fresh sibling evidence work can extend import or envelope rendering near local boundaries instead of expanding the live-window renderer.
- Existing report cannot be reused: this is not a new evidence report. It is a rendering ownership split that preserves existing route output and fail-closed state.
- Stop condition: do not split another section group until it has separate ownership, tests, or route lifecycle pressure. Do not create new evidence or approval chains without real upstream evidence or a real execution consumer.

## Cross-project parallel plan

Java and mini-kv are recommended parallel. Node v1557-v1581 changes only Node rendering ownership, tests, and catalog metadata. It does not require fresh Java or mini-kv evidence, does not start their services, and does not wait on upstream versions.

Java and mini-kv can continue their own read-only evidence, shard preview, and contract-hardening work. Node is not a pre-approval blocker for them in this range.

## Version split

- v1557 records the no-new-evidence-chain decision.
- v1558 selects the value supply section group as the next renderer boundary.
- v1559 delegates the inline value supply group from the main renderer.
- v1560 creates the value supply profile section aggregator.
- v1561 splits import preflight and value draft rendering.
- v1562 splits fresh sibling intake and value supply envelope rendering.
- v1563 locks the Operator Evidence Import Preflight section and `Node v886` marker.
- v1564 locks the Operator Evidence Value Draft section and `Node v911` marker.
- v1565 locks the Operator Evidence Fresh Sibling Intake section and `Node v936` marker.
- v1566 locks the Operator Evidence Value Supply Envelope section and `Node v961` marker.
- v1567 preserves runtime payload false state.
- v1568 preserves synthetic evidence false state.
- v1569 preserves secret-value false state.
- v1570 records the value supply aggregator in the type module catalog.
- v1571 records the value supply import renderer in the type module catalog.
- v1572 records the value supply envelope renderer in the type module catalog.
- v1573 keeps `profile-entry-types` as the final catalog entry at order 220.
- v1574 updates catalog and validation version to `Node v1581`.
- v1575 preserves route Markdown output.
- v1576 confirms the main renderer line-count reduction.
- v1577 confirms subrenderer size control.
- v1578 documents Java and mini-kv parallel status.
- v1579 documents no live integration startup requirement.
- v1580 applies split verification and cleanup strategy.
- v1581 closes the range and prepares tags.

## Maintenance split

The main live-window renderer owns route section orchestration. The value supply aggregator owns the order of the four value supply sections. The import renderer owns operator evidence import preflight and value draft rendering. The envelope renderer owns fresh sibling intake and value supply envelope rendering.

The type module catalog records the new modules at orders 217, 218, and 219, and moves `profile-entry-types` to order 220.

## Closeout checks

- typecheck
- focused value supply renderer/routes/type-catalog tests
- split full tests before commit
- build
- HTTP smoke after build, with import/value supply sections still visible and fail-closed values preserved
- archive integrity for v1557-v1581 explanation and walkthrough files
- cleanup of `.tmp`, `dist`, and smoke server before final
