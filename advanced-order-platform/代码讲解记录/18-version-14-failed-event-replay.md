# 第十四版：失败事件修复重放

第十三版已经做到“坏消息不丢”：消费失败后进入 DLQ，再落到 `failed_event_messages` 表里。
第十四版继续把这条链路补成可运维闭环：

```text
失败消息已落库
 -> 查询 failed_event_messages
 -> 修复缺失 header 或 payload
 -> POST /api/v1/failed-events/{id}/replay
 -> 重新投递到 order-platform.outbox
 -> 业务消费者重新处理
 -> 更新失败记录的重放状态
```

这一步的重点是：失败事件不再只是“看得见”，而是可以被人工或后台工具修复后重新进入正常业务链路。

## 本版新增和修改文件

```text
src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageStatus.java
 -> 失败事件消息状态枚举

src/main/java/com/codexdemo/orderplatform/notification/ReplayFailedEventRequest.java
 -> 重放接口请求体，允许补 eventId、eventType、aggregateType、aggregateId、payload

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessage.java
 -> 增加状态、重放次数、最后重放时间、最后重放 eventId、最后重放错误

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageService.java
 -> 增加 replay 方法，把失败消息重新投递到 RabbitMQ

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageController.java
 -> 增加 POST /api/v1/failed-events/{id}/replay

src/main/java/com/codexdemo/orderplatform/outbox/OutboxRabbitMqProperties.java
 -> 增加 routingKeyForEventType，给重放逻辑复用 routing key 规则

src/main/resources/db/migration/h2/V4__failed_event_replay_state.sql
src/main/resources/db/migration/postgresql/V4__failed_event_replay_state.sql
 -> 失败事件重放状态字段迁移

src/test/java/com/codexdemo/orderplatform/RabbitMqNotificationFailureIntegrationTests.java
 -> 验证坏消息落库后可以补 eventId 并重放成功
```

## 失败事件状态

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageStatus.java`

```java
public enum FailedEventMessageStatus {
    RECORDED,
    REPLAYED,
    REPLAY_FAILED
}
```

三个状态分别表示：

```text
RECORDED
 -> DLQ 消息已经被记录，尚未重放

REPLAYED
 -> 已经成功重新投递到业务 exchange

REPLAY_FAILED
 -> 尝试重放时 RabbitMQ 投递异常，错误会记录到 lastReplayError
```

这里的 `REPLAYED` 表示“重新投递成功”，不是最终业务一定完成。业务最终是否完成，要继续看消费者写入的业务表，比如本项目里的 `notification_messages`。

## 失败消息实体升级

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessage.java`

第十三版的失败消息只有失败现场字段：

```java
private String messageId;
private String eventId;
private String eventType;
private String aggregateType;
private String aggregateId;
private String sourceQueue;
private String deadLetterQueue;
private String failureReason;
private String payload;
private Instant failedAt;
```

第十四版新增重放状态字段：

```java
@Enumerated(EnumType.STRING)
@Column(nullable = false, length = 32)
private FailedEventMessageStatus status;

@Column(name = "replay_count", nullable = false)
private int replayCount;

@Column(name = "last_replayed_at")
private Instant lastReplayedAt;

@Column(name = "last_replay_event_id", length = 80)
private String lastReplayEventId;

@Column(name = "last_replay_error", length = 500)
private String lastReplayError;
```

新失败消息默认是 `RECORDED`：

```java
this.status = FailedEventMessageStatus.RECORDED;
this.replayCount = 0;
```

重放成功时更新状态：

```java
public void markReplayed(String replayEventId, Instant replayedAt) {
    this.status = FailedEventMessageStatus.REPLAYED;
    this.replayCount++;
    this.lastReplayEventId = replayEventId;
    this.lastReplayedAt = replayedAt;
    this.lastReplayError = null;
}
```

重放失败时也会记录一次尝试：

```java
public void markReplayFailed(String replayEventId, String replayError, Instant replayedAt) {
    this.status = FailedEventMessageStatus.REPLAY_FAILED;
    this.replayCount++;
    this.lastReplayEventId = replayEventId;
    this.lastReplayedAt = replayedAt;
    this.lastReplayError = replayError;
}
```

这样失败表就不只是“错误收集箱”，而变成了带处理状态的运维工作台数据。

## 重放请求体

文件：`src/main/java/com/codexdemo/orderplatform/notification/ReplayFailedEventRequest.java`

```java
public record ReplayFailedEventRequest(
        String eventId,
        String eventType,
        String aggregateType,
        String aggregateId,
        String payload
) {
}
```

设计成全字段可选，是为了支持两类场景：

