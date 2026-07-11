import { existsSync, lstatSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const DEFAULT_BUDGET = "docs/archive-retention-budget.json";

const args = process.argv.slice(2);
const jsonOutput = args.includes("--json");
const projectRoot = path.resolve(readOption("--project-root") ?? process.cwd());
const budgetPath = path.resolve(projectRoot, readOption("--budget") ?? DEFAULT_BUDGET);
const budgetErrors = [];
const budget = readBudget(budgetPath, budgetErrors);
const missingRoots = [];
const symbolicLinks = [];
const allFiles = new Map();

const versionedRoots = budget.versionedRoots.map((root) => {
  const files = collectRoot(root);
  const directories = groupVersionDirectories(root, files);
  return {
    path: root,
    kind: "versioned-archive",
    fileCount: files.length,
    bytes: sumBytes(files),
    versionDirectoryCount: directories.length,
    largestVersionDirectory: largestByBytes(directories),
    directories,
  };
});

const walkthroughRoots = budget.walkthroughRoots.map((root) => {
  const files = collectRoot(root);
  return {
    path: root,
    kind: "walkthrough-archive",
    fileCount: files.length,
    bytes: sumBytes(files),
    largestFile: largestByBytes(files),
    files,
  };
});

const boundedRoots = budget.boundedRoots.map((root) => {
  const files = collectRoot(root.path);
  return {
    ...root,
    kind: "bounded-archive",
    fileCount: files.length,
    bytes: sumBytes(files),
    largestFile: largestByBytes(files),
    files,
  };
});

const archiveFiles = [...allFiles.values()];
const aggregateBytes = sumBytes(archiveFiles);
const versionDirectories = versionedRoots.flatMap((root) => root.directories);
const walkthroughFiles = walkthroughRoots.flatMap((root) => root.files);
const boundedFiles = boundedRoots.flatMap((root) =>
  root.files.map((file) => ({ ...file, root: root.path, maxFileBytes: root.maxFileBytes })),
);
const versionDirectoriesExceeded = versionDirectories
  .filter((entry) => entry.bytes > budget.limits.maxVersionDirectoryBytes)
  .sort(compareByBytesThenPath);
const walkthroughFilesExceeded = walkthroughFiles
  .filter((entry) => entry.bytes > budget.limits.maxWalkthroughFileBytes)
  .sort(compareByBytesThenPath);
const boundedRootsExceeded = boundedRoots
  .filter((entry) => entry.bytes > entry.maxBytes)
  .map(({ path: root, purpose, bytes, maxBytes }) => ({ root, purpose, bytes, maxBytes }))
  .sort((left, right) => left.root.localeCompare(right.root));
const boundedFilesExceeded = boundedFiles
  .filter((entry) => entry.bytes > entry.maxFileBytes)
  .sort(compareByBytesThenPath);
const aggregateExceeded = aggregateBytes > budget.limits.maxAggregateBytes;
const fileCountExceeded = archiveFiles.length > budget.limits.maxArchiveFileCount;
const ready = budgetErrors.length === 0
  && missingRoots.length === 0
  && symbolicLinks.length === 0
  && versionDirectoriesExceeded.length === 0
  && walkthroughFilesExceeded.length === 0
  && boundedRootsExceeded.length === 0
  && boundedFilesExceeded.length === 0
  && !aggregateExceeded
  && !fileCountExceeded;

const report = {
  schemaVersion: 1,
  projectRoot: normalizePath(projectRoot),
  budget: normalizePath(path.relative(projectRoot, budgetPath)),
  limits: budget.limits,
  archiveFileCount: archiveFiles.length,
  aggregateBytes,
  roots: [
    ...versionedRoots.map(stripInternalCollections),
    ...walkthroughRoots.map(stripInternalCollections),
    ...boundedRoots.map(stripInternalCollections),
  ],
  largest: {
    versionDirectory: largestByBytes(versionDirectories),
    walkthroughFile: largestByBytes(walkthroughFiles),
    boundedFile: largestByBytes(boundedFiles),
  },
  violations: {
    budgetErrors,
    missingRoots,
    symbolicLinks,
    versionDirectoriesExceeded,
    walkthroughFilesExceeded,
    boundedRootsExceeded,
    boundedFilesExceeded,
    aggregateExceeded,
    fileCountExceeded,
  },
  ready,
};

if (jsonOutput) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log([
    `Archive retention census: ${archiveFiles.length} files,`,
    `${formatMiB(aggregateBytes)} MiB / ${formatMiB(budget.limits.maxAggregateBytes)} MiB.`,
  ].join(" "));
  console.log(
    `Largest version archive: ${formatLargest(report.largest.versionDirectory)}; `
    + `largest walkthrough: ${formatLargest(report.largest.walkthroughFile)}.`,
  );
  if (!ready) printViolations(report.violations, budget.limits);
}

