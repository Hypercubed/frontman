frontman [![Build Status](https://secure.travis-ci.org/Hypercubed/frontman.png?branch=master)](https://travis-ci.org/Hypercubed/frontman) [![NPM version](https://badge.fury.io/js/frontman.png)](http://badge.fury.io/js/frontman)
=============

Manage yaml front-matter from the command line --- like a boss
# Description

Frontman is supplied one or more filenames and an option template filename.  Each file can be of any supported type (plain text, text with a yaml front matter block, yaml files, json files, or cson files).  Frontman will combine meta data and/or content from the template file with meta data and/or content in the base file, writing the results to stdio.  Meta data in the template file will join or replace meta data from the first file.  If the template file is a cson file the base file meta data is available to the template using the `@document` object and the content is available as `@document.__content`.

Warning... this is a work in progress.  The usage is changing rapidly.  I'm still discovering new ways to use this.  Feedback is welcome.

[![Gittip donate button](http://badgr.co/gittip/hypercubed.png)](https://www.gittip.com/hypercubed/ "Donate weekly to this project using Gittip")
[![Paypal donate button](http://badgr.co/paypal/donate.png?bg=%23feb13d)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=X7KYR6T9U2NHC "One time donation to this project using Paypal")

## Install

`npm install -g Hypercubed/frontman`

## Features and command line usage

1. *Add front matter to an existing file using a template.*  Any meta data (or content if present) in the template file will be added to replace meta data in the base file.  Other meta data in the base file will remain untouched.  If the base file or the template file are cson files the code is while reading.

    `frontman {filename} -t {template}`
    
2. *Replace front matter in an existing file using a template.*  Like #1 any meta data (or content if present) in the template file will be added to replace meta data in the base file.  However, in this case if a meta data key is not explicitly references in the template it is removed.

    `frontman {filename} -t {template} -r`

3. *Process template and convert to json (or cson or yml).*  Same as #1 except output json formatted meta data.

    `frontman {filename} -t {template} -j`

4. *Convert an existing file or creating a new file based on a template.*  This is useful for converting a file to a front-matter file (or json, cson, or yaml file) or creating a new file based on a template.  If the source is a cson file the code is processed.  Other file types are simply converted to a file containing a front-matter block.

    `frontman {filename}`

5. *Remove front matter.*  Since no template file is supplied and the replace flag is set the resulting output will be the content from the source file without front matter.

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

3. Templating a new file (this is a cson file, only cson files can call functions such as `Date()`):

    ```
    {
      title: "Title Here"
      description: ""
      date: new Date()
      tags: [ 'post' ]
      layout: 'post'
      __content: "Your content here"
    }
    ```

## Try out a live example now

<a href="https://runnable.com/UfNdIppQJxBgAAKk/using-hypercubed-frontman" target="_blank"><img src="https://runnable.com/external/styles/assets/runnablebtn.png" style="width:67px;height:25px;"></a>
# License

Copyright (c) 2013 Jayson Harshbarger

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

# Acknowledgments

Built using [generator-commader](https://github.com/Hypercubed/generator-commander).
