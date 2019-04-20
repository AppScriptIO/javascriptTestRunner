import path from 'path'
import assert from 'assert'
import { listFileRecursively, listFileWithExtension } from './utility/listFileRecursively.js'
const mochaModule = path.join(__dirname, '../entrypoint/mochaCli/transpilation.entrypoint.js') // mocha cli for running using nodejs spawn child process interface (accepting only module paths)
import { watchFile } from '@dependency/nodejsLiveReload'
import { promises as filesystem } from 'fs'
import childProcess from 'child_process'

export async function runTest({
  targetProject, // `Project class` instance created by `scriptManager` from the configuration file of the target project.
  testPath, // relative or absolute
  jsFileExtension = ['.js', '.ts'],
  testFileExtension = ['.test.js'],
} = {}) {
  console.log(`\x1b[33m\x1b[1m\x1b[7m\x1b[36m%s\x1b[0m \x1b[2m\x1b[3m%s\x1b[0m`, `Container:`, `NodeJS App`)

  // Setup environment
  await require('@dependency/addModuleResolutionPath').addModuleResolutionPath({ pathArray: [path.dirname(require.main.filename)] })

  process.on('SIGINT', () => {
    console.log('Caught interrupt signal - test container level')
    process.exit(0)
  })

  assert(targetProject, `targetProject must be passed.`)
  let targetProjectRootPath = targetProject.configuration.rootPath

  if (!path.isAbsolute(testPath)) {
    testPath = path.join(targetProjectRootPath, testPath)
  }
  let jsPathArray = [targetProjectRootPath]
  if (await filesystem.lstat(testPath).then(statObject => statObject.isDirectory())) jsPathArray.push(testPath)

  /* List all files in a directory recursively */
  console.log(`• Searching for ${JSON.stringify(testFileExtension)} extension files, in path ${testPath}.`)
  let testFileArray
  if (testFileExtension.some(extension => testPath.endsWith(extension))) {
    // file path
    console.log(testPath)
    testFileArray = [testPath]
  } else {
    // directory path
    testFileArray = listFileWithExtension({ directory: testPath, extension: testFileExtension })
  }

  let jsFileArrayOfArray = jsPathArray.map(jsPath => {
    return listFileWithExtension({ directory: jsPath, extension: jsFileExtension })
  })
  // add node_modules js files
  let watchFileArray = Array.prototype.concat.apply([], jsFileArrayOfArray)

  let stringifyArgs = JSON.stringify([{ testTarget: testFileArray, jsFileArray: jsFileArrayOfArray }]) // parametrs for mocha module.
  let subprocess // subprocess reference to control termination.
  function runMochaInSubprocess() {
    // running in subprocess prevents conflicts between tests and allows to control the test and terminate it when needed.
    subprocess = childProcess.fork(mochaModule, [stringifyArgs], { stdio: [0, 1, 2, 'ipc'] })
    // subprocess.on('exit', () => console.log(`Test subprocess ${subprocess.pid} exited.`));
  }
  let triggerCallback = () => {
    // to be run after file notification
    subprocess.kill('SIGINT')
    runMochaInSubprocess()
  }

  await watchFile({ triggerCallback, fileArray: Array.prototype.concat.apply([], [watchFileArray, testFileArray]), ignoreNodeModules: true, logMessage: false })

  runMochaInSubprocess() // initial trigger action, to run test immediately
}
