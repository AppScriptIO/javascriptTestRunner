"use strict";

var _mocha = require("../mocha");

/**
 * Interface for running mocha function through childprocess.spawn api (as it allows only a module path to be passed as parameter).
 */
let args = JSON.parse(process.argv[2]);
(0, _mocha.runMocha)(...args);