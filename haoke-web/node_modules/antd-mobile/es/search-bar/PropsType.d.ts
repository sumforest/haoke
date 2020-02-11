export interface SearchBarPropsType {
    defaultValue?: string;
    value?: string;
    placeholder?: string;
    onSubmit?: (value: string) => void;
    onChange?: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onCancel?: (value: string) => void;
    showCancelButton?: boolean;
    cancelText?: string;
    disabled?: boolean;
    styles?: any;
    autoFocus?: boolean;
    focused?: boolean;
    onClear?: (value: string) => void;
    maxLength?: number;
}
export interface SearchBarState {
    value?: string;
    focus?: boolean;
    focused?: boolean;
}
export declare const defaultProps: {
    prefixCls: string;
    placeholder: string;
    onSubmit: () => void;
    onChange: () => void;
    onFocus: () => void;
    onBlur: () => void;
    onClear: () => void;
    showCancelButton: boolean;
    disabled: boolean;
};
