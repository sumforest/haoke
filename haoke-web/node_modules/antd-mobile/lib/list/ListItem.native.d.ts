/// <reference types="react" />
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { BriefProps as BriefBasePropsType, ListItemPropsType } from './PropsType';
export interface ListItemProps extends ListItemPropsType {
    styles?: {
        underlayColor: {};
        Content: {};
        column: {};
        Extra: {};
        Arrow: {};
        ArrowV: {};
        Item: {};
        Thumb: {};
        multipleThumb: {};
        Line: {};
        multipleLine: {};
    };
    onClick?: () => void;
    onPressIn?: () => void;
    onPressOut?: () => void;
    style?: StyleProp<ViewStyle>;
}
export interface BriefProps extends BriefBasePropsType {
    styles?: {
        Brief: {};
        BriefText: {};
    };
}
export declare class Brief extends React.Component<BriefProps, any> {
    static defaultProps: {
        styles: any;
    };
    render(): JSX.Element;
}
export default class Item extends React.Component<ListItemProps, any> {
    static defaultProps: Partial<ListItemProps>;
    static Brief: typeof Brief;
    render(): JSX.Element;
}
