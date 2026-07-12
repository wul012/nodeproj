import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import ts from "typescript";

import {
  listTypeScriptFiles,
  structuralFamily,
} from "./elegance-census.mjs";
import { buildRendererCensus } from "./renderer-census.mjs";

const DEFAULT_BASELINE = "docs/plans/elegance-baseline.json";
const RENDERER_FAMILY = "src/services:renderer";
const FORMAT_NAME = /render|format|markdown/i;
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.dirname(scriptDirectory);

export async function buildFamilyLogicCensus(input = {}) {
  const projectRoot = path.resolve(input.projectRoot ?? process.cwd());
  const baselinePath = path.resolve(
    projectRoot,
    input.baselinePath ?? DEFAULT_BASELINE,
  );
  const errors = [];
  const trackedFamilies = await readTrackedFamilies(baselinePath, errors);
  const records = new Map([...trackedFamilies].map((family) => [family, {
    family,
    memberCount: 0,
    formattingLogicLines: 0,
    members: [],
  }]));
  const sourceFiles = await listTypeScriptFiles(path.join(projectRoot, "src"));

  for (const absolutePath of sourceFiles) {
    const file = normalizePath(path.relative(projectRoot, absolutePath));
    const stem = path.basename(absolutePath, ".ts");
    const family = structuralFamily(file, stem);
    const record = records.get(family);
    if (!record) continue;

    const source = await readFile(absolutePath, "utf8");
    const logic = inspectFormattingLogic(source, file);
    errors.push(...logic.parseErrors);
    record.memberCount += 1;
    record.formattingLogicLines += logic.lineCount;
    record.members.push({ file, formattingLogicLines: logic.lineCount });
  }

  const rendererCensus = await resolveRendererCensus(input, projectRoot, trackedFamilies);
  const rendererAdjustment = applyRendererAdjustment(records, rendererCensus, errors);
  const rankedFamilies = [...records.values()]
    .map(toRankedFamily)
    .sort((left, right) => right.score - left.score
      || right.memberCount - left.memberCount
      || left.family.localeCompare(right.family));

  return {
    schemaVersion: 1,
    projectRoot: normalizePath(projectRoot),
    baseline: normalizePath(path.relative(projectRoot, baselinePath)),
    definition: {
      trackedFamilySource: "elegance-baseline.structuralFamilies",
      familyClassifier: "scripts/elegance-census.mjs#structuralFamily",
      formattingLineRule: [
        "unique non-comment code lines inside named render/format/markdown functions",
        "formatting calls and Markdown literals outside those functions",
      ],
      score: "memberCount * averageFormattingLines = total unique formattingLogicLines",
      rendererRule: "the renderer AST census overrides wrapper-body size when every renderer is standardized or valid composition-only",
    },
    sourceFileCount: sourceFiles.length,
    trackedFamilyCount: trackedFamilies.size,
    rendererAdjustment,
    rankedFamilies,
    errors,
    ready: errors.length === 0 && rankedFamilies.length === trackedFamilies.size,
  };
}

export function inspectFormattingLogic(source, file = "source.ts") {
  const sourceFile = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const lines = new Set();

  function visit(node, inFormattingFunction = false) {
    const ownsFormatting = isFunctionLike(node) && FORMAT_NAME.test(nodeName(node));
    const formattingScope = inFormattingFunction || ownsFormatting;
    if (ownsFormatting) {
      for (const line of codeLines(sourceFile, node.getStart(sourceFile), node.end)) {
        lines.add(line);
      }
    } else if (!formattingScope && ts.isCallExpression(node) && FORMAT_NAME.test(callName(node))) {
      lines.add(lineOf(sourceFile, node));
    } else if (!formattingScope && isMarkdownLiteral(node)) {
      lines.add(lineOf(sourceFile, node));
    }
    ts.forEachChild(node, (child) => visit(child, formattingScope));
  }

  visit(sourceFile);
  return {
    lineCount: lines.size,
    lines: [...lines].sort((left, right) => left - right),
    parseErrors: (sourceFile.parseDiagnostics ?? []).map((diagnostic) => (
      `${file}:${diagnostic.start ?? 0}: ${String(diagnostic.messageText)}`
    )),
  };
}

async function readTrackedFamilies(baselinePath, errors) {
  if (!existsSync(baselinePath)) {
    errors.push(`missing baseline: ${normalizePath(baselinePath)}`);
    return new Set();
  }
  try {
    const baseline = JSON.parse(await readFile(baselinePath, "utf8"));
    if (!isRecord(baseline.structuralFamilies)) {
      errors.push("baseline structuralFamilies must be an object");
      return new Set();
    }
    return new Set(Object.keys(baseline.structuralFamilies).sort());
  } catch (error) {
    errors.push(`invalid baseline: ${error instanceof Error ? error.message : String(error)}`);
    return new Set();
  }
}

async function resolveRendererCensus(input, projectRoot, trackedFamilies) {
  if (!trackedFamilies.has(RENDERER_FAMILY)) return null;
  if (input.rendererCensus !== undefined) return input.rendererCensus;
  if (projectRoot !== repositoryRoot) return null;
  return buildRendererCensus();
}

