package com.codexdemo.orderplatform.notification;

import com.codexdemo.orderplatform.outbox.OutboxRabbitMqProperties;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.HexFormat;
import java.util.List;
import java.util.UUID;
import org.springframework.amqp.AmqpException;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class FailedEventMessageService {

    private final FailedEventMessageRepository failedEventMessageRepository;

    private final RabbitTemplate rabbitTemplate;

    private final OutboxRabbitMqProperties outboxRabbitMqProperties;

    public FailedEventMessageService(
            FailedEventMessageRepository failedEventMessageRepository,
            RabbitTemplate rabbitTemplate,
            OutboxRabbitMqProperties outboxRabbitMqProperties
    ) {
        this.failedEventMessageRepository = failedEventMessageRepository;
        this.rabbitTemplate = rabbitTemplate;
        this.outboxRabbitMqProperties = outboxRabbitMqProperties;
    }

    @Transactional
    public FailedEventMessage record(Message message, String deadLetterQueue) {
        String payload = new String(message.getBody(), StandardCharsets.UTF_8);
        String messageId = resolveMessageId(message, payload);
        return failedEventMessageRepository.findByMessageId(messageId)
                .orElseGet(() -> saveFailedMessage(message, deadLetterQueue, payload, messageId));
    }

    @Transactional(readOnly = true)
    public List<FailedEventMessageResponse> listRecentFailedMessages() {
        return failedEventMessageRepository.findTop50ByOrderByFailedAtDesc().stream()
                .map(FailedEventMessageResponse::from)
                .toList();
    }

    @Transactional
    public FailedEventMessageResponse replay(Long id, ReplayFailedEventRequest request) {
        FailedEventMessage failedMessage = failedEventMessageRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "failed event message not found"));
        if (failedMessage.getStatus() == FailedEventMessageStatus.REPLAYED) {
            return FailedEventMessageResponse.from(failedMessage);
        }
        if (!outboxRabbitMqProperties.isEnabled()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "RabbitMQ outbox is disabled");
        }

        String eventId = resolveReplayEventId(failedMessage, request);
        String eventType = requiredReplayField("eventType", firstNonBlank(requestEventType(request), failedMessage.getEventType()));
        String aggregateType = requiredReplayField(
                "aggregateType",
                firstNonBlank(requestAggregateType(request), failedMessage.getAggregateType())
        );
        String aggregateId = requiredReplayField(
                "aggregateId",
                firstNonBlank(requestAggregateId(request), failedMessage.getAggregateId())
        );
        String payload = requiredReplayField("payload", firstNonBlank(requestPayload(request), failedMessage.getPayload()));
        Instant replayedAt = Instant.now();

        try {
            publishReplay(failedMessage, eventId, eventType, aggregateType, aggregateId, payload);
            failedMessage.markReplayed(eventId, replayedAt);
        } catch (AmqpException ex) {
            failedMessage.markReplayFailed(eventId, truncate(errorMessage(ex), 500), replayedAt);
        }
        return FailedEventMessageResponse.from(failedMessage);
    }

    private FailedEventMessage saveFailedMessage(
            Message message,
            String deadLetterQueue,
            String payload,
            String messageId
    ) {
        try {
            return failedEventMessageRepository.save(FailedEventMessage.record(
                    messageId,
                    header(message, "eventId"),
                    header(message, "eventType"),
                    header(message, "aggregateType"),
                    header(message, "aggregateId"),
                    header(message, "x-first-death-queue"),
                    deadLetterQueue,
                    truncate(firstNonBlank(header(message, "x-first-death-reason"), "dead-lettered"), 500),
                    payload
            ));
        } catch (DataIntegrityViolationException ex) {
            return failedEventMessageRepository.findByMessageId(messageId).orElseThrow(() -> ex);
        }
    }

    private void publishReplay(
            FailedEventMessage failedMessage,
            String eventId,
            String eventType,
            String aggregateType,
            String aggregateId,
            String payload
    ) {
        rabbitTemplate.convertAndSend(
                outboxRabbitMqProperties.getExchange(),
                outboxRabbitMqProperties.routingKeyForEventType(eventType),
                payload,
                message -> {
                    message.getMessageProperties().setContentType("application/json");
                    message.getMessageProperties().setMessageId(eventId);
                    message.getMessageProperties().setHeader("eventId", eventId);
                    message.getMessageProperties().setHeader("aggregateType", aggregateType);
                    message.getMessageProperties().setHeader("aggregateId", aggregateId);
                    message.getMessageProperties().setHeader("eventType", eventType);
                    message.getMessageProperties().setHeader("replayedFromFailedEventId", failedMessage.getId());
                    message.getMessageProperties().setHeader("replayedFromMessageId", failedMessage.getMessageId());
                    return message;
                }
        );
    }

    private String resolveReplayEventId(FailedEventMessage failedMessage, ReplayFailedEventRequest request) {
        String eventId = firstNonBlank(requestEventId(request), failedMessage.getEventId(), UUID.randomUUID().toString());
        try {
            UUID.fromString(eventId);
            return eventId;
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "eventId must be a valid UUID", ex);
        }
    }

    private String requiredReplayField(String fieldName, String value) {
        if (value == null || value.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, fieldName + " is required for replay");
        }
        return value;
    }

    private String resolveMessageId(Message message, String payload) {
        return firstNonBlank(
                message.getMessageProperties().getMessageId(),
                header(message, "eventId"),
                "sha256-" + sha256(payload + message.getMessageProperties().getHeaders())
        );
    }

    private String header(Message message, String name) {
        Object value = message.getMessageProperties().getHeaders().get(name);
        return value == null ? null : value.toString();
    }

    private String firstNonBlank(String... values) {
        for (String value : values) {
            if (value != null && !value.isBlank()) {
                return value;
            }
        }
        return null;
    }

    private String truncate(String value, int maxLength) {
        if (value == null || value.length() <= maxLength) {
            return value;
        }
        return value.substring(0, maxLength);
    }

    private String sha256(String value) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            return HexFormat.of().formatHex(digest.digest(value.getBytes(StandardCharsets.UTF_8)));
        } catch (NoSuchAlgorithmException ex) {
            throw new IllegalStateException("SHA-256 is not available", ex);
        }
    }

    private String requestEventId(ReplayFailedEventRequest request) {
        return request == null ? null : request.eventId();
    }

    private String requestEventType(ReplayFailedEventRequest request) {
        return request == null ? null : request.eventType();
    }

    private String requestAggregateType(ReplayFailedEventRequest request) {
        return request == null ? null : request.aggregateType();
    }

    private String requestAggregateId(ReplayFailedEventRequest request) {
        return request == null ? null : request.aggregateId();
    }

    private String requestPayload(ReplayFailedEventRequest request) {
        return request == null ? null : request.payload();
    }

    private String errorMessage(Exception ex) {
        if (ex.getMessage() == null || ex.getMessage().isBlank()) {
            return ex.getClass().getSimpleName();
        }
        return ex.getMessage();
    }
}
