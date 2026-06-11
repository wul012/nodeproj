# v1372 code walkthrough

The new request package starts from the v1371 candidate intake object, not from sibling project data. `controlledReadOnlyShardPreviewCandidateDocumentRequestTypes.ts` defines the v1372-v1386 version chain and the request item/check contracts.

The source-lineage request item maps one intake slot and one intake guard into a request instruction, acceptance criterion, and read-only readiness flag.
