# v408 Java / mini-kv runtime execution pass evidence archive verification roadmap

## Scope

Node v408 verifies the v407 approved local-loopback read-only smoke archive. It reads archived JSON/Markdown/screenshot/cleanup proof files only and does not rerun Java or mini-kv smoke.

## Necessity Proof

- Blocker resolved: v407 captured pass evidence and cleanup proof; v408 proves those artifacts are present, internally consistent, and safe to consume.
- Later consumer: Node v409 can close out the pass evidence chain without rerunning runtime probes.
- Reuse check: v407 route proves runtime behavior; v408 verifies archive completeness and cleanup proof, which the live route does not own.
- Growth stop: after v408, do closeout or stop. Do not add another gate unless archive verification fails.

## Cross-Project Parallel Mode

Java and mini-kv are recommended parallel. v408 is Node archive verification only and is not a pre-approval blocker for upstream project work.

## Validation Plan

- Focused v408 tests.
- Adjacent v407+v408 tests.
- Typecheck and build.
- HTTP smoke on Node port `4408`, JSON and Markdown.
- Playwright MCP screenshot of the v408 archive HTML.
- Full Vitest shards before commit.
- Cleanup `.tmp`, `.playwright-mcp`, and `dist`; confirm no Node/Java/mini-kv listener remains from this task.
