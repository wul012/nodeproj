package com.codexdemo.orderplatform.notification;

public record ReplayFailedEventRequest(
        String eventId,
        String eventType,
        String aggregateType,
        String aggregateId,
        String payload,
        String reason
) {
}
