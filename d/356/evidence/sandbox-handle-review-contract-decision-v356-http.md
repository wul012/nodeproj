# Managed audit manual sandbox connection credential resolver sandbox handle review contract decision

- Service: orderops-node
- Generated at: 2026-05-27T12:59:57.018Z
- Profile version: managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-contract-decision.v1
- Decision state: sandbox-handle-review-contract-decision-ready
- Decision: define-sandbox-handle-review-contract
- Active Node version: Node v356
- Source Node version: Node v355
- Ready for v357 archive verification: true
- Contract decision only: true
- Sandbox handle review only: true
- Reruns live probe: false
- Starts Java service: false
- Starts mini-kv service: false
- Connects managed audit: false
- Sends managed audit HTTP/TCP: false
- Credential value requested: false
- Credential value read: false
- Raw endpoint URL requested: false
- Raw endpoint URL parsed: false
- Secret provider instantiated: false
- Resolver client instantiated: false
- Runtime shell implemented: false
- Runtime shell invocation allowed: false
- Execution allowed: false

## Source Node v355

- sourceVersion: Node v355
- profileVersion: managed-audit-manual-sandbox-connection-credential-resolver-sandbox-handle-review-prerequisite-intake-archive-verification.v1
- archiveVerificationState: sandbox-handle-review-prerequisite-intake-archive-verified
- archiveVerificationDecision: archive-sandbox-handle-review-prerequisite-intake
- readyForArchiveVerification: true
- readyForNodeV356ContractDecision: true
- archiveVerificationDigest: 2fa881a68da1e6bd4495ebdec14eb59518b288e7bee898b469438b9f68a1416d
- archiveFileCount: 11
- presentArchiveFileCount: 11
- checkCount: 29
- passedCheckCount: 29
- prerequisiteInputCount: 5
- closedScopeCount: 9
- productionBlockerCount: 0
- rerunsLiveProbe: false
- startsJavaService: false
- startsMiniKvService: false
- mutatesJavaState: false
- mutatesMiniKvState: false
- connectsManagedAudit: false
- sendsManagedAuditHttpTcp: false
- credentialValueRequested: false
- credentialValueRead: false
- rawEndpointUrlRequested: false
- rawEndpointUrlParsed: false
- secretProviderInstantiated: false
- resolverClientInstantiated: false
- runtimeShellImplemented: false
- runtimeShellInvocationAllowed: false
- executionAllowed: false

## Necessity Proof

- blockerResolved: sandbox-handle-review-needs-contract-decision-after-archive-verification
- consumedBy: Node v357 sandbox handle review contract decision archive verification or later non-secret handle review gate
- cannotReuseExistingReportBecause: Node v355 verifies the v354 archive, but it does not declare the contract decision that downstream handle review gates can consume.
- growthStopCondition: Stop when the chain requests credential value, raw endpoint URL, provider/client instantiation, runtime shell, managed audit HTTP/TCP, or upstream write/admin scope.

## Contract Inputs

- sandbox-handle-reference: Sandbox credential handle reference
  - category: handle-reference
  - sourcePrerequisiteId: sandbox-handle-reference
  - contractRequirement: opaque handle id or alias must be present and must not contain credential material
  - containsSecretValue: false
  - containsRawEndpointUrl: false
  - allowsNetworkConnection: false
  - allowsRuntimeInvocation: false
  - status: contract-required
- allowlist-review-status: Endpoint allowlist review status
  - category: review-status
  - sourcePrerequisiteId: allowlist-review-status
  - contractRequirement: review state must be approved, rejected, pending, or not-requested without URL text
  - containsSecretValue: false
  - containsRawEndpointUrl: false
  - allowsNetworkConnection: false
  - allowsRuntimeInvocation: false
  - status: contract-required
- credential-handle-binding-status: Credential handle binding status
  - category: binding-status
  - sourcePrerequisiteId: credential-handle-binding-status
  - contractRequirement: binding state must be bound, unbound, pending, or not-requested
  - containsSecretValue: false
  - containsRawEndpointUrl: false
  - allowsNetworkConnection: false
  - allowsRuntimeInvocation: false
  - status: contract-required
- operator-approval-correlation: Operator approval correlation id
  - category: operator-context
  - sourcePrerequisiteId: operator-approval-correlation
  - contractRequirement: correlation id must link evidence without granting execution authority
  - containsSecretValue: false
  - containsRawEndpointUrl: false
  - allowsNetworkConnection: false
  - allowsRuntimeInvocation: false
  - status: contract-required
- source-decision-digest: Source decision digest
  - category: source-evidence
  - sourcePrerequisiteId: source-decision-digest
  - contractRequirement: source digest must be a sha256 value from the archived prerequisite intake chain
  - containsSecretValue: false
  - containsRawEndpointUrl: false
  - allowsNetworkConnection: false
  - allowsRuntimeInvocation: false
  - status: contract-required

## Contract Sections

- opaque-handle-reference: Opaque handle reference
  - decisionRule: Only opaque handle identifiers or aliases may enter review; credential values are rejected.
  - acceptsOnlyOpaqueReference: true
  - containsSecretValue: false
  - containsRawEndpointUrl: false
  - opensManagedAuditConnection: false
  - invokesRuntimeShell: false
  - mutatesUpstreamState: false
