/// <reference types="react" />
import React from 'react';
import { ImagePickerPropTypes as BasePropsType } from './PropsType';
export interface ImagePickerPropTypes extends BasePropsType {
    prefixCls?: string;
    className?: string;
}
export default class ImagePicker extends React.Component<ImagePickerPropTypes, any> {
    static defaultProps: {
        prefixCls: string;
        files: never[];
        onChange: () => void;
        onImageClick: () => void;
        onAddImageClick: () => void;
        onFail: () => void;
        selectable: boolean;
        multiple: boolean;
        accept: string;
    };
    fileSelectorInput: HTMLInputElement | null;
    getOrientation: (file: any, callback: (_: number) => void) => void;
    getRotation: (orientation?: number) => number;
    removeImage: (index: number) => void;
    addImage: (imgItem: any) => void;
    onImageClick: (index: number) => void;
    onFileChange: () => void;
    parseFile: (file: any, index: number) => void;
    render(): JSX.Element;
}
