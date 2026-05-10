const apiBase = "/api/v1/failed-events";

const state = {
    page: 0,
    totalPages: 0,
    selectedIds: new Set(),
    activeEventId: null,
    activeEvent: null,
    itemsById: new Map()
};

const elements = {};

document.addEventListener("DOMContentLoaded", () => {
    [
        "statusFilter",
        "managementStatusFilter",
        "eventTypeFilter",
        "aggregateTypeFilter",
        "aggregateIdFilter",
        "sortFilter",
        "sizeFilter",
        "exportLimitInput",
        "operatorIdInput",
        "operatorRoleInput",
        "targetManagementStatusInput",
        "managementNoteInput",
        "replayOperatorIdInput",
        "replayOperatorRoleInput",
        "replayReasonInput",
        "replayEventIdInput",
        "replayEventTypeInput",
        "replayAggregateTypeInput",
        "replayAggregateIdInput",
        "replayPayloadInput",
        "failedEventsBody",
        "historyList",
        "historyMeta",
        "replayMeta",
        "attemptList",
        "pageMeta",
        "selectedCount",
        "selectAllCheckbox",
        "toast"
    ].forEach((id) => {
        elements[id] = document.getElementById(id);
    });

    document.getElementById("searchButton").addEventListener("click", () => {
        state.page = 0;
        loadFailedEvents();
    });
    document.getElementById("refreshButton").addEventListener("click", loadFailedEvents);
    document.getElementById("resetButton").addEventListener("click", resetFilters);
    document.getElementById("previousPageButton").addEventListener("click", previousPage);
    document.getElementById("nextPageButton").addEventListener("click", nextPage);
    document.getElementById("markButton").addEventListener("click", markSelectedEvents);
    document.getElementById("replayButton").addEventListener("click", replayActiveEvent);
    document.getElementById("clearReplayOverrideButton").addEventListener("click", clearReplayOverrides);
    document.getElementById("refreshAttemptsButton").addEventListener("click", refreshActiveReplayAttempts);
    document.getElementById("exportFailedButton").addEventListener("click", exportFailedEvents);
    document.getElementById("exportHistoryButton").addEventListener("click", exportActiveHistory);
    elements.selectAllCheckbox.addEventListener("change", toggleCurrentPageSelection);

    loadFailedEvents();
});

async function loadFailedEvents() {
    try {
        elements.failedEventsBody.innerHTML = '<tr><td colspan="10" class="empty-cell">加载中</td></tr>';
        const page = await fetchJson(`${apiBase}?${failedEventQueryParams(true)}`);
        state.totalPages = page.totalPages;
        state.selectedIds.clear();
        elements.selectAllCheckbox.checked = false;
        renderFailedEvents(page);
        updateSelectedCount();
    } catch (error) {
        renderTableMessage("加载失败");
        showToast(error.message, true);
    }
}

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

