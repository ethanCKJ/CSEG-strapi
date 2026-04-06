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
  useStrapiApp,
  useTable,
} from '@strapi/strapi/admin';
import {Box, Button, ButtonProps, EmptyStateLayout, Flex, Typography,} from '@strapi/design-system';
import {Plus} from '@strapi/icons';
import {EmptyDocuments} from '@strapi/icons/symbols';
import isEqual from 'lodash/isEqual';
import {stringify} from 'qs';
import {useIntl} from 'react-intl';
import {Link as ReactRouterLink, useNavigate, useParams} from 'react-router-dom';
import {styled} from 'styled-components';

import {InjectionZone} from '../../components/InjectionZone';
import {HOOKS} from '../../constants/hooks';
import {useDoc} from '../../hooks/useDocument';
import {
  convertListLayoutToFieldLayouts,
  ListFieldLayout,
  ListLayout,
  useDocumentLayout,
} from '../../hooks/useDocumentLayout';
import {usePrev} from '../../hooks/usePrev';
import {useGetAllDocumentsQuery} from '../../services/documents';
import {buildValidParams} from '../../utils/api';
import {getTranslation} from '../../utils/translations';
import {getDisplayName} from '../../utils/users';
// import { DocumentStatus } from '../EditView/components/DocumentStatus';
//
// import { BulkActionsRenderer } from './components/BulkActions/Actions';
// import { Filters } from './components/Filters';
import {TableActions} from './components/TableActions';
import {CellContent} from './components/TableCells/CellContent';
// import { ViewSettingsMenu } from './components/ViewSettingsMenu';
import type {Modules} from '@strapi/types';
import {ViewSettingsMenu} from "./components/ViewSettingsMenu";
import {Filters} from "./components/Filters";
import {ContentType} from "../../../../shared/contracts/content-types";
import {DocumentStatus} from "../EditView/components/DocumentStatus";

const { INJECT_COLUMN_IN_TABLE } = HOOKS;

/* -------------------------------------------------------------------------------------------------
 * ListViewPage
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
  canCreate: boolean
}) {
  return <Page.Main>
    <Page.Title>{`${props.contentTypeTitle}`}</Page.Title>
    <PageHeaderCustom contentTypeTitle={props.contentTypeTitle} pagination={props.pagination}/>
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
          action={props.canCreate ?
            <CreateButton variant="secondary" contentTypeTitle={props.contentTypeTitle}/> : null}
          content="No content found"
          hasRadius
          icon={<EmptyDocuments width="16rem"/>}
        />
      </Box>
    </Layouts.Content>
  </Page.Main>;
}

const ListViewPage = () => {

  const navigate = useNavigate();
  const { formatMessage } = useIntl();
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


  const [{ query }] = useQueryParams<{
    plugins?: Record<string, unknown>;
    page?: string;
    pageSize?: string;
    sort?: string;
  }>({
    page: '1',
    pageSize: list.settings.pageSize.toString(),
    sort: list.settings.defaultSortBy
      ? `${list.settings.defaultSortBy}:${list.settings.defaultSortOrder}`
      : '',
  });


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
  }, [pagination, formatMessage, query, navigate]);


  const canCreate = true;

  const runHookWaterfall = useStrapiApp('ListViewPage', (state) => state.runHookWaterfall);

  /**
   * Run the waterfall and then inject our additional table headers.
   */
  const tableHeaders = React.useMemo(() => {
    const headers = runHookWaterfall(INJECT_COLUMN_IN_TABLE, {
      displayedHeaders,
      layout: list,
    });

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
        label: formatMessage(translation),
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
    formatMessage,
    list,
    runHookWaterfall,
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

  const handleRowClick = (id: Modules.Documents.ID) => () => {
    // If you enter EditViewPage of a type with 'Draft and Publish' ON without status=draft or status=published in the URL, the useDocumentContext.ts
    // may incorrectly attach relations meant for published to the draft document and vice versa leading to potential
    // database corruption. To avoid this, always pass the status param when navigating to the EditViewPage.
    if (schema?.options?.draftAndPublish) {
      navigate({
        pathname: id.toString(),
        search: stringify({ plugins: query.plugins, status: 'draft' }),
      });
      return;
    }
    navigate({
      pathname: id.toString(),
      search: stringify({ plugins: query.plugins}),
    });
  };


  if (!isFetching && results.length === 0) {
    return (
      <>
        <NoEntriesPage contentTypeTitle={contentTypeTitle} pagination={pagination} list={list}
                       schema={schema} headers={handleSetHeaders}
                       resetHeaders={() => setDisplayedHeaders(list.layout)}
                       listFieldLayouts={displayedHeaders} callbackfn={(header) => header.name}
                       canCreate={canCreate}/>
      </>
    );
  }

  return (
    <>
      <Page.Main>
        <Page.Title>{`${contentTypeTitle}`}</Page.Title>
        <PageHeaderCustom contentTypeTitle={contentTypeTitle} pagination={pagination}/>
        <Layouts.Action
          startActions={
            <>
              <CreateButton variant={"primary"} contentTypeTitle={contentTypeTitle}/>
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
          <Flex gap={4} direction="column" alignItems="stretch">
            <Table.Root rows={results} headers={tableHeaders} isLoading={isFetching}>
              {/*<TableActionsBar />*/}
              <Table.Content>
                <Table.Head>
                  {/*<Table.HeaderCheckboxCell />*/}
                  {tableHeaders.map((header: ListFieldLayout) => (
                    <Table.HeaderCell key={header.name} {...header} />
                  ))}
                </Table.Head>
                <Table.Loading />
                <Table.Empty action={<CreateButton variant="secondary" contentTypeTitle={contentTypeTitle} />} />
                <Table.Body>
                  {results.map((row) => {
                    // console.log(row);
                    return (
                      <Table.Row
                        cursor="pointer"
                        key={row.id}
                        onClick={handleRowClick(row.documentId)}
                      >
                        {/*<Table.CheckboxCell id={row.id} />*/}
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
                          <TableActions document={row} schema={schema} />
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
 * TableActionsBar
 * -----------------------------------------------------------------------------------------------*/

const TableActionsBar = () => {
  const selectRow = useTable('TableActionsBar', (state) => state.selectRow);
  const [{ query }] = useQueryParams<{ plugins: { i18n: { locale: string } } }>();
  const locale = query?.plugins?.i18n?.locale;
  const prevLocale = usePrev(locale);

  // TODO: find a better way to reset the selected rows when the locale changes across all the app
  React.useEffect(() => {
    if (prevLocale !== locale) {
      selectRow([]);
    }
  }, [selectRow, prevLocale, locale]);

  return (
    <Table.ActionBar>
      <BulkActionsRenderer />
    </Table.ActionBar>
  );
};

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
 * ProtectedListViewPage
 * -----------------------------------------------------------------------------------------------*/

const ProtectedListViewPage = () => {

  const { slug = '' } = useParams<{
    slug: string;
  }>();

  // ⚠️ PERMISSIONS BYPASSED - Skip permission checks
  if (!slug) {
    return <Page.Error />;
  }

  return (
      <ListViewPage />
    // <DocumentRBAC permissions={null}>
    // </DocumentRBAC>
  );
};

export { ListViewPage, ProtectedListViewPage };
