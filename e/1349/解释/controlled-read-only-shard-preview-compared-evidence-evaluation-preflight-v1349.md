# Node v1349 compared evidence evaluation preflight

v1349 adds write and sibling mutation exclusion evaluation. The candidate must not write, route writes, or mutate Java/mini-kv state.
