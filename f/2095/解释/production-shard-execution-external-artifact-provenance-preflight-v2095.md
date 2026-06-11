# Node v2095: Production shard execution external artifact provenance preflight

## Purpose

v2095 defines the metadata that a future real external artifact must provide before payload intake is considered.

## Engineering Notes

- The preflight is metadata-only and persists no external artifact payload.
- It requires artifact kind, provider id, received-at, source digest, owner/signature digest, retention class, and quarantine policy.
- The next layer is conflict taxonomy, not storage expansion.

## Source Chain

- Node v2094: Real artifact intake readiness switch; ready=true; digest=cbd63233392124cabd56cc57446d580271ed595c408caa45a49aa69fddf7b02a

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

- Machine evidence: e/2095/evidence
- Human explanation: f/2095/解释
- Image evidence: not created for v2095; this batch has no renderable screenshot artifact.
