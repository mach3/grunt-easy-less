
# grunt-easy-less

## This is 

Grunt task to compile Less to CSS.  

This just has very simple feature, then can be used with less writing.
If you want to configrue options more, use [grunt-contrib-less](https://github.com/gruntjs/grunt-contrib-less), awesome grunt task as official.


## Install

```
npm install grunt-easy-less
```

## The simplest example

The simplest way to add task.

```javascript
grunt.loadNpmTasks("grunt-easy-less");

grunt.initConfig({
	ezless : {
		options : {
			lessPath : "./assets/less",
			cssPath : "./assets/css"
		}
	}
});
```

`ezless` search the `*.less` files in `./assets/less` (not recursively), compile them to css, and save as the same name in `./assets/css` directory.

For example, if you have Less files in `lessPath` as below,

```
assets/
	less/
		foo.less
		bar.less
```

Compiled css file will be saved as below.

```
assets/
	css/
		foo.css
		bar.css
```

## Specify the files to compile

If you want to specify the less file to compile, or want to compile the less files in sub-directories, 
use `less` option.

```
grunt.initConfig({
	ezless : {
		options : { ... },
		less : [
			"foo.less",
			"path/to/bar.less"
		]
	}
});
```

The path must be relative from `options.lessPath`. If `less` list is not blank, files not specified in the list will be ignored.

## Options

- lessPath : String ("less") - The path to less directory
- cssPath : String ("css") - The path to css directory
- verbose : Boolean (true) - Show the message log or not
- compress : Boolean (true) - Compress the css file or not

## Author

mach3

- [Website](http://www.mach3.jp)
- [Blog](http://blog.mach3.jp)
- [Twitter](http://twitter.com/mach3ss)

