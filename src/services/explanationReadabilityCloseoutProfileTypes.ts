export const EXPLANATION_READABILITY_CLOSEOUT_PROFILE_VERSION =
  "explanation-readability-closeout-profile.v1" as const;
export const EXPLANATION_READABILITY_CLOSEOUT_ACTIVE_VERSION_RANGE = "Node v2109-v2113" as const;

export interface ExplanationReadabilityGateSummary {
  id: "f-folder-explanation-quality-gate" | "code-walkthrough-documentation-quality-gate";
  profileVersion: string;
  state: string;
  ready: boolean;
  enforcedDocumentCount: number;
  compliantDocumentCount: number;
  repetitiveParagraphPaddingCount: number;
  oversizedDetailedSectionCount: number;
  minimumScannableH2SectionCount: number;
  largestH2SectionChineseCharacters: number;
  qualityDigest: string;
}

export interface ExplanationReadabilityCloseoutMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "explanation-readability-closeout-profile"
    | "f-folder-explanation-quality-gate"
    | "code-walkthrough-documentation-quality-gate"
    | "route-catalog"
    | "runtime-config";
  message: string;
}

export interface ExplanationReadabilityCloseoutProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: typeof EXPLANATION_READABILITY_CLOSEOUT_PROFILE_VERSION;
  closeoutState: "verified-explanation-readability-closeout" | "blocked";
  readyForExplanationReadabilityCloseout: boolean;
  readyForProductionAudit: false;
  readyForProductionWindow: false;
  readyForProductionOperations: false;
  readOnlyProfile: true;
  executionAllowed: false;
  connectsManagedAudit: false;
  startsJavaService: false;
  startsMiniKvService: false;
  mutatesJavaState: false;
  mutatesMiniKvState: false;
  scope: {
    activeVersionRange: typeof EXPLANATION_READABILITY_CLOSEOUT_ACTIVE_VERSION_RANGE;
    localDocumentationOnly: true;
    sharedMarkdownReadabilityAnalyzer: "src/services/markdownDocumentReadabilitySignals.ts";
    routeGroup: "managed-audit-route-quality";
    javaMiniKvParallelRecommended: true;
  };
  gates: {
    fFolderExplanationQualityGate: ExplanationReadabilityGateSummary;
    codeWalkthroughDocumentationQualityGate: ExplanationReadabilityGateSummary;
  };
  routeCatalog: {
    expectedRouteCount: number;
    managedAuditRouteCount: number;
    routeQualityRouteCount: number;
    closeoutRouteRegistered: boolean;
  };
  checks: {
    fFolderGateVerified: boolean;
    codeWalkthroughGateVerified: boolean;
    noRepetitiveParagraphPadding: boolean;
    noOversizedDetailedSections: boolean;
    scannableSectionsMeasured: boolean;
    routeCatalogIncludesCloseoutProfile: boolean;
    upstreamActionsStillDisabled: boolean;
    noSiblingServiceStartup: boolean;
    noProductionExecutionEnabled: boolean;
    readyForExplanationReadabilityCloseout: boolean;
  };
  summary: {
    gateCount: number;
    readyGateCount: number;
    enforcedDocumentCount: number;
    compliantDocumentCount: number;
    repetitiveParagraphPaddingCount: number;
    oversizedDetailedSectionCount: number;
    minimumScannableH2SectionCount: number;
    largestH2SectionChineseCharacters: number;
    checkCount: number;
    passedCheckCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ExplanationReadabilityCloseoutMessage[];
  warnings: ExplanationReadabilityCloseoutMessage[];
  recommendations: ExplanationReadabilityCloseoutMessage[];
  evidenceEndpoints: {
    closeoutProfileJson: string;
    closeoutProfileMarkdown: string;
    fFolderExplanationQualityGateJson: string;
    codeWalkthroughDocumentationQualityGateJson: string;
    markdownReadabilityAnalyzer: "src/services/markdownDocumentReadabilitySignals.ts";
  };
  qualityDigest: string;
  nextActions: string[];
}
