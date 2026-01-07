import {Main, Button} from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { useState } from 'react';
import {Page, useRBAC } from '@strapi/strapi/admin';

import pluginPermissions from '../permissions.js';
import { getTranslation } from '../utils/getTranslation';

const HomePage = () => {
  const { formatMessage } = useIntl();
  const [count, setCount] = useState(0);
  const { isLoading, allowedActions } = useRBAC(pluginPermissions);

  if (isLoading){
    return <Page.Loading></Page.Loading>
  }
  console.log('Allowed Actions:', allowedActions);
  return (
    <Main>
      <h1>Welcome to {formatMessage({ id: getTranslation('plugin.name') })}</h1>
      <div>Counter: {count}</div>
      <Button
        onClick={() => setCount(count + 1)}
        disabled={!allowedActions.canIncrement}
      >
        Increment
      </Button>
    </Main>
  );
};

export { HomePage };
