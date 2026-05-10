# 第十七版：失败事件和重放审计筛选查询

第十六版已经把失败事件重放做成了：

```text
有角色校验
有操作人
有重放原因
有审计记录
```

第十七版继续补运维排查能力。之前的失败事件接口更像“最近列表”：

```text
GET /api/v1/failed-events
 -> 最近 50 条

GET /api/v1/failed-events/{id}/replay-attempts
 -> 某条失败事件的重放审计
```

v17 之后可以按条件筛选：

```text
失败事件
 -> status / eventType / aggregateType / aggregateId / failedFrom / failedTo / limit

重放审计
 -> failedEventMessageId / status / operatorId / operatorRole / attemptedFrom / attemptedTo / limit
```

## 本版新增和修改文件

```text
src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageSearchCriteria.java
 -> 失败事件查询条件对象

src/main/java/com/codexdemo/orderplatform/notification/FailedEventReplayAttemptSearchCriteria.java
 -> 重放审计查询条件对象

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageController.java
 -> GET /failed-events 支持查询参数；新增 GET /failed-events/replay-attempts

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageService.java
 -> 用 Specification 动态拼接筛选条件

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageRepository.java
src/main/java/com/codexdemo/orderplatform/notification/FailedEventReplayAttemptRepository.java
 -> 扩展 JpaSpecificationExecutor

src/main/resources/db/migration/h2/V7__failed_event_search_indexes.sql
src/main/resources/db/migration/postgresql/V7__failed_event_search_indexes.sql
 -> 给筛选字段补索引

src/test/java/com/codexdemo/orderplatform/FailedEventSearchIntegrationTests.java
 -> 验证失败事件筛选、重放审计筛选、非法 limit/时间范围
```

## 查询条件对象

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageSearchCriteria.java`

```java
public record FailedEventMessageSearchCriteria(
        FailedEventMessageStatus status,
        String eventType,
        String aggregateType,
        String aggregateId,
        Instant failedFrom,
        Instant failedTo,
        Integer limit
) {
}
```

这不是数据库实体，而是“查询意图”：

```text
status
 -> 查 RECORDED / REPLAYED / REPLAY_FAILED

eventType
 -> 查 OrderCreated、PaymentCaptured 这类事件类型

aggregateType + aggregateId
 -> 定位某个业务聚合，例如 ORDER + 404

failedFrom + failedTo
 -> 只看某个时间窗口内失败的事件

limit
 -> 控制最多返回多少条
```

重放审计也有自己的条件对象。

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventReplayAttemptSearchCriteria.java`

```java
public record FailedEventReplayAttemptSearchCriteria(
        Long failedEventMessageId,
        FailedEventReplayAttemptStatus status,
        String operatorId,
        String operatorRole,
        Instant attemptedFrom,
        Instant attemptedTo,
        Integer limit
) {
}
```

这里关注的是“谁对哪条失败事件做过什么重放尝试”：

```text
failedEventMessageId
 -> 某条失败事件

status
 -> SUCCEEDED / FAILED / SKIPPED_ALREADY_REPLAYED

operatorId
 -> 具体操作人

operatorRole
 -> 操作角色，例如 SRE

attemptedFrom + attemptedTo
 -> 操作发生的时间窗口
```

