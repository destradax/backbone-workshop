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

		connect: {
			default: {
				options: {
					hostname: 'localhost',
					base: "<%= crm.dist %>"
				}
			}
		},

		copy: {
			index: {src: "<%= crm.src %>/index.html", dest: "<%= crm.dist %>/index.html"},
			vendor_js: {src: "<%= crm.src %>/js/vendor/*", dest: "<%= crm.dist %>/", expand: true, flatten: true}
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
			default: ['Gruntfile.js', '.jshintrc', '<%= crm.src %>/js/**/*.js', '!<%= crm.src %>/js/vendor/**']
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
						'<%= crm.src %>/js/main.js',
						'<%= crm.src %>/js/lib/*.js',
						'<%= crm.src %>/js/helpers/*.js',
						'<%= crm.src %>/js/models/*.js',
						'<%= crm.src %>/js/collections/*.js',
						'<%= crm.src %>/js/views/*.js',
						'<%= crm.src %>/js/router.js'
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
	grunt.registerTask("default", ["build", "connect", "watch"]);

};
