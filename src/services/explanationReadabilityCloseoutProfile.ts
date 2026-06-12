import type { AppConfig } from "../config.js";
import { auditJsonMarkdownRouteGroups } from "../routes/auditJsonMarkdownRouteGroups.js";
import {
  EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY,
} from "../routes/auditJsonMarkdownRouteCatalogSummary.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import { loadCodeWalkthroughDocumentationQualityGate } from "./codeWalkthroughDocumentationQualityGate.js";
import { loadFFolderExplanationQualityGate } from "./fFolderExplanationQualityGate.js";
import {
  EXPLANATION_READABILITY_CLOSEOUT_ACTIVE_VERSION_RANGE,
  EXPLANATION_READABILITY_CLOSEOUT_PROFILE_VERSION,
  type ExplanationReadabilityCloseoutMessage,
  type ExplanationReadabilityCloseoutProfile,
  type ExplanationReadabilityGateSummary,
} from "./explanationReadabilityCloseoutProfileTypes.js";

const CLOSEOUT_ROUTE = "/api/v1/audit/explanation-readability-closeout-profile";
const ENDPOINTS = Object.freeze({
  closeoutProfileJson: CLOSEOUT_ROUTE,
  closeoutProfileMarkdown: `${CLOSEOUT_ROUTE}?format=markdown`,
  fFolderExplanationQualityGateJson: "/api/v1/audit/f-folder-explanation-quality-gate",
  codeWalkthroughDocumentationQualityGateJson: "/api/v1/audit/code-walkthrough-documentation-quality-gate",
  markdownReadabilityAnalyzer: "src/services/markdownDocumentReadabilitySignals.ts" as const,
});

