"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.runMocha = runMocha;var _mocha = _interopRequireDefault(require("mocha"));
var _javascriptTranspilation = require("@deployment/javascriptTranspilation");
var _script = require("./script.js");


function runMocha({
  mocha,
  testTarget,
  jsFileArray,
  shouldInvalidateRequireModule = false,
  shouldCompileTest = true,
  shouldDebugger,
  targetProject,
  mochaOption = {} } =
{}) {

  mochaOption = Object.assign(
  {
    ui: 'tdd',
    reporter: 'progress' || 'min',
    timeout: 10000,
    fullTrace: true },



  mochaOption);


  if (shouldDebugger) mochaOption.timeout = Infinity;
  mocha || (mocha = new _mocha.default(mochaOption));

  if (shouldInvalidateRequireModule) {
    const { invalidateRequiredModule, invalidateRequiredModuleEventHandler } = '../utility/invalidateRequiredModule.js';
    invalidateRequiredModuleEventHandler({ mochaInstance: mocha });
    invalidateRequiredModule({ fileArray: jsFileArray });
  }

  if (shouldCompileTest) {
    let compiler = new _javascriptTranspilation.Compiler({ babelConfig: targetProject.configuration.configuration.transpilation.babelConfig });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9tb2NoYS5qcyJdLCJuYW1lcyI6WyJydW5Nb2NoYSIsIm1vY2hhIiwidGVzdFRhcmdldCIsImpzRmlsZUFycmF5Iiwic2hvdWxkSW52YWxpZGF0ZVJlcXVpcmVNb2R1bGUiLCJzaG91bGRDb21waWxlVGVzdCIsInNob3VsZERlYnVnZ2VyIiwidGFyZ2V0UHJvamVjdCIsIm1vY2hhT3B0aW9uIiwiT2JqZWN0IiwiYXNzaWduIiwidWkiLCJyZXBvcnRlciIsInRpbWVvdXQiLCJmdWxsVHJhY2UiLCJJbmZpbml0eSIsIk1vY2hhIiwiaW52YWxpZGF0ZVJlcXVpcmVkTW9kdWxlIiwiaW52YWxpZGF0ZVJlcXVpcmVkTW9kdWxlRXZlbnRIYW5kbGVyIiwibW9jaGFJbnN0YW5jZSIsImZpbGVBcnJheSIsImNvbXBpbGVyIiwiQ29tcGlsZXIiLCJiYWJlbENvbmZpZyIsImNvbmZpZ3VyYXRpb24iLCJ0cmFuc3BpbGF0aW9uIiwicmVxdWlyZUhvb2siLCJyZXN0cmljdFRvVGFyZ2V0UHJvamVjdCIsIkFycmF5IiwiaXNBcnJheSIsImZvckVhY2giLCJmaWxlIiwiYWRkRmlsZSIsInRlc3RQYXRoIiwicnVuIiwiZXJyb3IiLCJjb25zb2xlIiwiZ3JvdXAiLCJsb2ciLCJncm91cEVuZCJdLCJtYXBwaW5ncyI6IjRMQUFBO0FBQ0E7QUFDQTs7O0FBR08sU0FBU0EsUUFBVCxDQUFrQjtBQUN2QkMsRUFBQUEsS0FEdUI7QUFFdkJDLEVBQUFBLFVBRnVCO0FBR3ZCQyxFQUFBQSxXQUh1QjtBQUl2QkMsRUFBQUEsNkJBQTZCLEdBQUcsS0FKVDtBQUt2QkMsRUFBQUEsaUJBQWlCLEdBQUcsSUFMRztBQU12QkMsRUFBQUEsY0FOdUI7QUFPdkJDLEVBQUFBLGFBUHVCO0FBUXZCQyxFQUFBQSxXQUFXLEdBQUcsRUFSUztBQVNyQixFQVRHLEVBU0M7O0FBRU5BLEVBQUFBLFdBQVcsR0FBR0MsTUFBTSxDQUFDQyxNQUFQO0FBQ1o7QUFDRUMsSUFBQUEsRUFBRSxFQUFFLEtBRE47QUFFRUMsSUFBQUEsUUFBUSxFQUFFLGNBQWMsS0FGMUI7QUFHRUMsSUFBQUEsT0FBTyxFQUFFLEtBSFg7QUFJRUMsSUFBQUEsU0FBUyxFQUFFLElBSmIsRUFEWTs7OztBQVNaTixFQUFBQSxXQVRZLENBQWQ7OztBQVlBLE1BQUlGLGNBQUosRUFBb0JFLFdBQVcsQ0FBQ0ssT0FBWixHQUFzQkUsUUFBdEI7QUFDcEJkLEVBQUFBLEtBQUssS0FBTEEsS0FBSyxHQUFLLElBQUllLGNBQUosQ0FBVVIsV0FBVixDQUFMLENBQUw7O0FBRUEsTUFBSUosNkJBQUosRUFBbUM7QUFDakMsVUFBTSxFQUFFYSx3QkFBRixFQUE0QkMsb0NBQTVCLEtBQXFFLHdDQUEzRTtBQUNBQSxJQUFBQSxvQ0FBb0MsQ0FBQyxFQUFFQyxhQUFhLEVBQUVsQixLQUFqQixFQUFELENBQXBDO0FBQ0FnQixJQUFBQSx3QkFBd0IsQ0FBQyxFQUFFRyxTQUFTLEVBQUVqQixXQUFiLEVBQUQsQ0FBeEI7QUFDRDs7QUFFRCxNQUFJRSxpQkFBSixFQUF1QjtBQUNyQixRQUFJZ0IsUUFBUSxHQUFHLElBQUlDLGlDQUFKLENBQWEsRUFBRUMsV0FBVyxFQUFFaEIsYUFBYSxDQUFDaUIsYUFBZCxDQUE0QkEsYUFBNUIsQ0FBMENDLGFBQTFDLENBQXdERixXQUF2RSxFQUFiLENBQWY7QUFDQUYsSUFBQUEsUUFBUSxDQUFDSyxXQUFULENBQXFCLEVBQUVDLHVCQUF1QixFQUFFLEtBQTNCLEVBQXJCOzs7Ozs7QUFNRDs7O0FBR0QsTUFBSUMsS0FBSyxDQUFDQyxPQUFOLENBQWMzQixVQUFkLENBQUosRUFBK0I7O0FBRTdCQSxJQUFBQSxVQUFVLENBQUM0QixPQUFYLENBQW1CQyxJQUFJLElBQUk7QUFDekI5QixNQUFBQSxLQUFLLENBQUMrQixPQUFOLENBQWNELElBQWQ7QUFDRCxLQUZEO0FBR0QsR0FMRCxNQUtPOztBQUVMOUIsSUFBQUEsS0FBSyxDQUFDK0IsT0FBTixDQUFjQyxRQUFkO0FBQ0Q7OztBQUdELE1BQUk7QUFDRixRQUFJM0IsY0FBSixFQUFvQjtBQUNsQjs7QUFFRDtBQUNETCxJQUFBQSxLQUFLLENBQUNpQyxHQUFOLENBQVVDLEtBQUssSUFBSTs7QUFFakIsVUFBSUEsS0FBSixFQUFXOzs7QUFHVjs7QUFFRixLQVBEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJELEdBL0JELENBK0JFLE9BQU9BLEtBQVAsRUFBYztBQUNkQyxJQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBZSxtQ0FBZjtBQUNBRCxJQUFBQSxPQUFPLENBQUNFLEdBQVIsQ0FBWUgsS0FBWjtBQUNBQyxJQUFBQSxPQUFPLENBQUNHLFFBQVI7QUFDQUgsSUFBQUEsT0FBTyxDQUFDRSxHQUFSLENBQVksSUFBWjs7QUFFRDtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vY2hhIGZyb20gJ21vY2hhJyAvLyBNb2NoYSAtUHJvZ3JhbW1hdGljIHJlc3QgcnVubmVyIGh0dHBzOi8vZ2l0aHViLmNvbS9tb2NoYWpzL21vY2hhL3dpa2kvVXNpbmctbW9jaGEtcHJvZ3JhbW1hdGljYWxseVxuaW1wb3J0IHsgQ29tcGlsZXIgfSBmcm9tICdAZGVwbG95bWVudC9qYXZhc2NyaXB0VHJhbnNwaWxhdGlvbidcbmltcG9ydCB7IHN1YnByb2Nlc3NJbnNwZWN0b3IgfSBmcm9tICcuL3NjcmlwdC5qcydcblxuLy8gTW9jaGEgcHJvZ3JhbW1hdGljIGFwaSBodHRwczovL21vY2hhanMub3JnL2FwaS9cbmV4cG9ydCBmdW5jdGlvbiBydW5Nb2NoYSh7XG4gIG1vY2hhLCAvLyBJbnN0YW50aWF0ZSBhIE1vY2hhIGluc3RhbmNlLlxuICB0ZXN0VGFyZ2V0LFxuICBqc0ZpbGVBcnJheSxcbiAgc2hvdWxkSW52YWxpZGF0ZVJlcXVpcmVNb2R1bGUgPSBmYWxzZSwgLy8gaW52YWxpZGF0aW9uIGlzbid0IG5lZWRlZCBhbnltb3JlIGFzIHRoaXMgbW9kdWxlIGlzIHJ1biBpbiBhIHN1YnByb2Nlc3NcbiAgc2hvdWxkQ29tcGlsZVRlc3QgPSB0cnVlLFxuICBzaG91bGREZWJ1Z2dlcixcbiAgdGFyZ2V0UHJvamVjdCxcbiAgbW9jaGFPcHRpb24gPSB7fSxcbn0gPSB7fSkge1xuICAvLyBwcm9ncmFtbWF0aWMgYXBpIG9mIG1vY2hhIC0gaHR0cHM6Ly9naXRodWIuY29tL21vY2hhanMvbW9jaGEvd2lraS9Vc2luZy1Nb2NoYS1wcm9ncmFtbWF0aWNhbGx5XG4gIG1vY2hhT3B0aW9uID0gT2JqZWN0LmFzc2lnbihcbiAgICB7XG4gICAgICB1aTogJ3RkZCcsIC8vIE5vdGU6IG5vdCB1c2luZyBodHRwczovL21vY2hhanMub3JnLyNyZXF1aXJlIGludGVyZmFjZSBiZWNhdXNlIGl0IGRvZXNuJ3Qgd29yayB3aXRoIG5vZGUgY2xpLCBpdCByZXF1aXJlcyBydW5uaW5nIHRlc3RzIHRocm91Z2ggYG1vY2hhYCBjbGkgYXMgbWVudGlvbmVkIGluIGh0dHBzOi8vZ2l0aHViLmNvbS9tb2NoYWpzL21vY2hhL2lzc3Vlcy8xMTYwXG4gICAgICByZXBvcnRlcjogJ3Byb2dyZXNzJyB8fCAnbWluJyAvKm1pbiByZW1vdmVzIGFueSBjb25zb2xlLmxvZyBvdXRwdXQgb3V0c2lkZSBvZiB0ZXN0L2l0IGJsb2NrcyovLCAvLyBodHRwczovL21vY2hhanMub3JnLyNsaXN0XG4gICAgICB0aW1lb3V0OiAxMDAwMCwgLy9taWxsaXNlY29uZHNcbiAgICAgIGZ1bGxUcmFjZTogdHJ1ZSxcbiAgICAgIC8vIHJldHJpZXM6IDMgLy8gbnVtYmVyIG9mIHJldHJpZXMgb2YgZmFpbGVkIHRlc3RzXG4gICAgICAvLyBmb3JjZSBleGl0XG4gICAgfSxcbiAgICBtb2NoYU9wdGlvbixcbiAgKVxuICAvLyBwcmV2ZW50IHRlc3QgdGltZW91dCBlcnJvciB0cmlnZ2VyaW5nIHdoZW4gaW4gZGVidWcgbW9kZSAoYXMgcGF1c2luZyBzY3JpcHQgY291bnRzIGluIHRoZSB0aW1lb3V0KS5cbiAgaWYgKHNob3VsZERlYnVnZ2VyKSBtb2NoYU9wdGlvbi50aW1lb3V0ID0gSW5maW5pdHkgLy8gaHR0cHM6Ly9naXRodWIuY29tL21vY2hhanMvbW9jaGEvYmxvYi8xODZjYTM2NTdiNGQzZTBjMGE2MDJhNTAwNjUzYTY5NWY0ZTA4OTMwL2xpYi9ydW5uYWJsZS5qcyNMMzZcbiAgbW9jaGEgfHw9IG5ldyBNb2NoYShtb2NoYU9wdGlvbilcblxuICBpZiAoc2hvdWxkSW52YWxpZGF0ZVJlcXVpcmVNb2R1bGUpIHtcbiAgICBjb25zdCB7IGludmFsaWRhdGVSZXF1aXJlZE1vZHVsZSwgaW52YWxpZGF0ZVJlcXVpcmVkTW9kdWxlRXZlbnRIYW5kbGVyIH0gPSAnLi4vdXRpbGl0eS9pbnZhbGlkYXRlUmVxdWlyZWRNb2R1bGUuanMnXG4gICAgaW52YWxpZGF0ZVJlcXVpcmVkTW9kdWxlRXZlbnRIYW5kbGVyKHsgbW9jaGFJbnN0YW5jZTogbW9jaGEgfSlcbiAgICBpbnZhbGlkYXRlUmVxdWlyZWRNb2R1bGUoeyBmaWxlQXJyYXk6IGpzRmlsZUFycmF5IH0pXG4gIH1cblxuICBpZiAoc2hvdWxkQ29tcGlsZVRlc3QpIHtcbiAgICBsZXQgY29tcGlsZXIgPSBuZXcgQ29tcGlsZXIoeyBiYWJlbENvbmZpZzogdGFyZ2V0UHJvamVjdC5jb25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb24udHJhbnNwaWxhdGlvbi5iYWJlbENvbmZpZyAvKiogU2VhcmNoIGZvciBjb25maWd1cmF0aW9uIGZpbGVzIGZyb20gdGFyZ2V0IHByb2plY3QgKi8gfSlcbiAgICBjb21waWxlci5yZXF1aXJlSG9vayh7IHJlc3RyaWN0VG9UYXJnZXRQcm9qZWN0OiBmYWxzZSAvKiBUcmFuc3BpbGUgdGVzdHMgb2YgdGhlIHRhcmdldCBwcm9qZWN0ICovIH0pXG4gICAgLy8gcHJvY2Vzcy5vbignZXhpdCcsICgpID0+IHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKCdUZXN0UnVubmVyIENMSScpXG4gICAgLy8gICBjb25zb2xlLmxvZyhjb21waWxlci5sb2FkZWRGaWxlcy5tYXAodmFsdWUgPT4gdmFsdWUuZmlsZW5hbWUpKVxuICAgIC8vICAgY29uc29sZS5sb2coY29tcGlsZXIuY29uZmlnLmlnbm9yZSlcbiAgICAvLyB9KVxuICB9XG5cbiAgLy8gQWRkIGVhY2ggLnRlc3QuanMgZmlsZSB0byB0aGUgbW9jaGEgaW5zdGFuY2VcbiAgaWYgKEFycmF5LmlzQXJyYXkodGVzdFRhcmdldCkpIHtcbiAgICAvLyB0cmVhdCB0ZXN0IHRhcmdldCBhcyBhcnJheSBvZiBmaWxlcy5cbiAgICB0ZXN0VGFyZ2V0LmZvckVhY2goZmlsZSA9PiB7XG4gICAgICBtb2NoYS5hZGRGaWxlKGZpbGUpXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICAvLyBzaW5nbGUgdGVzdCBmaWxlIHBhdGhcbiAgICBtb2NoYS5hZGRGaWxlKHRlc3RQYXRoKVxuICB9XG5cbiAgLy8gUnVuIHRlc3RzLlxuICB0cnkge1xuICAgIGlmIChzaG91bGREZWJ1Z2dlcikge1xuICAgICAgc3VicHJvY2Vzc0luc3BlY3RvcigpXG4gICAgICAvLyBkZWJ1Z2dlciAvLyBXaGVuIHVzaW5nIHJ1bnRpbWUgaW5zcGVjdG9yIEFQSSwgdGhlIGJyZWFrcG9pbnRzIGluIFZTQ29kZSB3b24ndCBiZSByZWNvZ25pemVkIHdpdGhvdXQgYnJlYWtpbmcgKFVwZGF0ZWQgLSB0aGlzIGlzIG5vIGxvbmdlciB0cnVlLCBhcyBWU0NvZGUgbGF0ZXN0IHJlbGVhc2Ugc2VlbXMgdG8gZml4IHRoaXMgaXNzdWUpLlxuICAgIH1cbiAgICBtb2NoYS5ydW4oZXJyb3IgPT4ge1xuICAgICAgLy8gZXhpdCB3aXRoIG5vbi16ZXJvIHN0YXR1cyBpZiB0aGVyZSB3ZXJlIGZhaWx1cmVzXG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgLy8gbW9jaGEgaGFuZGxlcyBwcmludGluZyBlcnJvciBtZXNzYWdlLlxuICAgICAgICAvLyB0aHJvdyBlcnJvclxuICAgICAgfVxuICAgICAgLy8gcHJvY2Vzcy5leGl0KClcbiAgICB9KVxuICAgIC8vIC5vbigndGVzdCcsIGZ1bmN0aW9uKHRlc3QpIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ1Rlc3Qgc3RhcnRlZDogJyt0ZXN0LnRpdGxlKTtcbiAgICAvLyB9KVxuICAgIC8vIC5vbigndGVzdCBlbmQnLCBmdW5jdGlvbih0ZXN0KSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdUZXN0IGRvbmU6ICcrdGVzdC50aXRsZSk7XG4gICAgLy8gfSlcbiAgICAvLyAub24oJ3Bhc3MnLCBmdW5jdGlvbih0ZXN0KSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdUZXN0IHBhc3NlZCcpO1xuICAgIC8vICAgICBjb25zb2xlLmxvZyh0ZXN0KTtcbiAgICAvLyB9KVxuICAgIC8vIC5vbignZmFpbCcsIGZ1bmN0aW9uKHRlc3QsIGVycikge1xuICAgIC8vICAgICBjb25zb2xlLmxvZygnVGVzdCBmYWlsJyk7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHRlc3QpO1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIC8vIH0pXG4gICAgLy8gLm9uKCdlbmQnLCBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ0FsbCBkb25lJyk7XG4gICAgLy8gfSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmdyb3VwKGDimqAgRXJyb3Igd2hpbGUgcnVubmluZyBNb2NoYSB0ZXN0OmApXG4gICAgY29uc29sZS5sb2coZXJyb3IpXG4gICAgY29uc29sZS5ncm91cEVuZCgpXG4gICAgY29uc29sZS5sb2coJ1xcbicpXG4gICAgLy8gdGhyb3cgZXJyb3JcbiAgfVxufVxuIl19