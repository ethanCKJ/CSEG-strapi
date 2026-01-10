import { Page} from '@strapi/strapi/admin';
import {Routes, Route, useParams} from 'react-router-dom';


import { HomePage } from './HomePage';
import {ProtectedListViewPage} from "./ListView/ListViewPage";
import {COLLECTION_TYPES, SINGLE_TYPES} from "../constants/collections";
import { DesignSystemProvider } from "@strapi/design-system";
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
    <DesignSystemProvider locale={"en-GB"}>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path={"/:collectionType/:slug"} element={<CollectionTypePages/>}/>
        <Route path="*" element={<Page.Error/>}/>
      </Routes>
    </DesignSystemProvider>

  );
};

export { App };
