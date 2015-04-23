module.exports = function (grunt) {

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      jshint: {
         options: {
            bitwise: true,
            curly: true,
            boss: true,
            eqeqeq: true,
            eqnull: true,
            freeze: true,
            expr: true,
            immed: true,
            noarg: true,
            onevar: true,
            noempty: false,
            nonbsp: true,
            smarttabs: true,
            trailing: true,
            camelcase: false,
            undef: false,
            unused: false,
            strict: false,
            browser: false,
            jquery: false,
            node: true,
            quotmark: 'single',
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