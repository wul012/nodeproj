import { createHash } from "node:crypto";

import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  readHistoricalEvidenceFile,
  resolveHistoricalEvidencePath,
  statHistoricalEvidence,
} from "./historicalEvidenceResolver.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract.js";
import {
  loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification.js";
import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractTypes.js";
import type {
  ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationProfile,
} from "./managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationTypes.js";
import type {
  CredentialResolverFakeShellArchiveEvidence,
  CredentialResolverFakeShellArchiveFileEvidence,
  CredentialResolverFakeShellArchiveSnippetEvidence,
  CredentialResolverFakeShellArchiveVerificationChecks,
  CredentialResolverFakeShellArchiveVerificationMessage,
  ManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerificationProfile,
  SourceNodeV264FakeShellContractSummary,
  SourceNodeV265FakeShellUpstreamEchoSummary,
} from "./managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerificationTypes.js";
export {
  renderManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerificationMarkdown,
} from "./managedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerificationRenderer.js";

const PROFILE_VERSION =
  "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification.v1";
const ROUTE_PATH =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification";
const SOURCE_NODE_V264_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-contract";
const SOURCE_NODE_V265_ROUTE =
  "/api/v1/audit/managed-audit-manual-sandbox-connection-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification";
const ACTIVE_PLAN = "docs/plans/v263-post-disabled-resolver-echo-roadmap.md";

const ARCHIVE_PATHS = Object.freeze({
  v264Html: "c/264/sandbox-endpoint-credential-resolver-test-only-shell-contract-v264.html",
  v264Screenshot: "c/264/图片/sandbox-endpoint-credential-resolver-test-only-shell-contract-v264.png",
  v264Explanation: "c/264/解释/sandbox-endpoint-credential-resolver-test-only-shell-contract-v264.md",
  v264Walkthrough:
    "代码讲解记录_生产雏形阶段/268-sandbox-endpoint-credential-resolver-test-only-shell-contract-v264.md",
  v265Html:
    "c/265/sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-v265.html",
  v265Screenshot:
    "c/265/图片/sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-v265.png",
  v265Explanation:
    "c/265/解释/sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-v265.md",
  v265Walkthrough:
    "代码讲解记录_生产雏形阶段/269-sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-v265.md",
  activePlan: ACTIVE_PLAN,
});

const WORKSPACE_ROOT = "D:/nodeproj/orderops-node/";

export function loadManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification(input: {
  config: AppConfig;
}): ManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerificationProfile {
  const sourceNodeV264 = createSourceNodeV264(
    loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract({ config: input.config }),
  );
  const sourceNodeV265 = createSourceNodeV265(
    loadManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification({
      config: input.config,
    }),
  );
  const archivedEvidence = createArchiveEvidence();
  const checks = createChecks(input.config, sourceNodeV264, sourceNodeV265, archivedEvidence);
  checks.readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification =
    Object.entries(checks)
      .filter(([key]) =>
        key !== "readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification")
      .every(([, value]) => value);
  const archiveVerificationState = checks.readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification
    ? "credential-resolver-fake-shell-archive-verification-ready"
    : "blocked";
  const archiveVerificationDigest = sha256StableJson({
    profileVersion: PROFILE_VERSION,
    archiveVerificationState,
    sourceNodeV264,
    sourceNodeV265,
    fileDigests: archivedEvidence.files.map((file) => ({ id: file.id, digest: file.digest })),
    snippetMatches: archivedEvidence.snippetMatches.map((snippetMatch) => ({
      id: snippetMatch.id,
      matched: snippetMatch.matched,
    })),
    checks,
  });
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();

  return {
    service: "orderops-node",
    title: "Managed audit manual sandbox connection credential resolver fake shell archive verification",
    generatedAt: new Date().toISOString(),
    profileVersion: PROFILE_VERSION,
    archiveVerificationState,
    readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification:
      checks.readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification,
    readyForManagedAuditSandboxAdapterConnection: false,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyArchiveVerification: true,
    archiveVerificationRerunsFakeShellBehavior: false,
    executionAllowed: false,
    connectsManagedAudit: false,
    readsManagedAuditCredential: false,
    storesManagedAuditCredential: false,
    credentialValueRead: false,
    rawEndpointUrlParsed: false,
    externalRequestSent: false,
    secretProviderInstantiated: false,
    resolverClientInstantiated: false,
    schemaMigrationExecuted: false,
    automaticUpstreamStart: false,
    sourceNodeV264,
    sourceNodeV265,
    archivedEvidence,
    archiveVerification: {
      archiveVerificationDigest,
      evidenceSpan: "Node v264 credential resolver fake shell contract + Node v265 upstream echo archive",
      sourceNodeV264ContractDigest: sourceNodeV264.contractDigest,
      sourceNodeV265VerificationDigest: sourceNodeV265.verificationDigest,
      sourceNodeV264RoutePath: SOURCE_NODE_V264_ROUTE,
      sourceNodeV265RoutePath: SOURCE_NODE_V265_ROUTE,
      archiveVerificationReadsFilesOnly: true,
      archiveVerificationRerunsFakeShellBehavior: false,
      upstreamActionsEnabled: input.config.upstreamActionsEnabled,
      productionAuditAllowed: false,
    },
    checks,
    summary: {
      checkCount: countReportChecks(checks),
      passedCheckCount: countPassedReportChecks(checks),
      archiveFileCount: archivedEvidence.files.length,
      requiredSnippetCount: archivedEvidence.requiredSnippetCount,
      matchedSnippetCount: archivedEvidence.matchedSnippetCount,
      productionBlockerCount: productionBlockers.length,
      warningCount: warnings.length,
      recommendationCount: recommendations.length,
    },
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: {
      archiveVerificationJson: ROUTE_PATH,
      archiveVerificationMarkdown: `${ROUTE_PATH}?format=markdown`,
      sourceNodeV264Json: SOURCE_NODE_V264_ROUTE,
      sourceNodeV264Markdown: `${SOURCE_NODE_V264_ROUTE}?format=markdown`,
      sourceNodeV265Json: SOURCE_NODE_V265_ROUTE,
      sourceNodeV265Markdown: `${SOURCE_NODE_V265_ROUTE}?format=markdown`,
      v264HtmlArchive: ARCHIVE_PATHS.v264Html,
      v264Screenshot: ARCHIVE_PATHS.v264Screenshot,
      v264Explanation: ARCHIVE_PATHS.v264Explanation,
      v264CodeWalkthrough: ARCHIVE_PATHS.v264Walkthrough,
      v265HtmlArchive: ARCHIVE_PATHS.v265Html,
      v265Screenshot: ARCHIVE_PATHS.v265Screenshot,
      v265Explanation: ARCHIVE_PATHS.v265Explanation,
      v265CodeWalkthrough: ARCHIVE_PATHS.v265Walkthrough,
      activePlan: ACTIVE_PLAN,
    },
    nextActions: [
      "Close the v263-derived credential resolver fake-shell plan after v266 is archived.",
      "Write a new post-v266 plan before any new credential resolver surface or real sandbox connection step.",
      "Keep real secret provider, credential value loading, raw endpoint parsing, external request, schema migration, and auto-start blocked.",
    ],
  };
}

function createSourceNodeV264(
  source: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContractProfile,
): SourceNodeV264FakeShellContractSummary {
  return {
    sourceVersion: "Node v264",
    profileVersion: source.profileVersion,
    shellContractState: source.shellContractState,
    readyForTestOnlyShellContract:
      source.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract,
    contractDigest: source.resolverShellContract.contractDigest,
    shellMode: source.resolverShellContract.shellMode,
    resolverKind: source.resolverShellContract.resolverKind,
    requestShapeFieldCount: source.summary.requestShapeFieldCount,
    responseShapeFieldCount: source.summary.responseShapeFieldCount,
    failureMappingCount: source.summary.failureMappingCount,
    guardConditionCount: source.summary.guardConditionCount,
    fakeResolverOnly: source.fakeResolverOnly,
    handleOnlyRequest: source.handleOnlyRequest,
    credentialResolverExecutionAllowed: source.credentialResolverExecutionAllowed,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    secretProviderInstantiated: source.secretProviderInstantiated,
    resolverClientInstantiated: source.resolverClientInstantiated,
    connectsManagedAudit: source.connectsManagedAudit,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createSourceNodeV265(
  source: ManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerificationProfile,
): SourceNodeV265FakeShellUpstreamEchoSummary {
  return {
    sourceVersion: "Node v265",
    profileVersion: source.profileVersion,
    verificationState: source.verificationState,
    readyForUpstreamEchoVerification:
      source.readyForManagedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification,
    verificationDigest: source.echoVerification.verificationDigest,
    verificationMode: source.echoVerification.verificationMode,
    sourceSpan: source.echoVerification.sourceSpan,
    sourceNodeV264Ready: source.checks.sourceNodeV264Ready,
    javaV107EchoReady: source.checks.javaV107EchoReady,
    miniKvV116NonParticipationReady: source.checks.miniKvV116NonParticipationReady,
    javaV109OptimizationContextReady: source.checks.javaV109OptimizationContextReady,
    requestShapeFieldCount: source.summary.requestShapeFieldCount,
    responseShapeFieldCount: source.summary.responseShapeFieldCount,
    failureMappingCount: source.summary.failureMappingCount,
    guardConditionCount: source.summary.guardConditionCount,
    checkCount: source.summary.checkCount,
    passedCheckCount: source.summary.passedCheckCount,
    productionBlockerCount: source.summary.productionBlockerCount,
    credentialBoundaryAligned: source.echoVerification.credentialBoundaryAligned,
    rawEndpointBoundaryAligned: source.echoVerification.rawEndpointBoundaryAligned,
    connectionBoundaryAligned: source.echoVerification.connectionBoundaryAligned,
    writeBoundaryAligned: source.echoVerification.writeBoundaryAligned,
    autoStartBoundaryAligned: source.echoVerification.autoStartBoundaryAligned,
    credentialResolverExecutionAllowed: source.credentialResolverExecutionAllowed,
    credentialValueRead: source.credentialValueRead,
    rawEndpointUrlParsed: source.rawEndpointUrlParsed,
    externalRequestSent: source.externalRequestSent,
    secretProviderInstantiated: source.secretProviderInstantiated,
    resolverClientInstantiated: source.resolverClientInstantiated,
    connectsManagedAudit: source.connectsManagedAudit,
    schemaMigrationExecuted: source.schemaMigrationExecuted,
    automaticUpstreamStart: source.automaticUpstreamStart,
  };
}

function createArchiveEvidence(): CredentialResolverFakeShellArchiveEvidence {
  const files = [
    fileEvidence("v264-html-archive", ARCHIVE_PATHS.v264Html),
    fileEvidence("v264-screenshot", ARCHIVE_PATHS.v264Screenshot),
    fileEvidence("v264-explanation", ARCHIVE_PATHS.v264Explanation),
    fileEvidence("v264-code-walkthrough", ARCHIVE_PATHS.v264Walkthrough),
    fileEvidence("v265-html-archive", ARCHIVE_PATHS.v265Html),
    fileEvidence("v265-screenshot", ARCHIVE_PATHS.v265Screenshot),
    fileEvidence("v265-explanation", ARCHIVE_PATHS.v265Explanation),
    fileEvidence("v265-code-walkthrough", ARCHIVE_PATHS.v265Walkthrough),
    fileEvidence("active-plan", ARCHIVE_PATHS.activePlan),
  ];
  const snippetMatches = createSnippetEvidence();

  return {
    archiveRoots: ["c/264/", "c/265/"],
    sourceVersions: ["Node v264", "Node v265"],
    files,
    requiredSnippetCount: snippetMatches.length,
    matchedSnippetCount: snippetMatches.filter((snippetMatch) => snippetMatch.matched).length,
    snippetMatches,
  };
}

function fileEvidence(id: string, workspacePath: string): CredentialResolverFakeShellArchiveFileEvidence {
  const historicalPath = toHistoricalPath(workspacePath);
  const resolvedPath = resolveHistoricalEvidencePath(historicalPath);
  try {
    const content = readHistoricalEvidenceFile(historicalPath);
    return {
      id,
      workspacePath,
      historicalPath,
      resolvedPath,
      exists: true,
      sizeBytes: statHistoricalEvidence(historicalPath).size,
      digest: createHash("sha256").update(content).digest("hex"),
    };
  } catch {
    return {
      id,
      workspacePath,
      historicalPath,
      resolvedPath,
      exists: false,
      sizeBytes: 0,
      digest: null,
    };
  }
}

function createSnippetEvidence(): CredentialResolverFakeShellArchiveSnippetEvidence[] {
  return [
    snippet("v264-html-title", ARCHIVE_PATHS.v264Html, "Node v264 Credential Resolver Test-only Shell Contract"),
    snippet("v264-html-ready", ARCHIVE_PATHS.v264Html, "sandbox-endpoint-credential-resolver-test-only-shell-contract-ready"),
    snippet("v264-explanation-profile", ARCHIVE_PATHS.v264Explanation, "shellContractState=sandbox-endpoint-credential-resolver-test-only-shell-contract-ready"),
    snippet("v264-explanation-no-real-resolver", ARCHIVE_PATHS.v264Explanation, "不实例化真实 resolver client"),
    snippet("v264-explanation-smoke", ARCHIVE_PATHS.v264Explanation, "safe HTTP smoke -> passed"),
    snippet("v264-explanation-screenshot", ARCHIVE_PATHS.v264Explanation, "Chrome screenshot -> c/264/图片/sandbox-endpoint-credential-resolver-test-only-shell-contract-v264.png"),
    snippet("v264-walkthrough-service", ARCHIVE_PATHS.v264Walkthrough, "managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellContract.ts"),
    snippet("v264-walkthrough-request", ARCHIVE_PATHS.v264Walkthrough, "createRequestShape()"),
    snippet("v264-walkthrough-failure", ARCHIVE_PATHS.v264Walkthrough, "createFailureMapping()"),
    snippet("v264-walkthrough-tests", ARCHIVE_PATHS.v264Walkthrough, "npm test -> 204 files, 687 tests passed"),
    snippet("v265-html-title", ARCHIVE_PATHS.v265Html, "Node v265 test-only resolver shell upstream echo verification"),
    snippet("v265-html-ready", ARCHIVE_PATHS.v265Html, "sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-ready"),
    snippet("v265-explanation-profile", ARCHIVE_PATHS.v265Explanation, "verificationState=sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-ready"),
    snippet("v265-explanation-java-v109", ARCHIVE_PATHS.v265Explanation, "javaV109OptimizationContextReady=true"),
    snippet("v265-explanation-smoke", ARCHIVE_PATHS.v265Explanation, "safe HTTP smoke -> passed"),
    snippet("v265-explanation-screenshot", ARCHIVE_PATHS.v265Explanation, "Chrome screenshot -> c/265/图片/sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-v265.png"),
    snippet("v265-walkthrough-service", ARCHIVE_PATHS.v265Walkthrough, "managedAuditManualSandboxConnectionSandboxEndpointCredentialResolverTestOnlyShellUpstreamEchoVerification.ts"),
    snippet("v265-walkthrough-java-v107", ARCHIVE_PATHS.v265Walkthrough, "createJavaV107Reference()"),
    snippet("v265-walkthrough-mini-kv-v116", ARCHIVE_PATHS.v265Walkthrough, "mini-kv v116 non-participation"),
    snippet("v265-walkthrough-tests", ARCHIVE_PATHS.v265Walkthrough, "npm test -> 205 files, 691 tests passed"),
    snippet("plan-v266", ARCHIVE_PATHS.activePlan, "Node v266：credential resolver fake-shell archive verification"),
    snippet("plan-v266-archive-only", ARCHIVE_PATHS.activePlan, "只读验证 Node v264 / v265 的 HTML、截图、解释、代码讲解、route digest、historical fallback 和 active plan 片段"),
    snippet("plan-no-rerun", ARCHIVE_PATHS.activePlan, "不重新执行 fake resolver shell"),
    snippet("plan-no-real-provider", ARCHIVE_PATHS.activePlan, "不接入真实 secret provider，不打开真实 managed audit connection"),
  ];
}

function snippet(
  id: string,
  workspacePath: string,
  expectedText: string,
): CredentialResolverFakeShellArchiveSnippetEvidence {
  const text = readUtf8(workspacePath);
  return {
    id,
    workspacePath,
    expectedText,
    matched: text.includes(expectedText),
  };
}

function readUtf8(workspacePath: string): string {
  try {
    return readHistoricalEvidenceFile(toHistoricalPath(workspacePath), "utf8");
  } catch {
    return "";
  }
}

function createChecks(
  config: AppConfig,
  sourceNodeV264: SourceNodeV264FakeShellContractSummary,
  sourceNodeV265: SourceNodeV265FakeShellUpstreamEchoSummary,
  archivedEvidence: CredentialResolverFakeShellArchiveEvidence,
): CredentialResolverFakeShellArchiveVerificationChecks {
  const fileById = new Map(archivedEvidence.files.map((file) => [file.id, file]));
  const snippetMatched = (id: string) => archivedEvidence.snippetMatches.some(
    (snippetMatch) => snippetMatch.id === id && snippetMatch.matched,
  );
  const digestValid = (digest: string) => /^[a-f0-9]{64}$/.test(digest);

  return {
    sourceNodeV264Ready: sourceNodeV264.readyForTestOnlyShellContract
      && sourceNodeV264.shellContractState === "sandbox-endpoint-credential-resolver-test-only-shell-contract-ready",
    sourceNodeV264DigestValid: digestValid(sourceNodeV264.contractDigest),
    sourceNodeV265Ready: sourceNodeV265.readyForUpstreamEchoVerification
      && sourceNodeV265.verificationState
        === "sandbox-endpoint-credential-resolver-test-only-shell-upstream-echo-verification-ready",
    sourceNodeV265DigestValid: digestValid(sourceNodeV265.verificationDigest),
    sourceNodeV265ConsumesUpstreamEchoes: sourceNodeV265.sourceNodeV264Ready
      && sourceNodeV265.javaV107EchoReady
      && sourceNodeV265.miniKvV116NonParticipationReady
      && sourceNodeV265.javaV109OptimizationContextReady,
    archiveFilesPresent: archivedEvidence.files.every((file) => file.exists),
    archiveFilesNonEmpty: archivedEvidence.files.every((file) => file.sizeBytes > 0),
    v264HtmlPresent: fileById.get("v264-html-archive")?.exists === true,
    v264ScreenshotPresent: fileById.get("v264-screenshot")?.exists === true,
    v264ScreenshotNonEmpty: (fileById.get("v264-screenshot")?.sizeBytes ?? 0) > 0,
    v264ExplanationPresent: fileById.get("v264-explanation")?.exists === true,
    v264CodeWalkthroughPresent: fileById.get("v264-code-walkthrough")?.exists === true,
    v265HtmlPresent: fileById.get("v265-html-archive")?.exists === true,
    v265ScreenshotPresent: fileById.get("v265-screenshot")?.exists === true,
    v265ScreenshotNonEmpty: (fileById.get("v265-screenshot")?.sizeBytes ?? 0) > 0,
    v265ExplanationPresent: fileById.get("v265-explanation")?.exists === true,
    v265CodeWalkthroughPresent: fileById.get("v265-code-walkthrough")?.exists === true,
    archiveSnippetsMatched: archivedEvidence.matchedSnippetCount === archivedEvidence.requiredSnippetCount,
    v264ArchiveRecordsFakeShellContract: snippetMatched("v264-html-title")
      && snippetMatched("v264-html-ready")
      && snippetMatched("v264-explanation-profile")
      && snippetMatched("v264-explanation-no-real-resolver")
      && snippetMatched("v264-explanation-smoke")
      && snippetMatched("v264-explanation-screenshot"),
    v265ArchiveRecordsUpstreamEchoVerification: snippetMatched("v265-html-title")
      && snippetMatched("v265-html-ready")
      && snippetMatched("v265-explanation-profile")
      && snippetMatched("v265-explanation-java-v109")
      && snippetMatched("v265-explanation-smoke")
      && snippetMatched("v265-explanation-screenshot"),
    walkthroughsRecordImplementationAndVerification: snippetMatched("v264-walkthrough-service")
      && snippetMatched("v264-walkthrough-request")
      && snippetMatched("v264-walkthrough-failure")
      && snippetMatched("v264-walkthrough-tests")
      && snippetMatched("v265-walkthrough-service")
      && snippetMatched("v265-walkthrough-java-v107")
      && snippetMatched("v265-walkthrough-mini-kv-v116")
      && snippetMatched("v265-walkthrough-tests"),
    activePlanPointsToV266ArchiveVerification: snippetMatched("plan-v266")
      && snippetMatched("plan-v266-archive-only")
      && snippetMatched("plan-no-rerun")
      && snippetMatched("plan-no-real-provider"),
    routeResponsesVerified:
      sourceNodeV264.requestShapeFieldCount === 9
      && sourceNodeV264.responseShapeFieldCount === 13
      && sourceNodeV264.failureMappingCount === 7
      && sourceNodeV264.guardConditionCount === 10
      && sourceNodeV265.requestShapeFieldCount === 9
      && sourceNodeV265.responseShapeFieldCount === 13
      && sourceNodeV265.failureMappingCount === 7
      && sourceNodeV265.guardConditionCount === 10
      && sourceNodeV265.checkCount === sourceNodeV265.passedCheckCount,
    noArchiveVerificationFakeShellRerun: true,
    upstreamActionsStillDisabled: !config.upstreamActionsEnabled,
    productionAuditStillBlocked: true,
    productionWindowStillBlocked: true,
    readyForManagedAuditManualSandboxConnectionCredentialResolverFakeShellArchiveVerification: false,
  };
}

function collectProductionBlockers(
  checks: CredentialResolverFakeShellArchiveVerificationChecks,
): CredentialResolverFakeShellArchiveVerificationMessage[] {
  const rules: Array<{
    condition: boolean;
    code: string;
    source: CredentialResolverFakeShellArchiveVerificationMessage["source"];
    message: string;
  }> = [
    {
      condition: checks.sourceNodeV264Ready,
      code: "SOURCE_NODE_V264_NOT_READY",
      source: "node-v264-credential-resolver-test-only-shell-contract",
      message: "Node v264 fake shell contract must be ready before archive verification.",
    },
    {
      condition: checks.sourceNodeV265Ready,
      code: "SOURCE_NODE_V265_NOT_READY",
      source: "node-v265-test-only-shell-upstream-echo-verification",
      message: "Node v265 upstream echo verification must be ready before archive verification.",
    },
    {
      condition: checks.sourceNodeV265ConsumesUpstreamEchoes,
      code: "SOURCE_NODE_V265_UPSTREAM_ECHOES_NOT_ALIGNED",
      source: "node-v265-test-only-shell-upstream-echo-verification",
      message: "Node v265 must consume Node v264, Java v107, mini-kv v116, and Java v109 optimization context.",
    },
    {
      condition: checks.archiveFilesPresent,
      code: "FAKE_SHELL_ARCHIVE_FILES_MISSING",
      source: "credential-resolver-fake-shell-archive",
      message: "v264/v265 HTML, screenshots, explanations, walkthroughs, or active plan evidence is missing.",
    },
    {
      condition: checks.archiveFilesNonEmpty,
      code: "FAKE_SHELL_ARCHIVE_FILES_EMPTY",
      source: "credential-resolver-fake-shell-archive",
      message: "Every v264/v265 archive file must be non-empty.",
    },
    {
      condition: checks.archiveSnippetsMatched,
      code: "FAKE_SHELL_ARCHIVE_SNIPPETS_MISSING",
      source: "credential-resolver-fake-shell-archive",
      message: "v264/v265 archive evidence must include fake shell, upstream echo, smoke, screenshot, walkthrough, and plan snippets.",
    },
    {
      condition: checks.activePlanPointsToV266ArchiveVerification,
      code: "ACTIVE_PLAN_DOES_NOT_POINT_TO_V266",
      source: "v263-plan",
      message: "The active plan must identify v266 as credential resolver fake-shell archive verification.",
    },
    {
      condition: checks.routeResponsesVerified,
      code: "SOURCE_ROUTE_RESPONSES_NOT_VERIFIED",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification",
      message: "v264 and v265 route responses must retain request/response/failure/guard counts before archive verification.",
    },
    {
      condition: checks.noArchiveVerificationFakeShellRerun,
      code: "ARCHIVE_VERIFICATION_RERAN_FAKE_SHELL",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification",
      message: "v266 archive verification must not rerun fake resolver shell behavior.",
    },
    {
      condition: checks.upstreamActionsStillDisabled,
      code: "UPSTREAM_ACTIONS_ENABLED",
      source: "runtime-config",
      message: "UPSTREAM_ACTIONS_ENABLED must remain false for v266 archive verification.",
    },
  ];

  return rules
    .filter((rule) => !rule.condition)
    .map((rule) => ({
      code: rule.code,
      severity: "blocker" as const,
      source: rule.source,
      message: rule.message,
    }));
}

function collectWarnings(): CredentialResolverFakeShellArchiveVerificationMessage[] {
  return [
    {
      code: "ARCHIVE_VERIFICATION_ONLY",
      severity: "warning",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification",
      message: "This profile verifies v264/v265 archive files and route shape only; it does not execute fake shell behavior.",
    },
  ];
}

function collectRecommendations(): CredentialResolverFakeShellArchiveVerificationMessage[] {
  return [
    {
      code: "WRITE_POST_V266_PLAN",
      severity: "recommendation",
      source: "v263-plan",
      message: "After v266, close the v263-derived plan and write a new plan before any further credential resolver or sandbox connection work.",
    },
    {
      code: "KEEP_REAL_RESOLVER_OUT_OF_SCOPE",
      severity: "recommendation",
      source: "managed-audit-manual-sandbox-connection-credential-resolver-fake-shell-archive-verification",
      message: "Keep real credential resolution, secret provider, raw endpoint parsing, external HTTP, schema migration, and auto-start out of scope.",
    },
  ];
}

function toHistoricalPath(workspacePath: string): string {
  return `${WORKSPACE_ROOT}${workspacePath}`;
}
