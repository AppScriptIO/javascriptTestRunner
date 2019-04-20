
/* Entrypoint chain */
// • Transpilation (babelJSCompiler)
require('@dependency/javascriptTranspilation')({ babelConfigurationFile: 'serverRuntime.BabelConfig.js', outputTranspilation: true })

// • Run
module.exports = require('./')