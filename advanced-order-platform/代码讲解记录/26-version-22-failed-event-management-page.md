# 第二十二版：失败事件管理静态页面

第二十一版已经把失败事件管理能力做到了接口层：

```text
失败事件分页查询
批量标记管理状态
管理状态流水查询
失败事件 CSV 导出
管理状态流水 CSV 导出
```

第二十二版把这些能力串成一个浏览器页面。页面不是营销首页，也不是前端框架工程，而是 Spring Boot 直接托管的静态运维页面：

```text
http://localhost:8080/failed-events.html
```

## 本版新增和修改文件

```text
src/main/resources/static/failed-events.html
 -> 失败事件管理页面结构

src/main/resources/static/failed-events.css
 -> 页面布局、表格、筛选区、状态流水侧栏样式

src/main/resources/static/failed-events.js
 -> 浏览器端调用 REST API、批量标记、流水加载、CSV 下载

src/test/java/com/codexdemo/orderplatform/FailedEventManagementPageTests.java
 -> 验证静态资源进入 classpath，并且页面脚本指向正确后端接口

README.md
 -> 补充页面入口和页面能力
```

本版没有新增数据库结构，也没有新增 Controller，因为 Spring Boot 会自动发布 `src/main/resources/static` 下的静态文件。

## 页面入口

文件：`src/main/resources/static/failed-events.html`

基础 HTML：

```html
<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>失败事件管理</title>
    <link rel="stylesheet" href="/failed-events.css">
    <script defer src="/failed-events.js"></script>
</head>
```

`failed-events.html` 放在 `static` 目录后，Spring Boot 默认可以直接访问：

```text
/failed-events.html
```

不需要额外写：

```text
@Controller
@GetMapping
```

这样做的好处是页面只作为管理台薄壳，所有业务仍然走已经测试过的 REST 接口。

## 筛选区

文件：`src/main/resources/static/failed-events.html`

筛选表单：

```html
<select id="statusFilter">
    <option value="">全部</option>
    <option value="RECORDED">RECORDED</option>
    <option value="REPLAYED">REPLAYED</option>
    <option value="REPLAY_FAILED">REPLAY_FAILED</option>
</select>

<select id="managementStatusFilter">
    <option value="">全部</option>
    <option value="OPEN">OPEN</option>
    <option value="INVESTIGATING">INVESTIGATING</option>
    <option value="IGNORED">IGNORED</option>
    <option value="RESOLVED">RESOLVED</option>
</select>
```

对应后端接口参数：

```text
status
managementStatus
eventType
aggregateType
aggregateId
sort
page
size
```

查询按钮：

```html
<button id="searchButton" class="primary-button" type="button">查询</button>
```

CSV 导出按钮：

```html
<button id="exportFailedButton" class="secondary-button" type="button">导出失败事件</button>
```

这里页面不是自己保存筛选逻辑，而是把输入框转成查询参数交给后端。

## 批量标记区

文件：`src/main/resources/static/failed-events.html`

批量标记需要四类信息：

```html
<input id="operatorIdInput" type="text" value="local-admin">

<select id="operatorRoleInput">
    <option value="SRE">SRE</option>
    <option value="ORDER_SUPPORT">ORDER_SUPPORT</option>
    <option value="SYSTEM">SYSTEM</option>
</select>

<select id="targetManagementStatusInput">
    <option value="INVESTIGATING">INVESTIGATING</option>
    <option value="RESOLVED">RESOLVED</option>
    <option value="IGNORED">IGNORED</option>
    <option value="OPEN">OPEN</option>
</select>

<textarea id="managementNoteInput" rows="2">triage from management page</textarea>
```

它们对应 v19 的接口要求：

```text
X-Operator-Id
X-Operator-Role
status
note
```

提交按钮：

```html
<button id="markButton" class="primary-button" type="button">提交标记</button>
```

## 失败事件表格

文件：`src/main/resources/static/failed-events.html`

表格列：

```html
<th class="select-col"><input id="selectAllCheckbox" type="checkbox" aria-label="全选"></th>
<th>ID</th>
<th>事件</th>
<th>聚合</th>
<th>消息状态</th>
<th>管理状态</th>
<th>处理人</th>
<th>失败时间</th>
<th>操作</th>
```

这张表格把排查最常看的字段放出来：

```text
eventType / aggregateType / aggregateId
 -> 知道是哪类业务对象失败

status
 -> 知道消息是否重放成功

managementStatus / managedBy / managedAt
 -> 知道人工处理进度
```

每行的“流水”按钮：

```html
<button class="ghost-button" type="button" data-history-id="${item.id}">流水</button>
```

