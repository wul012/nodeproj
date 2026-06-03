import { describe, expect, it } from "vitest";

import type { MiniKvClient } from "../src/clients/miniKvClient.js";
import type { OrderPlatformClient } from "../src/clients/orderPlatformClient.js";
import {
  loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview,
} from "../src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview.js";
import {
  fakeMiniKv,
  fakeOrderPlatform,
  javaEvidence,
  loadTestConfig,
  miniKvEvidence,
} from "./support/controlledReadOnlyShardPreviewServiceFixtures.js";

describe("managed audit manual sandbox connection credential resolver controlled read-only shard preview", () => {
  it("passes with read-only Java and mini-kv shard preview evidence", async () => {
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig(),
        orderPlatform: fakeOrderPlatform(),
        miniKv: fakeMiniKv(),
      });

    expect(profile).toMatchObject({
      profileVersion:
        "managed-audit-manual-sandbox-connection-credential-resolver-controlled-read-only-shard-preview.v1",
      previewState: "controlled-read-only-shard-preview-ready",
      previewDecision: "preview-java-and-mini-kv-shard-readiness",
      readyForControlledReadOnlyShardPreview: true,
      activeNodeVersion: "Node v638",
      sourceNodeVersion: "Node v637",
      consumesNodeV580MaturityRunCloseout: true,
      previewOnly: true,
      liveReadOnly: true,
      executionAllowed: false,
      startsJavaService: false,
      startsMiniKvService: false,
      stopsJavaService: false,
      stopsMiniKvService: false,
      mutatesJavaState: false,
      mutatesMiniKvState: false,
      activeShardRouterAllowed: false,
      writeRoutingAllowed: false,
      loadRestoreCompactAllowed: false,
      connectsManagedAudit: false,
      credentialValueRead: false,
      rawEndpointUrlParsed: false,
      reads: {
        java: {
          attempted: true,
          status: "passed-read",
          transport: "http-json",
          endpoint: "GET /api/v1/ops/shard-readiness",
          command: null,
          readOnlySafe: true,
          executionBlocked: true,
          boundarySafe: true,
          readyForPreview: true,
        },
        miniKv: {
          attempted: true,
          status: "passed-read",
          transport: "tcp-command",
          command: "SHARDJSON",
          readOnlySafe: true,
          executionBlocked: true,
          boundarySafe: true,
          readyForPreview: true,
        },
      },
      preview: {
        java: {
          version: "Java v289",
          shardCount: 0,
          slotCount: 0,
          routingMode: "read-only-preview",
        },
        miniKv: {
          version: "0.262.0",
          releaseVersion: "v262",
          shardCount: 1,
          slotCount: 16,
          shardMapCount: 1,
          keyRoutingSampleCount: 2,
        },
        combinedSlotCount: 16,
        combinedShardCount: 1,
        bothReadOnly: true,
        bothExecutionBlocked: true,
        sourceMatrix: {
          sourceCount: 2,
          readySourceCount: 2,
          failedSourceCount: 0,
          skippedSourceCount: 0,
          routingModes: ["read-only-preview", "single-shard-readiness-prototype"],
          shardCountDelta: 1,
          slotCountDelta: 16,
          shardCountsComparable: true,
          slotCountsComparable: true,
          allSourcesReady: true,
          sources: [
            {
              source: "java",
              project: "advanced-order-platform",
              version: "Java v289",
              status: "passed-read",
              readyForPreview: true,
              readOnlySafe: true,
              executionBlocked: true,
              shardCount: 0,
              slotCount: 0,
              routingMode: "read-only-preview",
              endpoint: "GET /api/v1/ops/shard-readiness",
              command: null,
            },
            {
              source: "miniKv",
              project: "mini-kv",
              version: "0.262.0",
              releaseVersion: "v262",
              status: "passed-read",
              readyForPreview: true,
              readOnlySafe: true,
              executionBlocked: true,
              shardCount: 1,
              slotCount: 16,
              routingMode: "single-shard-readiness-prototype",
              command: "SHARDJSON",
            },
          ],
        },
        sourceMatrixConsumer: {
          decision: "ready-for-controlled-read-only-consumption",
          readyForControlledReadOnlyConsumption: true,
          passedGateCount: 6,
          blockedReasonCodes: [],
          activatesRouting: false,
        },
        sourceMatrixDriftSummary: {
          driftState: "controlled-drift-detected",
          readyForControlledDriftReview: true,
          driftFindingCount: 3,
          blockingFindingCount: 0,
          requiresRoutingActivation: false,
        },
        sourceMatrixConsumptionPlan: {
          planVersion: "Node v638",
          planState: "ready-for-read-only-consumption-plan",
          readyForReadOnlyConsumptionPlan: true,
          planStepRecordCount: 4,
          riskSummary: {
            riskLevel: "review",
            blocked: false,
          },
          requiresRoutingActivation: false,
        },
        sourceMatrixReviewChecklist: {
          checklistState: "ready-for-controlled-review",
          readyForOperatorReview: true,
          reviewItemCount: 1,
          blockedItemCount: 0,
          requiresApproval: false,
          requiresRoutingActivation: false,
        },
        sourceMatrixReviewDigest: {
          digestVersion: "Node v602",
          algorithm: "sha256",
          readyForControlledReviewArchive: true,
          checklistState: "ready-for-controlled-review",
          blockedItemCount: 0,
          requiresApproval: false,
          requiresRoutingActivation: false,
        },
        sourceMatrixArchiveSnapshot: {
          snapshotVersion: "Node v603",
          archiveState: "ready-for-controlled-review-archive",
          readyForControlledReviewArchive: true,
          archivedSectionCount: 5,
          checklistState: "ready-for-controlled-review",
          blockedItemCount: 0,
          includesRawCredential: false,
          includesRuntimePayload: false,
          requiresRoutingActivation: false,
        },
        sourceMatrixArchiveSnapshotSummaryExport: {
          exportVersion: "Node v605",
          inputArchiveSnapshotVersion: "Node v603",
          exportState: "ready-for-summary-export",
          readyForSummaryExport: true,
          summaryDigest: {
            algorithm: "sha256",
            scope: "archive-snapshot-summary-lines",
            coveredLineCount: 5,
          },
          summaryLineCount: 5,
          archivedSectionCount: 5,
          blockedItemCount: 0,
          includesRawCredential: false,
          includesRuntimePayload: false,
          requiresRoutingActivation: false,
        },
        sourceMatrixHandoffNotes: {
          notesVersion: "Node v608",
          inputSummaryExportVersion: "Node v605",
          handoffState: "ready-for-read-only-handoff",
          readyForReadOnlyHandoff: true,
          handoffDigest: {
            algorithm: "sha256",
            scope: "read-only-handoff-notes",
            coveredNoteCount: 4,
          },
          noteCount: 4,
          actionRequiredCount: 0,
          requiresApproval: false,
          requiresRoutingActivation: false,
          requiresFreshSiblingEvidence: false,
        },
        sourceMatrixHandoffSummary: {
          summaryVersion: "Node v611",
          inputNotesVersion: "Node v608",
          summaryState: "ready-for-read-only-handoff-summary",
          readyForReadOnlyHandoffSummary: true,
          audiences: ["operator", "node", "java", "miniKv"],
          audienceCount: 4,
          actionRequiredCount: 0,
          summaryDigest: {
            algorithm: "sha256",
            scope: "read-only-handoff-summary",
            coveredAudienceCount: 4,
            coveredActionRequiredCount: 0,
          },
          requiresApproval: false,
          requiresRoutingActivation: false,
          requiresFreshSiblingEvidence: false,
        },
        sourceMatrixHandoffSummaryConsumer: {
          consumerVersion: "Node v613",
          inputSummaryVersion: "Node v611",
          decision: "ready-for-read-only-summary-consumption",
          readyForReadOnlySummaryConsumption: true,
          gateCount: 6,
          passedGateCount: 6,
          blockedReasonCodes: [],
          summaryDigestScope: "read-only-handoff-summary",
          coveredAudienceCount: 4,
          actionRequiredCount: 0,
          requiresApproval: false,
          requiresRoutingActivation: false,
          requiresFreshSiblingEvidence: false,
        },
        sourceMatrixHandoffSummaryConsumerExport: {
          exportVersion: "Node v614",
          inputConsumerVersion: "Node v613",
          exportState: "ready-for-read-only-summary-consumer-export",
          readyForReadOnlySummaryConsumerExport: true,
          consumerDecision: "ready-for-read-only-summary-consumption",
          exportDigest: {
            algorithm: "sha256",
            scope: "handoff-summary-consumer-export-lines",
            coveredLineCount: 5,
          },
          exportLineCount: 5,
          gateCount: 6,
          passedGateCount: 6,
          blockedReasonCount: 0,
          requiresApproval: false,
          requiresRoutingActivation: false,
          requiresFreshSiblingEvidence: false,
        },
        sourceMatrixHandoffSummaryConsumerReceipt: {
          receiptVersion: "Node v615",
          inputExportVersion: "Node v614",
          receiptState: "ready-for-read-only-summary-consumer-receipt",
          readyForReadOnlySummaryConsumerReceipt: true,
          exportState: "ready-for-read-only-summary-consumer-export",
          receiptDigest: {
            algorithm: "sha256",
            scope: "handoff-summary-consumer-receipt",
            coveredExportLineCount: 5,
            coveredBlockedReasonCount: 0,
          },
          receiptLineCount: 5,
          exportLineCount: 5,
          blockedReasonCount: 0,
          requiresApproval: false,
          requiresRoutingActivation: false,
          requiresFreshSiblingEvidence: false,
        },
        sourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot: {
          snapshotVersion: "Node v616",
          inputReceiptVersion: "Node v615",
          snapshotState: "ready-for-read-only-summary-consumer-receipt-archive",
          readyForReadOnlySummaryConsumerReceiptArchive: true,
          snapshotDigest: {
            algorithm: "sha256",
            scope: "handoff-summary-consumer-receipt-archive-snapshot",
            coveredSectionCount: 3,
          },
          archivedSectionCount: 3,
          receiptLineCount: 5,
          blockedReasonCount: 0,
          includesRawCredential: false,
          includesRuntimePayload: false,
          requiresApproval: false,
          requiresRoutingActivation: false,
          requiresFreshSiblingEvidence: false,
        },
        sourceMatrixHandoffSummaryConsumerReceiptArchiveVerification: {
          verificationVersion: "Node v617",
          inputSnapshotVersion: "Node v616",
          verificationState: "ready-for-read-only-summary-consumer-receipt-archive-verification",
          readyForReadOnlySummaryConsumerReceiptArchiveVerification: true,
          gateCount: 6,
          passedGateCount: 6,
          blockedReasonCodes: [],
          archivedSectionCount: 3,
          blockedReasonCount: 0,
          requiresApproval: false,
          requiresRoutingActivation: false,
          requiresFreshSiblingEvidence: false,
        },
        sourceMatrixHandoffRouteCoverage: {
          coverageVersion: "Node v620",
          inputVerificationVersion: "Node v617",
          coverageState: "ready-for-read-only-handoff-route-coverage",
          readyForReadOnlyHandoffRouteCoverage: true,
          routeSurface: "controlled-read-only-shard-preview",
          coveredSectionCount: 7,
          coverageDigest: {
            algorithm: "sha256",
            scope: "handoff-route-markdown-sections",
            coveredSectionCount: 7,
          },
          requiresApproval: false,
          requiresRoutingActivation: false,
          requiresFreshSiblingEvidence: false,
        },
        sourceMatrixHandoffRouteCoverageVerification: {
          verificationVersion: "Node v621",
          inputCoverageVersion: "Node v620",
          verificationState: "ready-for-read-only-handoff-route-coverage-verification",
          readyForReadOnlyHandoffRouteCoverageVerification: true,
          gateCount: 6,
          passedGateCount: 6,
          blockedReasonCodes: [],
          coveredSectionCount: 7,
          requiresApproval: false,
          requiresRoutingActivation: false,
          requiresFreshSiblingEvidence: false,
        },
        sourceMatrixHandoffRouteCoverageArchiveSnapshot: {
          snapshotVersion: "Node v622",
          inputVerificationVersion: "Node v621",
          snapshotState: "ready-for-read-only-handoff-route-coverage-archive",
          readyForReadOnlyHandoffRouteCoverageArchive: true,
          snapshotDigest: {
            algorithm: "sha256",
            scope: "handoff-route-coverage-archive-snapshot",
            coveredSectionCount: 2,
          },
          archivedSectionCount: 2,
          verificationGateCount: 6,
          verificationPassedGateCount: 6,
          requiresApproval: false,
          requiresRoutingActivation: false,
          requiresFreshSiblingEvidence: false,
        },
        sourceMatrixHandoffRouteCoverageArchiveVerification: {
          verificationVersion: "Node v623",
          inputSnapshotVersion: "Node v622",
          verificationState: "ready-for-read-only-handoff-route-coverage-archive-verification",
          readyForReadOnlyHandoffRouteCoverageArchiveVerification: true,
          gateCount: 7,
          passedGateCount: 7,
          blockedReasonCodes: [],
          archivedSectionCount: 2,
          verificationGateCount: 6,
          verificationPassedGateCount: 6,
          requiresApproval: false,
          requiresRoutingActivation: false,
          requiresFreshSiblingEvidence: false,
        },
        sourceMatrixHandoffRouteCoverageArchiveSummary: {
          summaryVersion: "Node v624",
          inputVerificationVersion: "Node v623",
          summaryState: "ready-for-read-only-handoff-route-coverage-archive-summary",
          readyForReadOnlyHandoffRouteCoverageArchiveSummary: true,
          verificationState: "ready-for-read-only-handoff-route-coverage-archive-verification",
          summaryDigest: {
            algorithm: "sha256",
            scope: "handoff-route-coverage-archive-summary-lines",
            coveredLineCount: 6,
          },
          summaryLineCount: 6,
          gateCount: 7,
          passedGateCount: 7,
          archivedSectionCount: 2,
          blockedReasonCount: 0,
          requiresApproval: false,
          requiresRoutingActivation: false,
          requiresFreshSiblingEvidence: false,
        },
        sourceMatrixHandoffRouteCoverageArchiveSummaryReceipt: {
          receiptVersion: "Node v625",
          inputSummaryVersion: "Node v624",
          receiptState: "ready-for-read-only-handoff-route-coverage-archive-summary-receipt",
          readyForReadOnlyHandoffRouteCoverageArchiveSummaryReceipt: true,
          summaryState: "ready-for-read-only-handoff-route-coverage-archive-summary",
          receiptDigest: {
            algorithm: "sha256",
            scope: "handoff-route-coverage-archive-summary-receipt",
            coveredSummaryLineCount: 6,
            coveredBlockedReasonCount: 0,
          },
          receiptLineCount: 5,
          summaryLineCount: 6,
          gateCount: 7,
          passedGateCount: 7,
          blockedReasonCount: 0,
          requiresApproval: false,
          requiresRoutingActivation: false,
          requiresFreshSiblingEvidence: false,
        },
        sourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot: {
          snapshotVersion: "Node v626",
          inputReceiptVersion: "Node v625",
          snapshotState: "ready-for-read-only-handoff-route-coverage-archive-summary-receipt-archive",
          readyForReadOnlyHandoffRouteCoverageArchiveSummaryReceiptArchive: true,
          snapshotDigest: {
            algorithm: "sha256",
            scope: "handoff-route-coverage-archive-summary-receipt-archive-snapshot",
            coveredSectionCount: 2,
          },
          archivedSectionCount: 2,
          receiptLineCount: 5,
          summaryLineCount: 6,
          blockedReasonCount: 0,
          includesRawCredential: false,
          includesRuntimePayload: false,
          requiresApproval: false,
          requiresRoutingActivation: false,
          requiresFreshSiblingEvidence: false,
        },
        sourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification: {
          verificationVersion: "Node v627",
          inputSnapshotVersion: "Node v626",
          verificationState: "ready-for-read-only-handoff-route-coverage-archive-summary-receipt-archive-verification",
          readyForReadOnlyHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification: true,
          gateCount: 8,
          passedGateCount: 8,
          blockedReasonCodes: [],
          archivedSectionCount: 2,
          receiptLineCount: 5,
          summaryLineCount: 6,
          blockedReasonCount: 0,
          requiresApproval: false,
          requiresRoutingActivation: false,
          requiresFreshSiblingEvidence: false,
        },
      },
      checks: {
        upstreamProbesEnabledForPreview: true,
        upstreamActionsDisabled: true,
        bothPreviewsReady: true,
        nodeDoesNotStartUpstreams: true,
        nodeDoesNotStopUpstreams: true,
        nodeDoesNotMutateSiblingState: true,
        noActiveShardRouter: true,
        noWriteRouting: true,
        noLoadRestoreCompact: true,
        noManagedAuditConnection: true,
        sourceMatrixConsumptionPlanReady: true,
        sourceMatrixConsumptionPlanHasNoBlockedSteps: true,
        sourceMatrixConsumptionPlanHasNoUnsafeSteps: true,
        sourceMatrixConsumptionPlanRiskAccepted: true,
        sourceMatrixConsumptionPlanPromotionHoldSafe: true,
        sourceMatrixConsumptionPlanPromotionHoldClosureReady: true,
        productionWindowStillBlocked: true,
        readyForControlledReadOnlyShardPreview: true,
      },
      summary: {
        checkCount: 29,
        passedCheckCount: 29,
        attemptedReadCount: 2,
        passedReadCount: 2,
        failedReadCount: 0,
        skippedReadCount: 0,
        productionBlockerCount: 0,
        warningCount: 1,
        recommendationCount: 1,
      },
    });
    expect(profile.recommendations).toEqual([
      expect.objectContaining({
        code: "CONSUME_SOURCE_MATRIX_PLAN_READ_ONLY",
        source: "next-plan",
        message: expect.stringContaining("4 source matrix plan step records"),
      }),
    ]);
    expect(profile.recommendations[0]?.message)
      .toContain("routingActivationAllowedSteps=0, writesAllowedSteps=0");
    expect(profile.recommendations[0]?.message)
      .toContain("level=review, reviewRequired=true, blocked=false, unsafeSteps=0, reasons=PLAN_HAS_REVIEW_STEPS");
    expect(profile.recommendations[0]?.message)
      .toContain("state=read-only-review-required, nextAllowedAction=review-read-only-risk");
    expect(profile.recommendations[0]?.message).toContain("closureCriterionCount=5");
    expect(profile.nextActions).toEqual([
      expect.stringContaining("observe-sources:ready"),
      expect.stringContaining("routingActivationAllowedSteps=0, writesAllowedSteps=0"),
      expect.stringContaining("level=review, reviewRequired=true, blocked=false, unsafeSteps=0"),
      expect.stringContaining("state=read-only-review-required, nextAllowedAction=review-read-only-risk"),
      expect.stringContaining("independently started services"),
    ]);
    expect(profile.preview.previewDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preview.sourceMatrixConsumptionPlan.planDigest.value).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preview.sourceMatrixReviewDigest.value).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preview.sourceMatrixArchiveSnapshot.digestValue).toBe(profile.preview.sourceMatrixReviewDigest.value);
    expect(profile.preview.sourceMatrixArchiveSnapshotSummaryExport.digestValue)
      .toBe(profile.preview.sourceMatrixReviewDigest.value);
    expect(profile.preview.sourceMatrixArchiveSnapshotSummaryExport.summaryDigest.value).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preview.sourceMatrixHandoffNotes.handoffDigest.value).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preview.sourceMatrixHandoffSummary.handoffDigestValue)
      .toBe(profile.preview.sourceMatrixHandoffNotes.handoffDigest.value);
    expect(profile.preview.sourceMatrixHandoffSummary.summaryDigest.value).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preview.sourceMatrixHandoffSummaryConsumer.summaryDigestValue)
      .toBe(profile.preview.sourceMatrixHandoffSummary.summaryDigest.value);
    expect(profile.preview.sourceMatrixHandoffSummaryConsumerExport.summaryDigestValue)
      .toBe(profile.preview.sourceMatrixHandoffSummary.summaryDigest.value);
    expect(profile.preview.sourceMatrixHandoffSummaryConsumerExport.exportDigest.value).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preview.sourceMatrixHandoffSummaryConsumerReceipt.exportDigestValue)
      .toBe(profile.preview.sourceMatrixHandoffSummaryConsumerExport.exportDigest.value);
    expect(profile.preview.sourceMatrixHandoffSummaryConsumerReceipt.receiptDigest.value).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preview.sourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot.receiptDigestValue)
      .toBe(profile.preview.sourceMatrixHandoffSummaryConsumerReceipt.receiptDigest.value);
    expect(profile.preview.sourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot.snapshotDigest.value)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preview.sourceMatrixHandoffSummaryConsumerReceiptArchiveVerification.snapshotDigestValue)
      .toBe(profile.preview.sourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot.snapshotDigest.value);
    expect(profile.preview.sourceMatrixHandoffRouteCoverage.coverageDigest.value).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preview.sourceMatrixHandoffRouteCoverageVerification.coverageDigestValue)
      .toBe(profile.preview.sourceMatrixHandoffRouteCoverage.coverageDigest.value);
    expect(profile.preview.sourceMatrixHandoffRouteCoverageArchiveSnapshot.coverageDigestValue)
      .toBe(profile.preview.sourceMatrixHandoffRouteCoverage.coverageDigest.value);
    expect(profile.preview.sourceMatrixHandoffRouteCoverageArchiveSnapshot.snapshotDigest.value)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preview.sourceMatrixHandoffRouteCoverageArchiveVerification.snapshotDigestValue)
      .toBe(profile.preview.sourceMatrixHandoffRouteCoverageArchiveSnapshot.snapshotDigest.value);
    expect(profile.preview.sourceMatrixHandoffRouteCoverageArchiveSummary.snapshotDigestValue)
      .toBe(profile.preview.sourceMatrixHandoffRouteCoverageArchiveSnapshot.snapshotDigest.value);
    expect(profile.preview.sourceMatrixHandoffRouteCoverageArchiveSummary.summaryDigest.value)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preview.sourceMatrixHandoffRouteCoverageArchiveSummaryReceipt.summaryDigestValue)
      .toBe(profile.preview.sourceMatrixHandoffRouteCoverageArchiveSummary.summaryDigest.value);
    expect(profile.preview.sourceMatrixHandoffRouteCoverageArchiveSummaryReceipt.receiptDigest.value)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preview.sourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot.receiptDigestValue)
      .toBe(profile.preview.sourceMatrixHandoffRouteCoverageArchiveSummaryReceipt.receiptDigest.value);
    expect(profile.preview.sourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot.snapshotDigest.value)
      .toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preview.sourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification.snapshotDigestValue)
      .toBe(profile.preview.sourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot.snapshotDigest.value);
  }, 60000);

  it("fails closed without reading upstreams when probes are disabled", async () => {
    let javaCalls = 0;
    let miniKvCalls = 0;
    const profile =
      await loadManagedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreview({
        config: loadTestConfig({ UPSTREAM_PROBES_ENABLED: "false" }),
        orderPlatform: {
          shardReadiness: async () => {
            javaCalls += 1;
            return { statusCode: 200, latencyMs: 1, data: javaEvidence };
          },
        } as OrderPlatformClient,
        miniKv: {
          shardJson: async () => {
            miniKvCalls += 1;
            return {
              command: "SHARDJSON",
              response: JSON.stringify(miniKvEvidence),
              latencyMs: 1,
              readiness: miniKvEvidence,
            };
          },
        } as MiniKvClient,
      });

    expect(profile.previewState).toBe("blocked");
    expect(profile.readyForControlledReadOnlyShardPreview).toBe(false);
    expect(profile.reads.java.status).toBe("skipped-probes-disabled");
    expect(profile.reads.miniKv.status).toBe("skipped-probes-disabled");
    expect(profile.productionBlockers.map((blocker) => blocker.code)).toEqual(expect.arrayContaining([
      "UPSTREAM_PROBES_DISABLED",
      "JAVA_PREVIEW_NOT_ATTEMPTED",
      "MINI_KV_PREVIEW_NOT_ATTEMPTED",
      "SOURCE_MATRIX_CONSUMPTION_PLAN_BLOCKED",
      "SOURCE_MATRIX_CONSUMPTION_PLAN_HAS_BLOCKED_STEPS",
      "SOURCE_MATRIX_CONSUMPTION_PLAN_RISK_BLOCKED",
    ]));
    expect(profile.recommendations).toEqual([
      expect.objectContaining({
        code: "REPAIR_SOURCE_MATRIX_CONSUMPTION_PLAN",
        source: "next-plan",
        message: expect.stringContaining("SOURCE_NOT_READY"),
      }),
    ]);
    expect(profile.recommendations[0]?.message)
      .toContain("routingActivationAllowedSteps=0, writesAllowedSteps=0");
    expect(profile.recommendations[0]?.message)
      .toContain("level=blocked, reviewRequired=false, blocked=true, unsafeSteps=0");
    expect(profile.recommendations[0]?.message)
      .toContain("state=repair-required, nextAllowedAction=repair-plan-risk");
    expect(profile.recommendations[0]?.message).toContain("closureCriterionCount=4");
    expect(profile.nextActions).toEqual([
      expect.stringContaining("SOURCE_NOT_READY"),
      expect.stringContaining("routingActivationAllowedSteps=0, writesAllowedSteps=0"),
      expect.stringContaining("level=blocked, reviewRequired=false, blocked=true, unsafeSteps=0"),
      expect.stringContaining("state=repair-required, nextAllowedAction=repair-plan-risk"),
      expect.stringContaining("Do not start"),
    ]);
    expect(javaCalls).toBe(0);
    expect(miniKvCalls).toBe(0);
    expect(profile.startsJavaService).toBe(false);
    expect(profile.startsMiniKvService).toBe(false);
    expect(profile.preview.sourceMatrixConsumer).toMatchObject({
      decision: "blocked",
      readyForControlledReadOnlyConsumption: false,
      passedGateCount: 2,
      blockedReasonCodes: [
        "SOURCE_NOT_READY",
        "SHARD_COUNTS_NOT_COMPARABLE",
        "SLOT_COUNTS_NOT_COMPARABLE",
        "ROUTING_MODE_NOT_DECLARED",
      ],
      activatesRouting: false,
    });
    expect(profile.preview.sourceMatrixDriftSummary).toMatchObject({
      driftState: "blocked",
      readyForControlledDriftReview: false,
      driftFindingCount: 0,
      blockingFindingCount: 4,
      requiresRoutingActivation: false,
    });
    expect(profile.preview.sourceMatrixConsumptionPlan).toMatchObject({
      planVersion: "Node v638",
      planState: "blocked",
      readyForReadOnlyConsumptionPlan: false,
      blockedReasonCodes: [
        "SOURCE_NOT_READY",
        "SHARD_COUNTS_NOT_COMPARABLE",
        "SLOT_COUNTS_NOT_COMPARABLE",
        "ROUTING_MODE_NOT_DECLARED",
      ],
      planStepRecordCount: 3,
      riskSummary: {
        riskLevel: "blocked",
        blocked: true,
      },
      requiresRoutingActivation: false,
    });
    expect(profile.preview.sourceMatrixReviewChecklist).toMatchObject({
      checklistState: "blocked",
      readyForOperatorReview: false,
      reviewItemCount: 0,
      blockedItemCount: 2,
      requiresApproval: false,
      requiresRoutingActivation: false,
    });
    expect(profile.preview.sourceMatrixReviewDigest).toMatchObject({
      digestVersion: "Node v602",
      algorithm: "sha256",
      readyForControlledReviewArchive: false,
      checklistState: "blocked",
      blockedItemCount: 2,
      requiresApproval: false,
      requiresRoutingActivation: false,
    });
    expect(profile.preview.sourceMatrixReviewDigest.value).toMatch(/^[a-f0-9]{64}$/);
    expect(profile.preview.sourceMatrixArchiveSnapshot).toMatchObject({
      snapshotVersion: "Node v603",
      archiveState: "blocked",
      readyForControlledReviewArchive: false,
      archivedSectionCount: 5,
      checklistState: "blocked",
      blockedItemCount: 2,
      includesRawCredential: false,
      includesRuntimePayload: false,
      requiresRoutingActivation: false,
    });
    expect(profile.preview.sourceMatrixArchiveSnapshotSummaryExport).toMatchObject({
      exportState: "blocked",
      readyForSummaryExport: false,
      summaryDigest: {
        algorithm: "sha256",
        scope: "archive-snapshot-summary-lines",
        coveredLineCount: 5,
      },
      summaryLineCount: 5,
      archivedSectionCount: 5,
      blockedItemCount: 2,
      includesRawCredential: false,
      includesRuntimePayload: false,
      requiresRoutingActivation: false,
    });
    expect(profile.preview.sourceMatrixHandoffNotes).toMatchObject({
      handoffState: "blocked",
      readyForReadOnlyHandoff: false,
      handoffDigest: {
        algorithm: "sha256",
        scope: "read-only-handoff-notes",
        coveredNoteCount: 4,
      },
      noteCount: 4,
      actionRequiredCount: 1,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
    expect(profile.preview.sourceMatrixHandoffSummary).toMatchObject({
      summaryState: "blocked",
      readyForReadOnlyHandoffSummary: false,
      audiences: ["operator", "node", "java", "miniKv"],
      audienceCount: 4,
      actionRequiredCount: 1,
      summaryDigest: {
        algorithm: "sha256",
        scope: "read-only-handoff-summary",
        coveredAudienceCount: 4,
        coveredActionRequiredCount: 1,
      },
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
    expect(profile.preview.sourceMatrixHandoffSummaryConsumer).toMatchObject({
      decision: "blocked",
      readyForReadOnlySummaryConsumption: false,
      passedGateCount: 4,
      blockedReasonCodes: [
        "HANDOFF_SUMMARY_NOT_READY",
        "HANDOFF_SUMMARY_ACTION_REQUIRED",
      ],
      summaryDigestScope: "read-only-handoff-summary",
      coveredAudienceCount: 4,
      actionRequiredCount: 1,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
    expect(profile.preview.sourceMatrixHandoffSummaryConsumerExport).toMatchObject({
      exportState: "blocked",
      readyForReadOnlySummaryConsumerExport: false,
      consumerDecision: "blocked",
      exportDigest: {
        algorithm: "sha256",
        scope: "handoff-summary-consumer-export-lines",
        coveredLineCount: 5,
      },
      exportLineCount: 5,
      gateCount: 6,
      passedGateCount: 4,
      blockedReasonCount: 2,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
    expect(profile.preview.sourceMatrixHandoffSummaryConsumerReceipt).toMatchObject({
      receiptState: "blocked",
      readyForReadOnlySummaryConsumerReceipt: false,
      exportState: "blocked",
      receiptDigest: {
        algorithm: "sha256",
        scope: "handoff-summary-consumer-receipt",
        coveredExportLineCount: 5,
        coveredBlockedReasonCount: 2,
      },
      receiptLineCount: 5,
      exportLineCount: 5,
      blockedReasonCount: 2,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
    expect(profile.preview.sourceMatrixHandoffSummaryConsumerReceiptArchiveSnapshot).toMatchObject({
      snapshotState: "blocked",
      readyForReadOnlySummaryConsumerReceiptArchive: false,
      snapshotDigest: {
        algorithm: "sha256",
        scope: "handoff-summary-consumer-receipt-archive-snapshot",
        coveredSectionCount: 3,
      },
      archivedSectionCount: 3,
      receiptLineCount: 5,
      blockedReasonCount: 2,
      includesRawCredential: false,
      includesRuntimePayload: false,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
    expect(profile.preview.sourceMatrixHandoffSummaryConsumerReceiptArchiveVerification).toMatchObject({
      verificationState: "blocked",
      readyForReadOnlySummaryConsumerReceiptArchiveVerification: false,
      passedGateCount: 5,
      blockedReasonCodes: ["HANDOFF_RECEIPT_ARCHIVE_SNAPSHOT_NOT_READY"],
      archivedSectionCount: 3,
      blockedReasonCount: 2,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
    expect(profile.preview.sourceMatrixHandoffRouteCoverage).toMatchObject({
      coverageState: "blocked",
      readyForReadOnlyHandoffRouteCoverage: false,
      routeSurface: "controlled-read-only-shard-preview",
      verificationState: "blocked",
      coveredSectionCount: 7,
      coverageDigest: {
        algorithm: "sha256",
        scope: "handoff-route-markdown-sections",
        coveredSectionCount: 7,
      },
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
    expect(profile.preview.sourceMatrixHandoffRouteCoverageVerification).toMatchObject({
      verificationState: "blocked",
      readyForReadOnlyHandoffRouteCoverageVerification: false,
      passedGateCount: 5,
      blockedReasonCodes: ["HANDOFF_ROUTE_COVERAGE_NOT_READY"],
      coveredSectionCount: 7,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
    expect(profile.preview.sourceMatrixHandoffRouteCoverageArchiveSnapshot).toMatchObject({
      snapshotState: "blocked",
      readyForReadOnlyHandoffRouteCoverageArchive: false,
      snapshotDigest: {
        algorithm: "sha256",
        scope: "handoff-route-coverage-archive-snapshot",
        coveredSectionCount: 2,
      },
      archivedSectionCount: 2,
      verificationGateCount: 6,
      verificationPassedGateCount: 5,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
    expect(profile.preview.sourceMatrixHandoffRouteCoverageArchiveVerification).toMatchObject({
      verificationState: "blocked",
      readyForReadOnlyHandoffRouteCoverageArchiveVerification: false,
      gateCount: 7,
      passedGateCount: 6,
      blockedReasonCodes: ["HANDOFF_ROUTE_COVERAGE_ARCHIVE_SNAPSHOT_NOT_READY"],
      archivedSectionCount: 2,
      verificationGateCount: 6,
      verificationPassedGateCount: 5,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
    expect(profile.preview.sourceMatrixHandoffRouteCoverageArchiveSummary).toMatchObject({
      summaryState: "blocked",
      readyForReadOnlyHandoffRouteCoverageArchiveSummary: false,
      verificationState: "blocked",
      summaryDigest: {
        algorithm: "sha256",
        scope: "handoff-route-coverage-archive-summary-lines",
        coveredLineCount: 6,
      },
      summaryLineCount: 6,
      gateCount: 7,
      passedGateCount: 6,
      archivedSectionCount: 2,
      blockedReasonCount: 1,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
    expect(profile.preview.sourceMatrixHandoffRouteCoverageArchiveSummaryReceipt).toMatchObject({
      receiptState: "blocked",
      readyForReadOnlyHandoffRouteCoverageArchiveSummaryReceipt: false,
      summaryState: "blocked",
      receiptDigest: {
        algorithm: "sha256",
        scope: "handoff-route-coverage-archive-summary-receipt",
        coveredSummaryLineCount: 6,
        coveredBlockedReasonCount: 1,
      },
      receiptLineCount: 5,
      summaryLineCount: 6,
      gateCount: 7,
      passedGateCount: 6,
      blockedReasonCount: 1,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
    expect(profile.preview.sourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveSnapshot).toMatchObject({
      snapshotState: "blocked",
      readyForReadOnlyHandoffRouteCoverageArchiveSummaryReceiptArchive: false,
      snapshotDigest: {
        algorithm: "sha256",
        scope: "handoff-route-coverage-archive-summary-receipt-archive-snapshot",
        coveredSectionCount: 2,
      },
      archivedSectionCount: 2,
      receiptLineCount: 5,
      summaryLineCount: 6,
      blockedReasonCount: 1,
      includesRawCredential: false,
      includesRuntimePayload: false,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
    expect(profile.preview.sourceMatrixHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification).toMatchObject({
      verificationState: "blocked",
      readyForReadOnlyHandoffRouteCoverageArchiveSummaryReceiptArchiveVerification: false,
      gateCount: 8,
      passedGateCount: 7,
      blockedReasonCodes: ["HANDOFF_ROUTE_COVERAGE_SUMMARY_RECEIPT_ARCHIVE_SNAPSHOT_NOT_READY"],
      archivedSectionCount: 2,
      receiptLineCount: 5,
      summaryLineCount: 6,
      blockedReasonCount: 1,
      requiresApproval: false,
      requiresRoutingActivation: false,
      requiresFreshSiblingEvidence: false,
    });
  }, 60000);

});
