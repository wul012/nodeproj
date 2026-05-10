# 第十八版：失败事件查询分页响应和排序白名单

第十七版已经把失败事件排查从“最近列表”升级为“多条件筛选”：

```text
失败事件
 -> status / eventType / aggregateType / aggregateId / failedFrom / failedTo / limit

重放审计
 -> failedEventMessageId / status / operatorId / operatorRole / attemptedFrom / attemptedTo / limit
```

第十八版继续补管理端表格需要的能力：

```text
page
 -> 第几页，从 0 开始

size
 -> 每页多少条，限制 1..200

sort
 -> 排序字段和方向，格式 field,direction

totalElements / totalPages
 -> 前端分页控件需要的总数信息
```

## 本版新增和修改文件

```text
src/main/java/com/codexdemo/orderplatform/common/PagedResponse.java
 -> 通用分页响应对象

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageSearchCriteria.java
 -> 失败事件查询条件增加 page / size / sort，保留 limit 兼容旧调用

src/main/java/com/codexdemo/orderplatform/notification/FailedEventReplayAttemptSearchCriteria.java
 -> 重放审计查询条件增加 page / size / sort，保留 limit 兼容旧调用

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageController.java
 -> HTTP 查询参数增加 page / size / sort，返回 PagedResponse

src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageService.java
 -> 统一分页参数校验、排序白名单校验、PageRequest 构造

src/test/java/com/codexdemo/orderplatform/FailedEventSearchIntegrationTests.java
 -> 验证分页元数据、排序白名单、非法 page/size/sort
```

## 通用分页响应对象

文件：`src/main/java/com/codexdemo/orderplatform/common/PagedResponse.java`

```java
public record PagedResponse<T>(
        List<T> content,
        int page,
        int size,
        long totalElements,
        int totalPages,
        boolean first,
        boolean last,
        boolean empty,
        String sort
) {
}
```

字段含义：

```text
content
 -> 当前页数据

page
 -> 当前页码，从 0 开始

size
 -> 每页条数

totalElements
 -> 总记录数

totalPages
 -> 总页数

first / last / empty
 -> 前端表格和分页控件可以直接使用的状态

sort
 -> 服务端最终采用的排序表达式
```

从 Spring Data `Page` 转成接口响应：

```java
public static <S, T> PagedResponse<T> from(Page<S> page, Function<S, T> mapper, String sort) {
    return new PagedResponse<>(
            page.getContent().stream().map(mapper).toList(),
            page.getNumber(),
            page.getSize(),
            page.getTotalElements(),
            page.getTotalPages(),
            page.isFirst(),
            page.isLast(),
            page.isEmpty(),
            sort
    );
}
```

这里保留 `mapper`，是因为数据库实体不能直接返回给接口：

```text
FailedEventMessage
 -> FailedEventMessageResponse

FailedEventReplayAttempt
 -> FailedEventReplayAttemptResponse
```

## Criteria：增加 page / size / sort

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageSearchCriteria.java`

```java
public record FailedEventMessageSearchCriteria(
        FailedEventMessageStatus status,
        String eventType,
        String aggregateType,
        String aggregateId,
        Instant failedFrom,
        Instant failedTo,
        Integer page,
        Integer size,
        String sort,
        Integer limit
) {
}
```

仍然保留 v17 的构造方式：

```java
public FailedEventMessageSearchCriteria(
        FailedEventMessageStatus status,
        String eventType,
        String aggregateType,
        String aggregateId,
        Instant failedFrom,
        Instant failedTo,
        Integer limit
) {
    this(status, eventType, aggregateType, aggregateId, failedFrom, failedTo, null, null, null, limit);
}
```

这表示旧代码继续可以传 `limit`：

```text
limit
 -> 兼容旧调用
 -> 在新逻辑里当成 size 使用
```

重放审计查询条件同理。

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventReplayAttemptSearchCriteria.java`

