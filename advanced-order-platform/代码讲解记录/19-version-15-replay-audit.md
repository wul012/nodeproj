# 第十五版：失败事件重放审计

第十四版已经完成失败事件修复重放：

```text
failed_event_messages
 -> POST /api/v1/failed-events/{id}/replay
 -> RabbitMQ 重新投递
 -> notification_messages
 -> failed_event_messages.status = REPLAYED
```

第十五版继续补“谁操作、操作了什么、结果如何”的审计能力：

```text
发起重放
 -> 读取 X-Operator-Id
 -> 记录请求修复字段
 -> 记录最终生效字段
 -> 记录 SUCCEEDED / FAILED / SKIPPED_ALREADY_REPLAYED
 -> GET /api/v1/failed-events/{id}/replay-attempts 查询审计记录
```

这一步让失败事件重放从“能操作”进一步变成“可追踪、可复盘、可交接”。

## 本版新增和修改文件

```text
src/main/java/com/codexdemo/orderplatform/notification/FailedEventReplayAttemptStatus.java
 -> 重放尝试状态枚举

src/main/java/com/codexdemo/orderplatform/notification/FailedEventReplayAttempt.java
 -> 重放审计实体，记录操作者、请求字段、生效字段、状态和错误

src/main/java/com/codexdemo/orderplatform/notification/FailedEventReplayAttemptRepository.java
 -> 重放审计仓储

src/main/java/com/codexdemo/orderplatform/notification/FailedEventReplayAttemptResponse.java
 -> 重放审计查询响应

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageService.java
 -> replay 方法写审计记录，并新增 listReplayAttempts

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageController.java
 -> replay 接收 X-Operator-Id，并新增 replay-attempts 查询接口

src/main/resources/db/migration/h2/V5__failed_event_replay_attempts.sql
src/main/resources/db/migration/postgresql/V5__failed_event_replay_attempts.sql
 -> 新增重放审计表

src/test/java/com/codexdemo/orderplatform/RabbitMqNotificationFailureIntegrationTests.java
 -> 验证重放成功后写入审计记录
```

## 重放尝试状态

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventReplayAttemptStatus.java`

```java
public enum FailedEventReplayAttemptStatus {
    SUCCEEDED,
    FAILED,
    SKIPPED_ALREADY_REPLAYED
}
```

含义：

```text
SUCCEEDED
 -> 本次重放成功投递到 RabbitMQ

FAILED
 -> 本次重放投递 RabbitMQ 时失败

SKIPPED_ALREADY_REPLAYED
 -> 失败记录已经是 REPLAYED，系统没有重复投递，但记录了这次操作尝试
```

这里特别保留 `SKIPPED_ALREADY_REPLAYED`，是为了让“重复点击重放按钮”这类操作也有审计痕迹。

## 重放审计实体

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventReplayAttempt.java`

实体映射到新表：

```java
@Entity
@Table(
        name = "failed_event_replay_attempts",
        indexes = @Index(
                name = "idx_failed_event_replay_attempts_message",
                columnList = "failed_event_message_id, attempted_at"
        )
)
public class FailedEventReplayAttempt {
```

每条审计记录关联一条失败消息：

```java
@ManyToOne(fetch = FetchType.LAZY, optional = false)
@JoinColumn(name = "failed_event_message_id", nullable = false)
private FailedEventMessage failedEventMessage;
```

记录操作者：

```java
@Column(name = "operator_id", nullable = false, length = 80)
private String operatorId;
```

记录请求体里传入的修复字段：

```java
@Column(name = "requested_event_id", length = 80)
private String requestedEventId;

@Column(name = "requested_event_type", length = 80)
private String requestedEventType;

@Column(name = "requested_aggregate_type", length = 64)
private String requestedAggregateType;

@Column(name = "requested_aggregate_id", length = 64)
private String requestedAggregateId;

@Column(name = "requested_payload", columnDefinition = "text")
private String requestedPayload;
```

再记录最终用于投递的生效字段：

```java
@Column(name = "effective_event_id", length = 80)
private String effectiveEventId;

@Column(name = "effective_event_type", length = 80)
private String effectiveEventType;

@Column(name = "effective_aggregate_type", length = 64)
private String effectiveAggregateType;

@Column(name = "effective_aggregate_id", length = 64)
private String effectiveAggregateId;

@Column(name = "effective_payload", columnDefinition = "text")
private String effectivePayload;
```

为什么要同时保存 requested 和 effective？

