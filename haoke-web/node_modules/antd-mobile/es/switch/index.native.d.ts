/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
import { SwitchPropsType } from './PropsType';
export interface AntmSwitchProps extends SwitchPropsType {
    style?: StyleProp<ViewStyle>;
}
declare const AntmSwitch: (props: AntmSwitchProps) => JSX.Element;
export default AntmSwitch;
