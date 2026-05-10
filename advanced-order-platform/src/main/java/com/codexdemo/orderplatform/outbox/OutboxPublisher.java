package com.codexdemo.orderplatform.outbox;

import java.time.Instant;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OutboxPublisher {

    private static final Logger log = LoggerFactory.getLogger(OutboxPublisher.class);

    private final OutboxRepository outboxRepository;

    public OutboxPublisher(OutboxRepository outboxRepository) {
        this.outboxRepository = outboxRepository;
    }

    @Transactional
    public int publishPendingEvents() {
        List<OutboxEvent> events = outboxRepository.findTop50ByPublishedAtIsNullOrderByCreatedAtAsc();
        Instant publishedAt = Instant.now();
        int published = 0;
        for (OutboxEvent event : events) {
            if (event.markPublished(publishedAt)) {
                published++;
            }
        }
        if (published > 0) {
            log.info("event=outbox_publish published={}", published);
        }
        return published;
    }
}
