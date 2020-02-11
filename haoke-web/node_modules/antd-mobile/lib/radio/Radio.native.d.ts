/// <reference types="react" />
import React from 'react';
import { ImageStyle, StyleProp } from 'react-native';
import { RadioPropsType } from './PropsType';
import { IRadioStyle } from './style/index.native';
export interface RadioNativeProps extends RadioPropsType {
    styles?: IRadioStyle;
    style?: StyleProp<ImageStyle>;
}
export default class Radio extends React.Component<RadioNativeProps, any> {
    static RadioItem: any;
    static defaultProps: {
        styles: any;
    };
    constructor(props: RadioNativeProps, context: any);
    componentWillReceiveProps(nextProps: RadioNativeProps): void;
    handleClick: () => void;
    render(): JSX.Element;
}
