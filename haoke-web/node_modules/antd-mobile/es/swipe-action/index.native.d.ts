/// <reference types="react" />
import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { SwipeActionPropsType } from './PropsType';
export interface SwipeActionProps extends SwipeActionPropsType<TextStyle> {
    styles?: any;
    style?: StyleProp<ViewStyle>;
}
declare class SwipeAction extends React.Component<SwipeActionProps, any> {
    render(): JSX.Element;
}
export default SwipeAction;
