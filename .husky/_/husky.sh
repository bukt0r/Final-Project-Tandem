#!/usr/bin/env sh

if [ -z "$husky_skip_init" ]; then
  debug () {
    [ "$HUSKY_DEBUG" = "1" ] && echo "husky (debug) - $1"
  }

  readonly hook_name="$(basename -- "$0")"
  debug "starting $hook_name..."

  if [ "$HUSKY" = "0" ]; then
    debug "HUSKY env variable is set to 0, skipping hook"
    exit 0
  fi

  if [ ! -x .git/hooks/$hook_name ]; then
    debug "can't find .git/hooks/$hook_name, skipping hook"
    exit 0
  fi

  readonly command="$1"
  shift

  case "$command" in
    run)
      debug "executing command: $*"
      "$@"
      ;;
    *)
      debug "unknown command: $command"
      exit 1
      ;;
  esac
fi

