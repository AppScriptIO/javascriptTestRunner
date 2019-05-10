"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.runMocha = runMocha;var _mocha = _interopRequireDefault(require("mocha"));
var _javascriptTranspilation = require("@dependency/javascriptTranspilation");
var _script = require("./script.js");

function runMocha({
  mocha = new _mocha.default({
    ui: 'tdd',
    reporter: 'progress' || 'min' }),

  testTarget,
  jsFileArray,
  shouldInvalidateRequireModule = false,
  shouldCompileTest = true,
  shouldDebugger } =
{}) {
  if (shouldInvalidateRequireModule) {
    const { invalidateRequiredModule, invalidateRequiredModuleEventHandler } = './utility/invalidateRequiredModule.js';
    invalidateRequiredModuleEventHandler({ mochaInstance: mocha });
    invalidateRequiredModule({ fileArray: jsFileArray });
  }

  if (shouldCompileTest) {
    let compiler = new _javascriptTranspilation.Compiler();
    compiler.requireHook({ restrictToTargetProject: false });
  }


  if (Array.isArray(testTarget)) {

    testTarget.forEach(file => {
      mocha.addFile(file);
    });
  } else {

    mocha.addFile(testPath);
  }


  try {
    if (shouldDebugger) (0, _script.subprocessInspector)();
    mocha.run(error => {

      if (error) {


      }

    });


















  } catch (error) {
    console.group(`⚠ Error while running Mocha test:`);
    console.log(error);
    console.groupEnd();
    console.log('\n');

  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS90ZXN0UnVubmVyL21vY2hhLmpzIl0sIm5hbWVzIjpbInJ1bk1vY2hhIiwibW9jaGEiLCJNb2NoYSIsInVpIiwicmVwb3J0ZXIiLCJ0ZXN0VGFyZ2V0IiwianNGaWxlQXJyYXkiLCJzaG91bGRJbnZhbGlkYXRlUmVxdWlyZU1vZHVsZSIsInNob3VsZENvbXBpbGVUZXN0Iiwic2hvdWxkRGVidWdnZXIiLCJpbnZhbGlkYXRlUmVxdWlyZWRNb2R1bGUiLCJpbnZhbGlkYXRlUmVxdWlyZWRNb2R1bGVFdmVudEhhbmRsZXIiLCJtb2NoYUluc3RhbmNlIiwiZmlsZUFycmF5IiwiY29tcGlsZXIiLCJDb21waWxlciIsInJlcXVpcmVIb29rIiwicmVzdHJpY3RUb1RhcmdldFByb2plY3QiLCJBcnJheSIsImlzQXJyYXkiLCJmb3JFYWNoIiwiZmlsZSIsImFkZEZpbGUiLCJ0ZXN0UGF0aCIsInJ1biIsImVycm9yIiwiY29uc29sZSIsImdyb3VwIiwibG9nIiwiZ3JvdXBFbmQiXSwibWFwcGluZ3MiOiI0TEFBQTtBQUNBO0FBQ0E7O0FBRU8sU0FBU0EsUUFBVCxDQUFrQjtBQUN2QkMsRUFBQUEsS0FBSyxHQUFHLElBQUlDLGNBQUosQ0FBVTtBQUNoQkMsSUFBQUEsRUFBRSxFQUFFLEtBRFk7QUFFaEJDLElBQUFBLFFBQVEsRUFBRSxjQUFjLEtBRlIsRUFBVixDQURlOztBQUt2QkMsRUFBQUEsVUFMdUI7QUFNdkJDLEVBQUFBLFdBTnVCO0FBT3ZCQyxFQUFBQSw2QkFBNkIsR0FBRyxLQVBUO0FBUXZCQyxFQUFBQSxpQkFBaUIsR0FBRyxJQVJHO0FBU3ZCQyxFQUFBQSxjQVR1QjtBQVVyQixFQVZHLEVBVUM7QUFDTixNQUFJRiw2QkFBSixFQUFtQztBQUNqQyxVQUFNLEVBQUVHLHdCQUFGLEVBQTRCQyxvQ0FBNUIsS0FBcUUsdUNBQTNFO0FBQ0FBLElBQUFBLG9DQUFvQyxDQUFDLEVBQUVDLGFBQWEsRUFBRVgsS0FBakIsRUFBRCxDQUFwQztBQUNBUyxJQUFBQSx3QkFBd0IsQ0FBQyxFQUFFRyxTQUFTLEVBQUVQLFdBQWIsRUFBRCxDQUF4QjtBQUNEOztBQUVELE1BQUlFLGlCQUFKLEVBQXVCO0FBQ3JCLFFBQUlNLFFBQVEsR0FBRyxJQUFJQyxpQ0FBSixFQUFmO0FBQ0FELElBQUFBLFFBQVEsQ0FBQ0UsV0FBVCxDQUFxQixFQUFFQyx1QkFBdUIsRUFBRSxLQUEzQixFQUFyQjtBQUNEOzs7QUFHRCxNQUFJQyxLQUFLLENBQUNDLE9BQU4sQ0FBY2QsVUFBZCxDQUFKLEVBQStCOztBQUU3QkEsSUFBQUEsVUFBVSxDQUFDZSxPQUFYLENBQW1CQyxJQUFJLElBQUk7QUFDekJwQixNQUFBQSxLQUFLLENBQUNxQixPQUFOLENBQWNELElBQWQ7QUFDRCxLQUZEO0FBR0QsR0FMRCxNQUtPOztBQUVMcEIsSUFBQUEsS0FBSyxDQUFDcUIsT0FBTixDQUFjQyxRQUFkO0FBQ0Q7OztBQUdELE1BQUk7QUFDRixRQUFJZCxjQUFKLEVBQW9CO0FBQ3BCUixJQUFBQSxLQUFLLENBQUN1QixHQUFOLENBQVVDLEtBQUssSUFBSTs7QUFFakIsVUFBSUEsS0FBSixFQUFXOzs7QUFHVjs7QUFFRixLQVBEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJELEdBNUJELENBNEJFLE9BQU9BLEtBQVAsRUFBYztBQUNkQyxJQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBZSxtQ0FBZjtBQUNBRCxJQUFBQSxPQUFPLENBQUNFLEdBQVIsQ0FBWUgsS0FBWjtBQUNBQyxJQUFBQSxPQUFPLENBQUNHLFFBQVI7QUFDQUgsSUFBQUEsT0FBTyxDQUFDRSxHQUFSLENBQVksSUFBWjs7QUFFRDtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vY2hhIGZyb20gJ21vY2hhJyAvLyBNb2NoYSAtUHJvZ3JhbW1hdGljIHJlc3QgcnVubmVyIGh0dHBzOi8vZ2l0aHViLmNvbS9tb2NoYWpzL21vY2hhL3dpa2kvVXNpbmctbW9jaGEtcHJvZ3JhbW1hdGljYWxseVxuaW1wb3J0IHsgQ29tcGlsZXIgfSBmcm9tICdAZGVwZW5kZW5jeS9qYXZhc2NyaXB0VHJhbnNwaWxhdGlvbidcbmltcG9ydCB7IHN1YnByb2Nlc3NJbnNwZWN0b3IgfSBmcm9tICcuL3NjcmlwdC5qcydcblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bk1vY2hhKHtcbiAgbW9jaGEgPSBuZXcgTW9jaGEoe1xuICAgIHVpOiAndGRkJywgLy8gTm90ZTogbm90IHVzaW5nIGh0dHBzOi8vbW9jaGFqcy5vcmcvI3JlcXVpcmUgaW50ZXJmYWNlIGJlY2F1c2UgaXQgZG9lc24ndCB3b3JrIHdpdGggbm9kZSBjbGksIGl0IHJlcXVpcmVzIHJ1bm5pbmcgdGVzdHMgdGhyb3VnaCBgbW9jaGFgIGNsaSBhcyBtZW50aW9uZWQgaW4gaHR0cHM6Ly9naXRodWIuY29tL21vY2hhanMvbW9jaGEvaXNzdWVzLzExNjBcbiAgICByZXBvcnRlcjogJ3Byb2dyZXNzJyB8fCAnbWluJyAvKm1pbiByZW1vdmVzIGFueSBjb25zb2xlLmxvZyBvdXRwdXQgb3V0c2lkZSBvZiB0ZXN0L2l0IGJsb2NrcyovLCAvLyBodHRwczovL21vY2hhanMub3JnLyNsaXN0XG4gIH0pLCAvLyBJbnN0YW50aWF0ZSBhIE1vY2hhIGluc3RhbmNlLlxuICB0ZXN0VGFyZ2V0LFxuICBqc0ZpbGVBcnJheSxcbiAgc2hvdWxkSW52YWxpZGF0ZVJlcXVpcmVNb2R1bGUgPSBmYWxzZSwgLy8gaW52YWxpZGF0aW9uIGlzbid0IG5lZWRlZCBhbnltb3JlIGFzIHRoaXMgbW9kdWxlIGlzIHJ1biBpbiBhIHN1YnByb2Nlc3NcbiAgc2hvdWxkQ29tcGlsZVRlc3QgPSB0cnVlLFxuICBzaG91bGREZWJ1Z2dlcixcbn0gPSB7fSkge1xuICBpZiAoc2hvdWxkSW52YWxpZGF0ZVJlcXVpcmVNb2R1bGUpIHtcbiAgICBjb25zdCB7IGludmFsaWRhdGVSZXF1aXJlZE1vZHVsZSwgaW52YWxpZGF0ZVJlcXVpcmVkTW9kdWxlRXZlbnRIYW5kbGVyIH0gPSAnLi91dGlsaXR5L2ludmFsaWRhdGVSZXF1aXJlZE1vZHVsZS5qcydcbiAgICBpbnZhbGlkYXRlUmVxdWlyZWRNb2R1bGVFdmVudEhhbmRsZXIoeyBtb2NoYUluc3RhbmNlOiBtb2NoYSB9KVxuICAgIGludmFsaWRhdGVSZXF1aXJlZE1vZHVsZSh7IGZpbGVBcnJheToganNGaWxlQXJyYXkgfSlcbiAgfVxuXG4gIGlmIChzaG91bGRDb21waWxlVGVzdCkge1xuICAgIGxldCBjb21waWxlciA9IG5ldyBDb21waWxlcigpXG4gICAgY29tcGlsZXIucmVxdWlyZUhvb2soeyByZXN0cmljdFRvVGFyZ2V0UHJvamVjdDogZmFsc2UgLyogVHJhbnNwaWxlIHRlc3RzIG9mIHRoZSB0YXJnZXQgcHJvamVjdCAqLyB9KVxuICB9XG5cbiAgLy8gQWRkIGVhY2ggLnRlc3QuanMgZmlsZSB0byB0aGUgbW9jaGEgaW5zdGFuY2VcbiAgaWYgKEFycmF5LmlzQXJyYXkodGVzdFRhcmdldCkpIHtcbiAgICAvLyB0cmVhdCB0ZXN0IHRhcmdldCBhcyBhcnJheSBvZiBmaWxlcy5cbiAgICB0ZXN0VGFyZ2V0LmZvckVhY2goZmlsZSA9PiB7XG4gICAgICBtb2NoYS5hZGRGaWxlKGZpbGUpXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICAvLyBzaW5nbGUgdGVzdCBmaWxlIHBhdGhcbiAgICBtb2NoYS5hZGRGaWxlKHRlc3RQYXRoKVxuICB9XG5cbiAgLy8gUnVuIHRlc3RzLlxuICB0cnkge1xuICAgIGlmIChzaG91bGREZWJ1Z2dlcikgc3VicHJvY2Vzc0luc3BlY3RvcigpXG4gICAgbW9jaGEucnVuKGVycm9yID0+IHtcbiAgICAgIC8vIGV4aXQgd2l0aCBub24temVybyBzdGF0dXMgaWYgdGhlcmUgd2VyZSBmYWlsdXJlc1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIC8vIG1vY2hhIGhhbmRsZXMgcHJpbnRpbmcgZXJyb3IgbWVzc2FnZS5cbiAgICAgICAgLy8gdGhyb3cgZXJyb3JcbiAgICAgIH1cbiAgICAgIC8vIHByb2Nlc3MuZXhpdCgpXG4gICAgfSlcbiAgICAvLyAub24oJ3Rlc3QnLCBmdW5jdGlvbih0ZXN0KSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdUZXN0IHN0YXJ0ZWQ6ICcrdGVzdC50aXRsZSk7XG4gICAgLy8gfSlcbiAgICAvLyAub24oJ3Rlc3QgZW5kJywgZnVuY3Rpb24odGVzdCkge1xuICAgIC8vICAgICBjb25zb2xlLmxvZygnVGVzdCBkb25lOiAnK3Rlc3QudGl0bGUpO1xuICAgIC8vIH0pXG4gICAgLy8gLm9uKCdwYXNzJywgZnVuY3Rpb24odGVzdCkge1xuICAgIC8vICAgICBjb25zb2xlLmxvZygnVGVzdCBwYXNzZWQnKTtcbiAgICAvLyAgICAgY29uc29sZS5sb2codGVzdCk7XG4gICAgLy8gfSlcbiAgICAvLyAub24oJ2ZhaWwnLCBmdW5jdGlvbih0ZXN0LCBlcnIpIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ1Rlc3QgZmFpbCcpO1xuICAgIC8vICAgICBjb25zb2xlLmxvZyh0ZXN0KTtcbiAgICAvLyAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAvLyB9KVxuICAgIC8vIC5vbignZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdBbGwgZG9uZScpO1xuICAgIC8vIH0pXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5ncm91cChg4pqgIEVycm9yIHdoaWxlIHJ1bm5pbmcgTW9jaGEgdGVzdDpgKVxuICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgIGNvbnNvbGUuZ3JvdXBFbmQoKVxuICAgIGNvbnNvbGUubG9nKCdcXG4nKVxuICAgIC8vIHRocm93IGVycm9yXG4gIH1cbn1cbiJdfQ==