```text
requested 字段
 -> 操作者这次主动修了什么

effective 字段
 -> 系统最终拿什么去重放

两者对比
 -> 能看出“哪些值来自人工修复，哪些值复用了失败记录原值”
```

保存状态、错误和时间：

```java
@Enumerated(EnumType.STRING)
@Column(nullable = false, length = 32)
private FailedEventReplayAttemptStatus status;

@Column(name = "error_message", length = 500)
private String errorMessage;

@Column(name = "attempted_at", nullable = false)
private Instant attemptedAt;
```

## 审计仓储和响应体

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventReplayAttemptRepository.java`

```java
public interface FailedEventReplayAttemptRepository extends JpaRepository<FailedEventReplayAttempt, Long> {

    List<FailedEventReplayAttempt> findByFailedEventMessageIdOrderByAttemptedAtDescIdDesc(Long failedEventMessageId);
}
```

这个查询按失败消息查最近的重放尝试，新的排前面。

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventReplayAttemptResponse.java`

```java
public record FailedEventReplayAttemptResponse(
        Long id,
        Long failedEventMessageId,
        String operatorId,
        String requestedEventId,
        String requestedEventType,
        String requestedAggregateType,
        String requestedAggregateId,
        String requestedPayload,
        String effectiveEventId,
        String effectiveEventType,
        String effectiveAggregateType,
        String effectiveAggregateId,
        String effectivePayload,
        FailedEventReplayAttemptStatus status,
        String errorMessage,
        Instant attemptedAt
) {
}
```

这个响应体直接面向排查：既能看操作者，也能看修复内容和最终投递内容。

## Controller 增加操作者和审计查询

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageController.java`

重放接口现在读取请求头：

```java
@PostMapping("/{id}/replay")
public FailedEventMessageResponse replayFailedMessage(
        @PathVariable Long id,
        @RequestHeader(value = "X-Operator-Id", required = false) String operatorId,
        @RequestBody(required = false) ReplayFailedEventRequest request
) {
    return failedEventMessageService.replay(id, request, operatorId);
}
```

调用示例：

```powershell
Invoke-RestMethod `
  -Method Post `
  -Uri http://localhost:8080/api/v1/failed-events/1/replay `
  -ContentType "application/json" `
  -Headers @{ "X-Operator-Id" = "local-admin" } `
  -Body $body
```

新增审计查询接口：

```java
@GetMapping("/{id}/replay-attempts")
public List<FailedEventReplayAttemptResponse> listReplayAttempts(@PathVariable Long id) {
    return failedEventMessageService.listReplayAttempts(id);
}
```

调用：

```powershell
Invoke-RestMethod http://localhost:8080/api/v1/failed-events/1/replay-attempts
```

## Service 如何写审计

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageService.java`

注入审计仓储：

```java
private final FailedEventReplayAttemptRepository failedEventReplayAttemptRepository;
```

重放方法新增 operator 参数：

```java
@Transactional
public FailedEventMessageResponse replay(Long id, ReplayFailedEventRequest request, String operatorId) {
```

操作者会做兜底和长度保护：

```java
private String normalizeOperatorId(String operatorId) {
    String normalized = firstNonBlank(operatorId, "anonymous");
    return truncate(normalized.strip(), 80);
}
```

当失败记录已经重放成功时，不再重复投递，但会记录一次跳过：

```java
if (failedMessage.getStatus() == FailedEventMessageStatus.REPLAYED) {
    saveReplayAttempt(
            failedMessage,
            request,
            normalizedOperatorId,
            eventId,
            eventType,
            aggregateType,
            aggregateId,
            payload,
            FailedEventReplayAttemptStatus.SKIPPED_ALREADY_REPLAYED,
            null,
            replayedAt
    );
    return FailedEventMessageResponse.from(failedMessage);
}
```

重放成功时：

```java
publishReplay(failedMessage, eventId, eventType, aggregateType, aggregateId, payload);
failedMessage.markReplayed(eventId, replayedAt);
saveReplayAttempt(
        failedMessage,
        request,
        normalizedOperatorId,
        eventId,
        eventType,
        aggregateType,
        aggregateId,
        payload,
        FailedEventReplayAttemptStatus.SUCCEEDED,
        null,
        replayedAt
);
```

重放失败时：

```java
String errorMessage = truncate(errorMessage(ex), 500);
failedMessage.markReplayFailed(eventId, errorMessage, replayedAt);
saveReplayAttempt(
        failedMessage,
        request,
        normalizedOperatorId,
        eventId,
        eventType,
        aggregateType,
        aggregateId,
        payload,
        FailedEventReplayAttemptStatus.FAILED,
        errorMessage,
        replayedAt
);
```

