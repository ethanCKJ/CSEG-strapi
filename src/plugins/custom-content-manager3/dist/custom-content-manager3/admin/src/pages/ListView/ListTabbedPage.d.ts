interface TabConfig<TFilterValue = string> {
    /** Unique identifier for the tab, used in URL query params */
    value: TFilterValue;
    /** Display label for the tab */
    label: string;
    /** Optional: Custom filter object to apply when this tab is active */
    filter?: Record<string, unknown>;
}
interface TabsConfig<TFilterValue extends string = string> {
    /** The field name in the schema to filter by */
    filterField: string;
    /** Array of tab configurations */
    tabs: TabConfig<TFilterValue>[];
    /** Default tab value when none is selected */
    defaultTab: TFilterValue;
    /** Accessible label for the tabs list */
    ariaLabel?: string;
}
interface ListTabbedPageProps<TFilterValue extends string = string> {
    /** Configuration for the tabs and their corresponding filters */
    tabsConfig: TabsConfig<TFilterValue>;
    /** Optional: Hide the create button */
    hideCreateButton?: boolean;
}
declare function ListTabbedPage<TFilterValue extends string = string>({ tabsConfig, hideCreateButton, }: ListTabbedPageProps<TFilterValue>): import("react/jsx-runtime").JSX.Element;
declare function ProtectedListTabbedPage<TFilterValue extends string = string>(props: ListTabbedPageProps<TFilterValue>): import("react/jsx-runtime").JSX.Element;
declare const ListMemberApplicationPage: () => import("react/jsx-runtime").JSX.Element;
declare const ProtectedListMemberApplicationPage: () => import("react/jsx-runtime").JSX.Element;
declare const ListContactPage: () => import("react/jsx-runtime").JSX.Element;
declare const ProtectedListContactPage: () => import("react/jsx-runtime").JSX.Element;
export { ListTabbedPage, ProtectedListTabbedPage, ListMemberApplicationPage, ProtectedListMemberApplicationPage, ListContactPage, ProtectedListContactPage };
export type { TabConfig, TabsConfig, ListTabbedPageProps };
