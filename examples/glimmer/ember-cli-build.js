'use strict';

const GlimmerApp = require('@glimmer/application-pipeline').GlimmerApp;
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

module.exports = function(defaults) {
  let app = new GlimmerApp(defaults, {
    rollup: {
      plugins: [
        resolve({ jsnext: true, module: true, main: true }),
        commonjs({
          namedExports: {
            'node_modules/ramda/index.js': Object.keys(require('ramda'))
          }
        })
      ]
    }
  });

  return app.toTree();
};