- allowlist-review-state: Allowlist review state
  - decisionRule: Review state may describe approval status but cannot include raw endpoint URLs.
  - acceptsOnlyOpaqueReference: true
  - containsSecretValue: false
  - containsRawEndpointUrl: false
  - opensManagedAuditConnection: false
  - invokesRuntimeShell: false
  - mutatesUpstreamState: false
- binding-review-state: Binding review state
  - decisionRule: Binding state is informational and cannot instantiate provider/client code.
  - acceptsOnlyOpaqueReference: true
  - containsSecretValue: false
  - containsRawEndpointUrl: false
  - opensManagedAuditConnection: false
  - invokesRuntimeShell: false
  - mutatesUpstreamState: false
- operator-correlation: Operator correlation
  - decisionRule: Correlation ids link review artifacts without enabling execution.
  - acceptsOnlyOpaqueReference: true
  - containsSecretValue: false
  - containsRawEndpointUrl: false
  - opensManagedAuditConnection: false
  - invokesRuntimeShell: false
  - mutatesUpstreamState: false
- source-evidence-digest: Source evidence digest
  - decisionRule: Digest checks bind the contract to v355 evidence before any later review gate consumes it.
  - acceptsOnlyOpaqueReference: true
  - containsSecretValue: false
  - containsRawEndpointUrl: false
  - opensManagedAuditConnection: false
  - invokesRuntimeShell: false
  - mutatesUpstreamState: false
- stop-conditions: Stop conditions
  - decisionRule: Any request for secrets, raw endpoints, network, runtime shell, or upstream writes stops the chain.
  - acceptsOnlyOpaqueReference: true
  - containsSecretValue: false
  - containsRawEndpointUrl: false
  - opensManagedAuditConnection: false
  - invokesRuntimeShell: false
  - mutatesUpstreamState: false

## Decision Record

- decisionDigest: d94a98de0a7ea36cedd2feb2ed1579c5c1cf1519b44daa5c5db51b90d8e97eee
- decisionMode: sandbox-handle-review-contract-decision
- sourceSpan: Node v355 sandbox handle review prerequisite intake archive verification
- sourceArchiveVerificationDigest: 2fa881a68da1e6bd4495ebdec14eb59518b288e7bee898b469438b9f68a1416d
- decision: define-sandbox-handle-review-contract
- decisionReason: v355 archive verification is complete, so v356 can define a non-secret sandbox handle review contract.
- contractInputCount: 5
- contractSectionCount: 6
- permitsOnlyNonSecretContract: true
- requestsCredentialValue: false
- requestsRawEndpointUrl: false
- instantiatesProviderClient: false
- implementsRuntimeShell: false
- invokesRuntimeShell: false
- opensManagedAuditConnection: false
- startsUpstreamServices: false
- writesUpstreamState: false
- requestsJavaMiniKvEcho: false
- nextNodeVersionSuggested: Node v357

## Checks

- sourceNodeV355Ready: true
- sourceArchiveVerificationAllowsContractDecision: true
- sourceArchiveFilesComplete: true
- sourceChecksAllPassed: true
- necessityProofPresent: true
- contractInputsComplete: true
- contractSectionsComplete: true
- contractInputsNonSecret: true
- contractSectionsNonSecret: true
- contractDoesNotRequestRawEndpoint: true
- contractDoesNotAllowNetwork: true
- decisionDigestStable: true
- decisionLimitedToContract: true
- noCredentialValueRequestedOrRead: true
- noRawEndpointRequestedOrParsed: true
- noProviderClientInstantiated: true
- noRuntimeShellImplemented: true
- noRuntimeShellInvoked: true
- noManagedAuditHttpTcp: true
- noUpstreamServiceStarted: true
- noUpstreamMutation: true
- noJavaMiniKvEchoRequired: true
- productionAuditStillBlocked: true
- productionWindowStillBlocked: true
- readyForSandboxHandleReviewContractDecision: true

## Summary

- checkCount: 25
- passedCheckCount: 25
- contractInputCount: 5
- contractSectionCount: 6
- sourceArchiveFileCount: 11
- sourcePresentArchiveFileCount: 11
- sourceCheckCount: 29
- sourcePassedCheckCount: 29
- sourceProductionBlockerCount: 0
- productionBlockerCount: 0
- warningCount: 1
- recommendationCount: 1

## Production Blockers

- No production blockers.

## Warnings

- SANDBOX_HANDLE_REVIEW_CONTRACT_STILL_NON_SECRET (warning, next-step): v356 defines only a non-secret contract decision; it does not approve a real managed audit connection.

## Recommendations

- PROCEED_TO_NODE_V357_ARCHIVE_VERIFICATION (recommendation, next-step): Proceed to Node v357 as archive verification before adding handle review behavior.

## Next Actions

- Use Node v357 to verify the v356 archive before any new sandbox handle review behavior.
- Keep all contract inputs as opaque references or review status, not credential values or raw endpoint URLs.
- Pause if the next step asks for provider/client instantiation, runtime shell invocation, managed audit HTTP/TCP, Java writes, or mini-kv write/admin scope.

