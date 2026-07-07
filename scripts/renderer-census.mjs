import { readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

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

export async function buildRendererCensus() {
  const rendererFiles = (await readdir(servicesDirectory))
    .filter((fileName) => fileName.endsWith("Renderer.ts"))
    .sort();
  const records = await Promise.all(rendererFiles.map(async (fileName) => {
    const source = await readFile(join(servicesDirectory, fileName), "utf8");
    const markers = STANDARDIZATION_MARKERS.filter((marker) => source.includes(marker));

    return {
      file: fileName,
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
  const standardized = records.filter((record) => record.standardized);
  const unstandardized = records.filter((record) => !record.standardized);

  return {
    definition: {
      directory: "src/services",
      filePattern: "*Renderer.ts",
      standardizationMarkers: STANDARDIZATION_MARKERS,
      note: "Shape signals overlap and are planning hints; standardized/unstandardized counts are authoritative.",
    },
    totalRenderers: records.length,
    standardizedRenderers: standardized.length,
    unstandardizedRenderers: unstandardized.length,
    remainingShapeSignals: sumShapeSignals(unstandardized),
    unstandardizedFiles: unstandardized.map((record) => ({
      file: record.file,
      shapeSignals: record.shapeSignals,
    })),
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
  const rawValue = process.argv.find((argument) => argument.startsWith(prefix))?.slice(prefix.length);
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

  if (jsonOutput) {
    process.stdout.write(`${JSON.stringify(census, null, 2)}\n`);
  } else {
    process.stdout.write([
      `Renderer census: ${census.standardizedRenderers}/${census.totalRenderers} standardized, ${census.unstandardizedRenderers} unstandardized.`,
      `Remaining shape signals (overlapping): h3=${census.remainingShapeSignals.h3}, for=${census.remainingShapeSignals.forLoop}, map=${census.remainingShapeSignals.map}, flatMap=${census.remainingShapeSignals.flatMap}.`,
      ...census.unstandardizedFiles.map((record) => `- ${record.file}`),
      "",
    ].join("\n"));
  }

  if (maxUnstandardized !== undefined && census.unstandardizedRenderers > maxUnstandardized) {
    process.stderr.write(
      `Renderer census regression: ${census.unstandardizedRenderers} exceeds --max-unstandardized=${maxUnstandardized}.\n`,
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
