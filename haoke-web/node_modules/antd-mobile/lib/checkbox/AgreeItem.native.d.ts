/// <reference types="react" />
import React from 'react';
import { ImageStyle, StyleProp, ViewStyle } from 'react-native';
import { CheckboxPropsType } from './PropsType';
import { ICheckboxStyle } from './style/index.native';
export interface AgreeItemNativeProps extends CheckboxPropsType {
    styles?: ICheckboxStyle;
    checkboxStyle?: StyleProp<ImageStyle>;
    style?: StyleProp<ViewStyle>;
}
export default class AgreeItem extends React.Component<AgreeItemNativeProps, any> {
    static defaultProps: {
        styles: any;
    };
    handleClick: () => void;
    render(): JSX.Element;
}
