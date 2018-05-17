const compress = require('pako');
const length = require('utf8-length');

function getJSONSize(jsonObject) {
  const jsonString = JSON.stringify(jsonObject);
  return getStringSize(jsonString);
}

function getStringSize(string) {
  return {
    raw: length(string),
    gzip: length(compress.gzip(string, { to: 'string' }))
  };
}

function calcPerc(size, totalSize) {
  return size / totalSize * 100;
}

module.exports = {
  getJSONSize,
  getStringSize,
  calcPerc
};
