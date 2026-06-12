import {
  CODE_WALKTHROUGH_CHINESE_ENFORCEMENT_FLOOR_RECORD,
  CODE_WALKTHROUGH_ENFORCEMENT_FLOOR_RECORD,
  CODE_WALKTHROUGH_MIN_CHINESE_CHARACTERS,
  type CodeWalkthroughDocumentEvaluation,
  type CodeWalkthroughDocumentScan,
} from "./codeWalkthroughDocumentationQualityTypes.js";

const REQUIRED_SECTION_RULES = [
  {
    key: "goal-and-non-goal",
    patterns: [/goal/i, /non[- ]?goal/i, /目标/, /非目标/],
  },
  {
    key: "entry-points",
    patterns: [/entry point/i, /route/i, /public export/i, /入口/, /路由/, /导出/],
  },
  {
    key: "response-model",
    patterns: [/response model/i, /profile/i, /data model/i, /响应/, /模型/],
  },
  {
    key: "upstream-evidence",
    patterns: [/upstream/i, /evidence/i, /config/i, /Java/, /mini-kv/, /historical/i, /上游/, /证据/, /配置/],
  },
  {
    key: "service-flow",
    patterns: [/service flow/i, /flow/i, /src\//, /服务流/, /流程/],
  },
  {
    key: "safety-boundary",
    patterns: [/safety/i, /boundary/i, /read-only/i, /execution allowed/i, /安全/, /边界/, /只读/],
  },
  {
    key: "test-coverage",
    patterns: [/test/i, /typecheck/i, /build/i, /smoke/i, /CI/, /测试/, /验证/],
  },
  {
    key: "one-sentence-summary",
    patterns: [/one-sentence/i, /summary/i, /一句话/, /总结/],
  },
] as const;

const PLACEHOLDER_PATTERNS = [
  /\bTODO\b/i,
  /待补/,
  /后续补充/,
  /coming soon/i,
  /stub/i,
] as const;

const FORBIDDEN_EXECUTION_CLAIM_PATTERNS = [
  /executionAllowed:\s*true/,
  /readyForProductionAudit:\s*true/,
  /readyForProductionOperations:\s*true/,
  /credentialValueRead:\s*true/,
  /mutates(Java|MiniKv)State:\s*true/,
] as const;
const CHINESE_CHARACTER_PATTERN = /[\u3400-\u9fff]/g;

export function evaluateCodeWalkthroughDocument(
  document: CodeWalkthroughDocumentScan,
  enforcementFloorRecord: number = CODE_WALKTHROUGH_ENFORCEMENT_FLOOR_RECORD,
): CodeWalkthroughDocumentEvaluation {
  const missingRequiredSections = REQUIRED_SECTION_RULES
    .filter((rule) => !hasAnyPattern(document.text, rule.patterns))
    .map((rule) => rule.key);
  const placeholderSignals = collectMatchingPatterns(document.text, PLACEHOLDER_PATTERNS);
  const forbiddenExecutionClaimSignals = collectMatchingPatterns(document.text, FORBIDDEN_EXECUTION_CLAIM_PATTERNS);
  const enforcedByCurrentStandard =
    document.recordNumber !== null && document.recordNumber >= enforcementFloorRecord;
  const chineseCharacterCount = document.text.match(CHINESE_CHARACTER_PATTERN)?.length ?? 0;
  const chineseWritingRequired =
    document.recordNumber !== null && document.recordNumber >= CODE_WALKTHROUGH_CHINESE_ENFORCEMENT_FLOOR_RECORD;
  const meetsChineseWritingFloor =
    !chineseWritingRequired || chineseCharacterCount >= CODE_WALKTHROUGH_MIN_CHINESE_CHARACTERS;
  const hasH1Title = /^#\s+\S+/m.test(document.text);
  const bucketAligned = document.bucket === document.expectedBucket;
  const hasGoalAndNonGoal = !missingRequiredSections.includes("goal-and-non-goal");
  const hasEntryPointSection = !missingRequiredSections.includes("entry-points");
  const hasResponseModelSection = !missingRequiredSections.includes("response-model");
  const hasUpstreamEvidenceSection = !missingRequiredSections.includes("upstream-evidence");
  const hasServiceFlowSection = !missingRequiredSections.includes("service-flow");
  const hasSafetyBoundarySection = !missingRequiredSections.includes("safety-boundary");
  const hasTestCoverageSection = !missingRequiredSections.includes("test-coverage");
  const hasOneSentenceSummary = !missingRequiredSections.includes("one-sentence-summary");
  const satisfiedShapeCount = [
    hasH1Title,
    hasGoalAndNonGoal,
    hasEntryPointSection,
    hasResponseModelSection,
    hasUpstreamEvidenceSection,
    hasServiceFlowSection,
    hasSafetyBoundarySection,
    hasTestCoverageSection,
    hasOneSentenceSummary,
    meetsChineseWritingFloor,
  ].filter(Boolean).length;
  const complianceScore = Math.round((satisfiedShapeCount / 10) * 100);
  const compliantWithCurrentStandard =
    bucketAligned
    && hasH1Title
    && meetsChineseWritingFloor
    && missingRequiredSections.length === 0
    && placeholderSignals.length === 0
    && forbiddenExecutionClaimSignals.length === 0;

  return {
    relativePath: document.relativePath,
    bucket: document.bucket,
    expectedBucket: document.expectedBucket,
    recordNumber: document.recordNumber,
    versionNumber: document.versionNumber,
    title: document.title,
    byteLength: document.byteLength,
    lineCount: document.lineCount,
    enforcedByCurrentStandard,
    chineseWritingRequired,
    chineseCharacterCount,
    meetsChineseWritingFloor,
    bucketAligned,
    hasH1Title,
    hasGoalAndNonGoal,
    hasEntryPointSection,
    hasResponseModelSection,
    hasUpstreamEvidenceSection,
    hasServiceFlowSection,
    hasSafetyBoundarySection,
    hasTestCoverageSection,
    hasOneSentenceSummary,
    placeholderSignals,
    forbiddenExecutionClaimSignals,
    missingRequiredSections,
    complianceScore,
    compliantWithCurrentStandard,
  };
}

function hasAnyPattern(text: string, patterns: readonly RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(text));
}

function collectMatchingPatterns(text: string, patterns: readonly RegExp[]): string[] {
  return patterns
    .filter((pattern) => pattern.test(text))
    .map((pattern) => pattern.source)
    .sort();
}
