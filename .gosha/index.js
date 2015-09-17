'use strict';

var gosha = require('./gosha');

module.exports = function(grunt, config) {
  if (config.copy) {
    config.copy.gosha = gosha.copy.gosha;
  } else {
    config.copy = gosha.copy;
  }

  if (config.clean) {
    config.clean.gosha = gosha.clean.gosha;
  } else {
    config.clean = gosha.clean;
  }

  if (config.lintspaces) {
    config.lintspaces.codestyle = gosha.lintspaces.codestyle;
  } else {
    config.lintspaces = gosha.lintspaces;
  }

  var tasks = ['copy:gosha', 'clean:gosha'];

  if (config.postcss) {
    tasks.unshift('postcss');
  }

  if (config.less) {
    tasks.unshift('less');
  }

  if (config.sass) {
    tasks.unshift('sass');
  }

  grunt.registerTask('gosha', tasks);

  return config;
};
