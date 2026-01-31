/// <reference types="admin/custom" />
import React from "react";
import { Button } from "@strapi/design-system";
type ButtonComponentProps = React.ComponentProps<typeof Button>;
interface DocumentActionConfirmDialogProps {
    title?: string;
    content?: React.ReactNode;
    variant?: ButtonComponentProps['variant'];
    onConfirm?: () => void | Promise<void>;
    onCancel?: () => void | Promise<void>;
    onClose: () => void;
    isOpen?: boolean;
    loading?: ButtonComponentProps['loading'];
}
declare const DocumentActionConfirmDialog: ({ onClose, onCancel, onConfirm, title, content, isOpen, variant, loading, }: DocumentActionConfirmDialogProps) => import("react/jsx-runtime").JSX.Element;
interface DocumentActionModalProps {
    title: string;
    content: React.ComponentType<{
        onClose: () => void;
    }> | React.ReactNode;
    footer?: React.ComponentType<{
        onClose: () => void;
    }> | React.ReactNode;
    onClose?: () => void;
    onModalClose: () => void;
    isOpen?: boolean;
}
declare const DocumentActionModal: ({ isOpen, title, onClose, footer: Footer, content: Content, onModalClose, }: DocumentActionModalProps) => import("react/jsx-runtime").JSX.Element;
export { DocumentActionConfirmDialog, DocumentActionModal };
