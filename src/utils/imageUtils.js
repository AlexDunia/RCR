/**
 * Utility functions for handling images
 */

/**
 * Preloads an image by creating a new Image object
 * @param {string} src - The source URL of the image to preload
 * @returns {Promise} A promise that resolves when the image is loaded or rejects on error
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
};

/**
 * Preloads multiple images at once
 * @param {string[]} sources - Array of image URLs to preload
 * @returns {Promise} A promise that resolves when all images are loaded
 */
export const preloadImages = (sources) => {
  return Promise.all(sources.map(src => preloadImage(src)));
};

/**
 * Forces a reload of an image by appending a timestamp
 * @param {string} src - The original image source
 * @returns {string} The image source with a timestamp parameter
 */
export const getTimestampedImageUrl = (src) => {
  if (!src) return src;

  // Skip for data URLs
  if (src.startsWith('data:')) return src;

  // Add timestamp to URL to prevent caching
  const timestamp = new Date().getTime();
  const separator = src.includes('?') ? '&' : '?';
  return `${src}${separator}t=${timestamp}`;
};

export default {
  preloadImage,
  preloadImages,
  getTimestampedImageUrl
};
