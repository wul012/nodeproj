# Node v504 Java / mini-kv route catalog cleanup readiness handoff evidence archive verification

v504 verifies the archive created in v503.

## Checks

- Archive JSON, Markdown, and summary files exist.
- Summary SHA-256 values match actual files.
- Source report is v502/v501 and ready.
- Source report has 16/16 checks passed.
- Clean evidence boundary is Java v231 and mini-kv v212.
- Runtime execution and sibling startup remain disabled.

## Result

The verifier is ready. v505 can expose it through the cleanup route group.
