import Mocha from 'mocha' // Mocha -Programmatic rest runner https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically
import { Compiler } from '@deployment/javascriptTranspilation'
import { subprocessInspector } from './script.js'

export function runMocha({
  mocha, // Instantiate a Mocha instance.
  testTarget,
  jsFileArray,
  shouldInvalidateRequireModule = false, // invalidation isn't needed anymore as this module is run in a subprocess
  shouldCompileTest = true,
  shouldDebugger,
  targetProject,
} = {}) {
  // programmatic api of mocha - https://github.com/mochajs/mocha/wiki/Using-Mocha-programmatically
  let mochaOption = {
    ui: 'tdd', // Note: not using https://mochajs.org/#require interface because it doesn't work with node cli, it requires running tests through `mocha` cli as mentioned in https://github.com/mochajs/mocha/issues/1160
    reporter: 'progress' || 'min' /*min removes any console.log output outside of test/it blocks*/, // https://mochajs.org/#list
  }
  // prevent test timeout error triggering when in debug mode (as pausing script counts in the timeout).
  if (shouldDebugger) mochaOption.timeout = Infinity // https://github.com/mochajs/mocha/blob/186ca3657b4d3e0c0a602a500653a695f4e08930/lib/runnable.js#L36
  mocha ||= new Mocha(mochaOption)

  if (shouldInvalidateRequireModule) {
    const { invalidateRequiredModule, invalidateRequiredModuleEventHandler } = '../utility/invalidateRequiredModule.js'
    invalidateRequiredModuleEventHandler({ mochaInstance: mocha })
    invalidateRequiredModule({ fileArray: jsFileArray })
  }

  if (shouldCompileTest) {
    let compiler = new Compiler({ babelConfig: targetProject.configuration.configuration.transpilation.babelConfig /** Search for configuration files from target project */ })
    compiler.requireHook({ restrictToTargetProject: false /* Transpile tests of the target project */ })
    // process.on('exit', () => {
    //   console.log('TestRunner CLI')
    //   console.log(compiler.loadedFiles.map(value => value.filename))
    //   console.log(compiler.config.ignore)
    // })
  }

  // Add each .test.js file to the mocha instance
  if (Array.isArray(testTarget)) {
    // treat test target as array of files.
    testTarget.forEach(file => {
      mocha.addFile(file)
    })
  } else {
    // single test file path
    mocha.addFile(testPath)
  }

  // Run tests.
  try {
    if (shouldDebugger) {
      subprocessInspector()
      // debugger // When using runtime inspector API, the breakpoints in VSCode won't be recognized without breaking (Updated - this is no longer true, as VSCode latest release seems to fix this issue).
    }
    mocha.run(error => {
      // exit with non-zero status if there were failures
      if (error) {
        // mocha handles printing error message.
        // throw error
      }
      // process.exit()
    })
    // .on('test', function(test) {
    //     console.log('Test started: '+test.title);
    // })
    // .on('test end', function(test) {
    //     console.log('Test done: '+test.title);
    // })
    // .on('pass', function(test) {
    //     console.log('Test passed');
    //     console.log(test);
    // })
    // .on('fail', function(test, err) {
    //     console.log('Test fail');
    //     console.log(test);
    //     console.log(err);
    // })
    // .on('end', function() {
    //     console.log('All done');
    // })
  } catch (error) {
    console.group(`⚠ Error while running Mocha test:`)
    console.log(error)
    console.groupEnd()
    console.log('\n')
    // throw error
  }
}
