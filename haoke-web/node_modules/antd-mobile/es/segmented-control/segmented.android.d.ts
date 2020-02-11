/// <reference types="react" />
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SegmentedControlPropsType } from './PropsType';
import { ISegmentControlStyle } from './style/index.native';
export interface SegmentControlNativeProps extends SegmentedControlPropsType {
    styles?: ISegmentControlStyle;
    style?: StyleProp<ViewStyle>;
}
export default class SegmentedControl extends React.Component<SegmentControlNativeProps, any> {
    static defaultProps: {
        selectedIndex: number;
        disabled: boolean;
        values: never[];
        onChange(): void;
        onValueChange(): void;
        tintColor: string;
        style: {};
        styles: any;
    };
    constructor(props: SegmentControlNativeProps);
    componentWillReceiveProps(nextProps: SegmentControlNativeProps): void;
    onPress(e: any, index: number, value: string): void;
    render(): JSX.Element;
}
