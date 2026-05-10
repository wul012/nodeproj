package com.codexdemo.orderplatform.outbox;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration(proxyBeanMethods = false)
@ConditionalOnProperty(prefix = "outbox.rabbitmq", name = "enabled", havingValue = "true")
public class RabbitMqOutboxConfiguration {

    @Bean
    TopicExchange outboxExchange(OutboxRabbitMqProperties properties) {
        return new TopicExchange(properties.getExchange(), true, false);
    }

    @Bean
    Queue outboxQueue(OutboxRabbitMqProperties properties) {
        return QueueBuilder.durable(properties.getQueue()).build();
    }

    @Bean
    Binding outboxBinding(Queue outboxQueue, TopicExchange outboxExchange, OutboxRabbitMqProperties properties) {
        return BindingBuilder
                .bind(outboxQueue)
                .to(outboxExchange)
                .with(properties.getRoutingKeyPrefix() + ".#");
    }
}
