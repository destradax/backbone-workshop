module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		crm: {
			src: "app",
			dist: "dist"
		},

		clean: {
			default: [
				"<%= crm.dist %>"
			]
		},

		copy: {
			default: {
				files: [
					{src: "<%= crm.src %>/index.html", dest: "<%= crm.dist %>/index.html"}
				]
			}
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
				banner: "/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */\n"
			},
			default: {
				src: "<%= crm.src %>/scripts/**/*.js",
				dest: "<%= crm.dist %>/main.js"
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	// Default task(s).
	grunt.registerTask("default", ["clean", "copy", "less", "uglify"]);

};
