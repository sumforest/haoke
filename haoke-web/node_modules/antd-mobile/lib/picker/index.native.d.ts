import PropTypes from 'prop-types';
import AbstractPicker from './AbstractPicker';
import { PickerPropsType } from './PropsType';
import { IPickerStyle } from './style/index.native';
export interface PickerNativeProps extends PickerPropsType {
    styles?: IPickerStyle;
}
export default class Picker extends AbstractPicker {
    static defaultProps: {
        styles: any;
        triggerType: string;
        prefixCls: string;
        pickerPrefixCls: string;
        popupPrefixCls: string;
        format: (values: string[]) => string;
        cols: number;
        cascade: boolean;
        title: string;
    };
    static contextTypes: {
        antLocale: PropTypes.Requireable<any>;
    };
    protected popupProps: {};
}
