# version 89 release approval ContextHeaderField refactor

## 1. 这一版做什么

v89 是 contract-preserving refactor。

它新增 `ContextHeaderField` record，用来统一表达 release approval rehearsal 里反复出现的 header 三元组：

```text
value
source
echoed
```

响应 JSON 字段、字段顺序、schema version、warning digest 语义和 read-only 边界都不变。

## 2. 为什么拆

之前 `ReleaseApprovalRehearsalHintBuilder` 和 `ReleaseApprovalRehearsalHandoffHintBuilder` 里大量重复：

```text
valueOrPlaceholder(normalizedValue, placeholder)
sourceFor(normalizedValue, headerName)
boolean xxxEchoed = normalizedValue != null
```

这种重复不是业务逻辑，但会让后续维护时更容易漏改 value/source/echoed 三者之一。

## 3. 新 record

新增文件：

```text
ContextHeaderField.java
```

核心方法：

```text
from(normalizedValue, headerName, placeholder)
addMissingWarning(warnings, warning)
allEchoed(fields...)
```

其中 `from` 会在 header 缺失时生成：

```text
value=<placeholder>
source=NOT_SUPPLIED
echoed=false
```

header 存在时生成：

```text
value=<normalizedValue>
source=<headerName>
echoed=true
```

## 4. 改了哪些 builder

`ReleaseApprovalRehearsalHintBuilder`：

- request context
- operator window
- CI evidence
- artifact retention
- live readiness

`ReleaseApprovalRehearsalHandoffHintBuilder`：

- audit persistence handoff
- approval record handoff

这两处 builder 删除了各自私有的 `valueOrPlaceholder`、`sourceFor`、`addMissingContextWarning` helper，改为复用 `ContextHeaderField`。

## 5. 行为边界

本版没有新增任何 marker 或 receipt，也没有触碰生产行为：

- 不写 approval ledger
- 不执行 SQL
- 不读取 credential value
- 不打开 managed audit connection
- 不触发 deployment / rollback / restore
- 不改变 existing JSON contract

## 6. 测试覆盖

现有 `OpsEvidenceServiceTests` 和 `OpsOverviewIntegrationTests` 覆盖了默认缺 header、完整 header、warning 列表、source 字段、echoed 字段和 digest 稳定性。

通过这些测试可以证明 refactor 后外部响应未漂移。

## 7. 一句话总结

v89 把 release approval rehearsal 的 header value/source/echoed 噪声收成一个小 record，为 v90 继续做 normalization / missing warning helper 收敛铺路，同时保持所有只读边界不变。
