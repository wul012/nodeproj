package com.codexdemo.orderplatform.notification;

import java.time.Instant;

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
