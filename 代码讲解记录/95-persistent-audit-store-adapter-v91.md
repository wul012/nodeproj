# 95. Node v91 Persistent audit store adapter 代码讲解

## 1. 抽出 AuditStore 接口

`src/services/auditLog.ts` 新增：

```ts
export interface AuditStore {
  record(event: AuditEvent): void;
  list(limit: number): AuditEvent[];
  clear(): void;
  size(): number;
}
```

这让 `AuditLog` 不再直接依赖内部数组，为后续文件、数据库或队列审计存储留出替换点。

## 2. 默认行为仍是内存存储

`AuditLog` 构造函数默认仍创建 `InMemoryAuditStore`：

```ts
this.store = options.store ?? new InMemoryAuditStore(this.capacity);
```

所以现有 `new AuditLog()`、`new AuditLog(5)` 行为不变，路由和 Dashboard 不需要改。

## 3. FileBackedAuditStore 是 JSONL prototype

新增的 `FileBackedAuditStore` 会把每条事件追加为一行 JSON：

```ts
appendFileSync(this.filePath, `${JSON.stringify(event)}\n`, "utf8");
```

启动时会读取已有 JSONL，恢复最近 capacity 条事件到内存索引：

```ts
readFileSync(this.filePath, "utf8")
  .split(/\r?\n/)
  .filter(...)
  .map(parseAuditEvent)
```

这是 prototype，不是最终数据库实现，但已经证明审计 store 可以替换。

## 4. AuditLog 的公开 API 没变

`record()` 仍负责生成标准化事件：

```ts
method: input.method.toUpperCase()
path: normalizePath(input.path)
routeGroup: routeGroupForPath(input.path)
outcome: outcomeForStatus(input.statusCode)
```

区别只是最后改成：

```ts
this.store.record(event);
```

`list()`、`summary()`、`clear()` 也都走 store。

## 5. 测试证明没有回退

`test/auditLog.test.ts` 新增两类测试：

```ts
keeps default behavior through the in-memory store adapter
can persist audit events through the file-backed store prototype
```

file-backed 测试会新建临时 JSONL 文件、写入事件、重新创建 store，然后确认事件能恢复：

```ts
expect(restored.list().map((event) => event.requestId)).toEqual(["req-2", "req-1"]);
```

这就是 v91 的小闭环：默认行为不变，同时具备向持久化迁移的工程落点。
