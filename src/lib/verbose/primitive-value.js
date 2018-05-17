const { meta } = require('../../config');
const { getStringSize } = require('../utils/math');
const { formatBytes } = require('../utils/formatter');

const primitiveValue = value => {
  const stringSize = getStringSize(String(value));

  return {
    [meta.meta]: {
      [meta.size]: {
        [meta.value]: stringSize.raw,
        [meta.rawSize]: formatBytes(stringSize.raw),
        [meta.gzipSize]: formatBytes(stringSize.gzip)
      }
    },
    value
  };
};

module.exports = primitiveValue;
