/// <reference types="react" />
import PropTypes from 'prop-types';
import React from 'react';
import { StyleProp, TextInput, TextStyle } from 'react-native';
import { SearchBarPropsType, SearchBarState } from './PropsType';
import { ISearchBarStyle } from './style/index.native';
export interface SearchBarNativeProps extends SearchBarPropsType {
    styles: ISearchBarStyle;
    onChangeText?: (text: string) => void;
    onSubmitEditing?: (event: {
        nativeEvent: {
            text: string;
        };
    }) => void;
    style?: StyleProp<TextStyle>;
}
export default class SearchBar extends React.Component<SearchBarNativeProps, SearchBarState> {
    static defaultProps: {
        styles: any;
        prefixCls: string;
        placeholder: string;
        onSubmit: () => void;
        onChange: () => void;
        onFocus: () => void;
        onBlur: () => void;
        onClear: () => void;
        showCancelButton: boolean;
        disabled: boolean;
    };
    static contextTypes: {
        antLocale: PropTypes.Requireable<any>;
    };
    inputRef: TextInput | null;
    constructor(props: SearchBarNativeProps);
    componentWillReceiveProps(nextProps: SearchBarNativeProps): void;
    onSubmit: (_: {
        nativeEvent: {
            text: string;
        };
    }) => void;
    onChangeText: (value: string) => void;
    onCancel: () => void;
    onFocus: () => void;
    onBlur: () => void;
    render(): JSX.Element;
}
