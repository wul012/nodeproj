# version 86 release approval rehearsal internal boolean flags

## 1. 版本目标

v86 是纯重构版本：继续拆 `OpsEvidenceService` 之后，专门把 release approval rehearsal builder 内部剩下的裸布尔参数收口成语义 record / flags helper。

这次不新增响应字段，不修改 schema，不改 warning digest 或 proof claims，只是把原本散落在构造调用里的 `true/false` 变成可读的内部状态对象。

## 2. 这次改了什么

- `ReleaseApprovalRehearsalResponseBuilder`
  - 把 `ExecutionBoundaries(true, false, ...)` 收到内部 `ExecutionBoundaryFlags`
  - 外部仍输出同一个 `ExecutionBoundaries` record
- `ReleaseApprovalRehearsalHintBuilder`
  - request context、operator window、CI evidence、artifact retention、live readiness 的布尔组都改成内部 flags record
  - 调用点不再直接堆长串位置布尔
- `ReleaseApprovalRehearsalHandoffHintBuilder`
  - audit persistence handoff、approval record handoff、approval handoff verification marker 统一用内部 flags record
  - 仍然保持原 response record 的字段顺序和内容

## 3. 不变项

- API 路径不变
- response shape 不变
- schema version 不变
- warning digest 输入顺序不变
- proof claims 不变
- read-only / no-write / no-connection / no-SQL / no-credential 边界不变

## 4. 代码规模

```text
OpsEvidenceService.java: 1443
ReleaseApprovalRehearsalResponseBuilder.java: 398
ReleaseApprovalRehearsalHintBuilder.java: 677
ReleaseApprovalRehearsalHandoffHintBuilder.java: 574
ReleaseApprovalRehearsalFailureTaxonomyBuilder.java: 60
```

主文件仍停在 1443 行。builder 文件变长是因为把原本裸露的布尔参数收成了内部语义对象，不是因为业务又膨胀了一层。

## 5. 验证

- `mvn -q -DskipTests compile`
- `mvn -q '-Dtest=OpsEvidenceServiceTests,OpsOverviewIntegrationTests' test`
- `mvn -q -DskipTests package`
- `git diff --check`

## 6. 归档

本说明文件保留，不作为临时文件删除。
