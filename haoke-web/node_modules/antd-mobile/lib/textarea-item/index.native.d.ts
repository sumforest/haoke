/// <reference types="react" />
import React from 'react';
import { TextInputProperties } from 'react-native';
import { TextAreaItemPropsType } from './PropsType';
import { ITextareaItemStyle } from './style/index.native';
import { Omit } from '../_util/types';
export declare type TextInputProps = Omit<TextInputProperties, 'onChange' | 'onFocus' | 'onBlur'>;
export interface TextareaItemNativeProps extends TextAreaItemPropsType, TextInputProps {
    last?: boolean;
    onContentSizeChange?: (e: any) => void;
    styles?: ITextareaItemStyle;
}
export default class TextAreaItem extends React.Component<TextareaItemNativeProps, any> {
    static defaultProps: {
        onChange(): void;
        onFocus(): void;
        onBlur(): void;
        onErrorClick(): void;
        clear: boolean;
        error: boolean;
        editable: boolean;
        rows: number;
        count: number;
        keyboardType: string;
        autoHeight: boolean;
        last: boolean;
        styles: any;
    };
    constructor(props: TextareaItemNativeProps);
    onChange: (event: {
        nativeEvent: {
            text: string;
            contentSize: {
                width: number;
                height: number;
            };
            target: number;
            eventCount: number;
        };
    }) => void;
    onContentSizeChange: (event: {
        nativeEvent: {
            contentSize: {
                width: number;
                height: number;
            };
        };
    }) => void;
    render(): JSX.Element;
}
