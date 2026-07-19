import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { HEALTH_LIMITS, scanMaintainability } from "./maintainability-scan.mjs";

const DEFAULT_BASELINE = "docs/plans3/maintainability-baseline.json";
const args = process.argv.slice(2);
const jsonOutput = args.includes("--json");
const refresh = args.includes("--refresh-baseline");
const projectRoot = path.resolve(readOption("--project-root") ?? process.cwd());
const baselinePath = path.resolve(
  projectRoot,
  readOption("--baseline") ?? DEFAULT_BASELINE,
);

const scan = await scanMaintainability(projectRoot);
if (refresh) {
  if (scan.scanErrors.length > 0) {
    for (const error of scan.scanErrors) console.error(`- scan: ${error}`);
    process.exit(1);
  }
  const snapshot = createBaseline(scan);
  await mkdir(path.dirname(baselinePath), { recursive: true });
  await writeFile(baselinePath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
  console.log(`Maintainability baseline refreshed: ${normalizePath(path.relative(projectRoot, baselinePath))}`);
  process.exit(0);
}

const baselineErrors = [];
const baseline = await readBaseline(baselinePath, baselineErrors);
const violations = {
  baselineErrors,
  scanErrors: scan.scanErrors,
  nearLimitFiles: compareMetric(
    scan.nearLimitFiles,
    baseline.nearLimitFiles,
    "maxLines",
    "lines",
  ),
  longFunctions: compareMetric(
    scan.longFunctions,
    baseline.longFunctions,
    "maxLines",
    "lines",
  ),
  complexFunctions: compareMetric(
    scan.complexFunctions,
    baseline.complexFunctions,
    "maxComplexity",
    "complexity",
  ),
  importCycles: compareKeys(scan.importCycles, baseline.importCycles),
};
const ready = baselineErrors.length === 0
  && scan.scanErrors.length === 0
  && Object.values(violations)
    .filter((value) => !Array.isArray(value))
    .every((value) => Object.values(value).every((items) => items.length === 0));

const report = {
  schemaVersion: 1,
  projectRoot: normalizePath(projectRoot),
  baseline: normalizePath(path.relative(projectRoot, baselinePath)),
  limits: HEALTH_LIMITS,
  measurement: {
    fileLines: "physical-lines",
    functionLines: "physical-source-span",
    complexity: "branch-score",
    importCycles: "static-runtime-relative-import-scc",
  },
  counts: {
    sourceFiles: scan.sourceFiles.length,
    functions: scan.functions.length,
    nearLimitFiles: scan.nearLimitFiles.length,
    longFunctions: scan.longFunctions.length,
    complexFunctions: scan.complexFunctions.length,
    importCycles: scan.importCycles.length,
  },
  nearLimitFiles: scan.nearLimitFiles,
  longFunctions: scan.longFunctions,
  complexFunctions: scan.complexFunctions,
  importCycles: scan.importCycles,
  violations,
  ready,
};

if (jsonOutput) console.log(JSON.stringify(report, null, 2));
else renderText(report);
if (!ready) process.exitCode = 1;

function createBaseline(current) {
  return {
    schemaVersion: 1,
    limits: HEALTH_LIMITS,
    nearLimitFiles: current.nearLimitFiles.map((item) => ({
      key: item.key,
      maxLines: item.lines,
    })),
    longFunctions: current.longFunctions.map((item) => ({
      key: item.key,
      maxLines: item.lines,
    })),
    complexFunctions: current.complexFunctions.map((item) => ({
      key: item.key,
      maxComplexity: item.complexity,
    })),
    importCycles: current.importCycles.map((item) => ({ key: item.key })),
  };
}

async function readBaseline(file, errors) {
  if (!existsSync(file)) {
    errors.push(`missing baseline: ${normalizePath(file)}`);
    return emptyBaseline();
  }
  try {
    const parsed = JSON.parse(await readFile(file, "utf8"));
    validateBaseline(parsed, errors);
    return {
      nearLimitFiles: arrayValue(parsed.nearLimitFiles),
      longFunctions: arrayValue(parsed.longFunctions),
      complexFunctions: arrayValue(parsed.complexFunctions),
      importCycles: arrayValue(parsed.importCycles),
    };
  } catch (error) {
    errors.push(`invalid JSON: ${error instanceof Error ? error.message : String(error)}`);
    return emptyBaseline();
  }
}

function validateBaseline(value, errors) {
  if (!value || typeof value !== "object") {
    errors.push("baseline must be an object");
    return;
  }
  if (value.schemaVersion !== 1) errors.push("schemaVersion must equal 1");
  for (const [name, expected] of Object.entries(HEALTH_LIMITS)) {
    if (value.limits?.[name] !== expected) errors.push(`limits.${name} must equal ${expected}`);
  }
  validateEntries(value.nearLimitFiles, "nearLimitFiles", "maxLines", errors);
  validateEntries(value.longFunctions, "longFunctions", "maxLines", errors);
  validateEntries(value.complexFunctions, "complexFunctions", "maxComplexity", errors);
  validateEntries(value.importCycles, "importCycles", null, errors);
}

function validateEntries(entries, name, metric, errors) {
  if (!Array.isArray(entries)) {
    errors.push(`${name} must be an array`);
    return;
  }
  const keys = new Set();
  for (const entry of entries) {
    if (!entry || typeof entry.key !== "string" || entry.key.length === 0) {
      errors.push(`${name} entries require a non-empty key`);
      continue;
    }
    if (keys.has(entry.key)) errors.push(`${name} contains duplicate key ${entry.key}`);
    keys.add(entry.key);
    if (metric && (!Number.isInteger(entry[metric]) || entry[metric] < 1)) {
      errors.push(`${name}.${entry.key}.${metric} must be a positive integer`);
    }
  }
}

function compareMetric(current, baseline, ceilingName, metricName) {
  const currentByKey = new Map(current.map((item) => [item.key, item]));
  const baselineByKey = new Map(baseline.map((item) => [item.key, item]));
  const unknown = current.filter((item) => !baselineByKey.has(item.key));
  const grown = current.flatMap((item) => {
    const recorded = baselineByKey.get(item.key);
    if (!recorded || item[metricName] <= recorded[ceilingName]) return [];
    return [{
      key: item.key,
      baseline: recorded[ceilingName],
      current: item[metricName],
    }];
  });
  const stale = baseline.filter((item) => !currentByKey.has(item.key));
  return { unknown, grown, stale };
}

function compareKeys(current, baseline) {
  const currentKeys = new Set(current.map((item) => item.key));
  const baselineKeys = new Set(baseline.map((item) => item.key));
  return {
    unknown: current.filter((item) => !baselineKeys.has(item.key)),
    grown: [],
    stale: baseline.filter((item) => !currentKeys.has(item.key)),
  };
}

function renderText(value) {
  console.log(
    `Maintainability census: ${value.counts.nearLimitFiles} near-limit files, `
    + `${value.counts.longFunctions} long functions, `
    + `${value.counts.complexFunctions} complex functions, `
    + `${value.counts.importCycles} import cycles.`,
  );
  for (const item of value.nearLimitFiles.slice(0, 10)) {
    console.log(`- file: ${item.file} (${item.lines} lines)`);
  }
  for (const item of value.complexFunctions.slice(0, 5)) {
    console.log(`- complexity: ${item.key} (${item.complexity})`);
  }
  console.log(`Ready: ${value.ready}.`);
  if (!value.ready) {
    for (const error of value.violations.baselineErrors) console.error(`- baseline: ${error}`);
    for (const error of value.violations.scanErrors) console.error(`- scan: ${error}`);
    for (const [name, section] of Object.entries(value.violations)) {
      if (Array.isArray(section)) continue;
      for (const item of section.unknown) console.error(`- ${name} unknown: ${item.key}`);
      for (const item of section.grown) console.error(`- ${name} grew: ${item.key}`);
      for (const item of section.stale) console.error(`- ${name} stale: ${item.key}`);
    }
  }
}

function emptyBaseline() {
  return {
    nearLimitFiles: [],
    longFunctions: [],
    complexFunctions: [],
    importCycles: [],
  };
}

function arrayValue(value) {
  return Array.isArray(value) ? value : [];
}

function readOption(name) {
  const prefix = `${name}=`;
  return args.find((argument) => argument.startsWith(prefix))?.slice(prefix.length);
}

function normalizePath(value) {
  return value.replaceAll("\\", "/");
}
