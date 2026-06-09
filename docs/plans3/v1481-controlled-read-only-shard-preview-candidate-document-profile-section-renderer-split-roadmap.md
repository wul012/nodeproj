# v1481 controlled read-only shard preview candidate document profile section renderer split roadmap

## Scope

Node v1457-v1481 is a maintenance and refactor version range. It does not create another candidate document material echo chain after v1456. Instead it extracts the candidate document profile section rendering out of the giant live read-only window profile sections renderer.

The source renderer had grown to almost two thousand lines and carried five candidate document section entry builders at the end of the file. This range moves those five sections into `controlledReadOnlyShardPreviewCandidateDocumentProfileSectionRenderer.ts`, keeps route-facing Markdown stable, updates the type module catalog to `Node v1481`, and adds focused coverage for the extracted renderer boundary.

## Necessity proof

- Blocker resolved: the main profile sections renderer was becoming a maintenance bottleneck for future candidate document material intake work.
- Later consumer: a future reviewed real material submission or intake feature can add candidate document material sections near the local renderer boundary instead of expanding the giant live-window file.
- Existing report cannot be reused: this is not a new evidence report. It is a routing and rendering ownership split that preserves the existing report output.
- Stop condition: do not split more profile sections until another section group becomes independently owned or gains separate route/testing lifecycle.

## Cross-project parallel plan

Java and mini-kv are recommended parallel. Node v1457-v1481 changes only Node rendering ownership and catalog metadata. It does not require fresh Java or mini-kv evidence, does not start their services, and does not wait on upstream versions.

Java and mini-kv can continue read-only evidence handle and shard preview work. Node is not a pre-approval blocker for them in this range.

## Version split

- v1457 records the no-new-echo decision after v1456.
- v1458 creates the candidate document profile section renderer boundary.
- v1459 migrates candidate document request package section rendering.
- v1460 migrates candidate document submission precheck section rendering.
- v1461 migrates candidate document intake packet section rendering.
- v1462 migrates candidate document material request package section rendering.
- v1463 migrates candidate document material submission precheck section rendering.
- v1464 preserves candidate document section ordering.
- v1465 adds focused renderer coverage.
- v1466 locks material request route-facing fields.
- v1467 locks material submission precheck route-facing fields.
- v1468 records the new renderer in the type module catalog.
- v1469 keeps profile-entry-types as the final catalog entry.
- v1470 updates catalog and validation version to `Node v1481`.
- v1471 preserves route Markdown output.
- v1472 verifies type-only boundary compatibility.
- v1473 confirms the main renderer line-count reduction.
- v1474 confirms no runtime behavior is added.
- v1475 documents Java and mini-kv parallel status.
- v1476 documents no live integration startup requirement.
- v1477 applies cleanup and temporary artifact rules.
- v1478 runs split full tests instead of one large test blast.
- v1479 runs build and HTTP smoke.
- v1480 completes archive integrity.
- v1481 closes the range and prepares tags.

## Maintenance split

The candidate document profile section renderer owns section headings and field entry rendering for the five candidate document route sections. The main live-window renderer now delegates that group through one imported function.

The type module catalog records the new module at order 209 and moves `profile-entry-types` to order 210.

## Closeout checks

- typecheck
- focused renderer/routes/type-catalog tests
- full test chunks before commit
- build
- HTTP smoke after build, with the v1456 material submission precheck still visible and fail-closed under disabled upstream probes
- archive integrity for v1457-v1481 explanation and walkthrough files
- cleanup of `.tmp`, `dist`, and smoke server before final
