/* eslint-disable standard/no-callback-literal */

describe('json-analyzer', () => {
  const argv = process.argv;
  const isTTY = process.stdin.isTTY;
  const parse = JSON.parse;
  const log = console.log;
  let fs;
  let prettyjson;
  let analyze;
  let program;

  beforeEach(() => {
    jest.mock('fs');
    jest.mock('commander');
    jest.mock('prettyjson');
    jest.mock('../lib/json-analyzer');

    fs = require('fs');
    prettyjson = require('prettyjson');
    analyze = require('../lib/json-analyzer');
    program = require('commander');

    console.log = jest.fn();

    program.version.mockReturnValue(program);
    program.description.mockReturnValue(program);
    program.usage.mockReturnValue(program);
    program.option.mockReturnValue(program);
  });

  afterEach(() => {
    process.argv = argv;
    process.stdin.isTTY = isTTY;
    JSON.parse = parse;
    console.log = log;
    jest.resetModules();
  });

  describe('not using pipe', () => {
    beforeEach(() => {
      process.stdin.isTTY = true;
    });

    it('should call action', () => {
      program.action.mockReturnValueOnce(program);

      require('./json-analyzer');
      expect(program.action).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should call parse', () => {
      program.action.mockReturnValueOnce(program);
      require('./json-analyzer');

      expect(program.action).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should load the file', () => {
      const expectedPath = Symbol('path');

      program.action.mockImplementationOnce(callback => {
        callback(expectedPath, {});
        return program;
      });

      fs.readFileSync.mockReturnValueOnce('{}');

      require('./json-analyzer');

      expect(fs.readFileSync).toHaveBeenCalledWith(expectedPath);
    });

    it('should parse the file', () => {
      JSON.parse = jest
        .fn()
        .mockImplementation(
          input => (typeof input === 'string' ? parse(input) : input)
        );

      const fileContentsToParse = Symbol('jsonFileContents');
      fs.readFileSync.mockReturnValueOnce(fileContentsToParse);

      program.action.mockImplementationOnce(callback => {
        callback('', {});
        return program;
      });

      require('./json-analyzer');

      expect(JSON.parse).toHaveBeenCalledWith(fileContentsToParse);
    });

    it("should delegate parsed file to analyze and it's options", () => {
      JSON.parse = jest
        .fn()
        .mockImplementation(
          input => (typeof input === 'string' ? parse(input) : input)
        );

      const fileContentsToParse = Symbol('jsonFileContents');
      fs.readFileSync.mockReturnValueOnce(fileContentsToParse);

      const target = Symbol('target');
      const depth = Symbol('depth');
      program.action.mockImplementationOnce(callback => {
        callback('', {
          target,
          depth
        });
        return program;
      });

      require('./json-analyzer');

      expect(analyze).toHaveBeenCalledWith({
        json: fileContentsToParse,
        target,
        maxDepth: depth
      });
    });

    it('should pretty the result and log it', () => {
      program.action.mockImplementationOnce(callback => {
        callback('', {});
        return program;
      });

      fs.readFileSync.mockReturnValueOnce('{}');

      const analyzedResult = Symbol('analyzedResult');
      analyze.mockReturnValueOnce(analyzedResult);

      const prettyResult = Symbol('prettyResult');
      prettyjson.render.mockReturnValueOnce(prettyResult);

      require('./json-analyzer');

      expect(prettyjson.render).toHaveBeenCalledWith(analyzedResult);
      expect(console.log).toHaveBeenCalledWith(prettyResult);
    });
  });

  describe('using pipe', () => {
    const onMock = process.stdin.on;
    let eventListerners;
    let stdin;

    beforeEach(() => {
      eventListerners = {
        readable: [],
        end: []
      };

      process.stdin.isTTY = undefined;

      process.stdin.on = (event, callback) => {
        eventListerners[event].push(callback);
      };

      stdin = {};

      stdin.send = message => {
        stdin.read = () => message;
        eventListerners['readable'].forEach(callback => callback.call(stdin));
      };

      stdin.end = message =>
        eventListerners['end'].forEach(callback => callback());
    });

    afterEach(() => {
      process.stdin.on = onMock;
    });

    describe('if no pipe stream', () => {
      it('should not call action', () => {
        require('./json-analyzer');
        expect(program.action).not.toHaveBeenCalled();
      });

      it('should not call parse', () => {
        require('./json-analyzer');
        expect(program.parse).not.toHaveBeenCalled();
      });
    });

    describe('if pipe stream', () => {
      it('should call action', async () => {
        program.action.mockReturnValueOnce(program);

        require('./json-analyzer');

        stdin.send(null);
        stdin.send('{');
        stdin.send('"hello":"json"');
        stdin.send('}');
        stdin.send(null);

        stdin.end();

        await Promise.resolve();
        expect(program.action).toHaveBeenCalledWith(expect.any(Function));
      });

      it('should call parse with an extra parameter to force commander to call action when file is passed by pipe', async () => {
        program.action.mockReturnValueOnce(program);
        require('./json-analyzer');

        stdin.send('{}');
        stdin.end();

        await Promise.resolve();
        expect(program.parse).toHaveBeenCalledWith(
          expect.arrayContaining(process.argv)
        );
        expect(program.parse).toHaveBeenCalledWith(
          expect.arrayContaining(['ignoreFile'])
        );
      });

      it('should ignore the dummyActionFile and use contents from the pipe', async () => {
        JSON.parse = jest.fn(parse);

        const ignoreFile = '{"ignore": true}';
        program.action.mockImplementationOnce(callback => {
          callback(ignoreFile, {});
          return program;
        });

        require('./json-analyzer');

        const jsonString = '{"ignore": false}';
        stdin.send(jsonString);
        stdin.end();

        await Promise.resolve();

        expect(JSON.parse).toHaveBeenCalledWith(jsonString);
        expect(JSON.parse).not.toHaveBeenCalledWith(ignoreFile);
      });

      it('should delegate options to analyze', async () => {
        const target = Symbol('target');
        const depth = Symbol('depth');

        program.action.mockImplementationOnce(callback => {
          callback('', {
            target,
            depth
          });
          return program;
        });

        require('./json-analyzer');

        const jsonString = '{}';
        stdin.send(jsonString);
        stdin.end();

        await Promise.resolve();

        expect(analyze).toHaveBeenCalledWith(
          expect.objectContaining({
            target,
            maxDepth: depth
          })
        );
      });
    });
  });
});
