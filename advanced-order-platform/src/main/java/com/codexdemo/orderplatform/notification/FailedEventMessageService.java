package com.codexdemo.orderplatform.notification;

import com.codexdemo.orderplatform.outbox.OutboxRabbitMqProperties;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HexFormat;
import java.util.List;
import java.util.UUID;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import org.springframework.amqp.AmqpException;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

@Service
public class FailedEventMessageService {

    private final FailedEventMessageRepository failedEventMessageRepository;

    private final FailedEventReplayAttemptRepository failedEventReplayAttemptRepository;

    private final FailedEventReplayProperties failedEventReplayProperties;

    private final RabbitTemplate rabbitTemplate;

    private final OutboxRabbitMqProperties outboxRabbitMqProperties;

    public FailedEventMessageService(
            FailedEventMessageRepository failedEventMessageRepository,
            FailedEventReplayAttemptRepository failedEventReplayAttemptRepository,
            FailedEventReplayProperties failedEventReplayProperties,
            RabbitTemplate rabbitTemplate,
            OutboxRabbitMqProperties outboxRabbitMqProperties
    ) {
        this.failedEventMessageRepository = failedEventMessageRepository;
        this.failedEventReplayAttemptRepository = failedEventReplayAttemptRepository;
        this.failedEventReplayProperties = failedEventReplayProperties;
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
        return searchFailedMessages(new FailedEventMessageSearchCriteria(
                null,
                null,
                null,
                null,
                null,
                null,
                null
        ));
    }

