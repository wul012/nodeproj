package com.codexdemo.orderplatform.notification;

import com.codexdemo.orderplatform.common.PagedResponse;
import com.codexdemo.orderplatform.outbox.OutboxRabbitMqProperties;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HexFormat;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import org.springframework.amqp.AmqpException;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
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

    private static final Map<String, String> FAILED_MESSAGE_SORT_FIELDS = Map.of(
            "id", "id",
            "failedAt", "failedAt",
            "status", "status",
            "eventType", "eventType",
            "aggregateId", "aggregateId",
            "replayCount", "replayCount",
            "managementStatus", "managementStatus",
            "managedAt", "managedAt"
    );

    private static final Map<String, String> REPLAY_ATTEMPT_SORT_FIELDS = Map.of(
            "id", "id",
            "attemptedAt", "attemptedAt",
            "status", "status",
            "operatorId", "operatorId",
            "operatorRole", "operatorRole"
    );

    private static final Map<String, String> MANAGEMENT_HISTORY_SORT_FIELDS = Map.of(
            "id", "id",
            "changedAt", "changedAt",
            "previousStatus", "previousStatus",
            "newStatus", "newStatus",
            "operatorId", "operatorId",
            "operatorRole", "operatorRole"
    );

    private final FailedEventMessageRepository failedEventMessageRepository;

    private final FailedEventReplayAttemptRepository failedEventReplayAttemptRepository;

    private final FailedEventManagementHistoryRepository failedEventManagementHistoryRepository;

    private final FailedEventReplayProperties failedEventReplayProperties;

    private final RabbitTemplate rabbitTemplate;

    private final OutboxRabbitMqProperties outboxRabbitMqProperties;

    public FailedEventMessageService(
            FailedEventMessageRepository failedEventMessageRepository,
            FailedEventReplayAttemptRepository failedEventReplayAttemptRepository,
            FailedEventManagementHistoryRepository failedEventManagementHistoryRepository,
            FailedEventReplayProperties failedEventReplayProperties,
            RabbitTemplate rabbitTemplate,
            OutboxRabbitMqProperties outboxRabbitMqProperties
    ) {
        this.failedEventMessageRepository = failedEventMessageRepository;
        this.failedEventReplayAttemptRepository = failedEventReplayAttemptRepository;
        this.failedEventManagementHistoryRepository = failedEventManagementHistoryRepository;
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
        )).content();
    }

    @Transactional(readOnly = true)
    public PagedResponse<FailedEventMessageResponse> searchFailedMessages(FailedEventMessageSearchCriteria criteria) {
        FailedEventMessageSearchCriteria normalizedCriteria = criteria == null
                ? new FailedEventMessageSearchCriteria(null, null, null, null, null, null, null)
                : criteria;
        validateTimeRange(normalizedCriteria.failedFrom(), normalizedCriteria.failedTo(), "failedFrom", "failedTo");
        NormalizedPageRequest pageRequest = normalizePageRequest(
                normalizedCriteria.page(),
                normalizedCriteria.size(),
                normalizedCriteria.limit(),
                normalizedCriteria.sort(),
                FAILED_MESSAGE_SORT_FIELDS,
                "failedAt,desc"
        );
        Page<FailedEventMessage> page = failedEventMessageRepository.findAll(
                failedMessagesMatching(normalizedCriteria),
                pageRequest.pageRequest()
        );
        return PagedResponse.from(page, FailedEventMessageResponse::from, pageRequest.sort());
    }

    @Transactional
    public FailedEventManagementBatchResponse markManagementStatus(
            MarkFailedEventManagementRequest request,
            String operatorId,
            String operatorRole
    ) {
        if (request == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "request body is required");
        }
        List<Long> ids = normalizeManagementIds(request.ids());
        FailedEventManagementStatus managementStatus = requireManagementStatus(request.status());
        String normalizedOperatorId = normalizeOperatorId(operatorId);
        String normalizedOperatorRole = requireAllowedOperatorRole(operatorRole);
        String note = resolveManagementNote(request.note());
        Instant managedAt = Instant.now();
        List<FailedEventMessage> failedMessages = failedEventMessageRepository.findAllById(ids);
        if (failedMessages.size() != ids.size()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "one or more failed event messages were not found");
        }
        failedMessages.forEach(failedMessage -> {
            FailedEventManagementStatus previousStatus = failedMessage.getManagementStatus();
            failedMessage.markManagementStatus(managementStatus, note, normalizedOperatorId, managedAt);
            failedEventManagementHistoryRepository.save(FailedEventManagementHistory.record(
                    failedMessage,
                    previousStatus,
                    managementStatus,
                    normalizedOperatorId,
                    normalizedOperatorRole,
                    note,
                    managedAt
            ));
        });
        return new FailedEventManagementBatchResponse(
                managementStatus,
                failedMessages.size(),
                failedMessages.stream()
                        .map(FailedEventMessageResponse::from)
                        .toList()
        );
    }

    @Transactional(readOnly = true)
    public List<FailedEventManagementHistoryResponse> listManagementHistory(Long failedEventMessageId) {
        validateSearchId(failedEventMessageId, "failedEventMessageId");
        if (!failedEventMessageRepository.existsById(failedEventMessageId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "failed event message not found");
        }
        return failedEventManagementHistoryRepository
                .findByFailedEventMessageIdOrderByChangedAtDescIdDesc(failedEventMessageId)
                .stream()
                .map(FailedEventManagementHistoryResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public PagedResponse<FailedEventManagementHistoryResponse> searchManagementHistory(
            FailedEventManagementHistorySearchCriteria criteria
    ) {
        FailedEventManagementHistorySearchCriteria normalizedCriteria = criteria == null
                ? new FailedEventManagementHistorySearchCriteria(null, null, null, null, null, null, null, null)
                : criteria;
        validateSearchId(normalizedCriteria.failedEventMessageId(), "failedEventMessageId");
        validateTimeRange(
                normalizedCriteria.changedFrom(),
                normalizedCriteria.changedTo(),
                "changedFrom",
                "changedTo"
        );
        NormalizedPageRequest pageRequest = normalizePageRequest(
                normalizedCriteria.page(),
                normalizedCriteria.size(),
                normalizedCriteria.limit(),
                normalizedCriteria.sort(),
                MANAGEMENT_HISTORY_SORT_FIELDS,
                "changedAt,desc"
        );
        Page<FailedEventManagementHistory> page = failedEventManagementHistoryRepository.findAll(
                managementHistoryMatching(normalizedCriteria),
                pageRequest.pageRequest()
        );
        return PagedResponse.from(page, FailedEventManagementHistoryResponse::from, pageRequest.sort());
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
    public PagedResponse<FailedEventReplayAttemptResponse> searchReplayAttempts(
            FailedEventReplayAttemptSearchCriteria criteria
    ) {
        FailedEventReplayAttemptSearchCriteria normalizedCriteria = criteria == null
                ? new FailedEventReplayAttemptSearchCriteria(null, null, null, null, null, null, null)
                : criteria;
        validateTimeRange(
                normalizedCriteria.attemptedFrom(),
                normalizedCriteria.attemptedTo(),
                "attemptedFrom",
                "attemptedTo"
        );
        NormalizedPageRequest pageRequest = normalizePageRequest(
                normalizedCriteria.page(),
                normalizedCriteria.size(),
                normalizedCriteria.limit(),
                normalizedCriteria.sort(),
                REPLAY_ATTEMPT_SORT_FIELDS,
                "attemptedAt,desc"
        );
        Page<FailedEventReplayAttempt> page = failedEventReplayAttemptRepository.findAll(
                replayAttemptsMatching(normalizedCriteria),
                pageRequest.pageRequest()
        );
        return PagedResponse.from(page, FailedEventReplayAttemptResponse::from, pageRequest.sort());
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
            if (criteria.managementStatus() != null) {
                predicates.add(criteriaBuilder.equal(root.get("managementStatus"), criteria.managementStatus()));
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

    private Specification<FailedEventManagementHistory> managementHistoryMatching(
            FailedEventManagementHistorySearchCriteria criteria
    ) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (criteria.failedEventMessageId() != null) {
                predicates.add(criteriaBuilder.equal(
                        root.get("failedEventMessage").get("id"),
                        criteria.failedEventMessageId()
                ));
            }
            if (criteria.previousStatus() != null) {
                predicates.add(criteriaBuilder.equal(root.get("previousStatus"), criteria.previousStatus()));
            }
            if (criteria.newStatus() != null) {
                predicates.add(criteriaBuilder.equal(root.get("newStatus"), criteria.newStatus()));
            }
            addTextEquals(predicates, criteriaBuilder, root.get("operatorId"), criteria.operatorId());
            addTextEquals(
                    predicates,
                    criteriaBuilder,
                    root.get("operatorRole"),
                    failedEventReplayProperties.normalize(criteria.operatorRole())
            );
            if (criteria.changedFrom() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("changedAt"), criteria.changedFrom()));
            }
            if (criteria.changedTo() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("changedAt"), criteria.changedTo()));
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

    private void validateSearchId(Long id, String fieldName) {
        if (id != null && id < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, fieldName + " must be positive");
        }
    }

    private List<Long> normalizeManagementIds(List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ids are required");
        }
        List<Long> normalizedIds = ids.stream()
                .distinct()
                .toList();
        if (normalizedIds.size() > 100) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ids size must be between 1 and 100");
        }
        if (normalizedIds.stream().anyMatch(id -> id == null || id < 1)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ids must contain positive ids");
        }
        return normalizedIds;
    }

    private FailedEventManagementStatus requireManagementStatus(FailedEventManagementStatus managementStatus) {
        if (managementStatus == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "management status is required");
        }
        return managementStatus;
    }

    private String resolveManagementNote(String note) {
        if (note == null || note.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "management note is required");
        }
        return truncate(note.strip(), 500);
    }

    private NormalizedPageRequest normalizePageRequest(
            Integer page,
            Integer size,
            Integer limit,
            String sort,
            Map<String, String> allowedSortFields,
            String defaultSort
    ) {
        int normalizedPage = normalizeSearchPage(page);
        int normalizedSize = normalizeSearchSize(size, limit);
        SortInstruction sortInstruction = normalizeSort(sort, allowedSortFields, defaultSort);
        return new NormalizedPageRequest(
                PageRequest.of(normalizedPage, normalizedSize, sortInstruction.sort()),
                sortInstruction.expression()
        );
    }

    private int normalizeSearchPage(Integer page) {
        if (page == null) {
            return 0;
        }
        if (page < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "page must be greater than or equal to 0");
        }
        return page;
    }

    private int normalizeSearchSize(Integer size, Integer limit) {
        Integer requestedSize = size == null ? limit : size;
        if (requestedSize == null) {
            return 50;
        }
        if (requestedSize < 1 || requestedSize > 200) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "size must be between 1 and 200");
        }
        return requestedSize;
    }

    private SortInstruction normalizeSort(
            String sort,
            Map<String, String> allowedSortFields,
            String defaultSort
    ) {
        String expression = StringUtils.hasText(sort) ? sort.strip() : defaultSort;
        String[] parts = expression.split(",");
        if (parts.length < 1 || parts.length > 2) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "sort must use field,direction format");
        }
        String requestedField = parts[0].strip();
        String property = allowedSortFields.get(requestedField);
        if (property == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "sort field is not allowed: " + requestedField);
        }
        Sort.Direction direction = Sort.Direction.DESC;
        if (parts.length == 2 && StringUtils.hasText(parts[1])) {
            try {
                direction = Sort.Direction.fromString(parts[1].strip());
            } catch (IllegalArgumentException ex) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "sort direction must be asc or desc", ex);
            }
        }
        Sort sortOrder = Sort.by(direction, property);
        if (!"id".equals(property)) {
            sortOrder = sortOrder.and(Sort.by(Sort.Direction.DESC, "id"));
        }
        return new SortInstruction(sortOrder, requestedField + "," + direction.name().toLowerCase());
    }

    private void validateTimeRange(Instant from, Instant to, String fromName, String toName) {
        if (from != null && to != null && from.isAfter(to)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, fromName + " must be before or equal to " + toName);
        }
    }

    private record NormalizedPageRequest(PageRequest pageRequest, String sort) {
    }

    private record SortInstruction(Sort sort, String expression) {
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
