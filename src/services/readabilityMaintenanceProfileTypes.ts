export const READABILITY_MAINTENANCE_PROFILE_VERSION = "readability-maintenance-profile.v1" as const;
export const READABILITY_MAINTENANCE_ACTIVE_VERSION_RANGE = "Node v2104-v2108" as const;

export const READABILITY_MAINTENANCE_DOCUMENTS = [
  {
    id: "control-plane-map",
    path: "docs/architecture/control-plane-map.md",
    requiredPhrases: [
      "控制面聚合与质量门禁",
      "route catalog",
      "executionAllowed=false",
      "不启动 Java service",
      "不启动 mini-kv service",
    ],
  },
  {
    id: "quality-gates-map",
    path: "docs/architecture/quality-gates-map.md",
    requiredPhrases: [
      "QualityTypes",
      "QualityRules",
      "QualityScanner",
      "QualityGate",
      "src/services/fFolderExplanationQualityGate.ts",
    ],
  },
  {
    id: "evidence-flow-map",
    path: "docs/architecture/evidence-flow-map.md",
    requiredPhrases: [
      "read-only",
      "historical fixture",
      "dry-run",
      "production execution",
      "readyForProductionOperations=true",
    ],
  },
  {
    id: "route-service-test-map",
    path: "docs/architecture/route-service-test-map.md",
    requiredPhrases: [
      "/api/v1/audit/managed-audit-readability-maintenance-profile",
      "src/services/readabilityMaintenanceProfile.ts",
      "test/readabilityMaintenanceProfile.test.ts",
      "access policy",
      "catalog summary",
    ],
  },
  {
    id: "f-folder-explanation-standard-closeout",
    path: "docs/architecture/f-folder-explanation-standard-closeout.md",
    requiredPhrases: [
      "3000 个中文字符",
      "9000 bytes",
      "禁止把 preflight 说成 production execution",
      "禁止为了凑 3000 字",
      "src/services/fFolderExplanationQualityGate.ts",
    ],
  },
] as const;

export type ReadabilityMaintenanceDocumentId =
  typeof READABILITY_MAINTENANCE_DOCUMENTS[number]["id"];

export interface ReadabilityMaintenanceDocumentEvaluation {
  id: ReadabilityMaintenanceDocumentId;
  relativePath: string;
  exists: boolean;
  byteLength: number;
  lineCount: number;
  missingRequiredPhrases: string[];
  passes: boolean;
}

export interface ReadabilityMaintenanceMessage {
  code: string;
  severity: "blocker" | "warning" | "recommendation";
  source:
    | "readability-maintenance-profile"
    | "control-plane-map"
    | "quality-gates-map"
    | "evidence-flow-map"
    | "route-service-test-map"
    | "f-folder-explanation-standard-closeout"
    | "runtime-config";
  message: string;
}

export interface ReadabilityMaintenanceProfile {
  service: "orderops-node";
  title: string;
  generatedAt: string;
  profileVersion: typeof READABILITY_MAINTENANCE_PROFILE_VERSION;
  maintenanceState: "verified-readability-maintenance" | "blocked";
  readyForReadabilityMaintenance: boolean;
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
    sourceSuggestion: "D:\\C\\四项目理解统筹\\06-四项目可读性保养建议";
    activeVersionRange: typeof READABILITY_MAINTENANCE_ACTIVE_VERSION_RANGE;
    routeGroup: "managed-audit-route-quality";
    localDocumentationOnly: true;
    javaMiniKvParallelRecommended: true;
    aiprojReadOnlyObserved: true;
  };
  routeCatalog: {
    expectedGroupCount: number;
    expectedRouteCount: number;
    managedAuditRouteCount: number;
    routeQualityRouteCount: number;
  };
  documents: ReadabilityMaintenanceDocumentEvaluation[];
  checks: {
    architectureDocumentsPresent: boolean;
    controlPlaneMapDocumentsBoundaries: boolean;
    qualityGateFamilyDocumented: boolean;
    evidenceFlowDocumentsReadOnlySafety: boolean;
    routeServiceTestMapDocumentsNewRoute: boolean;
    fFolderStandardCloseoutDocumented: boolean;
    routeCatalogCountsAligned: boolean;
    upstreamActionsStillDisabled: boolean;
    noSiblingServiceStartup: boolean;
    noProductionExecutionEnabled: boolean;
    readyForReadabilityMaintenance: boolean;
  };
  summary: {
    documentCount: number;
    passingDocumentCount: number;
    missingDocumentCount: number;
    missingPhraseCount: number;
    checkCount: number;
    passedCheckCount: number;
    productionBlockerCount: number;
    warningCount: number;
    recommendationCount: number;
  };
  productionBlockers: ReadabilityMaintenanceMessage[];
  warnings: ReadabilityMaintenanceMessage[];
  recommendations: ReadabilityMaintenanceMessage[];
  evidenceEndpoints: {
    readabilityMaintenanceProfileJson: string;
    readabilityMaintenanceProfileMarkdown: string;
    routeCatalogSummaryJson: string;
    fFolderExplanationQualityGateJson: string;
    codeWalkthroughDocumentationQualityGateJson: string;
  };
  qualityDigest: string;
  nextActions: string[];
}
