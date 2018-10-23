/**
 * Mocha -Programmatic rest runner https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically
 */ 
import Mocha from 'mocha'

export function runMocha({ 
    mocha = new Mocha(), // Instantiate a Mocha instance.
    testTarget,
    jsFileArray
} = {}) {

    invalidateRequiredModule({ mochaInstance: mocha, fileArray: jsFileArray })

    // Add each .test.js file to the mocha instance
    if(Array.isArray(testTarget)) { // treat test target as array of files.
        testTarget.forEach((file) => {
            mocha.addFile(file)
        })
    } else { // single test file path
        mocha.addFile(testPath)
    }
    
    // Run tests.
    try {
        mocha.run(error => {
                // exit with non-zero status if there were failures
                if(error) { 
                    console.log('⚠ Error - failing test.\n')
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


/**
 * hakish way to invalidate all required modules caches in the Node process, which will allow for changes in .test.js or .js files to propagate in the re-started mocha tests.  
 * Where test files are invalidated by mocha's 'require' hook and other files (.js) are invalidated with 'beforeAll' hook. (Could use only 'beforeAll' but this is not a straight forward method anyway.)
 **/ 
function invalidateRequiredModule({ mochaInstance, fileArray }) {
    mochaInstance.suite.on('require', function (global, file) { // invalidate only test files, not the child files required in test files. i.e. ISSUE: any file required inside test files won't be discarded and reloaded.
        delete require.cache[file]
    }) // Fixes issue ❗ - Allow running multiple instances of `mocha` by reseting require.cache https://github.com/mochajs/mocha/issues/995
    
    // invalidate js files as well.
    console.log(`\x1b[2m%s\x1b[0m`, `• [Cleanning up require in current node process] Invalidating require cache of ${fileArray.length} file + test files.\n`)
    fileArray.forEach((file) => {
        delete require.cache[file]
    })
}