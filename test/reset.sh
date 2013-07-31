#!/bin/sh

frontman ./test/src/test.md -o ./test/out/
frontman ./test/src/test.md -j -o ./test/out/test.json
frontman ./test/src/test.md -c -o ./test/out/test.cson
frontman ./test/src/test.md -y -o ./test/out/test.yml
frontman ./test/src/test.md -t ./test/src/template.json -o ./test/out/test_json.md
frontman ./test/src/test.md -t ./test/src/template.cson -o ./test/out/test_cson.md
frontman ./test/src/test.md -t ./test/src/template.cson -r -o ./test/out/test_cson_replace.md

