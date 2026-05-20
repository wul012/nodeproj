package com.codexdemo.orderplatform.ops;

import java.util.ArrayList;
import java.util.List;
import java.util.function.BooleanSupplier;

final class ReleaseApprovalEchoMarkerSupport {

    private ReleaseApprovalEchoMarkerSupport() {
    }

    static List<String> warningInputNames(String markerWarningsInputName) {
        return List.of(markerWarningsInputName);
    }

    static List<String> boundaryInputNames(String... boundaryInputNames) {
        return List.of(boundaryInputNames);
    }

    static List<String> warningLines(String markerWarningsInputName, List<String> markerWarnings) {
        return List.of(
                ReleaseApprovalDigestSupport.line(markerWarningsInputName, markerWarnings)
        );
    }

    static BoundaryDigestInput boundaryInput(String name, Object value) {
        return new BoundaryDigestInput(name, value);
    }

    static List<String> boundaryLines(BoundaryDigestInput... inputs) {
        List<String> lines = new ArrayList<>();
        for (BoundaryDigestInput input : inputs) {
            lines.add(ReleaseApprovalDigestSupport.line(input.name(), input.value()));
        }
        return List.copyOf(lines);
    }

    static WarningCondition warningIf(boolean condition, String warningCode) {
        return new WarningCondition(condition, warningCode);
    }

    static List<String> warnings(WarningCondition... conditions) {
        List<String> warnings = new ArrayList<>();
        for (WarningCondition condition : conditions) {
            if (condition.condition()) {
                warnings.add(condition.warningCode());
            }
        }
        return List.copyOf(warnings);
    }

    static EchoWorkflowStep workflowStep(String name, boolean ready) {
        return new EchoWorkflowStep(name, ready);
    }

    static EchoWorkflowStep workflowStep(String name, BooleanSupplier ready) {
        return new EchoWorkflowStep(name, ready.getAsBoolean());
    }

    static EchoWorkflowReadiness workflowReadiness(EchoWorkflowStep... steps) {
        return new EchoWorkflowReadiness(List.of(steps));
    }

    record BoundaryDigestInput(String name, Object value) {
    }

    record WarningCondition(boolean condition, String warningCode) {
    }

    record EchoWorkflowStep(String name, boolean ready) {
    }

    record EchoWorkflowReadiness(List<EchoWorkflowStep> steps) {

        EchoWorkflowReadiness {
            steps = List.copyOf(steps);
        }

        boolean ready(String stepName) {
            return steps.stream()
                    .filter(step -> step.name().equals(stepName))
                    .findFirst()
                    .map(EchoWorkflowStep::ready)
                    .orElse(false);
        }

        boolean allReady() {
            return steps.stream().allMatch(EchoWorkflowStep::ready);
        }

        List<String> readyStepNames() {
            return steps.stream()
                    .filter(EchoWorkflowStep::ready)
                    .map(EchoWorkflowStep::name)
                    .toList();
        }

        List<String> missingStepNames() {
            return steps.stream()
                    .filter(step -> !step.ready())
                    .map(EchoWorkflowStep::name)
                    .toList();
        }

        WarningCondition warningIfMissing(String stepName, String warningCode) {
            return warningIf(!ready(stepName), warningCode);
        }
    }
}
