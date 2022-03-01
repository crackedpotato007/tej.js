#!/bin/bash

# Exit on any errors
set -e

npm i typescript@latest
# Compile the project
tsc --outDir dist/

# Re-generate the documentation
npx typedoc "src/exports.ts"

echo "Success!"