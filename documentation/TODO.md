### TODO:
 - Front-end testing Work with JSDom module for frontend testing using nodejs.
 - Deal with nodejs inspector API. May involve changing `scriptManager` & `scriptExecution` too. Currently its possible to use inspector programmatic API, but to allow live reload each test session should be kept alive e.g. using `setTimeout` to allow for inspecting object values etc. e.g. using the exported `subprocessInspector` function from this module.
___

 ### Done:
- ~~Expose inspector api from this module, which includes keeping inspected subprocess alive to debug in browser.~~
 - ~~Run Mocha tests in a child process to prevent require.cache usage between restarted tests in the same Node process, i.e. rather than invalidating require.cache as a hackish method to allow running tests multiple times without affecting each other. This will fix some issues with restarting tests.~~
 - ~~Replace vm sandbox nodejs module with child process, as there is no control way to terminate a vm script once its executed (because it shares some elements of the vm context).~~
