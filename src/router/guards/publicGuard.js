export const publicGuard = (to, from, next) => {
  // Public routes are accessible to all users
  // No need to check role or authentication
  next();
};
