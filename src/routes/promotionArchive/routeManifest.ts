import {
  renderOpsPromotionArchiveAttestationMarkdown,
  renderOpsPromotionArchiveAttestationVerificationMarkdown,
  renderOpsPromotionArchiveManifestMarkdown,
  renderOpsPromotionArchiveMarkdown,
  renderOpsPromotionArchiveVerificationMarkdown,
  renderOpsPromotionDeploymentApprovalMarkdown,
  renderOpsPromotionDeploymentApprovalVerificationMarkdown,
  renderOpsPromotionDeploymentChangeRecordMarkdown,
  renderOpsPromotionDeploymentChangeRecordVerificationMarkdown,
  renderOpsPromotionDeploymentExecutionReceiptMarkdown,
  renderOpsPromotionDeploymentExecutionReceiptVerificationMarkdown,
  renderOpsPromotionDeploymentExecutionRecordMarkdown,
  renderOpsPromotionDeploymentExecutionRecordVerificationMarkdown,
  renderOpsPromotionHandoffCertificateMarkdown,
  renderOpsPromotionHandoffCertificateVerificationMarkdown,
  renderOpsPromotionHandoffClosureMarkdown,
  renderOpsPromotionHandoffClosureVerificationMarkdown,
  renderOpsPromotionHandoffCompletionMarkdown,
  renderOpsPromotionHandoffCompletionVerificationMarkdown,
  renderOpsPromotionHandoffPackageMarkdown,
  renderOpsPromotionHandoffPackageVerificationMarkdown,
  renderOpsPromotionHandoffReceiptMarkdown,
  renderOpsPromotionHandoffReceiptVerificationMarkdown,
  renderOpsPromotionReleaseArchiveMarkdown,
  renderOpsPromotionReleaseArchiveVerificationMarkdown,
  renderOpsPromotionReleaseAuditTrailRecordMarkdown,
  renderOpsPromotionReleaseEvidenceMarkdown,
  renderOpsPromotionReleaseEvidenceVerificationMarkdown,
} from "../../services/opsPromotionArchiveBundle.js";
import {
  PROMOTION_ARCHIVE_ARTIFACT_COUNT,
  PROMOTION_ARCHIVE_ARTIFACT_KEYS,
  type PromotionArchiveArtifacts,
} from "./artifacts.js";

type PromotionArtifactKey = keyof PromotionArchiveArtifacts;

export interface PromotionArchiveRoute {
  readonly method: "GET";
  readonly path: string;
  readonly artifactKey: PromotionArtifactKey;
  readonly select: (artifacts: PromotionArchiveArtifacts) => unknown;
  readonly renderMarkdown: (artifacts: PromotionArchiveArtifacts) => string;
}

