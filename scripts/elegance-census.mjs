import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import ts from "typescript";

const DEFAULT_BASELINE = "docs/plans/elegance-baseline.json";
const MAX_NAME_LENGTH = 40;
const FAMILY_THRESHOLD = 3;

export async function buildEleganceCensus(input = {}) {
  const projectRoot = path.resolve(input.projectRoot ?? process.cwd());
  const baselinePath = path.resolve(
    projectRoot,
    input.baselinePath ?? DEFAULT_BASELINE,
  );
  const scan = await scanElegance(projectRoot);
  const baselineErrors = [];
  const baseline = await readBaseline(baselinePath, baselineErrors);
  const currentNameDebt = createNameDebt(scan.nameViolations);
  const familyByName = new Map(scan.familyCounts.map((item) => [item.family, item]));
  const debtFamilies = scan.familyCounts.filter((item) => item.fileCount >= FAMILY_THRESHOLD);

  const ratchet = {
    scanErrors: scan.scanErrors,
    grownNameDebt: [],
    shrunkNameDebt: [],
    changedNameDebt: [],
    newFamilies: debtFamilies
      .filter((item) => baseline.structuralFamilies[item.family] === undefined)
      .map(toFamilyEntry),
    grownFamilies: [],
    shrunkFamilies: [],
    staleFamilies: [],
  };
  const nameChange = {
    baselineCount: baseline.nameDebt.count,
    currentCount: currentNameDebt.count,
    baselineDigest: baseline.nameDebt.keyDigest,
    currentDigest: currentNameDebt.keyDigest,
  };
  if (currentNameDebt.count > baseline.nameDebt.count) ratchet.grownNameDebt.push(nameChange);
  else if (currentNameDebt.count < baseline.nameDebt.count) ratchet.shrunkNameDebt.push(nameChange);
  else if (currentNameDebt.keyDigest !== baseline.nameDebt.keyDigest) {
    ratchet.changedNameDebt.push(nameChange);
  }
  for (const [family, maxFiles] of Object.entries(baseline.structuralFamilies)) {
    const current = familyByName.get(family)?.fileCount ?? 0;
    const entry = { family, baselineFiles: maxFiles, currentFiles: current };
    if (current > maxFiles) ratchet.grownFamilies.push(entry);
    else if (current >= FAMILY_THRESHOLD && current < maxFiles) ratchet.shrunkFamilies.push(entry);
    else if (current < FAMILY_THRESHOLD) ratchet.staleFamilies.push(entry);
  }

  const ready = baselineErrors.length === 0
    && Object.values(ratchet).every((items) => items.length === 0);
  return {
    schemaVersion: 1,
    projectRoot: normalizePath(projectRoot),
    sourceRoot: "src",
    baseline: normalizePath(path.relative(projectRoot, baselinePath)),
    maxNameLength: MAX_NAME_LENGTH,
    familyThreshold: FAMILY_THRESHOLD,
    sourceFileCount: scan.sourceFiles.length,
    fileNameViolationCount: scan.nameViolations.filter((item) => item.kind === "file").length,
    exportViolationCount: scan.nameViolations.filter((item) => item.kind === "export").length,
    nameViolationCount: scan.nameViolations.length,
    baselineNameCount: baseline.nameDebt.count,
    nameDebtDigest: currentNameDebt.keyDigest,
    trackedFamilyCount: Object.keys(baseline.structuralFamilies).length,
    topNameViolations: scan.nameViolations.slice(0, 50),
    nameViolationsByFile: groupNameViolations(scan.nameViolations),
    familyCounts: scan.familyCounts.map(toFamilyCount),
    ratchet: { baselineErrors, ...ratchet },
    ready,
  };
}

