/// <reference types="react" />
import React from 'react';
import { TextStyle } from 'react-native';
import { Action } from './PropsType';
export interface AlertContainerProps {
    title: React.ReactNode;
    content: React.ReactNode;
    actions: Action<TextStyle>[];
    onAnimationEnd?: (visible: boolean) => void;
}
export default class AlertContainer extends React.Component<AlertContainerProps, any> {
    constructor(props: AlertContainerProps);
    onClose: () => void;
    render(): JSX.Element;
}
