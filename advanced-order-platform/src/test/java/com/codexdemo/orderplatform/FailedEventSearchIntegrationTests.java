package com.codexdemo.orderplatform;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.codexdemo.orderplatform.common.PagedResponse;
import com.codexdemo.orderplatform.notification.FailedEventManagementBatchResponse;
import com.codexdemo.orderplatform.notification.FailedEventManagementHistoryRepository;
import com.codexdemo.orderplatform.notification.FailedEventManagementHistoryResponse;
import com.codexdemo.orderplatform.notification.FailedEventManagementHistorySearchCriteria;
import com.codexdemo.orderplatform.notification.FailedEventManagementStatus;
import com.codexdemo.orderplatform.notification.FailedEventMessage;
import com.codexdemo.orderplatform.notification.FailedEventMessageRepository;
import com.codexdemo.orderplatform.notification.FailedEventMessageResponse;
import com.codexdemo.orderplatform.notification.FailedEventMessageSearchCriteria;
import com.codexdemo.orderplatform.notification.FailedEventMessageService;
import com.codexdemo.orderplatform.notification.FailedEventMessageStatus;
import com.codexdemo.orderplatform.notification.FailedEventReplayAttempt;
import com.codexdemo.orderplatform.notification.FailedEventReplayAttemptRepository;
import com.codexdemo.orderplatform.notification.FailedEventReplayAttemptResponse;
import com.codexdemo.orderplatform.notification.FailedEventReplayAttemptSearchCriteria;
import com.codexdemo.orderplatform.notification.FailedEventReplayAttemptStatus;
import com.codexdemo.orderplatform.notification.MarkFailedEventManagementRequest;
import com.codexdemo.orderplatform.notification.ReplayFailedEventRequest;
import java.util.List;
import java.time.Instant;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@SpringBootTest(properties = {
        "order.expiration.enabled=false",
        "outbox.publisher.enabled=false"
})
class FailedEventSearchIntegrationTests {

    @Autowired
    private FailedEventMessageService failedEventMessageService;

    @Autowired
    private FailedEventMessageRepository failedEventMessageRepository;

    @Autowired
    private FailedEventReplayAttemptRepository failedEventReplayAttemptRepository;

    @Autowired
    private FailedEventManagementHistoryRepository failedEventManagementHistoryRepository;

    @BeforeEach
    void cleanFailedEventData() {
        failedEventManagementHistoryRepository.deleteAll();
        failedEventReplayAttemptRepository.deleteAll();
        failedEventMessageRepository.deleteAll();
    }

    @Test
    void searchesFailedMessagesByStatusEventAggregateTimeAndLimit() {
        Instant beforeRecords = Instant.now().minusSeconds(5);
        FailedEventMessage recordedOrder = failedEventMessageRepository.save(failedEventMessage(
                "v17-message-001",
                "17171717-1717-1717-1717-171717171701",
                "OrderCreated",
                "ORDER",
                "501"
        ));
        FailedEventMessage replayedOrder = failedEventMessageRepository.save(failedEventMessage(
                "v17-message-002",
                "17171717-1717-1717-1717-171717171702",
                "OrderCreated",
                "ORDER",
                "502"
        ));
        replayedOrder.markReplayed("17171717-1717-1717-1717-171717171712", Instant.now());
        replayedOrder = failedEventMessageRepository.save(replayedOrder);
        FailedEventMessage recordedPayment = failedEventMessageRepository.save(failedEventMessage(
                "v17-message-003",
                "17171717-1717-1717-1717-171717171703",
                "PaymentCaptured",
                "PAYMENT",
                "pay-503"
        ));
        Instant afterRecords = Instant.now().plusSeconds(5);

        PagedResponse<FailedEventMessageResponse> orderRecordedMessages = failedEventMessageService.searchFailedMessages(
                new FailedEventMessageSearchCriteria(
                        FailedEventMessageStatus.RECORDED,
                        " OrderCreated ",
                        "ORDER",
                        "501",
                        beforeRecords,
                        afterRecords,
                        10
                )
        );
        PagedResponse<FailedEventMessageResponse> replayedMessages = failedEventMessageService.searchFailedMessages(
                new FailedEventMessageSearchCriteria(
                        FailedEventMessageStatus.REPLAYED,
                        null,
                        null,
                        null,
                        null,
                        null,
                        10
                )
        );
        PagedResponse<FailedEventMessageResponse> limitedMessages = failedEventMessageService.searchFailedMessages(
                new FailedEventMessageSearchCriteria(null, null, null, null, null, null, 2)
        );
        PagedResponse<FailedEventMessageResponse> secondPage = failedEventMessageService.searchFailedMessages(
                new FailedEventMessageSearchCriteria(
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        1,
                        1,
                        "eventType,asc",
                        null
                )
        );

        assertThat(orderRecordedMessages.content()).extracting(FailedEventMessageResponse::id)
                .containsExactly(recordedOrder.getId());
        assertThat(replayedMessages.content()).extracting(FailedEventMessageResponse::id)
                .containsExactly(replayedOrder.getId());
        assertThat(limitedMessages.content()).hasSize(2);
        assertThat(limitedMessages.totalElements()).isEqualTo(3);
        assertThat(limitedMessages.totalPages()).isEqualTo(2);
        assertThat(limitedMessages.page()).isZero();
        assertThat(limitedMessages.size()).isEqualTo(2);
        assertThat(limitedMessages.sort()).isEqualTo("failedAt,desc");
        assertThat(limitedMessages.content()).extracting(FailedEventMessageResponse::id)
                .isSubsetOf(recordedOrder.getId(), replayedOrder.getId(), recordedPayment.getId());
        assertThat(secondPage.page()).isEqualTo(1);
        assertThat(secondPage.size()).isEqualTo(1);
        assertThat(secondPage.totalElements()).isEqualTo(3);
        assertThat(secondPage.totalPages()).isEqualTo(3);
        assertThat(secondPage.sort()).isEqualTo("eventType,asc");
    }

