import React, {useMemo} from "react";
import {
  useQueryParams,
  useNotification,
  useAPIErrorHandler,
  Page,
  useTable,
  Table,
  BackButton, SearchInput, Pagination, useRBAC
} from "@strapi/admin/strapi-admin";
import {buildValidParams} from "../../utils/api";
import {useGetAllDocumentsQuery} from "../../services/documents";
import {getTranslation} from "../../utils/translations";
import {useNavigate, Link as ReactRouterLink, useParams} from "react-router-dom";
import { useIntl } from 'react-intl';
import {stringify} from "qs";
import {ListFieldLayout} from "@strapi/content-manager/strapi-admin";
import {convertListLayoutToFieldLayouts, useDocumentLayout} from "../../hooks/useDocumentLayout";
import {useDoc} from "../../hooks/useDocument";
import {usePrev} from "../../hooks/usePrev";
import {isEqual} from "lodash";
import {Modules} from "@strapi/types";
import {styled} from "styled-components";
import { Layouts } from "@strapi/admin/strapi-admin";
import { BulkActionsRenderer } from "./components/BulkActions/Actions";
import {
  Box,
  Button,
  ButtonProps, darkTheme,
  DesignSystemProvider,
  EmptyStateLayout,
  Flex,
  Tooltip,
  Typography,
    IconButton,

} from '@strapi/design-system';
import {Plus, Trash, WarningCircle} from '@strapi/icons';
import {ViewSettingsMenu} from "./components/ViewSettingsMenu";
import {Filters} from "./components/Filters";
import {EmptyDocuments} from "@strapi/icons/symbols";
import { DocumentStatus } from "../EditView/components/DocumentStatus";
import {getDisplayName} from "../../utils/users";
import {CellContent} from "./components/TableCells/CellContent";
import {TableActions} from "./components/TableActions";
import {PERMISSIONS} from "../../constants/plugin";
import {DocumentRBAC} from "../../features/DocumentRBAC";

const LayoutsHeaderCustom = styled(Layouts.Header)`
  overflow-wrap: anywhere;
`;

