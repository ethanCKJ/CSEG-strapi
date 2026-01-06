import {ListViewPage} from "@internal/shared2"
import * as React from "react";
import {Layouts} from '@strapi/admin/strapi-admin';

import {DesignSystemProvider, darkTheme, IconButton, Tooltip} from "@strapi/design-system";
import {Trash} from "@strapi/icons";
import {ListViewPageWrapped} from "@internal/shared2/admin/src/pages/ListViewPageWrapped";

const HomePage = () => {
  return (
      <>
        <div>Hello</div>
      {/*<Tooltip label="Delete all items">*/}
      {/*  <IconButton withTooltip={false} label="delete">*/}
      {/*    <Trash />*/}
      {/*  </IconButton>*/}
      {/*</Tooltip>*/}
      {/*  <DesignSystemProvider>*/}
      {/*  <ListViewPage/>*/}
        <ListViewPageWrapped/>

      {/*  </DesignSystemProvider>*/}
      </>
    // <DesignSystemProvider theme={darkTheme} locale="en-GB">
    // </DesignSystemProvider>

  );
};

export {HomePage};