它会加载右侧状态流水侧栏。

## 状态流水侧栏

文件：`src/main/resources/static/failed-events.html`

侧栏结构：

```html
<aside class="panel history-panel" aria-labelledby="historyTitle">
    <div class="panel-heading">
        <h2 id="historyTitle">状态流水</h2>
        <button id="exportHistoryButton" class="secondary-button" type="button">导出流水</button>
    </div>
    <div id="historyMeta" class="history-meta">未选择</div>
    <div id="historyList" class="history-list"></div>
</aside>
```

它对应 v20 的接口：

```text
GET /api/v1/failed-events/{id}/management-history
```

以及 v21 的导出接口：

```text
GET /api/v1/failed-events/management-history/export
```

## 页面样式

文件：`src/main/resources/static/failed-events.css`

页面使用偏后台工具的布局：

```css
.layout {
    display: grid;
    gap: 16px;
    padding: 18px;
}

.content-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 360px;
    gap: 16px;
}
```

左侧是失败事件表格，右侧是流水：

```text
table-panel
 -> 查询结果和分页

history-panel
 -> 单条失败事件状态时间线
```

表格可横向滚动：

```css
.table-wrap {
    overflow: auto;
    max-height: 560px;
}

table {
    width: 100%;
    border-collapse: collapse;
    min-width: 980px;
}
```

这样字段较多时不会把页面挤坏。

状态标签：

```css
.status-open {
    background: #fff1d6;
    color: #754a0c;
}

.status-investigating {
    background: #e5f6fb;
    color: #07536b;
}

.status-resolved {
    background: #e8f6eb;
    color: #236133;
}
```

移动端降成单列：

```css
@media (max-width: 640px) {
    .filter-grid,
    .batch-grid {
        grid-template-columns: 1fr;
    }

    .content-grid {
        grid-template-columns: 1fr;
    }
}
```

这让页面在窄屏上仍然能操作，而不是出现控件互相覆盖。

## 浏览器端状态

文件：`src/main/resources/static/failed-events.js`

页面状态很少：

```javascript
const state = {
    page: 0,
    totalPages: 0,
    selectedIds: new Set(),
    activeEventId: null
};
```

含义：

```text
page / totalPages
 -> 当前分页位置

selectedIds
 -> 表格勾选的失败事件 id

activeEventId
 -> 当前右侧正在查看流水的失败事件 id
```

DOM 加载后绑定事件：

```javascript
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("searchButton").addEventListener("click", () => {
        state.page = 0;
        loadFailedEvents();
    });
    document.getElementById("markButton").addEventListener("click", markSelectedEvents);
    document.getElementById("exportFailedButton").addEventListener("click", exportFailedEvents);
    document.getElementById("exportHistoryButton").addEventListener("click", exportActiveHistory);

    loadFailedEvents();
});
```

这说明打开页面后会自动请求第一页失败事件。

## 查询失败事件

文件：`src/main/resources/static/failed-events.js`

后端 API 基础路径：

```javascript
const apiBase = "/api/v1/failed-events";
```

构建查询参数：

```javascript
function failedEventQueryParams(includePage) {
    const params = new URLSearchParams();
    addParam(params, "status", elements.statusFilter.value);
    addParam(params, "managementStatus", elements.managementStatusFilter.value);
    addParam(params, "eventType", elements.eventTypeFilter.value);
    addParam(params, "aggregateType", elements.aggregateTypeFilter.value);
    addParam(params, "aggregateId", elements.aggregateIdFilter.value);
    addParam(params, "sort", elements.sortFilter.value);
    if (includePage) {
        params.set("page", state.page);
        params.set("size", elements.sizeFilter.value);
    } else {
        params.set("limit", exportLimit());
    }
    return params;
}
```

查询方法：

```javascript
async function loadFailedEvents() {
    const page = await fetchJson(`${apiBase}?${failedEventQueryParams(true)}`);
    state.totalPages = page.totalPages;
    state.selectedIds.clear();
    renderFailedEvents(page);
    updateSelectedCount();
}
```

后端返回的是 v18 的分页结构：

```text
content
page
size
totalElements
totalPages
sort
```

## 渲染表格

文件：`src/main/resources/static/failed-events.js`

核心渲染：

```javascript
elements.failedEventsBody.innerHTML = page.content.map((item) => `
    <tr>
        <td class="select-col">
            <input type="checkbox" data-select-id="${item.id}" aria-label="选择 ${item.id}">
        </td>
        <td>
            <div class="row-title">#${escapeHtml(item.id)}</div>
            <div class="muted">${escapeHtml(item.messageId || "")}</div>
        </td>
        <td>
            <div>${escapeHtml(item.eventType || "")}</div>
            <div class="muted">${escapeHtml(item.sourceQueue || "")}</div>
        </td>
        <td>${statusPill(item.managementStatus, managementStatusClass(item.managementStatus))}</td>
    </tr>
