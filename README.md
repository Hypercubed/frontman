frontman
========

Manage yaml front-matter from the command line --- like a boss

Frontman is supplied one or two filenames.  Each file can be of any supported type (plain text, text with a front matter block, yaml files, json files, or cson files).  Frontman will combine variables and/or content from the second file (called a template below) with variables and/or content in the first, writing the results to stdio.  Variables in a second file can join or replace variables from the first file.  If the template file is a cson file the base file variables are available to the template as the `@base` object and the content is available as `@base.__content`.

Warning... this is a work in progress.  The usage is changing rapidly.  I'm still discovering new ways to use this.  Feedback is welcome.

## Usage

1. Add front matter on an existing file using a template.  Any variables in the template file (including content if present) will replace the same variable in the first.  Other variables will remain untouched.

    `frontman {filename} -t {template}`
    
2. Replace front matter on an existing file using a template.  All variables in the template file (including content if present) will replace the all variable in the first.

    `frontman {filename} -t {template} -r`

3. Same as #1 except output json

    `frontman {filename} -t {template} -j`

4. Create a new file using an existing file as a source or template.  This is useful for converting a file to a front-matter file or creating a new file based on a template.  If the source is a cson file the code is processed.  Other file types are simply converted to a file containing a front-matter block.

    `frontman {filename}`

5. Same as #4 except output json

    `frontman {filename} -j`

7. Remove front matter

    `frontman {filename} -r`

# Templates

Templates are text files containing front-matter and/or content that will be merged with or replace the existing front-matter and/or content in the input file.  If the `-r` flag is specified the front-matter from the template will replace all front-matter in the base file.  Without the `-r` flag data in the front-matter is added to existing values in the base file.  If the template (or base file) is a cson file (as determined by the file extension) the code in the cson file is executed.  If the template file is a cson file the base file variables are available to the template using @base and the content is available as @base.__content.  See the examples below.

## Examples

1. Adding or replacing front matter (this is a valid json file, a cson or yml file will also work):

    ```
    {
        "title": "title",
    	"date": "12-12-12"
    }
    ```
    
2. Modifying front matter (this is a cson file, only cson files can reference the base file):

    ```
    {
      name: @base.name
      description: @base.name
      value: @base.value*10
      date: new Date()
      length: @base.__content.length
    }
    ```


# License
MIT


