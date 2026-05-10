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

    public String routingKeyFor(OutboxEvent event) {
        return routingKeyPrefix + "." + event.getEventType();
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
}