底层保存审计记录：

```java
private void saveReplayAttempt(
        FailedEventMessage failedMessage,
        ReplayFailedEventRequest request,
        String operatorId,
        String eventId,
        String eventType,
        String aggregateType,
        String aggregateId,
        String payload,
        FailedEventReplayAttemptStatus status,
        String errorMessage,
        Instant attemptedAt
) {
    failedEventReplayAttemptRepository.save(FailedEventReplayAttempt.record(
            failedMessage,
            operatorId,
            request,
            eventId,
            eventType,
            aggregateType,
            aggregateId,
            payload,
            status,
            errorMessage,
            attemptedAt
    ));
}
```

## Flyway V5

文件：`src/main/resources/db/migration/h2/V5__failed_event_replay_attempts.sql`

```sql
create table failed_event_replay_attempts (
    id bigint generated by default as identity primary key,
    failed_event_message_id bigint not null,
    operator_id varchar(80) not null,
    requested_event_id varchar(80),
    requested_event_type varchar(80),
    requested_aggregate_type varchar(64),
    requested_aggregate_id varchar(64),
    requested_payload text,
    effective_event_id varchar(80),
    effective_event_type varchar(80),
    effective_aggregate_type varchar(64),
    effective_aggregate_id varchar(64),
    effective_payload text,
    status varchar(32) not null,
    error_message varchar(500),
    attempted_at timestamp(6) with time zone not null,
    constraint fk_failed_event_replay_attempts_message
        foreign key (failed_event_message_id) references failed_event_messages (id)
);
```

查询索引：

```sql
create index idx_failed_event_replay_attempts_message
    on failed_event_replay_attempts (failed_event_message_id, attempted_at);
```

PostgreSQL 同样有 V5：

```text
src/main/resources/db/migration/postgresql/V5__failed_event_replay_attempts.sql
```

PostgreSQL 集成测试同步验证：

```java
assertThat(appliedMigrations).isEqualTo(5);
assertThat(tableCount).isEqualTo(11);
```

## 集成测试验证点

文件：`src/test/java/com/codexdemo/orderplatform/RabbitMqNotificationFailureIntegrationTests.java`

重放时传操作者：

```java
FailedEventMessageResponse replayed = failedEventMessageService.replay(
        failedMessage.getId(),
        new ReplayFailedEventRequest(REPLAY_EVENT_ID, null, null, null, null),
        "qa-operator"
);
```

查询审计记录：

```java
FailedEventReplayAttempt replayAttempt = failedEventReplayAttemptRepository
        .findByFailedEventMessageIdOrderByAttemptedAtDescIdDesc(failedMessage.getId())
        .getFirst();
```

断言操作者、请求字段、生效字段和状态：

```java
assertThat(replayAttempt.getFailedEventMessage().getId()).isEqualTo(failedMessage.getId());
assertThat(replayAttempt.getOperatorId()).isEqualTo("qa-operator");
assertThat(replayAttempt.getRequestedEventId()).isEqualTo(REPLAY_EVENT_ID);
assertThat(replayAttempt.getRequestedEventType()).isNull();
assertThat(replayAttempt.getEffectiveEventId()).isEqualTo(REPLAY_EVENT_ID);
assertThat(replayAttempt.getEffectiveEventType()).isEqualTo("OrderCreated");
assertThat(replayAttempt.getEffectiveAggregateId()).isEqualTo("404");
assertThat(replayAttempt.getEffectivePayload()).contains("\"orderId\":404");
assertThat(replayAttempt.getStatus()).isEqualTo(FailedEventReplayAttemptStatus.SUCCEEDED);
assertThat(replayAttempt.getErrorMessage()).isNull();
assertThat(replayAttempt.getAttemptedAt()).isNotNull();
```

这说明审计不是“只建了表”，而是真正跟重放链路打通了。

## 本版总结

第十五版让失败事件重放具备了操作审计能力：

```text
X-Operator-Id 记录操作者
requested_* 记录人工修复输入
effective_* 记录最终投递内容
status 记录重放尝试结果
replay-attempts 接口提供排查入口
Flyway V5 和 Testcontainers 验证真实数据库结构
```

到这里，消息失败治理链路已经从“失败可见、失败可重放”推进到“失败重放可审计”。下一步更适合继续做权限控制、重放审批或管理端页面。
