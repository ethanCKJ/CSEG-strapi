import * as React from 'react';

import {
  Layouts,
  Page,
  Pagination,
  SearchInput,
  Table,
  useAPIErrorHandler,
  useNotification,
  useQueryParams,
} from '@strapi/strapi/admin';
import {
  Box,
  Button,
  ButtonProps,
  EmptyStateLayout,
  Flex,
  Tabs,
  Typography,
} from '@strapi/design-system';
import { Plus } from '@strapi/icons';
import { EmptyDocuments } from '@strapi/icons/symbols';
import isEqual from 'lodash/isEqual';
import { stringify } from 'qs';
import { Link as ReactRouterLink, useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import { InjectionZone } from '../../components/InjectionZone';
import { useDoc } from '../../hooks/useDocument';
import {
  convertListLayoutToFieldLayouts,
  ListFieldLayout,
  useDocumentLayout,
} from '../../hooks/useDocumentLayout';
import { usePrev } from '../../hooks/usePrev';
import { useGetAllDocumentsQuery } from '../../services/documents';
import { buildValidParams } from '../../utils/api';
import { getTranslation } from '../../utils/translations';
import { getDisplayName } from '../../utils/users';
import { TableActions } from './components/TableActions';
import { CellContent } from './components/TableCells/CellContent';
import { ViewSettingsMenu } from './components/ViewSettingsMenu';
import { Filters } from './components/Filters';
import { DocumentStatus } from '../EditView/components/DocumentStatus';
import type { Modules } from '@strapi/types';

/* -------------------------------------------------------------------------------------------------
 * Types & Interfaces
 * -----------------------------------------------------------------------------------------------*/

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

/* -------------------------------------------------------------------------------------------------
 * Styled Components
 * -----------------------------------------------------------------------------------------------*/

const ActionsCell = styled(Table.Cell)`
  display: flex;
  justify-content: flex-end;
`;

/* -------------------------------------------------------------------------------------------------
 * Helper Components
 * -----------------------------------------------------------------------------------------------*/

function PageHeaderCustom(props: { contentTypeTitle: string; pagination: any }) {
  return (
    <Flex paddingLeft={10} paddingBottom={4} paddingTop={4} direction="column" alignItems="start">
      <Typography variant="alpha">{props.contentTypeTitle}</Typography>
      <Typography variant="omega">{`${props.pagination?.total ?? 0} found`}</Typography>
    </Flex>
  );
}

interface CreateButtonProps extends Pick<ButtonProps, 'variant'> {
  contentTypeTitle?: string;
}

const CreateButton = ({ variant, contentTypeTitle }: CreateButtonProps) => {
  const [{ query }] = useQueryParams<{ plugins: object }>();

  return (
    <Button
      variant={variant}
      tag={ReactRouterLink}
      startIcon={<Plus />}
      style={{ textDecoration: 'none' }}
      to={{
        pathname: 'create',
        search: stringify({ plugins: query.plugins }),
      }}
      minWidth="max-content"
      marginLeft={2}
    >
      {`Create new ${contentTypeTitle || 'entry'}`}
    </Button>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ListTabbedPage
 * -----------------------------------------------------------------------------------------------*/

function ListTabbedPage<TFilterValue extends string = string>({
  tabsConfig,
  hideCreateButton = false,
}: ListTabbedPageProps<TFilterValue>) {
  const navigate = useNavigate();
  const { toggleNotification } = useNotification();
  const { _unstableFormatAPIError: formatAPIError } = useAPIErrorHandler(getTranslation);
  const { collectionType, model, schema } = useDoc();
  const { list } = useDocumentLayout(model);

  const [displayedHeaders, setDisplayedHeaders] = React.useState<ListFieldLayout[]>([]);
  const listLayout = usePrev(list.layout);

  React.useEffect(() => {
    if (!isEqual(listLayout, list.layout)) {
      setDisplayedHeaders(list.layout);
    }
  }, [list.layout, listLayout]);

  const handleSetHeaders = (headers: string[]) => {
    setDisplayedHeaders(
      convertListLayoutToFieldLayouts(headers, schema!.attributes, list.metadatas)
    );
  };

  // Tab state management
  const [{ query: tabQuery }, setQuery] = useQueryParams<{ tab: TFilterValue }>({
    tab: tabsConfig.defaultTab,
  });

  const currentTab = tabQuery.tab || tabsConfig.defaultTab;

  // Build filter based on current tab
  const buildTabFilter = React.useCallback(
    (tab: TFilterValue): Record<string, unknown> => {
      const tabConfig = tabsConfig.tabs.find((t) => t.value === tab);
      if (tabConfig?.filter) {
        return tabConfig.filter;
      }
      return { [tabsConfig.filterField]: tab };
    },
    [tabsConfig]
  );

  // Main query params for data fetching
  const [{ query }] = useQueryParams<{
    plugins?: Record<string, unknown>;
    page?: string;
    pageSize?: string;
    sort?: string;
    filters: Record<string, unknown>;
  }>({
    page: '1',
    pageSize: list.settings.pageSize.toString(),
    sort: list.settings.defaultSortBy
      ? `${list.settings.defaultSortBy}:${list.settings.defaultSortOrder}`
      : '',
    filters: buildTabFilter(currentTab),
  });

  const params = React.useMemo(() => buildValidParams(query), [query]);
  const { data, error, isFetching } = useGetAllDocumentsQuery({
    model,
    params,
  });

  React.useEffect(() => {
    if (error) {
      toggleNotification({
        type: 'danger',
        message: formatAPIError(error),
      });
    }
  }, [error, formatAPIError, toggleNotification]);

  const { results = [], pagination } = data ?? {};

  React.useEffect(() => {
    if (pagination && pagination.pageCount > 0 && pagination.page > pagination.pageCount) {
      navigate(
        {
          search: stringify({
            ...query,
            page: pagination.pageCount,
          }),
        },
        { replace: true }
      );
    }
  }, [pagination, query, navigate]);

  const tableHeaders = React.useMemo(() => {
    const formattedHeaders = displayedHeaders.map<ListFieldLayout>((header) => {
      const translation =
        typeof header.label === 'string'
          ? {
              id: `content-manager.content-types.${model}.${header.name}`,
              defaultMessage: header.label,
            }
          : header.label;

      return {
        ...header,
        label: translation.defaultMessage,
        name: `${header.name}${header.mainField?.name ? `.${header.mainField.name}` : ''}`,
      };
    });

    if (schema?.options?.draftAndPublish) {
      formattedHeaders.push({
        attribute: { type: 'custom' },
        name: 'status',
        label: 'status',
        searchable: false,
        sortable: false,
      } satisfies ListFieldLayout);
    }

    return formattedHeaders;
  }, [displayedHeaders, schema?.options?.draftAndPublish, model]);

  if (isFetching) {
    return <Page.Loading />;
  }

  if (error) {
    return <Page.Error />;
  }

  const contentTypeTitle = schema?.info.displayName || 'Untitled';

  const handleRowClick = (id: Modules.Documents.ID) => () => {
    navigate({
      pathname: id.toString(),
      search: stringify({ plugins: query.plugins }),
    });
  };

  const handleTabChange = (newTab: string) => {
    const isValidTab = tabsConfig.tabs.some((t) => t.value === newTab);
    if (isValidTab) {
      setQuery({ tab: newTab as TFilterValue }, 'push', true);
    }
  };

  const renderCellContent = (row: any, header: ListFieldLayout) => {
    const headerBaseName = header.name.split('.')[0];

    if (header.name === 'status') {
      return (
        <Table.Cell key={header.name}>
          <DocumentStatus status={row.status} maxWidth="min-content" />
        </Table.Cell>
      );
    }

    if (['createdBy', 'updatedBy'].includes(headerBaseName)) {
      return (
        <Table.Cell key={header.name}>
          <Typography textColor="neutral800">
            {row[headerBaseName] ? getDisplayName(row[headerBaseName]) : '-'}
          </Typography>
        </Table.Cell>
      );
    }

    if (typeof header.cellFormatter === 'function') {
      return (
        <Table.Cell key={header.name}>
          {/* @ts-expect-error – TODO: fix this TS error */}
          {header.cellFormatter(row, header, { collectionType, model })}
        </Table.Cell>
      );
    }

    return (
      <Table.Cell key={header.name}>
        <CellContent content={row[headerBaseName]} rowId={row.documentId} {...header} />
      </Table.Cell>
    );
  };

  // Empty state
  if (results.length === 0 && !isFetching) {
    return (
      <Page.Main>
        <Page.Title>{contentTypeTitle}</Page.Title>
        <PageHeaderCustom contentTypeTitle={contentTypeTitle} pagination={pagination} />
        <Layouts.Action
          startActions={
            <>
              {!hideCreateButton && (
                <CreateButton variant="primary" contentTypeTitle={contentTypeTitle} />
              )}
              {list.settings.searchable && (
                <SearchInput
                  label={`Search for ${contentTypeTitle}`}
                  placeholder="Search"
                  trackedEvent="didSearch"
                />
              )}
              {list.settings.filterable && schema ? <Filters schema={schema} /> : null}
            </>
          }
          endActions={
            <>
              <InjectionZone area="listView.actions" />
              <ViewSettingsMenu
                setHeaders={handleSetHeaders}
                resetHeaders={() => setDisplayedHeaders(list.layout)}
                headers={displayedHeaders.map((header) => header.name)}
              />
            </>
          }
        />
        <Layouts.Content>
          <Tabs.Root value={currentTab} onValueChange={handleTabChange}>
            <Tabs.List aria-label={tabsConfig.ariaLabel || 'Filter tabs'}>
              {tabsConfig.tabs.map((tab) => (
                <Tabs.Trigger key={tab.value} value={tab.value}>
                  {tab.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Tabs.Root>
          <Box background="neutral0" shadow="filterShadow" hasRadius marginTop={4}>
            <EmptyStateLayout
              action={
                !hideCreateButton ? (
                  <CreateButton variant="secondary" contentTypeTitle={contentTypeTitle} />
                ) : undefined
              }
              content="No content found"
              hasRadius
              icon={<EmptyDocuments width="16rem" />}
            />
          </Box>
        </Layouts.Content>
      </Page.Main>
    );
  }

  return (
    <Page.Main>
      <Page.Title>{contentTypeTitle}</Page.Title>
      <PageHeaderCustom contentTypeTitle={contentTypeTitle} pagination={pagination} />
      <Layouts.Action
        startActions={
          <>
            {list.settings.searchable && (
              <SearchInput
                disabled={results.length === 0}
                label={`Search for ${contentTypeTitle}`}
                placeholder="Search"
              />
            )}
            {list.settings.filterable && schema ? (
              <Filters disabled={results.length === 0} schema={schema} />
            ) : null}
          </>
        }
        endActions={
          <>
            <InjectionZone area="listView.actions" />
            <ViewSettingsMenu
              setHeaders={handleSetHeaders}
              resetHeaders={() => setDisplayedHeaders(list.layout)}
              headers={displayedHeaders.map((header) => header.name)}
            />
          </>
        }
      />
      <Layouts.Content>
        <Tabs.Root value={currentTab} onValueChange={handleTabChange}>
          <Tabs.List aria-label={tabsConfig.ariaLabel || 'Filter tabs'}>
            {tabsConfig.tabs.map((tab) => (
              <Tabs.Trigger key={tab.value} value={tab.value}>
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>
        <Flex gap={4} direction="column" alignItems="stretch">
          <Table.Root rows={results} headers={tableHeaders} isLoading={isFetching}>
            <Table.Content>
              <Table.Head>
                {/* Checkbox column removed - same as ListViewPage */}
                {tableHeaders.map((header: ListFieldLayout) => (
                  <Table.HeaderCell key={header.name} {...header} />
                ))}
              </Table.Head>
              <Table.Loading />
              <Table.Empty />
              <Table.Body>
                {results.map((row) => (
                  <Table.Row
                    cursor="pointer"
                    key={row.id}
                    onClick={handleRowClick(row.documentId)}
                  >
                    {/* Checkbox cell removed - same as ListViewPage */}
                    {tableHeaders.map((header) => renderCellContent(row, header))}
                    <ActionsCell onClick={(e) => e.stopPropagation()}>
                      <TableActions document={row} schema={schema} />
                    </ActionsCell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.Root>
          <Pagination.Root {...pagination}>
            <Pagination.PageSize />
            <Pagination.Links />
          </Pagination.Root>
        </Flex>
      </Layouts.Content>
    </Page.Main>
  );
}

/* -------------------------------------------------------------------------------------------------
 * ProtectedListTabbedPage
 * -----------------------------------------------------------------------------------------------*/

function ProtectedListTabbedPage<TFilterValue extends string = string>(
  props: ListTabbedPageProps<TFilterValue>
) {
  const { slug = '' } = useParams<{ slug: string }>();

  if (!slug) {
    return <Page.Error />;
  }

  return <ListTabbedPage {...props} />;
}

/* -------------------------------------------------------------------------------------------------
 * ListMemberApplicationPage - Uses ListTabbedPage with member application config
 * -----------------------------------------------------------------------------------------------*/

const memberApplicationTabsConfig: TabsConfig<'pending' | 'approved' | 'rejected'> = {
  filterField: 'applicationStatus',
  defaultTab: 'pending',
  ariaLabel: 'View types of member applications',
  tabs: [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
  ],
};

const ListMemberApplicationPage = () => {
  return <ListTabbedPage tabsConfig={memberApplicationTabsConfig} />;
};

const ProtectedListMemberApplicationPage = () => {
  return <ProtectedListTabbedPage tabsConfig={memberApplicationTabsConfig} />;
};

/* -------------------------------------------------------------------------------------------------
 * ListContactPage - Uses ListTabbedPage with contact resolved status config
 * -----------------------------------------------------------------------------------------------*/

const contactTabsConfig: TabsConfig<'true' | 'false'> = {
  filterField: 'resolved',
  defaultTab: 'false',
  ariaLabel: 'View contact messages by resolved status',
  tabs: [
    { value: 'false', label: 'Unresolved' },
    { value: 'true', label: 'Resolved' },
  ],
};

const ListContactPage = () => {
  return <ListTabbedPage tabsConfig={contactTabsConfig} />;
};

const ProtectedListContactPage = () => {
  return <ProtectedListTabbedPage tabsConfig={contactTabsConfig} />;
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/

export {
  ListTabbedPage,
  ProtectedListTabbedPage,
  ListMemberApplicationPage,
  ProtectedListMemberApplicationPage,
  ListContactPage,
  ProtectedListContactPage
};
export type { TabConfig, TabsConfig, ListTabbedPageProps };
