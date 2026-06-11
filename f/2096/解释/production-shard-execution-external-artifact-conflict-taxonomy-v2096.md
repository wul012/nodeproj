# Node v2096: Production shard execution external artifact conflict taxonomy

## Purpose

v2096 names the conflict classes that force an external artifact away from production authority.

## Engineering Notes

- The taxonomy covers duplicate approvals, stale digests, owner scope mismatch, store owner mismatch, and missing cleanup reconciliation.
- Every conflict defaults to quarantine-and-block-production.
- No payload is accepted; this stays a policy preflight.

## Source Chain

- Node v2095: Artifact provenance preflight; ready=true; digest=6e9f8bb77bd44bb6a9aa0fbb546c170b5212c4e7e2826bc9d9d6b182fced5cc7

## Safety Boundary

- readyForNextStage: true
- readyForProductionShardExecution: false
- executionAllowed: false
- startsJavaService: false
- startsMiniKvService: false

## Production Blockers

- PRODUCTION_BLOCKED_SIGNED_PRODUCTION_EXECUTION_APPROVAL: Signed production execution approval is still pending. Capture a signed approval artifact before any production execution window can open.
- PRODUCTION_BLOCKED_MANAGED_AUDIT_PRODUCTION_STORE: Managed audit production store binding is still pending. Bind immutable production execution records to a managed audit store before real execution.
- PRODUCTION_BLOCKED_ROLLBACK_OWNER_CONFIRMATION: Rollback and abort owner confirmation is still pending. Have Node, Java, and mini-kv owners sign the abort and rollback responsibilities.

## Archive Layout

- Machine evidence: e/2096/evidence
- Human explanation: f/2096/解释
- Image evidence: not created for v2096; this batch has no renderable screenshot artifact.
