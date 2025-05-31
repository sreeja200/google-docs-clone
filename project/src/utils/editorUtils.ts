/**
 * Applies formatting to the current selection in the document
 */
export const formatDoc = (command: string, value: string = '') => {
  // Enable design mode to ensure commands work
  document.designMode = 'on';
  
  try {
    // Execute the command
    document.execCommand(command, false, value);
  } catch (error) {
    console.error('Error executing command:', error);
  } finally {
    // Turn design mode off after command execution
    document.designMode = 'off';
  }
};

/**
 * Gets the current selection as plain text
 */
export const getSelectionText = (): string => {
  const selection = window.getSelection();
  return selection ? selection.toString() : '';
};

/**
 * Checks if the current selection has a specific formatting
 */
export const hasFormat = (format: string): boolean => {
  return document.queryCommandState(format);
};

/**
 * Inserts HTML at the current cursor position
 */
export const insertHTML = (html: string): void => {
  document.execCommand('insertHTML', false, html);
};

/**
 * Creates a new empty document
 */
export const createNewDocument = (editorElement: HTMLElement): void => {
  if (editorElement) {
    editorElement.innerHTML = '';
  }
};

/**
 * Saves document content as HTML
 */
export const saveDocumentAsHTML = (editorElement: HTMLElement): string | null => {
  return editorElement ? editorElement.innerHTML : null;
};

/**
 * Loads HTML content into the editor
 */
export const loadHTMLContent = (editorElement: HTMLElement, html: string): void => {
  if (editorElement) {
    editorElement.innerHTML = html;
  }
};