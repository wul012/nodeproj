# 第九十版代码讲解：release approval context normalization helper

## 1. 这一版做什么

v90 还是 contract-preserving refactor。

它没有改 response schema，没有新增 marker，没有改 approval 语义，只是把 release approval rehearsal 里“上下文值归一化 + 缺失 warning 记录”这两件重复活，收进 `ContextHeaderField`。

这版的效果很朴素，但很值钱：后续再加 header 字段时，不需要在 response builder、hint builder、handoff builder 里到处复制 trim / blank / warning 逻辑。

## 2. 本版所处项目进度

最新计划来自：

```text
D:\nodeproj\orderops-node\docs\plans\v231-post-preflight-verification-roadmap.md
```

这份计划对 Java v90 的要求很明确：

```text
context normalization / missing warning helper 收敛
不引入 Lombok
不做全仓风格替换
不改 release approval 行为
```

也就是说，当前主线仍然处在 release approval / evidence assembly 阶段，目标不是扩功能，而是把已经成熟的证据构造链路收得更稳。

## 3. 这版改了哪些文件

新增或调整的文件只有四个：

```text
src/main/java/com/codexdemo/orderplatform/ops/ContextHeaderField.java
src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalRehearsalResponseBuilder.java
src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalRehearsalHintBuilder.java
src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalRehearsalHandoffHintBuilder.java
```

其中真正的收敛点在 `ContextHeaderField`。

## 4. ContextHeaderField 现在负责什么

`ContextHeaderField` 还是那个三元组：

```text
value
source
echoed
```

但 v90 以后，它还顺手接管了上下文值归一化：

```text
normalizeValue(value)
from(value, headerName, placeholder)
normalized(warnings, value, headerName, placeholder, warning)
```

也就是说：

```text
raw header value
 -> trim / blank-to-null
 -> 选择真实 header 或 placeholder
 -> 决定 source 与 echoed
 -> 追加 missing warning
```

这一步把“值的形态”和“缺失告警”绑回到同一个小对象里了。

## 5. ResponseBuilder 为什么要动

`ReleaseApprovalRehearsalResponseBuilder` 以前自己藏着一个本地 `normalizeHeaderValue(...)`。

v90 把这个 helper 拿掉，改成统一调用 `ContextHeaderField.normalizeValue(...)`。

这不是为了省几行代码，而是为了避免以后上下文处理分散在多个类里，导致：

```text
一个地方 trim
一个地方不 trim
一个地方 blank 当 null
一个地方 blank 当空串
```

这种偏差一旦进来，后面的 warning digest 和 request context 回显就容易漂。

## 6. Hint / Handoff builder 怎么复用

`ReleaseApprovalRehearsalHintBuilder` 负责：

```text
request context
operator window
CI evidence
artifact retention
live readiness
```

`ReleaseApprovalRehearsalHandoffHintBuilder` 负责：

```text
audit persistence handoff
approval record handoff
```

这两个 builder 现在都用 `ContextHeaderField.normalized(...)`，不用再先 `from(...)` 再单独 `addMissingWarning(...)`。

结果是构造代码更短，语义更直：字段存在就 echo，不存在就 placeholder + warning。

## 7. 行为边界

本版没有越过这些边界：

- 不新增 JSON 字段
- 不改变 schema version
- 不写 approval ledger
- 不执行 SQL
- 不读取 credential value
- 不打开 managed audit connection
- 不触发 deployment / rollback / restore
- 不改 failure taxonomy 的分类结果

## 8. 验证

这版应该至少通过：

```text
mvn -q -DskipTests compile
mvn -q '-Dtest=OpsEvidenceServiceTests,OpsOverviewIntegrationTests' test
mvn -q -DskipTests package
git diff --check
```

这些验证够说明两件事：

```text
代码能编译
只读证据接口行为没漂
打包后 contract 仍然稳定
```

## 9. 拆分结果

这次拆分后，几个核心文件的规模大致是：

```text
OpsEvidenceService.java                    1496 行
ReleaseApprovalRehearsalResponseBuilder.java 426 行
ReleaseApprovalRehearsalHintBuilder.java    676 行
ReleaseApprovalRehearsalHandoffHintBuilder.java 535 行
ContextHeaderField.java                      50 行
```

这说明主入口已经明显瘦身，重复的上下文拼装也被吸进了更合适的位置。

## 10. 一句话总结

v90 把 release approval 的上下文归一化和缺失 warning 处理收进 `ContextHeaderField`，让证据构造链路更集中、更稳，也为后续继续拆更大的 builder 留出了空间。
