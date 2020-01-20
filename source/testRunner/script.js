import path from 'path'
import assert from 'assert'
const mochaModule = path.join(__dirname, '../../entrypoint/cli/index.js') // mocha cli for running using nodejs spawn child process interface (accepting only module paths)
import childProcess from 'child_process'
import { promises as filesystem } from 'fs'
// await filesystem.lstat(filePath).then(statObject => statObject.isDirectory()) // check if path is a directory

export async function runTest({
  targetProject = throw new Error('targetProject must be passed.'), // `Project class` instance created by `scriptManager` from the configuration file of the target project.
  shouldCompileTest,
  shouldDebugger = false, // run ispector during runtime.
  testFileArray,
  jsFileArray, // used to clear nodejs module cache on restart
  watchFile = false,
} = {}) {
  console.log(`\x1b[33m\x1b[1m\x1b[7m\x1b[36m%s\x1b[0m \x1b[2m\x1b[3m%s\x1b[0m`, `Container:`, `NodeJS App`)
  // Setup environment
  await require('@dependency/addModuleResolutionPath').addModuleResolutionPath({ pathArray: [path.dirname(require.main.filename)] })

  let subprocess // subprocess reference to control termination.
  // make sure that parent process quiting will also end subprocess
  process.on('SIGINT', () => {
    subprocess && subprocess.kill('SIGINT')
    console.log('Caught interrupt signal') && process.exit(0)
  })
  function runMochaInSubprocess() {
    let stringifyArgs = JSON.stringify([{ testTarget: testFileArray, jsFileArray, shouldCompileTest, shouldDebugger, targetProject }]) // parametrs for mocha module.
    // running in subprocess prevents conflicts between tests and allows to control the test and terminate it when needed.
    subprocess = childProcess.fork(mochaModule, [stringifyArgs], {
      stdio: [0, 1, 2, 'ipc'],
      execArgv: [
        // '--inspect-brk=1272', // inspect subprocess with random port to prevent conflicts with the main process in case it's inspect flag was turned on.
        '--no-lazy', // for debugging purposes will load modules sequentially
      ],
    })
    subprocess.on('exit', () => console.log(`Test subprocess ${subprocess.pid} exited.`))
  }

  runMochaInSubprocess() // initial trigger action, to run test immediately

  // restart functionality - to be run after file notification
  function restartMochaSubprocess() {
    console.log('• Triggered mocha test restart [javascriptTestRunner]')
    subprocess && subprocess.kill('SIGINT') && runMochaInSubprocess()
  }

  if (watchFile)
    await watchFile({
      // to be run after file notification
      triggerCallback: restartMochaSubprocess,
      // TODO: make sure explicitly adding `./node_modules/` into the this array, will prevent it from being ignored.
      fileArray: jsFileArray,
      ignoreNodeModules: true,
      logMessage: true,
    })

  // return for external watch files to control restart
  return { restart: restartMochaSubprocess }
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
