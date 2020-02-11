import AbstractPicker from './AbstractPicker';
import PropTypes from 'prop-types';
export default class Picker extends AbstractPicker {
    static defaultProps: {
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
    protected popupProps: {
        WrapComponent: string;
        transitionName: string;
        maskTransitionName: string;
    };
}
