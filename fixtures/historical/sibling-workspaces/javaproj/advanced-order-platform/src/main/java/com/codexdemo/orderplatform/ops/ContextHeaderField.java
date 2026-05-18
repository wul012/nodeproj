package com.codexdemo.orderplatform.ops;

import java.util.List;

record ContextHeaderField(String value, String source, boolean echoed) {

    private static final String NOT_SUPPLIED_SOURCE = "NOT_SUPPLIED";

    static ContextHeaderField from(String value, String headerName, String placeholder) {
        String normalizedValue = normalizeValue(value);
        if (normalizedValue == null) {
            return new ContextHeaderField(placeholder, NOT_SUPPLIED_SOURCE, false);
        }
        return new ContextHeaderField(normalizedValue, headerName, true);
    }

    static ContextHeaderField normalized(
            List<String> warnings,
            String value,
            String headerName,
            String placeholder,
            String warning
    ) {
        ContextHeaderField field = from(value, headerName, placeholder);
        field.addMissingWarning(warnings, warning);
        return field;
    }

    static String normalizeValue(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }

    private void addMissingWarning(List<String> warnings, String warning) {
        if (!echoed) {
            warnings.add(warning);
        }
    }

    static boolean allEchoed(ContextHeaderField... fields) {
        for (ContextHeaderField field : fields) {
            if (!field.echoed()) {
                return false;
            }
        }
        return true;
    }
}
