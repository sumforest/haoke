'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AgreeItem = require('./AgreeItem.native');

var _AgreeItem2 = _interopRequireDefault(_AgreeItem);

var _Checkbox = require('./Checkbox.native');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _CheckboxItem = require('./CheckboxItem.native');

var _CheckboxItem2 = _interopRequireDefault(_CheckboxItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_Checkbox2['default'].AgreeItem = _AgreeItem2['default'];
_Checkbox2['default'].CheckboxItem = _CheckboxItem2['default'];
exports['default'] = _Checkbox2['default'];
module.exports = exports['default'];