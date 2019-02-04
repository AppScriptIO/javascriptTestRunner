import { invalidateRequiredModule } from './utility/invalidateRequiredModule.js'

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


