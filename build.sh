#!/bin/bash

# Exit on any errors
set -e

# Compile the project
npx tsc

# Re-generate the documentation
npx typedoc "src/exports.ts"

echo "Success!"