## Controller：把 HTTP 查询参数转成 Criteria

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageController.java`

失败事件筛选：

```java
@GetMapping
public List<FailedEventMessageResponse> searchFailedMessages(
        @RequestParam(required = false) FailedEventMessageStatus status,
        @RequestParam(required = false) String eventType,
        @RequestParam(required = false) String aggregateType,
        @RequestParam(required = false) String aggregateId,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant failedFrom,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant failedTo,
        @RequestParam(required = false) Integer limit
) {
    return failedEventMessageService.searchFailedMessages(new FailedEventMessageSearchCriteria(
            status,
            eventType,
            aggregateType,
            aggregateId,
            failedFrom,
            failedTo,
            limit
    ));
}
```

调用示例：

```powershell
Invoke-RestMethod "http://localhost:8080/api/v1/failed-events?status=RECORDED&eventType=OrderCreated&aggregateId=404&limit=20"
```

重放审计全局筛选：

```java
@GetMapping("/replay-attempts")
public List<FailedEventReplayAttemptResponse> searchReplayAttempts(
        @RequestParam(required = false) Long failedEventMessageId,
        @RequestParam(required = false) FailedEventReplayAttemptStatus status,
        @RequestParam(required = false) String operatorId,
        @RequestParam(required = false) String operatorRole,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant attemptedFrom,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant attemptedTo,
        @RequestParam(required = false) Integer limit
) {
    return failedEventMessageService.searchReplayAttempts(new FailedEventReplayAttemptSearchCriteria(
            failedEventMessageId,
            status,
            operatorId,
            operatorRole,
            attemptedFrom,
            attemptedTo,
            limit
    ));
}
```

调用示例：

```powershell
Invoke-RestMethod "http://localhost:8080/api/v1/failed-events/replay-attempts?status=SUCCEEDED&operatorRole=SRE&limit=20"
```

原来的单条失败事件审计查询仍然保留：

```java
@GetMapping("/{id}/replay-attempts")
public List<FailedEventReplayAttemptResponse> listReplayAttempts(@PathVariable Long id) {
    return failedEventMessageService.listReplayAttempts(id);
}
```

也就是：

```text
GET /api/v1/failed-events/1/replay-attempts
```

仍然可用。

## Repository：支持 Specification

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageRepository.java`

```java
public interface FailedEventMessageRepository
        extends JpaRepository<FailedEventMessage, Long>, JpaSpecificationExecutor<FailedEventMessage> {

    Optional<FailedEventMessage> findByMessageId(String messageId);
}
```

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventReplayAttemptRepository.java`

```java
public interface FailedEventReplayAttemptRepository
        extends JpaRepository<FailedEventReplayAttempt, Long>, JpaSpecificationExecutor<FailedEventReplayAttempt> {

    List<FailedEventReplayAttempt> findByFailedEventMessageIdOrderByAttemptedAtDescIdDesc(Long failedEventMessageId);
}
```

`JpaSpecificationExecutor` 的意义是：查询条件不是固定方法名，而是运行时动态拼出来。

如果不用它，可能会膨胀成：

```text
findByStatus
findByStatusAndEventType
findByStatusAndEventTypeAndAggregateId
findByOperatorRoleAndStatusAndAttemptedAtBetween
...
```

条件越多，派生查询方法越难维护。

## Service：动态拼失败事件筛选条件

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageService.java`

入口方法：

```java
@Transactional(readOnly = true)
public List<FailedEventMessageResponse> searchFailedMessages(FailedEventMessageSearchCriteria criteria) {
    FailedEventMessageSearchCriteria normalizedCriteria = criteria == null
            ? new FailedEventMessageSearchCriteria(null, null, null, null, null, null, null)
            : criteria;
    validateTimeRange(normalizedCriteria.failedFrom(), normalizedCriteria.failedTo(), "failedFrom", "failedTo");
    int limit = normalizeSearchLimit(normalizedCriteria.limit());
    return failedEventMessageRepository
            .findAll(
                    failedMessagesMatching(normalizedCriteria),
                    PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "failedAt", "id"))
            )
            .getContent()
            .stream()
            .map(FailedEventMessageResponse::from)
            .toList();
}
```

重点有三层：

```text
validateTimeRange
 -> from 不能晚于 to

normalizeSearchLimit
 -> limit 必须在 1 到 200

Specification + PageRequest
 -> 动态条件 + 固定排序 + 返回条数控制
```

失败事件条件拼接：

```java
private Specification<FailedEventMessage> failedMessagesMatching(FailedEventMessageSearchCriteria criteria) {
    return (root, query, criteriaBuilder) -> {
        List<Predicate> predicates = new ArrayList<>();
        if (criteria.status() != null) {
            predicates.add(criteriaBuilder.equal(root.get("status"), criteria.status()));
        }
        addTextEquals(predicates, criteriaBuilder, root.get("eventType"), criteria.eventType());
        addTextEquals(predicates, criteriaBuilder, root.get("aggregateType"), criteria.aggregateType());
        addTextEquals(predicates, criteriaBuilder, root.get("aggregateId"), criteria.aggregateId());
        if (criteria.failedFrom() != null) {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("failedAt"), criteria.failedFrom()));
        }
        if (criteria.failedTo() != null) {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("failedAt"), criteria.failedTo()));
        }
        return criteriaBuilder.and(predicates.toArray(Predicate[]::new));
    };
}
```

