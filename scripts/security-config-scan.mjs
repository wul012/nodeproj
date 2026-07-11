import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const EXCLUDED_DIRECTORIES = new Set([
  ".git",
  ".tmp",
  ".vitest",
  "coverage",
  "dist",
  "node_modules",
  "playwright-report",
  "test-output",
]);
const SECRET_PATTERNS = [
  {
    type: "private-key",
    pattern: /-----BEGIN ((?:RSA |OPENSSH |EC )?PRIVATE KEY)-----[\s\S]+?-----END \1-----/g,
  },
  { type: "aws-access-key", pattern: /\bAKIA[0-9A-Z]{16}\b/g },
  { type: "github-token", pattern: /\bgh[pousr]_[A-Za-z0-9]{30,}\b/g },
  { type: "openai-key", pattern: /\bsk-[A-Za-z0-9]{32,}\b/g },
  { type: "slack-token", pattern: /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/g },
  {
    type: "credential-url",
    pattern: /\b(?:postgres(?:ql)?|mysql|mongodb(?:\+srv)?):\/\/[^:\s/@]+:[^@\s/]+@/g,
  },
];
const args = process.argv.slice(2);
const jsonOutput = args.includes("--json");
const projectRoot = path.resolve(readOption("--project-root") ?? process.cwd());
const waiverPath = path.resolve(
  projectRoot,
  readOption("--waivers") ?? "docs/security-scan-waivers.json",
);
const waiverErrors = [];
const waivers = readWaivers(waiverPath, waiverErrors);
const symlinks = [];
const files = listFiles(projectRoot);
const secretSignals = [];
const nonEmptyEnvSecrets = [];
let scannedTextFileCount = 0;
let scannedBytes = 0;
let skippedBinaryFileCount = 0;

for (const absolutePath of files) {
  const buffer = readFileSync(absolutePath);
  if (buffer.includes(0)) {
    skippedBinaryFileCount += 1;
    continue;
  }
  const text = buffer.toString("utf8");
  const relativePath = normalizePath(path.relative(projectRoot, absolutePath));
  scannedTextFileCount += 1;
  scannedBytes += buffer.length;
  secretSignals.push(...scanSecretPatterns(relativePath, text));
  if (path.basename(relativePath).startsWith(".env")) {
    nonEmptyEnvSecrets.push(...scanEnvSecrets(relativePath, text));
  }
}

const waiverBySignal = new Map(waivers.map((waiver) => [signalKey(waiver), waiver]));
const signalCounts = new Map();
for (const signal of secretSignals) {
  const key = signalKey(signal);
  signalCounts.set(key, (signalCounts.get(key) ?? 0) + 1);
}
const unwaivedSecretSignals = secretSignals.filter((signal) => !waiverBySignal.has(signalKey(signal)));
const staleWaivers = waivers
  .map((waiver) => ({ ...waiver, actualMatches: signalCounts.get(signalKey(waiver)) ?? 0 }))
  .filter((waiver) => waiver.actualMatches !== waiver.expectedMatches);
const acceptedSecretSignalCount = secretSignals.length - unwaivedSecretSignals.length;
const configChecks = buildConfigChecks();
const configChecksFailed = configChecks.filter((check) => !check.passed).map((check) => check.id);
const ready = waiverErrors.length === 0
  && unwaivedSecretSignals.length === 0
  && staleWaivers.length === 0
  && nonEmptyEnvSecrets.length === 0
  && symlinks.length === 0
  && configChecksFailed.length === 0;
const report = {
  schemaVersion: 1,
  projectRoot: normalizePath(projectRoot),
  waiverManifest: normalizePath(path.relative(projectRoot, waiverPath)),
  scannedTextFileCount,
  scannedBytes,
  skippedBinaryFileCount,
  secretSignalCount: secretSignals.length,
  acceptedSecretSignalCount,
  waiverCount: waivers.length,
  nonEmptyEnvSecretCount: nonEmptyEnvSecrets.length,
  configChecks,
  violations: {
    waiverErrors,
    unwaivedSecretSignals,
    staleWaivers,
    nonEmptyEnvSecrets,
    symlinks,
    configChecksFailed,
  },
  ready,
};

