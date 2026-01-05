import {Main, Typography} from '@strapi/design-system';
import { useIntl } from 'react-intl';
import {Page, useRBAC} from '@strapi/admin/strapi-admin'
import {ListViewPage} from "@internal/shared2"
import * as React from "react";


const HomePage = () => {
  const { formatMessage } = useIntl();
  const PERMISSIONS = [
    'plugin::content-manager.explorer.create',
    'plugin::content-manager.explorer.read',
    'plugin::content-manager.explorer.update',
    'plugin::content-manager.explorer.delete',
    'plugin::content-manager.explorer.publish',
  ];
  const model ='api::event.event'
  // Fetch permissions for the Event model
  // const {
  //   permissions = [],
  //   isLoading,
  //   error,
  // } = useRBAC(
  //   PERMISSIONS.map((action) => ({
  //     action,
  //     subject: model,
  //   }))
  // );
  // if (isLoading) {
  //   return <Page.Loading />;
  // }
  //
  // if (error) {
  //   return <Page.Error />;
  // }

  return (
    <Main padding={8}>
      <Typography variant={"alpha"}>Membership listFOOBuzz</Typography>
      {/*<DocumentRBAC permissions={permissions} model={model}>*/}
      {/*  <ListViewPage />*/}
      {/*</DocumentRBAC>*/}
      <ListViewPage/>


    </Main>
  );
};

export { HomePage };
