# Node v499 Java / mini-kv route catalog cleanup consumer readiness batch closeout archive verification

v499 verifies the v498 archive of the v497 closeout report.

## Checks

- JSON, Markdown, and summary archive files exist.
- Summary SHA-256 values match the archived files.
- Source report is v496/v495.
- Source report is ready with 15/15 checks.
- Closed batch has five versions and routeCountAtCloseout=207.
- Runtime execution and sibling startup remain disabled.

## Result

The verifier is ready with all checks passed. v500 can expose it through the cleanup route group.
