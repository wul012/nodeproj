# Managed audit manual sandbox connection credential resolver credential handle approval contract intake

- Service: orderops-node
- Generated at: 2026-05-23T11:07:23.690Z
- Profile version: managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-intake.v1
- Contract state: credential-handle-approval-contract-intake-ready
- Governance chain decision: continue-only-for-credential-handle-approval-contract-intake
- Ready for contract intake: true
- Active Node contract version: Node v317
- Target prerequisite id: credential-handle-approval
- Ready for Java v146 + mini-kv v139 echo: true
- Ready for Node v318 before upstream echo: false
- Credential value read: false
- Raw endpoint URL parsed: false
- Secret provider instantiated: false
- Resolver client instantiated: false
- Execution allowed: false

## Source Node v316

- sourceVersion: Node v316
- profileVersion: managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-prerequisite-closure-review.v1
- reviewState: signed-human-approval-artifact-prerequisite-closure-review-ready
- readyForSignedHumanApprovalArtifactPrerequisiteClosureReview: true
- reviewDigest: 63de25a3ff87d5d9ea8243d0195f3f646bc3bb08ab2aae76533f9a871674444d
- completedPrerequisiteCount: 2
- remainingPrerequisiteCount: 4
- originalPrerequisiteCount: 6
- nextConcretePrerequisiteId: credential-handle-approval
- nextConcretePrerequisiteContractRequired: true
- nextNodeVersionSuggested: Node v317
- chainContinuationAllowed: true
- runtimeShellStillBlocked: true
- completedPrerequisiteIds: ["java-mini-kv-decision-echo","signed-human-approval-artifact"]
- remainingPrerequisiteIds: ["credential-handle-approval","endpoint-handle-allowlist-approval","no-network-safety-fixture","abort-rollback-semantics"]

## Credential Handle Approval Contract

- contractDigest: 298ffb48a00aab4f4630b42fc7b48805185d50a5465938768bd78943e05ae817
- contractName: managed-audit-credential-handle-approval
- contractVersion: credential-handle-approval.v1
- contractMode: credential-handle-approval-contract-intake-only
- sourceSpan: Node v316 closure review + Node v313 catalog
- targetPrerequisiteId: credential-handle-approval
- purpose: Define the non-secret credential handle approval shape required before any later resolver can discuss sandbox credential lookup.
- requiredFieldCount: 10
- prohibitedFieldCount: 8
- rejectionReasonCount: 5
- noGoBoundaryCount: 9
- upstreamEchoRequestCount: 2
- implementationStillBlocked: true

### Required Fields

- credential_handle: stable non-secret credential handle; Identify which credential handle was reviewed without exposing the resolved credential value.
- approval_correlation_id: stable non-secret correlation id; Bind the handle review to the signed approval chain.
- operator_identity_handle: operator identity handle, no credential value; Identify the requesting operator without embedding secret material.
- reviewer_identity_handle: reviewer identity handle, no private key; Identify the human reviewer without carrying credentials or signing keys.
- policy_version: policy id or semantic version; Bind the handle approval to a known review policy contract.
- approval_status: approved, rejected, expired, or revoked; Keep this version contract-only and status-based.
- issued_at: ISO-8601 timestamp; Declare when the credential handle approval was issued.
- expires_at: ISO-8601 timestamp; Prevent stale handle approvals from being treated as current.
- revocation_marker: boolean marker plus optional evidence handle; Make revocation explicit without reading any secret provider state.
- audit_digest: sha256 digest or equivalent stable digest; Prove contract immutability without embedding raw credential or endpoint material.

### Prohibited Fields

- credential_value: CREDENTIAL_VALUE_PRESENT; Credential values must not enter the handle approval contract.
- raw_endpoint_url: RAW_ENDPOINT_URL_PRESENT; Endpoint material remains handle/allowlist-only and belongs to a later prerequisite.
- secret_provider_config: SECRET_PROVIDER_CONFIG_PRESENT; Provider configuration would turn this contract into implementation.
- resolver_client_config: RESOLVER_CLIENT_CONFIG_PRESENT; Resolver client configuration is not allowed in a contract-only intake.
- provider_client_runtime_binding: PROVIDER_CLIENT_RUNTIME_BINDING_PRESENT; Runtime bindings for providers or clients remain out of scope.
- external_request_payload: EXTERNAL_REQUEST_PAYLOAD_PRESENT; No HTTP/TCP payload may be prepared or sent by v317.
- approval_ledger_mutation: APPROVAL_LEDGER_MUTATION_PRESENT; Approval ledger writes remain outside this Node contract.
- schema_migration_sql: SCHEMA_MIGRATION_SQL_PRESENT; Schema migration SQL is prohibited in this intake.

### Rejection Reasons

- CREDENTIAL_HANDLE_MISSING: credential-handle-contract; The credential handle approval contract fields are missing.
- CREDENTIAL_VALUE_PRESENT: credential-boundary; Credential values are not allowed; only handles and review statuses are allowed.
- RAW_ENDPOINT_URL_PRESENT: endpoint-boundary; Raw endpoint URLs are not allowed; endpoint allowlist approval is a separate prerequisite.
- PROVIDER_CLIENT_CONFIG_PRESENT: provider-client-boundary; Secret provider and resolver client config are prohibited in this intake.
- WRITE_OR_MIGRATION_PRESENT: write-boundary; Ledger writes, schema migration, deployment, and rollback execution are prohibited.

### No-Go Boundaries

