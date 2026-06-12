import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
} from "node:fs";
import path from "node:path";

import { evaluateFFolderExplanationDocument } from "./fFolderExplanationQualityRules.js";
import {
  F_FOLDER_EXPLANATION_DIR_NAME,
  F_FOLDER_EXPLANATION_ROOT,
  F_FOLDER_IMAGE_DIR_NAME,
  type FFolderExplanationDocumentScan,
  type FFolderExplanationQualityScan,
  type FFolderVersionSummary,
} from "./fFolderExplanationQualityTypes.js";

export function scanFFolderExplanations(input: {
  projectRoot?: string;
  enforcementFloorVersion?: number;
} = {}): FFolderExplanationQualityScan {
  const projectRoot = input.projectRoot ?? process.cwd();
  const fRoot = path.join(projectRoot, F_FOLDER_EXPLANATION_ROOT);
  const rootExists = existsSync(fRoot);
  const versionSummaries = rootExists ? collectVersionSummaries(fRoot) : [];
  const documents = rootExists
    ? collectExplanationDocuments(fRoot)
      .map((document) => evaluateFFolderExplanationDocument(document, input.enforcementFloorVersion))
      .sort(compareDocuments)
    : [];

  return {
    projectRoot,
    fRoot,
    rootExists,
    versionSummaries,
    documents,
  };
}

function collectVersionSummaries(fRoot: string): FFolderVersionSummary[] {
  return readdirSync(fRoot)
    .map((entry) => ({
      entry,
      versionNumber: Number(entry),
    }))
    .filter((entry) => Number.isInteger(entry.versionNumber))
    .map(({ entry, versionNumber }) => {
      const versionDir = path.join(fRoot, entry);
      const explanationDir = path.join(versionDir, F_FOLDER_EXPLANATION_DIR_NAME);
      const imageDir = path.join(versionDir, F_FOLDER_IMAGE_DIR_NAME);
      return {
        versionNumber,
        explanationDirExists: existsSync(explanationDir) && statSync(explanationDir).isDirectory(),
        explanationMarkdownCount: countFiles(explanationDir, ".md"),
        imageDirExists: existsSync(imageDir) && statSync(imageDir).isDirectory(),
        imageFileCount: countFiles(imageDir),
      };
    })
    .sort((left, right) => left.versionNumber - right.versionNumber);
}

function collectExplanationDocuments(fRoot: string): FFolderExplanationDocumentScan[] {
  const documents: FFolderExplanationDocumentScan[] = [];
  for (const summary of collectVersionSummaries(fRoot)) {
    const versionDir = path.join(fRoot, String(summary.versionNumber));
    visit(versionDir, summary.versionNumber, documents);
  }
  return documents;
}

function visit(directory: string, versionNumber: number, documents: FFolderExplanationDocumentScan[]): void {
  for (const entry of readdirSync(directory)) {
    const absolutePath = path.join(directory, entry);
    const stats = statSync(absolutePath);
    if (stats.isDirectory()) {
      visit(absolutePath, versionNumber, documents);
      continue;
    }
    if (!entry.endsWith(".md")) {
      continue;
    }
    const text = readFileSync(absolutePath, "utf8");
    const relativePath = path.relative(process.cwd(), absolutePath).replace(/\\/g, "/");
    const parentDir = path.basename(path.dirname(absolutePath));

    documents.push({
      relativePath,
      versionNumber,
      fileName: entry,
      title: text.split(/\r?\n/, 1)[0]?.replace(/^#\s*/, "") ?? entry,
      byteLength: stats.size,
      lineCount: text.split(/\r?\n/).length,
      text,
      explanationDirAligned: parentDir === F_FOLDER_EXPLANATION_DIR_NAME,
    });
  }
}

function countFiles(directory: string, suffix = ""): number {
  if (!existsSync(directory) || !statSync(directory).isDirectory()) {
    return 0;
  }
  return readdirSync(directory)
    .filter((entry) => {
      const absolutePath = path.join(directory, entry);
      return statSync(absolutePath).isFile() && (suffix === "" || entry.endsWith(suffix));
    })
    .length;
}

function compareDocuments(
  left: { versionNumber: number; relativePath: string },
  right: { versionNumber: number; relativePath: string },
): number {
  return left.versionNumber - right.versionNumber || left.relativePath.localeCompare(right.relativePath);
}
