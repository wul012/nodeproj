# Node v2100 roadmap: f-folder explanation scanner

## Goal

Scan numeric f-version directories and collect explanation markdown, explanation-directory alignment, and empty image directory status.

## Necessity Proof

- Blocker resolved: a type contract alone cannot find short or misplaced explanation files.
- Later consumer: v2101 rules and v2102 route output need a stable scan result.
- Reuse decision: use filesystem scanning like the existing code walkthrough scanner, not a second route catalog.
- Growth stop condition: the scanner only reports layout and file metadata; content judgment remains in the rules layer.

## Cross-Project Parallel Plan

Java and mini-kv are recommended parallel. Node v2100 only reads local Node archive folders.

## Engineering Requirements

- Read `f/<version>/解释/*.md`.
- Treat `f/<version>/图片` as valid only when it contains actual files.
- Keep legacy versions visible but non-blocking before the enforcement floor.

## Verification

Run scanner-backed gate tests and archive evidence under `e/2100/evidence`; write the Chinese explanation under `f/2100/解释`.