export async function refreshEleganceBaseline(input = {}) {
  const projectRoot = path.resolve(input.projectRoot ?? process.cwd());
  const baselinePath = path.resolve(
    projectRoot,
    input.baselinePath ?? DEFAULT_BASELINE,
  );
  const scan = await scanElegance(projectRoot);
  if (scan.scanErrors.length > 0) {
    throw new Error(`Cannot refresh baseline: ${scan.scanErrors.join("; ")}`);
  }
  const snapshot = createBaseline(scan);
  await writeFile(baselinePath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
  return snapshot;
}

async function scanElegance(projectRoot) {
  const sourceRoot = path.join(projectRoot, "src");
  const files = await listTypeScriptFiles(sourceRoot);
  const nameByKey = new Map();
  const familyFiles = new Map();
  const scanErrors = [];

  for (const absolutePath of files) {
    const file = normalizePath(path.relative(projectRoot, absolutePath));
    const stem = path.basename(absolutePath, ".ts");
    addFamilyFile(familyFiles, structuralFamily(file, stem), file);
    addNameViolation(nameByKey, { kind: "file", file, name: stem });

    const source = await readFile(absolutePath, "utf8");
    const sourceFile = ts.createSourceFile(
      file,
      source,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );
    for (const diagnostic of sourceFile.parseDiagnostics ?? []) {
      scanErrors.push(`${file}:${diagnostic.start ?? 0}: ${diagnostic.messageText}`);
    }
    for (const item of collectExportNames(sourceFile)) {
      addNameViolation(nameByKey, { kind: "export", file, ...item });
    }
  }

  return {
    sourceFiles: files,
    scanErrors,
    nameViolations: [...nameByKey.values()].sort(compareNames),
    familyCounts: [...familyFiles.entries()]
      .map(([family, familyFileSet]) => ({
        family,
        fileCount: familyFileSet.size,
        files: [...familyFileSet].sort(),
      }))
      .sort((left, right) => right.fileCount - left.fileCount
        || left.family.localeCompare(right.family)),
  };
}

function collectExportNames(sourceFile) {
  const exports = new Map();
  for (const statement of sourceFile.statements) {
    if (ts.isExportDeclaration(statement) && statement.exportClause) {
      const elements = ts.isNamedExports(statement.exportClause)
        ? statement.exportClause.elements
        : [statement.exportClause];
      for (const element of elements) {
        exports.set(element.name.text, { name: element.name.text, declarationKind: "re-export" });
      }
      continue;
    }
    if (!hasExportModifier(statement)) continue;
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        for (const name of bindingNames(declaration.name)) {
          exports.set(name, { name, declarationKind: "variable" });
        }
      }
      continue;
    }
    if ("name" in statement && statement.name && ts.isIdentifier(statement.name)) {
      const name = statement.name.text;
      exports.set(name, { name, declarationKind: syntaxKind(statement) });
    }
  }
  return [...exports.values()];
}

function bindingNames(binding) {
  if (ts.isIdentifier(binding)) return [binding.text];
  return binding.elements.flatMap((element) => (
    ts.isOmittedExpression(element) ? [] : bindingNames(element.name)
  ));
}

function hasExportModifier(node) {
  return (ts.canHaveModifiers(node) ? ts.getModifiers(node) : undefined)
    ?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword) ?? false;
}

function syntaxKind(node) {
  if (ts.isFunctionDeclaration(node)) return "function";
  if (ts.isClassDeclaration(node)) return "class";
  if (ts.isInterfaceDeclaration(node)) return "interface";
  if (ts.isTypeAliasDeclaration(node)) return "type";
  if (ts.isEnumDeclaration(node)) return "enum";
  if (ts.isModuleDeclaration(node)) return "module";
  return "declaration";
}

function addNameViolation(records, input) {
  const length = [...input.name].length;
  if (length <= MAX_NAME_LENGTH) return;
  const key = input.kind === "file"
    ? `file|${input.file}`
    : `export|${input.file}|${input.name}`;
  records.set(key, { ...input, length, key });
}

export function structuralFamily(file, stem) {
  const words = stem.match(/[A-Z]+(?=[A-Z][a-z]|$)|[A-Z]?[a-z]+|\d+/g) ?? [stem];
  const role = [...words].reverse().find((word) => !/^\d+$/.test(word)) ?? stem;
  return `${normalizePath(path.dirname(file))}:${role.toLowerCase()}`;
}

function addFamilyFile(families, family, file) {
  const files = families.get(family) ?? new Set();
  files.add(file);
  families.set(family, files);
}

function createBaseline(scan) {
  return {
    schemaVersion: 1,
    maxNameLength: MAX_NAME_LENGTH,
    familyThreshold: FAMILY_THRESHOLD,
    nameDebt: createNameDebt(scan.nameViolations),
    structuralFamilies: Object.fromEntries(scan.familyCounts
      .filter((item) => item.fileCount >= FAMILY_THRESHOLD)
      .sort((left, right) => left.family.localeCompare(right.family))
      .map((item) => [item.family, item.fileCount])),
  };
}

async function readBaseline(baselinePath, errors) {
  if (!existsSync(baselinePath)) {
    errors.push(`missing baseline: ${normalizePath(baselinePath)}`);
    return emptyBaseline();
  }
  try {
    const parsed = JSON.parse(await readFile(baselinePath, "utf8"));
    validateBaseline(parsed, errors);
    return {
      nameDebt: isRecord(parsed.nameDebt) ? parsed.nameDebt : emptyNameDebt(),
      structuralFamilies: isRecord(parsed.structuralFamilies) ? parsed.structuralFamilies : {},
    };
  } catch (error) {
    errors.push(`invalid JSON: ${error instanceof Error ? error.message : String(error)}`);
    return emptyBaseline();
  }
}

