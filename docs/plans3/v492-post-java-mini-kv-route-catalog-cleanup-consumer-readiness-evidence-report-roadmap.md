# Node v492 post Java / mini-kv route catalog cleanup consumer readiness evidence report roadmap

## Goal

Node v492 exposes the v491 consumer-readiness intake through the existing Java/mini-kv route catalog cleanup JSON/Markdown route group.

The route is:

```text
/api/v1/audit/java-mini-kv-route-catalog-cleanup-consumer-readiness-evidence
```

## Cross-Project State

- Java remains dirty in the current working tree; Node still consumes only tagged/frozen Java v220-v224 evidence from v491 fixtures.
- mini-kv remains clean at v210; Node still consumes versioned v202-v209 fixtures and records v210 as an audit note only.

## Parallel Guidance

Java and mini-kv are recommended parallel. v492 adds a Node report route and does not create an upstream approval prerequisite. Java can continue toward a clean next tag, and mini-kv can continue toward v211+ or a versioned v210 fixture without waiting for Node.

## Necessity Proof

- Blocker resolved: v491 evidence was local-only. Operators and archive generation need a stable JSON/Markdown endpoint.
- Later consumers: v493 will archive this route output, and v494-v495 will verify and expose the archive verifier.
- Existing route/report reuse is not enough: existing cleanup routes expose earlier handoff/current/checklist windows, not Java v220-v224 plus mini-kv v202-v209/v210-note consumer readiness.
- Growth stop condition: this report route is one endpoint in the v491-v495 chain; no additional report route is needed until a new clean sibling evidence window appears.

## Implementation Plan

- Add report service and Markdown renderer.
- Register the report in `auditJavaMiniKvRouteCatalogCleanupHandoffRoutes.ts`.
- Update catalog counts from 205 to 206 and Java/mini-kv route count from 41 to 42.
- Extend route group tests to smoke JSON and Markdown.

## Validation Plan

- Run focused intake and route group tests.
- Run route catalog summary and registration quality tests.
- Run typecheck and build.
