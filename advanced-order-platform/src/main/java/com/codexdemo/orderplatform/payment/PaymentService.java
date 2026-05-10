package com.codexdemo.orderplatform.payment;

import com.codexdemo.orderplatform.order.SalesOrder;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    private final PaymentTransactionRepository paymentTransactionRepository;

    public PaymentService(PaymentTransactionRepository paymentTransactionRepository) {
        this.paymentTransactionRepository = paymentTransactionRepository;
    }

    public PaymentTransaction recordSucceededPayment(SalesOrder order) {
        return paymentTransactionRepository.findFirstByOrderIdAndStatusOrderByCreatedAtAscIdAsc(
                        order.getId(),
                        PaymentStatus.SUCCEEDED
                )
                .orElseGet(() -> paymentTransactionRepository.save(
                        PaymentTransaction.succeeded(order.getId(), order.getTotalAmount())
                ));
    }

    public PaymentTransaction recordRefundedPayment(SalesOrder order) {
        return paymentTransactionRepository.findFirstByOrderIdAndStatusOrderByCreatedAtAscIdAsc(
                        order.getId(),
                        PaymentStatus.REFUNDED
                )
                .orElseGet(() -> paymentTransactionRepository.save(
                        PaymentTransaction.refunded(order.getId(), order.getTotalAmount())
                ));
    }

    public List<PaymentTransaction> listOrderPayments(Long orderId) {
        return paymentTransactionRepository.findByOrderIdOrderByCreatedAtAscIdAsc(orderId);
    }
}