export function loadExplanationReadabilityCloseoutProfile(input: {
  config: AppConfig;
  projectRoot?: string;
}): ExplanationReadabilityCloseoutProfile {
  const fFolderGate = loadFFolderExplanationQualityGate(input);
  const codeWalkthroughGate = loadCodeWalkthroughDocumentationQualityGate(input);
  const fFolderSummary = summarizeFFolderGate(fFolderGate);
  const codeWalkthroughSummary = summarizeCodeWalkthroughGate(codeWalkthroughGate);
  const routeQualityGroup = auditJsonMarkdownRouteGroups
    .find((group) => group.id === "managed-audit-route-quality");
  const closeoutRouteRegistered = routeQualityGroup?.routes
    .some((route) => route.path === CLOSEOUT_ROUTE) ?? false;
  const routeCatalog = {
    expectedRouteCount: EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.routeCount,
    managedAuditRouteCount:
      EXPECTED_AUDIT_JSON_MARKDOWN_ROUTE_CATALOG_SUMMARY.domainRouteCounts["managed-audit"],
    routeQualityRouteCount: routeQualityGroup?.routes.length ?? 0,
    closeoutRouteRegistered,
  };
  const gates = {
    fFolderExplanationQualityGate: fFolderSummary,
    codeWalkthroughDocumentationQualityGate: codeWalkthroughSummary,
  };
  const gateSummaries = [fFolderSummary, codeWalkthroughSummary];
  const checks = {
    fFolderGateVerified: fFolderSummary.ready,
    codeWalkthroughGateVerified: codeWalkthroughSummary.ready,
    noRepetitiveParagraphPadding:
      gateSummaries.every((summary) => summary.repetitiveParagraphPaddingCount === 0),
    noOversizedDetailedSections:
      gateSummaries.every((summary) => summary.oversizedDetailedSectionCount === 0),
    scannableSectionsMeasured:
      gateSummaries.every((summary) => summary.minimumScannableH2SectionCount > 0),
    routeCatalogIncludesCloseoutProfile: closeoutRouteRegistered
      && routeCatalog.expectedRouteCount === 254
      && routeCatalog.managedAuditRouteCount === 56
      && routeCatalog.routeQualityRouteCount === 6,
    upstreamActionsStillDisabled: input.config.upstreamActionsEnabled === false,
    noSiblingServiceStartup: true,
    noProductionExecutionEnabled: true,
    readyForExplanationReadabilityCloseout: false,
  };
  checks.readyForExplanationReadabilityCloseout = Object.entries(checks)
    .filter(([key]) => key !== "readyForExplanationReadabilityCloseout")
    .every(([, value]) => value);
  const closeoutState = checks.readyForExplanationReadabilityCloseout
    ? "verified-explanation-readability-closeout"
    : "blocked";
  const productionBlockers = collectProductionBlockers(checks);
  const warnings = collectWarnings();
  const recommendations = collectRecommendations();
  const summary = {
    gateCount: gateSummaries.length,
    readyGateCount: gateSummaries.filter((gate) => gate.ready).length,
    enforcedDocumentCount:
      fFolderSummary.enforcedDocumentCount + codeWalkthroughSummary.enforcedDocumentCount,
    compliantDocumentCount:
      fFolderSummary.compliantDocumentCount + codeWalkthroughSummary.compliantDocumentCount,
    repetitiveParagraphPaddingCount:
      fFolderSummary.repetitiveParagraphPaddingCount
      + codeWalkthroughSummary.repetitiveParagraphPaddingCount,
    oversizedDetailedSectionCount:
      fFolderSummary.oversizedDetailedSectionCount
      + codeWalkthroughSummary.oversizedDetailedSectionCount,
    minimumScannableH2SectionCount: Math.min(
      fFolderSummary.minimumScannableH2SectionCount,
      codeWalkthroughSummary.minimumScannableH2SectionCount,
    ),
    largestH2SectionChineseCharacters: Math.max(
      fFolderSummary.largestH2SectionChineseCharacters,
      codeWalkthroughSummary.largestH2SectionChineseCharacters,
    ),
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    productionBlockerCount: productionBlockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
  const qualityDigest = sha256StableJson({
    profileVersion: EXPLANATION_READABILITY_CLOSEOUT_PROFILE_VERSION,
    closeoutState,
    gates,
    routeCatalog,
    checks,
    summary,
  });

  return {
    service: "orderops-node",
    title: "Explanation readability closeout profile",
    generatedAt: new Date().toISOString(),
    profileVersion: EXPLANATION_READABILITY_CLOSEOUT_PROFILE_VERSION,
    closeoutState,
    readyForExplanationReadabilityCloseout: checks.readyForExplanationReadabilityCloseout,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyProfile: true,
    executionAllowed: false,
    connectsManagedAudit: false,
    startsJavaService: false,
    startsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    scope: {
      activeVersionRange: EXPLANATION_READABILITY_CLOSEOUT_ACTIVE_VERSION_RANGE,
      localDocumentationOnly: true,
      sharedMarkdownReadabilityAnalyzer: "src/services/markdownDocumentReadabilitySignals.ts",
      routeGroup: "managed-audit-route-quality",
      javaMiniKvParallelRecommended: true,
    },
    gates,
    routeCatalog,
    checks,
    summary,
    productionBlockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    qualityDigest,
    nextActions: [
      "Keep using the shared Markdown readability analyzer instead of duplicating paragraph checks in each quality gate.",
      "When future explanations are long, split them into scannable H2 sections and keep Detailed Walkthrough sections small.",
      "Treat this profile as local documentation closeout only; Java and mini-kv can continue in parallel without waiting for Node.",
    ],
  };
}

export function renderExplanationReadabilityCloseoutProfileMarkdown(
  profile: ExplanationReadabilityCloseoutProfile,
): string {
  return [
    "# Explanation readability closeout profile",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Closeout state: ${profile.closeoutState}`,
    `- Ready for explanation readability closeout: ${profile.readyForExplanationReadabilityCloseout}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    `- Starts Java service: ${profile.startsJavaService}`,
    `- Starts mini-kv service: ${profile.startsMiniKvService}`,
    "",
    "## Scope",
    "",
    ...renderEntries(profile.scope),
    "",
    "## Gates",
    "",
    "### f-folder explanation quality gate",
    "",
    ...renderEntries(profile.gates.fFolderExplanationQualityGate),
    "",
    "### code walkthrough documentation quality gate",
    "",
    ...renderEntries(profile.gates.codeWalkthroughDocumentationQualityGate),
    "",
    "## Route Catalog",
    "",
    ...renderEntries(profile.routeCatalog),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Production Blockers",
    "",
    ...renderMessages(profile.productionBlockers, "No explanation readability closeout blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No explanation readability closeout warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No explanation readability closeout recommendations."),
    "",
    "## Evidence Endpoints",
    "",
    ...renderEntries(profile.evidenceEndpoints),
    "",
    "## Next Actions",
    "",
    ...renderList(profile.nextActions, "No next actions."),
    "",
    `Quality digest: ${profile.qualityDigest}`,
  ].join("\n");
}

function summarizeFFolderGate(
  profile: ReturnType<typeof loadFFolderExplanationQualityGate>,
): ExplanationReadabilityGateSummary {
  return {
    id: "f-folder-explanation-quality-gate",
    profileVersion: profile.profileVersion,
    state: profile.qualityGateState,
    ready: profile.readyForFFolderExplanationQualityGate,
    enforcedDocumentCount: profile.summary.enforcedExplanationCount,
    compliantDocumentCount: profile.summary.enforcedCompliantExplanationCount,
    repetitiveParagraphPaddingCount: profile.summary.repetitiveParagraphPaddingCount,
    oversizedDetailedSectionCount: profile.summary.oversizedDetailedExplanationCount,
    minimumScannableH2SectionCount: profile.summary.minimumScannableH2SectionCount,
    largestH2SectionChineseCharacters: profile.summary.largestH2SectionChineseCharacters,
    qualityDigest: profile.qualityDigest,
  };
}

function summarizeCodeWalkthroughGate(
  profile: ReturnType<typeof loadCodeWalkthroughDocumentationQualityGate>,
): ExplanationReadabilityGateSummary {
  return {
    id: "code-walkthrough-documentation-quality-gate",
    profileVersion: profile.profileVersion,
    state: profile.qualityGateState,
    ready: profile.readyForCodeWalkthroughDocumentationQualityGate,
    enforcedDocumentCount: profile.summary.enforcedWalkthroughCount,
    compliantDocumentCount: profile.summary.enforcedCompliantWalkthroughCount,
    repetitiveParagraphPaddingCount: profile.summary.repetitiveParagraphPaddingCount,
    oversizedDetailedSectionCount: profile.summary.oversizedDetailedWalkthroughCount,
    minimumScannableH2SectionCount: profile.summary.minimumScannableH2SectionCount,
    largestH2SectionChineseCharacters: profile.summary.largestH2SectionChineseCharacters,
    qualityDigest: profile.qualityDigest,
  };
}

function collectProductionBlockers(
  checks: ExplanationReadabilityCloseoutProfile["checks"],
): ExplanationReadabilityCloseoutMessage[] {
  const blockers: ExplanationReadabilityCloseoutMessage[] = [];
  if (!checks.fFolderGateVerified) {
    blockers.push(message("F_FOLDER_GATE_NOT_VERIFIED", "f-folder-explanation-quality-gate",
      "The f-folder explanation quality gate must be verified before closeout."));
  }
  if (!checks.codeWalkthroughGateVerified) {
    blockers.push(message("CODE_WALKTHROUGH_GATE_NOT_VERIFIED", "code-walkthrough-documentation-quality-gate",
      "The code walkthrough documentation quality gate must be verified before closeout."));
  }
  if (!checks.noRepetitiveParagraphPadding) {
    blockers.push(message("REPETITIVE_PARAGRAPH_PADDING", "explanation-readability-closeout-profile",
      "At least one explanation quality gate still reports repeated long paragraph padding."));
  }
  if (!checks.noOversizedDetailedSections) {
    blockers.push(message("OVERSIZED_DETAILED_SECTION", "explanation-readability-closeout-profile",
      "At least one explanation quality gate still reports an oversized detailed walkthrough section."));
  }
  if (!checks.scannableSectionsMeasured) {
    blockers.push(message("SCANNABLE_SECTIONS_NOT_MEASURED", "explanation-readability-closeout-profile",
      "Both gates must report scannable H2 section metrics."));
  }
  if (!checks.routeCatalogIncludesCloseoutProfile) {
    blockers.push(message("CLOSEOUT_ROUTE_NOT_IN_CATALOG", "route-catalog",
      "The audit JSON/Markdown route catalog must include the closeout profile route."));
  }
  if (!checks.upstreamActionsStillDisabled) {
    blockers.push(message("UPSTREAM_ACTIONS_ENABLED", "runtime-config",
      "UPSTREAM_ACTIONS_ENABLED must stay false during explanation readability closeout."));
  }
  return blockers;
}

function collectWarnings(): ExplanationReadabilityCloseoutMessage[] {
  return [
    {
      code: "LOCAL_DOCUMENTATION_CLOSEOUT_ONLY",
      severity: "warning",
      source: "explanation-readability-closeout-profile",
      message: "This closeout profile only verifies local explanation readability; it does not approve production execution.",
    },
  ];
}

function collectRecommendations(): ExplanationReadabilityCloseoutMessage[] {
  return [
    {
      code: "KEEP_SECTIONS_SCANNABLE",
      severity: "recommendation",
      source: "explanation-readability-closeout-profile",
      message: "Prefer several focused H2 sections over one large Detailed Walkthrough section.",
    },
    {
      code: "REUSE_SHARED_ANALYZER",
      severity: "recommendation",
      source: "explanation-readability-closeout-profile",
      message: "Add future Markdown readability rules to the shared analyzer first, then project them through each gate.",
    },
  ];
}

function message(
  code: string,
  source: ExplanationReadabilityCloseoutMessage["source"],
  text: string,
): ExplanationReadabilityCloseoutMessage {
  return { code, severity: "blocker", source, message: text };
}
