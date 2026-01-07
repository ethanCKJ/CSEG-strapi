import {ProtectedListViewPage} from "./ListView/ListViewPage";

const ListViewPageWrapped = () => {
  // Don't wrap with DesignSystemProvider - it breaks Strapi admin context
  // The DesignSystemProvider is already provided by Strapi admin
  return <ProtectedListViewPage/>;
}

export {ListViewPageWrapped}