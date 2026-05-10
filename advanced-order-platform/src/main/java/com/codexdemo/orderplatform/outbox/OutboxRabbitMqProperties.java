package com.codexdemo.orderplatform.outbox;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "outbox.rabbitmq")
public class OutboxRabbitMqProperties {

    private boolean enabled;

    private String exchange = "order-platform.outbox";

    private String queue = "order-platform.outbox.events";

    private String routingKeyPrefix = "orders";

    private String deadLetterExchange = "order-platform.outbox.dlx";

    private String deadLetterQueue = "order-platform.outbox.events.dlq";

    private String deadLetterRoutingKey = "orders.dead-letter";

    public String routingKeyFor(OutboxEvent event) {
        return routingKeyForEventType(event.getEventType());
    }

    public String routingKeyForEventType(String eventType) {
        return routingKeyPrefix + "." + eventType;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getExchange() {
        return exchange;
    }

    public void setExchange(String exchange) {
        this.exchange = exchange;
    }

    public String getQueue() {
        return queue;
    }

    public void setQueue(String queue) {
        this.queue = queue;
    }

    public String getRoutingKeyPrefix() {
        return routingKeyPrefix;
    }

    public void setRoutingKeyPrefix(String routingKeyPrefix) {
        this.routingKeyPrefix = routingKeyPrefix;
    }

    public String getDeadLetterExchange() {
        return deadLetterExchange;
    }

    public void setDeadLetterExchange(String deadLetterExchange) {
        this.deadLetterExchange = deadLetterExchange;
    }

    public String getDeadLetterQueue() {
        return deadLetterQueue;
    }

    public void setDeadLetterQueue(String deadLetterQueue) {
        this.deadLetterQueue = deadLetterQueue;
    }

    public String getDeadLetterRoutingKey() {
        return deadLetterRoutingKey;
    }

    public void setDeadLetterRoutingKey(String deadLetterRoutingKey) {
        this.deadLetterRoutingKey = deadLetterRoutingKey;
    }
}
