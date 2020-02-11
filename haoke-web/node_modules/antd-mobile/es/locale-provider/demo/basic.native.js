import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { View } from 'react-native';
import { Pagination, LocaleProvider, List, DatePicker, WhiteSpace, WingBlank, Picker, SearchBar } from 'antd-mobile';
import enUS from '../en_US';
import ruRU from '../ru_RU';
var maxDate = new Date(2018, 11, 3, 22, 0);
var minDate = new Date(2015, 7, 6, 8, 30);
var seasons = [[{
    label: '2013',
    value: '2013'
}, {
    label: '2014',
    value: '2014'
}], [{
    label: '春',
    value: '春'
}, {
    label: '夏',
    value: '夏'
}]];
var Page = function Page() {
    return React.createElement(
        View,
        null,
        React.createElement(Pagination, { total: 5, current: 1 }),
        React.createElement(WhiteSpace, null),
        React.createElement(
            List,
            { style: { backgroundColor: 'white' } },
            React.createElement(
                DatePicker,
                { mode: 'date', title: 'Select date', minDate: minDate, maxDate: maxDate },
                React.createElement(
                    List.Item,
                    { arrow: 'horizontal' },
                    'DatePicker'
                )
            ),
            React.createElement(
                Picker,
                { data: seasons, cascade: false },
                React.createElement(
                    List.Item,
                    { arrow: 'horizontal' },
                    'picker'
                )
            ),
            React.createElement(WhiteSpace, null),
            React.createElement(SearchBar, { placeholder: 'Search', showCancelButton: true })
        )
    );
};

var LocaleProviderExample = function (_React$Component) {
    _inherits(LocaleProviderExample, _React$Component);

    function LocaleProviderExample(props) {
        _classCallCheck(this, LocaleProviderExample);

        var _this = _possibleConstructorReturn(this, (LocaleProviderExample.__proto__ || Object.getPrototypeOf(LocaleProviderExample)).call(this, props));

        _this.onChange = function (value) {
            _this.setState({
                locale: value[0]
            });
        };
        _this.state = {
            locale: 'English'
        };
        return _this;
    }

    _createClass(LocaleProviderExample, [{
        key: 'render',
        value: function render() {
            var locale = this.state.locale;

            var languages = [{
                value: '中国',
                label: '中国',
                language: undefined
            }, {
                value: 'English',
                label: 'English',
                language: enUS
            }, {
                value: 'Русский',
                label: 'Русский',
                language: ruRU
            }];
            var currentLocale = languages.find(function (item) {
                return item.value === locale;
            }).language;
            return React.createElement(
                WingBlank,
                null,
                React.createElement(
                    Picker,
                    { data: languages, onChange: this.onChange, cols: 1, value: [locale] },
                    React.createElement(
                        List.Item,
                        { arrow: 'horizontal' },
                        'Choose language'
                    )
                ),
                React.createElement(WhiteSpace, null),
                React.createElement(
                    LocaleProvider,
                    { locale: currentLocale },
                    React.createElement(Page, null)
                )
            );
        }
    }]);

    return LocaleProviderExample;
}(React.Component);

export default LocaleProviderExample;