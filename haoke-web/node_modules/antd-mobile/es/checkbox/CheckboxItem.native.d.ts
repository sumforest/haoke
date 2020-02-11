/// <reference types="react" />
import React from 'react';
import { ImageStyle, StyleProp, ViewStyle } from 'react-native';
import { CheckboxItemPropsType } from './PropsType';
import { ICheckboxStyle } from './style/index.native';
export interface ICheckboxItemNativeProps extends CheckboxItemPropsType {
    styles?: ICheckboxStyle;
    checkboxStyle?: StyleProp<ImageStyle>;
    style?: StyleProp<ViewStyle>;
}
export default class CheckboxItem extends React.Component<ICheckboxItemNativeProps, any> {
    static defaultProps: {
        styles: any;
    };
    handleClick: () => void;
    render(): JSX.Element;
}
