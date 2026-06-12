import {
  F_FOLDER_EXPLANATION_ENFORCEMENT_FLOOR_VERSION,
  F_FOLDER_EXPLANATION_MIN_BYTES,
  F_FOLDER_EXPLANATION_MIN_CHINESE_CHARS,
  F_FOLDER_EXPLANATION_MIN_CODE_PATH_REFERENCES,
  type FFolderExplanationDocumentEvaluation,
  type FFolderExplanationDocumentScan,
} from "./fFolderExplanationQualityTypes.js";

const REQUIRED_SECTION_RULES = [
  {
    key: "goal-or-context",
    patterns: [/目标/, /背景/, /为什么/, /Goal/i, /Purpose/i],
  },
  {
    key: "code-entry",
    patterns: [/代码入口/, /入口/, /路由/, /导出/, /src[\\/]/, /Entry Point/i],
  },
  {
    key: "response-model",
    patterns: [/响应模型/, /数据模型/, /profile/, /stagePayload/, /Response Model/i],
  },
  {
    key: "service-flow",
    patterns: [/执行流程/, /调用链/, /服务流程/, /Service Flow/i],
  },
  {
    key: "safety-boundary",
    patterns: [/安全边界/, /生产授权/, /只读/, /executionAllowed/, /Safety Boundary/i],
  },
  {
    key: "verification",
    patterns: [/验证/, /测试/, /typecheck/, /build/, /smoke/, /CI/i],
  },
  {
    key: "next-step-or-stop-condition",
    patterns: [/下一步/, /停止条件/, /后续/, /Next Action/i],
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
  /readyForProductionShardExecution:\s*true/,
  /productionAuthority:\s*true/,
  /credentialValueRead:\s*true/,
  /mutates(Java|MiniKv)State:\s*true/,
] as const;

const CODE_PATH_PATTERN = /(?:src|test|docs|e|f|代码讲解记录_生产雏形阶段3)[\\/][^\s`，。；；)）]+/g;
const CHINESE_CHARACTER_PATTERN = /[\u3400-\u9fff]/g;

export function evaluateFFolderExplanationDocument(
  document: FFolderExplanationDocumentScan,
  enforcementFloorVersion: number = F_FOLDER_EXPLANATION_ENFORCEMENT_FLOOR_VERSION,
): FFolderExplanationDocumentEvaluation {
  const missingRequiredSections = REQUIRED_SECTION_RULES
    .filter((rule) => !hasAnyPattern(document.text, rule.patterns))
    .map((rule) => rule.key);
  const placeholderSignals = collectMatchingPatterns(document.text, PLACEHOLDER_PATTERNS);
  const forbiddenExecutionClaimSignals = collectMatchingPatterns(document.text, FORBIDDEN_EXECUTION_CLAIM_PATTERNS);
  const codePathReferences = uniqueMatches(document.text.match(CODE_PATH_PATTERN) ?? []);
  const chineseCharacterCount = document.text.match(CHINESE_CHARACTER_PATTERN)?.length ?? 0;
  const enforcedByCurrentStandard = document.versionNumber >= enforcementFloorVersion;
  const hasH1Title = /^#\s+\S+/m.test(document.text);
  const meetsMinimumLength = document.byteLength >= F_FOLDER_EXPLANATION_MIN_BYTES;
  const meetsChineseDepth = chineseCharacterCount >= F_FOLDER_EXPLANATION_MIN_CHINESE_CHARS;
  const hasEnoughCodePathReferences =
    codePathReferences.length >= F_FOLDER_EXPLANATION_MIN_CODE_PATH_REFERENCES;
  const hasGoalOrContextSection = !missingRequiredSections.includes("goal-or-context");
  const hasCodeEntrySection = !missingRequiredSections.includes("code-entry");
  const hasResponseModelSection = !missingRequiredSections.includes("response-model");
  const hasServiceFlowSection = !missingRequiredSections.includes("service-flow");
  const hasSafetyBoundarySection = !missingRequiredSections.includes("safety-boundary");
  const hasVerificationSection = !missingRequiredSections.includes("verification");
  const hasNextStepOrStopConditionSection =
    !missingRequiredSections.includes("next-step-or-stop-condition");
  const satisfiedShapeCount = [
    document.explanationDirAligned,
    hasH1Title,
    meetsMinimumLength,
    meetsChineseDepth,
    hasEnoughCodePathReferences,
    hasGoalOrContextSection,
    hasCodeEntrySection,
    hasResponseModelSection,
    hasServiceFlowSection,
    hasSafetyBoundarySection,
    hasVerificationSection,
    hasNextStepOrStopConditionSection,
    placeholderSignals.length === 0,
    forbiddenExecutionClaimSignals.length === 0,
  ].filter(Boolean).length;
  const complianceScore = Math.round((satisfiedShapeCount / 14) * 100);
  const compliantWithCurrentStandard =
    document.explanationDirAligned
    && hasH1Title
    && meetsMinimumLength
    && meetsChineseDepth
    && hasEnoughCodePathReferences
    && missingRequiredSections.length === 0
    && placeholderSignals.length === 0
    && forbiddenExecutionClaimSignals.length === 0;

  return {
    relativePath: document.relativePath,
    versionNumber: document.versionNumber,
    fileName: document.fileName,
    title: document.title,
    byteLength: document.byteLength,
    lineCount: document.lineCount,
    enforcedByCurrentStandard,
    explanationDirAligned: document.explanationDirAligned,
    hasH1Title,
    meetsMinimumLength,
    chineseCharacterCount,
    meetsChineseDepth,
    codePathReferences,
    hasEnoughCodePathReferences,
    hasGoalOrContextSection,
    hasCodeEntrySection,
    hasResponseModelSection,
    hasServiceFlowSection,
    hasSafetyBoundarySection,
    hasVerificationSection,
    hasNextStepOrStopConditionSection,
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

function uniqueMatches(matches: string[]): string[] {
  return [...new Set(matches.map((match) => match.replace(/\\/g, "/")))].sort();
}
