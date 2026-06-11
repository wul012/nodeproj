# v2004 types

This version moves approval evidence state, digest, upstream evidence, report, and verification contracts into `operationApprovalEvidenceTypes.ts`.

The split removes structural declarations from runtime logic while preserving the exact public TypeScript names consumed by handoff bundles.
