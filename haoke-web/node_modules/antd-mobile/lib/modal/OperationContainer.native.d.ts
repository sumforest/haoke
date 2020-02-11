/// <reference types="react" />
import React from 'react';
import { TextStyle } from 'react-native';
import { Action } from './PropsType';
export interface OperationContainerProps {
    actions: Action<TextStyle>[];
    onAnimationEnd?: (visible: boolean) => void;
}
export default class OperationContainer extends React.Component<OperationContainerProps, any> {
    constructor(props: OperationContainerProps);
    onClose: () => void;
    render(): JSX.Element;
}
