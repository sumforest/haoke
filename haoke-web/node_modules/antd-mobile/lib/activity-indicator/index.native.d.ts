/// <reference types="react" />
import React from 'react';
import { ActivityIndicatorPropTypes } from './PropsType';
import { IActivityIndicatorStyle } from './style/index.native';
export interface ActivityIndicatorNativeProps extends ActivityIndicatorPropTypes {
    styles?: IActivityIndicatorStyle;
    color?: string;
}
export default class RNActivityIndicator extends React.Component<ActivityIndicatorNativeProps, any> {
    static defaultProps: {
        animating: boolean;
        color: string;
        size: string;
        toast: boolean;
        styles: any;
    };
    _renderToast(): JSX.Element;
    _renderSpinner(): JSX.Element;
    render(): JSX.Element | null;
}
