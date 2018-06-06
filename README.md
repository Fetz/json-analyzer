# JSON-Analyzer
[![Build Status](https://travis-ci.org/Fetz/json-analyzer.svg?branch=master)](https://travis-ci.org/Fetz/json-analyzer) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Fetz/json-analyzer/blob/master/LICENSE) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![codecov](https://codecov.io/gh/Fetz/json-analyzer/branch/master/graph/badge.svg)](https://codecov.io/gh/Fetz/json-analyzer) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FFetz%2Fjson-analyzer.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FFetz%2Fjson-analyzer?ref=badge_shield) [![Known Vulnerabilities](https://snyk.io/test/github/Fetz/json-analyzer/badge.svg)](https://snyk.io/test/github/Fetz/json-analyzer)

###### [TRY ONLINE](https://fetz.github.io/json-analyzer/#try-online) | [CLI](#using-in-the-command-line) | [BROWSER/NODE](using-in-the-nodebrowser-environment)

> Analyze and measure where you should spend your time optimizing your JSON files or REST APIs.
> Use it either in our [online demo](https://fetz.github.io/json-analyzer/#try-online), [command line](#using-in-the-command-line) or in your [node/browser](#using-in-the-nodebrowser-environment) project.

### Examples of things you may need to use this are:
- Optimizing some REST API payload
- Initial server render redux state
- JSON files
- NO-SQL documents
- JSON like js objects

### Where can you use it:
- Works in the [browser](https://fetz.github.io/json-analyzer/#try-online)
- Works in the command line
- Works in nodejs environment

## Using in the command line

### Installation - CLI

with yarn:

`yarn global add json-analyzer`

with npm:

`npm install --global json-analyzer`

### Usage - CLI

with pipe:

`cat path/to/file.json | json-analyzer.js`

without pipe:

`json-analyzer.js path/to/file.json`

| Option          | Description |
|-----------------|-------------|
| `--verbose`     | Show more details of the JSON (like the biggest size node) |
| `--depth`       | Recursive details of each JSON node (ignored if no verbose option) |
| `--target`      | Where to start the analyze (use [lodash.get](https://lodash.com/docs/lastest#get) syntax) |
| `--version`     | Display the version of json-analyzer |

[for more details](https://fetz.github.io/json-analyzer/#cli-example)

## Using in the Node/Browser Environment

### Installation - Node/Browser

with yarn:

`yarn add json-analyzer`

with npm:

`npm install json-analyzer --save`

### Usage - Node/Browser

with require:
```javascript
const jsonAnalyzer = require("json-analyzer");

const jsonObj = { "hello": "world" };

console.log(
  jsonAnalyzer({ json: jsonObj })
);
```

with import:
```javascript
import jsonAnalyzer from "json-analyzer";

const jsonObj = { "hello": "world" };

console.log(
  jsonAnalyzer({ json: jsonObj })
);
```

| Option          | Description |
|-----------------|-------------|
| `json`          | JSON like object already parsed |
| `verbose`       | Recursive details of each JSON node (ignored if no verbose option) |
| `maxDepth`      | Recursive details of each JSON node (ignored if no verbose option) |
| `target`        | Where to start the analyze (use [lodash.get](https://lodash.com/docs/lastest#get) syntax) |

[for more details](https://fetz.github.io/json-analyzer/#code-example)

## License

This project is licensed under the MIT license, Copyright (c) 2017 Fetz. For more information see [LICENSE](./LICENSE)


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FFetz%2Fjson-analyzer.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FFetz%2Fjson-analyzer?ref=badge_large)
