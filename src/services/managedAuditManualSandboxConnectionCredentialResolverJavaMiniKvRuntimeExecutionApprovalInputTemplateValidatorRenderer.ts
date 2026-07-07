import { renderEntries } from "./liveProbeReportUtils.js";
import type {
  ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidatorProfile,
} from "./managedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidatorTypes.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidatorMarkdown(
  profile: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidatorProfile,
): string {
  return renderVerificationReportMarkdown({
    title: profile.title,
    meta: [
      ["Service", profile.service],
      ["Generated at", profile.generatedAt],
      ["Profile version", profile.profileVersion],
      ["Template validator state", profile.templateValidatorState],
      ["Template validator decision", profile.templateValidatorDecision],
      ["Active Node version", profile.activeNodeVersion],
      ["Source Node version", profile.sourceNodeVersion],
      ["Java source version", profile.javaSourceVersion],
      ["mini-kv source version", profile.miniKvSourceVersion],
      [
        "Ready for runtime execution approval input template validator",
        profile.readyForRuntimeExecutionApprovalInputTemplateValidator,
      ],
      ["Ready for runtime execution packet", profile.readyForRuntimeExecutionPacket],
      ["Ready for runtime live-read gate", profile.readyForRuntimeLiveReadGate],
      ["Runtime execution packet executable", profile.runtimeExecutionPacketExecutable],
      ["Runtime gate approval present", profile.runtimeGateApprovalPresent],
      ["Execution attempted", profile.executionAttempted],
      ["Starts Java service", profile.startsJavaService],
      ["Starts mini-kv service", profile.startsMiniKvService],
      ["Connects managed audit", profile.connectsManagedAudit],
      ["Execution allowed", profile.executionAllowed],
    ],
    sections: [
      { heading: "Source Node v401", entries: profile.sourceNodeV401 },
      { heading: "Template Bundle", entries: profile.templateBundle },
      {
        heading: "Input Templates",
        lines: [
          ...profile.templates.flatMap(renderTemplate),
          "## Target Input Validations",
          "",
          ...profile.targetValidations.flatMap(renderValidation),
          "## Checks",
          "",
          ...renderEntries(profile.checks),
        ],
      },
      { heading: "Summary", entries: profile.summary },
      { heading: "Production Blockers", messages: profile.productionBlockers, emptyText: "No production blockers." },
      { heading: "Warnings", messages: profile.warnings, emptyText: "No warnings." },
      { heading: "Recommendations", messages: profile.recommendations, emptyText: "No recommendations." },
      { heading: "Evidence Endpoints", entries: profile.evidenceEndpoints },
      { heading: "Next Actions", list: profile.nextActions, emptyText: "No next actions." },
    ],
  });
}

function renderTemplate(
  template: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidatorProfile["templates"][number],
): string[] {
  return [
    `- ${template.key}`,
    `  - owner: ${template.owner}`,
    `  - targetPath: ${template.targetPath}`,
    `  - templateArchivePath: ${template.templateArchivePath}`,
    `  - schemaVersion: ${template.schemaVersion}`,
    `  - inputKind: ${template.inputKind}`,
    `  - requiredFields: ${JSON.stringify(template.requiredFields)}`,
    `  - expectedConstants: ${JSON.stringify(template.expectedConstants)}`,
    `  - semanticRules: ${JSON.stringify(template.semanticRules)}`,
    `  - templateDigest: ${template.templateDigest}`,
  ];
}

function renderValidation(
  validation: ManagedAuditManualSandboxConnectionCredentialResolverJavaMiniKvRuntimeExecutionApprovalInputTemplateValidatorProfile["targetValidations"][number],
): string[] {
  return [
    `- ${validation.key}`,
    `  - owner: ${validation.owner}`,
    `  - file: ${JSON.stringify(validation.file)}`,
    `  - present: ${validation.present}`,
    `  - valid: ${validation.valid}`,
    `  - requiredFieldCount: ${validation.requiredFieldCount}`,
    `  - missingRequiredFieldCount: ${validation.missingRequiredFieldCount}`,
    `  - expectedConstantCount: ${validation.expectedConstantCount}`,
    `  - passedExpectedConstantCount: ${validation.passedExpectedConstantCount}`,
    `  - semanticRuleCount: ${validation.semanticRuleCount}`,
    `  - passedSemanticRuleCount: ${validation.passedSemanticRuleCount}`,
    `  - canUnlockRuntimeAlone: ${validation.canUnlockRuntimeAlone}`,
  ];
}
