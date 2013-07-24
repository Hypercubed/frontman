frontman
========

WIP!!! -- Manage yaml frontmatter using cson from the command line --- like a boss

## Usage

1. Add front matter on an existing file using a cson template.

    `frontman {filename} -t {template}`
    
2. Replace front matter on an existing file using a cson template.

    `frontman {filename} -t {template} -r`

3. Add front matter to an existing file, output json

    `frontman {filename} -t {template} -j`

4. Create a new file using a cson template

    `frontman -t {template}`

5. Convert an existing file to json

    `frontman {filename} -j`

# Templates

Templates are cson files returning a single json object that will be merged with or replace the existing yaml front matter in the input file.  If `-r` is specified in the json object from the cson template will replace all yaml-front-matter that is not explicitly referenced in the template.  Without the `-r` flag data in the json object is added to existing values.  In either case the base yaml data is available to the cson template using @base.

## Examples

1. Adding or replacing front matter:

    ```
    {
        title: "title"
    	date: new Date()
    }
    ```
    
2. Modifing front matter:

    ```
    {
      name: @base.basename,
      description: @base.basename,
      value: @base.value*10,
    }
    ```


# License
MIT


