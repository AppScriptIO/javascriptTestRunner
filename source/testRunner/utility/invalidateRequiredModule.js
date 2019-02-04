/**
 * hakish way to invalidate all required modules caches in the Node process, which will allow for changes in .test.js or .js files to propagate in the re-started mocha tests.  
 * Where test files are invalidated by mocha's 'require' hook and other files (.js) are invalidated with 'beforeAll' hook. (Could use only 'beforeAll' but this is not a straight forward method anyway.)
 **/ 
export function invalidateRequiredModule({ mochaInstance, fileArray }) {
    mochaInstance.suite.on('require', function (global, file) { // invalidate only test files, not the child files required in test files. i.e. ISSUE: any file required inside test files won't be discarded and reloaded.
        delete require.cache[file]
    }) // Fixes issue ❗ - Allow running multiple instances of `mocha` by reseting require.cache https://github.com/mochajs/mocha/issues/995
    
    // invalidate js files as well.
    console.log(`\x1b[2m%s\x1b[0m`, `• [Cleanning up require in current node process] Invalidating require cache of ${fileArray.length} file + test files.\n`)
    fileArray.forEach((file) => {
        delete require.cache[file]
    })
}