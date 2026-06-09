# v1531 controlled read-only shard preview signed approval artifact draft text package profile section renderer split roadmap

## Scope

Node v1507-v1531 is a maintenance and refactor version range. It does not create another signed approval, material intake, execution, approval, or governance echo chain. Instead it extracts the Signed Approval Capture Artifact Draft Text Package profile section rendering out of the giant live read-only window profile sections renderer.

The previous v1506 split removed the first signed approval artifact draft section group. The main renderer still owned nine text package sections and their field-entry helpers. This range delegates those sections through `controlledReadOnlyShardPreviewSignedApprovalArtifactDraftTextPackageProfileSectionRenderer.ts`, then keeps the aggregator thin by splitting actual field rendering into submission and compared-evidence profile section renderers.

## Necessity proof

- Blocker resolved: the main profile sections renderer still mixed route orchestration with hundreds of lines of text package field rendering.
- Later consumer: future reviewed material comparison and candidate intake work can extend compared-evidence rendering near a local boundary instead of expanding the live-window renderer.
- Existing report cannot be reused: this is not a new evidence report. It is a rendering ownership split that preserves existing route output and fail-closed state.
- Stop condition: do not split another section group until it has separate ownership, tests, or route lifecycle pressure. Do not create new approval chains without real upstream evidence or a real execution consumer.

## Cross-project parallel plan

Java and mini-kv are recommended parallel. Node v1507-v1531 changes only Node rendering ownership, tests, and catalog metadata. It does not require fresh Java or mini-kv evidence, does not start their services, and does not wait on upstream versions.

Java and mini-kv can continue their own read-only evidence, shard preview, and contract-hardening work. Node is not a pre-approval blocker for them in this range.

## Version split

- v1507 records the no-new-chain decision.
- v1508 selects the text package section group as the next renderer boundary.
- v1509 delegates the inline text package group from the main renderer.
- v1510 creates the text package profile section aggregator.
- v1511 splits submission-side text package rendering.
- v1512 splits compared-evidence text package rendering.
- v1513 locks the Text Package Intake section and `Node v1236` marker.
- v1514 locks the Text Package Review Preflight section and `Node v1261` marker.
- v1515 locks the Text Package Submission Preflight section and `Node v1286` marker.
- v1516 locks the Text Package Comparison Preflight section and `Node v1311` marker.
- v1517 locks the Text Package Comparison Acceptance Precheck section and `Node v1321` marker.
- v1518 locks the Compared Package Evidence Intake section and `Node v1331` marker.
- v1519 locks the Compared Evidence Evaluation Preflight section and `Node v1351` marker.
- v1520 locks the Compared Evidence Candidate section and `Node v1361` marker.
- v1521 locks the Compared Evidence Candidate Intake section and `Node v1371` marker.
- v1522 preserves fail-closed signed approval, runtime payload, and secret-value states.
- v1523 records the text package aggregator in the type module catalog.
- v1524 records the text package submission renderer in the type module catalog.
- v1525 records the text package compared-evidence renderer in the type module catalog.
- v1526 keeps `profile-entry-types` as the final catalog entry at order 214.
- v1527 updates catalog and validation version to `Node v1531`.
- v1528 preserves route Markdown output.
- v1529 confirms the main renderer line-count reduction.
- v1530 applies split verification and cleanup strategy.
- v1531 closes the range and prepares tags.

## Maintenance split

The main live-window renderer owns route section orchestration. The text package aggregator owns the order of the nine text package sections. The submission renderer owns the first five intake/submission/comparison sections. The compared-evidence renderer owns the four compared package evidence and candidate sections.

The type module catalog records the new modules at orders 211, 212, and 213, and moves `profile-entry-types` to order 214.

## Closeout checks

- typecheck
- focused text package renderer/routes/type-catalog tests
- split full tests before commit
- build
- HTTP smoke after build, with text package sections still visible and fail-closed values preserved
- archive integrity for v1507-v1531 explanation and walkthrough files
- cleanup of `.tmp`, `dist`, and smoke server before final
