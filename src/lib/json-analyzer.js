const get = require('lodash.get');
const simpleStrategy = require('./simple');
const verboseStrategy = require('./verbose');

function jsonAnalyzer(json, { target, maxDepth, verbose = false } = {}) {
  const targetNode = target ? get(json, target) : json;

  if (verbose) {
    return verboseStrategy({ json: targetNode, maxDepth });
  }

  return simpleStrategy({ json: targetNode });
}

module.exports = jsonAnalyzer;
