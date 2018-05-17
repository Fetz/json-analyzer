const { meta } = require('../../config');
const { getJSONSize, calcPerc } = require('../utils/math');
const { formatPercentage, formatBytes } = require('../utils/formatter');
const loop = require('./loop');

function verbose({ json, depth = 0, totalSize, maxDepth = 1 }) {
  const size = getJSONSize(json);
  const data = {
    [meta.meta]: {
      [meta.size]: {
        [meta.value]: size.raw,
        [meta.rawSize]: formatBytes(size.raw),
        [meta.gzipSize]: formatBytes(size.gzip)
      },
      [meta.numberChilds]: Object.keys(json).length
    }
  };

  if (maxDepth < depth) {
    return data;
  }

  const nodes = Object.entries(json);
  totalSize = totalSize || size;

  const { result, biggestKey } = loop(verbose, {
    data,
    json: nodes,
    depth,
    totalSize,
    maxDepth
  });

  result[meta.meta][meta.percentage] = formatPercentage(
    calcPerc(size.raw, totalSize.raw)
  );

  if (biggestKey.key !== '') {
    result[meta.meta][meta.biggestChild] = biggestKey.key;
  }

  return result;
}

module.exports = verbose;
