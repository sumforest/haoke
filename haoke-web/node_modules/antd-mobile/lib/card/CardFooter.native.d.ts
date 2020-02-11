/// <reference types="react" />
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { CardFooterPropsType } from './PropsType';
export interface CardFooterProps extends CardFooterPropsType {
    styles?: any;
    style?: StyleProp<ViewStyle>;
}
export default class CardFooter extends React.Component<CardFooterProps, any> {
    static defaultProps: {
        style: {};
    };
    render(): JSX.Element;
}
