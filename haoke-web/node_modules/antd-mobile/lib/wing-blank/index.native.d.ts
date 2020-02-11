/// <reference types="react" />
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { WingBlankPropsType } from './PropsType';
export interface WingBlankProps extends WingBlankPropsType {
    style?: StyleProp<ViewStyle>;
}
declare class WingBlank extends React.Component<WingBlankProps, any> {
    static defaultProps: {
        size: string;
    };
    render(): JSX.Element;
}
export default WingBlank;
