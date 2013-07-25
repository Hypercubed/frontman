# Priority
- [ ] Update documentation with @document
- [ ] Option to specify output directory
- [ ] Batch process with globbing (parse -t template.json *.md)
- [ ] How to delete an element

# Tests
- [x] frontman tests/test.md
- [x] frontman tests/test.md -t tests/template.cson
- [x] frontman tests/test.md -t tests/template.cson -r
- [x] frontman tests/test.md -j
- [x] frontman tests/test.md -y
- [x] frontman tests/test.md -c
- [x] frontman tests/test.md -t tests/template.json

# Todo
- [x] Make lib
- [x] Make cli-bin
- [x] Make use jsYaml-front-matter
- [x] Include tests
- [x] Read filename from cli
- [x] Read template from cli
- [x] Read template from json?
- [ ] Yaml+eco based templates?
- [x] Change name of @base?
- [ ] Fix trimming
- [ ] stdin
- [ ] find command?
- [ ] preserve !<tag:yaml.org,2002:js/function> tags?
- [ ] option to protect content (prevent template from altering base content)
