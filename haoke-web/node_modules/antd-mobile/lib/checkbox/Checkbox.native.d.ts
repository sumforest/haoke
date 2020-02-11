/// <reference types="react" />
import React from 'react';
import { ImageStyle, StyleProp } from 'react-native';
import { CheckboxPropsType } from './PropsType';
import { ICheckboxStyle } from './style/index.native';
export interface ICheckboxNativeProps extends CheckboxPropsType {
    styles?: ICheckboxStyle;
    style?: StyleProp<ImageStyle>;
}
export default class Checkbox extends React.Component<ICheckboxNativeProps, any> {
    static CheckboxItem: any;
    static AgreeItem: any;
    static defaultProps: {
        styles: any;
    };
    constructor(props: CheckboxPropsType, context: any);
    componentWillReceiveProps(nextProps: CheckboxPropsType): void;
    handleClick: () => void;
    render(): JSX.Element;
}
