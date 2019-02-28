### TODO:
 - Front-end testing Work with JSDom module for frontend testing using nodejs.
 - Run Mocha tests in a child process to prevent require.cache usage between restarted tests in the same Node process, i.e. rather than invalidating require.cache as a hackish method to allow running tests multiple times without affecting each other. This will fix some issues with restarting tests.
 -
