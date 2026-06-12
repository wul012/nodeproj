export const CODE_WALKTHROUGH_ROOT = "代码讲解记录_生产雏形阶段3" as const;
export const CODE_WALKTHROUGH_STANDARD_PATH = "docs/code-walkthrough-documentation-standard.md" as const;
export const CODE_WALKTHROUGH_SAMPLE_PATH =
  "代码讲解记录/107-production-readiness-summary-v3-v103.md" as const;
export const CODE_WALKTHROUGH_ENFORCEMENT_FLOOR_RECORD = 2063 as const;
export const CODE_WALKTHROUGH_CHINESE_ENFORCEMENT_FLOOR_RECORD = 2070 as const;
export const CODE_WALKTHROUGH_MIN_CHINESE_CHARACTERS = 3000 as const;

export const CODE_WALKTHROUGH_BUCKETS = [
  "r0000",
  "r0500",
  "r1000",
  "r1500",
  "r2000",
  "misc",
] as const;

export type CodeWalkthroughBucket = typeof CODE_WALKTHROUGH_BUCKETS[number];

export interface CodeWalkthroughDocumentScan {
  relativePath: string;
  bucket: CodeWalkthroughBucket | "root" | "unknown";
  expectedBucket: CodeWalkthroughBucket;
  recordNumber: number | null;
  versionNumber: number | null;
  title: string;
  byteLength: number;
  lineCount: number;
  text: string;
}

export interface CodeWalkthroughDocumentEvaluation {
  relativePath: string;
  bucket: CodeWalkthroughBucket | "root" | "unknown";
  expectedBucket: CodeWalkthroughBucket;
  recordNumber: number | null;
  versionNumber: number | null;
  title: string;
  byteLength: number;
  lineCount: number;
  enforcedByCurrentStandard: boolean;
  chineseWritingRequired: boolean;
  chineseCharacterCount: number;
  meetsChineseWritingFloor: boolean;
  bucketAligned: boolean;
  hasH1Title: boolean;
  hasGoalAndNonGoal: boolean;
  hasEntryPointSection: boolean;
  hasResponseModelSection: boolean;
  hasUpstreamEvidenceSection: boolean;
  hasServiceFlowSection: boolean;
  hasSafetyBoundarySection: boolean;
  hasTestCoverageSection: boolean;
  hasOneSentenceSummary: boolean;
  placeholderSignals: string[];
  forbiddenExecutionClaimSignals: string[];
  repetitiveParagraphSignals: string[];
  oversizedDetailedSectionSignals: string[];
  h2SectionCount: number;
  scannableH2SectionCount: number;
  largestH2SectionHeading: string | null;
  largestH2SectionChineseCharacters: number;
  missingRequiredSections: string[];
  complianceScore: number;
  compliantWithCurrentStandard: boolean;
}

export interface CodeWalkthroughDocumentationScan {
  projectRoot: string;
  walkthroughRoot: string;
  rootExists: boolean;
  readmeExists: boolean;
  standardDocumentExists: boolean;
  sampleDocumentExists: boolean;
  bucketDirectories: Record<CodeWalkthroughBucket, boolean>;
  rootMarkdownFiles: string[];
  documents: CodeWalkthroughDocumentEvaluation[];
}

export interface CodeWalkthroughDocumentationQualityMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "code-walkthrough-documentation-quality-gate"
    | "code-walkthrough-bucket-layout"
    | "code-walkthrough-standard"
    | "code-walkthrough-scanner";
  message: string;
}

export interface CodeWalkthroughDocumentationQualityProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "code-walkthrough-documentation-quality-gate.v1";
  qualityGateState: "verified-quality-gate" | "blocked";
  readyForCodeWalkthroughDocumentationQualityGate: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnlyQualityGate: true;
  executionAllowed: false;
  connectsManagedAudit: false;
  startsJavaService: false;
  startsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  scanScope: {
    root: typeof CODE_WALKTHROUGH_ROOT;
    standardDocument: typeof CODE_WALKTHROUGH_STANDARD_PATH;
    sampleDocument: typeof CODE_WALKTHROUGH_SAMPLE_PATH;
    enforcementFloorRecord: typeof CODE_WALKTHROUGH_ENFORCEMENT_FLOOR_RECORD;
    chineseEnforcementFloorRecord: typeof CODE_WALKTHROUGH_CHINESE_ENFORCEMENT_FLOOR_RECORD;
    minChineseCharacters: typeof CODE_WALKTHROUGH_MIN_CHINESE_CHARACTERS;
    activeNodeVersionRange: "Node v2058-v2108";
    historicalLegacyBlocking: false;
  };
  checks: {
    walkthroughRootExists: boolean;
    stageReadmePresent: boolean;
    standardDocumentPresent: boolean;
    sampleDocumentPresent: boolean;
    expectedBucketsPresent: boolean;
    rootHasNoMarkdownOverflow: boolean;
    bucketAlignmentStable: boolean;
    enforcedWalkthroughsPresent: boolean;
    noEnforcedPlaceholderWalkthroughs: boolean;
    enforcedWalkthroughsMeetRequiredShape: boolean;
    enforcedChineseWalkthroughsMeetFloor: boolean;
    noRepetitiveParagraphPadding: boolean;
    noOversizedDetailedWalkthroughSection: boolean;
    noForbiddenExecutionClaims: boolean;
    batchWalkthroughPolicyDocumented: boolean;
    historicalLegacyAllowedButVisible: boolean;
    scanCompleted: boolean;
    readyForCodeWalkthroughDocumentationQualityGate: boolean;
  };
  summary: {
    totalWalkthroughCount: number;
    enforcedWalkthroughCount: number;
    enforcedCompliantWalkthroughCount: number;
    legacyWalkthroughCount: number;
    rootMarkdownOverflowCount: number;
    missingBucketCount: number;
    misbucketedWalkthroughCount: number;
    enforcedPlaceholderCount: number;
    enforcedMissingRequiredShapeCount: number;
    enforcedChineseWritingCount: number;
    enforcedChineseWritingShortCount: number;
    repetitiveParagraphPaddingCount: number;
    oversizedDetailedWalkthroughCount: number;
    minimumScannableH2SectionCount: number;
    largestH2SectionChineseCharacters: number;
    forbiddenExecutionClaimCount: number;
    checkCount: number;
    passedCheckCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  bucketSummary: Record<CodeWalkthroughBucket, {
    present: boolean;
    markdownCount: number;
    enforcedMarkdownCount: number;
  }>;
  enforcedWalkthroughs: CodeWalkthroughDocumentEvaluation[];
  blockers: CodeWalkthroughDocumentationQualityMessage[];
  warnings: CodeWalkthroughDocumentationQualityMessage[];
  recommendations: CodeWalkthroughDocumentationQualityMessage[];
  evidenceEndpoints: {
    qualityGateJson: string;
    qualityGateMarkdown: string;
    standardDocument: typeof CODE_WALKTHROUGH_STANDARD_PATH;
    sampleDocument: typeof CODE_WALKTHROUGH_SAMPLE_PATH;
  };
  qualityDigest: string;
  nextActions: string[];
}
