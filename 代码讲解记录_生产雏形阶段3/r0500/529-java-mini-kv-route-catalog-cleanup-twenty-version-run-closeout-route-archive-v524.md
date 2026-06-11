# Node v524 code walkthrough: twenty-version run closeout route archive

## Why This Version Exists

v523 exposed the closeout over HTTP. v524 freezes that response into files so later verification can compare durable JSON, Markdown, and digest values instead of depending on a live route call.

## Archive Files

`e/524/evidence` stores the JSON route response, Markdown route response, and a summary JSON file.

## Summary Shape

The summary records:

- source route and markdown route;
- JSON and Markdown status codes;
- ready state and check counts;
- active/source Node versions;
- completed and remaining version lists;
- route catalog snapshot from v522;
- v520 stability verifier readiness;
- file sizes and SHA-256 digests;
- runtime boundaries.

## Boundary

The archive uses local Fastify inject only. Java and mini-kv can keep moving in parallel because no fresh sibling evidence is consumed.
