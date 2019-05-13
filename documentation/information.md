# javascriptTestRunner
This is a `script` repository. Where the modules inside should be dummy not complicated, controlled by a script executer or api client.

# Allow attaching chrome Nodejs inspector automatically:
_This prevents the need to manually reload Chrome inspector window or focus the window in order for it to reattach.
- In chrome://inspect/#devices open `Open dedicated DevTools for Node` 
- run tests from terminal. 

# Usage: 
node --no-lazy ./node_modules/.bin/scriptManager test "({ testPath: './distribution/test', shouldDebugger: true, shouldCompileTest: false })"

___ 
[TODO list](/documentation/TODO.md)

___

### 🔑 License: [MIT](/.github/LICENSE)
