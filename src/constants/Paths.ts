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
    Send: '/submission/submit',
    List: '/submission/list',
  },
  Problem: {
    List: '/problem/list',
    Details: '/problem/details/:id',
  },
  Account: {
    Signup: '/account/signup'
  }
} as const;
