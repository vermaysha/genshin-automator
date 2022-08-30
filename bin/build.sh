#!/usr/bin/env bash

set -e

rm -rf dist
mkdir -p ./dist

ENTRYPOINTS=$(find -type f -name '*.[tj]s' -not -path './node_modules/*' -not -path './.history/*')

esbuild $ENTRYPOINTS \
	--log-level=warning \
	--outdir='./dist' \
	--outbase=. \
	--sourcemap \
	--target='node16' \
	--platform='node' \
	--format='cjs'
