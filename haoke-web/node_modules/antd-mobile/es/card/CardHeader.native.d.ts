/// <reference types="react" />
import React from 'react';
import { ImageStyle, StyleProp, ViewStyle } from 'react-native';
import { CardHeaderPropsType } from './PropsType';
export interface CardHeaderProps extends CardHeaderPropsType {
    styles?: any;
    style?: StyleProp<ViewStyle>;
    thumbStyle?: StyleProp<ImageStyle>;
}
export default class CardHeader extends React.Component<CardHeaderProps, any> {
    static defaultProps: {
        thumbStyle: {};
        style: {};
    };
    render(): JSX.Element;
}
