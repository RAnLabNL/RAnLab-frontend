import { Document } from 'prismic-javascript/types/documents';

/**
 * Filters dialogs in state by given ID
 * @returns Given dialog or null if not found
 */
export const filterById = (id: string, docs: Document[]): Document | null => {
  let filteredDocs;
  if (docs) {
    filteredDocs = docs.filter(doc => {
      return doc.uid === id;
    });
  }

  return (filteredDocs && filteredDocs.length)
    ? filteredDocs[0]
    : null;
};
