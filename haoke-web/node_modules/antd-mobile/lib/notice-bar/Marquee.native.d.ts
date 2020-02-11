/// <reference types="react" />
import React from 'react';
import { LayoutChangeEvent, StyleProp, TextStyle } from 'react-native';
export interface MarqueeProps {
    text: React.ReactNode;
    loop?: boolean;
    leading?: number;
    trailing?: number;
    className?: string;
    fps?: number;
    style?: StyleProp<TextStyle>;
    maxWidth?: number;
}
declare class Marquee extends React.PureComponent<MarqueeProps, any> {
    static defaultProps: {
        text: string;
        loop: boolean;
        leading: number;
        trailing: number;
        fps: number;
        maxWidth: number;
    };
    texts: any;
    twidth: number;
    width: number;
    constructor(props: MarqueeProps);
    onLayout: (e: LayoutChangeEvent) => void;
    tryStart(): void;
    onLayoutContainer: (e: LayoutChangeEvent) => void;
    startMove: () => void;
    moveToHeader: () => void;
    render(): JSX.Element;
}
export default Marquee;
