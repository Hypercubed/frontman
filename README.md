frontman
========

WIP!!! -- Manage yaml frontmatter using cson from the command line --- like a boss

# Usage

1. Add yaml front matter to an existing file using a cson template

`frontman {filename} -t {template} > {outputfile}`

2. Add yaml front matter to an existing file, preserving the existing front matter

`frontman {filename} -t {template} -e > {outputfile}`

3. Add yaml front matter to an existing file, preserving the existing front matter, output json

`frontman {filename} -t {template} -e -j > {outputfile}`

3. Create a new file using a cson template

`frontman -t {template} > {outputfile}`

4. Convert an existing file to json

`frontman {filename} -e -j  > {outputfile}`

# Templates

Templates are cson files returning a single json object that will be merged with or replace the existing yaml in the input file.  If `-r` is specified in the json object from the cson template will replace all yaml-front-matter that is not explicitily referenced in the template is process, otherwise the data is merged.  In eather case the base yaml data is availabe to teh cson template using @base.

# Examples

# License
MIT


