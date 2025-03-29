import CryptoJS from 'crypto-js';

// Get encryption key from environment
const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'your-fallback-encryption-key';

/**
 * Encrypts data using AES encryption
 * @param {Object|string} data - Data to encrypt
 * @returns {Object} - Encrypted data object
 */
export const encryptData = (data) => {
  try {
    const jsonString = typeof data === 'string' ? data : JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(jsonString, ENCRYPTION_KEY).toString();

    return {
      encrypted: true,
      payload: encrypted,
      timestamp: Date.now()
    };
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
};

/**
 * Decrypts encrypted data
 * @param {string} encryptedData - Encrypted data string
 * @returns {Object|string} - Decrypted data
 */
export const decryptData = (encryptedData) => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    const jsonString = decrypted.toString(CryptoJS.enc.Utf8);

    try {
      return JSON.parse(jsonString);
    } catch {
      return jsonString;
    }
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
};

/**
 * Generates a secure hash of the data
 * @param {Object|string} data - Data to hash
 * @returns {string} - Hash of the data
 */
export const generateHash = (data) => {
  try {
    const jsonString = typeof data === 'string' ? data : JSON.stringify(data);
    return CryptoJS.SHA256(jsonString).toString();
  } catch (error) {
    console.error('Hash generation error:', error);
    throw new Error('Failed to generate hash');
  }
};

/**
 * Validates data integrity using hash
 * @param {Object|string} data - Original data
 * @param {string} hash - Hash to validate against
 * @returns {boolean} - Whether the data is valid
 */
export const validateDataIntegrity = (data, hash) => {
  try {
    const generatedHash = generateHash(data);
    return generatedHash === hash;
  } catch (error) {
    console.error('Data validation error:', error);
    return false;
  }
};
