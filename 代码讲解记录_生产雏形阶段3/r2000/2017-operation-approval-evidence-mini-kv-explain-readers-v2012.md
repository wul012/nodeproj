# v2012 code walkthrough

mini-kv EXPLAIN readers handle both direct side-effect fields and nested `explanation` fields.

This preserves compatibility with the existing mock and client response shapes.
