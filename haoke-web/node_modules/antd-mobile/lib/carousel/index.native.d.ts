/// <reference types="react" />
import React from 'react';
import { LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';
import { CarouselPropsType } from './PropsType';
export interface CarouselProps extends CarouselPropsType {
    bounces?: boolean;
    onScrollBeginDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>, state: CarouselState, carousel: Carousel) => void;
    onMomentumScrollEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>, state: CarouselState, carousel: Carousel) => void;
    styles?: any;
    style?: StyleProp<ViewStyle>;
    dotStyle?: StyleProp<ViewStyle>;
    dotActiveStyle?: StyleProp<ViewStyle>;
    pagination?: (props: PaginationProps) => React.ReactNode;
    afterChange?: (index: number) => void;
}
export interface CarouselOffset {
    x: number;
    y: number;
}
export interface CarouselState {
    width: number;
    selectedIndex: number;
    isScrolling: boolean;
    autoplayEnd: boolean;
    loopJump: boolean;
    offset: CarouselOffset;
}
export interface PaginationProps {
    styles: any;
    vertical?: boolean;
    current: number;
    count: number;
    dotStyle?: StyleProp<ViewStyle>;
    dotActiveStyle?: StyleProp<ViewStyle>;
}
declare class Carousel extends React.Component<CarouselProps, CarouselState> {
    static defaultProps: CarouselProps;
    private scrollviewRef;
    private autoplayTimer;
    private androidScrollEndTimer;
    private scrollEndTimter;
    constructor(props: CarouselProps);
    getChildrenCount: (children: React.ReactNode) => number;
    componentDidMount(): void;
    componentWillUnmount(): void;
    loopJump: () => void;
    autoplay: () => void;
    onScrollBegin: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onScrollEnd: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onScrollEndDrag: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
    updateIndex: (offset: CarouselOffset) => void;
    scrollNextPage: () => void;
    renderContent: (pages: React.ReactNode) => JSX.Element;
    renderDots: (index: number) => React.ReactNode;
    onLayout: (e: LayoutChangeEvent) => void;
    render(): JSX.Element;
}
export default Carousel;
