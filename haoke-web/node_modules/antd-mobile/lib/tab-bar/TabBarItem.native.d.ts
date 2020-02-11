/// <reference types="react" />
import React from 'react';
import { ImageRequireSource, ImageStyle, ImageURISource, StyleProp } from 'react-native';
export interface TabBarItemProps {
    badge?: string | number;
    onPress?: () => void;
    selected?: boolean;
    icon?: ImageURISource | ImageURISource[] | ImageRequireSource;
    selectedIcon?: ImageURISource | ImageURISource[] | ImageRequireSource;
    title: string;
    tintColor?: string;
    unselectedTintColor?: string;
    iconStyle?: StyleProp<ImageStyle>;
    renderAsOriginal?: boolean;
    styles?: any;
}
export default class TabBarItem extends React.Component<TabBarItemProps, any> {
    static defaultProps: {
        onPress(): void;
    };
    render(): JSX.Element;
}
