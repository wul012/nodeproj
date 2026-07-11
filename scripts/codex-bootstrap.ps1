# Codex session bootstrap. Run at session start: .\scripts\codex-bootstrap.ps1
# Prints orientation in one command instead of re-deriving repo state by hand.
$ErrorActionPreference = 'SilentlyContinue'

Write-Output '=== git: last 3 commits / status ==='
git log --oneline -3
git status -sb | Select-Object -First 8
Write-Output '=== latest tag ==='
git tag --sort=-creatordate | Select-Object -First 1
Write-Output '=== remote name (may not be origin) ==='
git remote -v | Select-Object -First 1
Write-Output '=== CI: last 3 runs (do not block-watch intermediates) ==='
gh run list --limit 3
Write-Output '=== pointers ==='
Write-Output 'Active program : coordination repo AGENTS.md -> Current Active Program'
Write-Output 'Playbook/ledger: docs\plans\production-excellence-node-playbook.md (progress table)'
Write-Output 'Active brief   : docs\plans\production-excellence-node-final-push.md'
Write-Output 'Capstone rerun : INTEGRATION_LIVE=1 npm run readiness:cross (required at Java track close)'
