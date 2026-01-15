import {useNavigate} from "react-router-dom";
import {styled} from "styled-components";
import {Pencil} from "@strapi/icons";
import { ActionHookResult } from './types';

/**
 * Because the icon system is completely broken, we have to do
 * this to remove the fill from the cog.
 */
const StyledPencil = styled(Pencil)`
  path {
    fill: currentColor;
  }
`;

const useEditAction = (documentId: string): ActionHookResult => {
  const navigate = useNavigate();
  return {
    label: 'Edit',
    icon: <StyledPencil/>,
    onClick: () => {
      if (!documentId) {
        console.error(
          "You're trying to edit a document without an id, this is likely a bug with Strapi. Please open an issue."
        );
      }
      navigate({
        pathname: documentId,
      })
    },
    loading: false,
    disabled: false,
  }
}

export {useEditAction};
