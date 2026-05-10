# 第十六版：失败事件重放权限和原因记录

第十五版已经完成失败事件重放审计：

```text
重放请求
 -> X-Operator-Id
 -> failed_event_replay_attempts
 -> requested_* / effective_* / status
```

第十六版继续补两个更接近生产运维的约束：

```text
只有允许角色才能重放
每次重放必须填写原因
```

因此重放接口现在不再只是“谁点了按钮”，而是能回答：

```text
谁操作的
以什么角色操作的
为什么操作
有没有被拒绝
最终是否投递成功
```

## 本版新增和修改文件

```text
src/main/java/com/codexdemo/orderplatform/notification/FailedEventReplayProperties.java
 -> 失败事件重放权限配置，默认允许 ORDER_SUPPORT / SRE / SYSTEM

src/main/java/com/codexdemo/orderplatform/notification/ReplayFailedEventRequest.java
 -> 增加 reason 字段，重放原因必填

src/main/java/com/codexdemo/orderplatform/notification/FailedEventReplayAttempt.java
 -> 审计表增加 operatorRole 和 reason

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageService.java
 -> 重放前校验 operatorId、operatorRole、reason

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageController.java
 -> 重放接口读取 X-Operator-Role

src/main/resources/db/migration/h2/V6__failed_event_replay_authorization.sql
src/main/resources/db/migration/postgresql/V6__failed_event_replay_authorization.sql
 -> 审计表补 operator_role 和 reason 字段

src/test/java/com/codexdemo/orderplatform/RabbitMqNotificationFailureIntegrationTests.java
 -> 验证未授权角色被拒绝，授权角色成功重放并写入 role/reason
```

