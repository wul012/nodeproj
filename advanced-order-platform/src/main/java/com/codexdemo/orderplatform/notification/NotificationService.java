package com.codexdemo.orderplatform.notification;

import java.util.List;
import java.util.UUID;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NotificationService {

    private final NotificationMessageRepository notificationMessageRepository;

    public NotificationService(NotificationMessageRepository notificationMessageRepository) {
        this.notificationMessageRepository = notificationMessageRepository;
    }

    @Transactional
    public NotificationMessage recordOrderCreated(UUID eventId, Long orderId, String payload) {
        return notificationMessageRepository.findByEventId(eventId)
                .orElseGet(() -> saveOrderCreated(eventId, orderId, payload));
    }

    @Transactional(readOnly = true)
    public List<NotificationMessageResponse> listRecentNotifications() {
        return notificationMessageRepository.findTop50ByOrderByCreatedAtDesc().stream()
                .map(NotificationMessageResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<NotificationMessageResponse> listOrderNotifications(Long orderId) {
        return notificationMessageRepository.findByOrderIdOrderByCreatedAtAscIdAsc(orderId).stream()
                .map(NotificationMessageResponse::from)
                .toList();
    }

    private NotificationMessage saveOrderCreated(UUID eventId, Long orderId, String payload) {
        try {
            return notificationMessageRepository.save(NotificationMessage.orderCreated(eventId, orderId, payload));
        } catch (DataIntegrityViolationException ex) {
            return notificationMessageRepository.findByEventId(eventId).orElseThrow(() -> ex);
        }
    }
}
