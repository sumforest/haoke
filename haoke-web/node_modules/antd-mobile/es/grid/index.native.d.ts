/// <reference types="react" />
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { GridPropsType } from './PropsType';
export interface GridProps extends GridPropsType {
    styles?: any;
    itemStyle?: StyleProp<ViewStyle>;
}
export default class Grid extends React.Component<GridProps, any> {
    static defaultProps: {
        data: never[];
        hasLine: boolean;
        isCarousel: boolean;
        columnNum: number;
        carouselMaxRow: number;
        styles: any;
        itemStyle: {};
    };
    getFlexItemStyle(): {
        height: number;
        borderRightWidth: number;
    };
    render(): JSX.Element;
}
