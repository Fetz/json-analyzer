const get = require('lodash.get');
const simpleStrategy = require('./simple');
const verboseStrategy = require('./verbose');
const jsonAnalyzer = require('./json-analyzer');

jest.mock('lodash.get');
jest.mock('./simple');
jest.mock('./verbose');

describe('jsonAnalyzer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('verboseStrategy', () => {
    it('should delegate to verboseStrategy', () => {
      jsonAnalyzer({ verbose: true });
      expect(verboseStrategy).toHaveBeenCalled();
    });

    it('should use default json if no target provided', () => {
      const expected = Symbol('json');
      jsonAnalyzer({ verbose: true, json: expected });
      expect(verboseStrategy).toHaveBeenCalledWith(
        expect.objectContaining({ json: expected })
      );
    });

    it('should use get if target is provided', () => {
      const expected = Symbol('targetNode');
      get.mockReturnValueOnce(expected);

      const target = Symbol('target');
      const json = Symbol('json');
      jsonAnalyzer({ verbose: true, json, target });

      expect(get).toHaveBeenCalledWith(json, target);
      expect(verboseStrategy).toHaveBeenCalledWith(
        expect.objectContaining({ json: expected })
      );
    });

    it('should provide maxDepth to verboseStrategy', () => {
      const expected = Symbol('maxDepth');

      jsonAnalyzer({ verbose: true, maxDepth: expected });
      expect(verboseStrategy).toHaveBeenCalledWith(
        expect.objectContaining({ maxDepth: expected })
      );
    });
  });

  describe('simpleStrategy', () => {
    it('should delegate to simpleStrategy', () => {
      jsonAnalyzer({ verbose: false });
      expect(simpleStrategy).toHaveBeenCalled();
    });

    it('should delegate to simpleStrategy even if verbose is not provided', () => {
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
