# Node v2097: Production shard execution external artifact quarantine envelope

## Purpose

v2097 defines the non-authoritative quarantine sequence for conflicting or unverified artifacts.

## Engineering Notes

- The envelope records provenance metadata, attaches a conflict class, seals a non-authoritative digest, notifies the owning reviewer, and blocks production authority.
- Quarantined artifacts cannot satisfy approval, store, or owner receipt blockers.
- The route remains read-only and starts no sibling services.

## Source Chain

- Node v2096: Artifact conflict taxonomy; ready=true; digest=9f24569f9bba568b4910cdfc59383280fd30463f5e1c8276d2302d98d62b0471

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

- Machine evidence: e/2097/evidence
- Human explanation: f/2097/解释
- Image evidence: not created for v2097; this batch has no renderable screenshot artifact.
