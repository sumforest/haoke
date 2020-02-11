/// <reference types="react" />
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styles from 'rmc-input-number/lib/styles';
import { StepPropsType } from './PropsType';
export interface StepProps extends StepPropsType {
    styles?: typeof styles;
    style?: StyleProp<ViewStyle>;
}
export default class Stepper extends React.Component<StepProps, any> {
    static defaultProps: StepProps;
    render(): JSX.Element;
}
