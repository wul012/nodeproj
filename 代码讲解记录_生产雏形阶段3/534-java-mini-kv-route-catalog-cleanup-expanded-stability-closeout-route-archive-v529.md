# Node v529 code walkthrough: expanded stability closeout route archive

## Why This Version Exists

v528 exposed the expanded stability closeout over HTTP. v529 freezes that response into files so v530 can verify durable JSON, Markdown, and digest values.

## Archive Files

`e/529/evidence` stores the JSON route response, Markdown route response, and a summary JSON file.

## Summary Shape

The summary records:

- source route and markdown route;
- JSON and Markdown status codes;
- ready state and check counts;
- active/source Node versions;
- planned segment v527-v531;
- closed gate from v522-v526;
- route catalog snapshot 219/55/21;
- file sizes and SHA-256 digests;
- runtime boundaries.

## Boundary

The archive uses local Fastify inject only. Java and mini-kv can continue in parallel.
