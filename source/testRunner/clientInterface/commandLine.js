/**
 * Runs the test script inside a container.
 */
import path from 'path'
import { parseKeyValuePairSeparatedBySymbolFromArray, combineKeyValueObjectIntoString } from '@dependency/parseKeyValuePairSeparatedBySymbol'
import { runTest } from "../script.js"

cliAdapter()

export function cliAdapter({
    testType, // absolute path to the folder where tests exist and js files to be watch for livereloading tests.
    configurationPath 
} = {}) {
    runTest({
        testPath: process.argv.slice(2)[0], // get first argument variable (either file path or directory path) 
    })
}




