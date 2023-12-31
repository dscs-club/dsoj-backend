/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  Health: '/healthz',
  Session: {
    Login: '/session/login',
    Logout: '/session/logout',
    Status: '/session/status',
  },
  Submit: {
    Send: '/submit/send',
  },
  Account: {
    Signup: '/account/signup'
  }
} as const;