function renderFailedEvents(page) {
    state.itemsById = new Map((page.content || []).map((item) => [item.id, item]));
    elements.pageMeta.textContent = `${page.page + 1} / ${Math.max(page.totalPages, 1)}，共 ${page.totalElements}`;
    if (!page.content || page.content.length === 0) {
        renderTableMessage("暂无数据");
        return;
    }
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
            <td>
                <div>${escapeHtml(item.aggregateType || "")}</div>
                <div class="muted">${escapeHtml(item.aggregateId || "")}</div>
            </td>
            <td>${statusPill(item.status, messageStatusClass(item.status))}</td>
            <td>${statusPill(item.managementStatus, managementStatusClass(item.managementStatus))}</td>
            <td>
                <div>${escapeHtml(item.replayCount)}</div>
                <div class="muted">${formatDate(item.lastReplayedAt)}</div>
                <div class="muted">${escapeHtml(item.lastReplayError || "")}</div>
            </td>
            <td>
                <div>${escapeHtml(item.managedBy || "")}</div>
                <div class="muted">${formatDate(item.managedAt)}</div>
            </td>
            <td>${formatDate(item.failedAt)}</td>
            <td>
                <div class="action-stack">
                    <button class="ghost-button" type="button" data-history-id="${item.id}">流水</button>
                    <button class="secondary-button" type="button" data-replay-id="${item.id}">重放</button>
                </div>
            </td>
        </tr>
    `).join("");

    elements.failedEventsBody.querySelectorAll("[data-select-id]").forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const id = Number(checkbox.dataset.selectId);
            if (checkbox.checked) {
                state.selectedIds.add(id);
            } else {
                state.selectedIds.delete(id);
                elements.selectAllCheckbox.checked = false;
            }
            updateSelectedCount();
        });
    });
    elements.failedEventsBody.querySelectorAll("[data-history-id]").forEach((button) => {
        button.addEventListener("click", () => loadHistory(Number(button.dataset.historyId)));
    });
    elements.failedEventsBody.querySelectorAll("[data-replay-id]").forEach((button) => {
        button.addEventListener("click", () => prepareReplay(Number(button.dataset.replayId)));
    });
    if (state.activeEventId && state.itemsById.has(state.activeEventId)) {
        setActiveEvent(state.activeEventId);
    }
}

async function prepareReplay(id) {
    setActiveEvent(id);
    await Promise.all([
        loadHistory(id),
        loadReplayAttempts(id)
    ]);
}

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

function renderReplayMeta(item) {
    elements.replayMeta.innerHTML = `
        <div class="row-title">#${escapeHtml(item.id)} ${escapeHtml(item.messageId || "")}</div>
        <div>${escapeHtml(item.eventType || "")} / ${escapeHtml(item.aggregateType || "")}:${escapeHtml(item.aggregateId || "")}</div>
        <div class="muted">${escapeHtml(item.status || "")}，重放 ${escapeHtml(item.replayCount)} 次</div>
    `;
}

function updateReplayPlaceholders(item) {
    elements.replayEventIdInput.placeholder = item.eventId || "UUID";
    elements.replayEventTypeInput.placeholder = item.eventType || "OrderCreated";
    elements.replayAggregateTypeInput.placeholder = item.aggregateType || "ORDER";
    elements.replayAggregateIdInput.placeholder = item.aggregateId || "404";
    elements.replayPayloadInput.placeholder = item.payload || "";
}

async function loadHistory(id) {
    try {
        setActiveEvent(id);
        elements.historyMeta.textContent = `#${id}`;
        elements.historyList.innerHTML = '<div class="history-item">加载中</div>';
        const history = await fetchJson(`${apiBase}/${id}/management-history`);
        if (!history || history.length === 0) {
            elements.historyList.innerHTML = '<div class="history-item">暂无流水</div>';
            return;
        }
        elements.historyList.innerHTML = history.map((item) => `
            <article class="history-item">
                <div class="history-line">${escapeHtml(item.previousStatus)} -> ${escapeHtml(item.newStatus)}</div>
                <div class="muted">${escapeHtml(item.operatorId)} / ${escapeHtml(item.operatorRole)}</div>
                <div class="history-note">${escapeHtml(item.note || "")}</div>
                <div class="muted">${formatDate(item.changedAt)}</div>
            </article>
        `).join("");
    } catch (error) {
        elements.historyList.innerHTML = '<div class="history-item">加载失败</div>';
        showToast(error.message, true);
    }
}

async function loadReplayAttempts(id) {
    try {
        setActiveEvent(id);
        elements.attemptList.innerHTML = '<div class="attempt-item">加载中</div>';
        const attempts = await fetchJson(`${apiBase}/${id}/replay-attempts`);
        renderReplayAttempts(attempts);
    } catch (error) {
        elements.attemptList.innerHTML = '<div class="attempt-item">加载失败</div>';
        showToast(error.message, true);
    }
}

function renderReplayAttempts(attempts) {
    if (!attempts || attempts.length === 0) {
        elements.attemptList.innerHTML = '<div class="attempt-item">暂无审计</div>';
        return;
    }
    elements.attemptList.innerHTML = attempts.map((item) => `
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
    `).join("");
}

async function markSelectedEvents() {
    if (state.selectedIds.size === 0) {
        showToast("请选择失败事件", true);
        return;
    }
    const body = {
        ids: Array.from(state.selectedIds),
        status: elements.targetManagementStatusInput.value,
        note: elements.managementNoteInput.value
    };
    try {
        const response = await fetch(apiBase + "/management-status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Operator-Id": elements.operatorIdInput.value,
                "X-Operator-Role": elements.operatorRoleInput.value
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw new Error(await errorMessage(response));
        }
        const result = await response.json();
        showToast(`已更新 ${result.updatedCount} 条`);
        await loadFailedEvents();
        if (state.activeEventId) {
            await loadHistory(state.activeEventId);
        }
    } catch (error) {
        showToast(error.message, true);
    }
}

async function replayActiveEvent() {
    const id = replayTargetId();
    if (!id) {
        showToast("请选择要重放的失败事件", true);
        return;
    }
    const reason = elements.replayReasonInput.value.trim();
    if (!reason) {
        showToast("请填写重放原因", true);
        return;
    }
    const body = { reason };
    addBodyField(body, "eventId", elements.replayEventIdInput.value);
    addBodyField(body, "eventType", elements.replayEventTypeInput.value);
    addBodyField(body, "aggregateType", elements.replayAggregateTypeInput.value);
    addBodyField(body, "aggregateId", elements.replayAggregateIdInput.value);
    addBodyField(body, "payload", elements.replayPayloadInput.value);

    try {
        const response = await fetch(`${apiBase}/${id}/replay`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Operator-Id": elements.replayOperatorIdInput.value,
                "X-Operator-Role": elements.replayOperatorRoleInput.value
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw new Error(await errorMessage(response));
        }
        const result = await response.json();
        state.activeEvent = result;
        showToast(`重放已提交，当前状态 ${result.status}`);
        await loadFailedEvents();
        await loadReplayAttempts(id);
    } catch (error) {
        showToast(error.message, true);
        await loadReplayAttempts(id);
    }
}

