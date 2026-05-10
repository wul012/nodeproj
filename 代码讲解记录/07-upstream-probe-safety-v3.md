# 第七次讲解：第三版上游探测安全开关

第三版解决一个很现实的问题：

```text
Java 高并发订单项目和 mini-kv 可能正在开发调试
Node 控制台不能因为 Dashboard 自动刷新就持续探测它们
```

所以 V3 新增：

```text
UPSTREAM_PROBES_ENABLED=false
```

默认关闭上游状态探测。

这样访问 Dashboard、SSE 或 `/api/v1/sources/status` 时，Node 只返回 disabled 状态，不连接 Java / mini-kv。

---

# 1. config.ts 新增配置项

实际代码：

```ts
export interface AppConfig {
  host: string;
  port: number;
  logLevel: string;
  orderPlatformUrl: string;
  orderPlatformTimeoutMs: number;
  miniKvHost: string;
  miniKvPort: number;
  miniKvTimeoutMs: number;
  opsSampleIntervalMs: number;
  upstreamProbesEnabled: boolean;
}
```

新增字段是：

```text
upstreamProbesEnabled
```

含义是：

```text
true
 -> 允许状态采样连接 Java / mini-kv

false
 -> 状态采样只返回 disabled，不连接上游
```

---

# 2. config.ts 解析布尔值

实际代码：

```ts
function readBoolean(env: NodeJS.ProcessEnv, key: string, fallback: boolean): boolean {
  const raw = env[key]?.trim().toLowerCase();
  if (!raw) {
    return fallback;
  }

  if (["1", "true", "yes", "on"].includes(raw)) {
    return true;
  }

  if (["0", "false", "no", "off"].includes(raw)) {
    return false;
  }

  return fallback;
}
```

这个函数支持多种写法。

会识别为 `true` 的值：

```text
1
true
yes
on
```

会识别为 `false` 的值：

```text
0
false
no
off
```

其他无法识别的值回到默认值。

---

# 3. 默认关闭上游探测

实际代码：

```ts
upstreamProbesEnabled: readBoolean(env, "UPSTREAM_PROBES_ENABLED", false),
```

默认值是：

```text
false
```

这意味着：

```text
不设置环境变量
 -> 不探测 Java / mini-kv
```

如果需要联调，需要显式设置：

```powershell
$env:UPSTREAM_PROBES_ENABLED = "true"
```

---

# 4. .env.example 记录安全默认值

实际内容：

```text
OPS_SAMPLE_INTERVAL_MS=2000
UPSTREAM_PROBES_ENABLED=false
```

这让使用者一眼能看出：

```text
状态采样间隔是 2 秒
但默认不自动探测上游
```

---

# 5. SourceState 增加 disabled

实际代码：

```ts
export type SourceState = "online" | "offline" | "degraded" | "disabled";
```

前三个状态表示已经探测过：

```text
online
offline
degraded
```

第三版新增的 `disabled` 表示：

```text
没有探测
因为配置禁止自动探测
```

这比把它显示成 `offline` 更准确。

---

# 6. OpsSnapshotService 注入开关

实际代码：

```ts
export class OpsSnapshotService {
  constructor(
    private readonly orderPlatformClient: OrderPlatformClient,
    private readonly miniKvClient: MiniKvClient,
    private readonly upstreamProbesEnabled: boolean,
  ) {}
```

`OpsSnapshotService` 现在除了两个 client，还持有：

```text
upstreamProbesEnabled
```

这个字段决定 `sample()` 时到底要不要调用上游。

---

# 7. app.ts 传入配置

实际代码：

```ts
const snapshots = new OpsSnapshotService(orderPlatform, miniKv, config.upstreamProbesEnabled);
```

也就是说：

```text
config.ts 读环境变量
 -> app.ts 创建 OpsSnapshotService
 -> OpsSnapshotService 根据开关决定是否探测
```

---

# 8. Java 探测短路

实际代码：

```ts
private async probeOrderPlatform(): Promise<ProbeResult> {
  const sampledAt = new Date().toISOString();
  if (!this.upstreamProbesEnabled) {
    return disabledProbe("advanced-order-platform", sampledAt);
  }

  try {
    const response = await this.orderPlatformClient.health();
```

关键点是：

```ts
if (!this.upstreamProbesEnabled) {
  return disabledProbe(...);
}
```

