const isObject = require('lodash.isobject');
const { meta } = require('../../config');
const primitiveValue = require('./primitive-value');

const loop = (analyze, { data, json, depth, totalSize, maxDepth }) => {
  let biggestKey = { key: '', size: 0 };

  const result = json.reduce((obj, [key, value]) => {
    if (isObject(value)) {
      obj[key] = analyze({
        json: value,
        depth: depth + 1,
        totalSize,
        maxDepth
      });
    } else {
      obj[key] = primitiveValue(value);
    }

    if (obj[key][meta.meta][meta.size][meta.value] > biggestKey.size) {
      biggestKey = { key, size: obj[key][meta.meta][meta.size][meta.value] };
    }

    return obj;
  }, data);

  return {
    result,
    biggestKey
  };
};

module.exports = loop;
