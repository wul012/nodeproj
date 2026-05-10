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
import com.codexdemo.orderplatform.order.OrderStatusHistoryResponse;
import com.codexdemo.orderplatform.outbox.OutboxEvent;
import com.codexdemo.orderplatform.outbox.OutboxPublisher;
import com.codexdemo.orderplatform.outbox.OutboxRepository;
import com.codexdemo.orderplatform.payment.PaymentStatus;
import com.codexdemo.orderplatform.payment.PaymentTransactionRepository;
import com.codexdemo.orderplatform.payment.PaymentTransactionResponse;
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

    @Autowired
    private PaymentTransactionRepository paymentTransactionRepository;

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
    void payOrderCreatesSingleSucceededPaymentTransaction() {
        Product product = productRepository.findAll().getFirst();
        CreateOrderRequest request = new CreateOrderRequest(
                UUID.fromString("20202020-2020-2020-2020-202020202020"),
                List.of(new CreateOrderLineRequest(product.getId(), 1))
        );

        CreateOrderResult created = orderApplicationService.createOrder("test-idempotency-key-002-payment", request);
        OrderResponse paid = orderApplicationService.pay(created.order().id());
        OrderResponse replayedPay = orderApplicationService.pay(created.order().id());
        List<PaymentTransactionResponse> payments = orderApplicationService.getOrderPayments(created.order().id());

        assertThat(replayedPay.status()).isEqualTo(OrderStatus.PAID);
        assertThat(payments).hasSize(1);
        PaymentTransactionResponse payment = payments.getFirst();
        assertThat(payment.orderId()).isEqualTo(created.order().id());
        assertThat(payment.amount()).isEqualByComparingTo(paid.totalAmount());
        assertThat(payment.status()).isEqualTo(PaymentStatus.SUCCEEDED);
        assertThat(payment.provider()).isEqualTo("SIMULATED");
        assertThat(payment.providerTransactionId()).startsWith("SIM-");
        assertThat(payment.createdAt()).isNotNull();
        assertThat(payment.completedAt()).isNotNull();
        assertThat(paymentTransactionRepository.countByOrderIdAndStatus(
                created.order().id(),
                PaymentStatus.SUCCEEDED
        )).isEqualTo(1);
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
    void paidOrderCanBeShippedAndCompletedIdempotently() {
        Product product = productRepository.findAll().getFirst();
        CreateOrderRequest request = new CreateOrderRequest(
                UUID.fromString("5a5a5a5a-5a5a-5a5a-5a5a-5a5a5a5a5a5a"),
                List.of(new CreateOrderLineRequest(product.getId(), 1))
        );

        CreateOrderResult created = orderApplicationService.createOrder("test-idempotency-key-005-fulfillment", request);
        orderApplicationService.pay(created.order().id());

        long eventsBeforeShip = outboxRepository.count();
        OrderResponse shipped = orderApplicationService.ship(created.order().id());
        OrderResponse replayedShip = orderApplicationService.ship(created.order().id());
        long eventsAfterShip = outboxRepository.count();

        OrderResponse completed = orderApplicationService.complete(created.order().id());
        OrderResponse replayedComplete = orderApplicationService.complete(created.order().id());
        long eventsAfterComplete = outboxRepository.count();

        assertThat(shipped.status()).isEqualTo(OrderStatus.SHIPPED);
        assertThat(shipped.shippedAt()).isNotNull();
        assertThat(replayedShip.status()).isEqualTo(OrderStatus.SHIPPED);
        assertThat(eventsAfterShip).isEqualTo(eventsBeforeShip + 1);
        assertThat(completed.status()).isEqualTo(OrderStatus.COMPLETED);
        assertThat(completed.completedAt()).isNotNull();
        assertThat(replayedComplete.status()).isEqualTo(OrderStatus.COMPLETED);
        assertThat(eventsAfterComplete).isEqualTo(eventsAfterShip + 1);
        assertThat(outboxRepository.findTop50ByOrderByCreatedAtDesc().stream().map(OutboxEvent::getEventType))
                .contains("OrderShipped", "OrderCompleted");
    }

    @Test
    void orderHistoryTracksFulfillmentTimeline() {
        Product product = productRepository.findAll().getFirst();
        CreateOrderRequest request = new CreateOrderRequest(
                UUID.fromString("60606060-6060-6060-6060-606060606060"),
                List.of(new CreateOrderLineRequest(product.getId(), 1))
        );

        CreateOrderResult created = orderApplicationService.createOrder("test-idempotency-key-010-history", request);
        orderApplicationService.pay(created.order().id());
        orderApplicationService.ship(created.order().id());
        orderApplicationService.complete(created.order().id());

        List<OrderStatusHistoryResponse> history = orderApplicationService.getOrderHistory(created.order().id());

        assertThat(history).hasSize(4);
        assertThat(history.stream().map(OrderStatusHistoryResponse::action).toList())
                .containsExactly("ORDER_CREATED", "ORDER_PAID", "ORDER_SHIPPED", "ORDER_COMPLETED");
        assertThat(history.stream().map(OrderStatusHistoryResponse::fromStatus).toList())
                .containsExactly(null, OrderStatus.CREATED, OrderStatus.PAID, OrderStatus.SHIPPED);
        assertThat(history.stream().map(OrderStatusHistoryResponse::toStatus).toList())
                .containsExactly(OrderStatus.CREATED, OrderStatus.PAID, OrderStatus.SHIPPED, OrderStatus.COMPLETED);
        assertThat(history)
                .allMatch(item -> item.id() != null)
                .allMatch(item -> item.changedAt() != null);
    }

    @Test
    void orderHistoryTracksCancelAndExpirationActions() {
        Product product = productRepository.findAll().getFirst();
        CreateOrderRequest cancelRequest = new CreateOrderRequest(
                UUID.fromString("61616161-6161-6161-6161-616161616161"),
                List.of(new CreateOrderLineRequest(product.getId(), 1))
        );

        CreateOrderResult cancelled = orderApplicationService.createOrder("test-idempotency-key-011-history-cancel", cancelRequest);
        orderApplicationService.cancel(cancelled.order().id());

        List<OrderStatusHistoryResponse> cancelHistory = orderApplicationService.getOrderHistory(cancelled.order().id());

        assertThat(cancelHistory.stream().map(OrderStatusHistoryResponse::action).toList())
                .containsExactly("ORDER_CREATED", "ORDER_CANCELLED");
        assertThat(cancelHistory.stream().map(OrderStatusHistoryResponse::toStatus).toList())
                .containsExactly(OrderStatus.CREATED, OrderStatus.CANCELLED);

        CreateOrderRequest expireRequest = new CreateOrderRequest(
                UUID.fromString("62626262-6262-6262-6262-626262626262"),
                List.of(new CreateOrderLineRequest(product.getId(), 1))
        );

        CreateOrderResult expiring = orderApplicationService.createOrder("test-idempotency-key-012-history-expire", expireRequest);
        int expired = orderApplicationService.expireCreatedOrdersBefore(Instant.now().plusSeconds(1));
        List<OrderStatusHistoryResponse> expireHistory = orderApplicationService.getOrderHistory(expiring.order().id());

        assertThat(expired).isGreaterThanOrEqualTo(1);
        assertThat(expireHistory.stream().map(OrderStatusHistoryResponse::action).toList())
                .containsExactly("ORDER_CREATED", "ORDER_EXPIRED");
        assertThat(expireHistory.stream().map(OrderStatusHistoryResponse::toStatus).toList())
                .containsExactly(OrderStatus.CREATED, OrderStatus.CANCELLED);
    }

    @Test
    void createdOrderCannotBeShipped() {
        Product product = productRepository.findAll().getFirst();
        CreateOrderRequest request = new CreateOrderRequest(
                UUID.fromString("5b5b5b5b-5b5b-5b5b-5b5b-5b5b5b5b5b5b"),
                List.of(new CreateOrderLineRequest(product.getId(), 1))
        );

        CreateOrderResult created = orderApplicationService.createOrder("test-idempotency-key-005-created-ship", request);

        assertThatThrownBy(() -> orderApplicationService.ship(created.order().id()))
                .isInstanceOf(BusinessException.class)
                .hasMessageContaining("Only PAID orders can be shipped");
    }

    @Test
    void paidOrderCannotBeCompletedBeforeShipping() {
        Product product = productRepository.findAll().getFirst();
        CreateOrderRequest request = new CreateOrderRequest(
                UUID.fromString("5c5c5c5c-5c5c-5c5c-5c5c-5c5c5c5c5c5c"),
                List.of(new CreateOrderLineRequest(product.getId(), 1))
        );

        CreateOrderResult created = orderApplicationService.createOrder("test-idempotency-key-005-paid-complete", request);
        orderApplicationService.pay(created.order().id());

        assertThatThrownBy(() -> orderApplicationService.complete(created.order().id()))
                .isInstanceOf(BusinessException.class)
                .hasMessageContaining("Only SHIPPED orders can be completed");
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
        assertThat(orderApplicationService.getOrderPayments(created.order().id())).isEmpty();
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
