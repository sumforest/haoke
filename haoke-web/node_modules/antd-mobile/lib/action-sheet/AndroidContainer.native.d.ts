/// <reference types="react" />
import React from 'react';
import { ActionSheetIOSOptions } from 'react-native';
import { ActionSheetStyle } from './style/index.native';
export interface ActionSheetNativeProps {
    onAnimationEnd?: (visible: boolean) => void;
    visible?: boolean;
    config: ActionSheetIOSOptions;
    callback?: (index: number) => void;
    styles?: ActionSheetStyle;
}
declare class ActionSheetAndroid extends React.Component<ActionSheetNativeProps, any> {
    constructor(props: ActionSheetNativeProps);
    confirm(index: number): void;
    close: () => void;
    render(): JSX.Element;
}
export default ActionSheetAndroid;
