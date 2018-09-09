const path = require('path')
const moduleSystem = require('module')
const { execSync, spawn, spawnSync } = require('child_process')
const filesystem = require('fs')

/* Entrypoint chain */
async function run() {
    console.log(`\x1b[33m\x1b[1m\x1b[7m\x1b[36m%s\x1b[0m \x1b[2m\x1b[3m%s\x1b[0m`, `Container:`, `NodeJS App`)

    // Transpilation - babelJSCompiler
    require('@dependency/javascriptTranspilation')({ babelConfigurationFile: 'serverRuntime.BabelConfig.js' })
    // Setup environment 
    await require('@dependency/addModuleResolutionPath').addModuleResolutionPath({ pathArray: [ path.dirname(require.main.filename) ] })
    // Run
    require('./mocha.js')
}

run().catch(error => {
    console.error(error);
    process.exitCode = 1;
})