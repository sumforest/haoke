/// <reference types="react" />
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { AccordionPropsTypes } from './PropsType';
import { AccordionStyle } from './style/index.native';
export interface AccordionPanelProps {
    key?: string;
    header: any;
}
export interface AccordionNativeProps extends AccordionPropsTypes {
    styles?: AccordionStyle;
    style?: StyleProp<ViewStyle>;
}
export interface AccordionHeader {
    title: string;
    content: React.ReactElement<any>;
    style: StyleProp<ViewStyle>;
}
declare class Accordion extends React.Component<AccordionNativeProps, any> {
    static defaultProps: {
        styles: any;
    };
    static Panel: any;
    renderHeader: (section: AccordionHeader, _: number, isActive: boolean) => JSX.Element;
    renderContent: (section: AccordionHeader) => JSX.Element;
    onChange: (idx: number) => void;
    render(): JSX.Element;
}
export default Accordion;
