/// <reference types="react" />
import React from 'react';
import { TextInput, TextInputProperties } from 'react-native';
export interface TextInputProps extends TextInputProperties {
    focused?: boolean;
}
declare class Input extends React.Component<TextInputProps, any> {
    inputRef: TextInput | null;
    constructor(props: TextInputProps);
    componentWillReceiveProps(nextProps: TextInputProps): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    focus: () => void;
    clear: () => void;
    render(): JSX.Element;
}
export default Input;