function applyRendererAdjustment(records, rendererCensus, errors) {
  const renderer = records.get(RENDERER_FAMILY);
  if (!renderer) return { applied: false, reason: "renderer family is not tracked" };
  if (!rendererCensus) {
    return { applied: false, reason: "renderer census unavailable for this project root" };
  }
  const covered = rendererCensus.standardizedRenderers
    + rendererCensus.waivedUnstandardizedRenderers;
  const valid = covered === rendererCensus.totalRenderers
    && rendererCensus.nonWaivedUnstandardizedRenderers === 0;
  if (!valid) {
    errors.push("renderer family still owns non-waived local formatting logic");
    return { applied: false, reason: "renderer census is not fully covered" };
  }

  renderer.formattingLogicLines = 0;
  renderer.members = renderer.members.map((member) => ({
    ...member,
    formattingLogicLines: 0,
  }));
  return {
    applied: true,
    family: RENDERER_FAMILY,
    totalRenderers: rendererCensus.totalRenderers,
    standardizedRenderers: rendererCensus.standardizedRenderers,
    compositionOnlyWaivers: rendererCensus.waivedUnstandardizedRenderers,
    nonWaivedRenderers: rendererCensus.nonWaivedUnstandardizedRenderers,
    reason: "standardized renderers express formatting as builder data; valid waivers only compose child renderers",
  };
}

function toRankedFamily(record) {
  const averageFormattingLines = record.memberCount === 0
    ? 0
    : Number((record.formattingLogicLines / record.memberCount).toFixed(2));
  return {
    family: record.family,
    memberCount: record.memberCount,
    formattingLogicLines: record.formattingLogicLines,
    averageFormattingLines,
    score: record.formattingLogicLines,
    topMembers: record.members
      .filter((member) => member.formattingLogicLines > 0)
      .sort((left, right) => right.formattingLogicLines - left.formattingLogicLines
        || left.file.localeCompare(right.file))
      .slice(0, 10),
  };
}

function isFunctionLike(node) {
  return ts.isFunctionDeclaration(node)
    || ts.isMethodDeclaration(node)
    || ts.isArrowFunction(node)
    || ts.isFunctionExpression(node);
}

function nodeName(node) {
  if (node.name && ts.isIdentifier(node.name)) return node.name.text;
  if (ts.isVariableDeclaration(node.parent) && ts.isIdentifier(node.parent.name)) {
    return node.parent.name.text;
  }
  if (
    ts.isPropertyAssignment(node.parent)
    && (ts.isIdentifier(node.parent.name) || ts.isStringLiteral(node.parent.name))
  ) {
    return node.parent.name.text;
  }
  return "";
}

function callName(node) {
  if (ts.isIdentifier(node.expression)) return node.expression.text;
  if (ts.isPropertyAccessExpression(node.expression)) return node.expression.name.text;
  return "";
}

function isMarkdownLiteral(node) {
  if (!ts.isStringLiteralLike(node) && !ts.isNoSubstitutionTemplateLiteral(node)) {
    return false;
  }
  return /(^|\n)\s*(#{1,6}\s|[-*]\s|\|)|\n/.test(node.text);
}

function codeLines(sourceFile, start, end) {
  const first = sourceFile.getLineAndCharacterOfPosition(start).line;
  const last = sourceFile.getLineAndCharacterOfPosition(end).line;
  const sourceLines = sourceFile.text.split(/\r?\n/);
  const lines = [];
  for (let index = first; index <= last; index += 1) {
    const value = sourceLines[index]?.trim() ?? "";
    if (
      value.length > 0
      && !value.startsWith("//")
      && !value.startsWith("/*")
      && value !== "*/"
      && !value.startsWith("*")
    ) {
      lines.push(index + 1);
    }
  }
  return lines;
}

function lineOf(sourceFile, node) {
  return sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function normalizePath(value) {
  return value.replaceAll("\\", "/");
}

function readOption(args, name) {
  const prefix = `${name}=`;
  return [...args].reverse().find((argument) => argument.startsWith(prefix))?.slice(prefix.length);
}

async function main() {
  const args = process.argv.slice(2);
  const report = await buildFamilyLogicCensus({
    projectRoot: readOption(args, "--project-root") ?? process.cwd(),
    baselinePath: readOption(args, "--baseline") ?? DEFAULT_BASELINE,
  });
  if (args.includes("--json")) {
    process.stdout.write(`${JSON.stringify(report)}\n`);
  } else {
    process.stdout.write([
      `Family logic census: ${report.rankedFamilies.length}/${report.trackedFamilyCount} tracked families ranked.`,
      ...report.rankedFamilies.slice(0, 10).map((family, index) => (
        `${index + 1}. ${family.family}: ${family.memberCount} members, ${family.formattingLogicLines} formatting lines, score ${family.score}`
      )),
      `Ready: ${report.ready}.`,
      "",
    ].join("\n"));
  }
  if (!report.ready) process.exitCode = 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  });
}
