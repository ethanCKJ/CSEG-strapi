import { Editor } from 'slate';
/**
 * This plugin is used to normalize the Slate document to match the Strapi schema.
 */
declare const withStrapiSchema: (editor: Editor) => import("slate").BaseEditor;
export { withStrapiSchema };
