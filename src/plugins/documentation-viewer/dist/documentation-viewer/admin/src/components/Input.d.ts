import type { MessageDescriptor } from 'react-intl';
import React from 'react';
type IntlObject = MessageDescriptor;
interface CustomFieldAttribute {
    type: string;
    customField: string;
    options?: {
        documentId?: string;
        [key: string]: any;
    };
}
interface ChangeEventTarget {
    name: string;
    value: unknown;
    type: string;
}
interface ChangeEvent {
    target: ChangeEventTarget;
}
export interface CustomFieldInputProps {
    attribute: CustomFieldAttribute;
    description?: IntlObject;
    placeholder?: IntlObject;
    hint?: string;
    name: string;
    intlLabel: IntlObject;
    onChange: (event: ChangeEvent) => void;
    contentTypeUID: string;
    type: string;
    value: unknown;
    required: boolean;
    error?: IntlObject;
    disabled: boolean;
}
declare const Input: React.FC<CustomFieldInputProps>;
export default Input;
