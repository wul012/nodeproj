import { digestStable } from "./stableDigest.js";

export function missingHandoffVerificationDigest(name: string) {
  return {
    algorithm: "sha256" as const,
    value: digestStable({ missing: name }),
  };
}
