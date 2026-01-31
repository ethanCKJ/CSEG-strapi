import * as React from 'react';
import { type InputProps } from '@strapi/strapi/admin';
import { type EditFieldLayout } from '../../../../../hooks/useDocumentLayout';
import { RelationResult } from '../../../../../services/relations';
type RelationPosition = (Pick<RelationResult, 'status' | 'locale'> & {
    before: string;
    end?: never;
}) | {
    end: boolean;
    before?: never;
    status?: never;
    locale?: never;
};
interface Relation extends Pick<RelationResult, 'documentId' | 'id' | 'locale' | 'status'> {
    href: string;
    label: string;
    position?: RelationPosition;
    __temp_key__: string;
    apiData?: {
        documentId: RelationResult['documentId'];
        id: RelationResult['id'];
        locale?: RelationResult['locale'];
        position: RelationPosition;
        isTemporary?: boolean;
    };
}
interface RelationsFieldProps extends Omit<Extract<EditFieldLayout, {
    type: 'relation';
}>, 'size' | 'hint'>, Pick<InputProps, 'hint'> {
}
export interface RelationsFormValue {
    connect?: Relation[];
    disconnect?: Pick<Relation, 'id'>[];
}
declare const FlexWrapper: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<any, never>> & string & (import("styled-components/dist/types").BaseObject | Omit<FlexComponent, keyof React.Component<any, {}, any>>);
declare const DisconnectButton: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, never>> & string;
declare const LinkEllipsis: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<any, never>> & string & (import("styled-components/dist/types").BaseObject | Omit<any, keyof React.Component<any, {}, any>>);
declare const MemoizedRelationsField: React.NamedExoticComponent<RelationsFieldProps & React.RefAttributes<HTMLDivElement>>;
export { MemoizedRelationsField as RelationsInput, FlexWrapper, DisconnectButton, LinkEllipsis };
export type { RelationsFieldProps };
