package com.codexdemo.orderplatform.notification;

import java.time.Instant;

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