    @Test
    void searchesReplayAttemptsByMessageStatusOperatorRoleTimeAndLimit() {
        FailedEventMessage failedMessage = failedEventMessageRepository.save(failedEventMessage(
                "v17-message-004",
                "17171717-1717-1717-1717-171717171704",
                "OrderCreated",
                "ORDER",
                "504"
        ));
        Instant oldAttemptedAt = Instant.now().minusSeconds(60);
        Instant recentAttemptedAt = Instant.now();
        failedEventReplayAttemptRepository.save(FailedEventReplayAttempt.record(
                failedMessage,
                "alice",
                "SRE",
                "repair event header",
                new ReplayFailedEventRequest(
                        "17171717-1717-1717-1717-171717171714",
                        null,
                        null,
                        null,
                        null,
                        "repair event header"
                ),
                "17171717-1717-1717-1717-171717171714",
                "OrderCreated",
                "ORDER",
                "504",
                "{\"orderId\":504}",
                FailedEventReplayAttemptStatus.SUCCEEDED,
                null,
                oldAttemptedAt
        ));
        failedEventReplayAttemptRepository.save(FailedEventReplayAttempt.record(
                failedMessage,
                "bob",
                "ORDER_SUPPORT",
                "confirm repeated replay",
                new ReplayFailedEventRequest(
                        "17171717-1717-1717-1717-171717171715",
                        null,
                        null,
                        null,
                        null,
                        "confirm repeated replay"
                ),
                "17171717-1717-1717-1717-171717171715",
                "OrderCreated",
                "ORDER",
                "504",
                "{\"orderId\":504}",
                FailedEventReplayAttemptStatus.SKIPPED_ALREADY_REPLAYED,
                null,
                recentAttemptedAt
        ));

        PagedResponse<FailedEventReplayAttemptResponse> sreAttempts = failedEventMessageService.searchReplayAttempts(
                new FailedEventReplayAttemptSearchCriteria(
                        failedMessage.getId(),
                        FailedEventReplayAttemptStatus.SUCCEEDED,
                        null,
                        " sre ",
                        oldAttemptedAt.minusSeconds(1),
                        recentAttemptedAt.plusSeconds(1),
                        10
                )
        );
        PagedResponse<FailedEventReplayAttemptResponse> supportAttempts = failedEventMessageService.searchReplayAttempts(
                new FailedEventReplayAttemptSearchCriteria(
                        failedMessage.getId(),
                        FailedEventReplayAttemptStatus.SKIPPED_ALREADY_REPLAYED,
                        "bob",
                        null,
                        recentAttemptedAt.minusSeconds(1),
                        recentAttemptedAt.plusSeconds(1),
                        10
                )
        );

        assertThat(sreAttempts.content()).singleElement().satisfies(attempt -> {
            assertThat(attempt.failedEventMessageId()).isEqualTo(failedMessage.getId());
            assertThat(attempt.operatorId()).isEqualTo("alice");
            assertThat(attempt.operatorRole()).isEqualTo("SRE");
            assertThat(attempt.status()).isEqualTo(FailedEventReplayAttemptStatus.SUCCEEDED);
        });
        assertThat(sreAttempts.totalElements()).isEqualTo(1);
        assertThat(sreAttempts.sort()).isEqualTo("attemptedAt,desc");
        assertThat(supportAttempts.content()).singleElement().satisfies(attempt -> {
            assertThat(attempt.operatorId()).isEqualTo("bob");
            assertThat(attempt.operatorRole()).isEqualTo("ORDER_SUPPORT");
            assertThat(attempt.status()).isEqualTo(FailedEventReplayAttemptStatus.SKIPPED_ALREADY_REPLAYED);
        });
    }

