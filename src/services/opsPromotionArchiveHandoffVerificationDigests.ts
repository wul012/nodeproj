import { digestStable } from "./stableDigest.js";

interface HandoffVerificationComparable<Name extends string = string, Source extends string = string> {
  name: Name;
  valid: boolean;
  source: Source;
  digest: {
    algorithm: "sha256";
    value: string;
  };
}

export function missingHandoffVerificationDigest(name: string) {
  return {
    algorithm: "sha256" as const,
    value: digestStable({ missing: name }),
  };
}

export function compareHandoffVerificationItem<Name extends string, Source extends string>(input: {
  actual: HandoffVerificationComparable<Name, Source>;
  expected: HandoffVerificationComparable<Name, Source> | undefined;
}) {
  const validMatches = input.expected?.valid === input.actual.valid;
  const sourceMatches = input.expected?.source === input.actual.source;
  const expectedDigest = input.expected?.digest ?? missingHandoffVerificationDigest(input.actual.name);
  const digestMatches = input.actual.digest.value === expectedDigest.value;

  return {
    name: input.actual.name,
    valid: input.expected !== undefined && validMatches && sourceMatches && digestMatches,
    validMatches,
    sourceMatches,
    digestMatches,
    actualDigest: { ...input.actual.digest },
    recomputedDigest: expectedDigest,
    source: input.actual.source,
  };
}
