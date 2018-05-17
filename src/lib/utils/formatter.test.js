const prettyBytes = require('pretty-bytes');
const { formatPercentage, formatBytes } = require('./formatter');

jest.mock('pretty-bytes');

describe('formatter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('formatPercentage', () => {
    it('should format percentage with correct precision', () => {
      const perc = 10.123456;
      expect(parseFloat(formatPercentage(perc))).toBe(
        Number(perc.toPrecision(5))
      );
    });

    it('should add % to the end of the value', () => {
      expect(formatPercentage(10.123456)).toBe('10.123%');
    });
  });

  describe('formatBytes', () => {
    it('should delegate formating to pretty-bytes', () => {
      const expected = Symbol('expected');
      formatBytes(expected);

      expect(prettyBytes).toHaveBeenCalledWith(expected);
    });
  });
});
