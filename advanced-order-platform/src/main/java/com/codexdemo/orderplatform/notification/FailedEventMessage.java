package com.codexdemo.orderplatform.notification;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import java.time.Instant;

@Entity
@Table(
        name = "failed_event_messages",
        indexes = @Index(name = "idx_failed_event_messages_failed_at", columnList = "failed_at")
)
public class FailedEventMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "message_id", nullable = false, unique = true, length = 120)
    private String messageId;

    @Column(name = "event_id", length = 80)
    private String eventId;

    @Column(name = "event_type", length = 80)
    private String eventType;

    @Column(name = "aggregate_type", length = 64)
    private String aggregateType;

    @Column(name = "aggregate_id", length = 64)
    private String aggregateId;

    @Column(name = "source_queue", length = 160)
    private String sourceQueue;

    @Column(name = "dead_letter_queue", nullable = false, length = 160)
    private String deadLetterQueue;

    @Column(name = "failure_reason", nullable = false, length = 500)
    private String failureReason;

    @Column(nullable = false, columnDefinition = "text")
    private String payload;

    @Column(name = "failed_at", nullable = false)
    private Instant failedAt;

    protected FailedEventMessage() {
    }

    private FailedEventMessage(
            String messageId,
            String eventId,
            String eventType,
            String aggregateType,
            String aggregateId,
            String sourceQueue,
            String deadLetterQueue,
            String failureReason,
            String payload
    ) {
        if (messageId == null || messageId.isBlank()) {
            throw new IllegalArgumentException("messageId is required");
        }
        if (deadLetterQueue == null || deadLetterQueue.isBlank()) {
            throw new IllegalArgumentException("deadLetterQueue is required");
        }
        if (failureReason == null || failureReason.isBlank()) {
            throw new IllegalArgumentException("failureReason is required");
        }
        if (payload == null) {
            throw new IllegalArgumentException("payload is required");
        }
        this.messageId = messageId;
        this.eventId = eventId;
        this.eventType = eventType;
        this.aggregateType = aggregateType;
        this.aggregateId = aggregateId;
        this.sourceQueue = sourceQueue;
        this.deadLetterQueue = deadLetterQueue;
        this.failureReason = failureReason;
        this.payload = payload;
        this.failedAt = Instant.now();
    }

    public static FailedEventMessage record(
            String messageId,
            String eventId,
            String eventType,
            String aggregateType,
            String aggregateId,
            String sourceQueue,
            String deadLetterQueue,
            String failureReason,
            String payload
    ) {
        return new FailedEventMessage(
                messageId,
                eventId,
                eventType,
                aggregateType,
                aggregateId,
                sourceQueue,
                deadLetterQueue,
                failureReason,
                payload
        );
    }

    public Long getId() {
        return id;
    }

    public String getMessageId() {
        return messageId;
    }

    public String getEventId() {
        return eventId;
    }

    public String getEventType() {
        return eventType;
    }

    public String getAggregateType() {
        return aggregateType;
    }

    public String getAggregateId() {
        return aggregateId;
    }

    public String getSourceQueue() {
        return sourceQueue;
    }

    public String getDeadLetterQueue() {
        return deadLetterQueue;
    }

    public String getFailureReason() {
        return failureReason;
    }

    public String getPayload() {
        return payload;
    }

    public Instant getFailedAt() {
        return failedAt;
    }
}
