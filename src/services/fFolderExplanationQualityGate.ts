import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import { scanFFolderExplanations } from "./fFolderExplanationQualityScanner.js";
import {
  F_FOLDER_EXPLANATION_ACTIVE_VERSION_RANGE,
  F_FOLDER_EXPLANATION_DIR_NAME,
  F_FOLDER_EXPLANATION_ENFORCEMENT_FLOOR_VERSION,
  F_FOLDER_EXPLANATION_MIN_BYTES,
  F_FOLDER_EXPLANATION_MIN_CHINESE_CHARS,
  F_FOLDER_EXPLANATION_MIN_CODE_PATH_REFERENCES,
  F_FOLDER_EXPLANATION_ROOT,
  F_FOLDER_IMAGE_DIR_NAME,
  type FFolderExplanationDocumentEvaluation,
  type FFolderExplanationQualityMessage,
  type FFolderExplanationQualityProfile,
} from "./fFolderExplanationQualityTypes.js";

const ENDPOINTS = Object.freeze({
  qualityGateJson: "/api/v1/audit/f-folder-explanation-quality-gate",
  qualityGateMarkdown: "/api/v1/audit/f-folder-explanation-quality-gate?format=markdown",
});

export function loadFFolderExplanationQualityGate(input: {
  config: AppConfig;
  projectRoot?: string;
}): FFolderExplanationQualityProfile {
  const scan = scanFFolderExplanations({ projectRoot: input.projectRoot });
  const enforcedVersionSummaries = scan.versionSummaries
    .filter((summary) => summary.versionNumber >= F_FOLDER_EXPLANATION_ENFORCEMENT_FLOOR_VERSION);
  const enforcedExplanations = scan.documents.filter((document) => document.enforcedByCurrentStandard);
  const shortExplanations = enforcedExplanations.filter((document) => !document.meetsMinimumLength);
  const shallowChineseExplanations = enforcedExplanations.filter((document) => !document.meetsChineseDepth);
  const missingRequiredShape = enforcedExplanations.filter((document) =>
    document.missingRequiredSections.length > 0 || !document.hasH1Title || !document.explanationDirAligned);
  const lowCodePathDensity = enforcedExplanations.filter((document) => !document.hasEnoughCodePathReferences);
  const placeholderExplanations = enforcedExplanations.filter((document) => document.placeholderSignals.length > 0);
  const forbiddenExecutionClaims = enforcedExplanations
    .filter((document) => document.forbiddenExecutionClaimSignals.length > 0);
  const missingExplanationDirs = enforcedVersionSummaries
    .filter((summary) => !summary.explanationDirExists || summary.explanationMarkdownCount === 0);
  const emptyImageDirs = enforcedVersionSummaries
    .filter((summary) => summary.imageDirExists && summary.imageFileCount === 0);
  const checks = {
    fRootExists: scan.rootExists,
    enforcedExplanationsPresent: enforcedExplanations.length > 0,
    enforcedVersionsHaveExplanationDirs: missingExplanationDirs.length === 0,
    noEmptyImageDirectories: emptyImageDirs.length === 0,
    noShortEnforcedExplanations: shortExplanations.length === 0,
    enforcedChineseDepthMet: shallowChineseExplanations.length === 0,
    enforcedRequiredShapeMet: missingRequiredShape.length === 0,
    enforcedCodePathDensityMet: lowCodePathDensity.length === 0,
    noEnforcedPlaceholderExplanations: placeholderExplanations.length === 0,
    noForbiddenExecutionClaims: forbiddenExecutionClaims.length === 0,
    scanCompleted: true,
    readyForFFolderExplanationQualityGate: false,
  };
  checks.readyForFFolderExplanationQualityGate = Object.entries(checks)
    .filter(([key]) => key !== "readyForFFolderExplanationQualityGate")
    .every(([, value]) => value);
  const qualityGateState = checks.readyForFFolderExplanationQualityGate
    ? "verified-quality-gate"
    : "blocked";
  const blockers = collectBlockers(checks, {
    missingExplanationDirs,
    emptyImageDirs,
    shortExplanations,
    shallowChineseExplanations,
    missingRequiredShape,
    lowCodePathDensity,
    placeholderExplanations,
    forbiddenExecutionClaims,
  });
  const warnings = collectWarnings(scan.documents.length - enforcedExplanations.length);
  const recommendations = collectRecommendations();
  const summary = {
    totalExplanationCount: scan.documents.length,
    enforcedExplanationCount: enforcedExplanations.length,
    enforcedCompliantExplanationCount:
      enforcedExplanations.filter((document) => document.compliantWithCurrentStandard).length,
    legacyExplanationCount: scan.documents.length - enforcedExplanations.length,
    enforcedVersionCount: enforcedVersionSummaries.length,
    enforcedVersionMissingExplanationDirCount: missingExplanationDirs.length,
    emptyImageDirCount: emptyImageDirs.length,
    shortExplanationCount: shortExplanations.length,
    shallowChineseExplanationCount: shallowChineseExplanations.length,
    missingRequiredShapeCount: missingRequiredShape.length,
    lowCodePathDensityCount: lowCodePathDensity.length,
    placeholderCount: placeholderExplanations.length,
    forbiddenExecutionClaimCount: forbiddenExecutionClaims.length,
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    productionBlockerCount: blockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
  const scanScope = {
    root: F_FOLDER_EXPLANATION_ROOT,
    explanationDirName: F_FOLDER_EXPLANATION_DIR_NAME,
    imageDirName: F_FOLDER_IMAGE_DIR_NAME,
    enforcementFloorVersion: F_FOLDER_EXPLANATION_ENFORCEMENT_FLOOR_VERSION,
    activeNodeVersionRange: F_FOLDER_EXPLANATION_ACTIVE_VERSION_RANGE,
    minBytes: F_FOLDER_EXPLANATION_MIN_BYTES,
    minChineseCharacters: F_FOLDER_EXPLANATION_MIN_CHINESE_CHARS,
    minCodePathReferences: F_FOLDER_EXPLANATION_MIN_CODE_PATH_REFERENCES,
    historicalLegacyBlocking: false as const,
  };
  const qualityDigest = sha256StableJson({
    profileVersion: "f-folder-explanation-quality-gate.v1",
    qualityGateState,
    scanScope,
    checks,
    summary,
    enforcedExplanations: enforcedExplanations.map((document) => ({
      relativePath: document.relativePath,
      byteLength: document.byteLength,
      chineseCharacterCount: document.chineseCharacterCount,
      codePathReferenceCount: document.codePathReferences.length,
      complianceScore: document.complianceScore,
      compliantWithCurrentStandard: document.compliantWithCurrentStandard,
    })),
  });

  return {
    service: "orderops-node",
    title: "F-folder explanation quality gate",
    generatedAt: new Date().toISOString(),
    profileVersion: "f-folder-explanation-quality-gate.v1",
    qualityGateState,
    readyForFFolderExplanationQualityGate: checks.readyForFFolderExplanationQualityGate,
    readyForProductionAudit: false,
    readyForProductionWindow: false,
    readyForProductionOperations: false,
    readOnlyQualityGate: true,
    executionAllowed: false,
    connectsManagedAudit: false,
    startsJavaService: false,
    startsMiniKvService: false,
    mutatesJavaState: false,
    mutatesMiniKvState: false,
    scanScope,
    checks,
    summary,
    enforcedExplanations,
    blockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    qualityDigest,
    nextActions: [
      "Keep f-folder explanations in Chinese when they exist.",
      "Write enough detail to explain the code path, response model, safety boundary, verification, and next stop condition.",
      "Do not create an empty image folder; use f/<version>/图片 only when actual screenshot or image evidence exists.",
    ],
  };
}

export function renderFFolderExplanationQualityGateMarkdown(
  profile: FFolderExplanationQualityProfile,
): string {
  return [
    "# F-folder explanation quality gate",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Quality gate state: ${profile.qualityGateState}`,
    `- Ready for f-folder explanation quality gate: ${profile.readyForFFolderExplanationQualityGate}`,
    `- Execution allowed: ${profile.executionAllowed}`,
    `- Connects managed audit: ${profile.connectsManagedAudit}`,
    "",
    "## Scan Scope",
    "",
    ...renderEntries(profile.scanScope),
    "",
    "## Checks",
    "",
    ...renderEntries(profile.checks),
    "",
    "## Summary",
    "",
    ...renderEntries(profile.summary),
    "",
    "## Enforced Explanations",
    "",
    ...renderList(profile.enforcedExplanations.map(formatExplanation), "No enforced explanations found."),
    "",
    "## Blockers",
    "",
    ...renderMessages(profile.blockers, "No f-folder explanation quality blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No f-folder explanation quality warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No f-folder explanation quality recommendations."),
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

function collectBlockers(
  checks: FFolderExplanationQualityProfile["checks"],
  context: {
    missingExplanationDirs: readonly { versionNumber: number }[];
    emptyImageDirs: readonly { versionNumber: number }[];
    shortExplanations: readonly FFolderExplanationDocumentEvaluation[];
    shallowChineseExplanations: readonly FFolderExplanationDocumentEvaluation[];
    missingRequiredShape: readonly FFolderExplanationDocumentEvaluation[];
    lowCodePathDensity: readonly FFolderExplanationDocumentEvaluation[];
    placeholderExplanations: readonly FFolderExplanationDocumentEvaluation[];
    forbiddenExecutionClaims: readonly FFolderExplanationDocumentEvaluation[];
  },
): FFolderExplanationQualityMessage[] {
  const blockers: FFolderExplanationQualityMessage[] = [];
  if (!checks.fRootExists) {
    blockers.push(message("F_FOLDER_ROOT_MISSING", "f-folder-explanation-scanner", "f-folder root is missing."));
  }
  if (!checks.enforcedExplanationsPresent) {
    blockers.push(message("ENFORCED_EXPLANATIONS_MISSING", "f-folder-explanation-standard",
      "No enforced f-folder explanations were found."));
  }
  if (!checks.enforcedVersionsHaveExplanationDirs) {
    blockers.push(message("EXPLANATION_DIR_MISSING", "f-folder-layout",
      `${context.missingExplanationDirs.length} enforced versions have no explanation markdown.`));
  }
  if (!checks.noEmptyImageDirectories) {
    blockers.push(message("EMPTY_IMAGE_DIRECTORY", "f-folder-layout",
      `${context.emptyImageDirs.length} enforced versions contain empty image directories.`));
  }
  if (!checks.noShortEnforcedExplanations) {
    blockers.push(message("ENFORCED_EXPLANATION_TOO_SHORT", "f-folder-explanation-quality-gate",
      `${context.shortExplanations.length} enforced explanations are shorter than ${F_FOLDER_EXPLANATION_MIN_BYTES} bytes.`));
  }
  if (!checks.enforcedChineseDepthMet) {
    blockers.push(message("ENFORCED_EXPLANATION_NOT_CHINESE_ENOUGH", "f-folder-explanation-quality-gate",
      `${context.shallowChineseExplanations.length} enforced explanations have too few Chinese characters.`));
  }
  if (!checks.enforcedRequiredShapeMet) {
    blockers.push(message("ENFORCED_EXPLANATION_REQUIRED_SHAPE_MISSING", "f-folder-explanation-quality-gate",
      `${context.missingRequiredShape.length} enforced explanations miss required sections.`));
  }
  if (!checks.enforcedCodePathDensityMet) {
    blockers.push(message("ENFORCED_EXPLANATION_CODE_PATH_DENSITY_LOW", "f-folder-explanation-quality-gate",
      `${context.lowCodePathDensity.length} enforced explanations cite too few code or archive paths.`));
  }
  if (!checks.noEnforcedPlaceholderExplanations) {
    blockers.push(message("ENFORCED_EXPLANATION_PLACEHOLDER", "f-folder-explanation-quality-gate",
      `${context.placeholderExplanations.length} enforced explanations still look like placeholders.`));
  }
  if (!checks.noForbiddenExecutionClaims) {
    blockers.push(message("FORBIDDEN_EXECUTION_CLAIM", "f-folder-explanation-quality-gate",
      `${context.forbiddenExecutionClaims.length} enforced explanations claim execution or production readiness flags.`));
  }
  return blockers;
}

function collectWarnings(legacyExplanationCount: number): FFolderExplanationQualityMessage[] {
  return [
    {
      code: "LEGACY_F_FOLDER_EXPLANATIONS_VISIBLE",
      severity: "warning",
      source: "f-folder-explanation-quality-gate",
      message: `${legacyExplanationCount} legacy f-folder explanations are visible but do not block the current standard.`,
    },
  ];
}

function collectRecommendations(): FFolderExplanationQualityMessage[] {
  return [
    {
      code: "KEEP_CHINESE_EXPLANATIONS_SUBSTANTIVE",
      severity: "recommendation",
      source: "f-folder-explanation-standard",
      message: "For future versions, a short explanation should be omitted or expanded into a real Chinese code explanation.",
    },
  ];
}

function message(
  code: string,
  source: FFolderExplanationQualityMessage["source"],
  text: string,
): FFolderExplanationQualityMessage {
  return { code, severity: "blocker", source, message: text };
}

function formatExplanation(document: FFolderExplanationDocumentEvaluation): string {
  return `${document.relativePath}: bytes=${document.byteLength}; chinese=${document.chineseCharacterCount}; codePaths=${document.codePathReferences.length}; score=${document.complianceScore}; compliant=${document.compliantWithCurrentStandard}`;
}
