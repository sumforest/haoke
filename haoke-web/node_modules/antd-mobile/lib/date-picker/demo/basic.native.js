'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _antdMobile = require('antd-mobile');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// const now = new Date();
var PopupExample = function (_React$Component) {
    (0, _inherits3['default'])(PopupExample, _React$Component);

    function PopupExample(props) {
        (0, _classCallCheck3['default'])(this, PopupExample);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (PopupExample.__proto__ || Object.getPrototypeOf(PopupExample)).call(this, props));

        _this.onChange = function (value) {
            _this.setState({ value: value });
        };
        _this.state = {
            value: undefined
        };
        return _this;
    }

    (0, _createClass3['default'])(PopupExample, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                _reactNative.View,
                null,
                _react2['default'].createElement(
                    _antdMobile.List,
                    null,
                    _react2['default'].createElement(
                        _antdMobile.DatePicker,
                        { value: this.state.value, mode: 'date', minDate: new Date(2015, 7, 6), maxDate: new Date(2026, 11, 3), onChange: this.onChange, format: 'YYYY-MM-DD' },
                        _react2['default'].createElement(
                            _antdMobile.List.Item,
                            { arrow: 'horizontal' },
                            'Select Date'
                        )
                    )
                )
            );
        }
    }]);
    return PopupExample;
}(_react2['default'].Component); // tslint:disable:jsx-no-multiline-js
/* tslint:disable:no-console */


exports['default'] = PopupExample;
module.exports = exports['default'];