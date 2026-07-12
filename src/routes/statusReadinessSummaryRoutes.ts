import type { FastifyInstance } from "fastify";

import {
  loadProductionReadinessSummaryIndex,
  renderProductionReadinessSummaryIndexMarkdown,
} from "../services/productionReadinessSummaryIndex.js";
import {
  loadProductionReadinessSummaryV2,
  renderProductionReadinessSummaryV2Markdown,
} from "../services/productionReadinessSummaryV2.js";
import {
  loadProductionReadinessSummaryV3,
  renderProductionReadinessSummaryV3Markdown,
} from "../services/productionReadinessSummaryV3.js";
import {
  loadProductionReadinessSummaryV4,
  renderProductionReadinessSummaryV4Markdown,
} from "../services/productionReadinessSummaryV4.js";
import {
  loadV5Case,
  renderV5Case,
} from "../services/productionReadinessCaseV5.js";
import {
  loadProductionReadinessSummaryV6,
  renderProductionReadinessSummaryV6Markdown,
} from "../services/productionReadinessSummaryV6.js";
import {
  loadProductionReadinessSummaryV7,
  renderProductionReadinessSummaryV7Markdown,
} from "../services/productionReadinessSummaryV7.js";
import {
  loadProductionReadinessSummaryV8,
  renderProductionReadinessSummaryV8Markdown,
} from "../services/productionReadinessSummaryV8.js";
import {
  loadProductionReadinessSummaryV9,
  renderProductionReadinessSummaryV9Markdown,
} from "../services/productionReadinessSummaryV9.js";
import {
  loadProductionReadinessSummaryV10,
  renderProductionReadinessSummaryV10Markdown,
} from "../services/productionReadinessSummaryV10.js";
import {
  loadProductionReadinessSummaryV11,
  renderProductionReadinessSummaryV11Markdown,
} from "../services/productionReadinessSummaryV11.js";
import {
  loadProductionReadinessSummaryV12,
  renderProductionReadinessSummaryV12Markdown,
} from "../services/productionReadinessSummaryV12.js";
import {
  loadProductionReadinessSummaryV13,
  renderProductionReadinessSummaryV13Markdown,
} from "../services/productionReadinessSummaryV13.js";
import {
  registerStatusJsonMarkdownRoutes,
  statusJsonMarkdownRoute,
} from "./statusJsonMarkdownRoute.js";
import type { StatusRouteDeps } from "./statusRouteTypes.js";

export function registerStatusReadinessSummaryRoutes(
  app: FastifyInstance,
  deps: StatusRouteDeps,
): void {
  registerStatusJsonMarkdownRoutes(app, [
    statusJsonMarkdownRoute(
      "/api/v1/production/readiness-summary",
      () => loadProductionReadinessSummaryIndex(deps.config),
      renderProductionReadinessSummaryIndexMarkdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/readiness-summary-v2",
      () => loadProductionReadinessSummaryV2(deps.config),
      renderProductionReadinessSummaryV2Markdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/readiness-summary-v3",
      () => loadProductionReadinessSummaryV3(deps.config),
      renderProductionReadinessSummaryV3Markdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/readiness-summary-v4",
      () => loadProductionReadinessSummaryV4(deps.config),
      renderProductionReadinessSummaryV4Markdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/readiness-summary-v5",
      () => loadV5Case({
        config: deps.config,
        auditLog: deps.auditLog,
        auditStoreRuntime: deps.auditStoreRuntime,
      }),
      renderV5Case,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/readiness-summary-v6",
      () => loadProductionReadinessSummaryV6({
        config: deps.config,
        auditLog: deps.auditLog,
        auditStoreRuntime: deps.auditStoreRuntime,
      }),
      renderProductionReadinessSummaryV6Markdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/readiness-summary-v7",
      () => loadProductionReadinessSummaryV7({
        config: deps.config,
        auditLog: deps.auditLog,
        auditStoreRuntime: deps.auditStoreRuntime,
      }),
      renderProductionReadinessSummaryV7Markdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/readiness-summary-v8",
      () => loadProductionReadinessSummaryV8({
        config: deps.config,
        auditLog: deps.auditLog,
        auditStoreRuntime: deps.auditStoreRuntime,
      }),
      renderProductionReadinessSummaryV8Markdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/readiness-summary-v9",
      () => loadProductionReadinessSummaryV9({
        config: deps.config,
        auditLog: deps.auditLog,
        auditStoreRuntime: deps.auditStoreRuntime,
      }),
      renderProductionReadinessSummaryV9Markdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/readiness-summary-v10",
      () => loadProductionReadinessSummaryV10({
        config: deps.config,
        auditLog: deps.auditLog,
        auditStoreRuntime: deps.auditStoreRuntime,
      }),
      renderProductionReadinessSummaryV10Markdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/readiness-summary-v11",
      () => loadProductionReadinessSummaryV11({
        config: deps.config,
        auditLog: deps.auditLog,
        auditStoreRuntime: deps.auditStoreRuntime,
      }),
      renderProductionReadinessSummaryV11Markdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/readiness-summary-v12",
      () => loadProductionReadinessSummaryV12({
        config: deps.config,
        auditLog: deps.auditLog,
        auditStoreRuntime: deps.auditStoreRuntime,
        productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
      }),
      renderProductionReadinessSummaryV12Markdown,
    ),
    statusJsonMarkdownRoute(
      "/api/v1/production/readiness-summary-v13",
      () => loadProductionReadinessSummaryV13({
        config: deps.config,
        auditLog: deps.auditLog,
        auditStoreRuntime: deps.auditStoreRuntime,
        productionConnectionDryRunApprovals: deps.productionConnectionDryRunApprovals,
        orderPlatform: deps.orderPlatform,
        miniKv: deps.miniKv,
      }),
      renderProductionReadinessSummaryV13Markdown,
    ),
  ]);
}
