"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.runTest = runTest;exports.subprocessInspector = subprocessInspector;var _path = _interopRequireDefault(require("path"));



var _nodejsLiveReload = require("@deployment/nodejsLiveReload");


async function runTest({
  targetProject = function (e) {throw e;}(new Error('targetProject must be passed.')),
  shouldCompileTest,
  shouldDebugger = false,
  testFileArray,
  jsFileArray,
  watchFile = false } =
{}) {

  let manageSubprocess = new _nodejsLiveReload.ManageSubprocess({
    cliAdapterPath: _path.default.join(__dirname, '../entrypoint/cli/index.js') });

  manageSubprocess.runInSubprocess({ testTarget: testFileArray, jsFileArray, shouldCompileTest, shouldDebugger, targetProject });

  if (watchFile)
  await (0, _nodejsLiveReload.watchFile)({

    triggerCallback: () => manageSubprocess.runInSubprocess(),

    fileArray: jsFileArray,
    ignoreNodeModules: true,
    logMessage: true });



  return { restart: () => manageSubprocess.runInSubprocess() };
}









function subprocessInspector({ port = 9229, host = 'localhost', shouldbreak = true } = {}) {
  const inspector = require('inspector');
  inspector.open(port, host, shouldbreak);

  process.on('beforeExit', () => {
    setTimeout(() => {}, 1000000000);
  });
  return inspector;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9zY3JpcHQuanMiXSwibmFtZXMiOlsicnVuVGVzdCIsInRhcmdldFByb2plY3QiLCJFcnJvciIsInNob3VsZENvbXBpbGVUZXN0Iiwic2hvdWxkRGVidWdnZXIiLCJ0ZXN0RmlsZUFycmF5IiwianNGaWxlQXJyYXkiLCJ3YXRjaEZpbGUiLCJtYW5hZ2VTdWJwcm9jZXNzIiwiTWFuYWdlU3VicHJvY2VzcyIsImNsaUFkYXB0ZXJQYXRoIiwicGF0aCIsImpvaW4iLCJfX2Rpcm5hbWUiLCJydW5JblN1YnByb2Nlc3MiLCJ0ZXN0VGFyZ2V0IiwidHJpZ2dlckNhbGxiYWNrIiwiZmlsZUFycmF5IiwiaWdub3JlTm9kZU1vZHVsZXMiLCJsb2dNZXNzYWdlIiwicmVzdGFydCIsInN1YnByb2Nlc3NJbnNwZWN0b3IiLCJwb3J0IiwiaG9zdCIsInNob3VsZGJyZWFrIiwiaW5zcGVjdG9yIiwicmVxdWlyZSIsIm9wZW4iLCJwcm9jZXNzIiwib24iLCJzZXRUaW1lb3V0Il0sIm1hcHBpbmdzIjoiNE9BQUE7Ozs7QUFJQTs7O0FBR08sZUFBZUEsT0FBZixDQUF1QjtBQUM1QkMsRUFBQUEsYUFBYSwyQkFBUyxJQUFJQyxLQUFKLENBQVUsK0JBQVYsQ0FBVCxDQURlO0FBRTVCQyxFQUFBQSxpQkFGNEI7QUFHNUJDLEVBQUFBLGNBQWMsR0FBRyxLQUhXO0FBSTVCQyxFQUFBQSxhQUo0QjtBQUs1QkMsRUFBQUEsV0FMNEI7QUFNNUJDLEVBQUFBLFNBQVMsR0FBRyxLQU5nQjtBQU8xQixFQVBHLEVBT0M7O0FBRU4sTUFBSUMsZ0JBQWdCLEdBQUcsSUFBSUMsa0NBQUosQ0FBcUI7QUFDMUNDLElBQUFBLGNBQWMsRUFBRUMsY0FBS0MsSUFBTCxDQUFVQyxTQUFWLEVBQXFCLDRCQUFyQixDQUQwQixFQUFyQixDQUF2Qjs7QUFHQUwsRUFBQUEsZ0JBQWdCLENBQUNNLGVBQWpCLENBQWlDLEVBQUVDLFVBQVUsRUFBRVYsYUFBZCxFQUE2QkMsV0FBN0IsRUFBMENILGlCQUExQyxFQUE2REMsY0FBN0QsRUFBNkVILGFBQTdFLEVBQWpDOztBQUVBLE1BQUlNLFNBQUo7QUFDRSxRQUFNLGlDQUFrQjs7QUFFdEJTLElBQUFBLGVBQWUsRUFBRSxNQUFNUixnQkFBZ0IsQ0FBQ00sZUFBakIsRUFGRDs7QUFJdEJHLElBQUFBLFNBQVMsRUFBRVgsV0FKVztBQUt0QlksSUFBQUEsaUJBQWlCLEVBQUUsSUFMRztBQU10QkMsSUFBQUEsVUFBVSxFQUFFLElBTlUsRUFBbEIsQ0FBTjs7OztBQVVGLFNBQU8sRUFBRUMsT0FBTyxFQUFFLE1BQU1aLGdCQUFnQixDQUFDTSxlQUFqQixFQUFqQixFQUFQO0FBQ0Q7Ozs7Ozs7Ozs7QUFVTSxTQUFTTyxtQkFBVCxDQUE2QixFQUFFQyxJQUFJLEdBQUcsSUFBVCxFQUFlQyxJQUFJLEdBQUcsV0FBdEIsRUFBbUNDLFdBQVcsR0FBRyxJQUFqRCxLQUEwRCxFQUF2RixFQUEyRjtBQUNoRyxRQUFNQyxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXpCO0FBQ0FELEVBQUFBLFNBQVMsQ0FBQ0UsSUFBVixDQUFlTCxJQUFmLEVBQXFCQyxJQUFyQixFQUEyQkMsV0FBM0I7O0FBRUFJLEVBQUFBLE9BQU8sQ0FBQ0MsRUFBUixDQUFXLFlBQVgsRUFBeUIsTUFBTTtBQUM3QkMsSUFBQUEsVUFBVSxDQUFDLE1BQU0sQ0FBRSxDQUFULEVBQVcsVUFBWCxDQUFWO0FBQ0QsR0FGRDtBQUdBLFNBQU9MLFNBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCdcbmltcG9ydCBjaGlsZFByb2Nlc3MgZnJvbSAnY2hpbGRfcHJvY2VzcydcbmltcG9ydCB7IHByb21pc2VzIGFzIGZpbGVzeXN0ZW0gfSBmcm9tICdmcydcbmltcG9ydCB7IHdhdGNoRmlsZSBhcyB3YXRjaEZpbGVGdW5jdGlvbiwgTWFuYWdlU3VicHJvY2VzcyB9IGZyb20gJ0BkZXBsb3ltZW50L25vZGVqc0xpdmVSZWxvYWQnXG4vLyBhd2FpdCBmaWxlc3lzdGVtLmxzdGF0KGZpbGVQYXRoKS50aGVuKHN0YXRPYmplY3QgPT4gc3RhdE9iamVjdC5pc0RpcmVjdG9yeSgpKSAvLyBjaGVjayBpZiBwYXRoIGlzIGEgZGlyZWN0b3J5XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBydW5UZXN0KHtcbiAgdGFyZ2V0UHJvamVjdCA9IHRocm93IG5ldyBFcnJvcigndGFyZ2V0UHJvamVjdCBtdXN0IGJlIHBhc3NlZC4nKSwgLy8gYFByb2plY3QgY2xhc3NgIGluc3RhbmNlIGNyZWF0ZWQgYnkgYHNjcmlwdE1hbmFnZXJgIGZyb20gdGhlIGNvbmZpZ3VyYXRpb24gZmlsZSBvZiB0aGUgdGFyZ2V0IHByb2plY3QuXG4gIHNob3VsZENvbXBpbGVUZXN0LFxuICBzaG91bGREZWJ1Z2dlciA9IGZhbHNlLCAvLyBydW4gaXNwZWN0b3IgZHVyaW5nIHJ1bnRpbWUuXG4gIHRlc3RGaWxlQXJyYXksXG4gIGpzRmlsZUFycmF5LCAvLyB1c2VkIHRvIGNsZWFyIG5vZGVqcyBtb2R1bGUgY2FjaGUgb24gcmVzdGFydFxuICB3YXRjaEZpbGUgPSBmYWxzZSxcbn0gPSB7fSkge1xuICAvLyBzcGlubmluZyBpbiBmb3JrIHByb2Nlc3MgcHJldmVudHMgY29uZmxpY3RzIGJldHdlZW4gdGVzdHMgYW5kIGFsbG93cyB0ZXJtaW5hdGluZyB0aGUgcHJvY2Vzcy5cbiAgbGV0IG1hbmFnZVN1YnByb2Nlc3MgPSBuZXcgTWFuYWdlU3VicHJvY2Vzcyh7XG4gICAgY2xpQWRhcHRlclBhdGg6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi9lbnRyeXBvaW50L2NsaS9pbmRleC5qcycpIC8qbW9jaGEgY2xpIGZvciBydW5uaW5nIHVzaW5nIG5vZGVqcyBzcGF3biBjaGlsZCBwcm9jZXNzIGludGVyZmFjZSAoYWNjZXB0aW5nIG9ubHkgbW9kdWxlIHBhdGhzKSovLFxuICB9KVxuICBtYW5hZ2VTdWJwcm9jZXNzLnJ1bkluU3VicHJvY2Vzcyh7IHRlc3RUYXJnZXQ6IHRlc3RGaWxlQXJyYXksIGpzRmlsZUFycmF5LCBzaG91bGRDb21waWxlVGVzdCwgc2hvdWxkRGVidWdnZXIsIHRhcmdldFByb2plY3QgfSkgLy8gaW5pdGlhbCB0cmlnZ2VyIGFjdGlvbiwgdG8gcnVuIHRlc3QgaW1tZWRpYXRlbHlcblxuICBpZiAod2F0Y2hGaWxlKVxuICAgIGF3YWl0IHdhdGNoRmlsZUZ1bmN0aW9uKHtcbiAgICAgIC8vIHRvIGJlIHJ1biBhZnRlciBmaWxlIG5vdGlmaWNhdGlvblxuICAgICAgdHJpZ2dlckNhbGxiYWNrOiAoKSA9PiBtYW5hZ2VTdWJwcm9jZXNzLnJ1bkluU3VicHJvY2VzcygpLFxuICAgICAgLy8gVE9ETzogbWFrZSBzdXJlIGV4cGxpY2l0bHkgYWRkaW5nIGAuL25vZGVfbW9kdWxlcy9gIGludG8gdGhlIHRoaXMgYXJyYXksIHdpbGwgcHJldmVudCBpdCBmcm9tIGJlaW5nIGlnbm9yZWQuXG4gICAgICBmaWxlQXJyYXk6IGpzRmlsZUFycmF5LFxuICAgICAgaWdub3JlTm9kZU1vZHVsZXM6IHRydWUsXG4gICAgICBsb2dNZXNzYWdlOiB0cnVlLFxuICAgIH0pXG5cbiAgLy8gcmV0dXJuIGZvciBleHRlcm5hbCB3YXRjaCBmaWxlcyB0byBjb250cm9sIHJlc3RhcnRcbiAgcmV0dXJuIHsgcmVzdGFydDogKCkgPT4gbWFuYWdlU3VicHJvY2Vzcy5ydW5JblN1YnByb2Nlc3MoKSB9XG59XG5cbi8qKlxuICogQWxsb3dzIHRvIHVzZSBOb2RlanMgaW5zcGVjdG9yIHdpdGggdGhlIGN1cnJlbnQgd2F5IHRlc3RzIGFyZSBydW4sIHdoZXJlIHRlc3RzIGFyZSBydW4gaW4gc3VicHJvY2Vzc2VzIGFuZCBubyBOb2RlanMgZmxhZ3MgYXJlIHBhc3NlZC5cbiAqIEN1cnJlbnRseSBpdHMgcG9zc2libGUgdG8gdXNlIGluc3BlY3RvciBwcm9ncmFtbWF0aWMgQVBJLCBidXQgdG8gYWxsb3cgbGl2ZXJlbG9hZCBlYWNoIHRlc3Qgc3VicHJvY2VzcyBzaG91bGQgYmUga2VwdCBhbGl2ZSBlLmcuIHVzaW5nIGBzZXRUaW1lb3V0YCB0byBhbGxvdyBmb3IgaW5zcGVjdGluZyBvYmplY3QgdmFsdWVzIGV0Yy5cbiAqIFVzYWdlOlxuICogIC0gZXhlY3V0ZSB0aGlzIGZ1bmN0aW9uIGluIHRoZSB0b3Agb2YgYSB0ZXN0LlxuICogIC0gaW5zZXJ0IGBkZWJ1Z2dlcmAgc3RhdGVtZW50IGluIHRoZSB0ZXN0IGZpbGVzIHRvIGJyZWFrIGFmdGVyIHJlZnJlc2hpbmcgcHJvY2Vzcy5cbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdWJwcm9jZXNzSW5zcGVjdG9yKHsgcG9ydCA9IDkyMjksIGhvc3QgPSAnbG9jYWxob3N0Jywgc2hvdWxkYnJlYWsgPSB0cnVlIH0gPSB7fSkge1xuICBjb25zdCBpbnNwZWN0b3IgPSByZXF1aXJlKCdpbnNwZWN0b3InKVxuICBpbnNwZWN0b3Iub3Blbihwb3J0LCBob3N0LCBzaG91bGRicmVhaylcbiAgLy8gS2VlcCBOb2RlIGFsaXZlIHRvIGFsbG93IGZvciBpbnNwZWN0aW5nIG9iamVjdHMuXG4gIHByb2Nlc3Mub24oJ2JlZm9yZUV4aXQnLCAoKSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7fSwgMTAwMDAwMDAwMClcbiAgfSlcbiAgcmV0dXJuIGluc3BlY3RvclxufVxuIl19