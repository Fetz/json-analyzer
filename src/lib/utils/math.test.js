const compress = require('pako');
const length = require('utf8-length');
const { getJSONSize, getStringSize, calcPerc } = require('./math');

jest.mock('pako');
jest.mock('utf8-length');

describe('math', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('calcPerc', () => {
    it('should calc correctly the percentage', () => {
      expect(calcPerc(1, 1)).toBe(100);
    });

    it('should calc correctly the percentage', () => {
      expect(calcPerc(0.4, 1)).toBe(40);
    });
  });

  describe('getJSONSize', () => {
    it('should return value from length', () => {
      length.mockImplementation(value => value);

      const expectedGzip = Symbol('lengthReturnedValue');
      compress.gzip.mockReturnValueOnce(expectedGzip);

      expect(getJSONSize({})).toEqual({ raw: '{}', gzip: expectedGzip });
    });

    it('should call length with a string', () => {
      const expected = { meaningOfLife: 42 };
      getJSONSize(expected);
      expect(length).toHaveBeenCalledWith(JSON.stringify(expected));
    });
  });

  describe('getStringSize', () => {
    it('should return value from length', () => {
      length.mockImplementation(value => value);

      const expectedGzip = Symbol('lengthReturnedValue');
      compress.gzip.mockReturnValueOnce(expectedGzip);

      const expectedRaw = Symbol('lengthReturnedValue');
      expect(getStringSize(expectedRaw)).toEqual({
        raw: expectedRaw,
        gzip: expectedGzip
      });
    });

    it('should call length with a string', () => {
      const expected = '{ meaningOfLife: 42}';
      getStringSize(expected);
      expect(length).toHaveBeenCalledWith(expected);
      expect(compress.gzip).toHaveBeenCalledWith(expected, expect.any(Object));
    });
  });
});
