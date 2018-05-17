const prettyBytes = require('pretty-bytes');
const compose = require('lodash.flowright');

const toPrecision = precision => value => value.toPrecision(precision);
const percentageToString = percentage => `${percentage}%`;

const formatPercentage = compose([percentageToString, toPrecision(5)]);

module.exports = {
  formatPercentage,
  formatBytes: prettyBytes
};
