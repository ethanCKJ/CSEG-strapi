import {ListViewPage} from "./ListView/ListViewPage";
import {DesignSystemProvider} from "@strapi/design-system";

const ListViewPageWrapped = () => {
  return (<DesignSystemProvider>
    <ListViewPage/>

  </DesignSystemProvider>);
}

export {ListViewPageWrapped}