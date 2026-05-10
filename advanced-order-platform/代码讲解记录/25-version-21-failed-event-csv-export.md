# 第二十一版：失败事件和管理状态流水 CSV 导出

第二十版已经让失败事件具备了完整处理时间线：

```text
failed_event_messages
 -> 当前处理状态

failed_event_management_history
 -> 每一次状态变更流水
```

第二十一版继续补后台排查常见需求：把失败事件列表和管理状态变更流水导出成 CSV。这样排查结果可以下载、交接、复盘，也能给非系统用户查看。

## 本版新增和修改文件

```text
src/main/java/com/codexdemo/orderplatform/notification/FailedEventCsvExporter.java
 -> CSV 生成和字段转义工具

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageService.java
 -> 新增失败事件 CSV 导出和管理流水 CSV 导出

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageController.java
 -> 新增两个 text/csv 下载接口

src/test/java/com/codexdemo/orderplatform/FailedEventSearchIntegrationTests.java
 -> 验证 CSV 内容、过滤、引号转义和导出参数校验

README.md
 -> 补充 CSV 导出调用示例
```

本版没有新增数据库表，所以 Flyway 仍然停留在 V9。

## CSV 导出器

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventCsvExporter.java`

这个类是包内工具类：

```java
final class FailedEventCsvExporter {

    private static final String LINE_SEPARATOR = "\r\n";

    private FailedEventCsvExporter() {
    }
}
```

它不放到 `common` 包，是因为字段完全服务于失败事件管理模块。当前还没有其他模块复用 CSV 能力，先保持作用域收敛。

### 失败事件导出字段

```java
static String failedMessages(List<FailedEventMessageResponse> messages) {
    StringBuilder csv = new StringBuilder();
    appendRow(
            csv,
            List.of(
                    "id",
                    "messageId",
                    "eventId",
                    "eventType",
                    "aggregateType",
                    "aggregateId",
                    "status",
                    "managementStatus",
                    "managementNote",
                    "managedBy",
                    "managedAt",
                    "failedAt",
                    "replayCount",
                    "lastReplayedAt",
                    "lastReplayEventId",
                    "lastReplayError",
                    "sourceQueue",
                    "deadLetterQueue",
                    "failureReason",
                    "payload"
            )
    );
}
```

这里刻意把管理字段放在靠前位置：

```text
managementStatus
managementNote
managedBy
managedAt
```

因为导出时最常见的问题不是“消息长什么样”，而是“这条失败事件现在谁处理到哪一步了”。

行数据来自 `FailedEventMessageResponse`：

```java
messages.forEach(message -> appendRow(
        csv,
        List.of(
                value(message.id()),
                value(message.messageId()),
                value(message.eventId()),
                value(message.eventType()),
                value(message.aggregateType()),
                value(message.aggregateId()),
                value(message.status()),
                value(message.managementStatus()),
                value(message.managementNote()),
                value(message.managedBy()),
                value(message.managedAt()),
                value(message.failedAt()),
                value(message.replayCount()),
                value(message.lastReplayedAt()),
                value(message.lastReplayEventId()),
                value(message.lastReplayError()),
                value(message.sourceQueue()),
                value(message.deadLetterQueue()),
                value(message.failureReason()),
                value(message.payload())
        )
));
```

用 Response 而不是直接暴露实体字段，有两个好处：

```text
字段顺序更接近 API 输出
以后实体内部调整时，导出不一定要跟着大改
```

### 管理流水导出字段

```java
static String managementHistory(List<FailedEventManagementHistoryResponse> history) {
    StringBuilder csv = new StringBuilder();
    appendRow(
            csv,
            List.of(
                    "id",
                    "failedEventMessageId",
                    "previousStatus",
                    "newStatus",
                    "operatorId",
                    "operatorRole",
                    "note",
                    "changedAt"
            )
    );
}
```

流水导出的字段不多，但信息完整：

```text
failedEventMessageId
 -> 属于哪条失败事件

previousStatus / newStatus
 -> 状态变化

operatorId / operatorRole
 -> 谁以什么身份做的

note / changedAt
 -> 为什么做、什么时候做
```

### CSV 转义

CSV 不能直接拼字符串，因为备注和 payload 里可能有逗号、引号或换行。

本版用一个小转义方法处理：

```java
private static String escape(String value) {
    if (value == null || value.isEmpty()) {
        return "";
    }
    boolean requiresQuoting = value.contains(",")
            || value.contains("\"")
            || value.contains("\n")
            || value.contains("\r");
    if (!requiresQuoting) {
        return value;
    }
    return "\"" + value.replace("\"", "\"\"") + "\"";
}
```

规则：

```text
普通值
 -> 原样输出

包含逗号、引号、换行
 -> 整个字段用双引号包起来

字段内部双引号
 -> 替换成两个双引号
```

例如：

```text
resolved "after" check
 -> "resolved ""after"" check"
