/// <reference types="react" />
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SegmentedControlPropsType } from './PropsType';
export interface SegmentedControlProps extends SegmentedControlPropsType {
    styles?: any;
    style?: StyleProp<ViewStyle>;
}
export default class SegmentedControl extends React.Component<SegmentedControlProps, any> {
    static defaultProps: {
        tintColor: string;
        selectedIndex: number;
    };
    render(): JSX.Element;
}
