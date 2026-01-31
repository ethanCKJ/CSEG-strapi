import * as React from 'react';
import { type Editor } from 'slate';
interface WrapperProps {
    children: React.ReactNode;
    baseEditor?: Editor;
}
declare const Wrapper: ({ children, baseEditor }: WrapperProps) => import("react/jsx-runtime").JSX.Element;
export { Wrapper };
