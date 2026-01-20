const fs = require('fs');
const path = require('path');

const baseDir = 'src/plugins/custom-content-manager3/admin/src';

const filesToUpdate = [
  'history/components/VersionInputRenderer.tsx',
  'pages/EditView/components/FormLayout.tsx',
  'pages/EditView/EditViewPage.tsx',
  'pages/ListView/components/TableActions.tsx',
  'pages/ListView/components/TableCells/Media.tsx',
  'pages/EditView/components/FormInputs/BlocksInput/BlocksToolbar.tsx',
  'pages/EditView/components/FormInputs/BlocksInput/EditorLayout.tsx',
  'pages/EditView/components/FormInputs/BlocksInput/Modifiers.tsx',
  'pages/EditView/components/FormInputs/BlocksInput/Blocks/Code.tsx',
  'pages/EditView/components/FormInputs/BlocksInput/Blocks/Heading.tsx',
  'pages/EditView/components/FormInputs/BlocksInput/Blocks/Image.tsx',
  'pages/EditView/components/FormInputs/BlocksInput/Blocks/Link.tsx',
  'pages/EditView/components/FormInputs/BlocksInput/Blocks/List.tsx',
  'pages/EditView/components/FormInputs/BlocksInput/Blocks/Quote.tsx',
  'pages/EditView/components/FormInputs/Component/Repeatable.tsx',
  'pages/EditView/components/FormInputs/DynamicZone/AddComponentButton.tsx',
  'pages/EditView/components/FormInputs/DynamicZone/ComponentCard.tsx',
  'pages/EditView/components/FormInputs/DynamicZone/ComponentCategory.tsx',
  'pages/EditView/components/FormInputs/DynamicZone/DynamicComponent.tsx',
  'pages/EditView/components/FormInputs/Relations/RelationModal.tsx',
  'pages/EditView/components/FormInputs/Relations/Relations.tsx',
  'pages/EditView/components/FormInputs/UID.tsx',
  'pages/EditView/components/FormInputs/Wysiwyg/Editor.tsx',
  'pages/EditView/components/FormInputs/Wysiwyg/EditorLayout.tsx',
  'pages/EditView/components/FormInputs/Wysiwyg/PreviewWysiwyg.tsx',
  'pages/EditView/components/FormInputs/Wysiwyg/WysiwygStyles.tsx',
  'pages/ListView/ListViewPage.tsx',
  'preview/pages/Preview.tsx',
];

function getRelativePath(from) {
  // Calculate depth based on slashes
  const depth = from.split('/').length - 1;
  return '../'.repeat(depth) + 'utils/styled';
}

filesToUpdate.forEach(file => {
  const fullPath = path.join(baseDir, file);

  if (!fs.existsSync(fullPath)) {
    console.log(`SKIP: ${file} - not found`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');

  // Check if already has the import
  if (content.includes("import { styled } from") && content.includes("utils/styled")) {
    console.log(`SKIP: ${file} - already has import`);
    return;
  }

  // Find what to import from styled-components
  const styledImportMatch = content.match(/\/\/ import {([^}]+)} from ['"]styled-components['"]/);
  if (!styledImportMatch) {
    console.log(`SKIP: ${file} - no styled-components comment found`);
    return;
  }

  const imports = styledImportMatch[1].split(',').map(s => s.trim());
  const relativePath = getRelativePath(file);

  // Determine what to import
  const needsStyled = imports.includes('styled');
  const needsCss = imports.includes('css');
  const needsKeyframes = imports.includes('keyframes');
  const needsCSSProperties = imports.some(i => i.includes('CSSProperties'));

  let newImports = [];
  if (needsCSSProperties) {
    newImports.push("import type { CSSProperties } from 'react';");
  }

  const utilImports = [];
  if (needsStyled) utilImports.push('styled');
  if (needsCss) utilImports.push('css');
  if (needsKeyframes) utilImports.push('keyframes');

  if (utilImports.length > 0) {
    newImports.push(`import { ${utilImports.join(', ')} } from '${relativePath}';`);
  }

  // Add imports after the styled-components comment
  const commentLine = styledImportMatch[0];
  content = content.replace(
    commentLine,
    commentLine + '\n' + newImports.join('\n')
  );

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`UPDATED: ${file}`);
});

console.log('\nDone!');