```

这让导出的 CSV 能被 Excel、WPS、数据库工具稳定读取。

## Service 导出失败事件

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageService.java`

导出上限：

```java
private static final int DEFAULT_EXPORT_LIMIT = 1000;

private static final int MAX_EXPORT_LIMIT = 5000;
```

失败事件导出方法：

```java
@Transactional(readOnly = true)
public String exportFailedMessagesCsv(FailedEventMessageSearchCriteria criteria) {
    FailedEventMessageSearchCriteria normalizedCriteria = criteria == null
            ? new FailedEventMessageSearchCriteria(null, null, null, null, null, null, null)
            : criteria;
    validateTimeRange(normalizedCriteria.failedFrom(), normalizedCriteria.failedTo(), "failedFrom", "failedTo");
    PageRequest pageRequest = normalizeExportPageRequest(
            normalizedCriteria.limit(),
            normalizedCriteria.sort(),
            FAILED_MESSAGE_SORT_FIELDS,
            "failedAt,desc"
    );
    List<FailedEventMessageResponse> messages = failedEventMessageRepository.findAll(
                    failedMessagesMatching(normalizedCriteria),
                    pageRequest
            )
            .stream()
            .map(FailedEventMessageResponse::from)
            .toList();
    return FailedEventCsvExporter.failedMessages(messages);
}
```

这里复用了已有查询能力：

```text
failedMessagesMatching(...)
 -> 复用 v17 的动态筛选

FAILED_MESSAGE_SORT_FIELDS
 -> 复用 v18/v19 的排序白名单

limit
 -> 导出最多取多少行，防止一次性导出过大
```

## Service 导出管理流水

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageService.java`

```java
@Transactional(readOnly = true)
public String exportManagementHistoryCsv(FailedEventManagementHistorySearchCriteria criteria) {
    FailedEventManagementHistorySearchCriteria normalizedCriteria = criteria == null
            ? new FailedEventManagementHistorySearchCriteria(null, null, null, null, null, null, null, null)
            : criteria;
    validateSearchId(normalizedCriteria.failedEventMessageId(), "failedEventMessageId");
    validateTimeRange(
            normalizedCriteria.changedFrom(),
            normalizedCriteria.changedTo(),
            "changedFrom",
            "changedTo"
    );
    PageRequest pageRequest = normalizeExportPageRequest(
            normalizedCriteria.limit(),
            normalizedCriteria.sort(),
            MANAGEMENT_HISTORY_SORT_FIELDS,
            "changedAt,desc"
    );
    List<FailedEventManagementHistoryResponse> history = failedEventManagementHistoryRepository.findAll(
                    managementHistoryMatching(normalizedCriteria),
                    pageRequest
            )
            .stream()
            .map(FailedEventManagementHistoryResponse::from)
            .toList();
    return FailedEventCsvExporter.managementHistory(history);
}
```

它同样复用已有能力：

```text
managementHistoryMatching(...)
 -> 复用 v20 的流水筛选

MANAGEMENT_HISTORY_SORT_FIELDS
 -> 复用 v20 的流水排序白名单

changedFrom / changedTo
 -> 复用时间窗口校验
```

## 导出分页和上限

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageService.java`

导出不是普通分页查询，不返回 `PagedResponse`，而是直接生成文件内容。因此这里只取第一页，并用 `limit` 控制最大条数：

```java
private PageRequest normalizeExportPageRequest(
        Integer limit,
        String sort,
        Map<String, String> allowedSortFields,
        String defaultSort
) {
    SortInstruction sortInstruction = normalizeSort(sort, allowedSortFields, defaultSort);
    return PageRequest.of(0, normalizeExportLimit(limit), sortInstruction.sort());
}
```

上限校验：

```java
private int normalizeExportLimit(Integer limit) {
    if (limit == null) {
        return DEFAULT_EXPORT_LIMIT;
    }
    if (limit < 1 || limit > MAX_EXPORT_LIMIT) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "export limit must be between 1 and 5000");
    }
    return limit;
}
```

这个设计避免了两个问题：

```text
不传 limit 时
 -> 默认最多导出 1000 条，足够本地排查

传超大 limit 时
 -> 直接 400，避免内存里拼巨大字符串
```

