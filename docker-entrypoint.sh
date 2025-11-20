#!/bin/sh

# Load environment variables from .env.production
if [ -f .env.production ]; then
    export $(cat .env.production | grep -v '^#' | grep -v '^$' | xargs)
fi

# Execute the command passed to the script
exec "$@"