## 权限配置

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventReplayProperties.java`

```java
@Component
@ConfigurationProperties(prefix = "failed-event.replay")
public class FailedEventReplayProperties {
```

默认允许角色：

```java
private List<String> allowedRoles = new ArrayList<>(List.of("ORDER_SUPPORT", "SRE", "SYSTEM"));

private String systemRole = "SYSTEM";
```

判断角色是否允许：

```java
public boolean isAllowedRole(String role) {
    if (role == null || role.isBlank()) {
        return false;
    }
    String normalizedRole = normalize(role);
    return allowedRoles.stream()
            .map(this::normalize)
            .anyMatch(normalizedRole::equals);
}
```

角色会统一转成大写：

```java
public String normalize(String role) {
    return role == null ? null : role.strip().toUpperCase();
}
```

对应配置：

```yaml
failed-event:
  replay:
    allowed-roles:
      - ORDER_SUPPORT
      - SRE
      - SYSTEM
    system-role: SYSTEM
```

RabbitMQ profile 支持环境变量覆盖：

```yaml
failed-event:
  replay:
    allowed-roles: ${FAILED_EVENT_REPLAY_ALLOWED_ROLES:ORDER_SUPPORT,SRE,SYSTEM}
    system-role: ${FAILED_EVENT_REPLAY_SYSTEM_ROLE:SYSTEM}
```

## 重放请求增加 reason

文件：`src/main/java/com/codexdemo/orderplatform/notification/ReplayFailedEventRequest.java`

```java
public record ReplayFailedEventRequest(
        String eventId,
        String eventType,
        String aggregateType,
        String aggregateId,
        String payload,
        String reason
) {
}
```

`reason` 用来写入审计表，说明这次为什么重放。例如：

```json
{
  "eventId": "16161616-1616-1616-1616-161616161616",
  "reason": "repair missing eventId after checking DLQ payload"
}
```

## Controller 读取角色头

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageController.java`

```java
@PostMapping("/{id}/replay")
public FailedEventMessageResponse replayFailedMessage(
        @PathVariable Long id,
        @RequestHeader(value = "X-Operator-Id", required = false) String operatorId,
        @RequestHeader(value = "X-Operator-Role", required = false) String operatorRole,
        @RequestBody(required = false) ReplayFailedEventRequest request
) {
    return failedEventMessageService.replay(id, request, operatorId, operatorRole);
}
```

现在重放调用需要同时带：

```text
X-Operator-Id
X-Operator-Role
request.reason
```

调用示例：

```powershell
$body = @{
  eventId = "16161616-1616-1616-1616-161616161616"
  reason = "repair missing eventId after checking DLQ payload"
} | ConvertTo-Json

Invoke-RestMethod `
  -Method Post `
  -Uri http://localhost:8080/api/v1/failed-events/1/replay `
  -ContentType "application/json" `
  -Headers @{
    "X-Operator-Id" = "local-admin"
    "X-Operator-Role" = "SRE"
  } `
  -Body $body
```

## Service 校验顺序

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageService.java`

重放入口：

```java
public FailedEventMessageResponse replay(
        Long id,
        ReplayFailedEventRequest request,
        String operatorId,
        String operatorRole
) {
```

先查失败消息：

```java
FailedEventMessage failedMessage = failedEventMessageRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "failed event message not found"));
```

再校验操作者、角色和原因：

```java
String normalizedOperatorId = normalizeOperatorId(operatorId);
String normalizedOperatorRole = requireAllowedOperatorRole(operatorRole);
String reason = resolveReplayReason(request);
```

### operatorId 必填

```java
private String normalizeOperatorId(String operatorId) {
    if (operatorId == null || operatorId.isBlank()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "X-Operator-Id header is required");
    }
    String normalized = operatorId.strip();
    return truncate(normalized.strip(), 80);
}
```

缺少 `X-Operator-Id` 返回 400。

### operatorRole 必须允许

```java
private String requireAllowedOperatorRole(String operatorRole) {
    if (operatorRole == null || operatorRole.isBlank()) {
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "X-Operator-Role header is required");
    }
    String normalizedRole = failedEventReplayProperties.normalize(operatorRole);
    if (!failedEventReplayProperties.isAllowedRole(normalizedRole)) {
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "operator role is not allowed to replay failed events");
    }
    return truncate(normalizedRole, 80);
}
```

未授权角色返回 403。

### reason 必填

```java
private String resolveReplayReason(ReplayFailedEventRequest request) {
    String reason = request == null ? null : request.reason();
    if (reason == null || reason.isBlank()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "reason is required for replay");
    }
    return truncate(reason.strip(), 500);
}
```

缺少原因返回 400。

这三个校验都发生在真正投递 RabbitMQ 和写审计之前，所以非法请求不会产生审计尝试，也不会误投递消息。

## 审计表扩展

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventReplayAttempt.java`

新增字段：

```java
@Column(name = "operator_role", nullable = false, length = 80)
private String operatorRole;

@Column(nullable = false, length = 500)
private String reason;
```

创建审计记录时一起写入：

```java
failedEventReplayAttemptRepository.save(FailedEventReplayAttempt.record(
        failedMessage,
        operatorId,
        operatorRole,
        reason,
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
```

响应体也同步暴露：

```java
public record FailedEventReplayAttemptResponse(
        Long id,
        Long failedEventMessageId,
        String operatorId,
        String operatorRole,
        String reason,
        ...
) {
}
```

## Flyway V6

文件：`src/main/resources/db/migration/h2/V6__failed_event_replay_authorization.sql`

```sql
alter table failed_event_replay_attempts
    add column operator_role varchar(80) not null default 'UNKNOWN';

alter table failed_event_replay_attempts
    add column reason varchar(500) not null default 'not recorded before v16';
```

PostgreSQL 版本保持一致：

```text
src/main/resources/db/migration/postgresql/V6__failed_event_replay_authorization.sql
```

PostgreSQL 集成测试同步验证迁移数：

```java
assertThat(appliedMigrations).isEqualTo(6);
```

表数量仍然是 11，因为 v16 是给已有审计表加字段，不新增表。

## 集成测试验证点

文件：`src/test/java/com/codexdemo/orderplatform/RabbitMqNotificationFailureIntegrationTests.java`

先构造带原因的重放请求：

```java
ReplayFailedEventRequest replayRequest = new ReplayFailedEventRequest(
        REPLAY_EVENT_ID,
        null,
        null,
        null,
        null,
        "repair missing event id after DLQ verification"
);
```

未授权角色先被拒绝：

```java
assertThatThrownBy(() -> failedEventMessageService.replay(
        failedMessage.getId(),
        replayRequest,
        "qa-operator",
        "VIEWER"
))
        .isInstanceOfSatisfying(ResponseStatusException.class, ex ->
                assertThat(ex.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN)
        );
```

并断言没有写审计：

```java
assertThat(failedEventReplayAttemptRepository
        .findByFailedEventMessageIdOrderByAttemptedAtDescIdDesc(failedMessage.getId()))
        .isEmpty();
```

授权角色成功重放：

```java
FailedEventMessageResponse replayed = failedEventMessageService.replay(
        failedMessage.getId(),
        replayRequest,
        "qa-operator",
        "ORDER_SUPPORT"
);
```

审计记录必须包含 role 和 reason：

```java
assertThat(replayAttempt.getOperatorId()).isEqualTo("qa-operator");
assertThat(replayAttempt.getOperatorRole()).isEqualTo("ORDER_SUPPORT");
assertThat(replayAttempt.getReason()).isEqualTo("repair missing event id after DLQ verification");
assertThat(replayAttempt.getStatus()).isEqualTo(FailedEventReplayAttemptStatus.SUCCEEDED);
```

## 本版总结

第十六版把失败事件重放从“可审计”推进到“有基础权限约束”：

```text
X-Operator-Id 必填
X-Operator-Role 必须属于允许角色
reason 必填
非法请求不投递 RabbitMQ、不写审计
合法请求写入 operatorRole 和 reason
```

这不是完整登录鉴权系统，但已经给后续接入 Spring Security、JWT、RBAC 和审批流预留了清晰的边界。
