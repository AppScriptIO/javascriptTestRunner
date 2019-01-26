import path from 'path'
import { listFileRecursively, listFileWithExtension } from './utility/listFileRecursively.js'
import { runMocha } from './mocha.js'
import { watchFile } from './watchFile.js'

invoke()

async function invoke({
    testPath = process.argv.slice(2)[0], // get first argument variable (either file path or directory path) 
    jsFileExtension = '.js',
    testFileExtension = '.test.js',
}) {

    process.on('SIGINT', () => { 
        console.log("Caught interrupt signal - test container level")
        process.exit(0)
    })
    
    const jsPathArray = [testPath, path.dirname(testPath)] // js files in source path & in node_modules path which is in the root path.

    /* List all files in a directory recursively */
    console.log(`• Searching for ${testFileExtension} extension files, in path ${testPath}.`)
    let testFileArray;
    if(testPath.endsWith(testFileExtension)) { // file path
        testFileArray = [testPath]
    } else { // directory path
        testFileArray = listFileWithExtension({ directory: testPath, extension: testFileExtension })
    }

    let jsFileArrayOfArray = jsPathArray.map(jsPath => {
        return listFileWithExtension({ directory: jsPath, extension: jsFileExtension })
    })
    // add node_modules js files
    let jsFileArray = Array.prototype.concat.apply([], jsFileArrayOfArray)
    
    let triggerCallback = () => { runMocha({ testTarget: testFileArray, jsFileArray }) } // to be run after file notification
    await watchFile({ triggerCallback, fileArray: Array.prototype.concat.apply([], [ jsFileArray, testFileArray ]), ignoreNodeModules: true })
    triggerCallback() // initial trigger action, to run test immediately
}

