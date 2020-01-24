/**
 * Interface for running mocha function through childprocess.spawn api (as it allows only a module path to be passed as parameter).
 */
import { runMocha } from '../mocha.js'
import assert from 'assert'
import { consoleLogOverwrite } from '../utility/consoleLogOverwrite.js'

consoleLogOverwrite()

assert(process.argv[2], '• Must pass command arguments to run Mocha cli script.')
let args = JSON.parse(process.argv[2])
runMocha(...args)
