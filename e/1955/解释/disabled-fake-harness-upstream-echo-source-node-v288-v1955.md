# Node v1955 - disabled fake harness upstream echo Node v288 source

## Focus

Move Node v288 source contract projection into references.

## What changed

`createSourceNodeV288` now lives in the references module and still loads the Node v288 disabled fake harness contract through the existing public service.

## Maintenance note

Source projection changes should remain isolated from profile composition.
