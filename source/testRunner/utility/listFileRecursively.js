"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listFileRecursively = listFileRecursively;
exports.listFileWithExtension = listFileWithExtension;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

// returns all files in nested directory.
function listFileRecursively({
  directory,
  ignoreRegex = [new RegExp(/node_modules/), new RegExp(/.git/)]
}) {
  let results = [];

  let list = _fs.default.readdirSync(directory);

  list.forEach(filename => {
    let filepath = _path.default.join(directory, filename); // check if the path should be ignored


    let shouldIgnore = ignoreRegex.some(regex => {
      return filepath.match(regex);
    });
    if (shouldIgnore) return;
    let stat;

    try {
      stat = _fs.default.statSync(filepath);
    } catch (error) {
      return; // skip iteration on failed seaches.
    }

    if (stat && stat.isDirectory()) results = results.concat(listFileRecursively({
      directory: filepath
    }));else results.push({
      name: filename,
      path: filepath
    }); // create object
  });
  return results;
} // interface for listFieRecusively function that returns an array of file paths, and filters files with the specified extension.


function listFileWithExtension({
  directory,
  extension
  /*Array*/

}) {
  if (!Array.isArray(extension)) extension = [extension]; // support array or string

  return listFileRecursively({
    directory
  }).filter(file => {
    // Only keep the files with the extension
    return extension.some(suffix => file.name.substr(-suffix.length) === suffix);
  }).reduce((accumulator, currentValue) => {
    accumulator.push(currentValue.path);
    return accumulator;
  }, []);
}