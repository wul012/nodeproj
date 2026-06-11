# v2008 verification

This version moves evidence verification into `operationApprovalEvidenceVerification.ts`.

The verification still recomputes the report, validates request and decision digests, compares summary to upstream evidence, validates Java/mini-kv evidence digests, and requires upstream untouched.
