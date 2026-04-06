import {Main, Button, Tooltip} from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { useState } from 'react';
import { useRBAC, Page, useStrapiApp } from '@strapi/strapi/admin';

// import {
//   useNotification,
//   useStrapiApp,
//   useAPIErrorHandler,
//   useQueryParams,
// } from '@strapi/admin/strapi-admin';

import pluginPermissions from '../permissions.js';
import { getTranslation } from '../utils/getTranslation';

const HomePage = () => {
  const { formatMessage } = useIntl();
  const [count, setCount] = useState(0);
  const { isLoading, allowedActions } = useRBAC(pluginPermissions);

  const state = useStrapiApp("HomePage", (state) => state);
  if (isLoading){
    return <Page.Loading></Page.Loading>
  }
  return (
    <Page.Main>
      <h1>Welcome to 1 {formatMessage({ id: getTranslation('plugin.name') })}</h1>
      <div>Counter: {count}</div>
      <Button
        onClick={() => setCount(count + 1)}
        disabled={!allowedActions.canIncrement}
      >
        Increment
      </Button>
    </Page.Main>
  );
};

export { HomePage };
