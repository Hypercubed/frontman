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

`frontman {filename} -j  > {outputfile}`

# Templates

Templates are cson files.  The base file can be referenceed using @base.  If `-e` is specified in th command line then only the yaml-front-matter that is explicitily referenced in the template is process.

# Examples

# License
MIT


