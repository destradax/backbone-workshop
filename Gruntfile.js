var path = require('path');

module.exports = function(grunt) {

	// load all grunt tasks
	require("load-grunt-tasks")(grunt);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		crm: {
			src: "app",
			dist: "dist"
		},

		clean: [ "<%= crm.dist %>" ],

		copy: {
			index: {src: "<%= crm.src %>/index.html", dest: "<%= crm.dist %>/index.html"}
		},

		handlebars :{
			default: {
				options: {
					namespace: "JST.templates",
					processName: function(filePath) {
						return path.basename(filePath, ".hbs");
					}
				},
				files: {
					'<%= crm.dist %>/templates.js': '<%= crm.src %>/templates/*.hbs',
				}
			}
		},

		jshint: {
			options: {
				jshintrc : '.jshintrc',
				reporter : require('jshint-stylish')
			},
			default: ['Gruntfile.js', '.jshintrc', '<%= crm.src %>/scripts/**/*.js', '!<%= crm.src %>/scripts/vendor/**']
		},

		less: {
			default: {
				files: {
					"<%= crm.dist %>/main.css": "<%= crm.src %>/styles/*.less"
				}
			}
		},

		uglify: {
			options: {
				banner: "/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */\n",
				compress: false,
				beautify: true,
				mangle: false
			},
			default: {
				files: {
					'<%= crm.dist %>/main.js': [
						'<%= crm.src %>/scripts/lib/*.js',
						'<%= crm.src %>/scripts/helpers/*.js',
						'<%= crm.src %>/scripts/models/*.js',
						'<%= crm.src %>/scripts/collections/*.js',
						'<%= crm.src %>/scripts/views/*.js',
						'<%= crm.src %>/scripts/router.js',
						'<%= crm.src %>/scripts/main.js'
					]
				}
			}
		},

		// Watch all the files under the src directory for changes and run the necessary tasks
		watch: {
			default: {
				files: ["<%= crm.src %>/**/*", "Gruntfile.js", "package.json", ".jshintrc"],
				tasks: ["build"]
			}
		},
	});

	grunt.registerTask("build", ["clean", "jshint", "copy", "less", "uglify", "handlebars"]);
	grunt.registerTask("default", ["build", "watch"]);

};
