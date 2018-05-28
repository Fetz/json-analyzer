var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var commonjs = require('rollup-plugin-commonjs');
var nodeResolve = require('rollup-plugin-node-resolve');

rollup
  .rollup({
    input: 'src/lib/json-analyzer.js',
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      nodeResolve({
        jsnext: true,
        main: true
      }),
      commonjs({})
    ]
  })
  .then(function(bundle) {
    bundle.write({
      file: 'src/www/dist/json-analyzer.umd.js',
      name: 'json-analyzer',
      format: 'umd'
    });
  });