function validateBaseline(baseline, errors) {
  if (!isRecord(baseline)) {
    errors.push("baseline must be an object");
    return;
  }
  if (baseline.schemaVersion !== 1) errors.push("schemaVersion must equal 1");
  if (baseline.maxNameLength !== MAX_NAME_LENGTH) errors.push("maxNameLength must equal 40");
  if (baseline.familyThreshold !== FAMILY_THRESHOLD) errors.push("familyThreshold must equal 3");
  if (!isRecord(baseline.nameDebt)) {
    errors.push("nameDebt must be an object");
  } else {
    const debt = baseline.nameDebt;
    if (!Number.isInteger(debt.count) || debt.count < 0) errors.push("nameDebt.count must be non-negative");
    if (!Number.isInteger(debt.fileCount) || debt.fileCount < 0) errors.push("nameDebt.fileCount must be non-negative");
    if (!Number.isInteger(debt.exportCount) || debt.exportCount < 0) errors.push("nameDebt.exportCount must be non-negative");
    if (debt.fileCount + debt.exportCount !== debt.count) errors.push("nameDebt counts must add up");
    if (typeof debt.keyDigest !== "string" || !/^sha256:[0-9a-f]{64}$/.test(debt.keyDigest)) {
      errors.push("nameDebt.keyDigest must be a sha256 digest");
    }
  }
  if (!isRecord(baseline.structuralFamilies)) {
    errors.push("structuralFamilies must be an object");
  } else {
    for (const [family, count] of Object.entries(baseline.structuralFamilies)) {
      if (!family.startsWith("src/") || !Number.isInteger(count) || count < FAMILY_THRESHOLD) {
        errors.push(`${family}: family count must be an integer >= 3`);
      }
    }
  }
}

export async function listTypeScriptFiles(root) {
  if (!existsSync(root)) return [];
  const files = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const absolutePath = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...await listTypeScriptFiles(absolutePath));
    else if (entry.isFile() && entry.name.endsWith(".ts")) files.push(absolutePath);
  }
  return files.sort();
}

function compareNames(left, right) {
  return right.length - left.length || left.key.localeCompare(right.key);
}

function toFamilyEntry(item) {
  return { family: item.family, currentFiles: item.fileCount };
}

function toFamilyCount(item) {
  return { family: item.family, fileCount: item.fileCount };
}

function groupNameViolations(violations) {
  const groups = new Map();
  for (const item of violations) {
    const group = groups.get(item.file) ?? { file: item.file, fileName: null, exports: [] };
    if (item.kind === "file") {
      group.fileName = { name: item.name, length: item.length };
    } else {
      group.exports.push({
        name: item.name,
        length: item.length,
        declarationKind: item.declarationKind,
      });
    }
    groups.set(item.file, group);
  }
  return [...groups.values()]
    .map((group) => ({
      ...group,
      exports: group.exports.sort((left, right) => right.length - left.length
        || left.name.localeCompare(right.name)),
    }))
    .sort((left, right) => left.file.localeCompare(right.file));
}

function emptyBaseline() {
  return { nameDebt: emptyNameDebt(), structuralFamilies: {} };
}

function emptyNameDebt() {
  return createNameDebt([]);
}

function createNameDebt(violations) {
  const keys = violations.map((item) => item.key ?? item).sort();
  return {
    count: keys.length,
    fileCount: violations.filter((item) => item.kind === "file").length,
    exportCount: violations.filter((item) => item.kind === "export").length,
    keyDigest: `sha256:${createHash("sha256").update(keys.join("\n")).digest("hex")}`,
  };
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function normalizePath(value) {
  return value.replaceAll("\\", "/");
}

function readOption(args, name) {
  const prefix = `${name}=`;
  return args.find((argument) => argument.startsWith(prefix))?.slice(prefix.length);
}

async function main() {
  const args = process.argv.slice(2);
  const projectRoot = path.resolve(readOption(args, "--project-root") ?? process.cwd());
  const baselinePath = path.resolve(
    projectRoot,
    readOption(args, "--baseline") ?? DEFAULT_BASELINE,
  );
  if (args.includes("--refresh-baseline")) {
    await refreshEleganceBaseline({ projectRoot, baselinePath });
  }
  const report = await buildEleganceCensus({ projectRoot, baselinePath });
  if (args.includes("--json")) {
    process.stdout.write(`${JSON.stringify(report)}\n`);
  } else {
    process.stdout.write([
      `Elegance census: ${report.nameViolationCount} over-budget names (${report.fileNameViolationCount} files, ${report.exportViolationCount} exports).`,
      `Structural families: ${report.familyCounts.length} total, ${report.trackedFamilyCount} tracked at threshold ${report.familyThreshold}.`,
      ...report.topNameViolations.slice(0, 10)
        .map((item) => `- ${item.kind}: ${item.name} (${item.length}) in ${item.file}`),
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
