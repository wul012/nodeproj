# 第十九版：失败事件管理状态和批量标记

第十八版已经把失败事件查询做成了后台表格可用的形态：

```text
筛选
 -> status / eventType / aggregateId / operatorRole / time

分页
 -> page / size / totalElements / totalPages

排序
 -> sort 白名单
```

第十九版继续补运维处理闭环。失败事件现在不只可以查询和重放，还可以被人工标记管理状态：

```text
OPEN
 -> 新记录的失败事件，默认待处理

INVESTIGATING
 -> 已有人开始排查

IGNORED
 -> 确认无需处理

RESOLVED
 -> 已处理完成
```

## 本版新增和修改文件

```text
src/main/java/com/codexdemo/orderplatform/notification/FailedEventManagementStatus.java
 -> 失败事件人工管理状态枚举

src/main/java/com/codexdemo/orderplatform/notification/MarkFailedEventManagementRequest.java
 -> 批量标记请求体

src/main/java/com/codexdemo/orderplatform/notification/FailedEventManagementBatchResponse.java
 -> 批量标记响应

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessage.java
 -> 增加 managementStatus / managementNote / managedBy / managedAt

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageResponse.java
 -> 接口响应返回管理状态字段

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageSearchCriteria.java
 -> 支持按 managementStatus 筛选

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageController.java
 -> 新增 POST /api/v1/failed-events/management-status

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageService.java
 -> 批量标记、权限校验、管理状态筛选和排序白名单

src/main/resources/db/migration/h2/V8__failed_event_management_status.sql
src/main/resources/db/migration/postgresql/V8__failed_event_management_status.sql
 -> 数据库增加管理状态字段和索引

src/test/java/com/codexdemo/orderplatform/FailedEventSearchIntegrationTests.java
 -> 验证批量标记、管理状态筛选、非法请求和未授权角色
```

## 管理状态枚举

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventManagementStatus.java`

```java
public enum FailedEventManagementStatus {
    OPEN,
    INVESTIGATING,
    IGNORED,
    RESOLVED
}
```

这里没有复用原来的 `FailedEventMessageStatus`。

原来的状态表示消息重放生命周期：

```text
RECORDED
REPLAYED
REPLAY_FAILED
```

新的管理状态表示人工处理生命周期：

```text
OPEN
INVESTIGATING
IGNORED
RESOLVED
```

这两个维度分开后，系统能表达更多真实情况：

```text
RECORDED + INVESTIGATING
 -> 消息还没重放，正在排查

REPLAYED + RESOLVED
 -> 已重放成功，人工关闭

RECORDED + IGNORED
 -> 不需要重放，人工忽略
```

## 实体字段

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessage.java`

新增字段：

```java
@Enumerated(EnumType.STRING)
@Column(name = "management_status", nullable = false, length = 32)
private FailedEventManagementStatus managementStatus;

@Column(name = "management_note", length = 500)
private String managementNote;

@Column(name = "managed_by", length = 80)
private String managedBy;

@Column(name = "managed_at")
private Instant managedAt;
```

新失败事件默认是 `OPEN`：

```java
this.status = FailedEventMessageStatus.RECORDED;
this.replayCount = 0;
this.managementStatus = FailedEventManagementStatus.OPEN;
```

标记管理状态的方法：

```java
public void markManagementStatus(
        FailedEventManagementStatus managementStatus,
        String managementNote,
        String managedBy,
        Instant managedAt
) {
    if (managementStatus == null) {
        throw new IllegalArgumentException("managementStatus is required");
    }
    if (managedBy == null || managedBy.isBlank()) {
        throw new IllegalArgumentException("managedBy is required");
    }
    if (managedAt == null) {
        throw new IllegalArgumentException("managedAt is required");
    }
    this.managementStatus = managementStatus;
    this.managementNote = managementNote;
    this.managedBy = managedBy;
    this.managedAt = managedAt;
}
```

这说明一次人工标记至少要回答三件事：

```text
标成什么状态
谁标记的
什么时候标记的
```

