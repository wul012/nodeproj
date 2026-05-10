# 第二十三版：失败事件重放工作台

## 本版目标

v22 已经有失败事件管理静态页面，可以筛选、批量标记、查看管理状态流水和下载 CSV。

v23 继续把这个页面推进到“可修复”的方向：在页面右侧增加一个重放工作台，让运维人员可以从失败事件表格里选择单条消息，直接调用后端已有的重放接口，并在同一侧栏查看重放审计。

这版没有新增数据库表，也没有新增后端接口，因为后端在 v14-v16 已经具备：

```text
POST /api/v1/failed-events/{id}/replay
GET  /api/v1/failed-events/{id}/replay-attempts
```

本版重点是把这些能力接到页面上，并用静态资源测试、全量测试、真实 RabbitMQ 运行和浏览器冒烟验证它。

## 改动文件

```text
src/main/resources/static/failed-events.html
src/main/resources/static/failed-events.css
src/main/resources/static/failed-events.js
src/test/java/com/codexdemo/orderplatform/FailedEventManagementPageTests.java
README.md
代码讲解记录/README.md
a/23/解释/说明.md
```

## 一句话链路

```text
失败消息进入 DLQ
 -> FailedEventMessageListener 落库为 failed_event_messages
 -> 页面 /failed-events.html 查询失败事件
 -> 点击表格里的“重放”
 -> 右侧重放工作台绑定当前失败事件
 -> POST /api/v1/failed-events/{id}/replay
 -> RabbitMQ 重新投递消息
 -> failed_event_replay_attempts 写入审计
 -> 页面刷新失败事件状态和重放审计列表
```

## HTML：页面从“查看”升级为“可操作”

文件：`src/main/resources/static/failed-events.html`

v23 仍然复用 Spring Boot 静态资源机制：

```html
<link rel="stylesheet" href="/failed-events.css">
<script defer src="/failed-events.js"></script>
```

也就是说，后端不需要写 MVC 页面控制器，只要应用启动后就可以访问：

```text
http://localhost:8080/failed-events.html
```

### 表格增加重放列

文件：`src/main/resources/static/failed-events.html`

v22 的表格主要看状态和流水，v23 新增了“重放”列：

```html
<th>消息状态</th>
<th>管理状态</th>
<th>重放</th>
<th>处理人</th>
<th>失败时间</th>
<th>操作</th>
```

这列不是简单展示按钮，而是展示后端 `FailedEventMessageResponse` 里已有的重放状态字段：

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
        String lastReplayError,
        FailedEventManagementStatus managementStatus,
        String managementNote,
        String managedBy,
        Instant managedAt
)
```

页面这一列展示的是：

```text
replayCount
lastReplayedAt
lastReplayError
```

这样打开页面时，用户不用点进详情就能知道这条失败事件有没有被重放过、最后一次什么时候重放、是否有错误。

### 右侧新增重放工作台

文件：`src/main/resources/static/failed-events.html`

v23 在右侧侧栏新增 `replay-panel`：

```html
<section class="panel replay-panel" aria-labelledby="replayTitle">
    <div class="panel-heading">
        <h2 id="replayTitle">重放工作台</h2>
        <button id="refreshAttemptsButton" class="secondary-button" type="button">刷新审计</button>
    </div>
    <div id="replayMeta" class="history-meta">未选择</div>
    ...
</section>
```

它的作用是绑定当前选中的失败事件：

```text
未选择
 -> 点击表格“重放”
 -> 显示 #id、messageId、eventType、aggregateType、aggregateId、当前 status、replayCount
```

### 重放请求字段

文件：`src/main/resources/static/failed-events.html`

重放接口要求有操作者、角色和原因；覆盖字段是可选的：

```html
<input id="replayOperatorIdInput" type="text" value="local-admin">

<select id="replayOperatorRoleInput">
    <option value="SRE">SRE</option>
    <option value="ORDER_SUPPORT">ORDER_SUPPORT</option>
    <option value="SYSTEM">SYSTEM</option>
</select>

