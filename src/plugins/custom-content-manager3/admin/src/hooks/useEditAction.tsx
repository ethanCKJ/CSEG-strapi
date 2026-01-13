import {useNavigate} from "react-router-dom";
import {useNotification} from "@strapi/strapi/admin";
import {styled} from "styled-components";
import {Pencil} from "@strapi/icons";

/**
 * Because the icon system is completely broken, we have to do
 * this to remove the fill from the cog.
 */
const StyledPencil = styled(Pencil)`
  path {
    fill: currentColor;
  }
`;


const useEditAction = (documentId: string) => {
  const navigate = useNavigate();
  return {
    editLabel: 'Edit',
    editIcon: <StyledPencil/>,
    handleEdit: () => {
      if (!documentId) {
        console.error(
          "You're trying to edit a document without an id, this is likely a bug with Strapi. Please open an issue."
        );
      navigate({
        pathname: documentId,
      })
    }
  }
}

export {useEditAction};
