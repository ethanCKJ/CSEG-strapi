import * as React from 'react';

import {
  Page,
  Form,
  useRBAC,
  useNotification,
  useQueryParams,
  RESPONSIVE_DEFAULT_SPACING,
} from '@strapi/strapi/admin';
import { Grid, Main, Tabs, Box } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { useLocation, useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import { SINGLE_TYPES } from '../../constants/collections';
import { PERMISSIONS } from '../../constants/plugin';
import { DocumentRBAC, useDocumentRBAC } from '../../features/DocumentRBAC';
import { useDoc, type UseDocument } from '../../hooks/useDocument';
import { useDocumentLayout } from '../../hooks/useDocumentLayout';
import { useLazyComponents } from '../../hooks/useLazyComponents';
import { useOnce } from '../../hooks/useOnce';
import { getTranslation } from '../../utils/translations';
import { createYupSchema } from '../../utils/validation';

import { Blocker } from './components/Blocker';
import { FormLayout } from './components/FormLayout';
import { Header } from './components/Header';
import {CustomPanel, Panels} from './components/Panels';
import { handleInvisibleAttributes } from './utils/data';

/* -------------------------------------------------------------------------------------------------
 * EditViewPage
 * -----------------------------------------------------------------------------------------------*/

const EditViewPage = () => {
  const location = useLocation();
  const [
    {
      query: { status },
    },
    setQuery,
  ] = useQueryParams<{ status: 'draft' | 'published' }>({
    status: 'draft',
  });
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();

  const doc = useDoc();
  const {
    document,
    meta,
    isLoading: isLoadingDocument,
    schema,
    components,
    collectionType,
    id,
    model,
    hasError,
    getTitle,
    getInitialFormValues,
  } = doc;

  const hasDraftAndPublished = schema?.options?.draftAndPublish ?? false;

  useOnce(() => {
    /**
     * We only ever want to fire the notification once otherwise
     * whenever the app re-renders it'll pop up regardless of
     * what we do because the state comes from react-router-dom
     */
    if (location?.state && 'error' in location.state) {
      toggleNotification({
        type: 'danger',
        message: location.state.error,
        timeout: 5000,
      });
    }
  });


  const isSingleType = collectionType === SINGLE_TYPES;

  /**
   * single-types don't current have an id, but because they're a singleton
   * we can simply use the update operation to continuously update the same
   * document with varying params.
   */
  const isCreatingDocument = !id && !isSingleType;

  const {
    isLoading: isLoadingLayout,
    edit: {
      layout,
      settings: { mainField },
    },
  } = useDocumentLayout(model);
  const pageTitle = getTitle(mainField);

  const { isLazyLoading } = useLazyComponents([]);

  const isLoading = isLoadingDocument || isLoadingLayout || isLazyLoading;

  const initialValues = getInitialFormValues(isCreatingDocument);

  if (isLoading && !document?.documentId) {
    return <Page.Loading />;
  }

  if (!initialValues || hasError) {
    return <Page.Error />;
  }

  const handleTabChange = (status: string) => {
    if (status === 'published' || status === 'draft') {
      setQuery({ status }, 'push', true);
    }
  };

  const validateSync = (values: Record<string, unknown>, options: Record<string, string>) => {
    const yupSchema = createYupSchema(schema?.attributes, components, {
      status,
      ...options,
    });

    return yupSchema.validateSync(values, { abortEarly: false });
  };

  return (
    <Main paddingLeft={RESPONSIVE_DEFAULT_SPACING} paddingRight={RESPONSIVE_DEFAULT_SPACING}>
      <Page.Title>{pageTitle}</Page.Title>
      <Form
        disabled={hasDraftAndPublished && status === 'published'}
        initialValues={initialValues}
        method={isCreatingDocument ? 'POST' : 'PUT'}
        validate={(values: Record<string, unknown>, options: Record<string, string>) => {
          // removes hidden fields from the validation
          // this is necessary because the yup schema doesn't know about the visibility conditions
          // and we don't want to validate fields that are not visible
          const { data: cleanedValues, removedAttributes } = handleInvisibleAttributes(values, {
            schema,
            initialValues,
            components,
          });

          const yupSchema = createYupSchema(schema?.attributes, components, {
            status,
            removedAttributes,
            ...options,
          });

          return yupSchema.validate(cleanedValues, { abortEarly: false });
        }}
        initialErrors={location?.state?.forceValidation ? validateSync(initialValues, {}) : {}}
      >
        <>
          <Header
            isCreating={isCreatingDocument}
            status={hasDraftAndPublished ? getDocumentStatus(document, meta) : undefined}
            title={pageTitle}
          />
          <Tabs.Root variant="simple" value={status} onValueChange={handleTabChange}>
            <Tabs.List
              aria-label="Document status"
            >
              {hasDraftAndPublished ? (
                <>
                  <StatusTab value="draft">
                    draft
                  </StatusTab>
                  <StatusTab
                    disabled={!meta || meta.availableStatus.length === 0}
                    value="published"
                  >
                    published
                  </StatusTab>
                </>
              ) : null}
            </Tabs.List>
            <Grid.Root
              paddingTop={{
                initial: 2,
                medium: 4,
                large: 8,
              }}
              gap={4}
            >
              <Grid.Item col={9} xs={12} direction="column" alignItems="stretch">
                <Tabs.Content value="draft">
                  <FormLayout layout={layout} document={doc} />
                </Tabs.Content>
                <Tabs.Content value="published">
                  <FormLayout layout={layout} document={doc} />
                </Tabs.Content>
              </Grid.Item>
              <Grid.Item col={9} xs={12} direction="column" alignItems="stretch">
                <CustomPanel/>
              </Grid.Item>
            </Grid.Root>
          </Tabs.Root>
          <Blocker />
        </>
      </Form>
    </Main>
  );
};

const StatusTab = styled(Tabs.Trigger)`
  text-transform: uppercase;
`;

/**
 * @internal
 * @description Returns the status of the document where its latest state takes priority,
 * this typically will be "published" unless a user has edited their draft in which we should
 * display "modified".
 */
const getDocumentStatus = (
  document: ReturnType<UseDocument>['document'],
  meta: ReturnType<UseDocument>['meta']
): 'draft' | 'published' | 'modified' => {
  const docStatus = document?.status;
  const statuses = meta?.availableStatus ?? [];

  /**
   * Creating an entry
   */
  if (!docStatus) {
    return 'draft';
  }

  /**
   * We're viewing a draft, but the document could have a published version
   */
  if (docStatus === 'draft' && statuses.find((doc) => doc.publishedAt !== null)) {
    return 'published';
  }

  return docStatus;
};

/* -------------------------------------------------------------------------------------------------
 * ProtectedEditViewPage
 * -----------------------------------------------------------------------------------------------*/

const ProtectedEditViewPage = () => {
  const { slug = '' } = useParams<{
    slug: string;
  }>();

  if (!slug) {
    return <Page.Error />;
  }

  return (
    <EditViewPage />
  );
};

export { EditViewPage, ProtectedEditViewPage, getDocumentStatus };
