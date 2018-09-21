/**
 * Programmatic rest runner https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically
 * //TODO: Work with JSDom module for frontend testing using nodejs.
 */ 
import path from 'path'
import chokidar from 'chokidar'
import Mocha from 'mocha'
import { listFileRecursively } from './utility/listFileRecursively.js'

function invoke({ 
    testPath, 
    extensionName = '.test.js',
}) {
    /* List all files in a directory recursively */
    console.log(`• Searching for ${extensionName} extension files, in path ${testPath}.`)
    let fileArray = listFileRecursively({directory: testPath})
        .filter(file => {
            // Only keep the .test.js files
            return file.name.substr(-extensionName.length) === extensionName;
        })
        .reduce((accumulator, currentValue) => {
            accumulator.push(currentValue.path)
            return accumulator
        }, [])

    runMocha({ testPath, extensionName, fileArray }) // initial run

    let watcher = chokidar.watch(fileArray, {
        ignored: new RegExp(/node_modules/),
        usePolling: false
    })
    watcher
        .on('ready', path => {
            console.group('List of paths:')
            console.log(watcher.getWatched())
            console.log('\n\n')
            console.groupEnd()
        })
        .on('add', path => {
            console.log(`File ${path} has been added`)
        })
        .on('change', path => {
            console.log(`File ${path} has been changed`)
            runMocha({ testPath, extensionName, fileArray })
        })
        .on('unlink', path => console.log(`File ${path} has been removed`))
}

function runMocha({ 
    mocha = new Mocha(), // Instantiate a Mocha instance.
    testPath,
    extensionName,
    fileArray
}) {
    mocha.suite.on('require', function (global, file) { delete require.cache[file] }) // Fixes issue ❗ - Allow running multiple instances of `mocha` by reseting require.cache https://github.com/mochajs/mocha/issues/995

    // Add each .test.js file to the mocha instance
    if(testPath.endsWith(extensionName)) { // single test file path
        mocha.addFile(testPath)
    } else { // treat path as directory
        fileArray.forEach((file) => {
                mocha.addFile(file)
            })
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

function cliInterface() {
    // console.log(process.argv)
    let testPath = process.argv.slice(2)[0] // get first argument variable (either file path or directory path) 
    invoke({ testPath })
}

cliInterface()