```text
原失败消息字段完整
 -> 可以直接重放，服务使用失败记录里的 eventType、aggregateType、aggregateId、payload

原失败消息字段缺失或错误
 -> 请求体补正确字段，比如补 eventId 或修 payload
```

第十三版演示的坏消息正好缺少 `eventId`，所以第十四版运行调试时用请求体补了一个新的 UUID。

## 重放入口

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageController.java`

查询接口仍然保留：

```java
@GetMapping
public List<FailedEventMessageResponse> listRecentFailedMessages() {
    return failedEventMessageService.listRecentFailedMessages();
}
```

新增重放接口：

```java
@PostMapping("/{id}/replay")
public FailedEventMessageResponse replayFailedMessage(
        @PathVariable Long id,
        @RequestBody(required = false) ReplayFailedEventRequest request
) {
    return failedEventMessageService.replay(id, request);
}
```

调用形式：

```powershell
$body = @{
  eventId = "14141414-1414-1414-1414-141414141414"
} | ConvertTo-Json

Invoke-RestMethod `
  -Method Post `
  -Uri http://localhost:8080/api/v1/failed-events/1/replay `
  -ContentType "application/json" `
  -Body $body
```

## 重放服务主流程

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageService.java`

先查失败记录：

```java
FailedEventMessage failedMessage = failedEventMessageRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "failed event message not found"));
```

已经重放成功的记录不会重复投递：

```java
if (failedMessage.getStatus() == FailedEventMessageStatus.REPLAYED) {
    return FailedEventMessageResponse.from(failedMessage);
}
```

RabbitMQ Outbox 没启用时拒绝重放：

```java
if (!outboxRabbitMqProperties.isEnabled()) {
    throw new ResponseStatusException(HttpStatus.CONFLICT, "RabbitMQ outbox is disabled");
}
```

然后合并“请求体修复值”和“原失败记录值”：

```java
String eventId = resolveReplayEventId(failedMessage, request);
String eventType = requiredReplayField("eventType", firstNonBlank(requestEventType(request), failedMessage.getEventType()));
String aggregateType = requiredReplayField(
        "aggregateType",
        firstNonBlank(requestAggregateType(request), failedMessage.getAggregateType())
);
String aggregateId = requiredReplayField(
        "aggregateId",
        firstNonBlank(requestAggregateId(request), failedMessage.getAggregateId())
);
String payload = requiredReplayField("payload", firstNonBlank(requestPayload(request), failedMessage.getPayload()));
```

这个优先级很重要：

```text
请求体字段
 -> 优先使用，用于人工修复

失败记录字段
 -> 请求体没传时复用原始失败现场

eventId 特殊处理
 -> 请求体没传、失败记录也没有时，自动生成新的 UUID
```

eventId 会强制校验为 UUID：

```java
private String resolveReplayEventId(FailedEventMessage failedMessage, ReplayFailedEventRequest request) {
    String eventId = firstNonBlank(requestEventId(request), failedMessage.getEventId(), UUID.randomUUID().toString());
    try {
        UUID.fromString(eventId);
        return eventId;
    } catch (IllegalArgumentException ex) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "eventId must be a valid UUID", ex);
    }
}
```

原因是通知消费者里会这样解析：

```java
UUID eventId = UUID.fromString(headerAsString(message, "eventId"));
```

如果重放时给了非法 eventId，消息会再次失败。入口处先校验，可以少走一次无意义的 DLQ。

## 重新投递 RabbitMQ

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageService.java`

核心投递代码：

```java
rabbitTemplate.convertAndSend(
        outboxRabbitMqProperties.getExchange(),
        outboxRabbitMqProperties.routingKeyForEventType(eventType),
        payload,
        message -> {
            message.getMessageProperties().setContentType("application/json");
            message.getMessageProperties().setMessageId(eventId);
            message.getMessageProperties().setHeader("eventId", eventId);
            message.getMessageProperties().setHeader("aggregateType", aggregateType);
            message.getMessageProperties().setHeader("aggregateId", aggregateId);
            message.getMessageProperties().setHeader("eventType", eventType);
            message.getMessageProperties().setHeader("replayedFromFailedEventId", failedMessage.getId());
            message.getMessageProperties().setHeader("replayedFromMessageId", failedMessage.getMessageId());
            return message;
        }
);
```

这里复用了 Outbox 的 exchange 和 routing key 规则，所以重放消息和正常 Outbox 消息进入同一个业务消费路径：

```text
outboxRabbitMqProperties.getExchange()
 -> order-platform.outbox

outboxRabbitMqProperties.routingKeyForEventType("OrderCreated")
 -> orders.OrderCreated
```

文件：`src/main/java/com/codexdemo/orderplatform/outbox/OutboxRabbitMqProperties.java`

