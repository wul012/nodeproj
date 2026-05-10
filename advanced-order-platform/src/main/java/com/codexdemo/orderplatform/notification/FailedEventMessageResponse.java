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
        Instant failedAt,
        FailedEventMessageStatus status,
        int replayCount,
        Instant lastReplayedAt,
        String lastReplayEventId,
        String lastReplayError,
        FailedEventManagementStatus managementStatus,
        String managementNote,
        String managedBy,
        Instant managedAt
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
                failedMessage.getFailedAt(),
                failedMessage.getStatus(),
                failedMessage.getReplayCount(),
                failedMessage.getLastReplayedAt(),
                failedMessage.getLastReplayEventId(),
                failedMessage.getLastReplayError(),
                failedMessage.getManagementStatus(),
                failedMessage.getManagementNote(),
                failedMessage.getManagedBy(),
                failedMessage.getManagedAt()
        );
    }
}
