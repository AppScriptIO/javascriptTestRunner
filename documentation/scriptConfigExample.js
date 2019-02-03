const resolvedModule = {
    get javascriptTestRunner() { return path.dirname( require.resolve(`@dependency/javascriptTestRunner/package.json`) ) }
}
// configuration example for usage with `scriptManager` module,
let scriptConfig = {
    key: 'test',
    type: 'module',
    methodName: 'runTest',
    adapterFunction: ({ callback, args }) => {
        // change api to specific script parameter name
        args[0].targetProject = args[0].api.project
        return () => callback(...args) // specific interface of the callback
    },
    path: `${resolvedModule.javascriptTestRunner}/source/entrypoint/module/transpilation.entrypoint.js`,
}
