import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config.js";
import {
  HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG,
  JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID,
} from "../src/services/managedAuditHumanApprovalArtifactReviewPostEchoPrerequisiteCatalog.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate.js";

describe("managed audit human approval artifact review post-echo prerequisite catalog", () => {
  it("keeps v310 documented-missing prerequisites and v312 closure split on the same catalog", () => {
    const config = loadTestConfig();
    const catalogIds = HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG.map((entry) => entry.id);
    const v310 = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewPostEchoDecisionGate({
      config,
    });
    const v312 = loadManagedAuditManualSandboxConnectionCredentialResolverHumanApprovalArtifactReviewGovernanceStopPrerequisiteClosureDecision({
      config,
    });

    expect(catalogIds).toEqual([
      "signed-human-approval-artifact",
      "credential-handle-approval",
      "endpoint-handle-allowlist-approval",
      "no-network-safety-fixture",
      "abort-rollback-semantics",
      "java-mini-kv-decision-echo",
    ]);
    expect(v310.decisionGate.requiredPrerequisites.map((prerequisite) => prerequisite.id)).toEqual(catalogIds);
    expect(v310.decisionGate.requiredPrerequisites.every((prerequisite) =>
      prerequisite.status === "documented-missing" && prerequisite.requiredBeforeRuntimeShell)).toBe(true);

    expect(v312.closureDecision.completedPrerequisites.map((prerequisite) => prerequisite.id)).toEqual([
      JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID,
    ]);
    expect(v312.closureDecision.remainingPrerequisites.map((prerequisite) => prerequisite.id)).toEqual(
      catalogIds.filter((id) => id !== JAVA_MINI_KV_DECISION_ECHO_PREREQUISITE_ID),
    );
    expect(v312.closureDecision.completedPrerequisiteCount + v312.closureDecision.remainingPrerequisiteCount)
      .toBe(HUMAN_APPROVAL_ARTIFACT_REVIEW_POST_ECHO_PREREQUISITE_CATALOG.length);
    expect(v312.readyForNewJavaMiniKvEchoRequest).toBe(false);
  }, 180_000);
});

function loadTestConfig() {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
    ACCESS_GUARD_ENFORCEMENT_ENABLED: "true",
    ORDEROPS_AUTH_TOKEN_ISSUER: "orderops-test",
    ORDEROPS_AUTH_TOKEN_SECRET: "test-secret",
    ORDEROPS_IDP_ISSUER: "https://idp.example",
    ORDEROPS_IDP_AUDIENCE: "orderops-node",
    ORDEROPS_IDP_JWKS_URL: "https://idp.example/.well-known/jwks.json",
    ORDEROPS_IDP_CLOCK_SKEW_SECONDS: "90",
    ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK: "true",
  });
}
