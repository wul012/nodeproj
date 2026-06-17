import {
  createControlledReadOnlyShardPreviewTypeModuleCatalog,
  type ControlledReadOnlyShardPreviewTypeModuleCatalog,
  type ControlledReadOnlyShardPreviewTypeModuleCatalogEntry,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalog.js";
import { renderVerificationReportMarkdown } from "./verificationReportBuilder.js";

export function renderControlledReadOnlyShardPreviewTypeModuleCatalogMarkdown(
  catalog: ControlledReadOnlyShardPreviewTypeModuleCatalog =
    createControlledReadOnlyShardPreviewTypeModuleCatalog(),
): string {
  return renderVerificationReportMarkdown({
    title: "Controlled read-only shard preview type module catalog",
    meta: [
      ["Catalog version", catalog.catalogVersion],
      ["Public entry point", catalog.publicEntryPoint],
      ["Module count", catalog.moduleCount],
      ["Stable re-export module count", catalog.stableReExportModuleCount],
      ["Stop condition", catalog.stopCondition],
    ],
    sections: [
      { heading: "Modules", lines: catalog.entries.flatMap(renderTypeModuleEntry) },
    ],
  });
}

function renderTypeModuleEntry(entry: ControlledReadOnlyShardPreviewTypeModuleCatalogEntry): string[] {
  return [
    `### ${entry.order}. ${entry.id}`,
    "",
    `- Module path: ${entry.modulePath}`,
    `- Owns: ${entry.owns.join(", ")}`,
    `- Consumed by: ${entry.consumedBy.join(", ")}`,
    `- Stable profile re-export: ${entry.exportsViaStableProfileTypes}`,
    `- Maintenance rule: ${entry.maintenanceRule}`,
    `- Stop condition: ${entry.stopCondition}`,
    "",
  ];
}