    @Test
    void marksFailedMessagesManagementStatusInBatchAndSearchesByManagementStatus() {
        FailedEventMessage first = failedEventMessageRepository.save(failedEventMessage(
                "v19-message-001",
                "19191919-1919-1919-1919-191919191901",
                "OrderCreated",
                "ORDER",
                "901"
        ));
        FailedEventMessage second = failedEventMessageRepository.save(failedEventMessage(
                "v19-message-002",
                "19191919-1919-1919-1919-191919191902",
                "PaymentCaptured",
                "PAYMENT",
                "pay-902"
        ));
        FailedEventMessage untouched = failedEventMessageRepository.save(failedEventMessage(
                "v19-message-003",
                "19191919-1919-1919-1919-191919191903",
                "OrderCreated",
                "ORDER",
                "903"
        ));

        FailedEventManagementBatchResponse batchResponse = failedEventMessageService.markManagementStatus(
                new MarkFailedEventManagementRequest(
                        List.of(first.getId(), second.getId()),
                        FailedEventManagementStatus.INVESTIGATING,
                        "triage started by support"
                ),
                "ops-user",
                "sre"
        );
        PagedResponse<FailedEventMessageResponse> investigatingMessages = failedEventMessageService.searchFailedMessages(
                new FailedEventMessageSearchCriteria(
                        null,
                        null,
                        null,
                        null,
                        FailedEventManagementStatus.INVESTIGATING,
                        null,
                        null,
                        0,
                        10,
                        "managementStatus,asc",
                        null
                )
        );
        PagedResponse<FailedEventMessageResponse> openMessages = failedEventMessageService.searchFailedMessages(
                new FailedEventMessageSearchCriteria(
                        null,
                        null,
                        null,
                        null,
                        FailedEventManagementStatus.OPEN,
                        null,
                        null,
                        0,
                        10,
                        "managedAt,desc",
                        null
                )
        );

        assertThat(batchResponse.status()).isEqualTo(FailedEventManagementStatus.INVESTIGATING);
        assertThat(batchResponse.updatedCount()).isEqualTo(2);
        assertThat(batchResponse.items()).extracting(FailedEventMessageResponse::id)
                .containsExactlyInAnyOrder(first.getId(), second.getId());
        assertThat(investigatingMessages.totalElements()).isEqualTo(2);
        assertThat(investigatingMessages.content()).extracting(FailedEventMessageResponse::managementStatus)
                .containsOnly(FailedEventManagementStatus.INVESTIGATING);
        assertThat(investigatingMessages.content()).extracting(FailedEventMessageResponse::managementNote)
                .containsOnly("triage started by support");
        assertThat(investigatingMessages.content()).extracting(FailedEventMessageResponse::managedBy)
                .containsOnly("ops-user");
        assertThat(investigatingMessages.content())
                .allSatisfy(response -> assertThat(response.managedAt()).isNotNull());
        assertThat(openMessages.content()).singleElement().satisfies(response -> {
            assertThat(response.id()).isEqualTo(untouched.getId());
            assertThat(response.managementStatus()).isEqualTo(FailedEventManagementStatus.OPEN);
            assertThat(response.managedBy()).isNull();
            assertThat(response.managedAt()).isNull();
        });
    }

