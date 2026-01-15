import * as React from 'react';

import {
  Page,
  Pagination,
  SearchInput,
  Table,
  BackButton,
  useNotification,
  useStrapiApp,
  useAPIErrorHandler,
  useQueryParams,
  useRBAC,
  Layouts,
  useTable,
  tours,
} from '@strapi/strapi/admin';
import {
  Button,
  Flex,
  Typography,
  ButtonProps,
  Box,
  EmptyStateLayout, DesignSystemProvider,
} from '@strapi/design-system';
import { Plus } from '@strapi/icons';
import { EmptyDocuments } from '@strapi/icons/symbols';
import isEqual from 'lodash/isEqual';
import { stringify } from 'qs';
import { useIntl } from 'react-intl';
import { useNavigate, Link as ReactRouterLink, useParams } from 'react-router-dom';
import { styled, useTheme } from 'styled-components';

import { InjectionZone } from '../../components/InjectionZone';
import { HOOKS } from '../../constants/hooks';
import { PERMISSIONS } from '../../constants/plugin';
import { DocumentRBAC, useDocumentRBAC } from '../../features/DocumentRBAC';
import { useDoc } from '../../hooks/useDocument';
import {
  ListFieldLayout,
  convertListLayoutToFieldLayouts,
  useDocumentLayout, ListLayout,
} from '../../hooks/useDocumentLayout';
import { usePrev } from '../../hooks/usePrev';
import { useGetAllDocumentsQuery } from '../../services/documents';
import { buildValidParams } from '../../utils/api';
import { getTranslation } from '../../utils/translations';
import { getDisplayName } from '../../utils/users';
// import { DocumentStatus } from '../EditView/components/DocumentStatus';
//
// import { BulkActionsRenderer } from './components/BulkActions/Actions';
// import { Filters } from './components/Filters';
import { TableActions } from './components/TableActions';
import { CellContent } from './components/TableCells/CellContent';
// import { ViewSettingsMenu } from './components/ViewSettingsMenu';

import type { Modules } from '@strapi/types';
import {ViewSettingsMenu} from "./components/ViewSettingsMenu";
import { Filters } from "./components/Filters";
import {ContentType} from "../../../../shared/contracts/content-types";
import {DocumentStatus} from "../EditView/components/DocumentStatus";
import { Tabs } from "@strapi/design-system";

const { INJECT_COLUMN_IN_TABLE } = HOOKS;

/* -------------------------------------------------------------------------------------------------
 * ListMemberApplicationPage
 * -----------------------------------------------------------------------------------------------*/
const LayoutsHeaderCustom = styled(Layouts.Header)`
  overflow-wrap: anywhere;
`;

function PageHeaderCustom(props: { contentTypeTitle: string, pagination: any }) {
  return <Flex paddingLeft={10} paddingBottom={4} paddingTop={4} direction="column"
               alignItems="start">
    <Typography variant={"alpha"}>{`${props.contentTypeTitle}`}</Typography>
    <Typography variant={"omega"}>{`${props.pagination?.total} found`}</Typography>
  </Flex>;
}

function NoEntriesPage(props: {
  contentTypeTitle: string,
  pagination: any,
  list: ListLayout,
  schema: ContentType | undefined,
  headers: (headers: string[]) => void,
  resetHeaders: () => void,
  listFieldLayouts: ListFieldLayout[],
  callbackfn: (header) => any,
}) {
  return <Page.Main>
    <Page.Title>{`${props.contentTypeTitle}`}</Page.Title>
    <PageHeaderCustom contentTypeTitle={'Custom' + props.contentTypeTitle} pagination={props.pagination}/>
    <Layouts.Action
      startActions={
        <>
          <CreateButton variant={"primary"} contentTypeTitle={props.contentTypeTitle}/>
          {props.list.settings.searchable && (
            <SearchInput
              label={`Search for ${props.contentTypeTitle}`}
              placeholder="Search"
              trackedEvent="didSearch"
            />
          )}
          {props.list.settings.filterable && props.schema ? <Filters schema={props.schema}/> : null}
        </>
      }
      endActions={
        <>
          <InjectionZone area="listView.actions"/>
          <ViewSettingsMenu
            setHeaders={props.headers}
            resetHeaders={props.resetHeaders}

            headers={props.listFieldLayouts.map(props.callbackfn)}
          />
        </>
      }
    />
    <Layouts.Content>
      <Box background="neutral0" shadow="filterShadow" hasRadius>
        <EmptyStateLayout
          action={
            <CreateButton variant="secondary" contentTypeTitle={props.contentTypeTitle}/>}
          content="No content found"
          hasRadius
          icon={<EmptyDocuments width="16rem"/>}
        />
      </Box>
    </Layouts.Content>
  </Page.Main>;
}

