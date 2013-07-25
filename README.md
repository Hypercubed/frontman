frontman
========

Manage yaml front-matter from the command line --- like a boss

Frontman is supplied one or more filenames and an option template filename.  Each file can be of any supported type (plain text, text with a yaml front matter block, yaml files, json files, or cson files).  Frontman will combine meta data and/or content from the template file with meta data and/or content in the base file, writing the results to stdio.  Meta data in the template file will join or replace meta data from the first file.  If the template file is a cson file the base file meta data is available to the template using the `@document` object and the content is available as `@document.__content`.

Warning... this is a work in progress.  The usage is changing rapidly.  I'm still discovering new ways to use this.  Feedback is welcome.

## Features and usage

1. *Add front matter to an existing file using a template.*  Any meta data (or content if present) in the template file will be added to replace meta data in the base file.  Other meta data in the base file will remain untouched.  If the base file or the template file are cson files the code is while reading.

    `frontman {filename} -t {template}`
    
2. *Replace front matter in an existing file using a template.*  Like #1 any meta data (or content if present) in the template file will be added to replace meta data in the base file.  However, in this case if a meta data key is not explicitly references in the template it is removed.

    `frontman {filename} -t {template} -r`

3. *Process template and convert to json (or cson or yml).*  Same as #1 except output json formatted meta data.

    `frontman {filename} -t {template} -j`

4. *Convert and existing file.*  This is useful for converting a file to a front-matter file (or json, cson, or yaml file) or creating a new file based on a template.  If the source is a cson file the code is processed.  Other file types are simply converted to a file containing a front-matter block.

    `frontman {filename}`

5. Remove front matter.  Since no template file is supplied and the replace flag is set the resulting output will be the content from the source file without front matter.

    `frontman {filename} -r`

# Templates

Templates are text files containing front-matter meta data and/or content that will be merged with or replace the existing front-matter and/or content in the input.  If the `-r` flag is specified the front-matter from the template will replace all front-matter in the base file.  Without the `-r` flag data in the front-matter is added to existing values in the input file.  If the template (or input file) is a cson file (as determined by the file extension) the code in the cson file is executed.  If the template file is a cson file the base file variables are available to the template using `@document` object and the content is available as `@document.__content`.  See the examples below.

## Examples

1. Adding or replacing front matter (this is a valid json file; a cson or yml file will also work):

    ```
    {
      "title": "title",
    	"date": "12-12-12"
    }
    ```
    
2. Modifying front matter (this is a cson file, only cson files can reference the base file):

    ```
    {
      name: @document.name
      description: @document.name
      value: @document.value*10
      date: new Date()
      length: @document.__content.length
    }
    ```


# License
MIT


