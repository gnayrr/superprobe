module.exports = function (grunt) {

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      jshint: {
         options: {
            curly: true,
            eqeqeq: true,
            reporter: require('jshint-stylish')
         },
         src: ['*.js', 'src/**/*.js', 'test/**/*.js']
      },

      mochaTest: {
         options: {
            timeout: 30000
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