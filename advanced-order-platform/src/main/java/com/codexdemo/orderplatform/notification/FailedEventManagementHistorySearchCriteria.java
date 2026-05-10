package com.codexdemo.orderplatform.notification;

import java.time.Instant;

public record FailedEventManagementHistorySearchCriteria(
        Long failedEventMessageId,
        FailedEventManagementStatus previousStatus,
        FailedEventManagementStatus newStatus,
        String operatorId,
        String operatorRole,
        Instant changedFrom,
        Instant changedTo,
        Integer page,
        Integer size,
        String sort,
        Integer limit
) {

    public FailedEventManagementHistorySearchCriteria(
            Long failedEventMessageId,
            FailedEventManagementStatus previousStatus,
            FailedEventManagementStatus newStatus,
            String operatorId,
            String operatorRole,
            Instant changedFrom,
            Instant changedTo,
            Integer limit
    ) {
        this(
                failedEventMessageId,
                previousStatus,
                newStatus,
                operatorId,
                operatorRole,
                changedFrom,
                changedTo,
                null,
                null,
                null,
                limit
        );
    }
}