if (jsonOutput) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log([
    `Security/config scan: ${scannedTextFileCount} text files,`,
    `${secretSignals.length} credential signal(s) / ${acceptedSecretSignalCount} narrowly waived,`,
    `${configChecks.filter((check) => check.passed).length}/${configChecks.length} config checks passed.`,
  ].join(" "));
  if (!ready) printViolations(report.violations);
}

if (!ready) process.exitCode = 1;

function readOption(name) {
  const prefix = `${name}=`;
  return args.find((argument) => argument.startsWith(prefix))?.slice(prefix.length);
}

function readWaivers(file, errors) {
  if (!existsSync(file)) {
    errors.push(`missing waiver manifest: ${normalizePath(file)}`);
    return [];
  }
  try {
    const parsed = JSON.parse(readFileSync(file, "utf8"));
    if (parsed.schemaVersion !== 1) errors.push("waiver schemaVersion must equal 1");
    if (!Array.isArray(parsed.waivers)) errors.push("waivers must be an array");
    const waivers = Array.isArray(parsed.waivers) ? parsed.waivers : [];
    const seen = new Set();
    for (const waiver of waivers) {
      if (typeof waiver.path !== "string" || path.isAbsolute(waiver.path) || waiver.path.includes("..")) {
        errors.push("every waiver path must be a safe relative path");
      }
      if (typeof waiver.type !== "string" || !SECRET_PATTERNS.some((entry) => entry.type === waiver.type)) {
        errors.push(`${waiver.path ?? "<unknown>"}: waiver type is not scanned`);
      }
      if (typeof waiver.matchSha256 !== "string" || !/^[a-f0-9]{64}$/.test(waiver.matchSha256)) {
        errors.push(`${waiver.path ?? "<unknown>"}: matchSha256 must be lowercase SHA-256`);
      }
      if (!Number.isInteger(waiver.expectedMatches) || waiver.expectedMatches < 1) {
        errors.push(`${waiver.path ?? "<unknown>"}: expectedMatches must be a positive integer`);
      }
      if (typeof waiver.reason !== "string" || waiver.reason.trim().length < 20) {
        errors.push(`${waiver.path ?? "<unknown>"}: reason must be reviewer-checkable`);
      }
      const key = signalKey(waiver);
      if (seen.has(key)) errors.push(`duplicate security waiver: ${key}`);
      seen.add(key);
    }
    return waivers;
  } catch (error) {
    errors.push(`invalid waiver JSON: ${error instanceof Error ? error.message : String(error)}`);
    return [];
  }
}

function listFiles(root) {
  if (!existsSync(root)) return [];
  const files = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (entry.isDirectory() && EXCLUDED_DIRECTORIES.has(entry.name)) continue;
    const absolutePath = path.join(root, entry.name);
    if (entry.isSymbolicLink()) {
      symlinks.push(normalizePath(path.relative(projectRoot, absolutePath)));
    } else if (entry.isDirectory()) {
      files.push(...listFiles(absolutePath));
    } else if (entry.isFile()) {
      files.push(absolutePath);
    }
  }
  return files;
}

function scanSecretPatterns(relativePath, text) {
  const signals = [];
  for (const { type, pattern } of SECRET_PATTERNS) {
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      signals.push({
        path: relativePath,
        type,
        line: lineNumberAt(text, match.index ?? 0),
        matchSha256: createHash("sha256").update(match[0]).digest("hex"),
      });
    }
  }
  return signals;
}

function scanEnvSecrets(relativePath, text) {
  const signals = [];
  for (const [index, line] of text.split(/\r?\n/).entries()) {
    const match = /^([A-Z0-9_]*(?:SECRET|PASSWORD|API_KEY|ACCESS_TOKEN|AUTH_TOKEN))=(.*)$/.exec(line.trim());
    if (match !== null && match[2].trim().length > 0) {
      signals.push({ path: relativePath, key: match[1], line: index + 1 });
    }
  }
  return signals;
}

