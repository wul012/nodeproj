package com.codexdemo.orderplatform.notification;

import org.springframework.amqp.rabbit.config.RetryInterceptorBuilder;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.retry.RejectAndDontRequeueRecoverer;
import org.springframework.boot.autoconfigure.amqp.SimpleRabbitListenerContainerFactoryConfigurer;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration(proxyBeanMethods = false)
@ConditionalOnProperty(prefix = "notification.rabbitmq", name = "enabled", havingValue = "true")
public class NotificationRabbitMqConfiguration {

    @Bean
    SimpleRabbitListenerContainerFactory notificationRabbitListenerContainerFactory(
            ConnectionFactory connectionFactory,
            SimpleRabbitListenerContainerFactoryConfigurer configurer,
            NotificationRabbitMqProperties properties
    ) {
        NotificationRabbitMqProperties.Retry retry = properties.getRetry();
        SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        configurer.configure(factory, connectionFactory);
        factory.setDefaultRequeueRejected(false);
        factory.setAdviceChain(RetryInterceptorBuilder
                .stateless()
                .maxAttempts(retry.getMaxAttempts())
                .backOffOptions(
                        retry.getInitialIntervalMs(),
                        retry.getMultiplier(),
                        retry.getMaxIntervalMs()
                )
                .recoverer(new RejectAndDontRequeueRecoverer())
                .build());
        return factory;
    }
}
