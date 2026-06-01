# Node v494 Java / mini-kv route catalog cleanup consumer readiness evidence archive verification

v494 verifies the archive produced in v493. It checks the archived JSON route output, Markdown route output, and archive summary.

## Checks

- Archive files exist.
- JSON and Markdown are readable.
- Summary SHA-256 values match the archived files.
- Source report is v492/v491 and ready.
- Source report has 21/21 checks passed.
- Java v224 and mini-kv v209/v210 evidence markers are present.
- Runtime execution and sibling service startup remain disabled.

## Result

The verifier is ready and reports all checks passed. It does not expose a route yet; v495 will register it in the existing cleanup route group.
