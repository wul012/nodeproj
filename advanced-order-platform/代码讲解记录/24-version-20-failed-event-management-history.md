# 第二十版：失败事件管理状态变更流水

第十九版已经能对失败事件做人工管理状态标记：

```text
OPEN -> INVESTIGATING -> RESOLVED
OPEN -> IGNORED
```

但 v19 只保存“最后一次状态”：

```text
managementStatus
managementNote
managedBy
managedAt
```

第二十版补上运维系统里更重要的一层：每一次状态变更都要留下流水。这样以后排查问题时，不只知道“现在是什么状态”，还知道“谁在什么时候把它从什么状态改成了什么状态，原因是什么”。

## 本版新增和修改文件

```text
src/main/java/com/codexdemo/orderplatform/notification/FailedEventManagementHistory.java
 -> 管理状态变更流水实体

src/main/java/com/codexdemo/orderplatform/notification/FailedEventManagementHistoryRepository.java
 -> 流水查询仓库

src/main/java/com/codexdemo/orderplatform/notification/FailedEventManagementHistoryResponse.java
 -> 流水接口响应

src/main/java/com/codexdemo/orderplatform/notification/FailedEventManagementHistorySearchCriteria.java
 -> 流水分页筛选条件

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageService.java
 -> 批量标记时写流水，并支持流水列表和分页筛选

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageController.java
 -> 新增管理状态变更流水查询接口

src/main/resources/db/migration/h2/V9__failed_event_management_history.sql
src/main/resources/db/migration/postgresql/V9__failed_event_management_history.sql
 -> 新增 failed_event_management_history 表

src/test/java/com/codexdemo/orderplatform/FailedEventSearchIntegrationTests.java
 -> 验证流水写入、单事件流水查询、全局分页筛选和非法参数

src/test/java/com/codexdemo/orderplatform/PostgresMigrationIntegrationTests.java
 -> PostgreSQL 迁移数量和表数量升级到 V9
```

## 流水实体

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventManagementHistory.java`

实体绑定新表：

```java
@Entity
@Table(
        name = "failed_event_management_history",
        indexes = {
                @Index(
                        name = "idx_failed_event_management_history_message",
                        columnList = "failed_event_message_id, changed_at"
                ),
                @Index(
                        name = "idx_failed_event_management_history_status",
                        columnList = "new_status, changed_at"
                )
        }
)
public class FailedEventManagementHistory {
}
```

核心字段：

```java
@ManyToOne(fetch = FetchType.LAZY, optional = false)
@JoinColumn(name = "failed_event_message_id", nullable = false)
private FailedEventMessage failedEventMessage;

@Enumerated(EnumType.STRING)
@Column(name = "previous_status", nullable = false, length = 32)
private FailedEventManagementStatus previousStatus;

@Enumerated(EnumType.STRING)
@Column(name = "new_status", nullable = false, length = 32)
private FailedEventManagementStatus newStatus;
```

这里的 `previousStatus` 和 `newStatus` 是审计流水最关键的两个字段：

```text
previousStatus
 -> 改之前是什么状态

newStatus
 -> 改之后是什么状态
```

操作人和原因也一起落库：

```java
@Column(name = "operator_id", nullable = false, length = 80)
private String operatorId;

@Column(name = "operator_role", nullable = false, length = 80)
private String operatorRole;

@Column(nullable = false, length = 500)
private String note;

@Column(name = "changed_at", nullable = false)
private Instant changedAt;
```

这让流水具备完整追溯信息：

```text
哪条失败事件
从哪个状态
改成哪个状态
谁改的
以什么角色改的
为什么改
什么时候改
```

## 流水创建方法

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventManagementHistory.java`

统一用静态工厂创建：

```java
public static FailedEventManagementHistory record(
        FailedEventMessage failedEventMessage,
        FailedEventManagementStatus previousStatus,
        FailedEventManagementStatus newStatus,
        String operatorId,
        String operatorRole,
        String note,
        Instant changedAt
) {
    return new FailedEventManagementHistory(
            failedEventMessage,
            previousStatus,
            newStatus,
            operatorId,
            operatorRole,
            note,
            changedAt
    );
}
```

构造函数里做实体级保护：

