import type {
  ControlledReadOnlyShardPreviewTypeModuleCatalogEntry,
} from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalogTypes.js";

import { TYPE_MODULE_CATALOG_FOUNDATION_ENTRIES } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalogFoundationEntries.js";
import { TYPE_MODULE_CATALOG_OPERATOR_EVIDENCE_ENTRIES } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalogOperatorEvidenceEntries.js";
import { TYPE_MODULE_CATALOG_CAPTURE_DRAFT_ENTRIES } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalogCaptureDraftEntries.js";
import { TYPE_MODULE_CATALOG_TEXT_PACKAGE_PREFLIGHT_ENTRIES } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalogTextPackagePreflightEntries.js";
import { TYPE_MODULE_CATALOG_TEXT_PACKAGE_EVIDENCE_ENTRIES } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalogTextPackageEvidenceEntries.js";
import { TYPE_MODULE_CATALOG_PROFILE_ENTRIES } from "./managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeModuleCatalogProfileEntries.js";

export interface ControlledReadOnlyShardPreviewTypeModuleCatalogEntryGroup {
  id: string;
  entries: ControlledReadOnlyShardPreviewTypeModuleCatalogEntry[];
}

export const TYPE_MODULE_CATALOG_ENTRY_GROUPS: ControlledReadOnlyShardPreviewTypeModuleCatalogEntryGroup[] = [
  { id: "foundation-and-live-window", entries: TYPE_MODULE_CATALOG_FOUNDATION_ENTRIES },
  { id: "operator-evidence-supply", entries: TYPE_MODULE_CATALOG_OPERATOR_EVIDENCE_ENTRIES },
  { id: "signed-approval-capture-draft", entries: TYPE_MODULE_CATALOG_CAPTURE_DRAFT_ENTRIES },
  { id: "signed-approval-text-package-preflight", entries: TYPE_MODULE_CATALOG_TEXT_PACKAGE_PREFLIGHT_ENTRIES },
  { id: "signed-approval-text-package-evidence", entries: TYPE_MODULE_CATALOG_TEXT_PACKAGE_EVIDENCE_ENTRIES },
  { id: "candidate-document-and-profile", entries: TYPE_MODULE_CATALOG_PROFILE_ENTRIES },
];

export const TYPE_MODULE_CATALOG_ENTRIES: ControlledReadOnlyShardPreviewTypeModuleCatalogEntry[] =
  TYPE_MODULE_CATALOG_ENTRY_GROUPS.flatMap((group) => group.entries);
