# 第五十八版代码讲解：mini-kv KEYSJSON key inventory 接入

本版目标来自：

```text
docs/plans/v56-post-dashboard-control-roadmap.md
Node v58：mini-kv KEYSJSON 接入与 key inventory 面板
```

mini-kv v47 已经提供：

```text
KEYSJSON [prefix]
```

Node v58 的工作是只读消费这个能力，不新增 mini-kv 写操作、不展示 value 明文、不做大规模 scan。

## 1. MiniKvClient：新增 KEYSJSON 类型和解析

文件：

```text
src/clients/miniKvClient.ts
```

新增结构：

```ts
export interface MiniKvKeysJson {
  prefix?: string | null;
  key_count?: number;
  keys?: string[];
  truncated?: boolean;
  limit?: number;
}
```

客户端方法：

```ts
async keysJson(prefix?: string): Promise<MiniKvKeysJsonResult> {
  const normalizedPrefix = normalizeOptionalPrefix(prefix);
  const result = await this.execute(normalizedPrefix === undefined ? "KEYSJSON" : `KEYSJSON ${normalizedPrefix}`);
  return {
    ...result,
    inventory: parseMiniKvKeysJson(result.response),
  };
}
```

这里复用已有 TCP `execute()`，所以超时、连接错误、单行响应读取方式都和其他 mini-kv 命令一致。

`parseMiniKvKeysJson()` 做结构校验：

```ts
if ("keys" in inventory && (!Array.isArray(inventory.keys) || !inventory.keys.every((key) => typeof key === "string"))) {
  throw new AppHttpError(502, "MINIKV_KEYSJSON_INVALID", "mini-kv KEYSJSON keys field must be a string array");
}
```

这让 Node 不再解析 `KEYS` 文本，而是消费稳定 JSON。

## 2. Gateway 白名单：允许 KEYSJSON

文件：

```text
src/clients/miniKvClient.ts
```

`validateRawGatewayCommand()` 现在允许：

```ts
"KEYSJSON",
```

注意：raw command route 仍然走 `UPSTREAM_ACTIONS_ENABLED`，所以这里是命令白名单补全，不代表默认允许 Dashboard 直接执行 raw command。

## 3. Probe route：只读 key inventory

文件：

```text
src/routes/miniKvRoutes.ts
```

新增路由：

```ts
app.get<{ Querystring: KeyInventoryQuery }>("/api/v1/mini-kv/keys", {
  schema: {
    querystring: {
      type: "object",
      properties: {
        prefix: { type: "string", minLength: 1, maxLength: 160, pattern: "^[A-Za-z0-9:_-]+$" },
      },
      additionalProperties: false,
    },
  },
}, async (request) => {
  assertUpstreamProbesEnabled(deps.upstreamProbesEnabled, "mini-kv");
  return deps.miniKv.keysJson(request.query.prefix);
});
```

这个路由用 `UPSTREAM_PROBES_ENABLED`，不是 `UPSTREAM_ACTIONS_ENABLED`。原因是 `KEYSJSON` 是只读 inventory，用于观察和预演。

## 4. Snapshot：探测 KEYSJSON 可用性

文件：

```text
src/services/opsSnapshotService.ts
```

mini-kv probe 现在同时读取：

```ts
this.miniKvClient.ping()
this.miniKvClient.health()
this.miniKvClient.statsJson()
this.probeMiniKvInfoJson()
this.probeMiniKvCommandCatalog()
this.probeMiniKvKeyInventory()
```

`probeMiniKvKeyInventory()` 把结果保存为：

```ts
{
  status: "available",
  latencyMs: response.latencyMs,
  inventory: response.inventory,
}
```

如果 `KEYSJSON` 不可用，mini-kv 仍然可观察，但状态会降级为 `degraded`，message 会出现：

```text
key_inventory=unavailable
```

## 5. Upstream overview：加入 inventory 信号

文件：

```text
src/services/upstreamOverview.ts
```

mini-kv signals 新增：

```ts
keyInventoryAvailable: keyInventory !== undefined,
keyInventoryLatencyMs: readMiniKvKeyInventoryLatency(probe.details),
keyInventoryPrefix: readNullableString(keyInventory, "prefix"),
keyInventoryKeyCount: readNumber(keyInventory, "key_count"),
keyInventoryTruncated: readBoolean(keyInventory, "truncated"),
keyInventoryLimit: readNumber(keyInventory, "limit"),
keyInventorySampleKeys: readStringArray(keyInventory, "keys")?.slice(0, 20) ?? [],
```

`readSignals` 也从旧的文本 `KEYS prefix` 更新为：

```ts
"KEYSJSON [prefix]"
```

## 6. Dashboard：mini-kv key inventory 面板

文件：

```text
src/ui/dashboard.ts
```

mini-kv 卡片新增：

```html
<input id="kvPrefix" placeholder="Key prefix" value="orderops:">
<button data-action="kvInventory">Key Inventory</button>
```

展示字段：

```text
Inventory: prefix / count
Truncated: yes/no / limit
Keys: key 列表
```

刷新函数：

```js
async function refreshMiniKvKeyInventory() {
  const prefix = $("kvPrefix").value.trim();
  const query = prefix.length > 0 ? "?prefix=" + encodeURIComponent(prefix) : "";
  const inventory = await api("/api/v1/mini-kv/keys" + query);
  renderMiniKvKeyInventory(inventory);
  return inventory;
}
```

Dashboard 只展示 key 名，不读取 value。

## 7. 测试覆盖

新增：

```text
test/miniKvKeyInventory.test.ts
```

覆盖默认阻断：

```ts
expect(response.statusCode).toBe(403);
expect(response.json()).toMatchObject({
  error: "UPSTREAM_PROBES_DISABLED",
});
```

覆盖 probe 开启时通过本地 TCP mock 读取：

```ts
expect(response.json()).toMatchObject({
  command: "KEYSJSON orderops:",
  inventory: {
    prefix: "orderops:",
    key_count: 2,
    keys: ["orderops:1", "orderops:2"],
    truncated: false,
    limit: 1000,
  },
});
```

并更新：

```text
test/miniKvCommandValidation.test.ts
test/opsSnapshotService.test.ts
test/upstreamOverview.test.ts
test/dashboard.test.ts
```

## 8. 本版不做

```text
不新增 SET / DEL 操作能力
不做 key 编辑器
不展示 value 明文
不做大规模 key scan
不修改 Java 或 mini-kv 项目
```
