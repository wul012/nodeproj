package com.codexdemo.orderplatform.outbox;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(prefix = "outbox.rabbitmq", name = "enabled", havingValue = "false", matchIfMissing = true)
public class DatabaseOnlyOutboxEventDispatcher implements OutboxEventDispatcher {

    @Override
    public void dispatch(OutboxEvent event) {
        // Default mode keeps the Outbox table as the delivery record without contacting a broker.
    }
}
