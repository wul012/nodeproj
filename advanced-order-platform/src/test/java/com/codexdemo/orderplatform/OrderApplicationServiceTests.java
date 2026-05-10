package com.codexdemo.orderplatform;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.codexdemo.orderplatform.catalog.Product;
import com.codexdemo.orderplatform.catalog.ProductRepository;
import com.codexdemo.orderplatform.common.BusinessException;
import com.codexdemo.orderplatform.inventory.InventoryItem;
import com.codexdemo.orderplatform.inventory.InventoryRepository;
import com.codexdemo.orderplatform.order.CreateOrderLineRequest;
import com.codexdemo.orderplatform.order.CreateOrderRequest;
import com.codexdemo.orderplatform.order.CreateOrderResult;
import com.codexdemo.orderplatform.order.OrderApplicationService;
import com.codexdemo.orderplatform.order.OrderResponse;
import com.codexdemo.orderplatform.order.OrderStatus;
import com.codexdemo.orderplatform.outbox.OutboxPublisher;
import com.codexdemo.orderplatform.outbox.OutboxRepository;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = {
        "order.expiration.enabled=false",
        "outbox.publisher.enabled=false"
})
class OrderApplicationServiceTests {

    @Autowired
    private OrderApplicationService orderApplicationService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private OutboxPublisher outboxPublisher;

    @Autowired
    private OutboxRepository outboxRepository;

    @Test
    void createOrderReservesStockAndReplaysIdempotentRequest() {
        Product product = productRepository.findAll().getFirst();
        InventoryItem before = inventoryRepository.findByProductId(product.getId()).orElseThrow();

        CreateOrderRequest request = new CreateOrderRequest(
                UUID.fromString("11111111-1111-1111-1111-111111111111"),
                List.of(new CreateOrderLineRequest(product.getId(), 2))
        );

        CreateOrderResult created = orderApplicationService.createOrder("test-idempotency-key-001", request);
        InventoryItem afterFirstCreate = inventoryRepository.findByProductId(product.getId()).orElseThrow();
        CreateOrderResult replayed = orderApplicationService.createOrder("test-idempotency-key-001", request);
        InventoryItem afterReplay = inventoryRepository.findByProductId(product.getId()).orElseThrow();

        assertThat(created.replayed()).isFalse();
        assertThat(replayed.replayed()).isTrue();
        assertThat(replayed.order().id()).isEqualTo(created.order().id());
        assertThat(afterFirstCreate.getAvailable()).isEqualTo(before.getAvailable() - 2);
        assertThat(afterReplay.getAvailable()).isEqualTo(afterFirstCreate.getAvailable());
    }

    @Test
    void payOrderCommitsReservedInventory() {
        Product product = productRepository.findAll().getFirst();
        CreateOrderRequest request = new CreateOrderRequest(
                UUID.fromString("22222222-2222-2222-2222-222222222222"),
                List.of(new CreateOrderLineRequest(product.getId(), 1))
        );

        CreateOrderResult created = orderApplicationService.createOrder("test-idempotency-key-002", request);
        OrderResponse paid = orderApplicationService.pay(created.order().id());
        InventoryItem inventory = inventoryRepository.findByProductId(product.getId()).orElseThrow();

        assertThat(paid.status()).isEqualTo(OrderStatus.PAID);
        assertThat(paid.paidAt()).isNotNull();
        assertThat(inventory.getReserved()).isGreaterThanOrEqualTo(0);
    }

    @Test
    void createOrderFailsWhenStockIsInsufficient() {
        Product product = productRepository.findAll().getFirst();
        CreateOrderRequest request = new CreateOrderRequest(
                UUID.fromString("33333333-3333-3333-3333-333333333333"),
                List.of(new CreateOrderLineRequest(product.getId(), 1_000_000))
        );

        assertThatThrownBy(() -> orderApplicationService.createOrder("test-idempotency-key-003", request))
                .isInstanceOf(BusinessException.class)
                .hasMessageContaining("has only");
    }

    @Test
    void cancelOrderReleasesReservedInventoryAndIsIdempotent() {
        Product product = productRepository.findAll().getFirst();
        InventoryItem before = inventoryRepository.findByProductId(product.getId()).orElseThrow();
        CreateOrderRequest request = new CreateOrderRequest(
                UUID.fromString("44444444-4444-4444-4444-444444444444"),
                List.of(new CreateOrderLineRequest(product.getId(), 3))
        );

        CreateOrderResult created = orderApplicationService.createOrder("test-idempotency-key-004", request);
        InventoryItem afterCreate = inventoryRepository.findByProductId(product.getId()).orElseThrow();
        OrderResponse cancelled = orderApplicationService.cancel(created.order().id());
        InventoryItem afterCancel = inventoryRepository.findByProductId(product.getId()).orElseThrow();
        OrderResponse replayedCancel = orderApplicationService.cancel(created.order().id());
        InventoryItem afterReplay = inventoryRepository.findByProductId(product.getId()).orElseThrow();

        assertThat(afterCreate.getAvailable()).isEqualTo(before.getAvailable() - 3);
        assertThat(afterCreate.getReserved()).isEqualTo(before.getReserved() + 3);
        assertThat(cancelled.status()).isEqualTo(OrderStatus.CANCELLED);
        assertThat(cancelled.canceledAt()).isNotNull();
        assertThat(afterCancel.getAvailable()).isEqualTo(before.getAvailable());
        assertThat(afterCancel.getReserved()).isEqualTo(before.getReserved());
        assertThat(replayedCancel.status()).isEqualTo(OrderStatus.CANCELLED);
        assertThat(afterReplay.getAvailable()).isEqualTo(afterCancel.getAvailable());
        assertThat(afterReplay.getReserved()).isEqualTo(afterCancel.getReserved());
    }

