package com.codexdemo.orderplatform;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.codexdemo.orderplatform.common.PagedResponse;
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
import com.codexdemo.orderplatform.notification.ReplayFailedEventRequest;
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

    @BeforeEach
    void cleanFailedEventData() {
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
