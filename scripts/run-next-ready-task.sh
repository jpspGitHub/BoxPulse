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
#
# Local machine config files ignored by dirty working tree validation:
# - scripts/run-next-ready-task.sh
# - scripts/launchd/com.boxpulse.codex-agent.plist
#
# These files usually contain machine-specific absolute paths.

REPO_DIR="/ABSOLUTE/PATH/TO/BoxPulse"
LOG_DIR="$REPO_DIR/logs"
LOG_FILE="$LOG_DIR/codex-agent.log"
LOCK_DIR="/tmp/boxpulse-codex-agent.lock"

IGNORED_LOCAL_FILES=(
  "scripts/run-next-ready-task.sh"
  "scripts/launchd/com.boxpulse.codex-agent.plist"
)

mkdir -p "$LOG_DIR"

is_ignored_local_file() {
  local path="$1"
  for ignored in "${IGNORED_LOCAL_FILES[@]}"; do
    if [[ "$path" == "$ignored" ]]; then
      return 0
    fi
  done
  return 1
}

blocking_local_changes() {
  while IFS= read -r line; do
    [[ -z "$line" ]] && continue
    local path="${line:3}"
    if ! is_ignored_local_file "$path"; then
      echo "$line"
    fi
  done < <(git status --porcelain)
}

ignored_local_changes() {
  while IFS= read -r line; do
    [[ -z "$line" ]] && continue
    local path="${line:3}"
    if is_ignored_local_file "$path"; then
      echo "$line"
    fi
  done < <(git status --porcelain)
}

# macOS-compatible lock using mkdir.
# mkdir is atomic: if the directory already exists, another run is active.
if ! mkdir "$LOCK_DIR" 2>/dev/null; then
  echo "$(date) - Another BoxPulse Codex agent run is already active. Exiting." >> "$LOG_FILE"
  exit 0
fi

cleanup() {
  rm -rf "$LOCK_DIR"
}
trap cleanup EXIT INT TERM

{
  echo "========================================"
  echo "Run started at $(date)"
  echo "Repository: $REPO_DIR"

  if [[ ! -d "$REPO_DIR" ]]; then
    echo "Repository directory does not exist: $REPO_DIR"
    exit 1
  fi

  cd "$REPO_DIR"

  if [[ -n "$(blocking_local_changes)" ]]; then
    echo "Blocking local changes detected before running agent. Aborting."
    blocking_local_changes
    exit 1
  fi

  if [[ -n "$(ignored_local_changes)" ]]; then
    echo "Ignoring local runner config changes:"
    ignored_local_changes
  fi

  git checkout dev/main
  git pull origin dev/main

  if [[ -n "$(blocking_local_changes)" ]]; then
    echo "Blocking local changes detected after pull. Aborting."
    blocking_local_changes
    exit 1
  fi

  if [[ -n "$(ignored_local_changes)" ]]; then
    echo "Ignoring local runner config changes after pull:"
    ignored_local_changes
  fi

  if ! command -v codex >/dev/null 2>&1; then
    echo "Codex CLI was not found in PATH. Aborting."
    exit 1
  fi

  codex < agent/execute-next-ready-task.md

  echo "Run finished at $(date)"
} >> "$LOG_FILE" 2>&1
