# v1430 candidate document material request

v1430 adds the execution-write-mutation-freeze material request. It keeps execution, write routing, sibling mutation, and disabled-probe assumptions frozen.

The package stays read-only even when all request gates pass.
