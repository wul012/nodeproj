/* global console, process */

import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildEleganceCensus } from "./elegance-census.mjs";
import { buildFamilyLogicCensus } from "./family-logic-census.mjs";
import { scanMaintainability } from "./maintainability-scan.mjs";
import { buildRendererCensus } from "./renderer-census.mjs";

export const NINE_POINT_LIMITS = Object.freeze({
  sourceOverLimit: 0,
  importCycles: 0,
  nonWaivedRenderers: 0,
  nearLimitFiles: 70,
  longFunctions: 70,
  complexFunctions: 170,
  maxFunctionLines: 160,
  maxComplexity: 60,
  nameDebt: 4_200,
  renderersLogic: 700,
  verificationLogic: 1_000,
  trackedFamilies: 52,
});

const FAMILY_KEYS = Object.freeze({
  renderersLogic: "src/services:renderers",
  verificationLogic: "src/services:verification",
});

export async function buildNinePointCensus(projectRoot = process.cwd()) {
  const root = path.resolve(projectRoot);
  const [elegance, families, maintainability, renderers] = await Promise.all([
    buildEleganceCensus({ projectRoot: root }),
    buildFamilyLogicCensus({ projectRoot: root }),
    scanMaintainability(root),
    buildRendererCensus(),
  ]);

  return evaluateNinePoint({ elegance, families, maintainability, renderers });
}

export function evaluateNinePoint(input) {
  const familyScores = new Map(
    input.families.rankedFamilies.map((family) => [family.family, family.score]),
  );
  const coveredRenderers = input.renderers.standardizedRenderers
    + input.renderers.waivedUnstandardizedRenderers;
  const foundation = [
    check("eleganceRatchet", input.elegance.ready, true, "equal"),
    check("familyCensus", input.families.ready, true, "equal"),
    check("maintainabilityScan", input.maintainability.scanErrors.length, 0, "equal"),
    check("rendererCoverage", coveredRenderers, input.renderers.totalRenderers, "equal"),
  ];
  const metrics = {
    sourceOverLimit: input.maintainability.sourceFiles
      .filter((file) => file.lines > 800).length,
    importCycles: input.maintainability.importCycles.length,
    nonWaivedRenderers: input.renderers.nonWaivedUnstandardizedRenderers,
    nearLimitFiles: input.maintainability.nearLimitFiles.length,
    longFunctions: input.maintainability.longFunctions.length,
    complexFunctions: input.maintainability.complexFunctions.length,
    maxFunctionLines: maxOf(input.maintainability.functions, "lines"),
    maxComplexity: maxOf(input.maintainability.functions, "complexity"),
    nameDebt: input.elegance.nameViolationCount,
    renderersLogic: familyScores.get(FAMILY_KEYS.renderersLogic) ?? 0,
    verificationLogic: familyScores.get(FAMILY_KEYS.verificationLogic) ?? 0,
    trackedFamilies: input.elegance.trackedFamilyCount,
  };
  const thresholds = Object.entries(NINE_POINT_LIMITS).map(([key, limit]) => (
    check(key, metrics[key], limit, key === "sourceOverLimit"
      || key === "importCycles"
      || key === "nonWaivedRenderers" ? "equal" : "maximum")
  ));
  const checks = [...foundation, ...thresholds];

  return {
    schemaVersion: 1,
    definition: "all foundation and absolute threshold checks must pass; no averaging",
    metrics,
    limits: NINE_POINT_LIMITS,
    checks,
    failedChecks: checks.filter((item) => !item.pass).map((item) => item.key),
    ninePointReady: checks.every((item) => item.pass),
  };
}

function check(key, actual, limit, comparison) {
  const pass = comparison === "equal" ? actual === limit : actual <= limit;
  return { key, actual, comparison, limit, pass };
}

function maxOf(items, field) {
  return items.reduce((maximum, item) => Math.max(maximum, item[field] ?? 0), 0);
}

function renderText(report) {
  console.log(`Nine-point readiness: ${report.ninePointReady}.`);
  for (const item of report.checks) {
    const operator = item.comparison === "equal" ? "=" : "<=";
    console.log(`- ${item.pass ? "PASS" : "FAIL"} ${item.key}: ${item.actual} ${operator} ${item.limit}`);
  }
}

const direct = process.argv[1]
  && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) {
  const report = await buildNinePointCensus();
  if (process.argv.includes("--json")) console.log(JSON.stringify(report, null, 2));
  else renderText(report);
  if (!report.ninePointReady) process.exitCode = 1;
}
