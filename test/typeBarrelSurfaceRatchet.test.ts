import fs from "node:fs";
import path from "node:path";

import ts from "typescript";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();
const FACADE = path.resolve(
  ROOT,
  "src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypes.ts",
);
const PRIVATE_BARREL = path.resolve(
  ROOT,
  "src/services/managedAuditManualSandboxConnectionCredentialResolverControlledReadOnlyShardPreviewTypeExports.ts",
);

describe("controlled shard preview type barrel", () => {
  it("exposes only types consumed through the stable surface", () => {
    const census = createCensus();

    expect(census).toMatchObject({
      privateExportCount: 37,
      facadeDirectExportCount: 4,
      consumedNameCount: 41,
      unsupportedImportCount: 0,
      wildcardPrivateExportCount: 0,
    });
    expect(census.unusedPrivateExports).toEqual([]);
    expect(census.missingSurfaceImports).toEqual([]);
    expect(census.duplicatePrivateExports).toEqual([]);
    expect(census.missingSourceModules).toEqual([]);
  });
});

function createCensus() {
  const privateExports = readNamedExports(PRIVATE_BARREL);
  const facadeExports = readNamedExports(FACADE);
  const consumed = new Map<string, Set<string>>();
  const unsupportedImports: string[] = [];

  for (const file of sourceFiles(["src", "test"])) {
    const ast = parse(file);
    for (const statement of ast.statements) {
      collectImport(statement, file, consumed, unsupportedImports);
      collectReExport(statement, file, consumed);
    }
    collectImportTypes(ast, file, consumed, unsupportedImports);
  }

  const privateNames = new Set(privateExports.map(({ name }) => name));
  const facadeNames = new Set(facadeExports.map(({ name }) => name));
  return {
    privateExportCount: privateExports.length,
    facadeDirectExportCount: facadeExports.length,
    consumedNameCount: consumed.size,
    unsupportedImportCount: unsupportedImports.length,
    wildcardPrivateExportCount: countWildcardExports(PRIVATE_BARREL),
    unusedPrivateExports: [...privateNames].filter((name) => !consumed.has(name)).sort(),
    missingSurfaceImports: [...consumed.keys()]
      .filter((name) => !privateNames.has(name) && !facadeNames.has(name))
      .sort(),
    duplicatePrivateExports: duplicates(privateExports.map(({ name }) => name)),
    missingSourceModules: privateExports
      .map(({ sourceModule }) => resolveModule(PRIVATE_BARREL, sourceModule))
      .filter((sourceModule, index, values) => values.indexOf(sourceModule) === index)
      .filter((sourceModule) => !fs.existsSync(sourceModule))
      .map((sourceModule) => relativePath(sourceModule)),
  };
}

function collectImport(
  statement: ts.Statement,
  importer: string,
  consumed: Map<string, Set<string>>,
  unsupported: string[],
): void {
  if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) return;
  if (!isStableSurface(importer, statement.moduleSpecifier.text)) return;
  const clause = statement.importClause;
  if (!clause) return;
  if (clause.name || (clause.namedBindings && ts.isNamespaceImport(clause.namedBindings))) {
    unsupported.push(relativePath(importer));
    return;
  }
  if (!clause.namedBindings || !ts.isNamedImports(clause.namedBindings)) return;
  for (const element of clause.namedBindings.elements) {
    recordConsumer(consumed, element.propertyName?.text ?? element.name.text, importer);
  }
}

function collectReExport(
  statement: ts.Statement,
  importer: string,
  consumed: Map<string, Set<string>>,
): void {
  if (!ts.isExportDeclaration(statement)
    || !statement.moduleSpecifier
    || !ts.isStringLiteral(statement.moduleSpecifier)
    || !statement.exportClause
    || !ts.isNamedExports(statement.exportClause)) return;
  if (!isStableSurface(importer, statement.moduleSpecifier.text)) return;
  for (const element of statement.exportClause.elements) {
    recordConsumer(consumed, element.propertyName?.text ?? element.name.text, importer);
  }
}

function collectImportTypes(
  ast: ts.SourceFile,
  importer: string,
  consumed: Map<string, Set<string>>,
  unsupported: string[],
): void {
  function visit(node: ts.Node): void {
    if (ts.isImportTypeNode(node)
      && ts.isLiteralTypeNode(node.argument)
      && ts.isStringLiteral(node.argument.literal)
      && isStableSurface(importer, node.argument.literal.text)) {
      if (!node.qualifier) unsupported.push(relativePath(importer));
      else recordConsumer(consumed, node.qualifier.getText(ast).split(".")[0] ?? "", importer);
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
}

function recordConsumer(consumed: Map<string, Set<string>>, name: string, file: string): void {
  const files = consumed.get(name) ?? new Set<string>();
  files.add(relativePath(file));
  consumed.set(name, files);
}

function readNamedExports(file: string) {
  return parse(file).statements.flatMap((statement) => {
    if (!ts.isExportDeclaration(statement)
      || !statement.exportClause
      || !ts.isNamedExports(statement.exportClause)
      || !statement.moduleSpecifier
      || !ts.isStringLiteral(statement.moduleSpecifier)) return [];
    return statement.exportClause.elements.map((element) => ({
      name: element.name.text,
      sourceModule: statement.moduleSpecifier.text,
    }));
  });
}

function countWildcardExports(file: string): number {
  return parse(file).statements.filter((statement) =>
    ts.isExportDeclaration(statement) && !statement.exportClause).length;
}

function sourceFiles(roots: readonly string[]): string[] {
  return roots.flatMap((directory) => walk(path.resolve(ROOT, directory)));
}

function walk(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(target);
    return entry.name.endsWith(".ts") ? [target] : [];
  });
}

function isStableSurface(importer: string, specifier: string): boolean {
  const resolved = resolveModule(importer, specifier);
  return resolved === FACADE || resolved === PRIVATE_BARREL;
}

function resolveModule(importer: string, specifier: string): string {
  const resolved = path.resolve(path.dirname(importer), specifier);
  return resolved.endsWith(".js") ? `${resolved.slice(0, -3)}.ts` : resolved;
}

function parse(file: string): ts.SourceFile {
  return ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
}

function duplicates(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const repeated = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) repeated.add(value);
    seen.add(value);
  }
  return [...repeated].sort();
}

function relativePath(file: string): string {
  return path.relative(ROOT, file).replaceAll("\\", "/");
}
