module.exports = (grunt) ->
  'use strict'

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json'),

    env:
      dev:
        NODE_ENV: 'development'
      test:
        NODE_ENV: 'test'

    coffee:
      options:
        bare: true

      glob_to_multiple:
        expand: true
        flatten: true
        cwd: './'
        src: ['*.coffee']
        dest: 'dist/'
        ext: '.js'

    nodemon:
      dev:
        script: 'server.js'
        options:
          ext: 'js,html'
          watch: ['server.js', 'config/**/*.js', 'app/**/*.js']

    jshint:
      src: ['server.js, config/**/*.js', 'app/**/*.js']

  grunt.loadNpmTasks 'grunt-env'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-nodemon'

  grunt.task.registerTask 'default', ['env:dev', 'jshint', 'nodemon']
