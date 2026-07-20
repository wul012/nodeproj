export const ROUTE_QUALITY_PATHS = Object.freeze({
  codeWalkthrough: "/api/v1/audit/code-walkthrough-documentation-quality-gate",
  fFolderExplanation: "/api/v1/audit/f-folder-explanation-quality-gate",
  explanationCloseout: "/api/v1/audit/explanation-readability-closeout-profile",
  routeHelper: "/api/v1/audit/managed-audit-route-helper-quality-pass",
  registrationTable: "/api/v1/audit/managed-audit-route-registration-table-quality-pass",
  readabilityMaintenance: "/api/v1/audit/managed-audit-readability-maintenance-profile",
} as const);

export const ROUTE_QUALITY_ROUTE_COUNT = Object.keys(ROUTE_QUALITY_PATHS).length;
export const CLEANUP_HANDOFF_ROUTE_COUNT = 30;
