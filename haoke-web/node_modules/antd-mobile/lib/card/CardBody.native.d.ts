/// <reference types="react" />
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export interface CardBodyProps {
    styles?: any;
    style?: StyleProp<ViewStyle>;
}
export default class CardBody extends React.Component<CardBodyProps, any> {
    static defaultProps: {
        style: {};
    };
    render(): JSX.Element;
}
