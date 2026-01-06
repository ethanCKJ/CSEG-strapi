import {ListViewPage} from "@internal/shared2"
import * as React from "react";
import { Layouts } from '@strapi/admin/strapi-admin';

import {DesignSystemProvider} from "@strapi/design-system";

const HomePage = () => {
  return (
    <Layouts.Root>
      <div>Hello</div>
        {/*<DesignSystemProvider>*/}
        {/*  <ListViewPage/>*/}
        {/*</DesignSystemProvider>*/}
    </Layouts.Root>
  );
};

export {HomePage};
