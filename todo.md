
- [ ] Tests
- frontman tests/test_with_content.md
- frontman tests/test_with_content.md -r
- frontman tests/test_with_content.md -t tests/template_using_base.cson
- frontman tests/test_with_content.md -t tests/template_using_base.cson -j
- frontman tests/test_with_content.md -t tests/template_using_base.cson -r
- frontman tests/test_with_content.md -t tests/template_using_base.cson -j -r
- frontman tests/test_with_content.md -t tests/template_using_base_alternative.cson
- frontman tests/test_with_content.md -t tests/template_no_base.cson -r
- frontman tests/test_without_content.md
- frontman tests/test_only_content.md
- frontman tests/test_only_content.md -t tests/template_no_base.cson
- (fix) frontman tests/test_only_yaml.yml

# Todo
- [ ] Make lib
- [ ] Make cli-bin
- [x] Make use jsYaml-front-matter
- [ ] Include tests
- [x] Read filename from cli
- [x] Read template from cli
- [ ] Read template from json?
- [ ] Option to specify output cli
- [ ] Batch process with globbing (parse -t template.json *.md)
- [ ] How to delete deprecated elements
- [ ] Yaml+eco based templates?
- [ ] Change name of @base?
- [ ] Fix trimming
- [ ] stdin
- [ ] supply templae as tring in command line
- [ ] output directory

