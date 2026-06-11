# Node v534 code walkthrough: CI/catalog health closeout route archive

## Why This Version Exists

v533 exposed the CI/catalog health closeout over HTTP. v534 freezes that response into files so v535 can verify durable JSON, Markdown, and digest values.

## Archive Files

`e/534/evidence` stores the JSON route response, Markdown route response, and a summary JSON file.

## Summary Shape

The summary records:

- source route and markdown route;
- JSON and Markdown status codes;
- ready state and check counts;
- active/source Node versions;
- planned segment v532-v536;
- closed gate from v527-v531;
- route quality and CI observation;
- route catalog snapshot 221/57/23;
- file sizes and SHA-256 digests;
- runtime boundaries.

## Boundary

The archive uses local Fastify inject only. Java and mini-kv can continue in parallel.
