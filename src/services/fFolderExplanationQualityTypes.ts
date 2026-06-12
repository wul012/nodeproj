export const F_FOLDER_EXPLANATION_ROOT = "f" as const;
export const F_FOLDER_EXPLANATION_DIR_NAME = "解释" as const;
export const F_FOLDER_IMAGE_DIR_NAME = "图片" as const;
export const F_FOLDER_EXPLANATION_ENFORCEMENT_FLOOR_VERSION = 2094 as const;
export const F_FOLDER_EXPLANATION_ACTIVE_VERSION_RANGE = "Node v2094-v2103" as const;
export const F_FOLDER_EXPLANATION_MIN_BYTES = 9000 as const;
export const F_FOLDER_EXPLANATION_MIN_CHINESE_CHARS = 3000 as const;
export const F_FOLDER_EXPLANATION_MIN_CODE_PATH_REFERENCES = 4 as const;

export interface FFolderExplanationDocumentScan {
  relativePath: string;
  versionNumber: number;
  fileName: string;
  title: string;
  byteLength: number;
  lineCount: number;
  text: string;
  explanationDirAligned: boolean;
}

export interface FFolderExplanationDocumentEvaluation {
  relativePath: string;
  versionNumber: number;
  fileName: string;
  title: string;
  byteLength: number;
  lineCount: number;
  enforcedByCurrentStandard: boolean;
  explanationDirAligned: boolean;
  hasH1Title: boolean;
  meetsMinimumLength: boolean;
  chineseCharacterCount: number;
  meetsChineseDepth: boolean;
  codePathReferences: string[];
  hasEnoughCodePathReferences: boolean;
  hasGoalOrContextSection: boolean;
  hasCodeEntrySection: boolean;
  hasResponseModelSection: boolean;
  hasServiceFlowSection: boolean;
  hasSafetyBoundarySection: boolean;
  hasVerificationSection: boolean;
  hasNextStepOrStopConditionSection: boolean;
  placeholderSignals: string[];
  forbiddenExecutionClaimSignals: string[];
  missingRequiredSections: string[];
  complianceScore: number;
  compliantWithCurrentStandard: boolean;
}

export interface FFolderVersionSummary {
  versionNumber: number;
  explanationDirExists: boolean;
  explanationMarkdownCount: number;
  imageDirExists: boolean;
  imageFileCount: number;
}

export interface FFolderExplanationQualityScan {
  projectRoot: string;
  fRoot: string;
  rootExists: boolean;
  versionSummaries: FFolderVersionSummary[];
  documents: FFolderExplanationDocumentEvaluation[];
}

export interface FFolderExplanationQualityMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "f-folder-explanation-quality-gate"
    | "f-folder-explanation-scanner"
    | "f-folder-explanation-standard"
    | "f-folder-layout";
  message: string;
}

export interface FFolderExplanationQualityProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: "f-folder-explanation-quality-gate.v1";
  qualityGateState: "verified-quality-gate" | "blocked";
  readyForFFolderExplanationQualityGate: boolean;
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
    root: typeof F_FOLDER_EXPLANATION_ROOT;
    explanationDirName: typeof F_FOLDER_EXPLANATION_DIR_NAME;
    imageDirName: typeof F_FOLDER_IMAGE_DIR_NAME;
    enforcementFloorVersion: typeof F_FOLDER_EXPLANATION_ENFORCEMENT_FLOOR_VERSION;
    activeNodeVersionRange: typeof F_FOLDER_EXPLANATION_ACTIVE_VERSION_RANGE;
    minBytes: typeof F_FOLDER_EXPLANATION_MIN_BYTES;
    minChineseCharacters: typeof F_FOLDER_EXPLANATION_MIN_CHINESE_CHARS;
    minCodePathReferences: typeof F_FOLDER_EXPLANATION_MIN_CODE_PATH_REFERENCES;
    historicalLegacyBlocking: false;
  };
  checks: {
    fRootExists: boolean;
    enforcedExplanationsPresent: boolean;
    enforcedVersionsHaveExplanationDirs: boolean;
    noEmptyImageDirectories: boolean;
    noShortEnforcedExplanations: boolean;
    enforcedChineseDepthMet: boolean;
    enforcedRequiredShapeMet: boolean;
    enforcedCodePathDensityMet: boolean;
    noEnforcedPlaceholderExplanations: boolean;
    noForbiddenExecutionClaims: boolean;
    scanCompleted: boolean;
    readyForFFolderExplanationQualityGate: boolean;
  };
  summary: {
    totalExplanationCount: number;
    enforcedExplanationCount: number;
    enforcedCompliantExplanationCount: number;
    legacyExplanationCount: number;
    enforcedVersionCount: number;
    enforcedVersionMissingExplanationDirCount: number;
    emptyImageDirCount: number;
    shortExplanationCount: number;
    shallowChineseExplanationCount: number;
    missingRequiredShapeCount: number;
    lowCodePathDensityCount: number;
    placeholderCount: number;
    forbiddenExecutionClaimCount: number;
    checkCount: number;
    passedCheckCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  enforcedExplanations: FFolderExplanationDocumentEvaluation[];
  blockers: FFolderExplanationQualityMessage[];
  warnings: FFolderExplanationQualityMessage[];
  recommendations: FFolderExplanationQualityMessage[];
  evidenceEndpoints: {
    qualityGateJson: string;
    qualityGateMarkdown: string;
  };
  qualityDigest: string;
  nextActions: string[];
}
