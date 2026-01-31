import { type BaseEditor, Path, Editor } from 'slate';
interface LinkEditor extends BaseEditor {
    lastInsertedLinkPath: Path | null;
    shouldSaveLinkPath: boolean;
}
declare const withLinks: (editor: Editor) => BaseEditor;
export { withLinks, type LinkEditor };
