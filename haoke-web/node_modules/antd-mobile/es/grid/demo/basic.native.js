import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { Grid } from 'antd-mobile';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
var data = Array.from(new Array(9)).map(function (_val, i) {
  return {
    icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
    text: 'Name' + i
  };
});

var BasicGridExample = function (_React$Component) {
  _inherits(BasicGridExample, _React$Component);

  function BasicGridExample() {
    _classCallCheck(this, BasicGridExample);

    return _possibleConstructorReturn(this, (BasicGridExample.__proto__ || Object.getPrototypeOf(BasicGridExample)).apply(this, arguments));
  }

  _createClass(BasicGridExample, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        ScrollView,
        null,
        React.createElement(
          View,
          { style: [{ margin: 10 }] },
          React.createElement(
            Text,
            null,
            'Simple'
          )
        ),
        React.createElement(
          View,
          { style: [{ padding: 10 }] },
          React.createElement(Grid, { data: data, hasLine: false })
        ),
        React.createElement(
          View,
          { style: [{ margin: 10 }] },
          React.createElement(
            Text,
            null,
            'Carousel'
          )
        ),
        React.createElement(Grid, { data: data, columnNum: 3, isCarousel: true, onClick: function onClick(_el, index) {
            return alert(index);
          } }),
        React.createElement(
          View,
          { style: [{ margin: 10 }] },
          React.createElement(
            Text,
            null,
            'Custom GridCell Style'
          )
        ),
        React.createElement(Grid, { data: data, columnNum: 3, itemStyle: { height: 150, backgroundColor: '#ffff00' } })
      );
    }
  }]);

  return BasicGridExample;
}(React.Component);

export default BasicGridExample;