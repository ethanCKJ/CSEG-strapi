import type { Document } from './hooks/useDocument';
import type { DocumentMetadata } from '../../shared/contracts/collection-types';
import type { DescriptionComponent } from '@strapi/admin/strapi-admin';
type DescriptionReducer<Config extends object> = (prev: Config[]) => Config[];
interface EditViewContext {
    /**
     * This will ONLY be null, if the content-type
     * does not have draft & published enabled.
     */
    activeTab: 'draft' | 'published' | null;
    /**
     * Will be either 'single-types' | 'collection-types'
     */
    collectionType: string;
    /**
     * this will be undefined if someone is creating an entry.
     */
    document?: Document;
    /**
     * this will be undefined if someone is creating an entry.
     */
    documentId?: string;
    /**
     * this will be undefined if someone is creating an entry.
     */
    meta?: DocumentMetadata;
    /**
     * The current content-type's model.
     */
    model: string;
}
interface ListViewContext {
    /**
     * Will be either 'single-types' | 'collection-types'
     */
    collectionType: string;
    /**
     * The current selected documents in the table
     */
    documents: Document[];
    /**
     * The current content-type's model.
     */
    model: string;
}
interface PanelComponentProps extends EditViewContext {
}
interface DocumentActionProps extends EditViewContext {
}
interface HeaderActionProps extends EditViewContext {
}
interface BulkActionComponentProps extends ListViewContext {
}
declare class ContentManagerPlugin {
    /**
     * The following properties are the stored ones provided by any plugins registering with
     * the content-manager. The function calls however, need to be called at runtime in the
     * application, so instead we collate them and run them later with the complete list incl.
     * ones already registered & the context of the view.
     */
    get config(): {
        id: string;
        name: string;
        apis: {};
    };
}
export { ContentManagerPlugin };
export type { EditViewContext, ListViewContext, BulkActionComponentProps, DescriptionComponent, DescriptionReducer, PanelComponentProps, DocumentActionProps, HeaderActionProps, };
