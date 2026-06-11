import { readFileSync } from "node:fs";
import path from "node:path";

import type { AppConfig } from "../config.js";
import {
  countPassedReportChecks,
  countReportChecks,
  renderEntries,
  renderList,
  renderMessages,
  sha256StableJson,
} from "./liveProbeReportUtils.js";
import {
  CODE_WALKTHROUGH_BUCKETS,
  CODE_WALKTHROUGH_ENFORCEMENT_FLOOR_RECORD,
  CODE_WALKTHROUGH_ROOT,
  CODE_WALKTHROUGH_SAMPLE_PATH,
  CODE_WALKTHROUGH_STANDARD_PATH,
  type CodeWalkthroughBucket,
  type CodeWalkthroughDocumentationQualityMessage,
  type CodeWalkthroughDocumentationQualityProfile,
  type CodeWalkthroughDocumentEvaluation,
} from "./codeWalkthroughDocumentationQualityTypes.js";
import { scanCodeWalkthroughDocumentation } from "./codeWalkthroughDocumentationQualityScanner.js";

const ENDPOINTS = Object.freeze({
  qualityGateJson: "/api/v1/audit/code-walkthrough-documentation-quality-gate",
  qualityGateMarkdown: "/api/v1/audit/code-walkthrough-documentation-quality-gate?format=markdown",
  standardDocument: CODE_WALKTHROUGH_STANDARD_PATH,
  sampleDocument: CODE_WALKTHROUGH_SAMPLE_PATH,
});

export function loadCodeWalkthroughDocumentationQualityGate(input: {
  config: AppConfig;
  projectRoot?: string;
}): CodeWalkthroughDocumentationQualityProfile {
  const scan = scanCodeWalkthroughDocumentation({ projectRoot: input.projectRoot });
  const enforcedWalkthroughs = scan.documents.filter((document) => document.enforcedByCurrentStandard);
  const enforcedPlaceholderWalkthroughs = enforcedWalkthroughs
    .filter((document) => document.placeholderSignals.length > 0);
  const enforcedMissingRequiredShape = enforcedWalkthroughs
    .filter((document) => !document.compliantWithCurrentStandard);
  const forbiddenExecutionClaims = enforcedWalkthroughs
    .filter((document) => document.forbiddenExecutionClaimSignals.length > 0);
  const misbucketedWalkthroughs = scan.documents.filter((document) => !document.bucketAligned);
  const bucketSummary = createBucketSummary(scan.documents, scan.bucketDirectories);
  const standardText = scan.standardDocumentExists
    ? readStandardText(input.projectRoot)
    : "";
  const checks = {
    walkthroughRootExists: scan.rootExists,
    stageReadmePresent: scan.readmeExists,
    standardDocumentPresent: scan.standardDocumentExists,
    sampleDocumentPresent: scan.sampleDocumentExists,
    expectedBucketsPresent: Object.values(scan.bucketDirectories).every(Boolean),
    rootHasNoMarkdownOverflow: scan.rootMarkdownFiles.length === 0,
    bucketAlignmentStable: misbucketedWalkthroughs.length === 0,
    enforcedWalkthroughsPresent: enforcedWalkthroughs.length > 0,
    noEnforcedPlaceholderWalkthroughs: enforcedPlaceholderWalkthroughs.length === 0,
    enforcedWalkthroughsMeetRequiredShape: enforcedMissingRequiredShape.length === 0,
    noForbiddenExecutionClaims: forbiddenExecutionClaims.length === 0,
    batchWalkthroughPolicyDocumented: /Batch walkthroughs are preferred/i.test(standardText),
    historicalLegacyAllowedButVisible: scan.documents.length > enforcedWalkthroughs.length,
    scanCompleted: true,
    readyForCodeWalkthroughDocumentationQualityGate: false,
  };
  checks.readyForCodeWalkthroughDocumentationQualityGate = Object.entries(checks)
    .filter(([key]) => key !== "readyForCodeWalkthroughDocumentationQualityGate")
    .every(([, value]) => value);
  const qualityGateState = checks.readyForCodeWalkthroughDocumentationQualityGate
    ? "verified-quality-gate"
    : "blocked";
  const blockers = collectBlockers(checks, {
    rootMarkdownOverflowCount: scan.rootMarkdownFiles.length,
    missingBucketCount: Object.values(scan.bucketDirectories).filter((present) => !present).length,
    enforcedPlaceholderWalkthroughs,
    enforcedMissingRequiredShape,
    forbiddenExecutionClaims,
    misbucketedWalkthroughs,
  });
  const warnings = collectWarnings(scan.documents.length - enforcedWalkthroughs.length);
  const recommendations = collectRecommendations();
  const summary = {
    totalWalkthroughCount: scan.documents.length,
    enforcedWalkthroughCount: enforcedWalkthroughs.length,
    enforcedCompliantWalkthroughCount:
      enforcedWalkthroughs.filter((document) => document.compliantWithCurrentStandard).length,
    legacyWalkthroughCount: scan.documents.length - enforcedWalkthroughs.length,
    rootMarkdownOverflowCount: scan.rootMarkdownFiles.length,
    missingBucketCount: Object.values(scan.bucketDirectories).filter((present) => !present).length,
    misbucketedWalkthroughCount: misbucketedWalkthroughs.length,
    enforcedPlaceholderCount: enforcedPlaceholderWalkthroughs.length,
    enforcedMissingRequiredShapeCount: enforcedMissingRequiredShape.length,
    forbiddenExecutionClaimCount: forbiddenExecutionClaims.length,
    checkCount: countReportChecks(checks),
    passedCheckCount: countPassedReportChecks(checks),
    productionBlockerCount: blockers.length,
    warningCount: warnings.length,
    recommendationCount: recommendations.length,
  };
  const scanScope = {
    root: CODE_WALKTHROUGH_ROOT,
    standardDocument: CODE_WALKTHROUGH_STANDARD_PATH,
    sampleDocument: CODE_WALKTHROUGH_SAMPLE_PATH,
    enforcementFloorRecord: CODE_WALKTHROUGH_ENFORCEMENT_FLOOR_RECORD,
    activeNodeVersionRange: "Node v2058-v2077" as const,
    historicalLegacyBlocking: false as const,
  };
  const qualityDigest = sha256StableJson({
    profileVersion: "code-walkthrough-documentation-quality-gate.v1",
    qualityGateState,
    scanScope,
    checks,
    summary,
    enforcedWalkthroughs: enforcedWalkthroughs.map((document) => ({
      relativePath: document.relativePath,
      complianceScore: document.complianceScore,
      compliantWithCurrentStandard: document.compliantWithCurrentStandard,
    })),
  });

  return {
    service: "orderops-node",
    title: "Code walkthrough documentation quality gate",
    generatedAt: new Date().toISOString(),
    profileVersion: "code-walkthrough-documentation-quality-gate.v1",
    qualityGateState,
    readyForCodeWalkthroughDocumentationQualityGate:
      checks.readyForCodeWalkthroughDocumentationQualityGate,
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
    bucketSummary,
    enforcedWalkthroughs,
    blockers,
    warnings,
    recommendations,
    evidenceEndpoints: { ...ENDPOINTS },
    qualityDigest,
    nextActions: [
      "Keep new walkthrough records in the numeric bucket matching their leading record number.",
      "Omit walkthroughs for tiny archive-only versions instead of writing placeholder Markdown.",
      "When several versions are one coherent refactor, write one detailed batch walkthrough with entry points, model, evidence, service flow, safety, and tests.",
    ],
  };
}

