const verbose = require('./');
const data = require('./__test__/example.json');

describe('verbose', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle an empty object', () => {
    expect(verbose({ json: {}, verbose: true })).toMatchSnapshot();
  });

  it('should return a one level verbose analyze ', () => {
    expect(verbose({ json: data, verbose: true })).toMatchSnapshot();
  });

  it('should return a verbose deep analyze', () => {
    expect(
      verbose({ json: data, maxDepth: 4, verbose: true })
    ).toMatchSnapshot();
  });
});
