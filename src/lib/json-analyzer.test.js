const jsonAnalyzer = require('./json-analyzer');

describe('jsonAnalyzer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should exist', () => {
    expect(jsonAnalyzer()).toBe(true);
  });
});
