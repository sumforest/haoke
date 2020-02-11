/// <reference types="react" />
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { BadgePropsTypes } from './PropsType';
import { IBadgeStyle } from './style/index.native';
export interface BadgeNativeProps extends BadgePropsTypes {
    styles?: IBadgeStyle;
    style?: StyleProp<ViewStyle>;
}
export default class Badge extends React.Component<BadgeNativeProps, any> {
    static defaultProps: {
        size: string;
        overflowCount: number;
        dot: boolean;
        corner: boolean;
        styles: any;
    };
    render(): JSX.Element;
}
