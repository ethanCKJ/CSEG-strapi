import {ListViewPage} from "./ListView/ListViewPage";
import {DesignSystemProvider} from "@strapi/design-system";
import {ProtectedListViewPage} from "./ListView/ListViewPage";

const ListViewPageWrapped = () => {
  return (<DesignSystemProvider>
    <ProtectedListViewPage/>

  </DesignSystemProvider>);
}

export {ListViewPageWrapped}