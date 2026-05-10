package com.codexdemo.orderplatform.outbox;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(prefix = "outbox.publisher", name = "enabled", havingValue = "true", matchIfMissing = true)
public class OutboxPublisherScheduler {

    private final OutboxPublisher outboxPublisher;

    public OutboxPublisherScheduler(OutboxPublisher outboxPublisher) {
        this.outboxPublisher = outboxPublisher;
    }

    @Scheduled(fixedDelayString = "${outbox.publisher.scan-delay-ms:60000}")
    public void publishPendingEvents() {
        outboxPublisher.publishPendingEvents();
    }
}