    @Test
    void paidOrderCannotBeCancelled() {
        Product product = productRepository.findAll().getFirst();
        CreateOrderRequest request = new CreateOrderRequest(
                UUID.fromString("55555555-5555-5555-5555-555555555555"),
                List.of(new CreateOrderLineRequest(product.getId(), 1))
        );

        CreateOrderResult created = orderApplicationService.createOrder("test-idempotency-key-005", request);
        orderApplicationService.pay(created.order().id());

        assertThatThrownBy(() -> orderApplicationService.cancel(created.order().id()))
                .isInstanceOf(BusinessException.class)
                .hasMessageContaining("Only CREATED orders can be cancelled");
    }

    @Test
    void cancelledOrderCannotBePaid() {
        Product product = productRepository.findAll().getFirst();
        CreateOrderRequest request = new CreateOrderRequest(
                UUID.fromString("66666666-6666-6666-6666-666666666666"),
                List.of(new CreateOrderLineRequest(product.getId(), 1))
        );

        CreateOrderResult created = orderApplicationService.createOrder("test-idempotency-key-006", request);
        orderApplicationService.cancel(created.order().id());

        assertThatThrownBy(() -> orderApplicationService.pay(created.order().id()))
                .isInstanceOf(BusinessException.class)
                .hasMessageContaining("Only CREATED orders can be paid");
    }

    @Test
    void expireCreatedOrdersBeforeReleasesReservedInventory() {
        Product product = productRepository.findAll().getFirst();
        InventoryItem before = inventoryRepository.findByProductId(product.getId()).orElseThrow();
        CreateOrderRequest request = new CreateOrderRequest(
                UUID.fromString("77777777-7777-7777-7777-777777777777"),
                List.of(new CreateOrderLineRequest(product.getId(), 2))
        );

        CreateOrderResult created = orderApplicationService.createOrder("test-idempotency-key-007", request);
        InventoryItem afterCreate = inventoryRepository.findByProductId(product.getId()).orElseThrow();
        int expired = orderApplicationService.expireCreatedOrdersBefore(Instant.now().plusSeconds(1));
        OrderResponse expiredOrder = orderApplicationService.getOrder(created.order().id());
        InventoryItem afterExpire = inventoryRepository.findByProductId(product.getId()).orElseThrow();

        assertThat(afterCreate.getAvailable()).isEqualTo(before.getAvailable() - 2);
        assertThat(afterCreate.getReserved()).isEqualTo(before.getReserved() + 2);
        assertThat(expired).isGreaterThanOrEqualTo(1);
        assertThat(expiredOrder.status()).isEqualTo(OrderStatus.CANCELLED);
        assertThat(expiredOrder.canceledAt()).isNotNull();
        assertThat(afterExpire.getAvailable()).isGreaterThanOrEqualTo(afterCreate.getAvailable() + 2);
        assertThat(afterExpire.getReserved()).isLessThanOrEqualTo(afterCreate.getReserved() - 2);
    }

    @Test
    void expireCreatedOrdersBeforeDoesNotCancelFreshOrder() {
        Product product = productRepository.findAll().getFirst();
        CreateOrderRequest request = new CreateOrderRequest(
                UUID.fromString("88888888-8888-8888-8888-888888888888"),
                List.of(new CreateOrderLineRequest(product.getId(), 1))
        );

        CreateOrderResult created = orderApplicationService.createOrder("test-idempotency-key-008", request);
        orderApplicationService.expireCreatedOrdersBefore(created.order().createdAt().minusMillis(1));
        OrderResponse freshOrder = orderApplicationService.getOrder(created.order().id());

        assertThat(freshOrder.status()).isEqualTo(OrderStatus.CREATED);
        assertThat(freshOrder.canceledAt()).isNull();
    }

    @Test
    void outboxPublisherPublishesPendingEventsAndIsIdempotent() {
        Product product = productRepository.findAll().getFirst();
        CreateOrderRequest request = new CreateOrderRequest(
                UUID.fromString("99999999-9999-9999-9999-999999999999"),
                List.of(new CreateOrderLineRequest(product.getId(), 1))
        );

        orderApplicationService.createOrder("test-idempotency-key-009", request);
        long pendingBefore = outboxRepository.countByPublishedAtIsNull();
        int published = outboxPublisher.publishPendingEvents();
        long pendingAfter = outboxRepository.countByPublishedAtIsNull();
        int republished = outboxPublisher.publishPendingEvents();

        assertThat(pendingBefore).isGreaterThanOrEqualTo(1);
        assertThat(published).isEqualTo(Math.toIntExact(pendingBefore));
        assertThat(pendingAfter).isZero();
        assertThat(republished).isZero();
        assertThat(outboxRepository.findTop50ByOrderByCreatedAtDesc())
                .allMatch(event -> event.getPublishedAt() != null);
    }
}
