import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";
import { productionShardExecutionAuditJsonMarkdownRoutes } from "../src/routes/auditProductionShardExecutionRoutes.js";
import { loadProductionShardExecutionCandidateArchiveVerification } from "../src/services/productionShardExecutionCandidateArchiveVerification.js";
import { loadProductionShardExecutionCandidateContract } from "../src/services/productionShardExecutionCandidateContract.js";
import { loadProductionShardExecutionCloseout } from "../src/services/productionShardExecutionCloseout.js";
import { loadProductionShardExecutionExternalArtifactConflictTaxonomy } from "../src/services/productionShardExecutionExternalArtifactConflictTaxonomy.js";
import { loadProductionShardExecutionExternalArtifactDryRunCloseout } from "../src/services/productionShardExecutionExternalArtifactDryRunCloseout.js";
import { loadProductionShardExecutionExternalArtifactIntakeEnvelope } from "../src/services/productionShardExecutionExternalArtifactIntakeEnvelope.js";
import { loadProductionShardExecutionExternalArtifactProvenancePreflight } from "../src/services/productionShardExecutionExternalArtifactProvenancePreflight.js";
import { loadProductionShardExecutionExternalArtifactQuarantineEnvelope } from "../src/services/productionShardExecutionExternalArtifactQuarantineEnvelope.js";
import { loadProductionShardExecutionExternalEvidenceCloseout } from "../src/services/productionShardExecutionExternalEvidenceCloseout.js";
import { loadProductionShardExecutionFailureMatrix } from "../src/services/productionShardExecutionFailureMatrix.js";
import { loadProductionShardExecutionHandoffReadiness } from "../src/services/productionShardExecutionHandoffReadiness.js";
import { loadProductionShardExecutionManagedAuditStoreBindingPreflight } from "../src/services/productionShardExecutionManagedAuditStoreBindingPreflight.js";
import { loadProductionShardExecutionManagedAuditStoreOwnerBindingRequest } from "../src/services/productionShardExecutionManagedAuditStoreOwnerBindingRequest.js";
import { loadProductionShardExecutionOperatorWindowWorksheet } from "../src/services/productionShardExecutionOperatorWindowWorksheet.js";
import { loadProductionShardExecutionOwnerReceiptDryRunReconciliation } from "../src/services/productionShardExecutionOwnerReceiptDryRunReconciliation.js";
import { loadProductionShardExecutionOwnerReceiptRequestPacket } from "../src/services/productionShardExecutionOwnerReceiptRequestPacket.js";
import { loadProductionShardExecutionRealArtifactIntakePreflightCloseout } from "../src/services/productionShardExecutionRealArtifactIntakePreflightCloseout.js";
import { loadProductionShardExecutionRealArtifactIntakeReadinessSwitch } from "../src/services/productionShardExecutionRealArtifactIntakeReadinessSwitch.js";
import { loadProductionShardExecutionRouteCatalogForwardCompatibility } from "../src/services/productionShardExecutionRouteCatalogForwardCompatibility.js";
import { loadProductionShardExecutionSignedApprovalFixtureValidation } from "../src/services/productionShardExecutionSignedApprovalFixtureValidation.js";
import { loadProductionShardExecutionSignedApprovalIntakeContract } from "../src/services/productionShardExecutionSignedApprovalIntakeContract.js";

import { expectAuditRouteGroupRegisteredThroughCatalog } from "./support/auditJsonMarkdownRouteCatalogTestSupport.js";

const EXTERNAL_ARTIFACT_DRY_RUN_CLOSEOUT_ROUTE =
  "/api/v1/audit/production-shard-execution-external-artifact-dry-run-closeout";
const REAL_ARTIFACT_INTAKE_PREFLIGHT_CLOSEOUT_ROUTE =
  "/api/v1/audit/production-shard-execution-real-artifact-intake-preflight-closeout";

