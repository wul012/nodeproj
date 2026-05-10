package com.codexdemo.orderplatform.notification;

import java.time.Instant;

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

    public FailedEventReplayAttemptSearchCriteria(
            Long failedEventMessageId,
            FailedEventReplayAttemptStatus status,
            String operatorId,
            String operatorRole,
            Instant attemptedFrom,
            Instant attemptedTo,
            Integer limit
    ) {
        this(failedEventMessageId, status, operatorId, operatorRole, attemptedFrom, attemptedTo, null, null, null, limit);
    }
}
