import { readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import ts from "typescript";

const STANDARDIZATION_MARKERS = [
  "renderVerificationReportMarkdown",
  "renderReleaseReportHeader",
  "renderReleaseReportEntriesSection",
  "renderReleaseReportLineSection",
  "renderReleaseReportMessagesSection",
  "renderReleaseReportTail",
  "renderProfileEntrySections",
];

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = dirname(scriptDirectory);
const servicesDirectory = join(projectRoot, "src", "services");
const waiverManifestPath = join(
  projectRoot,
  "docs",
  "plans",
  "renderer-consolidation-waivers.json",
);
const waiverManifestRelativePath = "docs/plans/renderer-consolidation-waivers.json";

export async function buildRendererCensus() {
  const waiverManifest = await loadRendererWaiverManifest();
  const rendererFiles = await listRendererFiles(servicesDirectory);
  const sourceRecords = await Promise.all(rendererFiles.map(async (fileName) => {
    const source = await readFile(join(servicesDirectory, ...fileName.split("/")), "utf8");
    const markers = STANDARDIZATION_MARKERS.filter((marker) => source.includes(marker));

    return {
      file: fileName,
      source,
      standardized: markers.length > 0,
      markers,
      shapeSignals: {
        h3: countMatches(source, /### /g),
        forLoop: countMatches(source, /\bfor\s*\(/g),
        map: countMatches(source, /\.map\s*\(/g),
        flatMap: countMatches(source, /\.flatMap\s*\(/g),
      },
    };
  }));
  const standardized = sourceRecords.filter((record) => record.standardized);
  const unstandardized = sourceRecords.filter((record) => !record.standardized);
  const recordsByFile = new Map(sourceRecords.map((record) => [record.file, record]));
  const validatedWaivers = waiverManifest.waivers.map((waiver) => {
    const record = recordsByFile.get(waiver.file);
    if (!record) {
      throw new Error(`Renderer waiver points to a missing file: ${waiver.file}.`);
    }
    if (record.standardized) {
      throw new Error(
        `Renderer waiver is stale because ${waiver.file} is now standardized. Remove the waiver.`,
      );
    }

    const composition = inspectCompositionOnlyRenderer(record.source, waiver.file);
    if (!arraysEqual(composition.composedFunctions, waiver.composedFunctions)) {
      throw new Error([
        `Renderer waiver composition drift for ${waiver.file}.`,
        `Expected: ${waiver.composedFunctions.join(", ")}.`,
        `Actual: ${composition.composedFunctions.join(", ")}.`,
      ].join(" "));
    }

    return {
      ...waiver,
      validation: composition,
    };
  });
  const waivedFileNames = new Set(validatedWaivers.map((waiver) => waiver.file));
  const waivedUnstandardized = unstandardized.filter((record) => waivedFileNames.has(record.file));
  const nonWaivedUnstandardized = unstandardized.filter(
    (record) => !waivedFileNames.has(record.file),
  );

  return {
    definition: {
      directory: "src/services",
      filePattern: "**/*Renderer.ts",
      recursive: true,
      standardizationMarkers: STANDARDIZATION_MARKERS,
      note: "Shape signals overlap and are planning hints; standardized/unstandardized counts are authoritative.",
    },
    waiverPolicy: {
      manifest: waiverManifestRelativePath,
      schemaVersion: waiverManifest.schemaVersion,
      classification: "composition-only",
      rule: "A waiver is valid only when the file is an unstandardized exported function whose body returns only spread calls to the declared child renderers.",
    },
    totalRenderers: sourceRecords.length,
    discoveredFiles: sourceRecords.map((record) => record.file),
    standardizedRenderers: standardized.length,
    unstandardizedRenderers: unstandardized.length,
    waivedUnstandardizedRenderers: waivedUnstandardized.length,
    nonWaivedUnstandardizedRenderers: nonWaivedUnstandardized.length,
    remainingShapeSignals: sumShapeSignals(unstandardized),
    unstandardizedFiles: unstandardized.map(toRendererSummary),
    waivedFiles: validatedWaivers,
    nonWaivedUnstandardizedFiles: nonWaivedUnstandardized.map(toRendererSummary),
  };
}

async function listRendererFiles(directory, prefix = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const relativePath = prefix.length > 0 ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      files.push(...await listRendererFiles(join(directory, entry.name), relativePath));
    } else if (entry.isFile() && entry.name.endsWith("Renderer.ts")) {
      files.push(relativePath);
    }
  }
  return files;
}

export function inspectCompositionOnlyRenderer(source, fileName = "renderer.ts") {
  const sourceFile = ts.createSourceFile(
    fileName,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  if ((sourceFile.parseDiagnostics?.length ?? 0) > 0) {
    throw new Error(`Composition-only renderer ${fileName} contains TypeScript parse errors.`);
  }

  const executableStatements = sourceFile.statements.filter(
    (statement) => !ts.isImportDeclaration(statement),
  );
  if (executableStatements.length !== 1 || !ts.isFunctionDeclaration(executableStatements[0])) {
    throw new Error(
      `Composition-only renderer ${fileName} must contain imports and exactly one function declaration.`,
    );
  }

  const functionDeclaration = executableStatements[0];
  const isExported = functionDeclaration.modifiers?.some(
    (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
  ) ?? false;
  if (!isExported || !functionDeclaration.name || !functionDeclaration.body) {
    throw new Error(`Composition-only renderer ${fileName} must export one named function with a body.`);
  }
  if (
    functionDeclaration.parameters.length !== 1
    || !ts.isIdentifier(functionDeclaration.parameters[0].name)
  ) {
    throw new Error(`Composition-only renderer ${fileName} must accept one identifier parameter.`);
  }
  if (
    functionDeclaration.body.statements.length !== 1
    || !ts.isReturnStatement(functionDeclaration.body.statements[0])
    || !functionDeclaration.body.statements[0].expression
    || !ts.isArrayLiteralExpression(functionDeclaration.body.statements[0].expression)
  ) {
    throw new Error(
      `Composition-only renderer ${fileName} must contain only a returned array literal.`,
    );
  }

  const parameter = functionDeclaration.parameters[0].name.text;
  const composedFunctions = functionDeclaration.body.statements[0].expression.elements.map(
    (element) => {
      if (
        !ts.isSpreadElement(element)
        || !ts.isCallExpression(element.expression)
        || !ts.isIdentifier(element.expression.expression)
        || element.expression.arguments.length !== 1
        || !ts.isIdentifier(element.expression.arguments[0])
        || element.expression.arguments[0].text !== parameter
      ) {
        throw new Error(
          `Composition-only renderer ${fileName} may return only spread calls that forward ${parameter}.`,
        );
      }
      return element.expression.expression.text;
    },
  );
  if (composedFunctions.length === 0) {
    throw new Error(`Composition-only renderer ${fileName} must compose at least one child renderer.`);
  }

  return {
    exportedFunction: functionDeclaration.name.text,
    parameter,
    composedFunctions,
  };
}

async function loadRendererWaiverManifest() {
  const rawManifest = await readFile(waiverManifestPath, "utf8");
  let manifest;
  try {
    manifest = JSON.parse(rawManifest);
  } catch (error) {
    throw new Error(
      `Renderer waiver manifest is not valid JSON: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
  if (!manifest || typeof manifest !== "object" || manifest.schemaVersion !== 1) {
    throw new Error("Renderer waiver manifest schemaVersion must be 1.");
  }
  if (!Array.isArray(manifest.waivers)) {
    throw new Error("Renderer waiver manifest waivers must be an array.");
  }

  const seenFiles = new Set();
  const waivers = manifest.waivers.map((entry, index) => {
    const prefix = `Renderer waiver entry ${index}`;
    if (!entry || typeof entry !== "object") {
      throw new Error(`${prefix} must be an object.`);
    }
    const file = requireNonEmptyString(entry.file, `${prefix}.file`);
    if (!file.endsWith("Renderer.ts")) {
      throw new Error(`${prefix}.file must end with Renderer.ts.`);
    }
    if (seenFiles.has(file)) {
      throw new Error(`Renderer waiver manifest contains duplicate file ${file}.`);
    }
    seenFiles.add(file);
    if (entry.classification !== "composition-only") {
      throw new Error(`${prefix}.classification must be composition-only.`);
    }
    if (!Array.isArray(entry.composedFunctions) || entry.composedFunctions.length === 0) {
      throw new Error(`${prefix}.composedFunctions must be a non-empty array.`);
    }
    const composedFunctions = entry.composedFunctions.map((value, functionIndex) => (
      requireNonEmptyString(value, `${prefix}.composedFunctions[${functionIndex}]`)
    ));
    if (new Set(composedFunctions).size !== composedFunctions.length) {
      throw new Error(`${prefix}.composedFunctions must not contain duplicates.`);
    }

    return {
      file,
      classification: entry.classification,
      reason: requireNonEmptyString(entry.reason, `${prefix}.reason`),
      reviewerCheck: requireNonEmptyString(entry.reviewerCheck, `${prefix}.reviewerCheck`),
      composedFunctions,
    };
  });

  return {
    schemaVersion: manifest.schemaVersion,
    waivers,
  };
}

function requireNonEmptyString(value, field) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${field} must be a non-empty string.`);
  }
  return value;
}

function arraysEqual(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function toRendererSummary(record) {
  return {
    file: record.file,
    shapeSignals: record.shapeSignals,
  };
}

function countMatches(source, pattern) {
  return source.match(pattern)?.length ?? 0;
}

function sumShapeSignals(records) {
  return records.reduce((totals, record) => ({
    h3: totals.h3 + record.shapeSignals.h3,
    forLoop: totals.forLoop + record.shapeSignals.forLoop,
    map: totals.map + record.shapeSignals.map,
    flatMap: totals.flatMap + record.shapeSignals.flatMap,
  }), { h3: 0, forLoop: 0, map: 0, flatMap: 0 });
}

function parseMaximum(argumentName) {
  const prefix = `--${argumentName}=`;
  const rawValue = process.argv
    .filter((argument) => argument.startsWith(prefix))
    .at(-1)
    ?.slice(prefix.length);
  if (rawValue === undefined) {
    return undefined;
  }

  const value = Number.parseInt(rawValue, 10);
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`${prefix}<non-negative integer> is required.`);
  }
  return value;
}

async function main() {
  const census = await buildRendererCensus();
  const jsonOutput = process.argv.includes("--json");
  const maxUnstandardized = parseMaximum("max-unstandardized");
  const maxWaived = parseMaximum("max-waived");
  const maxNonWaived = parseMaximum("max-non-waived");

  if (jsonOutput) {
    process.stdout.write(`${JSON.stringify(census, null, 2)}\n`);
  } else {
    process.stdout.write([
      `Renderer census: ${census.standardizedRenderers}/${census.totalRenderers} standardized, ${census.unstandardizedRenderers} raw unstandardized.`,
      `Waiver census: ${census.waivedUnstandardizedRenderers} composition-only waived, ${census.nonWaivedUnstandardizedRenderers} non-waived unstandardized.`,
      `Remaining shape signals (overlapping): h3=${census.remainingShapeSignals.h3}, for=${census.remainingShapeSignals.forLoop}, map=${census.remainingShapeSignals.map}, flatMap=${census.remainingShapeSignals.flatMap}.`,
      ...census.waivedFiles.map((record) => `- waived: ${record.file}`),
      ...census.nonWaivedUnstandardizedFiles.map((record) => `- non-waived: ${record.file}`),
      "",
    ].join("\n"));
  }

  if (maxUnstandardized !== undefined && census.unstandardizedRenderers > maxUnstandardized) {
    process.stderr.write(
      `Renderer census regression: ${census.unstandardizedRenderers} exceeds --max-unstandardized=${maxUnstandardized}.\n`,
    );
    process.exitCode = 1;
  }
  if (maxWaived !== undefined && census.waivedUnstandardizedRenderers > maxWaived) {
    process.stderr.write(
      `Renderer waiver regression: ${census.waivedUnstandardizedRenderers} exceeds --max-waived=${maxWaived}.\n`,
    );
    process.exitCode = 1;
  }
  if (
    maxNonWaived !== undefined
    && census.nonWaivedUnstandardizedRenderers > maxNonWaived
  ) {
    process.stderr.write(
      `Renderer census regression: ${census.nonWaivedUnstandardizedRenderers} non-waived renderers exceed --max-non-waived=${maxNonWaived}.\n`,
    );
    process.exitCode = 1;
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  });
}
