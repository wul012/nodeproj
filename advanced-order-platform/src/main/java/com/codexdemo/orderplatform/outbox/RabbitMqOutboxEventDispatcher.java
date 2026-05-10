package com.codexdemo.orderplatform.outbox;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(prefix = "outbox.rabbitmq", name = "enabled", havingValue = "true")
public class RabbitMqOutboxEventDispatcher implements OutboxEventDispatcher {

    private final RabbitTemplate rabbitTemplate;

    private final OutboxRabbitMqProperties properties;

    public RabbitMqOutboxEventDispatcher(RabbitTemplate rabbitTemplate, OutboxRabbitMqProperties properties) {
        this.rabbitTemplate = rabbitTemplate;
        this.properties = properties;
    }

    @Override
    public void dispatch(OutboxEvent event) {
        rabbitTemplate.convertAndSend(
                properties.getExchange(),
                properties.routingKeyFor(event),
                event.getPayload(),
                message -> {
                    message.getMessageProperties().setContentType("application/json");
                    message.getMessageProperties().setMessageId(event.getId().toString());
                    message.getMessageProperties().setHeader("eventId", event.getId().toString());
                    message.getMessageProperties().setHeader("aggregateType", event.getAggregateType());
                    message.getMessageProperties().setHeader("aggregateId", event.getAggregateId());
                    message.getMessageProperties().setHeader("eventType", event.getEventType());
                    message.getMessageProperties().setHeader("createdAt", event.getCreatedAt().toString());
                    return message;
                }
        );
    }
}