export function renderCodeWalkthroughDocumentationQualityGateMarkdown(
  profile: CodeWalkthroughDocumentationQualityProfile,
): string {
  return [
    "# Code walkthrough documentation quality gate",
    "",
    `- Service: ${profile.service}`,
    `- Generated at: ${profile.generatedAt}`,
    `- Profile version: ${profile.profileVersion}`,
    `- Quality gate state: ${profile.qualityGateState}`,
    `- Ready for quality gate: ${profile.readyForCodeWalkthroughDocumentationQualityGate}`,
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
    "## Bucket Summary",
    "",
    ...Object.entries(profile.bucketSummary).flatMap(([bucket, summary]) => [
      `### ${bucket}`,
      "",
      ...renderEntries(summary),
      "",
    ]),
    "## Enforced Walkthroughs",
    "",
    ...renderList(profile.enforcedWalkthroughs.map(formatWalkthrough), "No enforced walkthroughs found."),
    "",
    "## Blockers",
    "",
    ...renderMessages(profile.blockers, "No code walkthrough quality blockers."),
    "",
    "## Warnings",
    "",
    ...renderMessages(profile.warnings, "No code walkthrough quality warnings."),
    "",
    "## Recommendations",
    "",
    ...renderMessages(profile.recommendations, "No code walkthrough quality recommendations."),
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

function createBucketSummary(
  documents: readonly CodeWalkthroughDocumentEvaluation[],
  directories: Record<CodeWalkthroughBucket, boolean>,
): CodeWalkthroughDocumentationQualityProfile["bucketSummary"] {
  return Object.fromEntries(CODE_WALKTHROUGH_BUCKETS.map((bucket) => {
    const bucketDocuments = documents.filter((document) => document.bucket === bucket);
    return [bucket, {
      present: directories[bucket],
      markdownCount: bucketDocuments.length,
      enforcedMarkdownCount: bucketDocuments.filter((document) => document.enforcedByCurrentStandard).length,
    }];
  })) as CodeWalkthroughDocumentationQualityProfile["bucketSummary"];
}

function readStandardText(projectRoot?: string): string {
  const root = projectRoot ?? process.cwd();
  return readFileSync(path.join(root, CODE_WALKTHROUGH_STANDARD_PATH), "utf8");
}

function collectBlockers(
  checks: CodeWalkthroughDocumentationQualityProfile["checks"],
  context: {
    rootMarkdownOverflowCount: number;
    missingBucketCount: number;
    enforcedPlaceholderWalkthroughs: readonly CodeWalkthroughDocumentEvaluation[];
    enforcedMissingRequiredShape: readonly CodeWalkthroughDocumentEvaluation[];
    forbiddenExecutionClaims: readonly CodeWalkthroughDocumentEvaluation[];
    misbucketedWalkthroughs: readonly CodeWalkthroughDocumentEvaluation[];
  },
): CodeWalkthroughDocumentationQualityMessage[] {
  const blockers: CodeWalkthroughDocumentationQualityMessage[] = [];
  if (!checks.walkthroughRootExists) {
    blockers.push(message("WALKTHROUGH_ROOT_MISSING", "code-walkthrough-scanner", "Walkthrough root is missing."));
  }
  if (!checks.stageReadmePresent) {
    blockers.push(message("STAGE_README_MISSING", "code-walkthrough-standard", "Stage README is missing."));
  }
  if (!checks.standardDocumentPresent) {
    blockers.push(message("STANDARD_DOCUMENT_MISSING", "code-walkthrough-standard", "Documentation standard is missing."));
  }
  if (!checks.sampleDocumentPresent) {
    blockers.push(message("SAMPLE_DOCUMENT_MISSING", "code-walkthrough-standard", "Sample walkthrough document is missing."));
  }
  if (!checks.expectedBucketsPresent) {
    blockers.push(message("BUCKET_DIRECTORY_MISSING", "code-walkthrough-bucket-layout",
      `${context.missingBucketCount} expected bucket directories are missing.`));
  }
  if (!checks.rootHasNoMarkdownOverflow) {
    blockers.push(message("ROOT_MARKDOWN_OVERFLOW", "code-walkthrough-bucket-layout",
      `${context.rootMarkdownOverflowCount} markdown files are still in the stage root.`));
  }
  if (!checks.bucketAlignmentStable) {
    blockers.push(message("BUCKET_ALIGNMENT_DRIFT", "code-walkthrough-bucket-layout",
      `${context.misbucketedWalkthroughs.length} walkthroughs are in the wrong bucket.`));
  }
  if (!checks.noEnforcedPlaceholderWalkthroughs) {
    blockers.push(message("ENFORCED_PLACEHOLDER_WALKTHROUGHS", "code-walkthrough-documentation-quality-gate",
      `${context.enforcedPlaceholderWalkthroughs.length} enforced walkthroughs still look like placeholders.`));
  }
  if (!checks.enforcedWalkthroughsMeetRequiredShape) {
    blockers.push(message("ENFORCED_REQUIRED_SHAPE_MISSING", "code-walkthrough-documentation-quality-gate",
      `${context.enforcedMissingRequiredShape.length} enforced walkthroughs miss required standard sections.`));
  }
  if (!checks.noForbiddenExecutionClaims) {
    blockers.push(message("FORBIDDEN_EXECUTION_CLAIM", "code-walkthrough-documentation-quality-gate",
      `${context.forbiddenExecutionClaims.length} enforced walkthroughs claim execution or production readiness flags.`));
  }
  return blockers;
}

function collectWarnings(legacyWalkthroughCount: number): CodeWalkthroughDocumentationQualityMessage[] {
  return [
    {
      code: "LEGACY_WALKTHROUGHS_NOT_BLOCKING",
      severity: "warning",
      source: "code-walkthrough-documentation-quality-gate",
      message: `${legacyWalkthroughCount} legacy walkthroughs are visible for migration but do not block the new standard gate.`,
    },
  ];
}

function collectRecommendations(): CodeWalkthroughDocumentationQualityMessage[] {
  return [
    {
      code: "KEEP_BATCH_WALKTHROUGHS_SUBSTANTIVE",
      severity: "recommendation",
      source: "code-walkthrough-standard",
      message: "Use batch walkthroughs only when they explain one coherent refactor with real entry points and verification.",
    },
  ];
}

function message(
  code: string,
  source: CodeWalkthroughDocumentationQualityMessage["source"],
  text: string,
): CodeWalkthroughDocumentationQualityMessage {
  return { code, severity: "blocker", source, message: text };
}

function formatWalkthrough(document: CodeWalkthroughDocumentEvaluation): string {
  return `${document.relativePath}: score=${document.complianceScore}; compliant=${document.compliantWithCurrentStandard}; version=v${document.versionNumber ?? "unknown"}`;
}
