module.exports = function(grunt) {
	grunt.initConfig({
		watch: {
			files: ['AMS/Scripts/**'],
			tasks: ['jshint']
		},
		jshint: {
			// define the files to lint
			files: ['gruntfile.js', 'servo/**', 'leds/**'],
			// configure JSHint (documented at http://www.jshint.com/docs/)
			options: {
				// more options here if you want to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true
				},
				ignores: ['servo/leap/*.json']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('default', ['jshint']);
};