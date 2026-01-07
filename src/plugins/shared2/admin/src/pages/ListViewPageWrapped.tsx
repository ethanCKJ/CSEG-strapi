import {ListViewPage} from "./ListView/ListViewPage";
import {DesignSystemProvider} from "@strapi/design-system";
import {ProtectedListViewPage} from "./ListView/ListViewPage";

const ListViewPageWrapped = () => {
  return (<DesignSystemProvider>
    {/*<ListViewPage/>*/}
    <ProtectedListViewPage/>

  </DesignSystemProvider>);
}

export {ListViewPageWrapped}