```java
public record FailedEventReplayAttemptSearchCriteria(
        Long failedEventMessageId,
        FailedEventReplayAttemptStatus status,
        String operatorId,
        String operatorRole,
        Instant attemptedFrom,
        Instant attemptedTo,
        Integer page,
        Integer size,
        String sort,
        Integer limit
) {
}
```

## Controller：接口返回 PagedResponse

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageController.java`

失败事件查询接口：

```java
@GetMapping
public PagedResponse<FailedEventMessageResponse> searchFailedMessages(
        @RequestParam(required = false) FailedEventMessageStatus status,
        @RequestParam(required = false) String eventType,
        @RequestParam(required = false) String aggregateType,
        @RequestParam(required = false) String aggregateId,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant failedFrom,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant failedTo,
        @RequestParam(required = false) Integer page,
        @RequestParam(required = false) Integer size,
        @RequestParam(required = false) String sort,
        @RequestParam(required = false) Integer limit
) {
    return failedEventMessageService.searchFailedMessages(new FailedEventMessageSearchCriteria(
            status,
            eventType,
            aggregateType,
            aggregateId,
            failedFrom,
            failedTo,
            page,
            size,
            sort,
            limit
    ));
}
```

调用示例：

```powershell
Invoke-RestMethod "http://localhost:8080/api/v1/failed-events?status=RECORDED&page=0&size=20&sort=failedAt,desc"
```

重放审计全局查询：

```java
@GetMapping("/replay-attempts")
public PagedResponse<FailedEventReplayAttemptResponse> searchReplayAttempts(
        @RequestParam(required = false) Long failedEventMessageId,
        @RequestParam(required = false) FailedEventReplayAttemptStatus status,
        @RequestParam(required = false) String operatorId,
        @RequestParam(required = false) String operatorRole,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant attemptedFrom,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant attemptedTo,
        @RequestParam(required = false) Integer page,
        @RequestParam(required = false) Integer size,
        @RequestParam(required = false) String sort,
        @RequestParam(required = false) Integer limit
) {
    return failedEventMessageService.searchReplayAttempts(new FailedEventReplayAttemptSearchCriteria(
            failedEventMessageId,
            status,
            operatorId,
            operatorRole,
            attemptedFrom,
            attemptedTo,
            page,
            size,
            sort,
            limit
    ));
}
```

调用示例：

```powershell
Invoke-RestMethod "http://localhost:8080/api/v1/failed-events/replay-attempts?operatorRole=SRE&page=0&size=20&sort=attemptedAt,desc"
```

## Service：排序白名单

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageService.java`

失败事件允许排序字段：

```java
private static final Map<String, String> FAILED_MESSAGE_SORT_FIELDS = Map.of(
        "id", "id",
        "failedAt", "failedAt",
        "status", "status",
        "eventType", "eventType",
        "aggregateId", "aggregateId",
        "replayCount", "replayCount"
);
```

重放审计允许排序字段：

```java
private static final Map<String, String> REPLAY_ATTEMPT_SORT_FIELDS = Map.of(
        "id", "id",
        "attemptedAt", "attemptedAt",
        "status", "status",
        "operatorId", "operatorId",
        "operatorRole", "operatorRole"
);
```

为什么要白名单：

```text
sort=failedAt,desc
 -> 允许

sort=status,asc
 -> 允许

sort=messageId,desc
 -> 拒绝

sort=xxx,desc
 -> 拒绝
```

这样可以避免外部请求随意指定实体字段，减少接口行为不稳定和潜在查询风险。

## Service：构造 PageRequest

失败事件查询现在返回分页对象：

