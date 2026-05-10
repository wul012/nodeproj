package com.codexdemo.orderplatform.order;

import jakarta.validation.Valid;
import com.codexdemo.orderplatform.payment.PaymentTransactionResponse;
import java.net.URI;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderApplicationService orderApplicationService;

    public OrderController(OrderApplicationService orderApplicationService) {
        this.orderApplicationService = orderApplicationService;
    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(
            @RequestHeader("Idempotency-Key") String idempotencyKey,
            @Valid @RequestBody CreateOrderRequest request
    ) {
        CreateOrderResult result = orderApplicationService.createOrder(idempotencyKey, request);
        if (result.replayed()) {
            return ResponseEntity.ok(result.order());
        }

        return ResponseEntity
                .created(URI.create("/api/v1/orders/" + result.order().id()))
                .body(result.order());
    }

    @GetMapping("/{orderId}")
    public OrderResponse getOrder(@PathVariable Long orderId) {
        return orderApplicationService.getOrder(orderId);
    }

    @GetMapping("/{orderId}/history")
    public List<OrderStatusHistoryResponse> getOrderHistory(@PathVariable Long orderId) {
        return orderApplicationService.getOrderHistory(orderId);
    }

    @GetMapping("/{orderId}/payments")
    public List<PaymentTransactionResponse> getOrderPayments(@PathVariable Long orderId) {
        return orderApplicationService.getOrderPayments(orderId);
    }

    @PostMapping("/{orderId}/pay")
    public ResponseEntity<OrderResponse> pay(@PathVariable Long orderId) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(orderApplicationService.pay(orderId));
    }

    @PostMapping("/{orderId}/refund")
    public ResponseEntity<OrderResponse> refund(@PathVariable Long orderId) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(orderApplicationService.refund(orderId));
    }

    @PostMapping("/{orderId}/cancel")
    public ResponseEntity<OrderResponse> cancel(@PathVariable Long orderId) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(orderApplicationService.cancel(orderId));
    }

    @PostMapping("/{orderId}/ship")
    public ResponseEntity<OrderResponse> ship(@PathVariable Long orderId) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(orderApplicationService.ship(orderId));
    }

    @PostMapping("/{orderId}/complete")
    public ResponseEntity<OrderResponse> complete(@PathVariable Long orderId) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(orderApplicationService.complete(orderId));
    }
}
