import path from 'path'
import assert from 'assert' 
import { listFileRecursively, listFileWithExtension } from './utility/listFileRecursively.js'
import { runMocha } from './mocha.js'
import { watchFile } from '@dependency/nodejsLiveReload'

export async function runTest({
    targetProject, // `Project class` instance created by `scriptManager` from the configuration file of the target project.
    testPath, // relative or absolute 
    jsFileExtension = '.js',
    testFileExtension = '.test.js',
} = {}) {
    if(!path.isAbsolute(testPath)) {
        assert(targetProject, `targetProject must be passed.`)
        let targetProjectRootPath = targetProject.configuration.rootPath
        testPath = path.join(targetProjectRootPath, testPath)
    } 
    console.log(`\x1b[33m\x1b[1m\x1b[7m\x1b[36m%s\x1b[0m \x1b[2m\x1b[3m%s\x1b[0m`, `Container:`, `NodeJS App`)

    // Setup environment 
    await require('@dependency/addModuleResolutionPath').addModuleResolutionPath({ pathArray: [ path.dirname(require.main.filename) ] })

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
    
    let triggerCallback = () => runMocha({ testTarget: testFileArray, jsFileArray }) // to be run after file notification
    await watchFile({ triggerCallback, fileArray: Array.prototype.concat.apply([], [ jsFileArray, testFileArray ]), ignoreNodeModules: true })
    triggerCallback() // initial trigger action, to run test immediately
}

