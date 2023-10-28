/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  Health: '/healthz',
  Account: {
    Login: '/session/login',
    Logout: '/session/logout',
    Status: '/session/status',
  }
} as const;
