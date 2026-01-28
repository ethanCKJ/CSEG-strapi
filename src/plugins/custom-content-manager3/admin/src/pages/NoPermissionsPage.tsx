import {Layouts, Page} from '@strapi/strapi/admin';

const NoPermissions = () => {

  return (
    <>
      <Layouts.Header
        title={'Content'}
      />
      <Layouts.Content>
        <Page.NoPermissions />
      </Layouts.Content>
    </>
  );
};

export { NoPermissions };
