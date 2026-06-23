const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080').replace(/\/$/, '');
const AUTH_STORAGE_KEY = 'pibic.auth';

export function getStoredAuth() {
  const rawAuth = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!rawAuth) {
    return null;
  }

  try {
    return JSON.parse(rawAuth);
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function storeAuth(auth) {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
}

export function clearStoredAuth() {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export async function apiRequest(path, options = {}) {
  const {
    auth = true,
    body,
    headers = {},
    method = 'GET',
    ...rest
  } = options;

  const requestHeaders = {
    Accept: 'application/json',
    ...headers,
  };

  const storedAuth = getStoredAuth();
  if (auth && storedAuth?.token) {
    requestHeaders.Authorization = `${storedAuth.tipo || 'Bearer'} ${storedAuth.token}`;
  }

  let requestBody = body;
  if (body && !(body instanceof FormData)) {
    requestHeaders['Content-Type'] = 'application/json';
    requestBody = JSON.stringify(body);
  }

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: requestHeaders,
      body: requestBody,
      ...rest,
    });
  } catch {
    throw new Error(
      `Não foi possível conectar à API em ${API_BASE_URL}. Verifique se o backend está rodando e abra o front por http://127.0.0.1:5173 ou http://localhost:5173.`,
    );
  }

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = getErrorMessage(data) || `Erro ${response.status} ao chamar a API`;
    throw new Error(message);
  }

  return data;
}

function getErrorMessage(data) {
  if (!data) {
    return '';
  }

  if (typeof data === 'string') {
    return data;
  }

  if (data.campos && typeof data.campos === 'object') {
    const fieldMessages = Object.values(data.campos).filter(Boolean);

    if (fieldMessages.length > 0) {
      return fieldMessages.join(' ');
    }
  }

  return data.erro || data.message || data.detail || data.error || data.title || '';
}
