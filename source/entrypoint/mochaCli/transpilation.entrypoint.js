/* Entrypoint chain */
// • Transpilation (babelJSCompiler)
require('@dependency/javascriptTranspilation')({ babelConfigurationFile: 'serverRuntime.BabelConfig.js', outputTranspilation: false })

// • Run
module.exports = require('./')
