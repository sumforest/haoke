/// <reference types="react" />
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { IconPropsType } from './PropsType';
export interface IconProps extends IconPropsType {
    style?: StyleProp<ViewStyle>;
    size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | number;
}
export default class Icon extends React.Component<IconProps, any> {
    static defaultProps: {
        size: string;
        color: string;
    };
    render(): JSX.Element;
}
