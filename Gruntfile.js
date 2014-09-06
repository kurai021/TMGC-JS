'use strict';

var LIVERELOAD_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
      return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {

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
      scripts: {
        files: ['src/js/*.js', 'src/test/specs/*Spec.js'],
        tasks: ['jshint', 'jsdoc', 'mocha']
      },
      concat: {
        files: ['build/tmgc.js'],
        tasks: ['concat']
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
        ]
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'src/js/*.js'],
      force: true,
      jshintrc: true
    },

    jsdoc: {
      dist: {
        src: ['js/*.js'],
        options: {
          destination: 'src/doc/',
          private: true
        }
      }
    },

    mocha: {
      all: {
        src: ['test/testrunner.html'],
      },
      options: {
        reporter: 'Nyan',
        run: true
      }
    },

    concat: {
      dist: {
        src: ['src/js/*.js'],
        dest: 'build/tmgc.js'
      }
    },

    browserify: {
      watchClient: {
        src: ['src/js/*.js'],
        dest: ['build/tmgc.js'],
        options: {
          watch: true,
        }
      }
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
    },

    notify_hooks: {
      options: {
        enabled: true,
        title: 'Grunt for TMGC'
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['jshint','watch']);
  grunt.registerTask('build', ['jshint', 'concat', 'uglify', 'browserify:watchClient','watch:client']);
  grunt.registerTask('dev', ['notify_hooks','watch']);
  grunt.registerTask('test', ['mocha']);
  grunt.registerTask('server', function (target) {
    grunt.task.run([
      'connect:livereload',
      'open',
      'watch'
    ]);
  });
};
