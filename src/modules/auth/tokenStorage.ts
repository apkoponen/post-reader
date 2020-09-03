import { isSSR } from '../../utils/next';

const TOKEN_LOCAL_STORAGE_KEY = 'reader-auth-token';

export function getStoredToken() {
  return !isSSR()
    ? window.localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY) || ''
    : '';
}

export function storeToken(token: string) {
  window.localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token);
}
