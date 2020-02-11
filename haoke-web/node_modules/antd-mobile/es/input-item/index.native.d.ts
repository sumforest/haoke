/// <reference types="react" />
import React from 'react';
import { GestureResponderEvent, TextInputProperties } from 'react-native';
import Input from './Input.native';
import { InputItemPropsType } from './PropsType';
import { Omit } from '../_util/types';
/**
 * React Native TextInput Props except these props
 */
export declare type TextInputProps = Omit<TextInputProperties, 'onChange' | 'onFocus' | 'onBlur'>;
export interface InputItemProps extends InputItemPropsType, TextInputProps {
    last?: boolean;
    onExtraClick?: (event: GestureResponderEvent) => void;
    onErrorClick?: (event: GestureResponderEvent) => void;
}
export default class InputItem extends React.Component<InputItemProps, any> {
    static defaultProps: {
        type: string;
        editable: boolean;
        clear: boolean;
        onChange: () => void;
        onBlur: () => void;
        onFocus: () => void;
        extra: string;
        onExtraClick: () => void;
        error: boolean;
        onErrorClick: () => void;
        labelNumber: number;
        labelPosition: string;
        textAlign: string;
        last: boolean;
        styles: any;
    };
    inputRef: Input | null;
    onChange: (text: string) => void;
    onInputBlur: () => void;
    onInputFocus: () => void;
    onInputClear: () => void;
    focus: () => void;
    render(): JSX.Element;
}
