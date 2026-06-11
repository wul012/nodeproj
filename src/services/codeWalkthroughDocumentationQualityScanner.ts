import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
} from "node:fs";
import path from "node:path";

import { evaluateCodeWalkthroughDocument } from "./codeWalkthroughDocumentationQualityRules.js";
import {
  CODE_WALKTHROUGH_BUCKETS,
  CODE_WALKTHROUGH_ROOT,
  CODE_WALKTHROUGH_SAMPLE_PATH,
  CODE_WALKTHROUGH_STANDARD_PATH,
  type CodeWalkthroughBucket,
  type CodeWalkthroughDocumentationScan,
  type CodeWalkthroughDocumentEvaluation,
  type CodeWalkthroughDocumentScan,
} from "./codeWalkthroughDocumentationQualityTypes.js";

export function scanCodeWalkthroughDocumentation(input: {
  projectRoot?: string;
  enforcementFloorRecord?: number;
} = {}): CodeWalkthroughDocumentationScan {
  const projectRoot = input.projectRoot ?? process.cwd();
  const walkthroughRoot = path.join(projectRoot, CODE_WALKTHROUGH_ROOT);
  const rootExists = existsSync(walkthroughRoot);
  const rootEntries = rootExists ? readdirSync(walkthroughRoot) : [];
  const rootMarkdownFiles = rootEntries
    .filter((entry) => entry.endsWith(".md") && entry !== "README.md")
    .sort();
  const bucketDirectories = Object.fromEntries(
    CODE_WALKTHROUGH_BUCKETS.map((bucket) => [
      bucket,
      existsSync(path.join(walkthroughRoot, bucket)) && statSync(path.join(walkthroughRoot, bucket)).isDirectory(),
    ]),
  ) as Record<CodeWalkthroughBucket, boolean>;
  const documents = rootExists
    ? collectMarkdownDocuments(walkthroughRoot)
      .map((document) => evaluateCodeWalkthroughDocument(document, input.enforcementFloorRecord))
      .sort(compareDocuments)
    : [];

  return {
    projectRoot,
    walkthroughRoot,
    rootExists,
    readmeExists: existsSync(path.join(walkthroughRoot, "README.md")),
    standardDocumentExists: existsSync(path.join(projectRoot, CODE_WALKTHROUGH_STANDARD_PATH)),
    sampleDocumentExists: existsSync(path.join(projectRoot, CODE_WALKTHROUGH_SAMPLE_PATH)),
    bucketDirectories,
    rootMarkdownFiles,
    documents,
  };
}

export function expectedCodeWalkthroughBucket(recordNumber: number | null): CodeWalkthroughBucket {
  if (recordNumber === null) {
    return "misc";
  }
  if (recordNumber < 500) {
    return "r0000";
  }
  if (recordNumber < 1000) {
    return "r0500";
  }
  if (recordNumber < 1500) {
    return "r1000";
  }
  if (recordNumber < 2000) {
    return "r1500";
  }
  return "r2000";
}

function collectMarkdownDocuments(walkthroughRoot: string): CodeWalkthroughDocumentScan[] {
  const documents: CodeWalkthroughDocumentScan[] = [];
  visit(walkthroughRoot, documents);
  return documents;
}

function visit(directory: string, documents: CodeWalkthroughDocumentScan[]): void {
  for (const entry of readdirSync(directory)) {
    const absolutePath = path.join(directory, entry);
    const stats = statSync(absolutePath);
    if (stats.isDirectory()) {
      visit(absolutePath, documents);
      continue;
    }
    if (!entry.endsWith(".md") || entry === "README.md") {
      continue;
    }

    const walkthroughRoot = path.dirname(path.dirname(absolutePath));
    const maybeBucket = path.basename(path.dirname(absolutePath));
    const relativePath = path.relative(walkthroughRoot, absolutePath).replace(/\\/g, "/");
    const recordNumber = parseRecordNumber(entry);
    const versionNumber = parseVersionNumber(entry);
    const text = readFileSync(absolutePath, "utf8");

    documents.push({
      relativePath,
      bucket: asBucket(maybeBucket),
      expectedBucket: expectedCodeWalkthroughBucket(recordNumber),
      recordNumber,
      versionNumber,
      title: text.split(/\r?\n/, 1)[0]?.replace(/^#\s*/, "") ?? entry,
      byteLength: stats.size,
      lineCount: text.split(/\r?\n/).length,
      text,
    });
  }
}

function parseRecordNumber(fileName: string): number | null {
  const match = /^(\d+)/.exec(fileName);
  return match ? Number(match[1]) : null;
}

function parseVersionNumber(fileName: string): number | null {
  const match = /-v(\d+)(?:\.md)?$/i.exec(fileName);
  return match ? Number(match[1]) : null;
}

function asBucket(value: string): CodeWalkthroughBucket | "root" | "unknown" {
  if ((CODE_WALKTHROUGH_BUCKETS as readonly string[]).includes(value)) {
    return value as CodeWalkthroughBucket;
  }
  return value === CODE_WALKTHROUGH_ROOT ? "root" : "unknown";
}

function compareDocuments(
  left: CodeWalkthroughDocumentEvaluation,
  right: CodeWalkthroughDocumentEvaluation,
): number {
  return (left.recordNumber ?? Number.MAX_SAFE_INTEGER) - (right.recordNumber ?? Number.MAX_SAFE_INTEGER)
    || left.relativePath.localeCompare(right.relativePath);
}
