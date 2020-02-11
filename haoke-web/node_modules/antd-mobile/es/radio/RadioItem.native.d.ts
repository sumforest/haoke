/// <reference types="react" />
import React from 'react';
import { ImageStyle, StyleProp, ViewStyle } from 'react-native';
import { RadioItemPropsType } from './PropsType';
import { IRadioStyle } from './style/index.native';
export interface RadioItemNativeProps extends RadioItemPropsType {
    styles?: IRadioStyle;
    style?: StyleProp<ViewStyle>;
    radioStyle?: StyleProp<ImageStyle>;
}
export default class RadioItem extends React.Component<RadioItemNativeProps, any> {
    static defaultProps: {
        styles: any;
    };
    handleClick: () => void;
    render(): JSX.Element;
}
