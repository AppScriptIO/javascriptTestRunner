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
  shouldDebugger,
  targetProject } =
{}) {
  if (shouldInvalidateRequireModule) {
    const { invalidateRequiredModule, invalidateRequiredModuleEventHandler } = '../utility/invalidateRequiredModule.js';
    invalidateRequiredModuleEventHandler({ mochaInstance: mocha });
    invalidateRequiredModule({ fileArray: jsFileArray });
  }

  if (shouldCompileTest) {
    let compiler = new _javascriptTranspilation.Compiler({ babelTransformConfig: targetProject.configuration.configuration.transpilation.babelConfig });
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
    if (shouldDebugger) {
      (0, _script.subprocessInspector)();

    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS90ZXN0UnVubmVyL21vY2hhLmpzIl0sIm5hbWVzIjpbInJ1bk1vY2hhIiwibW9jaGEiLCJNb2NoYSIsInVpIiwicmVwb3J0ZXIiLCJ0ZXN0VGFyZ2V0IiwianNGaWxlQXJyYXkiLCJzaG91bGRJbnZhbGlkYXRlUmVxdWlyZU1vZHVsZSIsInNob3VsZENvbXBpbGVUZXN0Iiwic2hvdWxkRGVidWdnZXIiLCJ0YXJnZXRQcm9qZWN0IiwiaW52YWxpZGF0ZVJlcXVpcmVkTW9kdWxlIiwiaW52YWxpZGF0ZVJlcXVpcmVkTW9kdWxlRXZlbnRIYW5kbGVyIiwibW9jaGFJbnN0YW5jZSIsImZpbGVBcnJheSIsImNvbXBpbGVyIiwiQ29tcGlsZXIiLCJiYWJlbFRyYW5zZm9ybUNvbmZpZyIsImNvbmZpZ3VyYXRpb24iLCJ0cmFuc3BpbGF0aW9uIiwiYmFiZWxDb25maWciLCJyZXF1aXJlSG9vayIsInJlc3RyaWN0VG9UYXJnZXRQcm9qZWN0IiwiQXJyYXkiLCJpc0FycmF5IiwiZm9yRWFjaCIsImZpbGUiLCJhZGRGaWxlIiwidGVzdFBhdGgiLCJydW4iLCJlcnJvciIsImNvbnNvbGUiLCJncm91cCIsImxvZyIsImdyb3VwRW5kIl0sIm1hcHBpbmdzIjoiNExBQUE7QUFDQTtBQUNBOztBQUVPLFNBQVNBLFFBQVQsQ0FBa0I7QUFDdkJDLEVBQUFBLEtBQUssR0FBRyxJQUFJQyxjQUFKLENBQVU7QUFDaEJDLElBQUFBLEVBQUUsRUFBRSxLQURZO0FBRWhCQyxJQUFBQSxRQUFRLEVBQUUsY0FBYyxLQUZSLEVBQVYsQ0FEZTs7QUFLdkJDLEVBQUFBLFVBTHVCO0FBTXZCQyxFQUFBQSxXQU51QjtBQU92QkMsRUFBQUEsNkJBQTZCLEdBQUcsS0FQVDtBQVF2QkMsRUFBQUEsaUJBQWlCLEdBQUcsSUFSRztBQVN2QkMsRUFBQUEsY0FUdUI7QUFVdkJDLEVBQUFBLGFBVnVCO0FBV3JCLEVBWEcsRUFXQztBQUNOLE1BQUlILDZCQUFKLEVBQW1DO0FBQ2pDLFVBQU0sRUFBRUksd0JBQUYsRUFBNEJDLG9DQUE1QixLQUFxRSx3Q0FBM0U7QUFDQUEsSUFBQUEsb0NBQW9DLENBQUMsRUFBRUMsYUFBYSxFQUFFWixLQUFqQixFQUFELENBQXBDO0FBQ0FVLElBQUFBLHdCQUF3QixDQUFDLEVBQUVHLFNBQVMsRUFBRVIsV0FBYixFQUFELENBQXhCO0FBQ0Q7O0FBRUQsTUFBSUUsaUJBQUosRUFBdUI7QUFDckIsUUFBSU8sUUFBUSxHQUFHLElBQUlDLGlDQUFKLENBQWEsRUFBRUMsb0JBQW9CLEVBQUVQLGFBQWEsQ0FBQ1EsYUFBZCxDQUE0QkEsYUFBNUIsQ0FBMENDLGFBQTFDLENBQXdEQyxXQUFoRixFQUFiLENBQWY7QUFDQUwsSUFBQUEsUUFBUSxDQUFDTSxXQUFULENBQXFCLEVBQUVDLHVCQUF1QixFQUFFLEtBQTNCLEVBQXJCOzs7Ozs7QUFNRDs7O0FBR0QsTUFBSUMsS0FBSyxDQUFDQyxPQUFOLENBQWNuQixVQUFkLENBQUosRUFBK0I7O0FBRTdCQSxJQUFBQSxVQUFVLENBQUNvQixPQUFYLENBQW1CQyxJQUFJLElBQUk7QUFDekJ6QixNQUFBQSxLQUFLLENBQUMwQixPQUFOLENBQWNELElBQWQ7QUFDRCxLQUZEO0FBR0QsR0FMRCxNQUtPOztBQUVMekIsSUFBQUEsS0FBSyxDQUFDMEIsT0FBTixDQUFjQyxRQUFkO0FBQ0Q7OztBQUdELE1BQUk7QUFDRixRQUFJbkIsY0FBSixFQUFvQjtBQUNsQjs7QUFFRDtBQUNEUixJQUFBQSxLQUFLLENBQUM0QixHQUFOLENBQVVDLEtBQUssSUFBSTs7QUFFakIsVUFBSUEsS0FBSixFQUFXOzs7QUFHVjs7QUFFRixLQVBEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJELEdBL0JELENBK0JFLE9BQU9BLEtBQVAsRUFBYztBQUNkQyxJQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBZSxtQ0FBZjtBQUNBRCxJQUFBQSxPQUFPLENBQUNFLEdBQVIsQ0FBWUgsS0FBWjtBQUNBQyxJQUFBQSxPQUFPLENBQUNHLFFBQVI7QUFDQUgsSUFBQUEsT0FBTyxDQUFDRSxHQUFSLENBQVksSUFBWjs7QUFFRDtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vY2hhIGZyb20gJ21vY2hhJyAvLyBNb2NoYSAtUHJvZ3JhbW1hdGljIHJlc3QgcnVubmVyIGh0dHBzOi8vZ2l0aHViLmNvbS9tb2NoYWpzL21vY2hhL3dpa2kvVXNpbmctbW9jaGEtcHJvZ3JhbW1hdGljYWxseVxuaW1wb3J0IHsgQ29tcGlsZXIgfSBmcm9tICdAZGVwZW5kZW5jeS9qYXZhc2NyaXB0VHJhbnNwaWxhdGlvbidcbmltcG9ydCB7IHN1YnByb2Nlc3NJbnNwZWN0b3IgfSBmcm9tICcuL3NjcmlwdC5qcydcblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bk1vY2hhKHtcbiAgbW9jaGEgPSBuZXcgTW9jaGEoe1xuICAgIHVpOiAndGRkJywgLy8gTm90ZTogbm90IHVzaW5nIGh0dHBzOi8vbW9jaGFqcy5vcmcvI3JlcXVpcmUgaW50ZXJmYWNlIGJlY2F1c2UgaXQgZG9lc24ndCB3b3JrIHdpdGggbm9kZSBjbGksIGl0IHJlcXVpcmVzIHJ1bm5pbmcgdGVzdHMgdGhyb3VnaCBgbW9jaGFgIGNsaSBhcyBtZW50aW9uZWQgaW4gaHR0cHM6Ly9naXRodWIuY29tL21vY2hhanMvbW9jaGEvaXNzdWVzLzExNjBcbiAgICByZXBvcnRlcjogJ3Byb2dyZXNzJyB8fCAnbWluJyAvKm1pbiByZW1vdmVzIGFueSBjb25zb2xlLmxvZyBvdXRwdXQgb3V0c2lkZSBvZiB0ZXN0L2l0IGJsb2NrcyovLCAvLyBodHRwczovL21vY2hhanMub3JnLyNsaXN0XG4gIH0pLCAvLyBJbnN0YW50aWF0ZSBhIE1vY2hhIGluc3RhbmNlLlxuICB0ZXN0VGFyZ2V0LFxuICBqc0ZpbGVBcnJheSxcbiAgc2hvdWxkSW52YWxpZGF0ZVJlcXVpcmVNb2R1bGUgPSBmYWxzZSwgLy8gaW52YWxpZGF0aW9uIGlzbid0IG5lZWRlZCBhbnltb3JlIGFzIHRoaXMgbW9kdWxlIGlzIHJ1biBpbiBhIHN1YnByb2Nlc3NcbiAgc2hvdWxkQ29tcGlsZVRlc3QgPSB0cnVlLFxuICBzaG91bGREZWJ1Z2dlcixcbiAgdGFyZ2V0UHJvamVjdCxcbn0gPSB7fSkge1xuICBpZiAoc2hvdWxkSW52YWxpZGF0ZVJlcXVpcmVNb2R1bGUpIHtcbiAgICBjb25zdCB7IGludmFsaWRhdGVSZXF1aXJlZE1vZHVsZSwgaW52YWxpZGF0ZVJlcXVpcmVkTW9kdWxlRXZlbnRIYW5kbGVyIH0gPSAnLi4vdXRpbGl0eS9pbnZhbGlkYXRlUmVxdWlyZWRNb2R1bGUuanMnXG4gICAgaW52YWxpZGF0ZVJlcXVpcmVkTW9kdWxlRXZlbnRIYW5kbGVyKHsgbW9jaGFJbnN0YW5jZTogbW9jaGEgfSlcbiAgICBpbnZhbGlkYXRlUmVxdWlyZWRNb2R1bGUoeyBmaWxlQXJyYXk6IGpzRmlsZUFycmF5IH0pXG4gIH1cblxuICBpZiAoc2hvdWxkQ29tcGlsZVRlc3QpIHtcbiAgICBsZXQgY29tcGlsZXIgPSBuZXcgQ29tcGlsZXIoeyBiYWJlbFRyYW5zZm9ybUNvbmZpZzogdGFyZ2V0UHJvamVjdC5jb25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb24udHJhbnNwaWxhdGlvbi5iYWJlbENvbmZpZyAvKiogU2VhcmNoIGZvciBjb25maWd1cmF0aW9uIGZpbGVzIGZyb20gdGFyZ2V0IHByb2plY3QgKi8gfSlcbiAgICBjb21waWxlci5yZXF1aXJlSG9vayh7IHJlc3RyaWN0VG9UYXJnZXRQcm9qZWN0OiBmYWxzZSAvKiBUcmFuc3BpbGUgdGVzdHMgb2YgdGhlIHRhcmdldCBwcm9qZWN0ICovIH0pXG4gICAgLy8gcHJvY2Vzcy5vbignZXhpdCcsICgpID0+IHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKCdUZXN0UnVubmVyIENMSScpXG4gICAgLy8gICBjb25zb2xlLmxvZyhjb21waWxlci5sb2FkZWRGaWxlcy5tYXAodmFsdWUgPT4gdmFsdWUuZmlsZW5hbWUpKVxuICAgIC8vICAgY29uc29sZS5sb2coY29tcGlsZXIuYmFiZWxSZWdpc3RlckNvbmZpZy5pZ25vcmUpXG4gICAgLy8gfSlcbiAgfVxuXG4gIC8vIEFkZCBlYWNoIC50ZXN0LmpzIGZpbGUgdG8gdGhlIG1vY2hhIGluc3RhbmNlXG4gIGlmIChBcnJheS5pc0FycmF5KHRlc3RUYXJnZXQpKSB7XG4gICAgLy8gdHJlYXQgdGVzdCB0YXJnZXQgYXMgYXJyYXkgb2YgZmlsZXMuXG4gICAgdGVzdFRhcmdldC5mb3JFYWNoKGZpbGUgPT4ge1xuICAgICAgbW9jaGEuYWRkRmlsZShmaWxlKVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgLy8gc2luZ2xlIHRlc3QgZmlsZSBwYXRoXG4gICAgbW9jaGEuYWRkRmlsZSh0ZXN0UGF0aClcbiAgfVxuXG4gIC8vIFJ1biB0ZXN0cy5cbiAgdHJ5IHtcbiAgICBpZiAoc2hvdWxkRGVidWdnZXIpIHtcbiAgICAgIHN1YnByb2Nlc3NJbnNwZWN0b3IoKVxuICAgICAgLy8gZGVidWdnZXIgLy8gV2hlbiB1c2luZyBydW50aW1lIGluc3BlY3RvciBBUEksIHRoZSBicmVha3BvaW50cyB3b24ndCBiZSByZWNvZ25pemVkIHdpdGhvdXQgYnJlYWtpbmcuXG4gICAgfVxuICAgIG1vY2hhLnJ1bihlcnJvciA9PiB7XG4gICAgICAvLyBleGl0IHdpdGggbm9uLXplcm8gc3RhdHVzIGlmIHRoZXJlIHdlcmUgZmFpbHVyZXNcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAvLyBtb2NoYSBoYW5kbGVzIHByaW50aW5nIGVycm9yIG1lc3NhZ2UuXG4gICAgICAgIC8vIHRocm93IGVycm9yXG4gICAgICB9XG4gICAgICAvLyBwcm9jZXNzLmV4aXQoKVxuICAgIH0pXG4gICAgLy8gLm9uKCd0ZXN0JywgZnVuY3Rpb24odGVzdCkge1xuICAgIC8vICAgICBjb25zb2xlLmxvZygnVGVzdCBzdGFydGVkOiAnK3Rlc3QudGl0bGUpO1xuICAgIC8vIH0pXG4gICAgLy8gLm9uKCd0ZXN0IGVuZCcsIGZ1bmN0aW9uKHRlc3QpIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ1Rlc3QgZG9uZTogJyt0ZXN0LnRpdGxlKTtcbiAgICAvLyB9KVxuICAgIC8vIC5vbigncGFzcycsIGZ1bmN0aW9uKHRlc3QpIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ1Rlc3QgcGFzc2VkJyk7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHRlc3QpO1xuICAgIC8vIH0pXG4gICAgLy8gLm9uKCdmYWlsJywgZnVuY3Rpb24odGVzdCwgZXJyKSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdUZXN0IGZhaWwnKTtcbiAgICAvLyAgICAgY29uc29sZS5sb2codGVzdCk7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgLy8gfSlcbiAgICAvLyAub24oJ2VuZCcsIGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICBjb25zb2xlLmxvZygnQWxsIGRvbmUnKTtcbiAgICAvLyB9KVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZ3JvdXAoYOKaoCBFcnJvciB3aGlsZSBydW5uaW5nIE1vY2hhIHRlc3Q6YClcbiAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICBjb25zb2xlLmdyb3VwRW5kKClcbiAgICBjb25zb2xlLmxvZygnXFxuJylcbiAgICAvLyB0aHJvdyBlcnJvclxuICB9XG59XG4iXX0=