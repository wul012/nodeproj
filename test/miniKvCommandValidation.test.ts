import { describe, expect, it } from "vitest";

import { parseMiniKvStatsJson, validateRawGatewayCommand } from "../src/clients/miniKvClient.js";

describe("validateRawGatewayCommand", () => {
  it("allows safe mini-kv gateway commands", () => {
    expect(() => validateRawGatewayCommand("PING orderops")).not.toThrow();
    expect(() => validateRawGatewayCommand("SET orderops:demo value")).not.toThrow();
    expect(() => validateRawGatewayCommand("EXPIRE orderops:demo 30")).not.toThrow();
    expect(() => validateRawGatewayCommand("HEALTH")).not.toThrow();
    expect(() => validateRawGatewayCommand("STATSJSON")).not.toThrow();
    expect(() => validateRawGatewayCommand("KEYS orderops:")).not.toThrow();
  });

  it("rejects filesystem-style commands and multiline input", () => {
    expect(() => validateRawGatewayCommand("SAVE data/snapshot")).toThrow(/not allowed/);
    expect(() => validateRawGatewayCommand("PING ok\nSIZE")).toThrow(/single non-empty line/);
  });

  it("parses mini-kv STATSJSON objects and rejects invalid output", () => {
    expect(parseMiniKvStatsJson('{"live_keys":2,"wal_enabled":true}')).toMatchObject({
      live_keys: 2,
      wal_enabled: true,
    });
    expect(() => parseMiniKvStatsJson("OK")).toThrow(/invalid STATSJSON/);
    expect(() => parseMiniKvStatsJson("[1,2,3]")).toThrow(/must be a JSON object/);
  });
});
