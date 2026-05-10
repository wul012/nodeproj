package com.codexdemo.orderplatform.notification;

import java.time.Instant;

public record FailedEventReplayAttemptResponse(
        Long id,
        Long failedEventMessageId,
        String operatorId,
        String requestedEventId,
        String requestedEventType,
        String requestedAggregateType,
        String requestedAggregateId,
        String requestedPayload,
        String effectiveEventId,
        String effectiveEventType,
        String effectiveAggregateType,
        String effectiveAggregateId,
        String effectivePayload,
        FailedEventReplayAttemptStatus status,
        String errorMessage,
        Instant attemptedAt
) {

    static FailedEventReplayAttemptResponse from(FailedEventReplayAttempt attempt) {
        return new FailedEventReplayAttemptResponse(
                attempt.getId(),
                attempt.getFailedEventMessage().getId(),
                attempt.getOperatorId(),
                attempt.getRequestedEventId(),
                attempt.getRequestedEventType(),
                attempt.getRequestedAggregateType(),
                attempt.getRequestedAggregateId(),
                attempt.getRequestedPayload(),
                attempt.getEffectiveEventId(),
                attempt.getEffectiveEventType(),
                attempt.getEffectiveAggregateType(),
                attempt.getEffectiveAggregateId(),
                attempt.getEffectivePayload(),
                attempt.getStatus(),
                attempt.getErrorMessage(),
                attempt.getAttemptedAt()
        );
    }
}
