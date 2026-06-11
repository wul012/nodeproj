# Node v507 code walkthrough: fresh baseline evidence intake

## Why This Version Exists

Java and mini-kv advanced after Node v505. Java is now clean through v239, and mini-kv is clean through v220. Node can therefore start a new evidence intake instead of continuing to describe v232/v213 as dirty or unavailable.

## Service

`javaMiniKvRouteCatalogCleanupFreshBaselineEvidence.ts` reads two sibling evidence groups:

- Java v232-v239 JSON receipts;
- mini-kv v213-v220 post-closeout continuity fixtures.

The service keeps the same defensive posture as earlier intake services: it reads files, extracts stable fields, calculates checks, and returns a summary. It does not register routes or run upstream services.

## Frozen v220 Handling

mini-kv v220 is represented by the current rolling `shard-readiness.json` in the mini-kv repository. Node freezes that file as:

`fixtures/historical/sibling-workspaces/mini-kv/fixtures/release/shard-readiness-v220-node-v507.json`

That avoids treating a future rolling `shard-readiness.json` as historical v220 evidence.

## Checks

The service verifies:

- all 16 files are present;
- Java receipts cover v232-v239 and each has passed/read-only/no-execution boundaries;
- mini-kv releases cover v213-v220 and stage sequences 13 through 20;
- v220 is consumed from a Node-frozen historical file;
- no Java or mini-kv runtime authority is opened.

## Validation

The focused test covers both normal local resolution and forced historical fallback. The fallback assertion confirms every resolved path is under `fixtures/historical/sibling-workspaces`.
