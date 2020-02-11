/// <reference types="react" />
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { FlexItemPropsType } from './PropsType';
export interface FlexItemProps extends FlexItemPropsType {
    flex?: number;
    onPress?: () => void;
    onLongPress?: () => void;
    onPressIn?: () => void;
    onPressOut?: () => void;
    style?: StyleProp<ViewStyle>;
}
export default class FlexItem extends React.Component<FlexItemProps, any> {
    static defaultProps: {
        flex: number;
    };
    render(): JSX.Element;
}
