import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const DEFAULT_BASELINE = "docs/plans/source-size-remediation-baseline.json";

const args = process.argv.slice(2);
const jsonOutput = args.includes("--json");
const projectRoot = path.resolve(readOption("--project-root") ?? process.cwd());
const baselinePath = path.resolve(projectRoot, readOption("--baseline") ?? DEFAULT_BASELINE);
const sourceRoot = path.join(projectRoot, "src");

const baselineErrors = [];
const baseline = readBaseline(baselinePath, baselineErrors);
const sourceFiles = listFiles(sourceRoot).map((absolutePath) => ({
  file: normalizePath(path.relative(projectRoot, absolutePath)),
  lines: countLogicalLines(readFileSync(absolutePath, "utf8")),
}));
const oversizedFiles = sourceFiles
  .filter((entry) => entry.lines > baseline.threshold)
  .sort((left, right) => right.lines - left.lines || left.file.localeCompare(right.file));
const remediationByFile = new Map(baseline.remediation.map((entry) => [entry.file, entry]));
const sourceByFile = new Map(sourceFiles.map((entry) => [entry.file, entry]));

const unknownOversizedFiles = oversizedFiles.filter((entry) => !remediationByFile.has(entry.file));
const grownRemediationFiles = baseline.remediation
  .map((entry) => ({ ...entry, currentLines: sourceByFile.get(entry.file)?.lines ?? null }))
  .filter((entry) => entry.currentLines !== null && entry.currentLines > entry.maxLines);
const staleRemediationEntries = baseline.remediation
  .map((entry) => ({ ...entry, currentLines: sourceByFile.get(entry.file)?.lines ?? null }))
  .filter((entry) => entry.currentLines === null || entry.currentLines <= baseline.threshold);
const oversizedCountExceeded = oversizedFiles.length > baseline.maxOversized;
const ready = baselineErrors.length === 0
  && unknownOversizedFiles.length === 0
  && grownRemediationFiles.length === 0
  && staleRemediationEntries.length === 0
  && !oversizedCountExceeded;

const report = {
  schemaVersion: 1,
  projectRoot: normalizePath(projectRoot),
  sourceRoot: normalizePath(path.relative(projectRoot, sourceRoot)),
  baseline: normalizePath(path.relative(projectRoot, baselinePath)),
  threshold: baseline.threshold,
  maxOversized: baseline.maxOversized,
  sourceFileCount: sourceFiles.length,
  oversizedFileCount: oversizedFiles.length,
  remediationEntryCount: baseline.remediation.length,
  oversizedFiles,
  violations: {
    baselineErrors,
    unknownOversizedFiles,
    grownRemediationFiles,
    staleRemediationEntries,
    oversizedCountExceeded,
  },
  ready,
};

if (jsonOutput) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(`Source size census: ${oversizedFiles.length} file(s) above ${baseline.threshold} lines.`);
  for (const entry of oversizedFiles) console.log(`- ${entry.file}: ${entry.lines}`);
  if (!ready) {
    console.error("Source size ratchet failed.");
    for (const error of baselineErrors) console.error(`- baseline: ${error}`);
    for (const entry of unknownOversizedFiles) console.error(`- untracked: ${entry.file} (${entry.lines})`);
    for (const entry of grownRemediationFiles) {
      console.error(`- grew: ${entry.file} (${entry.currentLines} > ${entry.maxLines})`);
    }
    for (const entry of staleRemediationEntries) {
      console.error(`- stale: ${entry.file} (${entry.currentLines ?? "missing"})`);
    }
    if (oversizedCountExceeded) {
      console.error(`- count: ${oversizedFiles.length} > ${baseline.maxOversized}`);
    }
  }
}

if (!ready) process.exitCode = 1;

function readOption(name) {
  const prefix = `${name}=`;
  return args.find((argument) => argument.startsWith(prefix))?.slice(prefix.length);
}

function readBaseline(file, errors) {
  if (!existsSync(file)) {
    errors.push(`missing baseline: ${normalizePath(file)}`);
    return { threshold: 800, maxOversized: 0, remediation: [] };
  }
  try {
    const parsed = JSON.parse(readFileSync(file, "utf8"));
    if (parsed.schemaVersion !== 1) errors.push("schemaVersion must equal 1");
    if (!Number.isInteger(parsed.threshold) || parsed.threshold < 1) errors.push("threshold must be a positive integer");
    if (!Number.isInteger(parsed.maxOversized) || parsed.maxOversized < 0) {
      errors.push("maxOversized must be a non-negative integer");
    }
    if (!Array.isArray(parsed.remediation)) errors.push("remediation must be an array");
    const remediation = Array.isArray(parsed.remediation) ? parsed.remediation : [];
    const seen = new Set();
    for (const entry of remediation) {
      if (typeof entry.file !== "string" || !entry.file.startsWith("src/")) {
        errors.push("every remediation file must be a src/ path");
      }
      if (!Number.isInteger(entry.maxLines) || entry.maxLines <= parsed.threshold) {
        errors.push(`${entry.file ?? "<unknown>"}: maxLines must exceed threshold`);
      }
      if (typeof entry.targetVersion !== "string" || typeof entry.reason !== "string") {
        errors.push(`${entry.file ?? "<unknown>"}: targetVersion and reason are required`);
      }
      if (seen.has(entry.file)) errors.push(`duplicate remediation file: ${entry.file}`);
      seen.add(entry.file);
    }
    if (parsed.maxOversized !== remediation.length) {
      errors.push(`maxOversized ${parsed.maxOversized} must equal remediation length ${remediation.length}`);
    }
    return {
      threshold: Number.isInteger(parsed.threshold) ? parsed.threshold : 800,
      maxOversized: Number.isInteger(parsed.maxOversized) ? parsed.maxOversized : 0,
      remediation,
    };
  } catch (error) {
    errors.push(`invalid JSON: ${error instanceof Error ? error.message : String(error)}`);
    return { threshold: 800, maxOversized: 0, remediation: [] };
  }
}

function listFiles(root) {
  if (!existsSync(root)) return [];
  const files = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const absolutePath = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...listFiles(absolutePath));
    else if (entry.isFile()) files.push(absolutePath);
  }
  return files;
}

function countLogicalLines(content) {
  if (content.length === 0) return 0;
  const lineCount = content.split(/\r\n|\n|\r/).length;
  return lineCount - (/\r\n$|\n$|\r$/.test(content) ? 1 : 0);
}

function normalizePath(value) {
  return value.replaceAll("\\", "/");
}
