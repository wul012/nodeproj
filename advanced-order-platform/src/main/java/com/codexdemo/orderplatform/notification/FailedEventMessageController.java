package com.codexdemo.orderplatform.notification;

import com.codexdemo.orderplatform.common.PagedResponse;
import java.time.Instant;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/failed-events")
public class FailedEventMessageController {

    private static final MediaType TEXT_CSV = MediaType.parseMediaType("text/csv; charset=UTF-8");

    private final FailedEventMessageService failedEventMessageService;

    public FailedEventMessageController(FailedEventMessageService failedEventMessageService) {
        this.failedEventMessageService = failedEventMessageService;
    }

    @GetMapping
    public PagedResponse<FailedEventMessageResponse> searchFailedMessages(
            @RequestParam(required = false) FailedEventMessageStatus status,
            @RequestParam(required = false) String eventType,
            @RequestParam(required = false) String aggregateType,
            @RequestParam(required = false) String aggregateId,
            @RequestParam(required = false) FailedEventManagementStatus managementStatus,
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
                managementStatus,
                failedFrom,
                failedTo,
                page,
                size,
                sort,
                limit
        ));
    }

    @GetMapping(value = "/export", produces = "text/csv")
    public ResponseEntity<String> exportFailedMessages(
            @RequestParam(required = false) FailedEventMessageStatus status,
            @RequestParam(required = false) String eventType,
            @RequestParam(required = false) String aggregateType,
            @RequestParam(required = false) String aggregateId,
            @RequestParam(required = false) FailedEventManagementStatus managementStatus,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant failedFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant failedTo,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) Integer limit
    ) {
        String csv = failedEventMessageService.exportFailedMessagesCsv(new FailedEventMessageSearchCriteria(
                status,
                eventType,
                aggregateType,
                aggregateId,
                managementStatus,
                failedFrom,
                failedTo,
                null,
                null,
                sort,
                limit
        ));
        return csvResponse("failed-events.csv", csv);
    }

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
        return failedEventMessageService.searchManagementHistory(new FailedEventManagementHistorySearchCriteria(
                failedEventMessageId,
                previousStatus,
                newStatus,
                operatorId,
                operatorRole,
                changedFrom,
                changedTo,
                page,
                size,
                sort,
                limit
        ));
    }

    @GetMapping(value = "/management-history/export", produces = "text/csv")
    public ResponseEntity<String> exportManagementHistory(
            @RequestParam(required = false) Long failedEventMessageId,
            @RequestParam(required = false) FailedEventManagementStatus previousStatus,
            @RequestParam(required = false) FailedEventManagementStatus newStatus,
            @RequestParam(required = false) String operatorId,
            @RequestParam(required = false) String operatorRole,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant changedFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant changedTo,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) Integer limit
    ) {
        String csv = failedEventMessageService.exportManagementHistoryCsv(new FailedEventManagementHistorySearchCriteria(
                failedEventMessageId,
                previousStatus,
                newStatus,
                operatorId,
                operatorRole,
                changedFrom,
                changedTo,
                null,
                null,
                sort,
                limit
        ));
        return csvResponse("failed-event-management-history.csv", csv);
    }

    @GetMapping("/{id}/replay-attempts")
    public List<FailedEventReplayAttemptResponse> listReplayAttempts(@PathVariable Long id) {
        return failedEventMessageService.listReplayAttempts(id);
    }

    @GetMapping("/{id}/management-history")
    public List<FailedEventManagementHistoryResponse> listManagementHistory(@PathVariable Long id) {
        return failedEventMessageService.listManagementHistory(id);
    }

    @PostMapping("/management-status")
    public FailedEventManagementBatchResponse markManagementStatus(
            @RequestHeader(value = "X-Operator-Id", required = false) String operatorId,
            @RequestHeader(value = "X-Operator-Role", required = false) String operatorRole,
            @RequestBody MarkFailedEventManagementRequest request
    ) {
        return failedEventMessageService.markManagementStatus(request, operatorId, operatorRole);
    }

    @PostMapping("/{id}/replay")
    public FailedEventMessageResponse replayFailedMessage(
            @PathVariable Long id,
            @RequestHeader(value = "X-Operator-Id", required = false) String operatorId,
            @RequestHeader(value = "X-Operator-Role", required = false) String operatorRole,
            @RequestBody(required = false) ReplayFailedEventRequest request
    ) {
        return failedEventMessageService.replay(id, request, operatorId, operatorRole);
    }

    private ResponseEntity<String> csvResponse(String filename, String csv) {
        return ResponseEntity.ok()
                .contentType(TEXT_CSV)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .body(csv);
    }
}
