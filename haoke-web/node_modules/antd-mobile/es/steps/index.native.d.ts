/// <reference types="react" />
import React from 'react';
import { LayoutChangeEvent } from 'react-native';
import { StepsPropsType } from './PropsType';
import { IStepsStyle } from './style/index.native';
export interface StepsProps extends StepsPropsType {
    direction?: 'vertical' | 'horizontal';
    size?: string;
    finishIcon?: string;
    styles?: any;
    children: React.ReactElement<any>[];
}
export interface StepsNativeProps extends StepsProps {
    styles?: IStepsStyle;
}
export default class Steps extends React.Component<StepsNativeProps, any> {
    static Step: any;
    static defaultProps: {
        direction: string;
        styles: any;
    };
    constructor(props: StepsNativeProps);
    onLayout: (e: LayoutChangeEvent) => void;
    render(): JSX.Element;
}
