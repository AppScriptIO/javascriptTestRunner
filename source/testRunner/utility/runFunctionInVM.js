import { Script, createContext } from 'vm'

/**
 * Run function in a sandbox with passed context. 
 * Reason behind choosing VM to run the tests for example: 
 *  - Provides an isolated environment from the previous run test. 
 *  - Prevents conflicts and errors when clearing cache for the target tests and js files.
 * 
 *  This is an alternative approach to creating a new process / forking (spawn) the desired module (e.g. running Mocha) as non provide a direct way for running a function in a subprocess (child process accepts only module paths).
 */
export default function(func, args) {
    const context = createContext({
        _func: func,
        _args: args
    })
    let script = new Script('_func(..._args)', { filename: `evalmachine in ${__dirname}`})
    script.runInContext(context)
}