```java
public String routingKeyFor(OutboxEvent event) {
    return routingKeyForEventType(event.getEventType());
}

public String routingKeyForEventType(String eventType) {
    return routingKeyPrefix + "." + eventType;
}
```

这个小改动避免重放逻辑自己拼 routing key，从而保证正常发布和重放发布使用同一套规则。

## 响应体扩展

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageResponse.java`

```java
public record FailedEventMessageResponse(
        Long id,
        String messageId,
        String eventId,
        String eventType,
        String aggregateType,
        String aggregateId,
        String sourceQueue,
        String deadLetterQueue,
        String failureReason,
        String payload,
        Instant failedAt,
        FailedEventMessageStatus status,
        int replayCount,
        Instant lastReplayedAt,
        String lastReplayEventId,
        String lastReplayError
) {
}
```

所以查询失败事件时，不仅能看到失败现场，还能看到它有没有被处理过：

```text
status
replayCount
lastReplayedAt
lastReplayEventId
lastReplayError
```

## Flyway V4

文件：`src/main/resources/db/migration/h2/V4__failed_event_replay_state.sql`

```sql
alter table failed_event_messages
    add column status varchar(32) not null default 'RECORDED';

alter table failed_event_messages
    add column replay_count integer not null default 0;

alter table failed_event_messages
    add column last_replayed_at timestamp(6) with time zone;

alter table failed_event_messages
    add column last_replay_event_id varchar(80);

alter table failed_event_messages
    add column last_replay_error varchar(500);
```

再给状态加索引：

```sql
create index idx_failed_event_messages_status
    on failed_event_messages (status);
```

PostgreSQL 版本保持同样结构：

```text
src/main/resources/db/migration/postgresql/V4__failed_event_replay_state.sql
```

PostgreSQL 集成测试同步把迁移数改为 4：

```java
assertThat(appliedMigrations).isEqualTo(4);
```

## 集成测试如何证明闭环

文件：`src/test/java/com/codexdemo/orderplatform/RabbitMqNotificationFailureIntegrationTests.java`

先发送一条故意缺少 `eventId` 的坏消息：

```java
rabbitTemplate.convertAndSend(
        OUTBOX_EXCHANGE,
        "orders.OrderCreated",
        "{\"orderId\":404,\"status\":\"CREATED\"}",
        message -> {
            message.getMessageProperties().setContentType("application/json");
            message.getMessageProperties().setMessageId(BAD_MESSAGE_ID);
            message.getMessageProperties().setHeader("aggregateType", "ORDER");
            message.getMessageProperties().setHeader("aggregateId", "404");
            message.getMessageProperties().setHeader("eventType", "OrderCreated");
            return message;
        }
);
```

断言它进入失败表，而且尚未重放：

```java
assertThat(failedMessage.getStatus()).isEqualTo(FailedEventMessageStatus.RECORDED);
assertThat(failedMessage.getReplayCount()).isZero();
assertThat(failedMessage.getLastReplayedAt()).isNull();
```

然后补一个合法 `eventId` 并调用重放：

```java
FailedEventMessageResponse replayed = failedEventMessageService.replay(
        failedMessage.getId(),
        new ReplayFailedEventRequest(REPLAY_EVENT_ID, null, null, null, null)
);
```

等待通知消费者重新消费成功：

```java
NotificationMessage notification = waitForNotificationMessageCount(1).getFirst();
```

最终断言失败表和通知表都正确：

```java
assertThat(replayed.status()).isEqualTo(FailedEventMessageStatus.REPLAYED);
assertThat(replayed.replayCount()).isEqualTo(1);
assertThat(replayed.lastReplayEventId()).isEqualTo(REPLAY_EVENT_ID);
assertThat(notification.getEventId()).isEqualTo(UUID.fromString(REPLAY_EVENT_ID));
assertThat(notification.getEventType()).isEqualTo("OrderCreated");
assertThat(notification.getOrderId()).isEqualTo(404L);
```

这个测试覆盖了完整链路：

```text
坏消息
 -> 消费失败
 -> retry
 -> DLQ
 -> failed_event_messages
 -> 修复 eventId
 -> replay
 -> OrderNotificationListener
 -> notification_messages
```

## 本版总结

第十四版把失败事件从“可查询”推进到“可处理”：

```text
失败事件表增加状态
重放接口支持补 header/payload
RabbitMQ 重放复用 Outbox exchange 和 routing key
重放结果回写 failed_event_messages
集成测试验证坏消息修复后能重新生成通知
```

后续如果继续往生产级推进，最适合补的是权限控制、操作审计、重放前预校验、批量重放和管理端页面。
