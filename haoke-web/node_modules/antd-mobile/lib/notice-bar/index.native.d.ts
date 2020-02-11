/// <reference types="react" />
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { MarqueeProps } from './Marquee.native';
import { NoticeBarPropsType } from './PropsType';
import { INoticeBarStyle } from './style/index.native';
export interface NoticeNativeProps extends NoticeBarPropsType {
    styles?: INoticeBarStyle;
    marqueeProps?: MarqueeProps;
    style?: StyleProp<ViewStyle>;
}
export default class NoticeBar extends React.Component<NoticeNativeProps, any> {
    static defaultProps: {
        mode: string;
        onClick(): void;
        icon: JSX.Element;
        styles: any;
    };
    constructor(props: NoticeNativeProps);
    onClick: () => void;
    render(): JSX.Element | null;
}
