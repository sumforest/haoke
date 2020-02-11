/// <reference types="react" />
import React from 'react';
import { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';
import { ProgressPropsType } from './PropsType';
export interface ProgressProps extends ProgressPropsType {
    wrapWidth?: number;
    styles?: any;
    style?: StyleProp<ViewStyle>;
    barStyle?: StyleProp<ViewStyle>;
}
export default class Progress extends React.Component<ProgressProps, any> {
    static defaultProps: {
        percent: number;
        position: string;
        unfilled: boolean;
        appearTransition: boolean;
        styles: any;
    };
    constructor(props: ProgressProps);
    componentWillReceiveProps(nextProps: ProgressProps): void;
    componentDidMount(): void;
    onLayout: (e: LayoutChangeEvent) => void;
    normalPercent: (percent?: number | undefined) => any;
    getWidth: (percent?: number | undefined) => number;
    render(): JSX.Element;
}
