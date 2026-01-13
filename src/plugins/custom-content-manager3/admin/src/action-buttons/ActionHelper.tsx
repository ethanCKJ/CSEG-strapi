import React from "react";
import {Button, Dialog, Modal} from "@strapi/design-system";

type ButtonComponentProps = React.ComponentProps<typeof Button>;

interface DocumentActionConfirmDialogProps {
  title: string;
  content?: React.ReactNode;
  variant?: ButtonComponentProps['variant'];
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  onClose: () => void;
  isOpen?: boolean;
  loading?: ButtonComponentProps['loading'];
}
/* -------------------------------------------------------------------------------------------------
 * DocumentActionConfirmDialog
 * -----------------------------------------------------------------------------------------------*/

const DocumentActionConfirmDialog = ({
                                              onClose,
                                              onCancel,
                                              onConfirm,
                                              title,
                                              content,
                                              isOpen,
                                              variant = 'secondary',
                                              loading,
                                            }: DocumentActionConfirmDialogProps) => {

  const handleClose = async () => {
    if (onCancel) {
      await onCancel();
    }

    onClose();
  };

  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
    }

    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Dialog.Content>
        <Dialog.Header>{title}</Dialog.Header>
        <Dialog.Body>{content}</Dialog.Body>
        <Dialog.Footer>
          <Dialog.Cancel>
            <Button variant="tertiary" fullWidth>
              Cancel
            </Button>
          </Dialog.Cancel>
          <Button onClick={handleConfirm} variant={variant} fullWidth loading={loading}>
            Confirm
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};

/* -------------------------------------------------------------------------------------------------
 * DocumentActionModal
 * -----------------------------------------------------------------------------------------------*/


interface DocumentActionModalProps {
  title: string;
  content: React.ComponentType<{ onClose: () => void }> | React.ReactNode;
  footer?: React.ComponentType<{ onClose: () => void }> | React.ReactNode;
  onClose?: () => void;
  onModalClose: () => void;
  isOpen?: boolean;
}

const DocumentActionModal = ({
                               isOpen,
                               title,
                               onClose,
                               footer: Footer,
                               content: Content,
                               onModalClose,
                             }: DocumentActionModalProps) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    onModalClose();
  };

  return (
    <Modal.Root open={isOpen} onOpenChange={handleClose}>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        {typeof Content === 'function' ? (
          <Content onClose={handleClose}/>
        ) : (
          <Modal.Body>{Content}</Modal.Body>
        )}
        {typeof Footer === 'function' ? <Footer onClose={handleClose}/> : Footer}
      </Modal.Content>
    </Modal.Root>
  );
};

export {DocumentActionConfirmDialog, DocumentActionModal}
