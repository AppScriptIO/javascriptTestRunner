import path from 'path'
import { listFileRecursively, listFileWithExtension } from './utility/listFileRecursively.js'
import { runMocha } from './mocha.js'
import { watchFile } from './watchFile.js'

cliInterface()

function cliInterface() {
    process.on('SIGINT', () => { 
        console.log("Caught interrupt signal - test container level")
        process.exit(0)
    })
    
    let testPath = process.argv.slice(2)[0] // get first argument variable (either file path or directory path) 
    invoke({ testPath, sourcePath: testPath })
}

async function invoke({
    sourcePath,
    jsFileExtension = '.js',
    testPath, 
    testFileExtension = '.test.js',
}) {
    /* List all files in a directory recursively */
    console.log(`• Searching for ${testFileExtension} extension files, in path ${testPath}.`)
    let testFileArray;
    if(testPath.endsWith(testFileExtension)) { // file path
        testFileArray = [testPath]
    } else { // directory path
        testFileArray = listFileWithExtension({ directory: testPath, extension: testFileExtension })
    }

    let jsFileArray = listFileWithExtension({ directory: sourcePath, extension: jsFileExtension })
    
    let triggerCallback = () => { runMocha({ testTarget: testFileArray, jsFileArray }) } // to be run after file notification
    await watchFile({ triggerCallback, fileArray: Array.prototype.concat.apply([], [ jsFileArray, testFileArray ]) })
    triggerCallback() // initial trigger action, to run test immediately
}

