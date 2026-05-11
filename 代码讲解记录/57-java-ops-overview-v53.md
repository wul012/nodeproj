# 57 - v53 Java Ops Overview 接入

## 本版角色

v53 继续沿着 v52 的统一只读观察台推进。这一版不新增 Java 写操作，也不碰 mini-kv 协议，而是让 Node 能读 Java v36 的业务概览：

```text
Node /api/v1/upstreams/overview
 -> Java /actuator/health
 -> Java /api/v1/ops/overview
 -> 汇总 health + business overview
```

如果 Java `/api/v1/ops/overview` 不可用，Node 不会让整个 overview 接口失败，而是把 Java 观察状态降级为 `degraded`，并保留 fallback 信息。

## Java 客户端新增 opsOverview

文件：`src/clients/orderPlatformClient.ts`

v53 先定义 Java v36 overview 的最小结构：

```ts
export interface OrderPlatformOpsOverview {
  sampledAt?: string;
  application?: {
    name?: string;
    profiles?: string[];
    startedAt?: string;
    uptimeSeconds?: number;
  };
  orders?: {
    total?: number;
  };
  inventory?: {
    items?: number;
  };
  outbox?: {
    pending?: number;
  };
  failedEvents?: {
    total?: number;
    pendingReplayApprovals?: number;
    latestFailedAt?: string | null;
  };
}
```

这里所有字段都用可选字段，是为了让 Node 对 Java 契约保持兼容。Java 后续如果多加字段，Node 不会受影响；Java 暂时少字段，Node 也可以展示已有部分。

新增的客户端方法很薄：

```ts
opsOverview(): Promise<UpstreamJsonResponse<OrderPlatformOpsOverview>> {
  return this.request("/api/v1/ops/overview");
}
```

它复用同一个 `request()`，所以 timeout、HTTP error、JSON 解析和 `AppHttpError` 包装都沿用原有 Java client 逻辑。

## OpsSnapshotService 同时读 health 和 overview

文件：`src/services/opsSnapshotService.ts`

Java 探测仍然先看 health：

```ts
const response = await this.orderPlatformClient.health();
const status = readStatus(response.data);
```

然后再读业务概览：

```ts
const opsOverview = await this.probeOrderPlatformOpsOverview();
const overviewData = opsOverview.status === "available" ? opsOverview.data : undefined;
```

`probeOrderPlatformOpsOverview()` 是 v53 的关键 fallback：

```ts
private async probeOrderPlatformOpsOverview(): Promise<OrderPlatformOpsOverviewProbe> {
  try {
    const response = await this.orderPlatformClient.opsOverview();
    return {
      status: "available",
      latencyMs: response.latencyMs,
      data: response.data,
    };
  } catch (error) {
    return {
      status: "unavailable",
      message: error instanceof Error ? error.message : String(error),
    };
  }
}
```

这段代码的意义是：Java health 和 Java business overview 是两个层级。health 失败时 Java 离线；health 成功但 overview 失败时，Java 不是离线，而是业务观察信号不完整。

状态计算也体现这个分层：

```ts
const state = status === "UP" && opsOverview.status === "available"
  ? "online"
  : status === "UP"
    ? "degraded"
    : "degraded";
```

也就是说：

```text
health UP + ops overview available   -> online
health UP + ops overview unavailable -> degraded
health not UP                        -> degraded
health request failed                -> offline
```

返回 details 时，v53 保留两个信号：

```ts
details: {
  health: response,
  opsOverview,
}
```

后续 `upstreamOverview`、Dashboard、promotion evidence 都能复用这份采样结果，不需要二次请求 Java。

## UpstreamOverview 提取业务信号

文件：`src/services/upstreamOverview.ts`

v53 在 Java observation 里先取业务概览：

```ts
const businessOverview = readJavaBusinessOverview(probe.details);
```

然后把 Java 的能力和只读信号补全：

```ts
capabilities: [
  "actuator health",
  "order query and lifecycle commands",
  "outbox event visibility",
  "failed event management and approval flow",
  "ops business overview",
],
readSignals: [
  "GET /actuator/health",
  "GET /api/v1/ops/overview",
  "GET /api/v1/orders/:orderId",
  "GET /api/v1/outbox/events",
  "GET /api/v1/failed-events",
],
```

`signals` 里多了业务字段：

```ts
signals: {
  healthStatus: readJavaHealthStatus(probe.details),
  componentNames: readJavaComponentNames(probe.details),
  businessOverviewAvailable: businessOverview !== undefined,
  businessOverviewLatencyMs: readJavaBusinessOverviewLatency(probe.details),
  application: readRecord(businessOverview, "application"),
  orders: readRecord(businessOverview, "orders"),
  inventory: readRecord(businessOverview, "inventory"),
  outbox: readRecord(businessOverview, "outbox"),
  failedEvents: readRecord(businessOverview, "failedEvents"),
  businessSampledAt: readString(businessOverview, "sampledAt"),
},
```

这样 Node 的统一上游观察台就不只是知道 Java 活着，还知道订单、库存、Outbox、失败事件的大致运行状态。

## 兼容 v52 的 health 读取

v52 的 Java details 直接是 health JSON。v53 的 details 变成：

```text
details.health.data
details.opsOverview
```

所以 `readJavaHealthStatus()` 先尝试读新结构：

```ts
const healthData = readJavaHealthData(details);
if (healthData !== undefined) {
  const status = healthData.status;
  return typeof status === "string" ? status : undefined;
}
```

再回退到 v52 的旧结构：

```ts
if (!isRecord(details)) {
  return undefined;
}
const status = details.status;
return typeof status === "string" ? status : undefined;
```

这保证测试、旧采样对象和未来扩展都更稳。

## 测试覆盖

文件：`test/opsSnapshotService.test.ts`

正常路径验证 Java overview 被采样：

```ts
expect(snapshot.javaOrderPlatform.state).toBe("online");
expect(snapshot.javaOrderPlatform.message).toContain("orders=2");
expect(snapshot.javaOrderPlatform.details).toMatchObject({
  opsOverview: {
    status: "available",
    data: {
      orders: {
        total: 2,
      },
    },
  },
});
```

fallback 路径验证 overview 失败不拖垮 Node：

```ts
expect(snapshot.javaOrderPlatform.state).toBe("degraded");
expect(snapshot.javaOrderPlatform.message).toContain("ops_overview=unavailable");
expect(snapshot.javaOrderPlatform.details).toMatchObject({
  opsOverview: {
    status: "unavailable",
    message: "not found",
  },
});
```

文件：`test/upstreamOverview.test.ts`

overview 测试验证业务信号能进入统一观察对象：

```ts
expect(overview.upstreams.javaOrderPlatform).toMatchObject({
  signals: {
    healthStatus: "UP",
    businessOverviewAvailable: true,
    application: {
      name: "advanced-order-platform",
    },
    orders: {
      total: 7,
    },
  },
});
```

## 一句话总结

v53 把 Java 从“只有健康检查的上游”推进成“能提供业务运行概览的交易核心上游”，同时保留 fallback：Java overview 不可用时，Node 仍然能安全返回统一观察结果。
