const get = require('lodash.get');
const simpleStrategy = require('./simple');

function jsonAnalyzer({ json, target, maxDepth }) {
  const targetNode = target ? get(json, target) : json;

  return simpleStrategy({ json: targetNode });
}

module.exports = jsonAnalyzer;