const ROUTE_DEFINITIONS = [
  definePromotionRoute(
    "/api/v1/ops/promotion-archive",
    "bundle",
    renderOpsPromotionArchiveMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/manifest",
    "manifest",
    renderOpsPromotionArchiveManifestMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/verification",
    "archiveVerification",
    renderOpsPromotionArchiveVerificationMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/attestation",
    "attestation",
    renderOpsPromotionArchiveAttestationMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/attestation/verification",
    "attestationVerification",
    renderOpsPromotionArchiveAttestationVerificationMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/handoff-package",
    "handoffPackage",
    renderOpsPromotionHandoffPackageMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/handoff-package/verification",
    "handoffPackageVerification",
    renderOpsPromotionHandoffPackageVerificationMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/handoff-certificate",
    "certificate",
    renderOpsPromotionHandoffCertificateMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/handoff-certificate/verification",
    "certificateVerification",
    renderOpsPromotionHandoffCertificateVerificationMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/handoff-receipt",
    "receipt",
    renderOpsPromotionHandoffReceiptMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/handoff-receipt/verification",
    "receiptVerification",
    renderOpsPromotionHandoffReceiptVerificationMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/handoff-closure",
    "closure",
    renderOpsPromotionHandoffClosureMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/handoff-closure/verification",
    "closureVerification",
    renderOpsPromotionHandoffClosureVerificationMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/handoff-completion",
    "completion",
    renderOpsPromotionHandoffCompletionMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/handoff-completion/verification",
    "completionVerification",
    renderOpsPromotionHandoffCompletionVerificationMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/release-evidence",
    "releaseEvidence",
    renderOpsPromotionReleaseEvidenceMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/release-evidence/verification",
    "releaseEvidenceVerification",
    renderOpsPromotionReleaseEvidenceVerificationMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/release-archive",
    "releaseArchive",
    renderOpsPromotionReleaseArchiveMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/release-archive/verification",
    "releaseArchiveVerification",
    renderOpsPromotionReleaseArchiveVerificationMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/deployment-approval",
    "deploymentApproval",
    renderOpsPromotionDeploymentApprovalMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/deployment-approval/verification",
    "deploymentApprovalVerification",
    renderOpsPromotionDeploymentApprovalVerificationMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/deployment-change-record",
    "deploymentChangeRecord",
    renderOpsPromotionDeploymentChangeRecordMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/deployment-change-record/verification",
    "deploymentChangeRecordVerification",
    renderOpsPromotionDeploymentChangeRecordVerificationMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/deployment-execution-record",
    "deploymentExecutionRecord",
    renderOpsPromotionDeploymentExecutionRecordMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/deployment-execution-record/verification",
    "deploymentExecutionRecordVerification",
    renderOpsPromotionDeploymentExecutionRecordVerificationMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/deployment-execution-receipt",
    "deploymentExecutionReceipt",
    renderOpsPromotionDeploymentExecutionReceiptMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/deployment-execution-receipt/verification",
    "deploymentExecutionReceiptVerification",
    renderOpsPromotionDeploymentExecutionReceiptVerificationMarkdown,
  ),
  definePromotionRoute(
    "/api/v1/ops/promotion-archive/release-audit-trail-record",
    "releaseAuditTrailRecord",
    renderOpsPromotionReleaseAuditTrailRecordMarkdown,
  ),
] as const;

type RoutedArtifactKey = (typeof ROUTE_DEFINITIONS)[number]["artifactKey"];
type UnroutedArtifactKey = Exclude<PromotionArtifactKey, RoutedArtifactKey>;

const allArtifactKeysRouted: [UnroutedArtifactKey] extends [never] ? true : never = true;

export const PROMOTION_ARCHIVE_ROUTES = validatePromotionRoutes(
  allArtifactKeysRouted ? ROUTE_DEFINITIONS : [],
);

function definePromotionRoute<K extends PromotionArtifactKey>(
  path: string,
  artifactKey: K,
  renderer: (artifact: PromotionArchiveArtifacts[K]) => string,
): PromotionArchiveRoute & { readonly artifactKey: K } {
  return Object.freeze({
    method: "GET" as const,
    path,
    artifactKey,
    select: (artifacts: PromotionArchiveArtifacts) => artifacts[artifactKey],
    renderMarkdown: (artifacts: PromotionArchiveArtifacts) => renderer(artifacts[artifactKey]),
  });
}

export function validatePromotionRoutes(
  routes: readonly PromotionArchiveRoute[],
): readonly PromotionArchiveRoute[] {
  if (routes.length !== PROMOTION_ARCHIVE_ARTIFACT_COUNT) {
    throw new Error(`Promotion archive manifest must contain exactly ${PROMOTION_ARCHIVE_ARTIFACT_COUNT} routes`);
  }

  const expectedKeys = new Set<string>(PROMOTION_ARCHIVE_ARTIFACT_KEYS);
  const seenKeys = new Set<string>();
  const seenRoutes = new Set<string>();

  for (const route of routes) {
    if (route.method !== "GET") {
      throw new Error(`Unsupported promotion archive route method: ${String(route.method)}`);
    }

    const routeId = `${route.method} ${route.path}`;
    if (seenRoutes.has(routeId)) {
      throw new Error(`Duplicate promotion archive route: ${routeId}`);
    }
    seenRoutes.add(routeId);

    if (!expectedKeys.has(route.artifactKey)) {
      throw new Error(`Unknown promotion archive artifact key: ${route.artifactKey}`);
    }
    if (seenKeys.has(route.artifactKey)) {
      throw new Error(`Duplicate promotion archive artifact key: ${route.artifactKey}`);
    }
    seenKeys.add(route.artifactKey);
  }

  return Object.freeze(routes.map((route) => Object.freeze({ ...route })));
}
