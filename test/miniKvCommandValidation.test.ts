import { describe, expect, it } from "vitest";

import { validateRawGatewayCommand } from "../src/clients/miniKvClient.js";

describe("validateRawGatewayCommand", () => {
  it("allows safe mini-kv gateway commands", () => {
    expect(() => validateRawGatewayCommand("PING orderops")).not.toThrow();
    expect(() => validateRawGatewayCommand("SET orderops:demo value")).not.toThrow();
    expect(() => validateRawGatewayCommand("EXPIRE orderops:demo 30")).not.toThrow();
  });

  it("rejects filesystem-style commands and multiline input", () => {
    expect(() => validateRawGatewayCommand("SAVE data/snapshot")).toThrow(/not allowed/);
    expect(() => validateRawGatewayCommand("PING ok\nSIZE")).toThrow(/single non-empty line/);
  });
});
