import { createHash } from "node:crypto";

const DECLARED_REPO_ROOT = "D:/nodeproj/orderops-node";

export function normalizeForParity(value: unknown): unknown {
  if (typeof value === "string") return normalizeText(value);
  if (Array.isArray(value)) return value.map(normalizeForParity);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, normalizeForParity(entry)]),
    );
  }
  return value;
}

export function normalizeText(value: string, repositoryRoot = process.cwd()): string {
  const roots = [repositoryRoot, DECLARED_REPO_ROOT]
    .map((root) => root.replace(/\\/g, "/").replace(/\/$/, ""))
    .filter((root, index, all) => root.length > 0 && all.indexOf(root) === index)
    .sort((left, right) => right.length - left.length);

  return roots.reduce(
    (portable, root) => portable.replace(new RegExp(`${escapeRegex(root)}(?=$|/)`, "gi"), "<repo>"),
    value.replace(/\\/g, "/"),
  );
}

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
