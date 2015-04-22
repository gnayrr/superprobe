module.exports = function (grunt) {

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      jshint: {
         options: {
            curly: true,
            eqeqeq: true,
            reporter: require('jshint-stylish')
         },
         files: {
            src: ['*.js', 'src/**/*.js']
         },
         tests: {
            options: { expr: true },
            src: ['test/**/*.js']
         }
      },

      mochaTest: {
         options: {
            timeout: 30000,
            require: ['should']
         },
         test: {
            src: ['test/**/*.js']
         }
      }
   });


   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-mocha-test');

   grunt.registerTask('test', ['jshint', 'mochaTest:test']);
};