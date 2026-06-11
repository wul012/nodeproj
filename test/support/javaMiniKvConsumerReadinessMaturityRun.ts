import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

export const CONSUMER_READINESS_MATURITY_RUN = [
  { version: "566", title: "Java/mini-kv consumer readiness type ownership split" },
  { version: "567", title: "Java/mini-kv consumer readiness evidence file builder split" },
  { version: "568", title: "Java/mini-kv consumer readiness Java evidence parser split" },
  { version: "569", title: "Java/mini-kv consumer readiness batch closeout artifact manifest split" },
  { version: "570", title: "Java/mini-kv consumer readiness batch closeout artifact manifest coverage" },
  { version: "571", title: "Java/mini-kv consumer readiness batch closeout file support split" },
  { version: "572", title: "Java/mini-kv consumer readiness batch closeout file support coverage" },
  { version: "573", title: "Java/mini-kv consumer readiness archive verifier support reuse" },
  { version: "574", title: "Java/mini-kv consumer readiness batch closeout archive verifier support reuse" },
  { version: "575", title: "Java/mini-kv consumer readiness batch closeout archive artifact coverage" },
  { version: "576", title: "Java/mini-kv consumer readiness Java evidence parser coverage" },
  { version: "577", title: "Java/mini-kv consumer readiness evidence file builder coverage" },
  { version: "578", title: "Java/mini-kv consumer readiness multi-version archive index coverage" },
  { version: "579", title: "Java/mini-kv consumer readiness maturity artifact presence coverage" },
  { version: "580", title: "Java/mini-kv consumer readiness maturity run closeout coverage" },
] as const;

export const CONSUMER_READINESS_MATURITY_RUN_SIZE = 15;

export function readConsumerReadinessArchiveIndex(projectRoot = process.cwd()): string {
  return readFileSync(path.join(projectRoot, "e", "README.md"), "utf8");
}

export function getConsumerReadinessExplanationDir(projectRoot: string, version: string): string {
  return path.join(projectRoot, "e", version, "解释");
}

export function listConsumerReadinessWalkthroughFiles(projectRoot = process.cwd()): string[] {
  const walkthroughRoot = path.join(projectRoot, "代码讲解记录_生产雏形阶段3");
  const files: string[] = [];
  const visit = (directory: string) => {
    for (const entry of readdirSync(directory)) {
      const entryPath = path.join(directory, entry);
      if (statSync(entryPath).isDirectory()) {
        visit(entryPath);
        continue;
      }

      files.push(path.relative(walkthroughRoot, entryPath));
    }
  };

  visit(walkthroughRoot);
  return files;
}

export function hasVersionedMarkdownFile(directory: string, version: string): boolean {
  return existsSync(directory) && readdirSync(directory).some((file) => file.endsWith(`-v${version}.md`));
}
