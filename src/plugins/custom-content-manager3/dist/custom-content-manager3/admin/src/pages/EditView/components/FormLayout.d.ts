import * as React from 'react';
import { EditLayout } from '../../../hooks/useDocumentLayout';
import type { UseDocument } from '../../../hooks/useDocument';
export declare const ResponsiveGridRoot: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<any, never>> & string & (import("styled-components/dist/types").BaseObject | Omit<any, keyof React.Component<any, {}, any>>);
export declare const ResponsiveGridItem: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<any, {
    col: number;
}>> & string;
interface FormLayoutProps extends Pick<EditLayout, 'layout'> {
    hasBackground?: boolean;
    document: ReturnType<UseDocument>;
}
declare const FormLayout: ({ layout, document, hasBackground }: FormLayoutProps) => import("react/jsx-runtime").JSX.Element;
export { FormLayout, FormLayoutProps };
