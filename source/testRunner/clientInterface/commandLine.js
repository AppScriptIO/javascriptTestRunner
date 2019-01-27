/**
 * Runs the test script inside a container.
 */
import path from 'path'
import { parseKeyValuePairSeparatedBySymbolFromArray, combineKeyValueObjectIntoString } from '@dependency/parseKeyValuePairSeparatedBySymbol'
import { runTest } from "../script.js"

if (require.main === module) { 
    cliAdapter()
} 

export {
    cliAdapter 
}

function cliAdapter({
    testType,
    configurationPath 
} = {}) {
    runTest({
        testPath: process.argv.slice(2)[0], // get first argument variable (either file path or directory path) 
    })
}




