import {ListViewPage} from "@internal/shared2"
import * as React from "react";
import {Layouts} from '@strapi/admin/strapi-admin';

import {DesignSystemProvider, darkTheme, IconButton, Tooltip} from "@strapi/design-system";
import {Trash} from "@strapi/icons";

const HomePage = () => {
  return (

    <DesignSystemProvider theme={darkTheme} locale="en-GB">
      <div>Hello</div>
      {/*<ListViewPage/>*/}
      <Tooltip label="Delete all items">
        <IconButton withTooltip={false} label="delete">
          <Trash />
        </IconButton>
      </Tooltip>
    </DesignSystemProvider>

  );
};

export {HomePage};
