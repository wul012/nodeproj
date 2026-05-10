package com.codexdemo.orderplatform.notification;

import java.util.ArrayList;
import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "failed-event.replay")
public class FailedEventReplayProperties {

    private List<String> allowedRoles = new ArrayList<>(List.of("ORDER_SUPPORT", "SRE", "SYSTEM"));

    private String systemRole = "SYSTEM";

    public boolean isAllowedRole(String role) {
        if (role == null || role.isBlank()) {
            return false;
        }
        String normalizedRole = normalize(role);
        return allowedRoles.stream()
                .map(this::normalize)
                .anyMatch(normalizedRole::equals);
    }

    public String normalize(String role) {
        return role == null ? null : role.strip().toUpperCase();
    }

    public List<String> getAllowedRoles() {
        return allowedRoles;
    }

    public void setAllowedRoles(List<String> allowedRoles) {
        this.allowedRoles = allowedRoles;
    }

    public String getSystemRole() {
        return systemRole;
    }

    public void setSystemRole(String systemRole) {
        this.systemRole = systemRole;
    }
}