<textarea id="replayReasonInput" rows="2">replay from management page</textarea>
```

覆盖字段对应 `ReplayFailedEventRequest`：

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

页面里的字段是一一对应的：

```html
<input id="replayEventIdInput" type="text" placeholder="UUID">
<input id="replayEventTypeInput" type="text" placeholder="OrderCreated">
<input id="replayAggregateTypeInput" type="text" placeholder="ORDER">
<input id="replayAggregateIdInput" type="text" placeholder="404">
<textarea id="replayPayloadInput" rows="5" spellcheck="false"></textarea>
```

如果这些覆盖字段不填，后端会优先使用失败消息原始字段；如果原始 `eventId` 也缺失，后端会生成新的 UUID。

## JS：把页面动作串到后端接口

文件：`src/main/resources/static/failed-events.js`

所有失败事件接口仍然从同一个基础路径发起：

```javascript
const apiBase = "/api/v1/failed-events";
```

### 页面状态增加当前事件和事件索引

文件：`src/main/resources/static/failed-events.js`

v22 只需要分页、选中项和流水当前 ID。v23 为重放工作台增加了当前事件对象和列表索引：

```javascript
const state = {
    page: 0,
    totalPages: 0,
    selectedIds: new Set(),
    activeEventId: null,
    activeEvent: null,
    itemsById: new Map()
};
```

这里有两个点：

```text
activeEventId
 -> 当前重放/流水侧栏绑定哪条失败事件

itemsById
 -> 当前页的失败事件按 id 建索引，点击按钮后可以快速取出整条响应
```

### 表格渲染重放状态

文件：`src/main/resources/static/failed-events.js`

v23 的表格渲染把重放次数、最后重放时间和错误信息放进同一列：

```javascript
<td>
    <div>${escapeHtml(item.replayCount)}</div>
    <div class="muted">${formatDate(item.lastReplayedAt)}</div>
    <div class="muted">${escapeHtml(item.lastReplayError || "")}</div>
</td>
```

同一行也新增了两个动作：

```javascript
<button class="ghost-button" type="button" data-history-id="${item.id}">流水</button>
<button class="secondary-button" type="button" data-replay-id="${item.id}">重放</button>
```

绑定事件时，`流水` 只加载管理状态流水，`重放` 会同时准备重放工作台和加载审计：

```javascript
elements.failedEventsBody.querySelectorAll("[data-history-id]").forEach((button) => {
    button.addEventListener("click", () => loadHistory(Number(button.dataset.historyId)));
});

elements.failedEventsBody.querySelectorAll("[data-replay-id]").forEach((button) => {
    button.addEventListener("click", () => prepareReplay(Number(button.dataset.replayId)));
});
```

### 选择重放目标

文件：`src/main/resources/static/failed-events.js`

点击“重放”后，页面会把表格里的当前行绑定到右侧工作台：

```javascript
async function prepareReplay(id) {
    setActiveEvent(id);
    await Promise.all([
        loadHistory(id),
        loadReplayAttempts(id)
    ]);
}
```

这里并行做两件事：

```text
loadHistory(id)
 -> 状态流水侧栏刷新

loadReplayAttempts(id)
 -> 重放审计列表刷新
```

绑定当前事件的函数是：

```javascript
function setActiveEvent(id) {
    state.activeEventId = id;
    state.activeEvent = state.itemsById.get(id) || state.activeEvent;
    if (state.activeEvent && state.activeEvent.id === id) {
        renderReplayMeta(state.activeEvent);
        updateReplayPlaceholders(state.activeEvent);
        return;
    }
    elements.replayMeta.textContent = `#${id}`;
}
```

这里的 `updateReplayPlaceholders` 很关键：

```javascript
function updateReplayPlaceholders(item) {
    elements.replayEventIdInput.placeholder = item.eventId || "UUID";
    elements.replayEventTypeInput.placeholder = item.eventType || "OrderCreated";
    elements.replayAggregateTypeInput.placeholder = item.aggregateType || "ORDER";
    elements.replayAggregateIdInput.placeholder = item.aggregateId || "404";
    elements.replayPayloadInput.placeholder = item.payload || "";
}
```

它不直接把原始 payload 填进输入值，而是放进 placeholder。

这样做有两个好处：

```text
1. 默认提交时不覆盖原始消息字段，让后端按原始失败消息重放。
2. 用户确实要修 payload 或 eventType 时，再显式填写覆盖字段。
```

### 发起重放

文件：`src/main/resources/static/failed-events.js`

重放按钮绑定到：

```javascript
document.getElementById("replayButton").addEventListener("click", replayActiveEvent);
```

核心请求代码：

```javascript
const response = await fetch(`${apiBase}/${id}/replay`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "X-Operator-Id": elements.replayOperatorIdInput.value,
        "X-Operator-Role": elements.replayOperatorRoleInput.value
    },
    body: JSON.stringify(body)
});
```

它对应后端 Controller：

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

JS 只提交非空覆盖字段：

```javascript
const body = { reason };
addBodyField(body, "eventId", elements.replayEventIdInput.value);
addBodyField(body, "eventType", elements.replayEventTypeInput.value);
addBodyField(body, "aggregateType", elements.replayAggregateTypeInput.value);
addBodyField(body, "aggregateId", elements.replayAggregateIdInput.value);
addBodyField(body, "payload", elements.replayPayloadInput.value);
```

辅助函数：

```javascript
function addBodyField(body, name, value) {
    if (value && value.trim() !== "") {
        body[name] = value.trim();
    }
}
```

也就是说：

```json
{
  "reason": "replay from management page"
}
```

是一个合法的最小重放请求。

### 重放后刷新页面

文件：`src/main/resources/static/failed-events.js`

重放成功后，页面做三件事：

```javascript
const result = await response.json();
state.activeEvent = result;
showToast(`重放已提交，当前状态 ${result.status}`);
await loadFailedEvents();
await loadReplayAttempts(id);
```

对应效果：

```text
失败事件表格刷新
 -> status 从 RECORDED 变为 REPLAYED
 -> replayCount 从 0 变为 1
 -> lastReplayedAt 显示最新时间

