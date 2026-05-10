package com.codexdemo.orderplatform.outbox;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration(proxyBeanMethods = false)
@ConditionalOnProperty(prefix = "outbox.rabbitmq", name = "enabled", havingValue = "true")
@EnableRabbit
public class RabbitMqOutboxConfiguration {

    @Bean
    TopicExchange outboxExchange(OutboxRabbitMqProperties properties) {
        return new TopicExchange(properties.getExchange(), true, false);
    }

    @Bean
    Queue outboxQueue(OutboxRabbitMqProperties properties) {
        return QueueBuilder.durable(properties.getQueue())
                .deadLetterExchange(properties.getDeadLetterExchange())
                .deadLetterRoutingKey(properties.getDeadLetterRoutingKey())
                .build();
    }

    @Bean
    Binding outboxBinding(
            @Qualifier("outboxQueue") Queue outboxQueue,
            TopicExchange outboxExchange,
            OutboxRabbitMqProperties properties
    ) {
        return BindingBuilder
                .bind(outboxQueue)
                .to(outboxExchange)
                .with(properties.getRoutingKeyPrefix() + ".#");
    }

    @Bean
    DirectExchange outboxDeadLetterExchange(OutboxRabbitMqProperties properties) {
        return new DirectExchange(properties.getDeadLetterExchange(), true, false);
    }

    @Bean
    Queue outboxDeadLetterQueue(OutboxRabbitMqProperties properties) {
        return QueueBuilder.durable(properties.getDeadLetterQueue()).build();
    }

    @Bean
    Binding outboxDeadLetterBinding(
            @Qualifier("outboxDeadLetterQueue") Queue outboxDeadLetterQueue,
            DirectExchange outboxDeadLetterExchange,
            OutboxRabbitMqProperties properties
    ) {
        return BindingBuilder
                .bind(outboxDeadLetterQueue)
                .to(outboxDeadLetterExchange)
                .with(properties.getDeadLetterRoutingKey());
    }
}