```java
if (previousStatus == null) {
    throw new IllegalArgumentException("previousStatus is required");
}
if (newStatus == null) {
    throw new IllegalArgumentException("newStatus is required");
}
if (note == null || note.isBlank()) {
    throw new IllegalArgumentException("note is required");
}
```

这里的设计和 `FailedEventReplayAttempt.record(...)` 一致：审计类实体不要允许“半条记录”进入数据库。

## Repository

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventManagementHistoryRepository.java`

```java
public interface FailedEventManagementHistoryRepository
        extends JpaRepository<FailedEventManagementHistory, Long>, JpaSpecificationExecutor<FailedEventManagementHistory> {

    List<FailedEventManagementHistory> findByFailedEventMessageIdOrderByChangedAtDescIdDesc(Long failedEventMessageId);
}
```

这里同时支持两种查询：

```text
JpaRepository
 -> 基础保存和按 id 查询

JpaSpecificationExecutor
 -> 全局动态筛选和分页查询

findByFailedEventMessageIdOrderByChangedAtDescIdDesc
 -> 单条失败事件的时间线查询
```

## 接口响应

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventManagementHistoryResponse.java`

```java
public record FailedEventManagementHistoryResponse(
        Long id,
        Long failedEventMessageId,
        FailedEventManagementStatus previousStatus,
        FailedEventManagementStatus newStatus,
        String operatorId,
        String operatorRole,
        String note,
        Instant changedAt
) {
}
```

从实体映射：

```java
static FailedEventManagementHistoryResponse from(FailedEventManagementHistory history) {
    return new FailedEventManagementHistoryResponse(
            history.getId(),
            history.getFailedEventMessage().getId(),
            history.getPreviousStatus(),
            history.getNewStatus(),
            history.getOperatorId(),
            history.getOperatorRole(),
            history.getNote(),
            history.getChangedAt()
    );
}
```

响应示例：

```json
{
  "failedEventMessageId": 1,
  "previousStatus": "OPEN",
  "newStatus": "INVESTIGATING",
  "operatorId": "ops-user",
  "operatorRole": "SRE",
  "note": "triage started",
  "changedAt": "2026-05-10T11:12:00Z"
}
```

## 查询条件

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventManagementHistorySearchCriteria.java`

```java
public record FailedEventManagementHistorySearchCriteria(
        Long failedEventMessageId,
        FailedEventManagementStatus previousStatus,
        FailedEventManagementStatus newStatus,
        String operatorId,
        String operatorRole,
        Instant changedFrom,
        Instant changedTo,
        Integer page,
        Integer size,
        String sort,
        Integer limit
) {
}
```

这个条件对象和 v18 的分页模型一致：

```text
page / size
 -> 管理端表格分页

sort
 -> 排序字段白名单

limit
 -> 兼容早期只限制条数的调用方式
```

## 批量标记时写流水

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageService.java`

Service 新增依赖：

```java
private final FailedEventManagementHistoryRepository failedEventManagementHistoryRepository;
```

批量标记时，不再只是改失败事件当前状态，而是在每条消息上记录前后变化：

```java
failedMessages.forEach(failedMessage -> {
    FailedEventManagementStatus previousStatus = failedMessage.getManagementStatus();
    failedMessage.markManagementStatus(managementStatus, note, normalizedOperatorId, managedAt);
    failedEventManagementHistoryRepository.save(FailedEventManagementHistory.record(
            failedMessage,
            previousStatus,
            managementStatus,
            normalizedOperatorId,
            normalizedOperatorRole,
            note,
            managedAt
    ));
});
```

这个代码块很关键：

```text
先读 previousStatus
 -> 记住修改前状态

再 markManagementStatus
 -> 更新 failed_event_messages 当前状态

再 save FailedEventManagementHistory
 -> 写 failed_event_management_history 流水
```

而且它在同一个 `@Transactional` 方法里：

```java
@Transactional
public FailedEventManagementBatchResponse markManagementStatus(...)
```

所以这两个动作要么一起成功，要么一起回滚。

