#include <cassert>
#include <string_view>

namespace {

constexpr std::string_view import_preflight_command = "SHARDROUTEIMPORTPREFLIGHTJSON";

} // namespace

int main() {
    assert(store.size() == 0);
    return 0;
}
