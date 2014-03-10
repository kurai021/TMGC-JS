'use strict';

var LIVERELOAD_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
      return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/js/main.js',
        dest: 'build/js/main.min.js'
      }
    },

    watch: {
      options: {
        nospawn: true
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          'src/*.html',
          'src/css/*.css',
          'src/js/*.js',
	  'src/img/*.{png,gif}'
        ],
      },
    },

    connect: {
      options: {
        hostname: 'localhost',
        port: 8000,
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'src'),
              lrSnippet
            ];
          }
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['uglify','watch']);
  grunt.registerTask('server', function (target) {
    grunt.task.run([
      'connect:livereload',
      'open',
      'watch'
    ]);
  });
};
