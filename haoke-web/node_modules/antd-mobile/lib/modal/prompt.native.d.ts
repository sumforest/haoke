/// <reference types="react" />
import React from 'react';
import { CallbackOrActions } from './PropsType';
import { TextStyle } from 'react-native';
export default function prompt(title: React.ReactNode, message: React.ReactNode, callbackOrActions: CallbackOrActions<TextStyle>, type?: string, defaultValue?: string, placeholders?: string[]): void;
