import {Main, Typography} from '@strapi/design-system';
import { useIntl } from 'react-intl';
import {useRBAC} from '@strapi/admin/strapi-admin'
import { ListViewPage, DocumentRBAC } from '@internal/shared';


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
  const {
    permissions = [],
    isLoading,
    error,
  } = useRBAC(
    PERMISSIONS.map((action) => ({
      action,
      subject: model,
    }))
  );

  return (
    <Main padding={8}>
      <Typography variant={"alpha"}>Membership list</Typography>
      <DocumentRBAC permissions={permissions} model={model}>
        <ListViewPage />
      </DocumentRBAC>

    </Main>
  );
};

export { HomePage };
