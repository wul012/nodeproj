# Node v2101 roadmap: f-folder explanation rule evaluator

## Goal

Evaluate each enforced explanation for Chinese length, required sections, code path density, placeholders, and forbidden production claims.

## Necessity Proof

- Blocker resolved: scanning can find files but cannot distinguish real explanation from shallow text.
- Later consumer: v2102 route output can expose blockers and counts for CI and operator review.
- Reuse decision: keep rules in a pure evaluator so unit tests can exercise failures without building the app.
- Growth stop condition: do not add style preferences beyond maintainability-critical signals.

## Cross-Project Parallel Plan

Java and mini-kv are recommended parallel. This is a Node documentation-quality rule set and does not require sibling startup.

## Engineering Requirements

- Require at least 3600 bytes and 900 Chinese characters.
- Require goal/context, code entry, response model, service flow, safety boundary, verification, and next-step/stop-condition sections.
- Require at least four real code or archive paths.
- Block placeholder and false production-authority claims.

## Verification

Run rule unit tests, gate tests, typecheck, and archive evidence under `e/2101/evidence`; write the Chinese explanation under `f/2101/解释`.