这里的思路很直接：

```text
参数有值
 -> 加一个 predicate

参数没值
 -> 不限制这一项

最后把 predicates 用 and 串起来
```

## Service：动态拼重放审计筛选条件

入口方法：

```java
@Transactional(readOnly = true)
public List<FailedEventReplayAttemptResponse> searchReplayAttempts(FailedEventReplayAttemptSearchCriteria criteria) {
    FailedEventReplayAttemptSearchCriteria normalizedCriteria = criteria == null
            ? new FailedEventReplayAttemptSearchCriteria(null, null, null, null, null, null, null)
            : criteria;
    validateTimeRange(
            normalizedCriteria.attemptedFrom(),
            normalizedCriteria.attemptedTo(),
            "attemptedFrom",
            "attemptedTo"
    );
    int limit = normalizeSearchLimit(normalizedCriteria.limit());
    return failedEventReplayAttemptRepository
            .findAll(
                    replayAttemptsMatching(normalizedCriteria),
                    PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "attemptedAt", "id"))
            )
            .getContent()
            .stream()
            .map(FailedEventReplayAttemptResponse::from)
            .toList();
}
```

审计条件拼接：

```java
private Specification<FailedEventReplayAttempt> replayAttemptsMatching(
        FailedEventReplayAttemptSearchCriteria criteria
) {
    return (root, query, criteriaBuilder) -> {
        List<Predicate> predicates = new ArrayList<>();
        if (criteria.failedEventMessageId() != null) {
            predicates.add(criteriaBuilder.equal(
                    root.get("failedEventMessage").get("id"),
                    criteria.failedEventMessageId()
            ));
        }
        if (criteria.status() != null) {
            predicates.add(criteriaBuilder.equal(root.get("status"), criteria.status()));
        }
        addTextEquals(predicates, criteriaBuilder, root.get("operatorId"), criteria.operatorId());
        addTextEquals(
                predicates,
                criteriaBuilder,
                root.get("operatorRole"),
                failedEventReplayProperties.normalize(criteria.operatorRole())
        );
        if (criteria.attemptedFrom() != null) {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("attemptedAt"), criteria.attemptedFrom()));
        }
        if (criteria.attemptedTo() != null) {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("attemptedAt"), criteria.attemptedTo()));
        }
        return criteriaBuilder.and(predicates.toArray(Predicate[]::new));
    };
}
```

这里多了一个细节：

```java
failedEventReplayProperties.normalize(criteria.operatorRole())
```

也就是说查询参数里传：

```text
sre
SRE
 Sre
```

都会按 `SRE` 查询，和 v16 的角色校验规则保持一致。

## 通用校验

空字符串会被当作“没有这个查询条件”：

```java
private String normalizeSearchText(String value) {
    return StringUtils.hasText(value) ? value.strip() : null;
}
```

限制 limit：

```java
private int normalizeSearchLimit(Integer limit) {
    if (limit == null) {
        return 50;
    }
    if (limit < 1 || limit > 200) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "limit must be between 1 and 200");
    }
    return limit;
}
```

校验时间范围：

```java
private void validateTimeRange(Instant from, Instant to, String fromName, String toName) {
    if (from != null && to != null && from.isAfter(to)) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, fromName + " must be before or equal to " + toName);
    }
}
```

这样接口不会接受明显错误的查询：

```text
limit=0
limit=201
failedFrom 晚于 failedTo
attemptedFrom 晚于 attemptedTo
```

## 数据库索引

文件：`src/main/resources/db/migration/h2/V7__failed_event_search_indexes.sql`

文件：`src/main/resources/db/migration/postgresql/V7__failed_event_search_indexes.sql`

