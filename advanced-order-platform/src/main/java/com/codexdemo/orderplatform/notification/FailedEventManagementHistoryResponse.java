package com.codexdemo.orderplatform.notification;

import java.time.Instant;

public record FailedEventManagementHistoryResponse(
        Long id,
        Long failedEventMessageId,
        FailedEventManagementStatus previousStatus,
        FailedEventManagementStatus newStatus,
        String operatorId,
        String operatorRole,
        String note,
        Instant changedAt
) {

    static FailedEventManagementHistoryResponse from(FailedEventManagementHistory history) {
        return new FailedEventManagementHistoryResponse(
                history.getId(),
                history.getFailedEventMessage().getId(),
                history.getPreviousStatus(),
                history.getNewStatus(),
                history.getOperatorId(),
                history.getOperatorRole(),
                history.getNote(),
                history.getChangedAt()
        );
    }
}