重放审计刷新
 -> 显示 SUCCEEDED / FAILED / SKIPPED_ALREADY_REPLAYED
```

### 查看重放审计

文件：`src/main/resources/static/failed-events.js`

重放审计请求：

```javascript
const attempts = await fetchJson(`${apiBase}/${id}/replay-attempts`);
```

对应后端 Controller：

```java
@GetMapping("/{id}/replay-attempts")
public List<FailedEventReplayAttemptResponse> listReplayAttempts(@PathVariable Long id) {
    return failedEventMessageService.listReplayAttempts(id);
}
```

审计响应对象：

```java
public record FailedEventReplayAttemptResponse(
        Long id,
        Long failedEventMessageId,
        String operatorId,
        String operatorRole,
        String reason,
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
)
```

页面展示重点字段：

```javascript
<article class="attempt-item">
    <div class="attempt-line">
        ${statusPill(item.status, replayAttemptStatusClass(item.status))}
        <span>${escapeHtml(item.effectiveEventType || "")}</span>
    </div>
    <div class="muted">${escapeHtml(item.operatorId || "")} / ${escapeHtml(item.operatorRole || "")}</div>
    <div class="history-note">${escapeHtml(item.reason || "")}</div>
    <div class="muted">${escapeHtml(item.effectiveEventId || "")}</div>
    ${item.errorMessage ? `<div class="attempt-error">${escapeHtml(item.errorMessage)}</div>` : ""}
    <div class="muted">${formatDate(item.attemptedAt)}</div>
</article>
```

这里没有展示所有 requested/effective 字段，是为了页面不被 payload 淹没；真正排查时仍然可以通过 API 查询完整审计。

## CSS：右侧从单侧栏变成工作区

文件：`src/main/resources/static/failed-events.css`

v22 的右侧只有历史侧栏，v23 把右侧抽成 `side-column`：

```css
.content-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 390px;
    gap: 16px;
}

.side-column {
    display: grid;
    align-content: start;
    gap: 16px;
}
```

这样右侧可以上下放两个面板：

```text
重放工作台
状态流水
```

重放表单使用两列布局：

```css
.replay-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    padding: 14px;
}

.payload-field {
    grid-column: 1 / -1;
}
```

payload 占满整行，因为 JSON 字符串通常比普通字段长。

审计列表独立滚动：

```css
.attempt-list {
    display: grid;
    gap: 10px;
    max-height: 360px;
    overflow: auto;
    padding: 14px;
    border-top: 1px solid var(--line);
}
```

失败和跳过状态也有独立颜色：

```css
.status-failed {
    background: #fae6e6;
    color: #8b2525;
}