```java
public PagedResponse<FailedEventMessageResponse> searchFailedMessages(FailedEventMessageSearchCriteria criteria) {
    FailedEventMessageSearchCriteria normalizedCriteria = criteria == null
            ? new FailedEventMessageSearchCriteria(null, null, null, null, null, null, null)
            : criteria;
    validateTimeRange(normalizedCriteria.failedFrom(), normalizedCriteria.failedTo(), "failedFrom", "failedTo");
    NormalizedPageRequest pageRequest = normalizePageRequest(
            normalizedCriteria.page(),
            normalizedCriteria.size(),
            normalizedCriteria.limit(),
            normalizedCriteria.sort(),
            FAILED_MESSAGE_SORT_FIELDS,
            "failedAt,desc"
    );
    Page<FailedEventMessage> page = failedEventMessageRepository.findAll(
            failedMessagesMatching(normalizedCriteria),
            pageRequest.pageRequest()
    );
    return PagedResponse.from(page, FailedEventMessageResponse::from, pageRequest.sort());
}
```

重放审计查询同样返回分页对象：

```java
public PagedResponse<FailedEventReplayAttemptResponse> searchReplayAttempts(
        FailedEventReplayAttemptSearchCriteria criteria
) {
    FailedEventReplayAttemptSearchCriteria normalizedCriteria = criteria == null
            ? new FailedEventReplayAttemptSearchCriteria(null, null, null, null, null, null, null)
            : criteria;
    validateTimeRange(
            normalizedCriteria.attemptedFrom(),
            normalizedCriteria.attemptedTo(),
            "attemptedFrom",
            "attemptedTo"
    );
    NormalizedPageRequest pageRequest = normalizePageRequest(
            normalizedCriteria.page(),
            normalizedCriteria.size(),
            normalizedCriteria.limit(),
            normalizedCriteria.sort(),
            REPLAY_ATTEMPT_SORT_FIELDS,
            "attemptedAt,desc"
    );
    Page<FailedEventReplayAttempt> page = failedEventReplayAttemptRepository.findAll(
            replayAttemptsMatching(normalizedCriteria),
            pageRequest.pageRequest()
    );
    return PagedResponse.from(page, FailedEventReplayAttemptResponse::from, pageRequest.sort());
}
```

注意这里仍然复用了 v17 的 Specification：

```text
failedMessagesMatching
replayAttemptsMatching
```

也就是说：

```text
v17
 -> 负责筛选条件

v18
 -> 在筛选条件外面补分页、排序、总数
```

## Service：分页参数校验

统一入口：

```java
private NormalizedPageRequest normalizePageRequest(
        Integer page,
        Integer size,
        Integer limit,
        String sort,
        Map<String, String> allowedSortFields,
        String defaultSort
) {
    int normalizedPage = normalizeSearchPage(page);
    int normalizedSize = normalizeSearchSize(size, limit);
    SortInstruction sortInstruction = normalizeSort(sort, allowedSortFields, defaultSort);
    return new NormalizedPageRequest(
            PageRequest.of(normalizedPage, normalizedSize, sortInstruction.sort()),
            sortInstruction.expression()
    );
}
```

页码校验：

```java
private int normalizeSearchPage(Integer page) {
    if (page == null) {
        return 0;
    }
    if (page < 0) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "page must be greater than or equal to 0");
    }
    return page;
}
```

页大小校验：

```java
private int normalizeSearchSize(Integer size, Integer limit) {
    Integer requestedSize = size == null ? limit : size;
    if (requestedSize == null) {
        return 50;
    }
    if (requestedSize < 1 || requestedSize > 200) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "size must be between 1 and 200");
    }
    return requestedSize;
}
```

兼容关系：

```text
size 有值
 -> 使用 size

size 没值，limit 有值
 -> 使用 limit

size 和 limit 都没值
 -> 默认 50
```

## Service：排序参数校验

