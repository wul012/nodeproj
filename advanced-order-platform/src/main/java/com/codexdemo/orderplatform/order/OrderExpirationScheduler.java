package com.codexdemo.orderplatform.order;

import java.time.Instant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(prefix = "order.expiration", name = "enabled", havingValue = "true", matchIfMissing = true)
public class OrderExpirationScheduler {

    private static final Logger log = LoggerFactory.getLogger(OrderExpirationScheduler.class);

    private final OrderApplicationService orderApplicationService;
    private final OrderExpirationProperties properties;

    public OrderExpirationScheduler(
            OrderApplicationService orderApplicationService,
            OrderExpirationProperties properties
    ) {
        this.orderApplicationService = orderApplicationService;
        this.properties = properties;
    }

    @Scheduled(fixedDelayString = "${order.expiration.scan-delay-ms:60000}")
    public void expireCreatedOrders() {
        Instant createdBefore = Instant.now().minus(properties.getUnpaidTimeout());
        int expired = orderApplicationService.expireCreatedOrdersBefore(createdBefore);
        if (expired > 0) {
            log.info("event=order_expiration_scan expired={} createdBefore={}", expired, createdBefore);
        }
    }
}
