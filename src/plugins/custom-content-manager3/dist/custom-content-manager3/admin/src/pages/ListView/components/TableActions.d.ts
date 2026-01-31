import { Document } from '../../../hooks/useDocument';
import { ContentType } from "../../../../../shared/contracts/content-types";
interface TableActionsProps {
    document: Document;
    schema?: ContentType;
}
declare const TableActions: ({ document, schema }: TableActionsProps) => import("react/jsx-runtime").JSX.Element;
export { TableActions };
