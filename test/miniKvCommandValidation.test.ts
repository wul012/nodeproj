import { describe, expect, it } from "vitest";

import {
  parseMiniKvCommandsJson,
  parseMiniKvExplainJson,
  parseMiniKvInfoJson,
  parseMiniKvKeysJson,
  parseMiniKvStatsJson,
  validateRawGatewayCommand,
} from "../src/clients/miniKvClient.js";

describe("validateRawGatewayCommand", () => {
  it("allows safe mini-kv gateway commands", () => {
    expect(() => validateRawGatewayCommand("PING orderops")).not.toThrow();
    expect(() => validateRawGatewayCommand("SET orderops:demo value")).not.toThrow();
    expect(() => validateRawGatewayCommand("EXPIRE orderops:demo 30")).not.toThrow();
    expect(() => validateRawGatewayCommand("HEALTH")).not.toThrow();
    expect(() => validateRawGatewayCommand("STATSJSON")).not.toThrow();
    expect(() => validateRawGatewayCommand("INFOJSON")).not.toThrow();
    expect(() => validateRawGatewayCommand("COMMANDS")).not.toThrow();
    expect(() => validateRawGatewayCommand("COMMANDSJSON")).not.toThrow();
    expect(() => validateRawGatewayCommand("KEYS orderops:")).not.toThrow();
    expect(() => validateRawGatewayCommand("KEYSJSON orderops:")).not.toThrow();
    expect(() => validateRawGatewayCommand("EXPLAINJSON SET orderops:demo value")).not.toThrow();
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

  it("parses mini-kv INFOJSON objects and rejects invalid output", () => {
    expect(parseMiniKvInfoJson('{"version":"0.45.0","server":{"protocol":["inline","resp"],"uptime_seconds":3,"max_request_bytes":4096},"store":{"live_keys":1},"wal":{"enabled":false},"metrics":{"enabled":true}}')).toMatchObject({
      version: "0.45.0",
      server: {
        protocol: ["inline", "resp"],
      },
      metrics: {
        enabled: true,
      },
    });
    expect(() => parseMiniKvInfoJson("OK")).toThrow(/invalid INFOJSON/);
    expect(() => parseMiniKvInfoJson("[1,2,3]")).toThrow(/must be a JSON object/);
  });

  it("parses mini-kv COMMANDSJSON objects and rejects invalid output", () => {
    expect(parseMiniKvCommandsJson('{"commands":[{"name":"GET","category":"read","mutates_store":false,"touches_wal":false,"stable":true},{"name":"SET","category":"write","mutates_store":true,"touches_wal":true,"stable":true}]}')).toMatchObject({
      commands: [
        {
          name: "GET",
          category: "read",
        },
        {
          name: "SET",
          mutates_store: true,
        },
      ],
    });
    expect(() => parseMiniKvCommandsJson("OK")).toThrow(/invalid COMMANDSJSON/);
    expect(() => parseMiniKvCommandsJson("[1,2,3]")).toThrow(/must be a JSON object/);
    expect(() => parseMiniKvCommandsJson('{"commands":"GET"}')).toThrow(/commands field must be an array/);
  });

  it("parses mini-kv KEYSJSON inventory and rejects invalid output", () => {
    expect(parseMiniKvKeysJson('{"prefix":"orderops:","key_count":2,"keys":["orderops:1","orderops:2"],"truncated":false,"limit":1000}')).toMatchObject({
      prefix: "orderops:",
      key_count: 2,
      keys: ["orderops:1", "orderops:2"],
      truncated: false,
      limit: 1000,
    });
    expect(() => parseMiniKvKeysJson("key_count=2 keys=a b")).toThrow(/invalid KEYSJSON/);
    expect(() => parseMiniKvKeysJson("[1,2,3]")).toThrow(/must be a JSON object/);
    expect(() => parseMiniKvKeysJson('{"keys":"orderops:1"}')).toThrow(/keys field must be a string array/);
    expect(() => parseMiniKvKeysJson('{"key_count":"2"}')).toThrow(/key_count field must be a finite number/);
  });

  it("parses mini-kv EXPLAINJSON output and rejects invalid output", () => {
    expect(parseMiniKvExplainJson('{"command":"SET","category":"write","mutates_store":true,"touches_wal":true,"key":"orderops:1","requires_value":true,"ttl_sensitive":false,"allowed_by_parser":true,"warnings":[]}')).toMatchObject({
      command: "SET",
      category: "write",
      mutates_store: true,
      touches_wal: true,
      allowed_by_parser: true,
      warnings: [],
    });
    expect(() => parseMiniKvExplainJson("OK")).toThrow(/invalid EXPLAINJSON/);
    expect(() => parseMiniKvExplainJson("[1,2,3]")).toThrow(/must be a JSON object/);
    expect(() => parseMiniKvExplainJson('{"mutates_store":"yes"}')).toThrow(/mutates_store field must be a boolean/);
    expect(() => parseMiniKvExplainJson('{"warnings":"careful"}')).toThrow(/warnings field must be a string array/);
  });
});