    @Test
    void recordsManagementHistoryForEachManagementStatusChangeAndSearchesIt() {
        FailedEventMessage first = failedEventMessageRepository.save(failedEventMessage(
                "v20-message-001",
                "20202020-2020-2020-2020-202020202001",
                "OrderCreated",
                "ORDER",
                "1001"
        ));
        FailedEventMessage second = failedEventMessageRepository.save(failedEventMessage(
                "v20-message-002",
                "20202020-2020-2020-2020-202020202002",
                "PaymentCaptured",
                "PAYMENT",
                "pay-1002"
        ));
        Instant beforeChanges = Instant.now().minusSeconds(5);

        failedEventMessageService.markManagementStatus(
                new MarkFailedEventManagementRequest(
                        List.of(first.getId(), second.getId()),
                        FailedEventManagementStatus.INVESTIGATING,
                        "triage started"
                ),
                "ops-user",
                "sre"
        );
        failedEventMessageService.markManagementStatus(
                new MarkFailedEventManagementRequest(
                        List.of(first.getId()),
                        FailedEventManagementStatus.RESOLVED,
                        "customer impact cleared"
                ),
                "support-user",
                "order_support"
        );
        Instant afterChanges = Instant.now().plusSeconds(5);

        List<FailedEventManagementHistoryResponse> firstHistory = failedEventMessageService.listManagementHistory(first.getId());
        PagedResponse<FailedEventManagementHistoryResponse> investigatingHistory =
                failedEventMessageService.searchManagementHistory(new FailedEventManagementHistorySearchCriteria(
                        null,
                        FailedEventManagementStatus.OPEN,
                        FailedEventManagementStatus.INVESTIGATING,
                        null,
                        "SRE",
                        beforeChanges,
                        afterChanges,
                        0,
                        10,
                        "changedAt,desc",
                        null
                ));
        PagedResponse<FailedEventManagementHistoryResponse> resolvedHistory =
                failedEventMessageService.searchManagementHistory(new FailedEventManagementHistorySearchCriteria(
                        first.getId(),
                        FailedEventManagementStatus.INVESTIGATING,
                        FailedEventManagementStatus.RESOLVED,
                        "support-user",
                        "order_support",
                        beforeChanges,
                        afterChanges,
                        0,
                        10,
                        "operatorRole,asc",
                        null
                ));

        assertThat(firstHistory).hasSize(2);
        assertThat(firstHistory.getFirst()).satisfies(history -> {
            assertThat(history.failedEventMessageId()).isEqualTo(first.getId());
            assertThat(history.previousStatus()).isEqualTo(FailedEventManagementStatus.INVESTIGATING);
            assertThat(history.newStatus()).isEqualTo(FailedEventManagementStatus.RESOLVED);
            assertThat(history.operatorId()).isEqualTo("support-user");
            assertThat(history.operatorRole()).isEqualTo("ORDER_SUPPORT");
            assertThat(history.note()).isEqualTo("customer impact cleared");
            assertThat(history.changedAt()).isNotNull();
        });
        assertThat(firstHistory.get(1)).satisfies(history -> {
            assertThat(history.previousStatus()).isEqualTo(FailedEventManagementStatus.OPEN);
            assertThat(history.newStatus()).isEqualTo(FailedEventManagementStatus.INVESTIGATING);
            assertThat(history.operatorId()).isEqualTo("ops-user");
            assertThat(history.operatorRole()).isEqualTo("SRE");
            assertThat(history.note()).isEqualTo("triage started");
        });
        assertThat(investigatingHistory.totalElements()).isEqualTo(2);
        assertThat(investigatingHistory.content()).extracting(FailedEventManagementHistoryResponse::failedEventMessageId)
                .containsExactlyInAnyOrder(first.getId(), second.getId());
        assertThat(investigatingHistory.content()).extracting(FailedEventManagementHistoryResponse::previousStatus)
                .containsOnly(FailedEventManagementStatus.OPEN);
        assertThat(investigatingHistory.content()).extracting(FailedEventManagementHistoryResponse::newStatus)
                .containsOnly(FailedEventManagementStatus.INVESTIGATING);
        assertThat(investigatingHistory.sort()).isEqualTo("changedAt,desc");
        assertThat(resolvedHistory.content()).singleElement().satisfies(history -> {
            assertThat(history.failedEventMessageId()).isEqualTo(first.getId());
            assertThat(history.previousStatus()).isEqualTo(FailedEventManagementStatus.INVESTIGATING);
            assertThat(history.newStatus()).isEqualTo(FailedEventManagementStatus.RESOLVED);
            assertThat(history.operatorRole()).isEqualTo("ORDER_SUPPORT");
        });
        assertThat(resolvedHistory.sort()).isEqualTo("operatorRole,asc");
    }

