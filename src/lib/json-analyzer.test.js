const get = require('lodash.get');
const simpleStrategy = require('./simple');
const jsonAnalyzer = require('./json-analyzer');

jest.mock('lodash.get');
jest.mock('./simple');

describe('jsonAnalyzer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('simpleStrategy', () => {
    it('should delegate to simpleStrategy', () => {
      jsonAnalyzer({});
      expect(simpleStrategy).toHaveBeenCalled();
    });

    it('should use default json if no target provided', () => {
      const expected = Symbol('json');
      jsonAnalyzer({ json: expected });
      expect(simpleStrategy).toHaveBeenCalledWith({ json: expected });
    });

    it('should use get if target is provided', () => {
      const expected = Symbol('targetNode');
      get.mockReturnValueOnce(expected);

      const target = Symbol('target');
      const json = Symbol('json');
      jsonAnalyzer({ json, target });

      expect(get).toHaveBeenCalledWith(json, target);
      expect(simpleStrategy).toHaveBeenCalledWith({ json: expected });
    });

    it("shouldn't provide maxDepth to simpleStrategy", () => {
      const expected = Symbol('maxDepth');

      jsonAnalyzer({ maxDepth: expected });
      expect(simpleStrategy).not.toHaveBeenCalledWith(
        expect.objectContaining({ maxDepth: expected })
      );
    });
  });
});
