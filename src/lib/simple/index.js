const { meta } = require('../../config');
const { getJSONSize } = require('../utils/math');
const { formatBytes } = require('../utils/formatter');

function simple({ json }) {
  const { raw, gzip } = getJSONSize(json);

  return {
    [meta.meta]: {
      [meta.size]: {
        [meta.rawSize]: formatBytes(raw),
        [meta.gzipSize]: formatBytes(gzip)
      }
    }
  };
}

module.exports = simple;
