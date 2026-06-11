# Node v494 code walkthrough: consumer readiness evidence archive verification

## Version Progress

v494 follows the archive generated in v493. It is the verification step before route exposure. That ordering mirrors the previous cleanup chains: intake, report, archive, verifier, verifier route.

## Why This Version Exists

The archive summary alone is not enough. A summary can say a file hash is correct, but the verifier needs to recompute the actual file hashes and compare them to the recorded values. v494 does that before v495 publishes the result as a route.

## Code Flow

`loadJavaMiniKvRouteCatalogCleanupConsumerReadinessEvidenceArchiveVerification()` reads three files:

- archived JSON report from v492;
- archived Markdown report from v492;
- v493 archive summary.

The service builds file references with size and SHA-256. It parses the archived JSON into a compact `sourceReport` shape. That shape keeps only the fields needed for verification: profile version, active/source Node versions, readiness, check counts, Java guard count, latest mini-kv versioned release, latest observed audit release, and execution flag.

`createChecks()` then evaluates the archive:

- all files are present;
- JSON, Markdown, and summary are readable;
- summary digests match recomputed file digests;
- source profile is the v492 consumer readiness report;
- source versions are `Node v492` and `Node v491`;
- source report is ready with 21/21 checks;
- Java v224 and mini-kv v209/v210 markers are present;
- Markdown records the report title and evidence sections;
- production execution and sibling startup remain disabled.

The final readiness flag is computed from all other checks. This keeps the verifier fail-closed: any missing file, mismatched digest, wrong version, or reopened runtime boundary blocks readiness.

## Boundary Decisions

v494 verifies archive files only. It does not call the v492 route again, does not read Java or mini-kv worktrees, and does not regenerate the archive. That means a future failure will point to a concrete archived artifact problem instead of being hidden by a fresh route response.

## Validation

The focused test loads the verifier and asserts:

- profile version and active/source versions;
- ready archive verification state;
- archive-only posture;
- source v492/v491 readiness;
- 21/21 source checks;
- three archive files present;
- SHA-256 shapes for JSON and Markdown.

## What v495 Can Safely Do

v495 can register this verifier in the existing cleanup route group, update catalog counts from 206 to 207, and smoke JSON/Markdown output through Fastify inject.
