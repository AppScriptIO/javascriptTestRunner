"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");


var _mocha = require("../mocha");
var _assert = _interopRequireDefault(require("assert"));
var _consoleLogOverwrite = require("../utility/consoleLogOverwrite.js");

(0, _consoleLogOverwrite.consoleLogOverwrite)();

(0, _assert.default)(process.argv[2], '• Must pass command arguments to run Mocha cli script.');
let args = JSON.parse(process.argv[2]);
(0, _mocha.runMocha)(...args);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NvdXJjZS90ZXN0UnVubmVyL2NsaWVudEludGVyZmFjZS9tb2NoYVN1YnByb2Nlc3NDbGkuanMiXSwibmFtZXMiOlsicHJvY2VzcyIsImFyZ3YiLCJhcmdzIiwiSlNPTiIsInBhcnNlIl0sIm1hcHBpbmdzIjoiOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEscUJBQU9BLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLENBQWIsQ0FBUCxFQUF3Qix3REFBeEI7QUFDQSxJQUFJQyxJQUFJLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXSixPQUFPLENBQUNDLElBQVIsQ0FBYSxDQUFiLENBQVgsQ0FBWDtBQUNBLHFCQUFTLEdBQUdDLElBQVoiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEludGVyZmFjZSBmb3IgcnVubmluZyBtb2NoYSBmdW5jdGlvbiB0aHJvdWdoIGNoaWxkcHJvY2Vzcy5zcGF3biBhcGkgKGFzIGl0IGFsbG93cyBvbmx5IGEgbW9kdWxlIHBhdGggdG8gYmUgcGFzc2VkIGFzIHBhcmFtZXRlcikuXG4gKi9cbmltcG9ydCB7IHJ1bk1vY2hhIH0gZnJvbSAnLi4vbW9jaGEnXG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCdcbmltcG9ydCB7IGNvbnNvbGVMb2dPdmVyd3JpdGUgfSBmcm9tICcuLi91dGlsaXR5L2NvbnNvbGVMb2dPdmVyd3JpdGUuanMnXG5cbmNvbnNvbGVMb2dPdmVyd3JpdGUoKVxuXG5hc3NlcnQocHJvY2Vzcy5hcmd2WzJdLCAn4oCiIE11c3QgcGFzcyBjb21tYW5kIGFyZ3VtZW50cyB0byBydW4gTW9jaGEgY2xpIHNjcmlwdC4nKVxubGV0IGFyZ3MgPSBKU09OLnBhcnNlKHByb2Nlc3MuYXJndlsyXSlcbnJ1bk1vY2hhKC4uLmFyZ3MpXG4iXX0=