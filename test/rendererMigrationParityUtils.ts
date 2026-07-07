import { createHash } from "node:crypto";

export function sha256(value: string): string {
  return createHash("sha256")
    .update(value)
    .digest("hex");
}

export function normalizeRendererMigrationMarkdown(
  value: string,
  input: { generatedAt: string },
): string {
  return value
    .replace(/Generated at: [^\n]+/g, `Generated at: ${input.generatedAt}`)
    .replace(/"(path|resolvedPath)":"([^"]*)"/g, (_match: string, key: string, pathValue: string) =>
      `"${key}":"${normalizePathValue(pathValue)}"`,
    )
    .replace(/(resolved=)([^;\n]+)/g, (_match: string, prefix: string, pathValue: string) =>
      `${prefix}${normalizePathValue(pathValue)}`,
    )
    .replace(
      /(- (?:configuredPath|resolvedPath|historicalFallbackPath|path): )([^\n]+)/g,
      (_match: string, prefix: string, pathValue: string) => `${prefix}${normalizePathValue(pathValue)}`,
    )
    .replace(
      /(- (?:Evidence file|Resolved path|Historical fallback path): )([^\n]+)/g,
      (_match: string, prefix: string, pathValue: string) => `${prefix}${normalizePathValue(pathValue)}`,
    )
    .replace(
      /(Hardening file: |Resolved hardening path: |Source core file: )([^\n]+)/g,
      (_match: string, prefix: string, pathValue: string) => `${prefix}${normalizePathValue(pathValue)}`,
    )
    .replace(
      /"exists":true,"sizeBytes":\d+,"digest":"[a-f0-9]{64}"/g,
      `"exists":true,"sizeBytes":<bytes>,"digest":"<sha256>"`,
    )
    .replace(
      /"exists":(?:true|false),"byteLength":(?:\d+|<bytes>),"digest":(?:"(?:[a-f0-9]{64}|<sha256>)"|null)/g,
      `"exists":<exists>,"byteLength":<bytes>,"digest":"<sha256>"`,
    )
    .replace(/(bytes=)\d+(; digest=)[a-f0-9]{64}/g, "$1<bytes>$2<sha256>")
    .replace(/(- [A-Za-z0-9]+Digest: )[a-f0-9]{64}/g, "$1<digest>");
}

function normalizePathValue(value: string): string {
  if (value === "not-applicable") {
    return value;
  }

  const slashPath = value
    .replace(/\\\\/g, "/")
    .replace(/\\/g, "/")
    .replace(/\/+/g, "/");

  const fixturesIndex = slashPath.indexOf("/fixtures/");
  if (fixturesIndex >= 0) {
    return `<repo>${slashPath.slice(fixturesIndex)}`;
  }

  const javaRootMarker = "/advanced-order-platform";
  if (slashPath.endsWith(javaRootMarker)) {
    return "<java>";
  }
  const javaMarker = `${javaRootMarker}/`;
  const javaIndex = slashPath.indexOf(javaMarker);
  if (javaIndex >= 0) {
    return `<java>${slashPath.slice(javaIndex + javaMarker.length - 1)}`;
  }

  const miniKvRootMarker = "/mini-kv";
  if (slashPath.endsWith(miniKvRootMarker)) {
    return "<mini-kv>";
  }
  const miniKvMarker = `${miniKvRootMarker}/`;
  const miniKvIndex = slashPath.indexOf(miniKvMarker);
  if (miniKvIndex >= 0) {
    return `<mini-kv>${slashPath.slice(miniKvIndex + miniKvMarker.length - 1)}`;
  }

  return slashPath;
}
