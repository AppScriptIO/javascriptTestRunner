import Mocha from 'mocha' // Mocha -Programmatic rest runner https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically
import { Compiler } from '@dependency/javascriptTranspilation'
import { subprocessInspector } from './script.js'

export function runMocha({
  mocha = new Mocha({
    ui: 'tdd', // Note: not using https://mochajs.org/#require interface because it doesn't work with node cli, it requires running tests through `mocha` cli as mentioned in https://github.com/mochajs/mocha/issues/1160
    reporter: 'progress' || 'min' /*min removes any console.log output outside of test/it blocks*/, // https://mochajs.org/#list
  }), // Instantiate a Mocha instance.
  testTarget,
  jsFileArray,
  shouldInvalidateRequireModule = false, // invalidation isn't needed anymore as this module is run in a subprocess
  shouldCompileTest = true,
  shouldDebugger,
  targetProject,
} = {}) {
  if (shouldInvalidateRequireModule) {
    const { invalidateRequiredModule, invalidateRequiredModuleEventHandler } = '../utility/invalidateRequiredModule.js'
    invalidateRequiredModuleEventHandler({ mochaInstance: mocha })
    invalidateRequiredModule({ fileArray: jsFileArray })
  }

  if (shouldCompileTest) {
    let compiler = new Compiler({ babelTransformConfig: targetProject.configuration.configuration.transpilation.babelConfig /** Search for configuration files from target project */ })
    compiler.requireHook({ restrictToTargetProject: false /* Transpile tests of the target project */ })
    // process.on('exit', () => {
    //   console.log('TestRunner CLI')
    //   console.log(compiler.loadedFiles.map(value => value.filename))
    //   console.log(compiler.babelRegisterConfig.ignore)
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
    if (shouldDebugger) subprocessInspector()
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