这行在调用 `orderPlatformClient.health()` 之前。

所以当开关关闭时，根本不会发 HTTP 请求到 Java。

---

# 9. mini-kv 探测短路

实际代码：

```ts
private async probeMiniKv(): Promise<ProbeResult> {
  const sampledAt = new Date().toISOString();
  if (!this.upstreamProbesEnabled) {
    return disabledProbe("mini-kv", sampledAt);
  }

  try {
    const [ping, size] = await Promise.all([this.miniKvClient.ping(), this.miniKvClient.size()]);
```

同理，这个判断在：

```ts
this.miniKvClient.ping()
this.miniKvClient.size()
```

之前。

所以关闭探测时，不会建立 TCP 连接到 mini-kv。

---

# 10. disabledProbe

实际代码：

```ts
function disabledProbe(name: string, sampledAt: string): ProbeResult {
  return {
    name,
    state: "disabled",
    sampledAt,
    message: "Upstream probes are disabled by UPSTREAM_PROBES_ENABLED=false",
  };
}
```

这个函数统一返回 disabled 状态。

页面会看到类似：

```json
{
  "name": "mini-kv",
  "state": "disabled",
  "message": "Upstream probes are disabled by UPSTREAM_PROBES_ENABLED=false"
}
```

这比 `ECONNREFUSED` 更符合当前目的：

```text
不是上游挂了
而是 Node 没有去碰它
```

---

# 11. Dashboard 增加 disabled 样式

实际代码：

```css
.disabled {
  color: #475467;
  background: #f2f4f7;
  border-color: #d0d5dd;
}
```

Dashboard 的 badge 更新逻辑仍然不变：

```js
function setBadge(id, state) {
  const el = $(id);
  el.className = "badge " + state;
  el.textContent = state;
}
```

当后端返回：

```text
state = disabled
```

前端会自动得到：

```html
class="badge disabled"
```

---

# 12. README 说明安全默认值

README 新增：

```md
- Safe default upstream probe mode with `UPSTREAM_PROBES_ENABLED=false`
```

并说明：

```md
By default, upstream probes are disabled so the dashboard does not automatically touch the Java or mini-kv processes while they are being debugged.
```

这把项目边界写进了文档。

---

# 13. config 测试

实际代码：

```ts
expect(config.upstreamProbesEnabled).toBe(false);
```

默认配置测试确认：

```text
UPSTREAM_PROBES_ENABLED 不设置时是 false
```

布尔解析测试：

```ts
expect(loadConfig({ UPSTREAM_PROBES_ENABLED: "1" }).upstreamProbesEnabled).toBe(true);
expect(loadConfig({ UPSTREAM_PROBES_ENABLED: "yes" }).upstreamProbesEnabled).toBe(true);
expect(loadConfig({ UPSTREAM_PROBES_ENABLED: "off" }).upstreamProbesEnabled).toBe(false);
expect(loadConfig({ UPSTREAM_PROBES_ENABLED: "not-a-bool" }).upstreamProbesEnabled).toBe(false);
```

这保证环境变量解析稳定。

---

# 14. OpsSnapshotService 测试

实际代码：

```ts
const orderPlatform = new OrderPlatformClient("http://127.0.0.1:1", 1);
const miniKv = new MiniKvClient("127.0.0.1", 1, 1);
const service = new OpsSnapshotService(orderPlatform, miniKv, false);

const snapshot = await service.sample();
```

这里故意使用不可用地址：

```text
http://127.0.0.1:1
127.0.0.1:1
```

如果服务真的去连接上游，测试就可能报错或变慢。

断言是：

```ts
expect(snapshot.javaOrderPlatform.state).toBe("disabled");
expect(snapshot.miniKv.state).toBe("disabled");
```

这证明关闭探测时，`sample()` 不依赖真实 Java / mini-kv。

---

# 总结

第三版新增的是安全运行边界：

```text
UPSTREAM_PROBES_ENABLED=false
 -> Dashboard / SSE / sources status 不自动连接 Java / mini-kv

UPSTREAM_PROBES_ENABLED=true
 -> 需要联调时再显式打开
```

一句话总结：V3 让 `orderops-node` 可以在另外两个项目正在开发调试时安静运行，只观察自己，不打扰上游。