if (!ready) process.exitCode = 1;

function readOption(name) {
  const prefix = `${name}=`;
  return args.find((argument) => argument.startsWith(prefix))?.slice(prefix.length);
}

function readBudget(file, errors) {
  const fallback = {
    versionedRoots: [],
    walkthroughRoots: [],
    boundedRoots: [],
    limits: {
      maxAggregateBytes: 0,
      maxArchiveFileCount: 0,
      maxVersionDirectoryBytes: 0,
      maxWalkthroughFileBytes: 0,
    },
  };
  if (!existsSync(file)) {
    errors.push(`missing budget: ${normalizePath(file)}`);
    return fallback;
  }

  try {
    const parsed = JSON.parse(readFileSync(file, "utf8"));
    if (parsed.schemaVersion !== 1) errors.push("schemaVersion must equal 1");
    validateRootArray(parsed.versionedRoots, "versionedRoots", errors);
    validateRootArray(parsed.walkthroughRoots, "walkthroughRoots", errors);
    if (!Array.isArray(parsed.boundedRoots)) errors.push("boundedRoots must be an array");
    const boundedRoots = Array.isArray(parsed.boundedRoots) ? parsed.boundedRoots : [];
    for (const root of boundedRoots) {
      validateRelativeRoot(root?.path, "boundedRoots.path", errors);
      if (typeof root?.purpose !== "string" || root.purpose.trim().length < 8) {
        errors.push(`${root?.path ?? "<unknown>"}: purpose must be descriptive`);
      }
      validatePositiveInteger(root?.maxBytes, `${root?.path ?? "<unknown>"}.maxBytes`, errors);
      validatePositiveInteger(root?.maxFileBytes, `${root?.path ?? "<unknown>"}.maxFileBytes`, errors);
    }
    const limits = parsed.limits ?? {};
    for (const key of [
      "maxAggregateBytes",
      "maxArchiveFileCount",
      "maxVersionDirectoryBytes",
      "maxWalkthroughFileBytes",
    ]) {
      validatePositiveInteger(limits[key], `limits.${key}`, errors);
    }
    const allRoots = [
      ...(Array.isArray(parsed.versionedRoots) ? parsed.versionedRoots : []),
      ...(Array.isArray(parsed.walkthroughRoots) ? parsed.walkthroughRoots : []),
      ...boundedRoots.map((root) => root.path),
    ];
    const seen = new Set();
    for (const root of allRoots) {
      if (seen.has(root)) errors.push(`duplicate archive root: ${root}`);
      seen.add(root);
    }

    return {
      versionedRoots: Array.isArray(parsed.versionedRoots) ? parsed.versionedRoots : [],
      walkthroughRoots: Array.isArray(parsed.walkthroughRoots) ? parsed.walkthroughRoots : [],
      boundedRoots,
      limits: {
        maxAggregateBytes: positiveOrZero(limits.maxAggregateBytes),
        maxArchiveFileCount: positiveOrZero(limits.maxArchiveFileCount),
        maxVersionDirectoryBytes: positiveOrZero(limits.maxVersionDirectoryBytes),
        maxWalkthroughFileBytes: positiveOrZero(limits.maxWalkthroughFileBytes),
      },
    };
  } catch (error) {
    errors.push(`invalid budget JSON: ${error instanceof Error ? error.message : String(error)}`);
    return fallback;
  }
}

