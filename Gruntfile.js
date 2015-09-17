'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var config = {
    pkg: grunt.file.readJSON('package.json')
  };

  config = require('./.gosha')(grunt, config);

  grunt.initConfig(config);
};