const ListViewPage = () => {
  const {toggleNotification} = useNotification();
  const { _unstableFormatAPIError: formatAPIError } = useAPIErrorHandler(getTranslation);
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const {collectionType, model, schema} = useDoc();
  const { list } = useDocumentLayout(model);

  const [displayedHeaders, setDisplayedHeaders] = React.useState<ListFieldLayout[]>([]);
  if (true){
    return (
        <Tooltip label="Delete all items">
      <IconButton withTooltip={false} label="delete">
        <Trash />
      </IconButton>
    </Tooltip>
    )
  }

  const listLayout = usePrev(list.layout);
  React.useEffect(() => {
    /**
     * ONLY update the displayedHeaders if the document
     * layout has actually changed in value.
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
    pageSize: '10',
    sort: 'id:ASC',
  });
  console.log('query params', query);
  const params = useMemo(() => buildValidParams(query), [query]);
  const { data, error, isLoading } = useGetAllDocumentsQuery({
    model:model,
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

  // No need canCreate. Just set true.

  /**
   * Format the table headers without injecting additional columns.
   */
  const tableHeaders = React.useMemo(() => {
    const headers = { displayedHeaders, layout: list };

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

    if (schema?.options?.draftAndPublish) {
      formattedHeaders.push({
        attribute: {
          type: 'custom',
        },
        name: 'status',
        label: formatMessage({
          id: getTranslation(`containers.list.table-headers.status`),
          defaultMessage: 'status',
        }),
        searchable: false,
        sortable: false,
      } satisfies ListFieldLayout);
    }

    return formattedHeaders;
  }, [
    displayedHeaders,
    formatMessage,
    list,
    schema?.options?.draftAndPublish,
    model,
  ]);
  console.log('tableHeaders', tableHeaders);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading documents</div>;
  }
  console.log('data', data, 'error', error, 'isLoading', isLoading);

  const contentTypeTitle = schema?.info.displayName
      ? formatMessage({ id: schema.info.displayName, defaultMessage: schema.info.displayName })
      : formatMessage({
        id: 'content-manager.containers.untitled',
        defaultMessage: 'Untitled',
      });

  const handleRowClick = (id: Modules.Documents.ID) => () => {
    navigate({
      pathname: id.toString(),
      search: stringify({ plugins: query.plugins }),
    });
  };

  if (!isLoading && results.length === 0) {
    return (
          <>
            <Page.Main>
              <Page.Title>{`${contentTypeTitle}`}</Page.Title>
              <LayoutsHeaderCustom
                  primaryAction={
                    <CreateButton />
                  }
                  subtitle={formatMessage(
                      {
                        id: getTranslation('pages.ListView.header-subtitle'),
                        defaultMessage:
                            '{number, plural, =0 {# entries} one {# entry} other {# entries}} found',
                      },
                      { number: pagination?.total }
                  )}
                  title={contentTypeTitle}
                  navigationAction={<BackButton />}
              />
              <Layouts.Action
                  endActions={
                    <>
                      {/*<InjectionZone area="listView.actions" />*/}
                      <ViewSettingsMenu
                          setHeaders={handleSetHeaders}
                          resetHeaders={() => setDisplayedHeaders(list.layout)}
                          headers={displayedHeaders.map((header) => header.name)}
                      />
                    </>
                  }
                  startActions={
                    <>
                      {list.settings.searchable && (
                          <SearchInput
                              label={formatMessage(
                                  { id: 'app.component.search.label', defaultMessage: 'Search for {target}' },
                                  { target: contentTypeTitle }
                              )}
                              placeholder={formatMessage({
                                id: 'global.search',
                                defaultMessage: 'Search',
                              })}
                              trackedEvent="didSearch"
                          />
                      )}
                      {list.settings.filterable && schema ? <Filters schema={schema} /> : null}
                    </>
                  }
              />
              <Layouts.Content>
                <Box background="neutral0" shadow="filterShadow" hasRadius>
                  <EmptyStateLayout
                      action={<CreateButton variant="secondary" />}
                      content={formatMessage({
                        id: 'app.components.EmptyStateLayout.content-document',
                        defaultMessage: 'No content found',
                      })}
                      hasRadius
                      icon={<EmptyDocuments width="16rem" />}
                  />
                </Box>
              </Layouts.Content>
            </Page.Main>
          </>
    );
  }


  return (
      <>
          <Page.Main>
            <Page.Title>{`${contentTypeTitle}`}</Page.Title>
            <LayoutsHeaderCustom
                primaryAction={
                  <CreateButton />
                }
                subtitle={formatMessage(
                    {
                      id: getTranslation('pages.ListView.header-subtitle'),
                      defaultMessage:
                          '{number, plural, =0 {# entries} one {# entry} other {# entries}} found',
                    },
                    { number: pagination?.total }
                )}
                title={contentTypeTitle}
                navigationAction={<BackButton />}
            />
            <Layouts.Action
                endActions={
                  <>
                    {/*<InjectionZone area="listView.actions" />*/}
                    <ViewSettingsMenu
                        setHeaders={handleSetHeaders}
                        resetHeaders={() => setDisplayedHeaders(list.layout)}
                        headers={displayedHeaders.map((header) => header.name)}
                    />
                  </>
                }
                startActions={
                  <>
                    {list.settings.searchable && (
                        <SearchInput
                            disabled={results.length === 0}
                            label={formatMessage(
                                { id: 'app.component.search.label', defaultMessage: 'Search for {target}' },
                                { target: contentTypeTitle }
                            )}
                            placeholder={formatMessage({
                              id: 'global.search',
                              defaultMessage: 'Search',
                            })}
                            trackedEvent="didSearch"
                        />
                    )}
                    {list.settings.filterable && schema ? (
                        <Filters disabled={results.length === 0} schema={schema} />
                    ) : null}
                  </>
                }
            />
            <Layouts.Content>
              <Flex gap={4} direction="column" alignItems="stretch">
                <Table.Root rows={results} headers={tableHeaders} isLoading={isLoading}>
                  <TableActionsBar />
                  <Table.Content>
                    <Table.Head>
                      <Table.HeaderCheckboxCell />
                      {tableHeaders.map((header: ListFieldLayout) => (
                          <Table.HeaderCell key={header.name} {...header} />
                      ))}
                    </Table.Head>
                    <Table.Loading />
                    <Table.Empty action={<CreateButton variant="secondary" />} />
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
}


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

interface CreateButtonProps extends Pick<ButtonProps, 'variant'> {}

const CreateButton = ({ variant }: CreateButtonProps) => {
  const { formatMessage } = useIntl();

  const [{ query }] = useQueryParams<{ plugins: object }>();

  return (
      <Button
          variant={variant}
          tag={ReactRouterLink}
          // onClick={() => {
          //   trackUsage('willCreateEntry', { status: 'draft' });
          // }}
          startIcon={<Plus />}
          style={{ textDecoration: 'none' }}
          to={{
            pathname: 'create',
            search: stringify({ plugins: query.plugins }),
          }}
          minWidth="max-content"
          marginLeft={2}
      >
        {formatMessage({
          id: getTranslation('HeaderLayout.button.label-add-entry'),
          defaultMessage: 'Create new entry',
        })}
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
  const {
    permissions = [],
    isLoading,
    error,
  } = useRBAC(
      PERMISSIONS.map((action) => ({
        action,
        subject: slug,
      }))
  );

  if (isLoading) {
    return <Page.Loading />;
  }

  if (error || !slug) {
    return <Page.Error />;
  }

  return (
      <Page.Protect permissions={permissions}>
        {({ permissions }) => (
            <DocumentRBAC permissions={permissions}>
              <ListViewPage />
            </DocumentRBAC>
        )}
      </Page.Protect>
  );
};

export {ListViewPage, ProtectedListViewPage}

