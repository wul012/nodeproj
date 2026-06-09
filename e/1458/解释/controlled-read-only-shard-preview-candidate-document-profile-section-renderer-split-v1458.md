# v1458 candidate document profile section renderer split

v1458 creates the candidate document profile section renderer boundary. The new module owns the five candidate document profile sections that had been embedded in the main live-window renderer.

This keeps future candidate document changes local and reduces pressure on the giant profile renderer.