`).join("");
```

这里所有动态文本都经过：

```javascript
function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("\"", "&quot;")
        .replaceAll("'", "&#39;");
}
```

原因是失败消息的 payload、reason、note 都可能来自外部消息，不能直接插进 HTML。

## 批量标记

文件：`src/main/resources/static/failed-events.js`

批量标记请求体：

```javascript
const body = {
    ids: Array.from(state.selectedIds),
    status: elements.targetManagementStatusInput.value,
    note: elements.managementNoteInput.value
};
```

请求后端：

```javascript
const response = await fetch(apiBase + "/management-status", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "X-Operator-Id": elements.operatorIdInput.value,
        "X-Operator-Role": elements.operatorRoleInput.value
    },
    body: JSON.stringify(body)
});
```

这正好对接 v19 的接口：

```text
POST /api/v1/failed-events/management-status
```

成功后刷新列表：

```javascript
const result = await response.json();
showToast(`已更新 ${result.updatedCount} 条`);
await loadFailedEvents();
```

如果右侧正在看某条事件的流水，会同步刷新：

```javascript
if (state.activeEventId) {
    await loadHistory(state.activeEventId);
}
```

## 查看状态流水

文件：`src/main/resources/static/failed-events.js`

加载流水：

```javascript
async function loadHistory(id) {
    state.activeEventId = id;
    elements.historyMeta.textContent = `#${id}`;
    const history = await fetchJson(`${apiBase}/${id}/management-history`);
    elements.historyList.innerHTML = history.map((item) => `
        <article class="history-item">
            <div class="history-line">${escapeHtml(item.previousStatus)} -> ${escapeHtml(item.newStatus)}</div>
            <div class="muted">${escapeHtml(item.operatorId)} / ${escapeHtml(item.operatorRole)}</div>
            <div class="history-note">${escapeHtml(item.note || "")}</div>
            <div class="muted">${formatDate(item.changedAt)}</div>
        </article>
    `).join("");
}
```

它对接 v20 的接口：

```text
GET /api/v1/failed-events/{id}/management-history
```

时间线按后端返回顺序展示，最新记录在上方。

## CSV 下载

文件：`src/main/resources/static/failed-events.js`

导出失败事件：

```javascript
function exportFailedEvents() {
    downloadCsv(`${apiBase}/export?${failedEventQueryParams(false)}`, "failed-events.csv");
}
```

导出当前失败事件的状态流水：

```javascript
function exportActiveHistory() {
    const params = new URLSearchParams();
    params.set("failedEventMessageId", state.activeEventId);
    params.set("sort", "changedAt,desc");
    params.set("limit", exportLimit());
    downloadCsv(`${apiBase}/management-history/export?${params}`, "failed-event-management-history.csv");
}
```

下载实现：

```javascript
async function downloadCsv(url, filename) {
    const response = await fetch(url);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(objectUrl);
}
```

这里没有让页面自己拼 CSV，而是继续使用 v21 后端导出接口。这样前后端导出的字段、排序、转义规则保持一致。

## 静态资源测试

文件：`src/test/java/com/codexdemo/orderplatform/FailedEventManagementPageTests.java`

测试会读取 classpath 里的静态资源：

```java
String html = resource("static/failed-events.html");
String javascript = resource("static/failed-events.js");
String css = resource("static/failed-events.css");
```

验证 HTML 连接了 CSS 和 JS：

```java
assertThat(html).contains(
        "失败事件管理",
        "/failed-events.css",
        "/failed-events.js",
        "exportFailedButton",
        "exportHistoryButton",
        "markButton"
);
```

验证 JS 指向真实后端接口：

```java
assertThat(javascript).contains(
        "const apiBase = \"/api/v1/failed-events\"",
        "/management-status",
        "/management-history",
        "/management-history/export",
        "/export"
);
```

验证 CSS 有主要布局：

```java
assertThat(css).contains(
        ".content-grid",
        ".table-wrap",
        ".history-panel",
        "@media (max-width: 640px)"
);
```

这个测试不替代浏览器端 E2E，但能防止静态页面资源漏打包、入口 id 被误删、接口路径被写错。

## 一句话总结

第二十二版把失败事件管理从“接口能力”推进到“可操作页面”，让查询、批量标记、流水查看和 CSV 下载能在同一个浏览器界面里完成。
