package com.codexdemo.orderplatform.notification;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.Instant;

@Entity
@Table(
        name = "failed_event_replay_attempts",
        indexes = @Index(
                name = "idx_failed_event_replay_attempts_message",
                columnList = "failed_event_message_id, attempted_at"
        )
)
public class FailedEventReplayAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "failed_event_message_id", nullable = false)
    private FailedEventMessage failedEventMessage;

    @Column(name = "operator_id", nullable = false, length = 80)
    private String operatorId;

    @Column(name = "requested_event_id", length = 80)
    private String requestedEventId;

    @Column(name = "requested_event_type", length = 80)
    private String requestedEventType;

    @Column(name = "requested_aggregate_type", length = 64)
    private String requestedAggregateType;

    @Column(name = "requested_aggregate_id", length = 64)
    private String requestedAggregateId;

    @Column(name = "requested_payload", columnDefinition = "text")
    private String requestedPayload;

    @Column(name = "effective_event_id", length = 80)
    private String effectiveEventId;

    @Column(name = "effective_event_type", length = 80)
    private String effectiveEventType;

    @Column(name = "effective_aggregate_type", length = 64)
    private String effectiveAggregateType;

    @Column(name = "effective_aggregate_id", length = 64)
    private String effectiveAggregateId;

    @Column(name = "effective_payload", columnDefinition = "text")
    private String effectivePayload;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private FailedEventReplayAttemptStatus status;

    @Column(name = "error_message", length = 500)
    private String errorMessage;

    @Column(name = "attempted_at", nullable = false)
    private Instant attemptedAt;

    protected FailedEventReplayAttempt() {
    }

    private FailedEventReplayAttempt(
            FailedEventMessage failedEventMessage,
            String operatorId,
            ReplayFailedEventRequest request,
            String effectiveEventId,
            String effectiveEventType,
            String effectiveAggregateType,
            String effectiveAggregateId,
            String effectivePayload,
            FailedEventReplayAttemptStatus status,
            String errorMessage,
            Instant attemptedAt
    ) {
        if (failedEventMessage == null) {
            throw new IllegalArgumentException("failedEventMessage is required");
        }
        if (operatorId == null || operatorId.isBlank()) {
            throw new IllegalArgumentException("operatorId is required");
        }
        if (status == null) {
            throw new IllegalArgumentException("status is required");
        }
        if (attemptedAt == null) {
            throw new IllegalArgumentException("attemptedAt is required");
        }
        this.failedEventMessage = failedEventMessage;
        this.operatorId = operatorId;
        this.requestedEventId = request == null ? null : request.eventId();
        this.requestedEventType = request == null ? null : request.eventType();
        this.requestedAggregateType = request == null ? null : request.aggregateType();
        this.requestedAggregateId = request == null ? null : request.aggregateId();
        this.requestedPayload = request == null ? null : request.payload();
        this.effectiveEventId = effectiveEventId;
        this.effectiveEventType = effectiveEventType;
        this.effectiveAggregateType = effectiveAggregateType;
        this.effectiveAggregateId = effectiveAggregateId;
        this.effectivePayload = effectivePayload;
        this.status = status;
        this.errorMessage = errorMessage;
        this.attemptedAt = attemptedAt;
    }

    public static FailedEventReplayAttempt record(
            FailedEventMessage failedEventMessage,
            String operatorId,
            ReplayFailedEventRequest request,
            String effectiveEventId,
            String effectiveEventType,
            String effectiveAggregateType,
            String effectiveAggregateId,
            String effectivePayload,
            FailedEventReplayAttemptStatus status,
            String errorMessage,
            Instant attemptedAt
    ) {
        return new FailedEventReplayAttempt(
                failedEventMessage,
                operatorId,
                request,
                effectiveEventId,
                effectiveEventType,
                effectiveAggregateType,
                effectiveAggregateId,
                effectivePayload,
                status,
                errorMessage,
                attemptedAt
        );
    }

    public Long getId() {
        return id;
    }

    public FailedEventMessage getFailedEventMessage() {
        return failedEventMessage;
    }

    public String getOperatorId() {
        return operatorId;
    }

    public String getRequestedEventId() {
        return requestedEventId;
    }

    public String getRequestedEventType() {
        return requestedEventType;
    }

    public String getRequestedAggregateType() {
        return requestedAggregateType;
    }

    public String getRequestedAggregateId() {
        return requestedAggregateId;
    }

    public String getRequestedPayload() {
        return requestedPayload;
    }

    public String getEffectiveEventId() {
        return effectiveEventId;
    }

    public String getEffectiveEventType() {
        return effectiveEventType;
    }

    public String getEffectiveAggregateType() {
        return effectiveAggregateType;
    }

    public String getEffectiveAggregateId() {
        return effectiveAggregateId;
    }

    public String getEffectivePayload() {
        return effectivePayload;
    }

    public FailedEventReplayAttemptStatus getStatus() {
        return status;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public Instant getAttemptedAt() {
        return attemptedAt;
    }
}
