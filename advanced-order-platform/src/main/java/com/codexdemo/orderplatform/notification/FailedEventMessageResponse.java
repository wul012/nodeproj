package com.codexdemo.orderplatform.notification;

import java.time.Instant;

public record FailedEventMessageResponse(
        Long id,
        String messageId,
        String eventId,
        String eventType,
        String aggregateType,
        String aggregateId,
        String sourceQueue,
        String deadLetterQueue,
        String failureReason,
        String payload,
        Instant failedAt
) {

    static FailedEventMessageResponse from(FailedEventMessage failedMessage) {
        return new FailedEventMessageResponse(
                failedMessage.getId(),
                failedMessage.getMessageId(),
                failedMessage.getEventId(),
                failedMessage.getEventType(),
                failedMessage.getAggregateType(),
                failedMessage.getAggregateId(),
                failedMessage.getSourceQueue(),
                failedMessage.getDeadLetterQueue(),
                failedMessage.getFailureReason(),
                failedMessage.getPayload(),
                failedMessage.getFailedAt()
        );
    }
}
