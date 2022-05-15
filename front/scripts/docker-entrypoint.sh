#!/bin/sh

set -eu

npm install

# protoファイルがあるディレクトリへの相対パス
PROTO_SRC=../server
# 生成したjs、tsファイルを格納したいディレクトリへの相対パス
PROTO_DEST=./proto

mkdir -p ${PROTO_DEST}

# protoc-gen-tsへのパス
PROTOC_GEN_TS_PATH="$(npm bin)/protoc-gen-ts"

protoc \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${PROTO_DEST}" \
    --ts_out="service=true:${PROTO_DEST}" \
    -I ${PROTO_SRC} $(find ${PROTO_SRC} -name "*.proto")

exec "$@"
