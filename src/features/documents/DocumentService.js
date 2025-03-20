/**
 * Document Service
 * Contains business logic for document operations
 */

/**
 * Format a document date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDocumentDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Get the formatted title for a document based on its type
 * @param {Object} doc - Document object
 * @returns {string} Formatted document title
 */
export const getDocumentTitle = (doc) => {
  if (!doc) return 'Untitled Document';

  switch (doc.type) {
    case 'buyer-rep':
      return `${doc.buyerName}'s Buyer Rep Agreement`;
    case 'seller-rep':
      return `${doc.sellerName}'s Seller Rep Agreement`;
    case 'mls':
      return `MLS Listing - ${doc.propertyAddress}`;
    default:
      return 'Untitled Document';
  }
};

/**
 * Sort documents by date (newest first)
 * @param {Array} documents - Array of document objects
 * @returns {Array} Sorted array of documents
 */
export const sortDocumentsByDate = (documents) => {
  return [...documents].sort((a, b) =>
    new Date(b.createdAt) - new Date(a.createdAt)
  );
};

/**
 * Get recent documents
 * @param {Array} documents - Array of document objects
 * @param {number} limit - Maximum number of documents to return
 * @returns {Array} Recent documents
 */
export const getRecentDocuments = (documents, limit = 5) => {
  return sortDocumentsByDate(documents).slice(0, limit);
};