## 单事件流水查询

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageService.java`

```java
@Transactional(readOnly = true)
public List<FailedEventManagementHistoryResponse> listManagementHistory(Long failedEventMessageId) {
    validateSearchId(failedEventMessageId, "failedEventMessageId");
    if (!failedEventMessageRepository.existsById(failedEventMessageId)) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "failed event message not found");
    }
    return failedEventManagementHistoryRepository
            .findByFailedEventMessageIdOrderByChangedAtDescIdDesc(failedEventMessageId)
            .stream()
            .map(FailedEventManagementHistoryResponse::from)
            .toList();
}
```

这类接口适合在管理端详情页展示时间线：

```text
RESOLVED
 -> customer impact cleared

INVESTIGATING
 -> triage started

OPEN
 -> 初始待处理
```

## 全局流水分页筛选

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageService.java`

分页查询方法：

```java
@Transactional(readOnly = true)
public PagedResponse<FailedEventManagementHistoryResponse> searchManagementHistory(
        FailedEventManagementHistorySearchCriteria criteria
) {
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
    NormalizedPageRequest pageRequest = normalizePageRequest(
            normalizedCriteria.page(),
            normalizedCriteria.size(),
            normalizedCriteria.limit(),
            normalizedCriteria.sort(),
            MANAGEMENT_HISTORY_SORT_FIELDS,
            "changedAt,desc"
    );
    Page<FailedEventManagementHistory> page = failedEventManagementHistoryRepository.findAll(
            managementHistoryMatching(normalizedCriteria),
            pageRequest.pageRequest()
    );
    return PagedResponse.from(page, FailedEventManagementHistoryResponse::from, pageRequest.sort());
}
```

排序白名单：

```java
private static final Map<String, String> MANAGEMENT_HISTORY_SORT_FIELDS = Map.of(
        "id", "id",
        "changedAt", "changedAt",
        "previousStatus", "previousStatus",
        "newStatus", "newStatus",
        "operatorId", "operatorId",
        "operatorRole", "operatorRole"
);
```

动态筛选条件：

```java
if (criteria.failedEventMessageId() != null) {
    predicates.add(criteriaBuilder.equal(
            root.get("failedEventMessage").get("id"),
            criteria.failedEventMessageId()
    ));
}
if (criteria.previousStatus() != null) {
    predicates.add(criteriaBuilder.equal(root.get("previousStatus"), criteria.previousStatus()));
}
if (criteria.newStatus() != null) {
    predicates.add(criteriaBuilder.equal(root.get("newStatus"), criteria.newStatus()));
}
addTextEquals(predicates, criteriaBuilder, root.get("operatorId"), criteria.operatorId());
addTextEquals(
        predicates,
        criteriaBuilder,
        root.get("operatorRole"),
        failedEventReplayProperties.normalize(criteria.operatorRole())
);
```

`operatorRole` 继续复用已有的角色归一化逻辑，所以 `sre`、`SRE` 可以按同一种角色查询。

## Controller 接口

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageController.java`

单事件流水：

```java
@GetMapping("/{id}/management-history")
public List<FailedEventManagementHistoryResponse> listManagementHistory(@PathVariable Long id) {
    return failedEventMessageService.listManagementHistory(id);
}
```

全局分页筛选：

```java
@GetMapping("/management-history")
public PagedResponse<FailedEventManagementHistoryResponse> searchManagementHistory(
        @RequestParam(required = false) Long failedEventMessageId,
        @RequestParam(required = false) FailedEventManagementStatus previousStatus,
        @RequestParam(required = false) FailedEventManagementStatus newStatus,
        @RequestParam(required = false) String operatorId,
        @RequestParam(required = false) String operatorRole,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant changedFrom,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant changedTo,
        @RequestParam(required = false) Integer page,
        @RequestParam(required = false) Integer size,
        @RequestParam(required = false) String sort,
        @RequestParam(required = false) Integer limit
) {
    return failedEventMessageService.searchManagementHistory(...);
}
```

调用示例：

```powershell
Invoke-RestMethod http://localhost:8080/api/v1/failed-events/1/management-history

