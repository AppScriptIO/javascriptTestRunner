import path from 'path'
import assert from 'assert'
import { listFileRecursively, listFileWithExtension } from '../utility/listFileRecursively.js'
const mochaModule = path.join(__dirname, '../../entrypoint/cli/index.js') // mocha cli for running using nodejs spawn child process interface (accepting only module paths)
import { watchFile } from '@dependency/nodejsLiveReload'
import { promises as filesystem } from 'fs'
import childProcess from 'child_process'

export async function runTest({
  targetProject, // `Project class` instance created by `scriptManager` from the configuration file of the target project.
  testPath = [], // relative or absolute
  jsPath = [],
  jsFileExtension = ['.js', '.ts'],
  testFileExtension = ['.test.js'],
  ignoreRegex = [],
  shouldCompileTest,
  shouldDebugger = false, // run ispector during runtime.
} = {}) {
  process.on('SIGINT', () => {
    console.log('Caught interrupt signal - test container level')
    process.exit(0)
  })
  console.log(`\x1b[33m\x1b[1m\x1b[7m\x1b[36m%s\x1b[0m \x1b[2m\x1b[3m%s\x1b[0m`, `Container:`, `NodeJS App`)
  // Setup environment
  await require('@dependency/addModuleResolutionPath').addModuleResolutionPath({ pathArray: [path.dirname(require.main.filename)] })

  assert(targetProject, `targetProject must be passed.`)
  let targetProjectRootPath = targetProject.configuration.rootPath

  // ignore temporary transpilation files to prevent watch event emission loop when inspector debugging and auto attach for debugger.
  if (ignoreRegex.length != 0) {
    ignoreRegex.push(new RegExp(`${path.join(targetProjectRootPath, 'temporary')}`))
    ignoreRegex.push(new RegExp(`${path.join(targetProjectRootPath, 'distribution')}`))
  }

  /* List all files in a directory recursively */
  console.log(`• Searching for ${JSON.stringify(testFileExtension)} extension files, in path ${JSON.stringify(testPath)}.`)
  let testFileArray
  testPath.forEach(p => {
    p = !path.isAbsolute(p) ? path.join(targetProjectRootPath, p) : p // resolve to absolute path
    console.log(`• Test path: ${p}`)
    if (testFileExtension.some(extension => p.endsWith(extension))) {
      // file path
      testFileArray.push(p)
    } else {
      // directory path
      let fileList = listFileWithExtension({ directory: p, extension: testFileExtension })
      Array.prototype.concat.apply(testFileArray, fileList)
    }
  })

  // await filesystem.lstat(filePath).then(statObject => statObject.isDirectory()) // check if path is a directory

  jsPath.push(targetProjectRootPath)
  let jsFileArray = jsPath.map(pathArray => listFileWithExtension({ directory: pathArray, extension: jsFileExtension, ignoreRegex }))
  let jsFileArrayOfArray = Array.prototype.concat.apply(jsFileArray, testFileArray)

  let subprocess // subprocess reference to control termination.
  function runMochaInSubprocess() {
    let stringifyArgs = JSON.stringify([{ testTarget: testFileArray, jsFileArray: jsFileArrayOfArray, shouldCompileTest, shouldDebugger, targetProject }]) // parametrs for mocha module.
    // running in subprocess prevents conflicts between tests and allows to control the test and terminate it when needed.
    subprocess = childProcess.fork(mochaModule, [stringifyArgs], { stdio: [0, 1, 2, 'ipc'] })
    // subprocess.on('exit', () => console.log(`Test subprocess ${subprocess.pid} exited.`));
  }

  await watchFile({
    // to be run after file notification
    triggerCallback: () => {
      subprocess && subprocess.kill('SIGINT')
      runMochaInSubprocess()
    },
    fileArray: Array.prototype.concat.apply([testFileArray], jsFileArrayOfArray), // add node_modules js files
    ignoreNodeModules: true,
    logMessage: false,
  })

  runMochaInSubprocess() // initial trigger action, to run test immediately
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
