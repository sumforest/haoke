/// <reference types="react" />
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ResultPropsType } from './PropsType';
import { IResultStyle } from './style/index.native';
export interface ResultNativeProps extends ResultPropsType {
    styles?: IResultStyle;
    style?: StyleProp<ViewStyle>;
}
export default class Result extends React.Component<ResultNativeProps, any> {
    static defaultProps: {
        styles: any;
        buttonType: string;
        buttonClick: () => void;
    };
    render(): JSX.Element;
}
