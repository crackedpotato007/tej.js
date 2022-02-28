#!/bin/bash

# Exit on any errors
set -e

npm i typescript@4.5.5
# Compile the project
tsc --outDir dist/

# Re-generate the documentation
npx typedoc "src/exports.ts"

echo "Success!"