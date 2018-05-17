const { meta } = require('../../config');
const { getJSONSize } = require('../utils/math');
const { formatBytes } = require('../utils/formatter');
const simple = require('./');

jest.mock('../utils/math');
jest.mock('../utils/formatter');

describe('simple', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delegate the json to getJSONSize to compute it's size", () => {
    getJSONSize.mockReturnValueOnce({});

    const expected = Symbol('json');
    simple({ json: expected });

    expect(getJSONSize).toHaveBeenCalledWith(expected);
  });

  it('should format both the raw and gzip size', () => {
    const raw = Symbol('raw');
    const gzip = Symbol('gzip');
    getJSONSize.mockReturnValueOnce({ raw, gzip });

    simple({});

    expect(formatBytes).toHaveBeenCalledWith(raw);
    expect(formatBytes).toHaveBeenCalledWith(gzip);
  });

  it("should return a meta object with it's size", () => {
    const raw = Symbol('raw');
    const gzip = Symbol('gzip');
    getJSONSize.mockReturnValueOnce({ raw, gzip });

    formatBytes.mockImplementation(value => value);

    expect(simple({})).toEqual({
      [meta.meta]: {
        [meta.size]: {
          [meta.rawSize]: raw,
          [meta.gzipSize]: gzip
        }
      }
    });
  });
});
