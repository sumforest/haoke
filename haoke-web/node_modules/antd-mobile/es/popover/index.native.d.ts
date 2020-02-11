/// <reference types="react" />
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { PopoverPropsType } from './PropsType';
export interface PopoverProps extends PopoverPropsType {
    style?: StyleProp<ViewStyle>;
    triggerStyle?: StyleProp<ViewStyle>;
    overlayStyle?: StyleProp<ViewStyle>;
    contextStyle?: StyleProp<ViewStyle>;
    renderOverlayComponent?: (values: any) => JSX.Element;
    name?: string;
}
export default class Popover extends React.Component<PopoverProps, any> {
    static defaultProps: {
        onSelect: () => void;
    };
    static Item: any;
    menuContextRef: any;
    render(): JSX.Element;
}
