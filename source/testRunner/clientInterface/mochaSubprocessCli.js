/**
 * Interface for running mocha function through childprocess.spawn api (as it allows only a module path to be passed as parameter).
 */
import { runMocha } from '../mocha'

let args = JSON.parse(process.argv[2])
runMocha(...args)
