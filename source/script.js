import path from 'path'
import assert from 'assert'
import childProcess from 'child_process'
import { promises as filesystem } from 'fs'
import { watchFile as watchFileFunction, ManageSubprocess } from '@deployment/nodejsLiveReload'
// await filesystem.lstat(filePath).then(statObject => statObject.isDirectory()) // check if path is a directory

export async function runTest({
  targetProject = throw new Error('targetProject must be passed.'), // `Project class` instance created by `scriptManager` from the configuration file of the target project.
  shouldCompileTest,
  shouldDebugger = false, // run ispector during runtime.
  testFileArray,
  jsFileArray, // used to clear nodejs module cache on restart
  watchFile = false,
  mochaOption
} = {}) {
  // spinning in fork process prevents conflicts between tests and allows terminating the process.
  let manageSubprocess = new ManageSubprocess({
    cliAdapterPath: path.join(__dirname, '../entrypoint/cli/index.js') /*mocha cli for running using nodejs spawn child process interface (accepting only module paths)*/,
  })
  manageSubprocess.runInSubprocess({ testTarget: testFileArray, jsFileArray, shouldCompileTest, shouldDebugger, targetProject, mochaOption }) // initial trigger action, to run test immediately

  if (watchFile)
    await watchFileFunction({
      // to be run after file notification
      triggerCallback: () => manageSubprocess.runInSubprocess(),
      // TODO: make sure explicitly adding `./node_modules/` into the this array, will prevent it from being ignored.
      fileArray: jsFileArray,
      ignoreNodeModules: true,
      logMessage: true,
    })

  // return for external watch files to control restart
  return { restart: () => manageSubprocess.runInSubprocess() }
}

/**
 * Allows to use Nodejs inspector with the current way tests are run, where tests are run in subprocesses and no Nodejs flags are passed.
 * Currently its possible to use inspector programmatic API, but to allow livereload each test subprocess should be kept alive e.g. using `setTimeout` to allow for inspecting object values etc.
 * Usage:
 *  - execute this function in the top of a test.
 *  - insert `debugger` statement in the test files to break after refreshing process.
 *
 */
export function subprocessInspector({ port = 9229, host = 'localhost', shouldbreak = true } = {}) {
  const inspector = require('inspector')
  inspector.open(port, host, shouldbreak)
  // Keep Node alive to allow for inspecting objects.
  process.on('beforeExit', () => {
    setTimeout(() => {}, 1000000000)
  })
  return inspector
}
