/**
 * grunt-easy-less
 * ---------------
 * Simple less compile task for grunt
 * 
 * @author mach3
 * @require less
 * @url http://github.com/mach3/grunt-easy-less
 *
 */

module.exports = function(grunt){

	grunt.registerMultiTask(

		"ezless",
		"Easily compile LESS to CSS",

		function(){
			var my = {},
				less = require("less"),
				path = require("path");

			my.options = this.options({
				verbose : true,
				compress : true,
				lessPath : "less",
				cssPath : "css"
			});
			my.files = this.data.less || [];
			my.done = this.async();

			my.length = 0;
			my.errors = 0;

			my.init = function(){
				if(! this.files.length){
					grunt.file.expand(this.options.lessPath + "/*.less")
					.forEach(function(value, index){
						my.files.push(
							value.replace(my.options.lessPath, "")
							.replace(/^\//, "")
						);
					});
				}
				this.files = this.files.map(function(value){
					return value.replace(/\.less$/, "");
				});

				this.run();
			};

			my.run = function(){
				if(this.files.length){
					this.compile(this.files.shift(), function(){
						my.run();
					});
				} else {
					grunt.log.writeln("\nfailed " + this.errors + " in " + this.length);
					this.done();
				}
			};

			my.compile = function(file, callback){
				var lessfile, cssfile, parser;

				this.length += 1;

				lessfile = this.getPath(this.options.lessPath, file, "less");
				cssfile = this.getPath(this.options.cssPath, file, "css");
				parser = new less.Parser({
					paths : [
						path.dirname(less),
						this.options.lessPath
					] 
				});
				parser.parse(grunt.file.read(lessfile), function(error, tree){
					try {
						if(error){
							my.log(error, true);
							my.errors += 1;
						} else {
							grunt.file.write(cssfile, tree.toCSS({
								compress : my.options.compress
							}));
							my.log(cssfile + " <= " + lessfile);
						}
					} catch(e){
						my.lessError(e, lessfile);
						my.errors += 1;
					}
					callback();
				});
			};

			my.getPath = function(path, name, ext){
				return path + "/" + name + "." + ext;
			};

			my.log = function(message, error){
				if(this.options.verbose){
					if(error){
						grunt.log.errorlns(message);
					} else {
						grunt.log.writeln(message);
					}
				}
			};

			my.lessError = function(e, lessfile){
				if(this.options.verbose){
					var message = "[!] {{message}} ({{file}} at line {{line}})"
						.replace("{{file}}", lessfile)
						.replace("{{line}}", e.line)
						.replace("{{message}}", e.message);
					grunt.log.errorlns(message);
				}
			};

			my.init();
		}
	);

};