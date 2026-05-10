package com.codexdemo.orderplatform.notification;

import java.time.Instant;

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
}
