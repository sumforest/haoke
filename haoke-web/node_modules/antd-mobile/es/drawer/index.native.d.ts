/// <reference types="react" />
import React from 'react';
import DrawerLayout from 'react-native-drawer-layout';
import { DrawerProps } from './PropsType';
export interface DrawerNativeProps extends DrawerProps {
    drawerRef?: (el: DrawerLayout | null) => void;
    drawerWidth?: number;
    drawerBackgroundColor?: string;
}
export default class Drawer extends React.Component<DrawerNativeProps, any> {
    static defaultProps: {
        position: string;
        open: boolean;
        drawerWidth: number;
    };
    drawer: DrawerLayout | null;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: DrawerNativeProps): void;
    onOpenChange(isOpen: boolean): void;
    render(): JSX.Element;
}
