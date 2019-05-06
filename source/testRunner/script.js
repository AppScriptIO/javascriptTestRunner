"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runTest = runTest;
exports.subprocessInspector = subprocessInspector;

var _path = _interopRequireDefault(require("path"));

var _assert = _interopRequireDefault(require("assert"));

var _listFileRecursively = require("./utility/listFileRecursively.js");

var _nodejsLiveReload = require("@dependency/nodejsLiveReload");

var _fs = require("fs");

var _child_process = _interopRequireDefault(require("child_process"));

const mochaModule = _path.default.join(__dirname, '../entrypoint/mochaCli/transpilation.entrypoint.js'); // mocha cli for running using nodejs spawn child process interface (accepting only module paths)


async function runTest({
  targetProject,
  // `Project class` instance created by `scriptManager` from the configuration file of the target project.
  testPath,
  // relative or absolute
  jsFileExtension = ['.js', '.ts'],
  testFileExtension = ['.test.js']
} = {}) {
  console.log(`\x1b[33m\x1b[1m\x1b[7m\x1b[36m%s\x1b[0m \x1b[2m\x1b[3m%s\x1b[0m`, `Container:`, `NodeJS App`); // Setup environment

  await require('@dependency/addModuleResolutionPath').addModuleResolutionPath({
    pathArray: [_path.default.dirname(require.main.filename)]
  });
  process.on('SIGINT', () => {
    console.log('Caught interrupt signal - test container level');
    process.exit(0);
  });
  (0, _assert.default)(targetProject, `targetProject must be passed.`);
  let targetProjectRootPath = targetProject.configuration.rootPath;

  if (!_path.default.isAbsolute(testPath)) {
    testPath = _path.default.join(targetProjectRootPath, testPath);
  }

  let jsPathArray = [targetProjectRootPath];
  if (await _fs.promises.lstat(testPath).then(statObject => statObject.isDirectory())) jsPathArray.push(testPath);
  /* List all files in a directory recursively */

  console.log(`• Searching for ${JSON.stringify(testFileExtension)} extension files, in path ${testPath}.`);
  let testFileArray;

  if (testFileExtension.some(extension => testPath.endsWith(extension))) {
    // file path
    console.log(testPath);
    testFileArray = [testPath];
  } else {
    // directory path
    testFileArray = (0, _listFileRecursively.listFileWithExtension)({
      directory: testPath,
      extension: testFileExtension
    });
  }

  let jsFileArrayOfArray = jsPathArray.map(jsPath => {
    return (0, _listFileRecursively.listFileWithExtension)({
      directory: jsPath,
      extension: jsFileExtension
    });
  }); //TODO: Must add excluding directory option. e.g. './distribution'.
  // add node_modules js files

  let watchFileArray = Array.prototype.concat.apply([], jsFileArrayOfArray);
  let stringifyArgs = JSON.stringify([{
    testTarget: testFileArray,
    jsFileArray: jsFileArrayOfArray
  }]); // parametrs for mocha module.

  let subprocess; // subprocess reference to control termination.

  function runMochaInSubprocess() {
    // running in subprocess prevents conflicts between tests and allows to control the test and terminate it when needed.
    subprocess = _child_process.default.fork(mochaModule, [stringifyArgs], {
      stdio: [0, 1, 2, 'ipc']
    }); // subprocess.on('exit', () => console.log(`Test subprocess ${subprocess.pid} exited.`));
  }

  let triggerCallback = () => {
    // to be run after file notification
    subprocess && subprocess.kill('SIGINT');
    runMochaInSubprocess();
  };

  await (0, _nodejsLiveReload.watchFile)({
    triggerCallback,
    fileArray: Array.prototype.concat.apply([], [watchFileArray, testFileArray]),
    ignoreNodeModules: true,
    logMessage: false
  });
  runMochaInSubprocess(); // initial trigger action, to run test immediately
}
/**
 * Allows to use Nodejs inspector with the current way tests are run, where tests are run in subprocesses and no Nodejs flags are passed.
 * Currently its possible to use inspector programmatic API, but to allow livereload each test subprocess should be kept alive e.g. using `setTimeout` to allow for inspecting object values etc.
 * Usage:
 *  - execute this function in the top of a test.
 *  - insert `debugger` statement in the test files to break after refreshing process.
 *
 */


function subprocessInspector({
  port = 9229,
  host = 'localhost',
  shouldbreak = true
} = {}) {
  const inspector = require('inspector');

  inspector.open(port, host, shouldbreak); // Keep Node alive to allow for inspecting objects.

  process.on('beforeExit', () => {
    setTimeout(() => {}, 1000000000);
  });
  return inspector;
}