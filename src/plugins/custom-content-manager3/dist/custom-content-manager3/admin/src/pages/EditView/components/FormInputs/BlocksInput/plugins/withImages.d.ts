import { type Editor } from 'slate';
/**
 * Images are void elements. They handle the rendering of their children instead of Slate.
 * See the Slate documentation for more information:
 * - https://docs.slatejs.org/api/nodes/element#void-vs-not-void
 * - https://docs.slatejs.org/api/nodes/element#rendering-void-elements
 */
declare const withImages: (editor: Editor) => import("slate").BaseEditor;
export { withImages };
