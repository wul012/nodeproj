package com.codexdemo.orderplatform.notification;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import java.time.Instant;

@Entity
@Table(
        name = "failed_event_messages",
        indexes = {
                @Index(name = "idx_failed_event_messages_failed_at", columnList = "failed_at"),
                @Index(name = "idx_failed_event_messages_status", columnList = "status"),
                @Index(name = "idx_failed_event_messages_status_failed_at", columnList = "status, failed_at"),
                @Index(name = "idx_failed_event_messages_event_type_failed_at", columnList = "event_type, failed_at"),
                @Index(name = "idx_failed_event_messages_aggregate", columnList = "aggregate_type, aggregate_id"),
                @Index(
                        name = "idx_failed_event_messages_management",
                        columnList = "management_status, managed_at"
                )
        }
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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private FailedEventMessageStatus status;

    @Column(name = "replay_count", nullable = false)
    private int replayCount;

    @Column(name = "last_replayed_at")
    private Instant lastReplayedAt;

    @Column(name = "last_replay_event_id", length = 80)
    private String lastReplayEventId;

    @Column(name = "last_replay_error", length = 500)
    private String lastReplayError;

    @Enumerated(EnumType.STRING)
    @Column(name = "management_status", nullable = false, length = 32)
    private FailedEventManagementStatus managementStatus;

    @Column(name = "management_note", length = 500)
    private String managementNote;

    @Column(name = "managed_by", length = 80)
    private String managedBy;

    @Column(name = "managed_at")
    private Instant managedAt;

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
        this.status = FailedEventMessageStatus.RECORDED;
        this.replayCount = 0;
        this.managementStatus = FailedEventManagementStatus.OPEN;
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

    public FailedEventMessageStatus getStatus() {
        return status;
    }

    public int getReplayCount() {
        return replayCount;
    }

    public Instant getLastReplayedAt() {
        return lastReplayedAt;
    }

    public String getLastReplayEventId() {
        return lastReplayEventId;
    }

    public String getLastReplayError() {
        return lastReplayError;
    }

    public FailedEventManagementStatus getManagementStatus() {
        return managementStatus;
    }

    public String getManagementNote() {
        return managementNote;
    }

    public String getManagedBy() {
        return managedBy;
    }

    public Instant getManagedAt() {
        return managedAt;
    }

    public void markReplayed(String replayEventId, Instant replayedAt) {
        this.status = FailedEventMessageStatus.REPLAYED;
        this.replayCount++;
        this.lastReplayEventId = replayEventId;
        this.lastReplayedAt = replayedAt;
        this.lastReplayError = null;
    }

    public void markReplayFailed(String replayEventId, String replayError, Instant replayedAt) {
        this.status = FailedEventMessageStatus.REPLAY_FAILED;
        this.replayCount++;
        this.lastReplayEventId = replayEventId;
        this.lastReplayedAt = replayedAt;
        this.lastReplayError = replayError;
    }

    public void markManagementStatus(
            FailedEventManagementStatus managementStatus,
            String managementNote,
            String managedBy,
            Instant managedAt
    ) {
        if (managementStatus == null) {
            throw new IllegalArgumentException("managementStatus is required");
        }
        if (managedBy == null || managedBy.isBlank()) {
            throw new IllegalArgumentException("managedBy is required");
        }
        if (managedAt == null) {
            throw new IllegalArgumentException("managedAt is required");
        }
        this.managementStatus = managementStatus;
        this.managementNote = managementNote;
        this.managedBy = managedBy;
        this.managedAt = managedAt;
    }
}
