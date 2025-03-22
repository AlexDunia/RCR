export function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/[&]/g, '&amp;')
    .replace(/["]/g, '&quot;')
    .replace(/[']/g, '&#x27;')
    .trim()
    .substring(0, 100); // Limit length
}
