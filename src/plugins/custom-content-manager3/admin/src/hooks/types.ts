import * as React from 'react';
import  { Button } from '@strapi/design-system';
import type { Document } from './useDocument';
import type { DocumentMetadata } from '../../../shared/contracts/collection-types';
type ButtonComponentProps = React.ComponentProps<typeof Button>;
/**
 * Dialog configuration for actions that require user confirmation
 */
export interface ActionDialogConfig {
  /** Whether the dialog is currently open */
  isOpen: boolean;
  /** Opens the dialog */
  open: () => void;
  /** Closes the dialog */
  close: () => void;
  /** Content to display in the dialog */
  content: React.ReactNode;
  title: string;
}

/**
 * Standard return type for all action hooks
 */
export interface ActionHookResult {
  /** Display label for the action */
  label: string;
  /** Action handler executing the action - can be sync or async */
  onClick: (() => void) | (() => Promise<void>);
  /** Whether the action is currently loading/processing */
  loading: boolean;
  /** Whether the action is disabled */
  disabled: boolean;
  /** Optional icon to display with the action */
  icon?: React.ReactNode;
  /** Button variant (default, secondary, tertiary, danger, etc.) */
  variant?: ButtonComponentProps['variant'];
  /** Dialog configuration if this action requires confirmation */
  dialog?: ActionDialogConfig;
}

/**
 * Common props interface for action hooks
 */
export interface ActionHookProps {
  activeTab: 'draft' | 'published' | null;
  collectionType: string;
  document?: Document;
  documentId?: string;
  meta?: DocumentMetadata;
  model: string;
}