    @Test
    void rejectsInvalidSearchRangesAndLimits() {
        Instant now = Instant.now();

        assertBadRequest(() -> failedEventMessageService.searchFailedMessages(
                new FailedEventMessageSearchCriteria(null, null, null, null, now, now.minusSeconds(1), 10)
        ));
        assertBadRequest(() -> failedEventMessageService.searchFailedMessages(
                new FailedEventMessageSearchCriteria(null, null, null, null, null, null, 201)
        ));
        assertBadRequest(() -> failedEventMessageService.searchReplayAttempts(
                new FailedEventReplayAttemptSearchCriteria(null, null, null, null, now, now.minusSeconds(1), 10)
        ));
        assertBadRequest(() -> failedEventMessageService.searchReplayAttempts(
                new FailedEventReplayAttemptSearchCriteria(null, null, null, null, null, null, 0)
        ));
        assertBadRequest(() -> failedEventMessageService.searchFailedMessages(
                new FailedEventMessageSearchCriteria(null, null, null, null, null, null, -1, 50, null, null)
        ));
        assertBadRequest(() -> failedEventMessageService.searchFailedMessages(
                new FailedEventMessageSearchCriteria(null, null, null, null, null, null, 0, 201, null, null)
        ));
        assertBadRequest(() -> failedEventMessageService.searchFailedMessages(
                new FailedEventMessageSearchCriteria(null, null, null, null, null, null, 0, 50, "messageId,desc", null)
        ));
        assertBadRequest(() -> failedEventMessageService.searchReplayAttempts(
                new FailedEventReplayAttemptSearchCriteria(null, null, null, null, null, null, 0, 50, "operatorRole,sideways", null)
        ));
        assertBadRequest(() -> failedEventMessageService.searchManagementHistory(
                new FailedEventManagementHistorySearchCriteria(null, null, null, null, null, now, now.minusSeconds(1), 10)
        ));
        assertBadRequest(() -> failedEventMessageService.searchManagementHistory(
                new FailedEventManagementHistorySearchCriteria(null, null, null, null, null, null, null, 0, 50, "messageId,desc", null)
        ));
        assertBadRequest(() -> failedEventMessageService.markManagementStatus(
                new MarkFailedEventManagementRequest(
                        List.of(1L),
                        FailedEventManagementStatus.RESOLVED,
                        " "
                ),
                "ops-user",
                "SRE"
        ));
        assertBadRequest(() -> failedEventMessageService.markManagementStatus(
                new MarkFailedEventManagementRequest(
                        List.of(),
                        FailedEventManagementStatus.RESOLVED,
                        "resolved manually"
                ),
                "ops-user",
                "SRE"
        ));
        assertThatThrownBy(() -> failedEventMessageService.markManagementStatus(
                new MarkFailedEventManagementRequest(
                        List.of(1L),
                        FailedEventManagementStatus.RESOLVED,
                        "resolved manually"
                ),
                "ops-user",
                "VIEWER"
        ))
                .isInstanceOfSatisfying(ResponseStatusException.class, ex ->
                        assertThat(ex.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN)
                );
    }

    private void assertBadRequest(Runnable action) {
        assertThatThrownBy(action::run)
                .isInstanceOfSatisfying(ResponseStatusException.class, ex ->
                        assertThat(ex.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST)
                );
    }

    private FailedEventMessage failedEventMessage(
            String messageId,
            String eventId,
            String eventType,
            String aggregateType,
            String aggregateId
    ) {
        return FailedEventMessage.record(
                messageId,
                eventId,
                eventType,
                aggregateType,
                aggregateId,
                "order-platform.outbox.events",
                "order-platform.outbox.events.dlq",
                "listener rejected event",
                "{\"aggregateId\":\"" + aggregateId + "\"}"
        );
    }
}