## 接口响应

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageResponse.java`

响应增加：

```java
FailedEventManagementStatus managementStatus,
String managementNote,
String managedBy,
Instant managedAt
```

映射代码：

```java
failedMessage.getManagementStatus(),
failedMessage.getManagementNote(),
failedMessage.getManagedBy(),
failedMessage.getManagedAt()
```

因此查询失败事件时能直接看到：

```json
{
  "status": "RECORDED",
  "managementStatus": "INVESTIGATING",
  "managementNote": "triage started by support",
  "managedBy": "ops-user",
  "managedAt": "2026-05-10T10:33:00Z"
}
```

## 批量标记请求和响应

文件：`src/main/java/com/codexdemo/orderplatform/notification/MarkFailedEventManagementRequest.java`

```java
public record MarkFailedEventManagementRequest(
        List<Long> ids,
        FailedEventManagementStatus status,
        String note
) {
}
```

请求示例：

```json
{
  "ids": [1, 2],
  "status": "INVESTIGATING",
  "note": "support is checking customer impact"
}
```

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventManagementBatchResponse.java`

```java
public record FailedEventManagementBatchResponse(
        FailedEventManagementStatus status,
        int updatedCount,
        List<FailedEventMessageResponse> items
) {
}
```

响应会告诉调用方：

```text
本次标成了什么状态
更新了多少条
更新后的失败事件详情
```

## Controller 接口

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageController.java`

新增接口：

```java
@PostMapping("/management-status")
public FailedEventManagementBatchResponse markManagementStatus(
        @RequestHeader(value = "X-Operator-Id", required = false) String operatorId,
        @RequestHeader(value = "X-Operator-Role", required = false) String operatorRole,
        @RequestBody MarkFailedEventManagementRequest request
) {
    return failedEventMessageService.markManagementStatus(request, operatorId, operatorRole);
}
```

调用示例：

```powershell
$body = @{
  ids = @(1, 2)
  status = "INVESTIGATING"
  note = "support is checking customer impact"
} | ConvertTo-Json

Invoke-RestMethod `
  -Method Post `
  -Uri http://localhost:8080/api/v1/failed-events/management-status `
  -ContentType "application/json" `
  -Headers @{
    "X-Operator-Id" = "local-admin"
    "X-Operator-Role" = "SRE"
  } `
  -Body $body
```

## Service 批量标记

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageService.java`

核心方法：

```java
@Transactional
public FailedEventManagementBatchResponse markManagementStatus(
        MarkFailedEventManagementRequest request,
        String operatorId,
        String operatorRole
) {
    if (request == null) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "request body is required");
    }
    List<Long> ids = normalizeManagementIds(request.ids());
    FailedEventManagementStatus managementStatus = requireManagementStatus(request.status());
    String normalizedOperatorId = normalizeOperatorId(operatorId);
    requireAllowedOperatorRole(operatorRole);
    String note = resolveManagementNote(request.note());
    Instant managedAt = Instant.now();
    List<FailedEventMessage> failedMessages = failedEventMessageRepository.findAllById(ids);
    if (failedMessages.size() != ids.size()) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "one or more failed event messages were not found");
    }
    failedMessages.forEach(failedMessage ->
            failedMessage.markManagementStatus(managementStatus, note, normalizedOperatorId, managedAt)
    );
    return new FailedEventManagementBatchResponse(
            managementStatus,
            failedMessages.size(),
            failedMessages.stream()
                    .map(FailedEventMessageResponse::from)
                    .toList()
    );
}
```

这里复用了 v16 的操作人和角色规则：

```java
String normalizedOperatorId = normalizeOperatorId(operatorId);
requireAllowedOperatorRole(operatorRole);
```

所以：

```text
没有 X-Operator-Id
 -> 400

没有 X-Operator-Role
 -> 403

角色不在白名单
 -> 403
```

## Service 参数校验

批量 id 校验：

```java
private List<Long> normalizeManagementIds(List<Long> ids) {
    if (ids == null || ids.isEmpty()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ids are required");
    }
    List<Long> normalizedIds = ids.stream()
            .distinct()
            .toList();
    if (normalizedIds.size() > 100) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ids size must be between 1 and 100");
    }
    if (normalizedIds.stream().anyMatch(id -> id == null || id < 1)) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ids must contain positive ids");
    }
    return normalizedIds;
}
```

管理状态必填：

