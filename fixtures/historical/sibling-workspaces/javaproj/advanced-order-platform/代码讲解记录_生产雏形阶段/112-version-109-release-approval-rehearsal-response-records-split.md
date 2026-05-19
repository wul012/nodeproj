# Java v109 代码讲解：release approval rehearsal response records split

## 本版所处项目进度

最新计划仍来自：

```text
D:\nodeproj\orderops-node\docs\plans\v263-post-disabled-resolver-echo-roadmap.md
```

v109 不新增业务 marker，而是把 `ReleaseApprovalRehearsalResponse` 的 nested records 全部迁到 `ReleaseApprovalRehearsalResponseRecords`，让主响应类只保留顶层字段壳。

## 为什么要拆

`ReleaseApprovalRehearsalResponse` 原本已经接近 1800 行。即使 v108 解决了 echo marker support 的重复片段，主文件里那堆 nested records 还是会继续膨胀。

这次拆法的意图很直接：
- 顶层响应类型保持短小
- nested records 集中到单独容器
- 后续 builder 和 tests 只需要换前缀，不需要重新设计契约

## 改动文件

```text
src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalRehearsalResponse.java
src/main/java/com/codexdemo/orderplatform/ops/ReleaseApprovalRehearsalResponseRecords.java
```

## 拆分结果

- 主文件：1798 行 -> 68 行
- records 容器：新增 1741 行
- 外部调用方：统一切到 `ReleaseApprovalRehearsalResponseRecords.*`

## 合理性判断

合理，而且这次比继续在原文件里硬挤更值。

原因不是“行数好看了”，而是结构边界更清楚了：
- `ReleaseApprovalRehearsalResponse` 负责数据装配结果
- `ReleaseApprovalRehearsalResponseRecords` 负责类型目录
- builder 逻辑没有被重新发明，语义也没改

## 验证记录

已执行并通过：

```text
mvn -q test
```

`git diff --check` 也通过。

Testcontainers 仍然打印 Docker 环境不可用的提示，但这次测试最终是成功退出的，所以没必要为了这轮结构优化单独启动 Docker Desktop。

## 清理记录

已删除 `target`。

## 一句话总结

v109 是一次“壳和目录分家”的拆分，主响应文件真正瘦下来了，后面继续拆才不会越滚越大。