describe("production shard execution readiness batch", () => {
  it("builds twenty-one substantial stages while keeping production execution blocked", () => {
    const config = loadTestConfig();
    const profiles = [
      loadProductionShardExecutionHandoffReadiness({ config }),
      loadProductionShardExecutionCandidateContract({ config }),
      loadProductionShardExecutionFailureMatrix({ config }),
      loadProductionShardExecutionOperatorWindowWorksheet({ config }),
      loadProductionShardExecutionCandidateArchiveVerification({ config }),
      loadProductionShardExecutionCloseout({ config }),
      loadProductionShardExecutionRouteCatalogForwardCompatibility({ config }),
      loadProductionShardExecutionSignedApprovalIntakeContract({ config }),
      loadProductionShardExecutionManagedAuditStoreBindingPreflight({ config }),
      loadProductionShardExecutionOwnerReceiptRequestPacket({ config }),
      loadProductionShardExecutionExternalEvidenceCloseout({ config }),
      loadProductionShardExecutionExternalArtifactIntakeEnvelope({ config }),
      loadProductionShardExecutionSignedApprovalFixtureValidation({ config }),
      loadProductionShardExecutionManagedAuditStoreOwnerBindingRequest({ config }),
      loadProductionShardExecutionOwnerReceiptDryRunReconciliation({ config }),
      loadProductionShardExecutionExternalArtifactDryRunCloseout({ config }),
      loadProductionShardExecutionRealArtifactIntakeReadinessSwitch({ config }),
      loadProductionShardExecutionExternalArtifactProvenancePreflight({ config }),
      loadProductionShardExecutionExternalArtifactConflictTaxonomy({ config }),
      loadProductionShardExecutionExternalArtifactQuarantineEnvelope({ config }),
      loadProductionShardExecutionRealArtifactIntakePreflightCloseout({ config }),
    ];

    expect(profiles.map((profile) => profile.stage.activeNodeVersion)).toEqual([
      "Node v2078",
      "Node v2079",
      "Node v2080",
      "Node v2081",
      "Node v2082",
      "Node v2083",
      "Node v2084",
      "Node v2085",
      "Node v2086",
      "Node v2087",
      "Node v2088",
      "Node v2089",
      "Node v2090",
      "Node v2091",
      "Node v2092",
      "Node v2093",
      "Node v2094",
      "Node v2095",
      "Node v2096",
      "Node v2097",
      "Node v2098",
    ]);
    expect(profiles.every((profile) => profile.readyForNextStage)).toBe(true);
    expect(profiles.every((profile) => profile.readyForProductionShardExecution === false)).toBe(true);
    expect(profiles.every((profile) => profile.safety.executionAllowed === false)).toBe(true);
    expect(profiles.every((profile) => profile.javaMiniKvRecommendedParallel)).toBe(true);
    expect(profiles.every((profile) => !profile.nodeIsUpstreamPreApprovalBlocker)).toBe(true);
    expect(profiles.every((profile) => profile.stage.readinessDigest.match(/^[a-f0-9]{64}$/))).toBe(true);
    expect(profiles.every((profile) => profile.summary.passedCheckCount === profile.summary.checkCount)).toBe(true);
    expect(profiles.every((profile) => profile.summary.productionBlockingControlCount === 3)).toBe(true);
    expect(profiles.every((profile) => profile.productionBlockers.length === 3)).toBe(true);

    expect(profiles[1]?.stagePayload).toMatchObject({
      candidateContract: {
        allowedRuntimeSurface: "read-only probe evidence and archive replay only",
      },
    });
    expect(profiles[2]?.stagePayload.failureMatrix).toHaveLength(5);
    expect(profiles[3]?.checks.noWorksheetStepAuthorizesWrites).toBe(true);
    expect(profiles[4]?.sources.map((source) => source.version)).toEqual([
      "Node v2078",
      "Node v2079",
      "Node v2080",
      "Node v2081",
    ]);
    expect(profiles[5]?.stagePayload.closeout).toMatchObject({
      productionAuthority: false,
    });
    expect(profiles[6]?.stagePayload.routeCatalogCompatibility).toMatchObject({
      comparisonMode: "lower-bound-forward-compatible",
    });
    expect(profiles[7]?.stagePayload.signedApprovalIntakeContract).toMatchObject({
      artifactMode: "schema-only-no-real-approval-present",
      acceptedExecutionAuthority: false,
    });
    expect(
      (profiles[8]?.stagePayload.managedAuditStorePreflight as { preflights?: unknown[] }).preflights,
    ).toHaveLength(5);
    expect(
      (profiles[9]?.stagePayload.ownerReceiptRequestPacket as { receiptRequests?: unknown[] }).receiptRequests,
    ).toHaveLength(3);
    expect(profiles[10]?.stagePayload.externalEvidenceCloseout).toMatchObject({
      productionAuthority: false,
      nodeSidePreconditionsReady: true,
    });
    expect(profiles[11]?.stagePayload.externalArtifactIntakeEnvelope).toMatchObject({
      intakeMode: "dry-run-envelope-only",
      syntheticFixturesAreAuthoritative: false,
    });
    expect(profiles[11]?.stagePayload.archiveLayout).toMatchObject({
      explanation: "f/<version>/解释",
    });
    expect(profiles[12]?.stagePayload.signedApprovalFixtureValidation).toMatchObject({
      validationMode: "schema-shape-only",
      realApprovalPresent: false,
    });
    expect(profiles[13]?.stagePayload.managedAuditStoreOwnerBindingRequest).toMatchObject({
      requestMode: "owner-binding-request-only",
      productionStoreConnected: false,
    });
    expect(
      (profiles[14]?.stagePayload.ownerReceiptDryRunReconciliation as { rows?: unknown[] }).rows,
    ).toHaveLength(3);
    expect(profiles[15]?.stagePayload.externalArtifactDryRunCloseout).toMatchObject({
      dryRunOnly: true,
      productionAuthority: false,
    });
    expect(profiles[16]?.stagePayload.realArtifactIntakeReadinessSwitch).toMatchObject({
      realArtifactIntakeEnabled: false,
      productionAuthority: false,
    });
    expect(profiles[17]?.stagePayload.externalArtifactProvenancePreflight).toMatchObject({
      preflightMode: "metadata-only-no-payload-persistence",
      realArtifactPayloadAccepted: false,
    });
    expect(profiles[18]?.stagePayload.externalArtifactConflictTaxonomy).toMatchObject({
      defaultConflictAction: "quarantine-and-block-production",
      realArtifactPayloadAccepted: false,
    });
    expect(
      (profiles[19]?.stagePayload.externalArtifactQuarantineEnvelope as { quarantineSteps?: unknown[] })
        .quarantineSteps,
    ).toHaveLength(5);
    expect(profiles[20]?.stagePayload.realArtifactIntakePreflightCloseout).toMatchObject({
      preflightOnly: true,
      productionAuthority: false,
    });
  }, 180_000);

  it("registers JSON and Markdown routes through the audit catalog", async () => {
    const app = await buildApp(loadTestConfig());
    try {
      const paths = productionShardExecutionAuditJsonMarkdownRoutes.map((route) => route.path);
      const json = await app.inject({
        method: "GET",
        url: REAL_ARTIFACT_INTAKE_PREFLIGHT_CLOSEOUT_ROUTE,
        headers: completeHeaders(),
      });
      const markdown = await app.inject({
        method: "GET",
        url: `${REAL_ARTIFACT_INTAKE_PREFLIGHT_CLOSEOUT_ROUTE}?format=markdown`,
        headers: completeHeaders(),
      });

      expect(paths).toHaveLength(21);
      expect(paths[0]).toBe("/api/v1/audit/production-shard-execution-handoff-readiness");
      expect(paths[5]).toBe("/api/v1/audit/production-shard-execution-closeout");
      expect(paths[10]).toBe("/api/v1/audit/production-shard-execution-external-evidence-closeout");
      expect(paths[15]).toBe(EXTERNAL_ARTIFACT_DRY_RUN_CLOSEOUT_ROUTE);
      expect(paths[20]).toBe(REAL_ARTIFACT_INTAKE_PREFLIGHT_CLOSEOUT_ROUTE);
      expectAuditRouteGroupRegisteredThroughCatalog({
        routes: productionShardExecutionAuditJsonMarkdownRoutes,
      });
      expect(json.statusCode).toBe(200);
      expect(json.json()).toMatchObject({
        profileVersion: "production-shard-execution-real-artifact-intake-preflight-closeout.v1",
        readyForNextStage: true,
        readyForProductionShardExecution: false,
        javaMiniKvRecommendedParallel: true,
        nodeIsUpstreamPreApprovalBlocker: false,
      });
      expect(json.json().safety).toMatchObject({
        executionAllowed: false,
        readyForProductionOperations: false,
        startsJavaService: false,
        startsMiniKvService: false,
      });
      expect(markdown.statusCode).toBe(200);
      expect(markdown.headers["content-type"]).toContain("text/markdown");
      expect(markdown.body).toContain("Production shard execution real artifact intake preflight closeout");
      expect(markdown.body).toContain("REAL_ARTIFACT_PREFLIGHT_STILL_BLOCKS_PRODUCTION");
    } finally {
      await app.close();
    }
  }, 180_000);
});

function completeHeaders() {
  return {
    "x-orderops-operator-id": "auditor-415",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-v405-20260531T130805-codex-auto",
  };
}

function loadTestConfig(overrides: Record<string, string> = {}) {
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
    ...overrides,
  });
}
