import { Page} from '@strapi/strapi/admin';
import {Routes, Route, useParams} from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { StyleSheetManager, useTheme } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

import { HomePage } from './HomePage';
import {ProtectedListViewPage} from "./ListView/ListViewPage";
import {ProtectedEditViewPage} from "./EditView/EditViewPage";
import {COLLECTION_TYPES, SINGLE_TYPES} from "../constants/collections";
import { DesignSystemProvider, useDesignSystem, darkTheme } from "@strapi/design-system";
import {MEMBER_APPLICATION_MODEL} from "../constants/specialModels";
import {ProtectedListMemberApplicationPage} from "./ListView/ListTabbedPage";

/**
 * On single collection types (e.g. about page), use the EditViewPage and
 * for collection types (e.g. events), use the ListViewPage.
 * @constructor
 */
const CollectionTypePages = () => {

  const {collectionType, slug} = useParams<{ collectionType: string, slug: string }>();
  if (collectionType !== COLLECTION_TYPES && collectionType !== SINGLE_TYPES) {
    return <Page.Error />;
  }
  if (slug === MEMBER_APPLICATION_MODEL){
    return (<ProtectedListMemberApplicationPage/>);
  }

  return collectionType === COLLECTION_TYPES ? (
    <ProtectedListViewPage />
  ) : (
    <ProtectedEditViewPage/>
  );
}

const App = () => {
  const parentTheme = useTheme();
  const mergedTheme = {...darkTheme, sizes:parentTheme.sizes}
  return (
    // StyleSheetManager silences warnings about invalid HTML attributes from 'styled-components'
    <StyleSheetManager
      shouldForwardProp={(propName, elementToBeCreated) => {
        // Forward all props for non-HTML elements (React components)
        if (typeof elementToBeCreated === 'string') {
          // For HTML elements, filter out styled-components transient props and invalid HTML attributes
          return isPropValid(propName);
        }
        // For React components, forward all props
        return true;
      }}
    >
      <DndProvider backend={HTML5Backend}>
        <DesignSystemProvider theme={mergedTheme} locale="en-GB">
          <Routes>
            <Route index element={<HomePage/>}/>
            <Route path={"/:collectionType/:slug"} element={<CollectionTypePages/>}/>
            <Route path={"/:collectionType/:slug/:id"} element={<ProtectedEditViewPage/>}/>
            <Route path="*" element={<Page.Error/>}/>
          </Routes>
        </DesignSystemProvider>
      </DndProvider>
    </StyleSheetManager>
  );
};

export { App };
