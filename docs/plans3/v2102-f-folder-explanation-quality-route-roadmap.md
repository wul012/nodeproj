# Node v2102 roadmap: f-folder explanation quality route

## Goal

Expose the f-folder explanation quality gate as a JSON/Markdown audit route in the managed-audit route-quality group.

## Necessity Proof

- Blocker resolved: rules need a stable route output so CI, humans, and future archive scripts can consume the same evidence.
- Later consumer: v2103 can archive the route output and prove expanded explanations are compliant.
- Reuse decision: register one quality route instead of five near-duplicate explanation routes.
- Growth stop condition: the route remains a read-only quality gate, not a production execution gate.

## Cross-Project Parallel Plan

Java and mini-kv are recommended parallel. Node v2102 changes only Node audit route quality reporting.

## Engineering Requirements

- Add `/api/v1/audit/f-folder-explanation-quality-gate`.
- Keep the catalog summary aligned.
- Render blockers, warnings, recommendations, enforced explanation summaries, and digest.
- Keep execution and managed-audit connection disabled.

## Verification

Run route group, catalog, f-folder gate, typecheck, build, HTTP smoke, and archive evidence under `e/2102/evidence`; write the Chinese explanation under `f/2102/解释`.