function collectRoot(relativeRoot) {
  const absoluteRoot = path.resolve(projectRoot, relativeRoot);
  if (!existsSync(absoluteRoot)) {
    missingRoots.push(relativeRoot);
    return [];
  }
  const files = listFiles(absoluteRoot).map((absolutePath) => ({
    path: normalizePath(path.relative(projectRoot, absolutePath)),
    bytes: lstatSync(absolutePath).size,
  }));
  for (const file of files) {
    if (allFiles.has(file.path)) budgetErrors.push(`overlapping archive roots include ${file.path}`);
    allFiles.set(file.path, file);
  }
  return files;
}

function listFiles(root) {
  const files = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const absolutePath = path.join(root, entry.name);
    if (entry.isSymbolicLink()) {
      symbolicLinks.push(normalizePath(path.relative(projectRoot, absolutePath)));
    } else if (entry.isDirectory()) {
      files.push(...listFiles(absolutePath));
    } else if (entry.isFile()) {
      files.push(absolutePath);
    }
  }
  return files;
}

function groupVersionDirectories(root, files) {
  const groups = new Map();
  for (const file of files) {
    const relative = normalizePath(path.relative(path.join(projectRoot, root), path.join(projectRoot, file.path)));
    const version = relative.includes("/") ? relative.slice(0, relative.indexOf("/")) : "<root-files>";
    const key = `${root}/${version}`;
    groups.set(key, (groups.get(key) ?? 0) + file.bytes);
  }
  return [...groups.entries()]
    .map(([entryPath, bytes]) => ({ path: entryPath, bytes }))
    .sort((left, right) => left.path.localeCompare(right.path));
}

function stripInternalCollections(root) {
  const summary = { ...root };
  delete summary.files;
  delete summary.directories;
  return summary;
}

function validateRootArray(value, label, errors) {
  if (!Array.isArray(value) || value.length === 0) {
    errors.push(`${label} must be a non-empty array`);
    return;
  }
  for (const root of value) validateRelativeRoot(root, label, errors);
}

function validateRelativeRoot(value, label, errors) {
  if (typeof value !== "string" || value.length === 0 || path.isAbsolute(value) || value.includes("..")) {
    errors.push(`${label} must contain safe relative paths`);
  }
}

function validatePositiveInteger(value, label, errors) {
  if (!Number.isInteger(value) || value <= 0) errors.push(`${label} must be a positive integer`);
}

function positiveOrZero(value) {
  return Number.isInteger(value) && value > 0 ? value : 0;
}

function sumBytes(entries) {
  return entries.reduce((total, entry) => total + entry.bytes, 0);
}

function largestByBytes(entries) {
  return [...entries].sort(compareByBytesThenPath)[0] ?? null;
}

function compareByBytesThenPath(left, right) {
  return right.bytes - left.bytes || left.path.localeCompare(right.path);
}

function formatLargest(entry) {
  return entry === null ? "none" : `${entry.path} (${formatMiB(entry.bytes)} MiB)`;
}

function formatMiB(bytes) {
  return (bytes / 1024 / 1024).toFixed(2);
}

function printViolations(violations, limits) {
  console.error("Archive retention budget failed.");
  for (const error of violations.budgetErrors) console.error(`- budget: ${error}`);
  for (const root of violations.missingRoots) console.error(`- missing root: ${root}`);
  for (const link of violations.symbolicLinks) console.error(`- symbolic link: ${link}`);
  for (const entry of violations.versionDirectoriesExceeded) {
    console.error(`- version archive: ${entry.path} (${entry.bytes} > ${limits.maxVersionDirectoryBytes})`);
  }
  for (const entry of violations.walkthroughFilesExceeded) {
    console.error(`- walkthrough: ${entry.path} (${entry.bytes} > ${limits.maxWalkthroughFileBytes})`);
  }
  for (const entry of violations.boundedRootsExceeded) {
    console.error(`- bounded root: ${entry.root} (${entry.bytes} > ${entry.maxBytes})`);
  }
  for (const entry of violations.boundedFilesExceeded) {
    console.error(`- bounded file: ${entry.path} (${entry.bytes} > ${entry.maxFileBytes})`);
  }
  if (violations.aggregateExceeded) console.error(`- aggregate bytes exceed ${limits.maxAggregateBytes}`);
  if (violations.fileCountExceeded) console.error(`- archive file count exceeds ${limits.maxArchiveFileCount}`);
}

function normalizePath(value) {
  return value.replaceAll("\\", "/");
}
