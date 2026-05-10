package com.codexdemo.orderplatform.notification;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public List<NotificationMessageResponse> listRecentNotifications() {
        return notificationService.listRecentNotifications();
    }

    @GetMapping("/orders/{orderId}")
    public List<NotificationMessageResponse> listOrderNotifications(@PathVariable Long orderId) {
        return notificationService.listOrderNotifications(orderId);
    }
}
