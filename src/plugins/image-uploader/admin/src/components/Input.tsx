/**
 * It is not possible to upload files to a specific part of the media library
 * https://docs.strapi.io/cms/api/rest/upload
 * People do want it though
 * https://feedback.strapi.io/feature-requests/p/support-for-media-folders-in-the-content-api
 *
 * All the pictures WILL go to the same place and need sorting later. Not a problem for research projects
 * but when expanded to other things then possibly a problem.
 */
interface InputProps {
  name: string;
  value?: {
    id: number;
    url: string;
    name: string;
    alternativeText?: string;
    width?: number;
    height?: number;
    formats?: any;
  };
  onChange: (data: { target: { name: string; value: any; type: string } }) => void;
  attribute: {
    customField?: string;
    options?: {
      folderPath?: string;
    };
    required?: boolean;
  };
  disabled?: boolean;
  required?: boolean;
  error?: string;
  hint?: string;
  label?: string;
}
