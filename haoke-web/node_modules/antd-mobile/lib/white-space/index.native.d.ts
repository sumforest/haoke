/// <reference types="react" />
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { WhiteSpacePropsType } from './PropsType';
export interface WhiteSpaceProps extends WhiteSpacePropsType {
    style?: StyleProp<ViewStyle>;
}
declare class WhiteSpace extends React.Component<WhiteSpaceProps, any> {
    static defaultProps: {
        size: string;
    };
    render(): JSX.Element;
}
export default WhiteSpace;