```java
private FailedEventManagementStatus requireManagementStatus(FailedEventManagementStatus managementStatus) {
    if (managementStatus == null) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "management status is required");
    }
    return managementStatus;
}
```

备注必填：

```java
private String resolveManagementNote(String note) {
    if (note == null || note.isBlank()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "management note is required");
    }
    return truncate(note.strip(), 500);
}
```

这能防止出现“谁也不知道为什么标记”的运维记录。

## 管理状态筛选

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageSearchCriteria.java`

查询条件增加：

```java
FailedEventManagementStatus managementStatus
```

Controller 读取参数：

```java
@RequestParam(required = false) FailedEventManagementStatus managementStatus
```

Service 动态拼条件：

```java
if (criteria.managementStatus() != null) {
    predicates.add(criteriaBuilder.equal(root.get("managementStatus"), criteria.managementStatus()));
}
```

因此可以这样查：

```powershell
Invoke-RestMethod "http://localhost:8080/api/v1/failed-events?managementStatus=INVESTIGATING&page=0&size=20&sort=managedAt,desc"
```

排序白名单也补了管理字段：

```java
"managementStatus", "managementStatus",
"managedAt", "managedAt"
```

## Flyway V8

H2：

```text
src/main/resources/db/migration/h2/V8__failed_event_management_status.sql
```

PostgreSQL：

```text
src/main/resources/db/migration/postgresql/V8__failed_event_management_status.sql
```

核心 SQL：

```sql
alter table failed_event_messages
    add column management_status varchar(32) not null default 'OPEN';

alter table failed_event_messages
    add column management_note varchar(500);

alter table failed_event_messages
    add column managed_by varchar(80);

alter table failed_event_messages
    add column managed_at timestamp(6) with time zone;

create index idx_failed_event_messages_management
    on failed_event_messages (management_status, managed_at);
```

`default 'OPEN'` 是为了兼容已有失败事件数据。

## 测试验证

文件：`src/test/java/com/codexdemo/orderplatform/FailedEventSearchIntegrationTests.java`

批量标记：

```java
FailedEventManagementBatchResponse batchResponse = failedEventMessageService.markManagementStatus(
        new MarkFailedEventManagementRequest(
                List.of(first.getId(), second.getId()),
                FailedEventManagementStatus.INVESTIGATING,
                "triage started by support"
        ),
        "ops-user",
        "sre"
);
```

按管理状态查询：

```java
PagedResponse<FailedEventMessageResponse> investigatingMessages = failedEventMessageService.searchFailedMessages(
        new FailedEventMessageSearchCriteria(
                null,
                null,
                null,
                null,
                FailedEventManagementStatus.INVESTIGATING,
                null,
                null,
                0,
                10,
                "managementStatus,asc",
                null
        )
);
```

断言：

```java
assertThat(batchResponse.status()).isEqualTo(FailedEventManagementStatus.INVESTIGATING);
assertThat(batchResponse.updatedCount()).isEqualTo(2);
assertThat(investigatingMessages.totalElements()).isEqualTo(2);
assertThat(investigatingMessages.content()).extracting(FailedEventMessageResponse::managementStatus)
        .containsOnly(FailedEventManagementStatus.INVESTIGATING);
assertThat(investigatingMessages.content()).extracting(FailedEventMessageResponse::managedBy)
        .containsOnly("ops-user");
```

非法请求覆盖：

```java
assertBadRequest(() -> failedEventMessageService.markManagementStatus(
        new MarkFailedEventManagementRequest(
                List.of(1L),
                FailedEventManagementStatus.RESOLVED,
                " "
        ),
        "ops-user",
        "SRE"
));
```

未授权角色：

```java
assertThatThrownBy(() -> failedEventMessageService.markManagementStatus(
        new MarkFailedEventManagementRequest(
                List.of(1L),
                FailedEventManagementStatus.RESOLVED,
                "resolved manually"
        ),
        "ops-user",
        "VIEWER"
))
        .isInstanceOfSatisfying(ResponseStatusException.class, ex ->
                assertThat(ex.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN)
        );
```

## 一句话总结

第十九版把失败事件从“可查、可重放”继续升级为“可分派、可忽略、可关闭”的运维处理对象，项目开始具备真正后台故障处理台账的味道。
