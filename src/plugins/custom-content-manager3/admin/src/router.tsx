/* eslint-disable check-file/filename-naming-convention */
import { lazy } from 'react';

import { Navigate, PathRouteProps, useParams } from 'react-router-dom';

import { COLLECTION_TYPES, SINGLE_TYPES } from './constants/collections';
import { routes as historyRoutes } from './history/routes';
import { routes as previewRoutes } from './preview/routes';
import { MEMBER_APPLICATION_MODEL, CONTACT_MODEL } from "./constants/specialModels";
import { Page } from "@strapi/strapi/admin";

const ProtectedEditViewPage = lazy(() =>
  import('./pages/EditView/EditViewPage').then((mod) => ({ default: mod.ProtectedEditViewPage }))
);
const ProtectedListViewPage = lazy(() =>
  import('./pages/ListView/ListViewPage').then((mod) => ({ default: mod.ProtectedListViewPage }))
);
// ...existing code...

const ProtectedListMemberApplicationPage = lazy(() =>
  import('./pages/ListView/ListTabbedPage').then((mod) => ({ default: mod.ProtectedListMemberApplicationPage }))
);

const ProtectedListContactPage = lazy(() =>
  import('./pages/ListView/ListTabbedPage').then((mod) => ({ default: mod.ProtectedListContactPage }))
);

/**
 * On single collection types (e.g. about page), use the EditViewPage and
 * for collection types (e.g. events), use the ListViewPage.
 * @constructor
 */
const CollectionTypePages = () => {

  const {collectionType, slug} = useParams<{ collectionType: string, slug: string }>();
  console.log('In router.tsx with params:', {collectionType, slug});
  if (collectionType !== COLLECTION_TYPES && collectionType !== SINGLE_TYPES) {
    return <Page.Error />;
  }
  if (slug === MEMBER_APPLICATION_MODEL){
    return (<ProtectedListMemberApplicationPage/>);
  }
  if (slug === CONTACT_MODEL){
    return (<ProtectedListContactPage/>);
  }

  return collectionType === COLLECTION_TYPES ? (
    <ProtectedListViewPage />
  ) : (
    <ProtectedEditViewPage/>
  );
}
const CLONE_RELATIVE_PATH = ':collectionType/:slug/clone/:origin';
const CLONE_PATH = `plugins/custom-content-manager3/${CLONE_RELATIVE_PATH}`;
const LIST_RELATIVE_PATH = ':collectionType/:slug';
const LIST_PATH = `plugins/custom-content-manager3/collection-types/:slug`;

const routes: PathRouteProps[] = [
  {
    path: LIST_RELATIVE_PATH,
    element: <CollectionTypePages />,
  },
  {
    path: ':collectionType/:slug/:id',
    Component: ProtectedEditViewPage,
  },
  // {
  //   path: CLONE_RELATIVE_PATH,
  //   Component: ProtectedEditViewPage,
  // },
  // {
  //   path: ':collectionType/:slug/configurations/list',
  //   Component: ProtectedListConfiguration,
  // },
  // {
  //   path: 'components/:slug/configurations/edit',
  //   Component: ProtectedComponentConfigurationPage,
  // },
  // {
  //   path: ':collectionType/:slug/configurations/edit',
  //   Component: ProtectedEditConfigurationPage,
  // },
  {
    path: '403',
    Component: NoPermissions,
  },
  // {
  //   path: 'no-content-types',
  //   Component: NoContentType,
  // },
  // ...historyRoutes,
  // ...previewRoutes,
];

export { routes, CLONE_PATH, LIST_PATH };
