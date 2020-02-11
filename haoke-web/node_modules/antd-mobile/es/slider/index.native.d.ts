/// <reference types="react" />
import React from 'react';
import { SliderPropsType } from './PropsType';
export interface SliderProps extends SliderPropsType {
    maximumTrackTintColor?: string;
    minimumTrackTintColor?: string;
}
export default class SliderAntm extends React.Component<SliderProps, any> {
    static defaultProps: {
        onChange(): void;
        onAfterChange(): void;
        defaultValue: number;
        disabled: boolean;
        maximumTrackTintColor: string;
        minimumTrackTintColor: string;
    };
    render(): JSX.Element;
}
