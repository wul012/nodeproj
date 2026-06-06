#include "minikv/command.hpp"
#include "minikv/shard_route_preview_operator_value_draft.hpp"
#include "minikv/store.hpp"

#include <cassert>
#include <string_view>

namespace {

constexpr std::string_view value_draft_command = "SHARDROUTEVALUEDRAFTJSON";

} // namespace

int main() {
    minikv::Store store;
    minikv::CommandProcessor processor{store};
    auto result = processor.execute("SHARDROUTEVALUEDRAFTJSON");
    assert(result.response.find(value_draft_command) != std::string::npos);
    assert(store.size() == 0);
    return 0;
}
