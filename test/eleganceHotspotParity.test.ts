import { createHash } from "node:crypto";

import { describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

const FIXED_TIME = "2026-07-12T00:00:00.000Z";
const FALLBACK_ENV = "ORDEROPS_FORCE_HISTORICAL_FIXTURE_FALLBACK";

const SURFACES = [
  {
    route:
      "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verification",
    suffix: "",
  },
  {
    route:
      "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-artifact-intake-preflight-archive-verification",
    suffix: "?format=markdown",
  },
  {
    route:
      "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verification",
    suffix: "",
  },
  {
    route:
      "/api/v1/audit/managed-audit-manual-sandbox-connection-credential-resolver-java-mini-kv-declared-operator-lifecycle-runtime-execution-packet-stop-record-archive-verification",
    suffix: "?format=markdown",
  },
] as const;

const EXPECTED_BY_FINGERPRINT = {
  a8ede468a22d0a3afa7d80c7d1a2d59c07745499e921c1e4ed03c24d7faac44d: [
    { status: 200, bytes: 15_313, sha256: "37aaf8e0ec5cc754a783259d270ba095f1d4dfe5b5763ed8b8a62c7787c10c69" },
    { status: 200, bytes: 13_438, sha256: "e504ef0613644677a99ff176b1ffe74bef3b19931c6679ddbf93c65c268e6d9f" },
    { status: 200, bytes: 14_866, sha256: "20e8330020dcc06f6da9be9a79619c594148575e27b6efb674e61f27df6afe18" },
    { status: 200, bytes: 13_030, sha256: "5fe69afb9d9a27ed623b379d33dc153f6de8b86a97581b0a174d2433147fb021" },
  ],
  c5574c92db8882db34b743bee1b1f40f271e5156dbd6a18037b59afa82d18e10: [
    { status: 200, bytes: 15_313, sha256: "3e89c7a8ec6c88036af0e1d4b3ea1cad06624bcaad0131da25c7ca9b9d7b7358" },
    { status: 200, bytes: 13_438, sha256: "4a52e9d7caf714f7da211a807d2ff5f1c6eee5a499f9adf3b1c3a4cf73d608e1" },
    { status: 200, bytes: 14_866, sha256: "d2bac07b98e1a0597d8715230051d76733adeba9673f9cb02f31c37817d60897" },
    { status: 200, bytes: 13_030, sha256: "1b83f12603df7dc26b4841245e07c00c31b52f326e03de974302d0ac4ca41175" },
  ],
  "98e84ad873f030407358291188cefa20a116f4e2bfd85815464b25520669625d": [
    { status: 200, bytes: 15_313, sha256: "6a2893de7399763663555b44641103fd66aabbcfa544bd4bb3177e5ffcadb756" },
    { status: 200, bytes: 13_438, sha256: "e9a58b1d1bc3b9d135c4248f20ecbb628b183cf2075847733719bca56b53ab21" },
    { status: 200, bytes: 14_866, sha256: "a3d14081dea7b3b5f0b078d0da80feed08f38c05c96ae79ee218e9b5c7ecb30f" },
    { status: 200, bytes: 13_030, sha256: "2b44c241f6509be833c067ae36660c60d8242c0c0888d68f1aa0d228c92cb268" },
  ],
} as const;

describe("elegance hotspot response parity", () => {
  it("matches v2194 bytes for the detected evidence fingerprint", async () => {
    const realDate = Date;
    const previousFallback = process.env[FALLBACK_ENV];
    globalThis.Date = createFixedDate(realDate, FIXED_TIME);
    process.env[FALLBACK_ENV] = "true";
    const app = await buildApp(createTestConfig());

    try {
      const actual = [];
      const profiles: unknown[] = [];
      for (const surface of SURFACES) {
        const response = await app.inject({
          method: "GET",
          url: `${surface.route}${surface.suffix}`,
          headers: completeHeaders(),
        });
        actual.push({
          status: response.statusCode,
          bytes: Buffer.byteLength(response.body),
          sha256: createHash("sha256").update(response.body).digest("hex"),
        });
        if (surface.suffix === "") profiles.push(response.json());
      }

      const fingerprint = createEvidenceFingerprint(profiles);
      expect(actual).toEqual(expectedForFingerprint(fingerprint));
    } finally {
      await app.close();
      globalThis.Date = realDate;
      restoreEnv(previousFallback);
    }
  }, 180_000);

  it("fails closed for an unregistered evidence fingerprint", () => {
    expect(() => expectedForFingerprint("0".repeat(64)))
      .toThrow(/Unregistered evidence fingerprint/);
  });
});

function createEvidenceFingerprint(profiles: readonly unknown[]): string {
  const signals: string[] = [];
  profiles.forEach((profile, index) => {
    collectEvidenceSignals(profile, `response[${index}]`, signals);
  });
  signals.sort();
  return createHash("sha256").update(JSON.stringify(signals)).digest("hex");
}

function collectEvidenceSignals(value: unknown, path: string, signals: string[]): void {
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      collectEvidenceSignals(item, `${path}[${index}]`, signals);
    });
    return;
  }
  if (value === null || typeof value !== "object") return;

  for (const [key, child] of Object.entries(value)) {
    const childPath = `${path}.${key}`;
    if (key === "byteLength" || /digest$/i.test(key)) {
      signals.push(`${childPath}=${String(child)}`);
    } else {
      collectEvidenceSignals(child, childPath, signals);
    }
  }
}

function expectedForFingerprint(fingerprint: string) {
  const expected = EXPECTED_BY_FINGERPRINT[
    fingerprint as keyof typeof EXPECTED_BY_FINGERPRINT
  ];
  if (!expected) throw new Error(`Unregistered evidence fingerprint: ${fingerprint}`);
  return expected;
}

function createFixedDate(realDate: DateConstructor, iso: string): DateConstructor {
  const fixedMillis = realDate.parse(iso);
  return new Proxy(realDate, {
    apply(target, thisArg, args) {
      if (args.length === 0) return new realDate(fixedMillis).toString();
      return Reflect.apply(target, thisArg, args);
    },
    construct(target, args) {
      return Reflect.construct(target, args.length === 0 ? [fixedMillis] : args);
    },
    get(target, property, receiver) {
      if (property === "now") return () => fixedMillis;
      return Reflect.get(target, property, receiver);
    },
  }) as DateConstructor;
}

function completeHeaders() {
  return {
    "x-orderops-operator-id": "elegance-audit",
    "x-orderops-roles": "admin,auditor,operator,viewer",
    "x-orderops-operator-verified": "true",
    "x-orderops-approval-correlation-id": "approval-elegance-audit",
  };
}

function createTestConfig() {
  return loadConfig({
    LOG_LEVEL: "silent",
    UPSTREAM_PROBES_ENABLED: "false",
    UPSTREAM_ACTIONS_ENABLED: "false",
    ACCESS_GUARD_ENFORCEMENT_ENABLED: "true",
    ORDEROPS_AUTH_TOKEN_ISSUER: "orderops-test",
    ORDEROPS_AUTH_TOKEN_SECRET: "test-secret",
    ORDEROPS_IDP_ISSUER: "https://idp.example",
    ORDEROPS_IDP_AUDIENCE: "orderops-node",
    ORDEROPS_IDP_JWKS_URL: "https://idp.example/.well-known/jwks.json",
    ORDEROPS_IDP_CLOCK_SKEW_SECONDS: "90",
  });
}

function restoreEnv(previous: string | undefined): void {
  if (previous === undefined) delete process.env[FALLBACK_ENV];
  else process.env[FALLBACK_ENV] = previous;
}