    @Transactional(readOnly = true)
    public List<FailedEventMessageResponse> searchFailedMessages(FailedEventMessageSearchCriteria criteria) {
        FailedEventMessageSearchCriteria normalizedCriteria = criteria == null
                ? new FailedEventMessageSearchCriteria(null, null, null, null, null, null, null)
                : criteria;
        validateTimeRange(normalizedCriteria.failedFrom(), normalizedCriteria.failedTo(), "failedFrom", "failedTo");
        int limit = normalizeSearchLimit(normalizedCriteria.limit());
        return failedEventMessageRepository
                .findAll(
                        failedMessagesMatching(normalizedCriteria),
                        PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "failedAt", "id"))
                )
                .getContent()
                .stream()
                .map(FailedEventMessageResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<FailedEventReplayAttemptResponse> listReplayAttempts(Long failedEventMessageId) {
        if (!failedEventMessageRepository.existsById(failedEventMessageId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "failed event message not found");
        }
        return failedEventReplayAttemptRepository
                .findByFailedEventMessageIdOrderByAttemptedAtDescIdDesc(failedEventMessageId)
                .stream()
                .map(FailedEventReplayAttemptResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<FailedEventReplayAttemptResponse> searchReplayAttempts(FailedEventReplayAttemptSearchCriteria criteria) {
        FailedEventReplayAttemptSearchCriteria normalizedCriteria = criteria == null
                ? new FailedEventReplayAttemptSearchCriteria(null, null, null, null, null, null, null)
                : criteria;
        validateTimeRange(
                normalizedCriteria.attemptedFrom(),
                normalizedCriteria.attemptedTo(),
                "attemptedFrom",
                "attemptedTo"
        );
        int limit = normalizeSearchLimit(normalizedCriteria.limit());
        return failedEventReplayAttemptRepository
                .findAll(
                        replayAttemptsMatching(normalizedCriteria),
                        PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "attemptedAt", "id"))
                )
                .getContent()
                .stream()
                .map(FailedEventReplayAttemptResponse::from)
                .toList();
    }

    @Transactional
    public FailedEventMessageResponse replay(Long id, ReplayFailedEventRequest request) {
        return replay(id, request, "system", failedEventReplayProperties.getSystemRole());
    }

    @Transactional
    public FailedEventMessageResponse replay(Long id, ReplayFailedEventRequest request, String operatorId) {
        return replay(id, request, operatorId, failedEventReplayProperties.getSystemRole());
    }

    @Transactional
    public FailedEventMessageResponse replay(
            Long id,
            ReplayFailedEventRequest request,
            String operatorId,
            String operatorRole
    ) {
        FailedEventMessage failedMessage = failedEventMessageRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "failed event message not found"));
        String normalizedOperatorId = normalizeOperatorId(operatorId);
        String normalizedOperatorRole = requireAllowedOperatorRole(operatorRole);
        String reason = resolveReplayReason(request);
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
        if (failedMessage.getStatus() == FailedEventMessageStatus.REPLAYED) {
            saveReplayAttempt(
                    failedMessage,
                    request,
                    normalizedOperatorId,
                    normalizedOperatorRole,
                    reason,
                    eventId,
                    eventType,
                    aggregateType,
                    aggregateId,
                    payload,
                    FailedEventReplayAttemptStatus.SKIPPED_ALREADY_REPLAYED,
                    null,
                    replayedAt
            );
            return FailedEventMessageResponse.from(failedMessage);
        }

        try {
            publishReplay(failedMessage, eventId, eventType, aggregateType, aggregateId, payload);
            failedMessage.markReplayed(eventId, replayedAt);
            saveReplayAttempt(
                    failedMessage,
                    request,
                    normalizedOperatorId,
                    normalizedOperatorRole,
                    reason,
                    eventId,
                    eventType,
                    aggregateType,
                    aggregateId,
                    payload,
                    FailedEventReplayAttemptStatus.SUCCEEDED,
                    null,
                    replayedAt
            );
        } catch (AmqpException ex) {
            String errorMessage = truncate(errorMessage(ex), 500);
            failedMessage.markReplayFailed(eventId, errorMessage, replayedAt);
            saveReplayAttempt(
                    failedMessage,
                    request,
                    normalizedOperatorId,
                    normalizedOperatorRole,
                    reason,
                    eventId,
                    eventType,
                    aggregateType,
                    aggregateId,
                    payload,
                    FailedEventReplayAttemptStatus.FAILED,
                    errorMessage,
                    replayedAt
            );
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

    private void saveReplayAttempt(
            FailedEventMessage failedMessage,
            ReplayFailedEventRequest request,
            String operatorId,
            String operatorRole,
            String reason,
            String eventId,
            String eventType,
            String aggregateType,
            String aggregateId,
            String payload,
            FailedEventReplayAttemptStatus status,
            String errorMessage,
            Instant attemptedAt
    ) {
        failedEventReplayAttemptRepository.save(FailedEventReplayAttempt.record(
                failedMessage,
                operatorId,
                operatorRole,
                reason,
                request,
                eventId,
                eventType,
                aggregateType,
                aggregateId,
                payload,
                status,
                errorMessage,
                attemptedAt
        ));
    }

    private Specification<FailedEventMessage> failedMessagesMatching(FailedEventMessageSearchCriteria criteria) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (criteria.status() != null) {
                predicates.add(criteriaBuilder.equal(root.get("status"), criteria.status()));
            }
            addTextEquals(predicates, criteriaBuilder, root.get("eventType"), criteria.eventType());
            addTextEquals(predicates, criteriaBuilder, root.get("aggregateType"), criteria.aggregateType());
            addTextEquals(predicates, criteriaBuilder, root.get("aggregateId"), criteria.aggregateId());
            if (criteria.failedFrom() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("failedAt"), criteria.failedFrom()));
            }
            if (criteria.failedTo() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("failedAt"), criteria.failedTo()));
            }
            return criteriaBuilder.and(predicates.toArray(Predicate[]::new));
        };
    }

    private Specification<FailedEventReplayAttempt> replayAttemptsMatching(
            FailedEventReplayAttemptSearchCriteria criteria
    ) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (criteria.failedEventMessageId() != null) {
                predicates.add(criteriaBuilder.equal(
                        root.get("failedEventMessage").get("id"),
                        criteria.failedEventMessageId()
                ));
            }
            if (criteria.status() != null) {
                predicates.add(criteriaBuilder.equal(root.get("status"), criteria.status()));
            }
            addTextEquals(predicates, criteriaBuilder, root.get("operatorId"), criteria.operatorId());
            addTextEquals(
                    predicates,
                    criteriaBuilder,
                    root.get("operatorRole"),
                    failedEventReplayProperties.normalize(criteria.operatorRole())
            );
            if (criteria.attemptedFrom() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("attemptedAt"), criteria.attemptedFrom()));
            }
            if (criteria.attemptedTo() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("attemptedAt"), criteria.attemptedTo()));
            }
            return criteriaBuilder.and(predicates.toArray(Predicate[]::new));
        };
    }

    private void addTextEquals(
            List<Predicate> predicates,
            CriteriaBuilder criteriaBuilder,
            Path<String> path,
            String value
    ) {
        String normalized = normalizeSearchText(value);
        if (normalized != null) {
            predicates.add(criteriaBuilder.equal(path, normalized));
        }
    }

    private String normalizeSearchText(String value) {
        return StringUtils.hasText(value) ? value.strip() : null;
    }

    private int normalizeSearchLimit(Integer limit) {
        if (limit == null) {
            return 50;
        }
        if (limit < 1 || limit > 200) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "limit must be between 1 and 200");
        }
        return limit;
    }

    private void validateTimeRange(Instant from, Instant to, String fromName, String toName) {
        if (from != null && to != null && from.isAfter(to)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, fromName + " must be before or equal to " + toName);
        }
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

    private String normalizeOperatorId(String operatorId) {
        if (operatorId == null || operatorId.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "X-Operator-Id header is required");
        }
        String normalized = operatorId.strip();
        return truncate(normalized.strip(), 80);
    }

    private String requireAllowedOperatorRole(String operatorRole) {
        if (operatorRole == null || operatorRole.isBlank()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "X-Operator-Role header is required");
        }
        String normalizedRole = failedEventReplayProperties.normalize(operatorRole);
        if (!failedEventReplayProperties.isAllowedRole(normalizedRole)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "operator role is not allowed to replay failed events");
        }
        return truncate(normalizedRole, 80);
    }

    private String resolveReplayReason(ReplayFailedEventRequest request) {
        String reason = request == null ? null : request.reason();
        if (reason == null || reason.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "reason is required for replay");
        }
        return truncate(reason.strip(), 500);
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
