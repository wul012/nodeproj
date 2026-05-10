package com.codexdemo.orderplatform;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

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
import java.util.List;
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

        List<FailedEventMessageResponse> orderRecordedMessages = failedEventMessageService.searchFailedMessages(
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
        List<FailedEventMessageResponse> replayedMessages = failedEventMessageService.searchFailedMessages(
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
        List<FailedEventMessageResponse> limitedMessages = failedEventMessageService.searchFailedMessages(
                new FailedEventMessageSearchCriteria(null, null, null, null, null, null, 2)
        );

        assertThat(orderRecordedMessages).extracting(FailedEventMessageResponse::id)
                .containsExactly(recordedOrder.getId());
        assertThat(replayedMessages).extracting(FailedEventMessageResponse::id)
                .containsExactly(replayedOrder.getId());
        assertThat(limitedMessages).hasSize(2);
        assertThat(limitedMessages).extracting(FailedEventMessageResponse::id)
                .isSubsetOf(recordedOrder.getId(), replayedOrder.getId(), recordedPayment.getId());
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

        List<FailedEventReplayAttemptResponse> sreAttempts = failedEventMessageService.searchReplayAttempts(
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
        List<FailedEventReplayAttemptResponse> supportAttempts = failedEventMessageService.searchReplayAttempts(
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

        assertThat(sreAttempts).singleElement().satisfies(attempt -> {
            assertThat(attempt.failedEventMessageId()).isEqualTo(failedMessage.getId());
            assertThat(attempt.operatorId()).isEqualTo("alice");
            assertThat(attempt.operatorRole()).isEqualTo("SRE");
            assertThat(attempt.status()).isEqualTo(FailedEventReplayAttemptStatus.SUCCEEDED);
        });
        assertThat(supportAttempts).singleElement().satisfies(attempt -> {
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
