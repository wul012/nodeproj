# F-folder explanation quality gate

- Service: orderops-node
- Generated at: 2026-06-12T00:22:25.055Z
- Profile version: f-folder-explanation-quality-gate.v1
- Quality gate state: verified-quality-gate
- Ready for f-folder explanation quality gate: true
- Execution allowed: false
- Connects managed audit: false

## Scan Scope

- root: f
- explanationDirName: 解释
- imageDirName: 图片
- enforcementFloorVersion: 2094
- activeNodeVersionRange: Node v2094-v2103
- minBytes: 3600
- minChineseCharacters: 900
- minCodePathReferences: 4
- historicalLegacyBlocking: false

## Checks

- fRootExists: true
- enforcedExplanationsPresent: true
- enforcedVersionsHaveExplanationDirs: true
- noEmptyImageDirectories: true
- noShortEnforcedExplanations: true
- enforcedChineseDepthMet: true
- enforcedRequiredShapeMet: true
- enforcedCodePathDensityMet: true
- noEnforcedPlaceholderExplanations: true
- noForbiddenExecutionClaims: true
- scanCompleted: true
- readyForFFolderExplanationQualityGate: true

## Summary

- totalExplanationCount: 17
- enforcedExplanationCount: 11
- enforcedCompliantExplanationCount: 11
- legacyExplanationCount: 6
- enforcedVersionCount: 10
- enforcedVersionMissingExplanationDirCount: 0
- emptyImageDirCount: 0
- shortExplanationCount: 0
- shallowChineseExplanationCount: 0
- missingRequiredShapeCount: 0
- lowCodePathDensityCount: 0
- placeholderCount: 0
- forbiddenExecutionClaimCount: 0
- checkCount: 12
- passedCheckCount: 12
- productionBlockerCount: 0
- warningCount: 1
- recommendationCount: 1

## Enforced Explanations

- f/2094/解释/production-shard-execution-real-artifact-intake-readiness-switch-v2094.md: bytes=6939; chinese=1415; codePaths=14; score=100; compliant=true
- f/2095/解释/production-shard-execution-external-artifact-provenance-preflight-v2095.md: bytes=6789; chinese=1431; codePaths=14; score=100; compliant=true
- f/2096/解释/production-shard-execution-external-artifact-conflict-taxonomy-v2096.md: bytes=6674; chinese=1422; codePaths=14; score=100; compliant=true
- f/2097/解释/production-shard-execution-external-artifact-quarantine-envelope-v2097.md: bytes=6612; chinese=1392; codePaths=14; score=100; compliant=true
- f/2098/解释/production-shard-execution-real-artifact-intake-preflight-closeout-v2098.md: bytes=6738; chinese=1390; codePaths=15; score=100; compliant=true
- f/2098/解释/production-shard-execution-real-artifact-preflight-batch-v2094-v2098-code-explanation.md: bytes=5975; chinese=1175; codePaths=16; score=100; compliant=true
- f/2099/解释/f-folder-explanation-quality-type-contract-v2099.md: bytes=6456; chinese=1439; codePaths=13; score=100; compliant=true
- f/2100/解释/f-folder-explanation-scanner-v2100.md: bytes=6343; chinese=1414; codePaths=14; score=100; compliant=true
- f/2101/解释/f-folder-explanation-rule-evaluator-v2101.md: bytes=6401; chinese=1425; codePaths=12; score=100; compliant=true
- f/2102/解释/f-folder-explanation-quality-route-v2102.md: bytes=6406; chinese=1382; codePaths=12; score=100; compliant=true
- f/2103/解释/f-folder-explanation-expansion-closeout-v2103.md: bytes=6524; chinese=1451; codePaths=13; score=100; compliant=true

## Blockers

- No f-folder explanation quality blockers.

## Warnings

- LEGACY_F_FOLDER_EXPLANATIONS_VISIBLE (warning, f-folder-explanation-quality-gate): 6 legacy f-folder explanations are visible but do not block the current standard.

## Recommendations

- KEEP_CHINESE_EXPLANATIONS_SUBSTANTIVE (recommendation, f-folder-explanation-standard): For future versions, a short explanation should be omitted or expanded into a real Chinese code explanation.

## Evidence Endpoints

- qualityGateJson: /api/v1/audit/f-folder-explanation-quality-gate
- qualityGateMarkdown: /api/v1/audit/f-folder-explanation-quality-gate?format=markdown

## Next Actions

- Keep f-folder explanations in Chinese when they exist.
- Write enough detail to explain the code path, response model, safety boundary, verification, and next stop condition.
- Do not create an empty image folder; use f/<version>/图片 only when actual screenshot or image evidence exists.

Quality digest: 0704638a273c4ae59a349b2a29a10f050dafad07608da02ee0ef17829d89594f