- credential_value_read: allowed=false; v317 must not read managed audit credential values.
- raw_endpoint_url_parse: allowed=false; v317 must not parse or render raw endpoint URLs.
- secret_provider_instantiation: allowed=false; v317 must not instantiate secret providers.
- resolver_client_instantiation: allowed=false; v317 must not instantiate resolver clients.
- external_request: allowed=false; v317 must not send HTTP/TCP requests.
- ledger_or_schema_write: allowed=false; v317 must not write approval ledger or schema state.
- automatic_upstream_start: allowed=false; v317 must not automatically start Java, mini-kv, or external audit services.
- runtime_shell_implementation: allowed=false; v317 must not implement a runtime shell.
- runtime_shell_invocation: allowed=false; v317 must not invoke a runtime shell.

### Upstream Echo Requests

- java Java v146: Read-only echo of the Node v317 credential-handle approval contract.; readOnly=true
- mini-kv mini-kv v139: Non-participation receipt proving mini-kv does not store, validate, resolve, or become authority for credential handles.; readOnly=true

## Prerequisite Transition

- prerequisiteId: credential-handle-approval
- catalogLabel: Credential handle approval
- beforeV317: still-missing
- afterV317: contract-intake-defined
- closureRequiresUpstreamEcho: true
- completedPrerequisiteCountBeforeV317: 2
- remainingPrerequisiteCountBeforeV317: 4
- preservesSignedHumanApprovalArtifactClosure: true
- closesEndpointHandleAllowlistApproval: false
- closesNoNetworkSafetyFixture: false
- closesAbortRollbackSemantics: false

## Necessity Proof

- proofComplete: true
- blockerResolved: v316 completed the signed-human-approval-artifact prerequisite and named credential-handle-approval as the next concrete missing contract.
- consumer: Java v146 + mini-kv v139, then Node v318
- whyV316CannotBeReused: v316 is a closure review only; it proves the signed artifact prerequisite is complete but does not define credential handle approval fields for upstream echo.
- existingReportReuseDecision: Reuse v316 as source state and v313 as the prerequisite catalog; create v317 only for the credential-handle approval contract intake.
- stopCondition: Stop if the contract requires credential values, raw endpoint URLs, provider/client configuration, external requests, runtime shell implementation or invocation, ledger/schema writes, mini-kv authority, or automatic upstream start.

## Checks

- sourceNodeV316Ready: true
- sourceNodeV316PointsToCredentialHandle: true
- sourceNodeV316KeepsRuntimeBlocked: true
- sourceNodeV316KeepsSideEffectsClosed: true
- credentialHandleApprovalStillMissingInSource: true
- catalogTargetMatchesCredentialHandle: true
- contractRequiredFieldsDocumented: true
- contractProhibitedFieldsDocumented: true
- rejectionReasonsDocumented: true
- noGoBoundariesClosed: true
- prerequisiteTransitionScopedToCredentialHandle: true
- necessityProofDocumented: true
- javaMiniKvEchoRequestExplicitlyParallel: true
- contractStaysNonSecret: true
- upstreamProbesStillDisabled: true
- upstreamActionsStillDisabled: true
- runtimeShellImplementationStillBlocked: true
- productionAuditStillBlocked: true
- productionWindowStillBlocked: true
- readyForManagedAuditManualSandboxConnectionCredentialResolverCredentialHandleApprovalContractIntake: true

## Summary

- checkCount: 20
- passedCheckCount: 20
- sourceNodeV316CheckCount: 17
- sourceNodeV316PassedCheckCount: 17
- sourceCompletedPrerequisiteCount: 2
- sourceRemainingPrerequisiteCount: 4
- requiredFieldCount: 10
- prohibitedFieldCount: 8
- rejectionReasonCount: 5
- noGoBoundaryCount: 9
- upstreamEchoRequestCount: 2
- productionBlockerCount: 0
- warningCount: 2
- recommendationCount: 2

## Production Blockers

- No credential handle approval contract intake blockers.

## Warnings

- CREDENTIAL_HANDLE_CONTRACT_DOES_NOT_CLOSE_ALL_PREREQUISITES (warning, managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-intake): v317 defines a credential-handle approval contract only; endpoint allowlist, no-network fixture, and abort/rollback semantics remain separate prerequisites.
- CREDENTIAL_HANDLE_APPROVAL_IS_NOT_CREDENTIAL_RESOLUTION (warning, credential-handle-approval-contract): A credential handle approval status does not authorize Node to resolve or read the underlying credential value.

## Recommendations

- RUN_JAVA_V146_AND_MINI_KV_V139_AFTER_V317_ARCHIVE (recommendation, managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-intake): After v317 is archived, Java v146 and mini-kv v139 can run in parallel as read-only echo and non-participation receipt work.
- KEEP_CREDENTIAL_HANDLE_APPROVAL_NON_SECRET (recommendation, credential-handle-approval-contract): Keep the credential handle approval as handles, statuses, digest, and timestamps only; never add credential values, raw endpoint URLs, provider/client config, or HTTP/TCP payloads.

## Evidence Endpoints

- credentialHandleApprovalContractIntakeJson: /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-intake
- credentialHandleApprovalContractIntakeMarkdown: /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-credential-handle-approval-contract-intake?format=markdown
- sourceNodeV316Json: /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-prerequisite-closure-review
- sourceNodeV316Markdown: /api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-signed-human-approval-artifact-prerequisite-closure-review?format=markdown
- activePlan: docs/plans2/v316-post-signed-artifact-prerequisite-closure-roadmap.md

## Next Actions

- Archive Node v317 as the credential-handle approval contract-only intake.
- After v317 is complete, Java v146 and mini-kv v139 can run in parallel as read-only echo and non-participation receipt work.
- Node v318 must wait for both Java v146 and mini-kv v139 before verifying credential-handle approval echo alignment.
- Stop immediately if the credential-handle contract tries to include credential values, raw endpoint URLs, provider/client config, external request payloads, ledger/schema writes, runtime shell behavior, or automatic upstream start.