```java
private SortInstruction normalizeSort(
        String sort,
        Map<String, String> allowedSortFields,
        String defaultSort
) {
    String expression = StringUtils.hasText(sort) ? sort.strip() : defaultSort;
    String[] parts = expression.split(",");
    if (parts.length < 1 || parts.length > 2) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "sort must use field,direction format");
    }
    String requestedField = parts[0].strip();
    String property = allowedSortFields.get(requestedField);
    if (property == null) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "sort field is not allowed: " + requestedField);
    }
    Sort.Direction direction = Sort.Direction.DESC;
    if (parts.length == 2 && StringUtils.hasText(parts[1])) {
        try {
            direction = Sort.Direction.fromString(parts[1].strip());
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "sort direction must be asc or desc", ex);
        }
    }
    Sort sortOrder = Sort.by(direction, property);
    if (!"id".equals(property)) {
        sortOrder = sortOrder.and(Sort.by(Sort.Direction.DESC, "id"));
    }
    return new SortInstruction(sortOrder, requestedField + "," + direction.name().toLowerCase());
}
```

这里有一个稳定排序细节：

```java
if (!"id".equals(property)) {
    sortOrder = sortOrder.and(Sort.by(Sort.Direction.DESC, "id"));
}
```

当多个记录的 `status` 或 `eventType` 相同时，再用 `id desc` 兜底，避免分页翻页时顺序不稳定。

## 测试验证

文件：`src/test/java/com/codexdemo/orderplatform/FailedEventSearchIntegrationTests.java`

分页响应验证：

```java
PagedResponse<FailedEventMessageResponse> limitedMessages = failedEventMessageService.searchFailedMessages(
        new FailedEventMessageSearchCriteria(null, null, null, null, null, null, 2)
);
```

断言分页元数据：

```java
assertThat(limitedMessages.content()).hasSize(2);
assertThat(limitedMessages.totalElements()).isEqualTo(3);
assertThat(limitedMessages.totalPages()).isEqualTo(2);
assertThat(limitedMessages.page()).isZero();
assertThat(limitedMessages.size()).isEqualTo(2);
assertThat(limitedMessages.sort()).isEqualTo("failedAt,desc");
```

指定 page / size / sort：

```java
PagedResponse<FailedEventMessageResponse> secondPage = failedEventMessageService.searchFailedMessages(
        new FailedEventMessageSearchCriteria(
                null,
                null,
                null,
                null,
                null,
                null,
                1,
                1,
                "eventType,asc",
                null
        )
);
```

断言：

```java
assertThat(secondPage.page()).isEqualTo(1);
assertThat(secondPage.size()).isEqualTo(1);
assertThat(secondPage.totalElements()).isEqualTo(3);
assertThat(secondPage.totalPages()).isEqualTo(3);
assertThat(secondPage.sort()).isEqualTo("eventType,asc");
```

非法参数验证：

```java
assertBadRequest(() -> failedEventMessageService.searchFailedMessages(
        new FailedEventMessageSearchCriteria(null, null, null, null, null, null, -1, 50, null, null)
));

assertBadRequest(() -> failedEventMessageService.searchFailedMessages(
        new FailedEventMessageSearchCriteria(null, null, null, null, null, null, 0, 201, null, null)
));

assertBadRequest(() -> failedEventMessageService.searchFailedMessages(
        new FailedEventMessageSearchCriteria(null, null, null, null, null, null, 0, 50, "messageId,desc", null)
));

assertBadRequest(() -> failedEventMessageService.searchReplayAttempts(
        new FailedEventReplayAttemptSearchCriteria(null, null, null, null, null, null, 0, 50, "operatorRole,sideways", null)
));
```

覆盖的错误：

```text
page=-1
 -> 400

size=201
 -> 400

sort=messageId,desc
 -> 400，因为 messageId 不在失败事件排序白名单

sort=operatorRole,sideways
 -> 400，因为方向必须是 asc 或 desc
```

## 一句话总结

第十八版把失败事件查询从“能筛选出一批数据”升级为“能支撑管理端表格分页、排序和总数展示”的接口形态，是从后端调试接口走向后台运维页面的重要一步。
