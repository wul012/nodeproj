import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import ts from "typescript";

export const HEALTH_LIMITS = Object.freeze({
  nearLimitLines: 600,
  longFunctionLines: 120,
  complexFunctionScore: 20,
});

export async function scanMaintainability(projectRoot = process.cwd()) {
  const root = path.resolve(projectRoot);
  const sourceRoot = path.join(root, "src");
  const absoluteFiles = await listTypeScriptFiles(sourceRoot);
  const fileSet = new Set(absoluteFiles.map((file) => path.normalize(file)));
  const sourceFiles = [];
  const functions = [];
  const importsByFile = new Map();
  const scanErrors = [];

  for (const absoluteFile of absoluteFiles) {
    const file = normalizePath(path.relative(root, absoluteFile));
    const source = await readFile(absoluteFile, "utf8");
    const sourceFile = ts.createSourceFile(
      file,
      source,
      ts.ScriptTarget.Latest,
      true,
      file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    );
    const lines = countPhysicalLines(source);
    sourceFiles.push({ key: file, file, lines });
    functions.push(...collectFunctions(sourceFile, file));
    importsByFile.set(
      path.normalize(absoluteFile),
      collectImports(sourceFile, absoluteFile, fileSet),
    );
    for (const diagnostic of sourceFile.parseDiagnostics ?? []) {
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
      scanErrors.push(`${file}:${diagnostic.start ?? 0}: ${message}`);
    }
  }

  return {
    sourceFiles: sourceFiles.sort(compareFile),
    nearLimitFiles: sourceFiles
      .filter((item) => item.lines > HEALTH_LIMITS.nearLimitLines)
      .sort(compareLines),
    functions: functions.sort(compareFunction),
    longFunctions: functions
      .filter((item) => item.lines > HEALTH_LIMITS.longFunctionLines)
      .sort(compareLines),
    complexFunctions: functions
      .filter((item) => item.complexity > HEALTH_LIMITS.complexFunctionScore)
      .sort(compareComplexity),
    importCycles: collectCycles(absoluteFiles, importsByFile, root),
    scanErrors,
  };
}

function collectFunctions(sourceFile, file) {
  const results = [];
  const keyCounts = new Map();

  function visit(node) {
    if (isTrackedFunction(node)) {
      const name = functionName(node);
      if (name) {
        const startLine = lineOf(sourceFile, node.getStart(sourceFile));
        const endLine = lineOf(sourceFile, node.end);
        const baseKey = `${file}|${name}`;
        const occurrence = (keyCounts.get(baseKey) ?? 0) + 1;
        keyCounts.set(baseKey, occurrence);
        results.push({
          key: occurrence === 1 ? baseKey : `${baseKey}#${occurrence}`,
          file,
          name,
          startLine,
          lines: endLine - startLine + 1,
          complexity: functionComplexity(node),
        });
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return results;
}

function isTrackedFunction(node) {
  if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) return true;
  if (ts.isConstructorDeclaration(node) || ts.isGetAccessorDeclaration(node)) return true;
  if (ts.isSetAccessorDeclaration(node)) return true;
  if (!ts.isArrowFunction(node) && !ts.isFunctionExpression(node)) return false;
  return ts.isVariableDeclaration(node.parent) || ts.isPropertyAssignment(node.parent);
}

function functionName(node) {
  if (ts.isConstructorDeclaration(node)) {
    return `${ownerName(node) ?? "anonymous"}.constructor`;
  }
  if (node.name) return qualifyName(node, propertyName(node.name));
  const parent = node.parent;
  if (ts.isVariableDeclaration(parent)) return qualifyName(node, propertyName(parent.name));
  if (ts.isPropertyAssignment(parent)) return qualifyName(node, propertyName(parent.name));
  return null;
}

function qualifyName(node, name) {
  if (!name) return null;
  const owner = ownerName(node);
  return owner ? `${owner}.${name}` : name;
}

function ownerName(node) {
  let current = node.parent;
  while (current) {
    if (ts.isClassDeclaration(current) && current.name) return current.name.text;
    if (ts.isObjectLiteralExpression(current)) {
      const parent = current.parent;
      if (ts.isVariableDeclaration(parent)) return propertyName(parent.name);
      if (ts.isPropertyAssignment(parent)) return propertyName(parent.name);
    }
    current = current.parent;
  }
  return null;
}

function propertyName(name) {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
    return name.text;
  }
  return null;
}

function functionComplexity(node) {
  let score = 1;
  const body = node.body;
  if (!body) return score;

  function visit(current) {
    if (current !== body && ts.isFunctionLike(current)) return;
    if (ts.isIfStatement(current) || ts.isConditionalExpression(current)) score += 1;
    else if (ts.isForStatement(current) || ts.isForInStatement(current)) score += 1;
    else if (ts.isForOfStatement(current) || ts.isWhileStatement(current)) score += 1;
    else if (ts.isDoStatement(current) || ts.isCatchClause(current)) score += 1;
    else if (ts.isCaseClause(current)) score += 1;
    else if (ts.isBinaryExpression(current) && isBranchOperator(current.operatorToken.kind)) {
      score += 1;
    }
    ts.forEachChild(current, visit);
  }

  visit(body);
  return score;
}

function isBranchOperator(kind) {
  return kind === ts.SyntaxKind.AmpersandAmpersandToken
    || kind === ts.SyntaxKind.BarBarToken
    || kind === ts.SyntaxKind.QuestionQuestionToken;
}

function collectImports(sourceFile, absoluteFile, fileSet) {
  const targets = new Set();
  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement) && !ts.isExportDeclaration(statement)) continue;
    if (isTypeOnlyLink(statement)) continue;
    const specifier = statement.moduleSpecifier;
    if (!specifier || !ts.isStringLiteral(specifier) || !specifier.text.startsWith(".")) continue;
    const resolved = resolveImport(absoluteFile, specifier.text, fileSet);
    if (resolved) targets.add(resolved);
  }
  return [...targets].sort();
}

