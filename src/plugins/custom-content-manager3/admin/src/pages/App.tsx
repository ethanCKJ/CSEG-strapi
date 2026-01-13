import { Page} from '@strapi/strapi/admin';
import {Routes, Route, useParams} from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { HomePage } from './HomePage';
import {ProtectedListViewPage} from "./ListView/ListViewPage";
import {ProtectedEditViewPage} from "./EditView/EditViewPage";
import {COLLECTION_TYPES, SINGLE_TYPES} from "../constants/collections";
import { DesignSystemProvider, darkTheme } from "@strapi/design-system";

/**
 * On single collection types (e.g. about page), use the EditViewPage and
 * for collection types (e.g. events), use the ListViewPage.
 * @constructor
 */
const CollectionTypePages = () => {

  const {collectionType} = useParams<{ collectionType: string }>();
  if (collectionType !== COLLECTION_TYPES && collectionType !== SINGLE_TYPES) {
    return <Page.Error />;
  }
  return collectionType === COLLECTION_TYPES ? (
    <ProtectedListViewPage />
  ) : (
    <div>The Edit View Page should be here</div>
  );
}

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DesignSystemProvider theme={darkTheme} locale="en-GB">
        <Routes>
          <Route index element={<HomePage/>}/>
          <Route path={"/:collectionType/:slug"} element={<CollectionTypePages/>}/>
          <Route path={"/:collectionType/:slug/:id"} element={<ProtectedEditViewPage/>}/>
          <Route path="*" element={<Page.Error/>}/>
        </Routes>
      </DesignSystemProvider>
    </DndProvider>

  );
};

export { App };