function buildConfigChecks() {
  const envExample = readRequiredFile(".env.example");
  const productionExample = readRequiredFile(".env.production.example");
  const configSource = readRequiredFile("src/config.ts");
  const workflow = readRequiredFile(".github/workflows/node-evidence.yml");
  const securityDocument = readRequiredFile("docs/SECURITY.md");
  return [
    check("local-probes-default-off", envExample.includes("UPSTREAM_PROBES_ENABLED=false")),
    check("local-actions-default-off", envExample.includes("UPSTREAM_ACTIONS_ENABLED=false")),
    check("local-secret-empty", hasExactLine(envExample, "ORDEROPS_AUTH_TOKEN_SECRET=")),
    check("local-audit-store-memory", envExample.includes("AUDIT_STORE_KIND=memory")),
    check("production-probes-off", productionExample.includes("UPSTREAM_PROBES_ENABLED=false")),
    check("production-actions-off", productionExample.includes("UPSTREAM_ACTIONS_ENABLED=false")),
    check("production-access-enforced", productionExample.includes("ACCESS_GUARD_ENFORCEMENT_ENABLED=true")),
    check("production-secret-empty", hasExactLine(productionExample, "ORDEROPS_AUTH_TOKEN_SECRET=")),
    check("production-audit-fail-closed", productionExample.includes("AUDIT_STORE_KIND=managed-unimplemented")),
    check("config-actions-default-false", configSource.includes('readBoolean(env, "UPSTREAM_ACTIONS_ENABLED", false)')),
    check("config-probes-default-false", configSource.includes('readBoolean(env, "UPSTREAM_PROBES_ENABLED", false)')),
    check("config-secret-default-empty", configSource.includes('readString(env, "ORDEROPS_AUTH_TOKEN_SECRET", "")')),
    check("ci-actions-disabled", workflow.includes('UPSTREAM_ACTIONS_ENABLED: "false"')),
    check("ci-security-scan", workflow.includes("npm run security:scan")),
    check("threat-model-assets", securityDocument.includes("## Protected assets")),
    check("threat-model-boundaries", securityDocument.includes("## Trust boundaries")),
    check("threat-model-controls", securityDocument.includes("## Threats and controls")),
    check("threat-model-secrets", securityDocument.includes("## Secrets policy")),
  ];
}

function readRequiredFile(relativePath) {
  const absolutePath = path.join(projectRoot, relativePath);
  return existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : "";
}

function check(id, passed) {
  return { id, passed };
}

function hasExactLine(text, expected) {
  return text.split(/\r?\n/).some((line) => line.trim() === expected);
}

function lineNumberAt(text, index) {
  return text.slice(0, index).split(/\r?\n/).length;
}

function printViolations(violations) {
  console.error("Security/config scan failed.");
  for (const error of violations.waiverErrors) console.error(`- waiver: ${error}`);
  for (const signal of violations.unwaivedSecretSignals) {
    console.error(`- credential signal: ${signal.type} at ${signal.path}:${signal.line}`);
  }
  for (const waiver of violations.staleWaivers) {
    console.error(`- stale waiver: ${waiver.path} (${waiver.actualMatches} != ${waiver.expectedMatches})`);
  }
  for (const signal of violations.nonEmptyEnvSecrets) {
    console.error(`- non-empty env secret: ${signal.key} at ${signal.path}:${signal.line}`);
  }
  for (const link of violations.symlinks) console.error(`- symbolic link: ${link}`);
  for (const id of violations.configChecksFailed) console.error(`- config check: ${id}`);
}

function signalKey(signal) {
  return `${signal.path}\u0000${signal.type}\u0000${signal.matchSha256}`;
}

function normalizePath(value) {
  return value.replaceAll("\\", "/");
}
