# v1358 code walkthrough

The evidence-handle section groups source evidence handles and operator value handles. The design allows later references to Java and mini-kv evidence without reading fresh raw values in this Node version.

Java and mini-kv can continue in parallel because this version defines the contract they may later satisfy; it is not a live integration gate.
