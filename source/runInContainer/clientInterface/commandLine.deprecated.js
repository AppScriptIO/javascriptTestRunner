"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cliAdapter = cliAdapter;

var _path = _interopRequireDefault(require("path"));

var _parseKeyValuePairSeparatedBySymbol = require("@dependency/parseKeyValuePairSeparatedBySymbol");

var _script = require("../script.js");

/**
 * Runs the test script inside a container.
 */
// check if executed directly from cli or should be invoked as module.
if (require.main === module) {
  console.log('• Executed directly.');
  cliAdapter();
}

/**
 * USAGE:
 * ./setup/entrypoint.js containerManager entrypointConfigurationKey=test testType=unitTest
 */
function cliAdapter({
  testType,
  configurationPath
} = {}) {
  console.group('• Running entrypoint application in Manager Container:');
  console.log(`- passed process arguments: ${JSON.stringify(process.argv)}`);
  const namedArgs = (0, _parseKeyValuePairSeparatedBySymbol.parseKeyValuePairSeparatedBySymbolFromArray)({
    array: process.argv
  }); // ['x=y'] --> { x: y }

  testType = testType || namedArgs['testType'] || null; // use own script algorithm for finding configuration file, rather than using containerManager's passed configurationPath.

  if (!configurationPath) configurationPath = namedArgs.configuration ? _path.default.join(process.cwd(), namedArgs.configuration) : _path.default.join(process.cwd(), 'configuration'); // For this to work - configuration arg must be kept after usage by containerManager.

  const configuration = require(configurationPath);

  switch (testType) {
    default:
    case 'undefined':
      console.error('• No `testType` passed. Test type should be the passed - e.g. `testType=unitTest`.');
      break;

    case 'unitTest':
      {
        (0, _script.unitTest)({
          configuration,
          container: {
            imageName: namedArgs.imageName || process.env.imageName
          },
          nodeFlag: {
            debug: process.argv.includes('debug'),
            break: process.argv.includes('break')
          },
          testPath: namedArgs['path'],
          applicationPathOnHostMachine: process.env.applicationPathOnHostMachine
        });
      }
      break;
  }
}