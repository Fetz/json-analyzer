#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');
const prettyjson = require('prettyjson');
const analyze = require('../lib/json-analyzer');
const { version } = require('../../package');

const readPipe = () =>
  new Promise(resolve => {
    let stdin = '';
    process.stdin.on('readable', function() {
      const chunk = this.read();
      if (chunk !== null) {
        stdin += chunk;
      }
    });

    process.stdin.on('end', () => {
      resolve(stdin);
    });
  });

const getArgsWithDefault = argv => [
  ...argv.slice(0, 2),
  'ignoreFile',
  ...argv.slice(2)
];

const executeAction = (json, cmd) => {
  const parsed = JSON.parse(json);
  const result = analyze({
    json: parsed,
    target: cmd.target,
    maxDepth: cmd.depth,
    verbose: cmd.verbose
  });

  console.log(prettyjson.render(result));
};

program
  .version(version)
  .description('json analyzer')
  .usage('[file] [options]')
  .option('--verbose', 'verbose')
  .option('--depth <n>', 'depth', parseInt)
  .option('--target <value>', 'propA.propB[x]');

if (process.stdin.isTTY) {
  program
    .action((file, cmd) => {
      executeAction(fs.readFileSync(file), cmd);
    })
    .parse(process.argv);
} else {
  readPipe().then(jsonString => {
    program
      .action((ignoreFile, cmd) => {
        executeAction(jsonString, cmd);
      })
      .parse(getArgsWithDefault(process.argv));
  });
}
