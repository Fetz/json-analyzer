#!/usr/bin/env bash

src=$1
dest=$2
name=$(basename ${src%.*})
date=$(date -u +'%Y-%m-%d %H:%M:%S')
version=$(node src/bin/json-analyzer.js --version)

mkdir -p $(dirname $dest)

replace_tokens () {
	sed "s|@VERSION@|$version|g"
}

./node_modules/.bin/marked-man --roff $src \
    | replace_tokens > $dest
    exit $?
    ;;