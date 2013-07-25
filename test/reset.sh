#!/bin/sh

frontman ./test/src/test.md > ./test/expected/test.md
frontman ./test/src/test.md -j > ./test/expected/test.json
frontman ./test/src/test.md -c > ./test/expected/test.cson
frontman ./test/src/test.md -y > ./test/expected/test.yml
frontman ./test/src/test.md -t test/src/template.json > ./test/expected/test_json.md
frontman ./test/src/test.md -t test/src/template.cson > ./test/expected/test_cson.md
frontman ./test/src/test.md -t test/src/template.cson -r > ./test/expected/test_cson_replace.md
