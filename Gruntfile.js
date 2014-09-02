'use strict';

var LIVERELOAD_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
      return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {

  // load all grunt tasks, but grunt-template-jasmine-istanbul
  require('matchdep').filterDev('grunt-contrib-*').forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-browserify');

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
        tasks: ['jshint', 'jsdoc', 'jasmine:coverage', 'jasmine:pivotal:build']
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

    jasmine: {
      pivotal: {
        src: 'src/js/*.js',
        options: {
          specs: 'test/specs/*Spec.js',
          helpers: 'test/helpers/*Helper.js',
          outfile: 'test/SpecRunner.html',
          keepRunner: true,
          display: 'short'
        }
      },
      coverage: {
        src: 'src/js/*.js',
        files: ['src/**/*.js','!src/test/**/*.js'],
        options: {
          specs: 'test/specs/*Spec.js',
          display: 'full',
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'src/bin/coverage/coverage.json',
            report: [
              {
                type: 'html',
                options: {
                  dir: 'src/bin/coverage/html'
                }
              },
              {
                type: 'cobertura',
                options: {
                  dir: 'src/bin/coverage/cobertura'
                }
              },
              {
                type: 'text-summary'
              }
            ]
          }
        }
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
  grunt.registerTask('test', ['jshint', 'jasmine']);
  grunt.registerTask('test:coverage', ['jshint', 'jasmine:coverage']);
  grunt.registerTask('server', function (target) {
    grunt.task.run([
      'connect:livereload',
      'open',
      'watch'
    ]);
  });
};
