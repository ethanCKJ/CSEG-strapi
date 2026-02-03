/* eslint-disable check-file/filename-naming-convention */
import * as React from 'react';

import {Page} from '@strapi/strapi/admin';
import {Outlet} from 'react-router-dom';

import {DragLayerProps} from './components/DragLayer';
// import { CardDragPreview } from './components/DragPreviews/CardDragPreview';
// import { ComponentDragPreview } from './components/DragPreviews/ComponentDragPreview';
// import { RelationDragPreview } from './components/DragPreviews/RelationDragPreview';
import {ItemTypes} from './constants/dragAndDrop';
import {CardDragPreview} from "./components/DragPreviews/CardDragPreview";
import {ComponentDragPreview} from "./components/DragPreviews/ComponentDragPreview";
import {RelationDragPreview} from "./components/DragPreviews/RelationDragPreview";
import {StyleSheetManager, useTheme} from "styled-components";
import {darkTheme, DesignSystemProvider} from "@strapi/design-system";
import isPropValid from '@emotion/is-prop-valid';

import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

/* -------------------------------------------------------------------------------------------------
 * Layout
 * -----------------------------------------------------------------------------------------------*/

const Layout = () => {
  // const contentTypeMatch = useMatch('/custom-content-manager3/:kind/:uid/*');
  // const isMobile = useIsMobile();

  // const { isLoading, collectionTypeLinks, models, singleTypeLinks } = useContentManagerInitData();
  // const authorisedModels = [...collectionTypeLinks, ...singleTypeLinks].sort((a, b) =>
  //   a.title.localeCompare(b.title)
  // );
  // console.log("In Layout: authorisedModels =", authorisedModels, "loading =", isLoading);
  // TODO: Use real data
  // const isLoading = false;
  // const models = [1,2,3,4,5]
  // const authorisedModels= [1,2,3,4,5]


  // const { pathname } = useLocation();
  // const { formatMessage } = useIntl();
  //
  // if (isLoading) {
  //   return (
  //     <>
  //       <Page.Title>
  //         {formatMessage({
  //           id: getTranslation('plugin.name'),
  //           defaultMessage: 'Content Manager',
  //         })}
  //       </Page.Title>
  //       <Page.Loading />
  //     </>
  //   );
  // }

  // Array of models that are displayed in the content manager
  // const supportedModelsToDisplay = models.filter(({ isDisplayed }) => isDisplayed);
  // const supportedModelsToDisplay = models;
  //
  // // Redirect the user to the 403 page
  // if (
  //   authorisedModels.length === 0 &&
  //   supportedModelsToDisplay.length > 0 &&
  //   pathname !== '/content-manager/403'
  // ) {
  //   return <Navigate to="/403" />;
  // }
  //
  // // Redirect the user to the create content type page
  // if (supportedModelsToDisplay.length === 0 && pathname !== '/no-content-types') {
  //   return <Navigate to="/no-content-types" />;
  // }

  // On /custom-content-manager3 base route, navigate home
  // if (!contentTypeMatch && authorisedModels.length > 0) {
  //   // On desktop, navigate to homepage
  //   if (!isMobile) {
  //     return (
  //       <Navigate
  //         to="/admin"
  //         replace
  //       />
  //     );
  //   }

    // On mobile: show navigation page
  //   return (
  //     <>
  //       <Page.Title>
  //         {formatMessage({
  //           id: getTranslation('plugin.name'),
  //           defaultMessage: 'Content Manager',
  //         })}
  //       </Page.Title>
  //       <SubNav.PageWrapper>
  //         <LeftMenu isFullPage />
  //       </SubNav.PageWrapper>
  //     </>
  //   );
  // }
  const parentTheme = useTheme();
  const mergedTheme = {...parentTheme, fontSizes: darkTheme.fontSizes}

  return (
    <>
      <Page.Title>
        Custom Content Manager
      </Page.Title>
      {/* StyleSheetManager silences warnings about invalid HTML attributes from 'styled-components'*/}
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
            <Outlet />
          </DesignSystemProvider>
        </DndProvider>
      </StyleSheetManager>
    </>
  );
};

/* -------------------------------------------------------------------------------------------------
 * renderDraglayerItem
 * -----------------------------------------------------------------------------------------------*/

function renderDraglayerItem({ type, item }: Parameters<DragLayerProps['renderItem']>[0]) {
  if (!type || (type && typeof type !== 'string')) {
    return null;
  }

  /**
   * Because a user may have multiple relations / dynamic zones / repeable fields in the same content type,
   * we append the fieldName for the item type to make them unique, however, we then want to extract that
   * first type to apply the correct preview.
   */
  const [actualType] = type.split('_');

  switch (actualType) {
    case ItemTypes.EDIT_FIELD:
    case ItemTypes.FIELD:
      return <CardDragPreview label={item.label} />;
    case ItemTypes.COMPONENT:
    case ItemTypes.DYNAMIC_ZONE:
      return <ComponentDragPreview displayedValue={item.displayedValue} />;

    case ItemTypes.RELATION:
      return <RelationDragPreview {...item} />;

    default:
      return null;
  }
}

export { Layout };
