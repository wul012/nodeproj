# Node v542 post Java / mini-kv route catalog cleanup latest sibling evidence archive verification roadmap

## Goal

Node v542 verifies the v541 latest sibling evidence report archive.

## Cross-Project State

Java and mini-kv can be started in later live-smoke versions, but v542 verifies only Node archive files. It does not need upstream processes.

## Necessity Proof

- Blocker resolved: v541 preserved JSON and Markdown outputs, but no service verified the archived digests and source report shape.
- Later consumer: v543 can expose this verifier as a JSON/Markdown route.
- Existing verifier cannot be reused: older verifiers cover Java v239 / mini-kv v220 or later closeout chains, not Java v274 / mini-kv v247 latest sibling evidence.
- Growth stop condition: add one verifier service and focused test. Do not expose it as a route until v543.

## Validation Plan

- Verify all three v541 archive files exist.
- Verify archive summary SHA-256 values match the JSON and Markdown files.
- Verify source report version span, ready state, 13/13 checks, Java v274, mini-kv v247, and route catalog 224/60/26.
- Verify no runtime execution, upstream startup, upstream mutation, or managed audit connection was opened.
- Run focused verifier test, typecheck, build, and cleanup.
