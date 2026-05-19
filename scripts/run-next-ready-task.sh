#!/usr/bin/env bash
set -euo pipefail

# BoxPulse local Codex agent runner.
#
# Before using this script locally:
# 1. Replace REPO_DIR with your local BoxPulse path.
# 2. Make the script executable:
#    chmod +x scripts/run-next-ready-task.sh
# 3. Make sure Codex CLI is installed and authenticated.
# 4. Make sure GitHub access is configured.

REPO_DIR="/ABSOLUTE/PATH/TO/BoxPulse"
LOG_DIR="$REPO_DIR/logs"
LOG_FILE="$LOG_DIR/codex-agent.log"
LOCK_FILE="/tmp/boxpulse-codex-agent.lock"

mkdir -p "$LOG_DIR"

exec 9>"$LOCK_FILE"
if ! flock -n 9; then
  echo "$(date) - Another BoxPulse Codex agent run is already active. Exiting." >> "$LOG_FILE"
  exit 0
fi

{
  echo "========================================"
  echo "Run started at $(date)"
  echo "Repository: $REPO_DIR"

  if [[ ! -d "$REPO_DIR" ]]; then
    echo "Repository directory does not exist: $REPO_DIR"
    exit 1
  fi

  cd "$REPO_DIR"

  if [[ -n "$(git status --porcelain)" ]]; then
    echo "Local changes detected before running agent. Aborting."
    git status --short
    exit 1
  fi

  git checkout dev/main
  git pull origin dev/main

  if [[ -n "$(git status --porcelain)" ]]; then
    echo "Local changes detected after pull. Aborting."
    git status --short
    exit 1
  fi

  if ! command -v codex >/dev/null 2>&1; then
    echo "Codex CLI was not found in PATH. Aborting."
    exit 1
  fi

  codex < agent/execute-next-ready-task.md

  echo "Run finished at $(date)"
} >> "$LOG_FILE" 2>&1