function replayTargetId() {
    if (state.activeEventId) {
        return state.activeEventId;
    }
    if (state.selectedIds.size === 1) {
        const id = Array.from(state.selectedIds)[0];
        setActiveEvent(id);
        return id;
    }
    return null;
}

function refreshActiveReplayAttempts() {
    const id = replayTargetId();
    if (!id) {
        showToast("请选择失败事件", true);
        return;
    }
    loadReplayAttempts(id);
}

function clearReplayOverrides() {
    elements.replayEventIdInput.value = "";
    elements.replayEventTypeInput.value = "";
    elements.replayAggregateTypeInput.value = "";
    elements.replayAggregateIdInput.value = "";
    elements.replayPayloadInput.value = "";
}

function exportFailedEvents() {
    downloadCsv(`${apiBase}/export?${failedEventQueryParams(false)}`, "failed-events.csv");
}

function exportActiveHistory() {
    if (!state.activeEventId) {
        showToast("请选择状态流水", true);
        return;
    }
    const params = new URLSearchParams();
    params.set("failedEventMessageId", state.activeEventId);
    params.set("sort", "changedAt,desc");
    params.set("limit", exportLimit());
    downloadCsv(`${apiBase}/management-history/export?${params}`, "failed-event-management-history.csv");
}

async function downloadCsv(url, filename) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(await errorMessage(response));
        }
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = objectUrl;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(objectUrl);
        showToast("导出完成");
    } catch (error) {
        showToast(error.message, true);
    }
}

function toggleCurrentPageSelection() {
    elements.failedEventsBody.querySelectorAll("[data-select-id]").forEach((checkbox) => {
        checkbox.checked = elements.selectAllCheckbox.checked;
        const id = Number(checkbox.dataset.selectId);
        if (checkbox.checked) {
            state.selectedIds.add(id);
        } else {
            state.selectedIds.delete(id);
        }
    });
    updateSelectedCount();
}

function previousPage() {
    if (state.page === 0) {
        return;
    }
    state.page -= 1;
    loadFailedEvents();
}

function nextPage() {
    if (state.page + 1 >= state.totalPages) {
        return;
    }
    state.page += 1;
    loadFailedEvents();
}

function resetFilters() {
    elements.statusFilter.value = "";
    elements.managementStatusFilter.value = "";
    elements.eventTypeFilter.value = "";
    elements.aggregateTypeFilter.value = "";
    elements.aggregateIdFilter.value = "";
    elements.sortFilter.value = "failedAt,desc";
    elements.sizeFilter.value = "20";
    elements.exportLimitInput.value = "1000";
    state.page = 0;
    loadFailedEvents();
}

function updateSelectedCount() {
    elements.selectedCount.textContent = `${state.selectedIds.size} 已选`;
}

async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(await errorMessage(response));
    }
    return response.json();
}

async function errorMessage(response) {
    try {
        const payload = await response.json();
        return payload.detail || payload.message || `HTTP ${response.status}`;
    } catch {
        return `HTTP ${response.status}`;
    }
}

function addParam(params, name, value) {
    if (value && value.trim() !== "") {
        params.set(name, value.trim());
    }
}

function addBodyField(body, name, value) {
    if (value && value.trim() !== "") {
        body[name] = value.trim();
    }
}

function exportLimit() {
    const value = elements.exportLimitInput.value || "1000";
    return value.trim();
}

function statusPill(value, extraClass) {
    return `<span class="status-pill ${extraClass}">${escapeHtml(value || "")}</span>`;
}

function messageStatusClass(value) {
    switch (value) {
        case "REPLAYED":
            return "status-resolved";
        case "REPLAY_FAILED":
            return "status-failed";
        default:
            return "";
    }
}

function managementStatusClass(value) {
    switch (value) {
        case "OPEN":
            return "status-open";
        case "INVESTIGATING":
            return "status-investigating";
        case "RESOLVED":
            return "status-resolved";
        case "IGNORED":
            return "status-ignored";
        default:
            return "";
    }
}

function replayAttemptStatusClass(value) {
    switch (value) {
        case "SUCCEEDED":
            return "status-resolved";
        case "FAILED":
            return "status-failed";
        case "SKIPPED_ALREADY_REPLAYED":
            return "status-skipped";
        default:
            return "";
    }
}

function formatDate(value) {
    if (!value) {
        return "";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return date.toLocaleString();
}

function renderTableMessage(message) {
    elements.failedEventsBody.innerHTML = `<tr><td colspan="10" class="empty-cell">${escapeHtml(message)}</td></tr>`;
    elements.pageMeta.textContent = "0 / 0";
}

function showToast(message, isError = false) {
    elements.toast.textContent = message;
    elements.toast.classList.toggle("error", isError);
    elements.toast.classList.add("visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
        elements.toast.classList.remove("visible");
    }, 3200);
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("\"", "&quot;")
        .replaceAll("'", "&#39;");
}