Invoke-RestMethod "http://localhost:8080/api/v1/failed-events/management-history?newStatus=RESOLVED&operatorRole=ORDER_SUPPORT&page=0&size=20&sort=changedAt,desc"
```

## Flyway V9

H2：

```text
src/main/resources/db/migration/h2/V9__failed_event_management_history.sql
```

PostgreSQL：

```text
src/main/resources/db/migration/postgresql/V9__failed_event_management_history.sql
```

核心 SQL：

```sql
create table failed_event_management_history (
    id bigint generated by default as identity primary key,
    failed_event_message_id bigint not null,
    previous_status varchar(32) not null,
    new_status varchar(32) not null,
    operator_id varchar(80) not null,
    operator_role varchar(80) not null,
    note varchar(500) not null,
    changed_at timestamp(6) with time zone not null,
    constraint fk_failed_event_management_history_message
        foreign key (failed_event_message_id) references failed_event_messages (id)
);
```

索引：

```sql
create index idx_failed_event_management_history_message
    on failed_event_management_history (failed_event_message_id, changed_at);

create index idx_failed_event_management_history_status
    on failed_event_management_history (new_status, changed_at);

create index idx_failed_event_management_history_operator_role
    on failed_event_management_history (operator_role, changed_at);
```

这些索引对应三个常见排查入口：

```text
看某条失败事件的状态时间线
看某类状态变更
看某个角色做过哪些处理
```

## 测试验证

文件：`src/test/java/com/codexdemo/orderplatform/FailedEventSearchIntegrationTests.java`

本版新增测试方法：

```java
void recordsManagementHistoryForEachManagementStatusChangeAndSearchesIt()
```

先造两条失败事件：

```java
FailedEventMessage first = failedEventMessageRepository.save(failedEventMessage(...));
FailedEventMessage second = failedEventMessageRepository.save(failedEventMessage(...));
```

第一次批量标记：

```java
failedEventMessageService.markManagementStatus(
        new MarkFailedEventManagementRequest(
                List.of(first.getId(), second.getId()),
                FailedEventManagementStatus.INVESTIGATING,
                "triage started"
        ),
        "ops-user",
        "sre"
);
```

第二次只关闭其中一条：

```java
failedEventMessageService.markManagementStatus(
        new MarkFailedEventManagementRequest(
                List.of(first.getId()),
                FailedEventManagementStatus.RESOLVED,
                "customer impact cleared"
        ),
        "support-user",
        "order_support"
);
```

然后查单条失败事件流水：

```java
List<FailedEventManagementHistoryResponse> firstHistory =
        failedEventMessageService.listManagementHistory(first.getId());
```

断言最近一条是关闭动作：

```java
assertThat(firstHistory.getFirst()).satisfies(history -> {
    assertThat(history.previousStatus()).isEqualTo(FailedEventManagementStatus.INVESTIGATING);
    assertThat(history.newStatus()).isEqualTo(FailedEventManagementStatus.RESOLVED);
    assertThat(history.operatorId()).isEqualTo("support-user");
    assertThat(history.operatorRole()).isEqualTo("ORDER_SUPPORT");
    assertThat(history.note()).isEqualTo("customer impact cleared");
});
```

再查全局流水：

```java
PagedResponse<FailedEventManagementHistoryResponse> investigatingHistory =
        failedEventMessageService.searchManagementHistory(new FailedEventManagementHistorySearchCriteria(
                null,
                FailedEventManagementStatus.OPEN,
                FailedEventManagementStatus.INVESTIGATING,
                null,
                "SRE",
                beforeChanges,
                afterChanges,
                0,
                10,
                "changedAt,desc",
                null
        ));
```

断言批量标记写了两条流水：

```java
assertThat(investigatingHistory.totalElements()).isEqualTo(2);
assertThat(investigatingHistory.content()).extracting(FailedEventManagementHistoryResponse::failedEventMessageId)
        .containsExactlyInAnyOrder(first.getId(), second.getId());
assertThat(investigatingHistory.content()).extracting(FailedEventManagementHistoryResponse::newStatus)
        .containsOnly(FailedEventManagementStatus.INVESTIGATING);
```

非法参数也补了覆盖：

```java
assertBadRequest(() -> failedEventMessageService.searchManagementHistory(
        new FailedEventManagementHistorySearchCriteria(null, null, null, null, null, now, now.minusSeconds(1), 10)
));

assertBadRequest(() -> failedEventMessageService.searchManagementHistory(
        new FailedEventManagementHistorySearchCriteria(null, null, null, null, null, null, null, 0, 50, "messageId,desc", null)
));
```

## 一句话总结

第二十版把失败事件管理状态从“只看当前值”升级成“每次变更都可追溯”，这个项目的失败事件管理已经开始接近真实后台运维系统的审计能力。