const ListMemberApplicationPage = () => {

  const navigate = useNavigate();
  const { toggleNotification } = useNotification();
  const { _unstableFormatAPIError: formatAPIError } = useAPIErrorHandler(getTranslation);
  // TODO: Replace useDoc with custom router.
  const { collectionType, model, schema } = useDoc();
  const { list } = useDocumentLayout(model);

  const [displayedHeaders, setDisplayedHeaders] = React.useState<ListFieldLayout[]>([]);

  const listLayout = usePrev(list.layout);

  React.useEffect(() => {
    /**
     * ONLY update the displayedHeaders if the document
     * layout from backend has actually changed in value.
     *
     * This is a performance optimization to prevent unnecessary
     * displayedHeaders updates.
     */
    if (!isEqual(listLayout, list.layout)) {
      setDisplayedHeaders(list.layout);
    }
  }, [list.layout, listLayout]);

  const handleSetHeaders = (headers: string[]) => {
    setDisplayedHeaders(
      convertListLayoutToFieldLayouts(headers, schema!.attributes, list.metadatas)
    );
  };

  const [{
    query: {tab}
  }, setQuery] = useQueryParams<{tab: 'pending' | 'approved' | 'rejected'}>({
    tab: 'pending'
  });

  const [{ query }] = useQueryParams<{
    plugins?: Record<string, unknown>;
    page?: string;
    pageSize?: string;
    sort?: string;
    filters: { applicationStatus?: string};
  }>({
    page: '1',
    pageSize: list.settings.pageSize.toString(),
    sort: list.settings.defaultSortBy
      ? `${list.settings.defaultSortBy}:${list.settings.defaultSortOrder}`
      : '',
    filters: {
      applicationStatus: tab,
    }
  });
  console.log('query', query);

  const params = React.useMemo(() => buildValidParams(query), [query]);
  const { data, error, isFetching } = useGetAllDocumentsQuery({
    model,
    params,
  });

  /**
   * If the API returns an error, display a notification
   */
  React.useEffect(() => {
    if (error) {
      toggleNotification({
        type: 'danger',
        message: formatAPIError(error),
      });
    }
  }, [error, formatAPIError, toggleNotification]);

  const { results = [], pagination } = data ?? {};
  // If a user is on a page beyond the end of the results, navigate to the end of results.
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

  /**
   * Compute the table headers with translations
   * Removed runHookWaterfall as we don't need to inject new columns. Just modify the source code!
   */
  const tableHeaders = React.useMemo(() => {
    const headers =  {
      displayedHeaders,
      layout: list,
    };

    const formattedHeaders = headers.displayedHeaders.map<ListFieldLayout>((header) => {
      /**
       * When the header label is a string, it is an attribute on the current content-type:
       * Use the attribute name value to compute the translation.
       * Otherwise, it should be a  translation object coming from a plugin that injects into the table (ie i18n, content-releases, review-workflows):
       * Use the translation object as is.
       */
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
    // The draft and publish status column.
    if (schema?.options?.draftAndPublish) {
      formattedHeaders.push({
        attribute: {
          type: 'custom',
        },
        name: 'status',
        label: 'status',
        searchable: false,
        sortable: false,
      } satisfies ListFieldLayout);
    }
    return formattedHeaders;
  }, [
    displayedHeaders,
    list,
    schema?.options?.draftAndPublish,
    model,
  ]);


  if (isFetching) {
    return <Page.Loading />;
  }

  if (error) {
    return <Page.Error />;
  }

  const contentTypeTitle = schema?.info.displayName ?  schema.info.displayName : 'Untitled'
  console.log("ListMemberApplicationPage contentTypeTitle:", contentTypeTitle);

  const handleRowClick = (id: Modules.Documents.ID) => () => {
    navigate({
      pathname: id.toString(),
      search: stringify({ plugins: query.plugins }),
    });
  };

  const handleTabChange = (newTab: string) => {
    if (newTab === 'pending' || newTab === 'approved' || newTab === 'rejected') {
      // setQuery will cause useQueryParams to update tab which causes the later useQueryParams to send an updated filter
      setQuery({ tab: newTab }, 'push', true);
    }
  }


  if (!isFetching && results.length === 0) {
    return (
      <>
        <NoEntriesPage contentTypeTitle={contentTypeTitle} pagination={pagination} list={list}
                       schema={schema} headers={handleSetHeaders}
                       resetHeaders={() => setDisplayedHeaders(list.layout)}
                       listFieldLayouts={displayedHeaders} callbackfn={(header) => header.name}
                       canCreate={true}/>
      </>
    );
  }
  // return (<div>Hello from the ListMemberApplicationPage</div>)
  return (
    <>
      <Page.Main>
        <Page.Title>{`${contentTypeTitle}`}</Page.Title>
        <PageHeaderCustom contentTypeTitle={contentTypeTitle} pagination={pagination}/>
        <Layouts.Action
          startActions={
            <>
              {list.settings.searchable && (
                <SearchInput
                  disabled={results.length === 0}
                  label={`Search for ${contentTypeTitle}`}
                  placeholder='Search'
                  trackedEvent="didSearch"
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
          <Tabs.Root value={tab} onValueChange={handleTabChange}>
            <Tabs.List aria-label="View types of member applications">
              <Tabs.Trigger value="pending">Pending</Tabs.Trigger>
              <Tabs.Trigger value="approved">Approved</Tabs.Trigger>
              <Tabs.Trigger value="rejected">Rejected</Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
          <Flex gap={4} direction="column" alignItems="stretch">
            <Table.Root rows={results} headers={tableHeaders} isLoading={isFetching}>
              {/*<TableActionsBar />*/}
              <Table.Content>
                <Table.Head>
                  <Table.HeaderCheckboxCell />
                  {tableHeaders.map((header: ListFieldLayout) => (
                    <Table.HeaderCell key={header.name} {...header} />
                  ))}
                </Table.Head>
                <Table.Loading />
                <Table.Empty action={<CreateButton variant="secondary" contentTypeTitle={contentTypeTitle} />} />
                <Table.Body>
                  {results.map((row) => {
                    return (
                      <Table.Row
                        cursor="pointer"
                        key={row.id}
                        onClick={handleRowClick(row.documentId)}
                      >
                        <Table.CheckboxCell id={row.id} />
                        {tableHeaders.map(({ cellFormatter, ...header }) => {
                          if (header.name === 'status') {
                            const { status } = row;

                            return (
                              <Table.Cell key={header.name}>
                                <DocumentStatus status={status} maxWidth={'min-content'} />
                              </Table.Cell>
                            );
                          }
                          if (['createdBy', 'updatedBy'].includes(header.name.split('.')[0])) {
                            // Display the users full name
                            // Some entries doesn't have a user assigned as creator/updater (ex: entries created through content API)
                            // In this case, we display a dash
                            return (
                              <Table.Cell key={header.name}>
                                <Typography textColor="neutral800">
                                  {row[header.name.split('.')[0]]
                                    ? getDisplayName(row[header.name.split('.')[0]])
                                    : '-'}
                                </Typography>
                              </Table.Cell>
                            );
                          }
                          if (typeof cellFormatter === 'function') {
                            return (
                              <Table.Cell key={header.name}>
                                {/* @ts-expect-error – TODO: fix this TS error */}
                                {cellFormatter(row, header, { collectionType, model })}
                              </Table.Cell>
                            );
                          }
                          return (
                            <Table.Cell key={header.name}>
                              <CellContent
                                content={row[header.name.split('.')[0]]}
                                rowId={row.documentId}
                                {...header}
                              />
                            </Table.Cell>
                          );
                        })}
                        {/* we stop propagation here to allow the menu to trigger it's events without triggering the row redirect */}
                        <ActionsCell onClick={(e) => e.stopPropagation()}>
                          <TableActions document={row} />
                        </ActionsCell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Content>
            </Table.Root>
            <Pagination.Root
              {...pagination}
            >
              <Pagination.PageSize />
              <Pagination.Links />
            </Pagination.Root>
          </Flex>
        </Layouts.Content>
      </Page.Main>
    </>
  );
};

const ActionsCell = styled(Table.Cell)`
  display: flex;
  justify-content: flex-end;
`;


/* -------------------------------------------------------------------------------------------------
 * CreateButton
 * -----------------------------------------------------------------------------------------------*/

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
 * ProtectedListMemberApplicationPage
 * -----------------------------------------------------------------------------------------------*/

const ProtectedListMemberApplicationPage = () => {

  const { slug = '' } = useParams<{
    slug: string;
  }>();

  // ⚠️ PERMISSIONS BYPASSED - Skip permission checks
  if (!slug) {
    return <Page.Error />;
  }
  console.log("ProtectedListMemberApplicationPage before return")

  return (
    <ListMemberApplicationPage />
    // <DocumentRBAC permissions={null}>
    // </DocumentRBAC>
  );
};

export { ListMemberApplicationPage, ProtectedListMemberApplicationPage };
