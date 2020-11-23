import { Document } from 'prismic-javascript/types/documents';

/**
 * Filters dialogs in state by given ID
 * @returns Given dialog or null if not found
 */
export const findDialog = (id: string, dialogs: Document[]): Document | null => {
  let filteredDialogs;
  if (dialogs) {
    filteredDialogs = dialogs.filter(dialog => {
      return dialog.uid === id;
    });
  }

  return (filteredDialogs && filteredDialogs.length)
    ? filteredDialogs[0]
    : null;
};
