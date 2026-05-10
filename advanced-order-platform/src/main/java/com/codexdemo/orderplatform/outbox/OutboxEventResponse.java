package com.codexdemo.orderplatform.outbox;

import java.time.Instant;
import java.util.UUID;

public record OutboxEventResponse(
        UUID id,
        String aggregateType,
        String aggregateId,
        String eventType,
        String payload,
        Instant createdAt,
        Instant publishedAt
) {

    static OutboxEventResponse from(OutboxEvent event) {
        return new OutboxEventResponse(
                event.getId(),
                event.getAggregateType(),
                event.getAggregateId(),
                event.getEventType(),
                event.getPayload(),
                event.getCreatedAt(),
                event.getPublishedAt()
        );
    }
}