```sql
create index idx_failed_event_messages_status_failed_at
    on failed_event_messages (status, failed_at);

create index idx_failed_event_messages_event_type_failed_at
    on failed_event_messages (event_type, failed_at);

create index idx_failed_event_messages_aggregate
    on failed_event_messages (aggregate_type, aggregate_id);

create index idx_failed_event_replay_attempts_status
    on failed_event_replay_attempts (status, attempted_at);

create index idx_failed_event_replay_attempts_operator_role
    on failed_event_replay_attempts (operator_role, attempted_at);

create index idx_failed_event_replay_attempts_operator_id
    on failed_event_replay_attempts (operator_id, attempted_at);
```

索引和查询条件是一一对应的：

```text
status + failed_at
 -> 看某种状态最近失败了什么

event_type + failed_at
 -> 看某种事件最近失败情况

aggregate_type + aggregate_id
 -> 定位某个订单/支付聚合

operator_role + attempted_at
 -> 看某个角色最近做了哪些重放操作

operator_id + attempted_at
 -> 看某个具体人员最近做了哪些重放操作
```

实体上也同步标注索引，方便读代码的人直接看到查询意图。

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessage.java`

```java
@Index(name = "idx_failed_event_messages_status_failed_at", columnList = "status, failed_at"),
@Index(name = "idx_failed_event_messages_event_type_failed_at", columnList = "event_type, failed_at"),
@Index(name = "idx_failed_event_messages_aggregate", columnList = "aggregate_type, aggregate_id")
```

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventReplayAttempt.java`

```java
@Index(
        name = "idx_failed_event_replay_attempts_operator_role",
        columnList = "operator_role, attempted_at"
),
@Index(
        name = "idx_failed_event_replay_attempts_operator_id",
        columnList = "operator_id, attempted_at"
)
```

## 测试验证

文件：`src/test/java/com/codexdemo/orderplatform/FailedEventSearchIntegrationTests.java`

失败事件筛选测试：

```java
List<FailedEventMessageResponse> orderRecordedMessages = failedEventMessageService.searchFailedMessages(
        new FailedEventMessageSearchCriteria(
                FailedEventMessageStatus.RECORDED,
                " OrderCreated ",
                "ORDER",
                "501",
                beforeRecords,
                afterRecords,
                10
        )
);
```

验证点：

```java
assertThat(orderRecordedMessages).extracting(FailedEventMessageResponse::id)
        .containsExactly(recordedOrder.getId());
```

重放审计筛选测试：

```java
List<FailedEventReplayAttemptResponse> sreAttempts = failedEventMessageService.searchReplayAttempts(
        new FailedEventReplayAttemptSearchCriteria(
                failedMessage.getId(),
                FailedEventReplayAttemptStatus.SUCCEEDED,
                null,
                " sre ",
                oldAttemptedAt.minusSeconds(1),
                recentAttemptedAt.plusSeconds(1),
                10
        )
);
```

验证点：

```java
assertThat(sreAttempts).singleElement().satisfies(attempt -> {
    assertThat(attempt.failedEventMessageId()).isEqualTo(failedMessage.getId());
    assertThat(attempt.operatorId()).isEqualTo("alice");
    assertThat(attempt.operatorRole()).isEqualTo("SRE");
    assertThat(attempt.status()).isEqualTo(FailedEventReplayAttemptStatus.SUCCEEDED);
});
```

非法参数测试：

```java
assertBadRequest(() -> failedEventMessageService.searchFailedMessages(
        new FailedEventMessageSearchCriteria(null, null, null, null, now, now.minusSeconds(1), 10)
));

assertBadRequest(() -> failedEventMessageService.searchReplayAttempts(
        new FailedEventReplayAttemptSearchCriteria(null, null, null, null, null, null, 0)
));
```

这说明 v17 不只是“能查”，还会拒绝明显错误的查询参数。

## 一句话总结

第十七版把失败事件排查从“打开最近列表慢慢找”推进到“按状态、事件、聚合、角色、操作人和时间窗口精确筛选”，更像真实后台运维系统里的故障排查入口。
