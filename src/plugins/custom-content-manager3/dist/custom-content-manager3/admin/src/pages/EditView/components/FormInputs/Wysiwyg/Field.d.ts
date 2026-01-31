import * as React from 'react';
import { type InputProps } from '@strapi/strapi/admin';
import { EditorApi } from './Editor';
import type { Schema } from '@strapi/types';
interface WysiwygProps extends Omit<InputProps, 'type'> {
    labelAction?: React.ReactNode;
    type: Schema.Attribute.RichText['type'];
}
declare const MemoizedWysiwyg: React.NamedExoticComponent<WysiwygProps & React.RefAttributes<EditorApi>>;
export { MemoizedWysiwyg as Wysiwyg };
export type { WysiwygProps };