function isTypeOnlyLink(statement) {
  if (ts.isExportDeclaration(statement)) {
    if (statement.isTypeOnly) return true;
    const exports = statement.exportClause;
    return Boolean(
      exports
      && ts.isNamedExports(exports)
      && exports.elements.length > 0
      && exports.elements.every((element) => element.isTypeOnly),
    );
  }
  const clause = statement.importClause;
  if (!clause) return false;
  if (clause.isTypeOnly) return true;
  const bindings = clause.namedBindings;
  return Boolean(
    bindings
    && ts.isNamedImports(bindings)
    && !clause.name
    && bindings.elements.length > 0
    && bindings.elements.every((element) => element.isTypeOnly),
  );
}

function resolveImport(fromFile, specifier, fileSet) {
  const raw = path.resolve(path.dirname(fromFile), specifier);
  const candidates = [
    raw,
    raw.replace(/\.js$/u, ".ts"),
    raw.replace(/\.js$/u, ".tsx"),
    `${raw}.ts`,
    `${raw}.tsx`,
    path.join(raw, "index.ts"),
  ];
  return candidates.map((item) => path.normalize(item)).find((item) => fileSet.has(item));
}

function collectCycles(files, importsByFile, root) {
  const indices = new Map();
  const lowLinks = new Map();
  const stack = [];
  const onStack = new Set();
  const components = [];
  let index = 0;

  function connect(file) {
    indices.set(file, index);
    lowLinks.set(file, index);
    index += 1;
    stack.push(file);
    onStack.add(file);

    for (const target of importsByFile.get(file) ?? []) {
      if (!indices.has(target)) {
        connect(target);
        lowLinks.set(file, Math.min(lowLinks.get(file), lowLinks.get(target)));
      } else if (onStack.has(target)) {
        lowLinks.set(file, Math.min(lowLinks.get(file), indices.get(target)));
      }
    }

    if (lowLinks.get(file) !== indices.get(file)) return;
    const component = [];
    let member;
    do {
      member = stack.pop();
      onStack.delete(member);
      component.push(member);
    } while (member !== file);
    const selfCycle = component.length === 1
      && (importsByFile.get(component[0]) ?? []).includes(component[0]);
    if (component.length > 1 || selfCycle) components.push(component);
  }

  for (const file of files) {
    const normalized = path.normalize(file);
    if (!indices.has(normalized)) connect(normalized);
  }

  return components.map((component) => {
    const cycleFiles = component
      .map((file) => normalizePath(path.relative(root, file)))
      .sort();
    return { key: cycleFiles.join("|"), files: cycleFiles };
  }).sort((left, right) => left.key.localeCompare(right.key));
}

async function listTypeScriptFiles(root) {
  const files = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const absolute = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...await listTypeScriptFiles(absolute));
    else if (entry.isFile() && /\.(?:ts|tsx)$/u.test(entry.name)) files.push(absolute);
  }
  return files.sort();
}

function countPhysicalLines(content) {
  if (content.length === 0) return 0;
  const count = content.split(/\r\n|\n|\r/u).length;
  return count - (/\r\n$|\n$|\r$/u.test(content) ? 1 : 0);
}

function lineOf(sourceFile, position) {
  return sourceFile.getLineAndCharacterOfPosition(position).line + 1;
}

function compareFile(left, right) {
  return left.file.localeCompare(right.file);
}

function compareLines(left, right) {
  return right.lines - left.lines || left.key.localeCompare(right.key);
}

function compareFunction(left, right) {
  return left.file.localeCompare(right.file) || left.startLine - right.startLine;
}

function compareComplexity(left, right) {
  return right.complexity - left.complexity || compareLines(left, right);
}

function normalizePath(value) {
  return value.replaceAll("\\", "/");
}
