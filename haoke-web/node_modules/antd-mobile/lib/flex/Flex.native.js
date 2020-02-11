'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var Flex = function (_React$Component) {
    (0, _inherits3['default'])(Flex, _React$Component);

    function Flex() {
        (0, _classCallCheck3['default'])(this, Flex);
        return (0, _possibleConstructorReturn3['default'])(this, (Flex.__proto__ || Object.getPrototypeOf(Flex)).apply(this, arguments));
    }

    (0, _createClass3['default'])(Flex, [{
        key: 'render',
        value: function render() {
            var _a = this.props,
                style = _a.style,
                direction = _a.direction,
                wrap = _a.wrap,
                justify = _a.justify,
                align = _a.align,
                children = _a.children,
                restProps = __rest(_a, ["style", "direction", "wrap", "justify", "align", "children"]);
            var transferConst = [justify, align];
            var transferConstStyle = transferConst.map(function (el) {
                var tempTxt = void 0;
                switch (el) {
                    case 'start':
                        tempTxt = 'flex-start';
                        break;
                    case 'end':
                        tempTxt = 'flex-end';
                        break;
                    case 'between':
                        tempTxt = 'space-between';
                        break;
                    case 'around':
                        tempTxt = 'space-around';
                        break;
                    default:
                        tempTxt = el;
                        break;
                }
                return tempTxt;
            });
            var flexStyle = {
                flexDirection: direction,
                flexWrap: wrap,
                justifyContent: transferConstStyle[0],
                alignItems: transferConstStyle[1]
            };
            var inner = _react2['default'].createElement(
                _reactNative.View,
                (0, _extends3['default'])({ style: [flexStyle, style] }, restProps),
                children
            );
            var shouldWrapInTouchableComponent = restProps.onPress || restProps.onLongPress || restProps.onPressIn || restProps.onPressOut;
            if (!!shouldWrapInTouchableComponent) {
                return _react2['default'].createElement(
                    _reactNative.TouchableWithoutFeedback,
                    restProps,
                    inner
                );
            } else {
                return inner;
            }
        }
    }]);
    return Flex;
}(_react2['default'].Component);

exports['default'] = Flex;

Flex.defaultProps = {
    direction: 'row',
    wrap: 'nowrap',
    justify: 'start',
    align: 'center'
};
module.exports = exports['default'];