## Controller 下载接口

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageController.java`

CSV 媒体类型：

```java
private static final MediaType TEXT_CSV = MediaType.parseMediaType("text/csv; charset=UTF-8");
```

失败事件导出接口：

```java
@GetMapping(value = "/export", produces = "text/csv")
public ResponseEntity<String> exportFailedMessages(
        @RequestParam(required = false) FailedEventMessageStatus status,
        @RequestParam(required = false) String eventType,
        @RequestParam(required = false) String aggregateType,
        @RequestParam(required = false) String aggregateId,
        @RequestParam(required = false) FailedEventManagementStatus managementStatus,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant failedFrom,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant failedTo,
        @RequestParam(required = false) String sort,
        @RequestParam(required = false) Integer limit
) {
    String csv = failedEventMessageService.exportFailedMessagesCsv(...);
    return csvResponse("failed-events.csv", csv);
}
```

管理流水导出接口：

```java
@GetMapping(value = "/management-history/export", produces = "text/csv")
public ResponseEntity<String> exportManagementHistory(
        @RequestParam(required = false) Long failedEventMessageId,
        @RequestParam(required = false) FailedEventManagementStatus previousStatus,
        @RequestParam(required = false) FailedEventManagementStatus newStatus,
        @RequestParam(required = false) String operatorId,
        @RequestParam(required = false) String operatorRole,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant changedFrom,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant changedTo,
        @RequestParam(required = false) String sort,
        @RequestParam(required = false) Integer limit
) {
    String csv = failedEventMessageService.exportManagementHistoryCsv(...);
    return csvResponse("failed-event-management-history.csv", csv);
}
```

统一响应头：

```java
private ResponseEntity<String> csvResponse(String filename, String csv) {
    return ResponseEntity.ok()
            .contentType(TEXT_CSV)
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
            .body(csv);
}
```

`Content-Disposition` 的作用是让浏览器或 `Invoke-WebRequest` 把它当作下载文件。

## 调用示例

导出已解决的失败事件：

```powershell
Invoke-WebRequest `
  -Uri "http://localhost:8080/api/v1/failed-events/export?managementStatus=RESOLVED&sort=managedAt,desc&limit=1000" `
  -OutFile failed-events.csv
```

导出由客服关闭的管理流水：

```powershell
Invoke-WebRequest `
  -Uri "http://localhost:8080/api/v1/failed-events/management-history/export?newStatus=RESOLVED&operatorRole=ORDER_SUPPORT&sort=changedAt,desc&limit=1000" `
  -OutFile failed-event-management-history.csv
```

## 测试验证

文件：`src/test/java/com/codexdemo/orderplatform/FailedEventSearchIntegrationTests.java`

新增测试：

```java
void exportsFailedMessagesAndManagementHistoryAsCsv()
```

先创建失败事件并做两次状态变更：

```java
failedEventMessageService.markManagementStatus(
        new MarkFailedEventManagementRequest(
                List.of(first.getId()),
                FailedEventManagementStatus.INVESTIGATING,
                "triage, started"
        ),
        "ops-user",
        "SRE"
);

failedEventMessageService.markManagementStatus(
        new MarkFailedEventManagementRequest(
                List.of(first.getId()),
                FailedEventManagementStatus.RESOLVED,
                "resolved \"after\" check"
        ),
        "support-user",
        "ORDER_SUPPORT"
);
```

导出失败事件：

```java
String failedMessagesCsv = failedEventMessageService.exportFailedMessagesCsv(new FailedEventMessageSearchCriteria(
        null,
        null,
        null,
        null,
        FailedEventManagementStatus.RESOLVED,
        null,
        null,
        null,
        null,
        "managedAt,desc",
        10
));
```

断言只导出符合条件的一条：

```java
assertThat(failedMessagesCsv.lines().toList()).hasSize(2);
assertThat(failedMessagesCsv).contains("v21-message-001");
assertThat(failedMessagesCsv).doesNotContain("v21-message-002");
assertThat(failedMessagesCsv).contains("RESOLVED");
```

断言引号被正确转义：

```java
assertThat(failedMessagesCsv).contains("\"resolved \"\"after\"\" check\"");
```

导出管理流水：

```java
String managementHistoryCsv = failedEventMessageService.exportManagementHistoryCsv(
        new FailedEventManagementHistorySearchCriteria(
                first.getId(),
                FailedEventManagementStatus.INVESTIGATING,
                FailedEventManagementStatus.RESOLVED,
                "support-user",
                "order_support",
                null,
                null,
                null,
                null,
                "changedAt,desc",
                10
        )
);
```

断言状态变化和角色归一化：

```java
assertThat(managementHistoryCsv).contains("INVESTIGATING,RESOLVED");
assertThat(managementHistoryCsv).contains("support-user,ORDER_SUPPORT");
```

非法导出参数：

```java
assertBadRequest(() -> failedEventMessageService.exportFailedMessagesCsv(
        new FailedEventMessageSearchCriteria(null, null, null, null, null, null, null, null, null, null, 5001)
));

assertBadRequest(() -> failedEventMessageService.exportManagementHistoryCsv(
        new FailedEventManagementHistorySearchCriteria(null, null, null, null, null, null, null, null, null, "messageId,desc", 10)
));
```

覆盖了：

```text
导出 limit 过大
 -> 400

导出排序字段不在白名单
 -> 400
```

## 一句话总结

第二十一版把失败事件管理数据从“在线查询”推进到“可下载交付”，让排查结果可以离线流转，也为后续做管理端页面的导出按钮打好了后端基础。
