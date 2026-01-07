import {Main, Tooltip} from '@strapi/design-system';
import { useIntl } from 'react-intl';

import { getTranslation } from '../utils/getTranslation';

const HomePage = () => {
  const { formatMessage } = useIntl();

  return (
    <Main>
      <h1>Welcome to {formatMessage({ id: getTranslation('plugin.name') })}</h1>
      <Tooltip label="This is a tooltip">
        <div>Hello and hover over me</div>
      </Tooltip>
    </Main>
  );
};

export { HomePage };
