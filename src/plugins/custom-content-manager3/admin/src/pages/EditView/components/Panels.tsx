import * as React from 'react';

import {
  useQueryParams,
  useStrapiApp,
  DescriptionComponentRenderer,
} from '@strapi/strapi/admin';
import { Flex, Typography } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { useMatch } from 'react-router-dom';

import { InjectionZone } from '../../../components/InjectionZone';
import { useDoc } from '../../../hooks/useDocument';
import { CLONE_PATH } from '../../../router';

import { DocumentActions } from './DocumentActions';

import type {
  ContentManagerPlugin,
  DocumentActionProps,
  PanelComponent,
  PanelComponentProps,
} from '../../../content-manager';
import {PublishButton} from "../../../action-buttons/PublishButton";
import { Grid } from "@strapi/design-system";
import {UpdateButton} from "../../../action-buttons/UpdateButton";

interface PanelDescription {
  title: string;
  content: React.ReactNode;
}



/* -------------------------------------------------------------------------------------------------
 * Default Action Panels (CE)
 * -----------------------------------------------------------------------------------------------*/

const ActionsPanel: PanelComponent = () => {
  console.log("In ActionsPanel");
  return {
    title: 'Entry',
    content: <ActionsPanelContent />,
  };
};

ActionsPanel.type = 'actions';

const ActionsPanelContent = () => {

  const [
    {
      query: { status = 'draft' },
    },
  ] = useQueryParams<{ status: 'draft' | 'published' }>();
  const { model, id, document, meta, collectionType } = useDoc();
  // const plugins = useStrapiApp('ActionsPanel', (state) => state.plugins);

  const props = {
    activeTab: status,
    model,
    documentId: id,
    document: document,
    meta: meta,
    collectionType,
  } satisfies DocumentActionProps;

  return (
    <Flex direction="column" gap={2} width="100%" alignItems="stretch">
      <PublishButton {...props}/>
      <div>HASDFASDFAfd</div>
      <InjectionZone area="editView.right-links" slug={model} />
    </Flex>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Panel
 * -----------------------------------------------------------------------------------------------*/

interface PanelProps extends Pick<PanelDescription, 'title'> {
  children: React.ReactNode;
}

const Panel = React.forwardRef<any, PanelProps>(({ children, title }, ref) => {
  return (
    <Flex
      ref={ref}
      tag="aside"
      aria-labelledby="additional-information"
      background="neutral0"
      borderColor="neutral150"
      hasRadius
      paddingBottom={4}
      paddingLeft={4}
      paddingRight={4}
      paddingTop={4}
      shadow="tableShadow"
      gap={3}
      direction="column"
      justifyContent="stretch"
      alignItems="flex-start"
    >
      <Typography tag="h2" variant="sigma" textTransform="uppercase" textColor="neutral600">
        {title}
      </Typography>
      {children}
    </Flex>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Panels
 * -----------------------------------------------------------------------------------------------*/
/**
 * Side panel of the EditViewPage
 * @constructor
 */
const Panels = () => {
  const description = {
    title: "Entry"
  }
  return (
    <Flex direction="column" alignItems="stretch" gap={2}>
      <Panel {...description}>
        <ActionsPanelContent />
      </Panel>
    </Flex>
  );
};

const CustomPanel = () => {
  const [
    {
      query: { status = 'draft' },
    },
  ] = useQueryParams<{ status: 'draft' | 'published' }>();
  const { model, id: documentId, document, meta, collectionType } = useDoc();
  // const plugins = useStrapiApp('ActionsPanel', (state) => state.plugins);

  // const props = {
  //   activeTab: status,
  //   model,
  //   documentId: id,
  //   document: document,
  //   meta: meta,
  //   collectionType,
  // } satisfies DocumentActionProps;
  return (
    <Flex direction="column" alignItems="stretch" gap={2}>
      <Flex

        aria-labelledby="additional-information"
        background="neutral0"
        borderColor="neutral150"
        hasRadius
        paddingBottom={4}
        paddingLeft={4}
        paddingRight={4}
        paddingTop={4}
        shadow="tableShadow"
        gap={3}
        direction="column"
        justifyContent="stretch"
        alignItems="flex-start"
      >
        <Typography tag="h2" variant="sigma" textTransform="uppercase" textColor="neutral600">
          Actions
        </Typography>
        {/* Button bar */}
        <Grid.Root gap={4} width="100%">
          <Grid.Item col={3}>
            <PublishButton documentId={documentId} activeTab={status} model={model} collectionType={collectionType} meta={meta} document={document}/>
          </Grid.Item>
          <Grid.Item col={3}>
            <UpdateButton activeTab={status} documentId={documentId} model={model} collectionType={collectionType}  />
          </Grid.Item>
        </Grid.Root>

      </Flex>
    </Flex>
  );

}

export { Panels, ActionsPanel, CustomPanel };
export type { PanelDescription };
