/**
 * Email validation regex pattern
 */
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export const isValidEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

/**
 * Validate required field
 * @param {string} value - Field value
 * @returns {boolean} Whether field has a value
 */
export const isRequired = (value) => {
  return Boolean(value && value.trim());
};

/**
 * Validate minimum length
 * @param {string} value - Field value
 * @param {number} minLength - Minimum length required
 * @returns {boolean} Whether field meets minimum length
 */
export const minLength = (value, minLength) => {
  return value && value.trim().length >= minLength;
};

/**
 * Validate maximum length
 * @param {string} value - Field value
 * @param {number} maxLength - Maximum length allowed
 * @returns {boolean} Whether field meets maximum length
 */
export const maxLength = (value, maxLength) => {
  return value && value.trim().length <= maxLength;
};