.status-skipped {
    background: #f5ecff;
    color: #5b2a86;
}
```

## 测试：静态资源测试继续兜底

文件：`src/test/java/com/codexdemo/orderplatform/FailedEventManagementPageTests.java`

这个测试不是浏览器测试，而是“页面资源接线测试”。

它读取 classpath 里的静态资源：

```java
String html = resource("static/failed-events.html");
String javascript = resource("static/failed-events.js");
String css = resource("static/failed-events.css");
```

v23 新增断言：

```java
assertThat(html).contains(
        "replayButton",
        "refreshAttemptsButton",
        "attemptList",
        "replayReasonInput"
);
```

JS 侧确认真的接到了重放接口：

```java
assertThat(javascript).contains(
        "/replay-attempts",
        "/replay",
        "replayActiveEvent",
        "loadReplayAttempts",
        "X-Operator-Id",
        "reason"
);
```

CSS 侧确认页面结构样式存在：

```java
assertThat(css).contains(
        ".side-column",
        ".replay-panel",
        ".attempt-list"
);
```

这类测试的价值在于：如果以后改页面时误删按钮 ID、接口路径或关键 CSS 类，Maven 测试会立刻失败。

## 后端重放逻辑回顾

文件：`src/main/java/com/codexdemo/orderplatform/notification/FailedEventMessageService.java`

重放入口最后进入 Service：

```java
public FailedEventMessageResponse replay(
        Long id,
        ReplayFailedEventRequest request,
        String operatorId,
        String operatorRole
) {
    FailedEventMessage failedMessage = failedEventMessageRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "failed event message not found"));
    String normalizedOperatorId = normalizeOperatorId(operatorId);
    String normalizedOperatorRole = requireAllowedOperatorRole(operatorRole);
    String reason = resolveReplayReason(request);
    ...
}
```

这说明页面必须传：

```text
X-Operator-Id
X-Operator-Role
reason
```

否则后端会拒绝。

重放字段解析：

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

这也解释了为什么页面覆盖字段可以为空：

```text
request 字段为空
 -> 使用 failedMessage 原始字段
 -> 原始 eventId 也为空时生成 UUID
```

重放成功后：

```java
publishReplay(failedMessage, eventId, eventType, aggregateType, aggregateId, payload);
failedMessage.markReplayed(eventId, replayedAt);
saveReplayAttempt(... FailedEventReplayAttemptStatus.SUCCEEDED ...);
```

页面看到的状态变化来自：

```java
failedMessage.markReplayed(eventId, replayedAt);
```

失败时则会保存错误：

```java
failedMessage.markReplayFailed(eventId, errorMessage, replayedAt);
saveReplayAttempt(... FailedEventReplayAttemptStatus.FAILED ...);
```

如果已经重放过，再次重放不会重复投递：

```java
if (failedMessage.getStatus() == FailedEventMessageStatus.REPLAYED) {
    saveReplayAttempt(
            failedMessage,
            request,
            normalizedOperatorId,
            normalizedOperatorRole,
            reason,
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

所以页面显示 `SKIPPED_ALREADY_REPLAYED` 是一种正常保护，不是失败。

## 真实运行验证

v23 做了三层验证：

```text
node --check src/main/resources/static/failed-events.js
 -> JS 语法通过

mvn -Dtest=FailedEventManagementPageTests test
 -> 静态资源接线测试通过

mvn test
 -> 29 个测试全部通过
```

真实运行时使用 RabbitMQ：

```text
docker compose -f compose.yaml up -d rabbitmq
java -jar target/advanced-order-platform-0.1.0-SNAPSHOT.jar --spring.profiles.active=rabbitmq --server.port=18103
```

HTTP 冒烟结果：

```text
health               : UP
htmlStatusCode       : 200
publishedRouted      : True
failedEventId        : 1
failedEventMessageId : v23-bad-order-created-message
failedStatus         : RECORDED
replayCount          : 0
```

浏览器冒烟结果：

```text
页面标题：失败事件管理
控制台错误：0
点击表格“重放”
 -> 右侧工作台显示失败事件 #1
 -> 审计列表初始暂无审计
点击“提交重放”
 -> 表格状态刷新为 REPLAYED
 -> replayCount 变为 1
 -> 审计列表出现 SUCCEEDED
```

最终 API 验证：

```text
finalStatus              : REPLAYED
replayCount              : 1
latestAttemptStatus      : SUCCEEDED
latestAttemptOperator    : local-admin / SRE
latestAttemptReason      : replay from management page
notificationCount        : 1
```

## 本版总结

v23 的核心不是新增一个按钮，而是把“失败事件治理”从接口层推进到了可操作页面层。

到这一版为止，失败事件链路已经具备：

```text
失败落库
 -> 查询筛选
 -> 分页排序
 -> 管理状态标记
 -> 状态流水
 -> CSV 导出
 -> 页面化管理
 -> 页面内重放
 -> 重放审计查看
```

下一步更像真实系统的方向，是给重放按钮加审批、二次确认、权限登录态和危险 payload 变更提示。
