# Node v495 post Java / mini-kv route catalog cleanup consumer readiness evidence archive verification route roadmap

## Goal

Node v495 exposes the v494 consumer-readiness archive verifier through the existing Java/mini-kv route catalog cleanup route group.

## Cross-Project State

Java and mini-kv are recommended parallel. This version only publishes a Node archive-verifier route. It does not require fresh sibling evidence, service startup, or runtime probes.

## Necessity Proof

- Blocker resolved: v494 verified the archive locally, but operators need a JSON/Markdown route for the verifier.
- Later consumers: v496 can close the v491-v495 chain as a batch.
- Existing routes are not enough: previous verifier routes cover earlier cleanup evidence windows.
- Growth stop condition: this completes the v491-v495 chain; the next work should close the batch rather than add another adjacent verifier for the same evidence.

## Implementation Plan

- Register the v494 archive verifier route.
- Update route catalog counts from 206 to 207.
- Update Java/mini-kv domain route count from 42 to 43.
- Extend route group smoke tests for JSON/Markdown.

## Validation Plan

- Run focused route group, archive verifier, catalog summary, and route-registration quality tests.
- Run typecheck and build.
- Clean `dist` before commit.
